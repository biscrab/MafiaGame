const express = require('express');
const app = express();
app.use(express.json());
let jwt = require("jsonwebtoken");
var fs = require('fs');
const http = require('http');
var server = require('http').createServer(app);
const mysql = require('mysql');
const io = require('socket.io')(server);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: 'dongseopfuck1',
    database: "sys"
})

io.on('connection', function(socket) {
    console.log("연결")
});

app.listen(1234, function () {
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

app.get('/test', function(req, res){
    res.json(1)
})

/*
app.post('/room', function(req, res){
    if(req.body.password){

    }else{
    
    }
})

app.delete('/room', function(req, res){

})

app.post('/kill', function(req, res){

})*/