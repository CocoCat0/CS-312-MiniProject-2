//Declare and assigning const variables and require methods to begin establishing routes
//Express
const express = require('express');
//Axios
const axios = require('axios');
//Path
const path = require('path');
//app
const app = express();
//PORT
const PORT = process.env.PORT || 3000;

//Requiring the dotenv to manage environment variables
require('dotenv').config();
//Set the EJS template to create interactive HTML pages
app.set('view engine', 'ejs');
// Serve static files from the "public" directory to the client/user
app.use(express.static('public'));
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

//Establishing Routes and rendering the home page
app.get('/', (req, res) => {
  res.render('index');
});

//
app.get('/result', async (req, res) => {
//assigning a jokeurl variable  to make it bearable
  const jokeUrl = 'https://v2.jokeapi.dev/joke/Any';
  try {
    //use the GET method to get a joke data from the Joke API
    const jokeResponse = await axios.get(jokeUrl);
    //getting the joke data and storing it in the joke data variable
    const jokeData = jokeResponse.data;
    //take the joke data into result.esj and render it within the html
    res.render('result', { data: jokeData });
  }
  //if the joke data isnt recieved or theres an error getting the joke data, the code will display a error.esj page, so the website won't break
  catch (error) {
    res.render('error', { message: 'Failed to fetch data. Please try again!' });
  }
});

// Starts the server, aka localhost:3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
