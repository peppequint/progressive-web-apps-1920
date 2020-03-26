require('dotenv').config();
const fetch = require('node-fetch');

async function data(url) {
  const call = await fetch(url, {
    headers: { 'X-Auth-Token': process.env.API_KEY }
  });

  const response = await call.json();

  return response;
}

module.exports = data;
