/// <reference path='../typings/tsd.d.ts' />


import express = require('express');
import path = require('path');

import bodyParser = require('body-parser');

var app : express.Express = express();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(express.static(path.join(__dirname, '/../public')));

// view engine setup
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs'); 





var todos : Array<{id : number , todo : string}>= [];


app.get("/"  ,  function(req, res){
	
	console.log(todos);
	
	res.render("./index" , { todos : JSON.stringify(todos) } );
	
})

app.post("/" , function(req , res){
	
	var object = {
	    id    : Date.now(),		
        todo  : req.body.todo 			
	  
	    
}


	
	todos.push(object);
	
    res.redirect("/");
})


app.get("/deletetodo/:id" , function(req , res ){
	for(var i = 0 ; i < todos.length ;i++){
		
		if(req.params.id == todos[i].id){
			todos.splice(i , 1);
			break;
		}
		
	}
	res.redirect("/");
});





var port: number = process.env.PORT || 4000;
var server = app.listen(port, () => {
	var listeningPort: number = server.address().port;
	console.log('The server is listening on port: ' + listeningPort);
});