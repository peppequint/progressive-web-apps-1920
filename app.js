require('dotenv').config();

const express = require('express');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 4000;

const fetch = require('node-fetch');
const path = require('path');

const API_KEY = process.env.API_KEY;

app.use(express.static(path.join(__dirname, '/public/static')));
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

app.get('/', (req, res) => {
  const matches = new Promise((resolve, reject) => {
    fetch('https://api.football-data.org/v2/matches', {
      headers: { 'X-Auth-Token': API_KEY }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        resolve(data);
      });
  });

  const competitions = new Promise((resolve, reject) => {
    fetch('https://api.football-data.org/v2/competitions?plan=TIER_ONE', {
      headers: { 'X-Auth-Token': API_KEY }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        resolve(data);
      });
  });

  Promise.all([matches, competitions]).then(data => {
    res.render('pages/index', { matches: data[0].matches, competitions: data[1].competitions });
  });
});

app.get('/match/:id', (req, res) => {
  fetch(`https://api.football-data.org/v2/matches/${req.params.id}`, {
    headers: { 'X-Auth-Token': API_KEY }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      const homeTeam = data.match.homeTeam.id;
      const awayTeam = data.match.awayTeam.id;
      const match = data;

      const home = new Promise((resolve, reject) => {
        fetch(`https://api.football-data.org/v2/teams/${homeTeam}`, {
          headers: { 'X-Auth-Token': API_KEY }
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            resolve(data);
          });
      });

      const away = new Promise((resolve, reject) => {
        fetch(`https://api.football-data.org/v2/teams/${awayTeam}`, {
          headers: { 'X-Auth-Token': API_KEY }
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            resolve(data);
          });
      });

      Promise.all([home, away, match]).then(data => {
        res.render('pages/match', { home: data[0], away: data[1], match: data[2] });
      });
    });
});

app.get('/competition/:id', (req, res) => {
  fetch(`https://api.football-data.org/v2/competitions/${req.params.id}/standings`, {
    headers: { 'X-Auth-Token': API_KEY }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      res.render('pages/competition', { competition: data });
    });
});

app.listen(port, () => console.log(`Progressive Web App running on port ${port}.`));
