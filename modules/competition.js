const data = require('./../modules/data');

async function competition(req, res) {
  const standings = await data(`https://api.football-data.org/v2/competitions/${req.params.id}/standings`).then(data => {
    res.render('pages/competition', { competition: data });
  });

  return standings;
}

module.exports = competition;
