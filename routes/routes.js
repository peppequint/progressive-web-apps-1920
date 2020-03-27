const express = require('express');
const app = express();

const overview = require('./../modules/overview');
const match = require('./../modules/match');
const competition = require('./../modules/competition');

app
  .get('/', overview)
  .get('/match/:id', match)
  .get('/competition/:id', competition)
  .get('/offline', (req, res) => {
    res.render('pages/offline');
  });

module.exports = app;
