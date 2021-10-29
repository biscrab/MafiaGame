const express = require('express');
const app = express();
app.use(express.json());
let jwt = require("jsonwebtoken");
var server = require('http').createServer(app);
const mysql = require('mysql');
const cors = require('cors');
const { resolve } = require('path/posix');
app.use(cors())
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: 'dongseopfuck1',
    database: "sys"
})

io.on('connection', function(socket) {
    socket.emit("연결");
    socket.on("leave", function(data){
        socket.leave(data);
    })
    socket.on("join", (data) => {
        console.log(data);
        socket.join(data);
    }) 
    socket.on("disconnect", (data) => {
        socket.leave(data);
    })
    socket.on("message", (data) => {
        //let life = checkDeath(message.id, message.name);
        //if(life === 1){
            //chat(data);
        //}
        console.log(data);
        io.to(data.id).emit("chat", data);
        db.query(`INSERT ${data.id}_chat (contents, name) VALUE (${data.contents}, ${data.user})`)
    })
});

server.listen(1234, function () {
    console.log('Example app listening on port', 1234);
});

function chat(data) {
    db.connect();
        db.query(`INSERT INTO ${data.name}_chat (name, contents) VALUE (${data.user}, ${data.contents})`)
    db.end();
}

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// DB연결

/*const User = require("../models/user");*/
/*let url =  "mongodb://localhost:27017/dalhav";
mysql.connect(url, {useNewUrlParser: true});

app.listen(1234, function(){
    console.log('server opened');
});*/

const SECRET_KEY="XOZUhcOIiv7lt6avsdm6D7asdWcRB5dhqX";

app.post('/login', function(req, res){
    db.connect();
    db.query(`SELECT * FROM user WHERE name=? and password=?`, [req.body.name, req.body.password], function(err, rows){
        if(err){
            res.status(406);
        }
        else{
            const name = rows[0].name;
            const password = rows[0].password;
            const token = jwt.sign({name: name, password: password}, "apple")
            res.json(token);
        }
    })
    db.end();
})

function check(req) {
    db.connect();
    db.query(`SELECT * FROM user WHERE name=?`, [req.body.name]), function(err, rows){
        if(rows){
            return(false);
        }
        else{
            return(true);
        }
    }
    db.end();
}

function checkDeath(id, name){
    db.connect();
    db.query("SELECT status FROM ?_member WHERE name=?", [id, name], function(err, rows){
        if(rows){
            return(rows);
        }
        else{
            return(false);
        }
    })
    db.end();
}

function checkLogin(token){
    return new Promise((resolve, reject) =>{
    var v = jwt.verify(token, 'apple');
    db.query(`SELECT * FROM user WHERE name=${v.name} and password=${v.password}`, function(err, rows){
        if(rows){
            resolve(true);
        }
        else{
            resolve(false);
        }
    })
    });
}

app.get('/check', function(req, res){
    var check = checkLogin(req.headers.authorization.substring(7))
    res.json(check);
})

//오류
function getUser(token) {
    return new Promise((resolve, reject) => {
    var user = jwt.verify(token, 'apple');
    console.log(token);
    resolve(user);
    })
}

function getJob(req){
    db.query(`SELECT job from ${req.body.id}_member WHERE (name = ${req.body.name})`, function(err, rows){
        return(rows[0].job);
    })
}

app.post('/signup', async(req, res) => {
    db.connect();
    var check = await getMember(req);
    if(check){
    db.query(`INSERT INTO user (name, password) VALUES (?, ?);`, [req.body.name, req.body.password], function(error, results, fields){
        if(error){
            res.json(error);
        }
        else{
            res.json("성공");
        }
    });
    }
    else{
        res.json("중복");
    }
    db.end();
});   

