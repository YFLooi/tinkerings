const express = require('express'); 
//parses json
const bodyParser = require('body-parser'); 
const api = require('./queries.js'); 
require('dotenv').config(); //Allows retriving variables from the .env file

const port = process.env.PORT; 
//This setup calls the express function to return a server object in 
//a variable named "app"
const app=express(); 

//Opens PORT on load
app.listen(port, function() { 
	console.log("Server is listening at port:" + port); 
}); 

// Parses the text as url encoded data 
app.use(bodyParser.urlencoded({extended: true})); 

// Parses the text as json 
app.use(bodyParser.json()); 

//Routes all calls to /api to queries.js
//queries.js has the target URI for each request
//All calls thus have the URI "/api/name-of-endpoint"
app.use('/api', api);