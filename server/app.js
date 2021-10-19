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
});

app.listen(PORT, function () {
    console.log('Example app listening on port',PORT);
});