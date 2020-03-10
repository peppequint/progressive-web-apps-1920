require('dotenv').config();

const express = require('express');
const app = express();
const port = 4000;

const fetch = require('node-fetch');
const path = require('path');

app.use(express.static('./public/static'));

app.set('view engine', 'ejs');
app.set('views', 'public/views');

app.get('/', (req, res) => {
  fetch('https://api.football-data.org/v2/matches', {
    headers: { 'X-Auth-Token': process.env.API_KEY }
  })
    .then(res => {
      return res.json();
    })
    .then(data => res.render('pages/index', { data: data.matches }));
});

app.listen(port, () => console.log(`Progressive Web App running on port ${port}.`));
