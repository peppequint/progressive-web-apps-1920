require('dotenv').config();
const data = require('./../modules/data');

async function competition(req, res) {
  const standings = await data(`${process.env.ENDPOINT}competitions/${req.params.id}/standings`).then(data => {
    res.render('pages/competition', { competition: data });
  });

  return standings;
}

module.exports = competition;
