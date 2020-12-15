const express = require('express');
const app = express();
//Our http client, since fetch() isn't in Nodejs
const axios = require('axios');
//Tells Express to use Pug 
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
	const query = await axios.get('http://localhost:3001/results');
	//Passes object literal containing all data
	res.render('index', { employees: query.data });
	
  //res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
