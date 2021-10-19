const express = require('express');
const app = express();
const bodyParser = require('body-prser')/*
app.use(bodyParser.urlencoded({extended: true}));*/

// DB연결

const mysql = require('mysql');

/*const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: 'dongseopfuck1',
    database: "mafia"
})*/

/*const User = require("../models/user");*/
/*let url =  "mongodb://localhost:27017/dalhav";
mysql.connect(url, {useNewUrlParser: true});

app.listen(1234, function(){
    console.log('server opened');
});*/

app.get('/login', function(req, res){
    res.json('hello');
})

/*
app.post('/signup', function(req, res){

})

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
    console.log('Example app listening on port',1234);
});