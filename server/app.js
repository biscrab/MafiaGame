const express = require('express');
const app = express();
app.use(express.json());
let jwt = require("jsonwebtoken");
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
    db.query('INSERT INTO room (name, password, max) VALUES (?, ?, ?)', [req.body.name, req.body.password, req.body.max], function(error, results, fields){
        if(error){
            res.json("error");
        }
        else{
            db.query('CREATE TABLE ? ( status INT NULL DEFAULT 1, name VARCHAR(45) NOT NULL, job INT NULL DEFAULT 0, id INT NULL DEFAULT 0, PRIMARY KEY (name),  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE,  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);', [member]);
            db.query('CREATE TABLE ? (chat VARCHAR(45) NOT NULL, name VARCHAR(45) NOT NULL);', [chat])
            db.query('INSERT INTO ? (name) VALUES (?)', [member, req.body.name])
            db.query('UPDATE user SET ingame = 1 WHERE (name = ?);', [req.body.name]);
            res.json("성공");
        }
    })
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

})

app.delete('/room', function(req, res){

})

app.post('/kill', function(req, res){

})

app.post('/detect', function(req, res){
    db.query('SELECT job from ?_member WHERE (name = ?)', [req.body.id, req.body.name], function(err, rows){

    })
})

app.get('/test', function(req, res){
    db.query('SELECT count(*) from user', [req.body.name], function(err, rows){
        res.json(rows);
    })
})

app.get('/member', function(req, res){
    db.query('SELECT count(*) from ?_member', [req.body], function(err, rows){
        res.json(rows);
    })
})