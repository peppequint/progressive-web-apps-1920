require('dotenv').config();
const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;

async function data(url) {
  const apiCall = await fetch(url, {
    headers: { 'X-Auth-Token': API_KEY }
  });

  const receiveData = await apiCall.json();

  return receiveData;
}

module.exports = data;
