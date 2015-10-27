/// <reference path='../typings/tsd.d.ts' />
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, '/../public')));
// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');
var todos = [];
app.get("/", function (req, res) {
    console.log(todos);
    res.render("./index", { todos: JSON.stringify(todos) });
});
app.post("/", function (req, res) {
    var object = {
        id: Date.now(),
        todo: req.body.todo
    };
    todos.push(object);
    res.redirect("/");
});
app.get("/deletetodo/:id", function (req, res) {
    for (var i = 0; i < todos.length; i++) {
        if (req.params.id == todos[i].id) {
            todos.splice(i, 1);
            break;
        }
    }
    res.redirect("/");
});
var port = process.env.PORT || 4000;
var server = app.listen(port, function () {
    var listeningPort = server.address().port;
    console.log('The server is listening on port: ' + listeningPort);
});