app.post('/room', async(req, res) => {
    let member = `${req.body.name}_member`;
    let chat = `${req.body.name}_chat`;
    var logined = await checkLogin(req.headers.authorization.substring(7));
    if(logined){
        let user = await getUser(req.headers.authorization.substring(7));
        db.connect();
            db.query('INSERT INTO room (name, password, max) VALUES (?, ?, ?)', [req.body.name, req.body.password, Number(req.body.max)])
            db.query(`CREATE TABLE ${member} (status INT NULL DEFAULT 1, name VARCHAR(45) NOT NULL, job INT NULL DEFAULT 0, admin INT NULL DEFAULT 0, voted INT NULL DEFAULT 0, day INT DEFAULT 1, id INT NULL DEFAULT 0, INT time NULL DEFAULT 0, PRIMARY KEY (name),  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE,  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);`);
            db.query(`CREATE TABLE ${chat} (chat VARCHAR(45) NOT NULL, name VARCHAR(45) NOT NULL);`)
            db.query(`INSERT INTO ${member} (name) VALUES (${user})`)
            db.query('UPDATE user SET ingame = 1 WHERE (name = ?);', [user]);
            res.json("성공");
        db.end();
    }
    else{
        res.status = 401;
        res.json("실패");
    }
})

app.get('/tet', async(req, res) => {
    var tet = await checkLogin(req.headers.authorization.substring(7))
    res.json(tet)
})

app.get('/room', function(req, res){
    db.query('SELECT * FROM room', function(err, rows){
        if(err){
            res.json("error");
        }  
        else{
            res.json(rows);
        }
    })
})

app.post('/enter', function(req, res){
    let people;
    let max;
    let status;
    let ingame;
    
    db.connect();
    if(checkLogin(req.headers.authorization)){
    db.query('SELECT * from room WHERE (name = ?)', [req.body.name], function(err, rows){
        max = Number(rows[0].max);
        status = Number(rows[0].status);
    })
    db.query('SELECT COUNT(*) from ?_member', [req.body.name], function(err, rows){
        people = Number(Object.keys(rows[0]));
    })

    if(max === people){
        res.json("방이 다 찼습니다.");
    }
    else if(status === 1){
        res.json("게임이 이미 시작됬습니다.");
    }
    else{
    db.query('SELECT ingame from user WHERE (name = ?);', [req.body.name], function(error, rows){
        if(rows === 0){
            db.query('UPDATE user SET ingame = 1 WHERE (name = ?);', [req.body.name]);
            db.query('INSERT INTO ?_member (name) VALUES (?);', [req.body.id, req.body.name]);
        }
        else{
            res.json("이미 게임 중 입니다.");
        }
    })
    }}
    db.end();
})

app.post('/leave', function(req, res){
    let member = `${req.body.name}_member`;
    let chat = `${req.body.name}_chat`;
    let r;
    db.connect();
    db.query('SELECT COUNT(*) from ?', [member], function(err, rows){
        r = (Number(Object.keys(rows)[0]));
        if(r === 1){
            db.query('DROP TABLE ?', [req.body.name])
            db.query('DROP TABLE ?', [member])
            db.query('DROP TABLE ?', [chat])
        }
        else{
            db.query(`SELECT admin from ${req.body.name}_member WHERE (name = ${req.body.user})`, function(err, rows){
                r = (Number(Object.keys(rows)[0]))
                if(r === 1){
                    db.query(`SELECT id FROM ${req.body.name}_member ORDER BY id`, function(err, rows){
                        const first = rows;
                        db.query(`UPDATE ${req.body.name}_member SET admin = 1 WHERE (id = first)`);
                    })
                }
            })
        }
        db.query('DELETE FROM ? WHERE name = ?', [member, req.body.name])
    }) 
})

app.delete('/room', function(req, res){
    let member = `${req.body.name}_member`;
    let chat = `${req.body.name}_chat`;
    db.query(`SELECT admin from ${member} WHERE (name = ${req.body.user})`, function(err, rows){
        if(rows){
            db.query('DROP TABLE ?', [req.body.name])
            db.query('DROP TABLE ?', [member])
            db.query('DROP TABLE ?', [chat])
        }
    })
})

app.post('/kill', function(req, res){
    if(checkLogin(req.headers.authorization)){
    let job = getJob(req);
        if(job === 1){
            if(checkDeath(req.body.user)){
                db.query(`SELECT status from ${req.body.name}_member WHERE (name = ${req.body.user})`, function(err, rows){
                    const status = Number(Object.keys.rows[0]);
                    if(status === 1){
                        db.query(`UPDATE ${req.body.name}_member SET status = 0 WHERE (name = ${req.body.user})`)
                    } 
                    else if(status === 3){
                        var mes = {name: req.body.name, contents: "의사가 성공적으로 치료하였습니다.", user: "사회자"}
                        chat(mes);
                    }
                })
            }
        }
    }
})

