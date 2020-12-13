//Require the express module, built in bodyParser middlware, and set our app and port variables
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//Defined in .env file
const port = process.env.PORT || 5000; 

//To get all the exported functions from queries.js, we'll 'require' the file and assign it to a variable.
const db = require('./db/queries.js')

// Use bodyParser to parse JSON
app.use(bodyParser.json())

//Static file declaration, which is the location of the React app
//Used in deployment by React app to access index.js
app.use(express.static(path.join(__dirname, 'client/build'))); 

//tell a route to look for a GET request on the root (/) URL, 
//and return some JSON.
app.get("/", (request, response) => {
  if (error) {
    throw error
  }
  //response.send("Server running on Node.js, Express, and Postgres API")
  response.sendFile(__dirname + '/public/index.html');
  //response.json({ info: "Server running on Node.js, Express, and Postgres API" });
})

app.get("/NewArrivals", db.getNewArrivals)

/*set the app to listen on the port you set*/
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

