const express = require('express');

//create an instance of express application
const app = express();

//tells the server what to do when a get request at the given route is called
app.get('/', (request, response) => response.send('Hello World'));
app.get('/login', (request, response) => response.send('Log in'));
app.get('/register', (request, response) => response.send('Register'));

//make application listen to port 3000
app.listen(3000, () => console.log('App listening for connections'));