app.post('/detect', function(req, res){
    if(checkLogin(req.headers.authorization)){
    let job = getJob(req);
        if(job === 2){
            //db.query(`UPDATE ${req.body.name}`)
            db.connect();
                db.query(`SELECT * FROM job WHERE name=${req.body.target}`, function(err, rows){
                    var r = Number(rows[0].job);
                    if(r === 1){
                        res.json(true);
                    }
                    else{
                        res.json(false);
                    }
                })
            db.end();
        }
    }
})

app.post('/heal', function(req, res){
    if(checkLogin(req.headers.authorization)){
    let job = getJob(req);
        if(job === 3){
            if(checkDeath(req.body.user)){
                db.query(`SELECT status from ${req.body.name}_member WHERE (name = ${req.body.user})`, function(err, rows){
                    const status = Number(Object.keys.rows[0]);
                    if(status === 1){
                        db.query(`UPDATE ${req.body.name}_member SET status = 0 WHERE (name = ${req.body.user})`)
                    } 
                })
            }
        }
    }
})

app.get('/test', function(req, res){
    db.query('SELECT count(*) from user', [req.body.name], function(err, rows){
        res.json(Number(Object.keys(rows)[0]));
    })
})

function getMember(){
db.connect();
db.query(`SELECT count(*) from ${req.body.name}_member`, function(err, rows){
    var r = rows[0]
    return(r[Object.keys(r)[0]])
})
db.end();
}

app.get('/member', function(req, res){
    res.json(getMember(req));
})

app.post('/day', function(req, res){
    var time;
    var day;
    db.connect();
    db.query(`UPDATE ${req.body.name}_member status=1 WHERE (status = 3)`)
    gameOver();
    if(time > 0){
        db.query(`UPDATE room time = time - 1 where name=${req.body.name}`)
    }
    else if(time <= 0){
        db.query(`SELECT day from room where name=${req.body.name}`, function(err, rows){
            day = Number(rows[0].day)
        })
        db.query(`UPDATE room time = 3000 where name=${req.body.name}`)
        if(day === 1){
            db.query(`UPDATE room day = 0 where name=${req.body.name}`)
        }
        else{
            db.query(`UPDATE room day = 1 where name=${req.body.name}`)
        }
    }
    db.end();
})

app.post('/night', function(req, res){
    var time;
    judjement(req.body.name);
    db.query(`UPDATE ${req.body.name}_member voted=0`)
    db.query(`TRUNCATE ${req.body.name}_member`);
    gameOver();
})

function time(name) {
    db.connect();
        db.query(`SELECT time from room where name=${name}`, function(err, rows){
            return(Number(rows[0].time))
        })
    db.end();
}

app.get('/time', function(req, res){
    res.json(time(req.body.name))
})

app.post('/start', function(req, res){
    db.connect();
    if(checkLogin(req.headers.authorization)){
        var user = getUser(req.headers.authorization);
        var admin;
        db.query(`SELECT admin from ${req.body.name}_member where name=${user}`, function(err, rows){
            admin = Number(rows[0].admin);
        })
        db.query(`UPDATE room status=1 where name=${req.body.name}`)
        //db.query(`TRUNCATE ${req.body.name}_member`);
        chat({name: "사회자" , contents: "게임이 시작됩니다."});
        var member = getMember(req.body.name);
        var i;
        for(i = 0;  i < member / 4; i++){
            var random = Math.floor(Math.random() * member)
            db.query(`SELECT job FROM ${req.body.name}_member where id=${random}`, function(err, rows){
                if(rows[0].job){
                    i--;
                }
                else{
                    db.query(`UPDATE ${req.body.name}_member job=1 where id=${random}`)
                }
            })
        }
        var j;
        for(j = 0;  j < 1; j++){
            var random = Math.floor(Math.random() * member)
            db.query(`SELECT job FROM ${req.body.name}_member where id=${random}`, function(err, rows){
                if(rows[0].job){
                    j--;
                }
                else{
                    db.query(`UPDATE ${req.body.name}_member job=2 where id=${random}`)
                }
            })
        }
        var k;
        for(k = 0;  k < 1; k++){
            var random = Math.floor(Math.random() * member)
            db.query(`SELECT job FROM ${req.body.name}_member where id=${random}`, function(err, rows){
                if(rows[0].job){
                    k--;
                }
                else{
                    db.query(`UPDATE ${req.body.name}_member job=3 where id=${random}`)
                }
            })
        }
    }
    db.end();
})

