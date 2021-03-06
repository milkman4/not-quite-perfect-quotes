const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fetch = require('node-fetch');
const apiSources = require('./apiSources');
const _ = require('lodash');
const dotenv = require('dotenv');
const NodeCache = require('node-cache');

// Initialize Cache with clear interval of 100 seconds
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

dotenv.config(); // initialize environment variables
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

async function queryQuoteSources(queryString) {
  return Promise.all(
    apiSources.map(async (apiSource) => {
      try {
        return await fetch(apiSource.getUrl(queryString), {
          headers: apiSource.getHeaders(),
        })
          .then((response) => {
            return response.json();
          })
          .then((jsonQuoteResults) => apiSource.normalizer(jsonQuoteResults));
      } catch (e) {
        // if one api errors out, don't break the others.
        console.log(e); // TODO: replace with some form of logging to a service to alert developers in production that an API is broken
        return []; // this will allow the Promise.all to succeed with an expected data type of Array
      }
    })
  );
}

app.get('/api/quotes', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    const queryString = req.query.query;
    const results = myCache.has(queryString)
      ? myCache.get(queryString)
      : await queryQuoteSources(queryString);

    const flattenedResults = _.flatten(results); // return all results in one array
    myCache.set(queryString, flattenedResults);

    res.status(200);
    res.send(JSON.stringify({ results: flattenedResults }));
  } catch (e) {
    res.status(401);
    res.send(JSON.stringify({ error: e.message }));
  }
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

module.exports = { apiSources };
