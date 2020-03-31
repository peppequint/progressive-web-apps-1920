require('dotenv').config();
const data = require('./../modules/data');

const matches = data(`${process.env.ENDPOINT}matches`);
const competitions = data(`${process.env.ENDPOINT}competitions?plan=TIER_ONE`);

async function overview(req, res) {
  return Promise.all([matches, competitions]).then(data => {
    res.render('pages/index', { matches: data[0].matches, competitions: data[1].competitions });
  });
}

module.exports = overview;