function gameOver(){
    var citizen;
    var mafia;
    db.connect();
    db.query(`SELECT * from ${req.body.member} where job = 1`, function(err, rows){
        mafia = Number(rows[Object.keys(rows)[0]])
    })
    citizen = getUser(req) - mafia;
    if(mafia >= citizen){
        db.query(`TRUNCATE ${req.body.name}_chat`);
        chat({contents: "마피아가 승리하였습니다."})
    }
    else if(mafia === 0){
        db.query(`UPDATE ${req.boy.name}_member life=1 and job-0 `)
        db.query(`TRUNCATE ${req.body.name}_chat`);
        chat({contents: "시민이 승리하였습니다."})
    }
    db.end();
}

app.post('/vote', function(req, res){
    db.connect();
        db.query(`UPDATE ${req.body.name}_member voted += 1 WHERE (name=${req.body.user})`);
        let mes = {name: req.body.name, contents: `${req.body.user} 한 표`, user: "사회자"}
        chat(mes);
    db.end();
})

function judjement(name){
    let m;
    let voted;
    let target;
    var mes;
    db.connect();
    db.query(`SELECT * from ${name}_member ORDER BY voted`, function(err, rows){
        voted = Number(rows[0].voted);
        target = Number(rows[0].target);
    })
    if(voted > m){
        db.query(`UPDATE ${name}_mebmer status=0`)
        mes = {name: name, contents: `${target}이 투표로 인해 사망하였습니다.`, user: "사회자"}
        chat(mes)
    }
    else{
        db.query(`UPDATE ${name}_mebmer status=0`)
        mes = {name: name, contents: `과반수를 넘지 못해 투표가 무효가 되었습니다.`, user: "사회자"}
        chat(mes);
    }
    db.end();
}

app.get('/test2', function(req, res){
    db.connect();
    db.query(`CREATE TABLE ${req.body.name}_member (status INT NULL DEFAULT 1, name VARCHAR(45) NOT NULL, job INT NULL DEFAULT 0, admin INT NULL DEFAULT 0, id INT NULL DEFAULT 0, PRIMARY KEY (name),  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE,  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);`);
    res.json("1");
    db.end();
})

app.get('/user', function(req, res){
    //var user = getUser(req.headers.authorization);
    //res.json(user);
    var user = getUser(req.headers.authorization.substring(7));
    res.json(user);
})

app.get('/chat', function(req, res){
    db.connect();
    db.query(`SELECT * from ${req.body.name}_chat`, function(err, rows){
        res.json(rows);
    })
    db.end();
})

app.get('/job', function(req, res){
    db.connect();
    var name = getUser(req.headers.authorization)
    db.query(`SELECT job from ${req.body.name}_member where name=${name}`, function(err, rows){
        res.json(Number(rows[0].job));
    })
    db.end();
})

function getUtime(req) {
    db.connect();
    db.query(`SELECT time from ${req.body.name}_member where name=${req.body.user}`, function(err, rows){
        return(Number(rows[0].time))
    })
    db.end();
}

app.post('/decress', function(req, res){
    var utime = getUtime(req);
    if(utime === 0){
        db.connect();
        var time = 300 / getMember()
        db.query(`UPDATE room time = time - ${time} where name=${req.body.user}`)
        db.query(`UPDATE ${req.body.name}_member time=1 where name=${req.body.user}`)
        db.end();
    }
})

app.post('/increase', function(req, res){
    var utime = getUtime(req);
    if(utime === 0){
    db.connect();
        var time = 300 / getMember()
        db.query(`UPDATE room time = time + ${time} where name=${req.body.name}`)
        db.query(`UPDATE ${req.body.name}_member time=1 where name=${req.body.user}`)
        db.end();
    }
})