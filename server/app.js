const express = require('express');
const app = express();
app.use(express.json());
let jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
var fs = require('fs');
const http = require('http');
var server = require('http').createServer(app);
const mysql = require('mysql');
const io = require('socket.io')(server, {
    cors: {
      origin: true,
      methods: ["GET", "POST"]
    }});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: 'dongseopfuck1',
    database: "sys"
})

io.on('connection', function(socket) {
    console.log("연결");
    socket.on("message", (message) => {
        let life = checkDeath(message.id, message.name);
        if(life === 1){
            console.log(message.contents);
        }
    })
});

server.listen(1234, function () {
    console.log('Example app listening on port', 1234);
});

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
            const name = rows.name;
            const password = rows.password;
            const token = jwt.sign({name: name, password: password}, SECRET_KEY)
            res.json(token);
        }
    })
    db.end();
})

function check(req) {
    db.connect();
    db.query(`SELECT * FROM user WHERE name=?`, [req.body.name]), function(error, rows){
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
    db.query("SELECT status FROM ?_member WHERE name=?", [id, name], function(error, rows){
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
    jwt.verify(token, SECRET_KEY, (err, encode) => {
        if(encode){
            return encode
        }
        else{
            return "error"
        }
    })
}

function getJob(req){
    db.query(`SELECT job from ${req.bod.id}_member WHERE (name = ${req.body.name})`, function(err, rows){
        return(rows);
    })
}

app.post('/signup', function(req, res){
    db.connect();
    if(check(req)){
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


app.post('/room', function(req, res){
    let member = `${req.body.name}_member`;
    let chat = `${req.body.name}_chat`;
    db.connect();
    db.query('INSERT INTO room (name, password, max) VALUES (?, ?, ?)', [req.body.name, req.body.password, req.body.max])
    db.query(`CREATE TABLE ${member} (status INT NULL DEFAULT 1, name VARCHAR(45) NOT NULL, job INT NULL DEFAULT 0, admin INT NULL DEFAULT 0, id INT NULL DEFAULT 0, PRIMARY KEY (name),  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE,  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);`);
    db.query(`CREATE TABLE ${chat} (chat VARCHAR(45) NOT NULL, name VARCHAR(45) NOT NULL);`)
    db.query(`INSERT INTO ${member} (name) VALUES (${req.body.user})`)
    db.query('UPDATE user SET ingame = 1 WHERE (name = ?);', [req.body.user]);
    res.json("성공");
    db.end();
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

    db.query('SELECT max from room WHERE (name = ?)', [req.body.name], function(err, rows){
        max = rows;
    })
    db.query('SELECT COUNT(*) from ?_member', [req.body.name], function(err, rows){
        people = rows;
    })

    db.query('SELECT status from room WHERE (name = ?)', [req.body.name], function(err, rows){
        status = rows;
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
    }
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
    let job = getJob(req);
        if(job === 1){
            if(checkDeath(req.body.user)){
                db.query(`SELECT status from ${req.body.name}_member WHERE (name = ${req.body.user})`, function(err, rows){
                    const status = Number(Object.keys.rows[0]);
                    if(status === 1){
                        db.query(`UPDATE ${req.body.name}_member SET status = 0 WHERE (name = ${req.body.user})`)
                    } 
                })
            }
        }
})

app.post('/detect', function(req, res){
    let job = getJob(req);
        if(job === 2){
            db.query(`UPDATE ${req.body.name}`)
        }
})

app.post('/heal', function(req, res){
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
})

app.get('/test', function(req, res){
    db.query('SELECT count(*) from user', [req.body.name], function(err, rows){
        res.json(Number(Object.keys(rows)[0]));
    })
})

app.get('/member', function(req, res){
    db.query(`SELECT count(*) from ${req.body}_member`, function(err, rows){
        res.json(Number(Object.keys(rows)[0]))
    })
})

app.post('/day', function(req, res){
    db.query(`UPDATE ${req.body.name}_member status=1 WHERE (name = 3)`)
})

app.post('/night', function(req, res){

})

app.get('/test2', function(req, res){
    db.connect();
    db.query(`CREATE TABLE ${req.body.name}_member (status INT NULL DEFAULT 1, name VARCHAR(45) NOT NULL, job INT NULL DEFAULT 0, admin INT NULL DEFAULT 0, id INT NULL DEFAULT 0, PRIMARY KEY (name),  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE,  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);`);
    res.json("1");
    db.end();
})

app.get('/test3', function(req, res){
    jwt.verify(req.body.token, SECRET_KEY, (err, encode) => {
        if(err){
            res.json(err)
        }
        else{
            res.json(encode)
        }
    })
})