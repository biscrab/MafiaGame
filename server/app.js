const express = require('express');
const app = express();
app.use(express.json());
let jwt = require("jsonwebtoken");

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//const bodyParser = require('body-prser')
//app.use(bodyParser.urlencoded({extended: true}));

// DB연결

const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: 'dongseopfuck1',
    database: "sys"
})

db.connect();

/*const User = require("../models/user");*/
/*let url =  "mongodb://localhost:27017/dalhav";
mysql.connect(url, {useNewUrlParser: true});

app.listen(1234, function(){
    console.log('server opened');
});*/

app.post('/login', function(req, res){

    db.query(`SELECT * FROM user WHERE name=? and password=?`, [req.body.name, req.body.password], function(err, rows){
        if(err){
            res.json("error");
        }
        else{
            const name = 1;
            const password = 1;
            const token = jwt.sign({name, password},{expiresln:"24h"})
            res.json(token);
        }
    })
})

app.post('/signup', function(req, res){
    db.query(`INSERT INTO user (name, password) VALUES (?, ?);`, [req.body.name, req.body.password], function(error, results, fields){
        if(error){
            res.json(error);
        }
        else{
            res.json(1);
        }
    });
    console.log(req.body.password);
})

/*
app.post('/room', function(req, res){

})

app.delete('/room', function(req, res){

})

app.post('/kill', function(req, res){

})*/

/*var http = require('http');
var fs = require('fs');
var url = require('url');

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const PORT= process.env.PORT || 1234;
const mongoose = require('mongoose');
let url =  "mongodb://localhost:1234/dalhav";
mongoose.connect(url, {useNewUrlParser: true});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/bye', function (req, res) {
    res.send('Bye World!');
});*/

app.listen(1234, function () {
    console.log('Example app listening on port', 1234);
});