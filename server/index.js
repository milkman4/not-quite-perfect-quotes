const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fetch = require('node-fetch');
const apiSources = require('./apiSources');
const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

/*
Normalized Quote Object:
{
  id: Number
  quote: String,
  attribution: String,
  apiSource: String
}
*/

async function queryQuoteSources(queryString) {
  return Promise.all(
    apiSources.map(async (apiSource) => {
      return await fetch(apiSource.getUrl(queryString), {
        headers: apiSource.getHeaders(),
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonQuoteResults) => apiSource.normalizer(jsonQuoteResults));
    })
  );
}

app.get('/api/quotes', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    const results = await queryQuoteSources(req.query.query);
    res.status(200);
    res.send(JSON.stringify({ results: _.flatten(results) }));
  } catch (e) {
    res.status(401);
    res.send(JSON.stringify({ error: e.message }));
  }
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

module.exports = { apiSources };
