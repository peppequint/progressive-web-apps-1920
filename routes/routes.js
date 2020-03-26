const express = require('express');
const app = express();

const data = require('./../modules/data');

app
  .get('/', (req, res) => {
    const matches = data('https://api.football-data.org/v2/matches');

    const competitions = data('https://api.football-data.org/v2/competitions?plan=TIER_ONE');

    Promise.all([matches, competitions]).then(data => {
      console.log(data[0]);

      res.render('pages/index', { matches: data[0].matches, competitions: data[1].competitions });
    });
  })

  .get('/match/:id', (req, res) => {
    const matchDetails = data(`https://api.football-data.org/v2/matches/${req.params.id}`);
    matchDetails.then(data => {
      const homeTeam = data.match.homeTeam.id;
      const awayTeam = data.match.awayTeam.id;
      const match = data;

      const home = data(`https://api.football-data.org/v2/teams/${homeTeam}`);
      const away = data(`https://api.football-data.org/v2/teams/${awayTeam}`);

      Promise.all([home, away, match]).then(data => {
        res.render('pages/match', { home: data[0], away: data[1], match: data[2] });
      });
    });
  })

  .get('/competition/:id', (req, res) => {
    data(`https://api.football-data.org/v2/competitions/${req.params.id}/standings`).then(data => {
      res.render('pages/competition', { competition: data });
    });
  })

  .get('/offline', (req, res) => {
    res.render('pages/offline');
  });

  module.exports = app;