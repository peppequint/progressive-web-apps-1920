const data = require('./../modules/data');

function getHomeTeam(id) {
  const home = data(`https://api.football-data.org/v2/teams/${id}`);

  return home;
}

function getAwayTeam(id) {
  const away = data(`https://api.football-data.org/v2/teams/${id}`);

  return away;
}

function getDetailsMatch(id) {
  const match = data(`https://api.football-data.org/v2/matches/${id}`);

  return match;
}

async function match(req, res) {
  const data = await getDetailsMatch(req.params.id);

  const homeTeam = await getHomeTeam(data.match.homeTeam.id);
  const awayTeam = await getAwayTeam(data.match.awayTeam.id);

  return Promise.all([homeTeam, awayTeam, data]).then(data => {
    res.render('pages/match', { home: data[0], away: data[1], match: data[2] });
  });
}

module.exports = match;
