require('dotenv').config();
const data = require('./../modules/data');

function getDetailsTeam(id) {
  const team = data(`${process.env.ENDPOINT}teams/${id}`);

  return team;
}

function getDetailsMatch(id) {
  const match = data(`${process.env.ENDPOINT}matches/${id}`);

  return match;
}

async function match(req, res) {
  const data = await getDetailsMatch(req.params.id);

  const homeTeam = await getDetailsTeam(data.match.homeTeam.id);
  const awayTeam = await getDetailsTeam(data.match.awayTeam.id);

  return Promise.all([homeTeam, awayTeam, data]).then(data => {
    res.render('pages/match', { home: data[0], away: data[1], match: data[2] });
  });
}

module.exports = match;
