require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const fetch = require('node-fetch');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

app.get('/', (req, res) => {
  fetch('https://api.football-data.org/v2/matches', {
    headers: { 'X-Auth-Token': process.env.API_KEY }
  })
    .then(res => {
      return res.json();
    })
    .then(data => console.log(data.matches[1].competition));
});

app.listen(port, () => console.log(`Progressive Web App running on port ${port}.`));
