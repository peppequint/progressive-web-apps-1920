const data = require('./../modules/data');

const matches = data('https://api.football-data.org/v2/matches');
const competitions = data('https://api.football-data.org/v2/competitions?plan=TIER_ONE');

async function overview(req, res) {
  return Promise.all([matches, competitions]).then(data => {
    res.render('pages/index', { matches: data[0].matches, competitions: data[1].competitions });
  });
}

module.exports = overview;
