const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fetch = require('node-fetch');
const { Headers } = require('node-fetch');
const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const apiSources = [
  {
    apiSourceName: 'FavQs',
    getUrl: (query) => {
      return `https://favqs.com/api/quotes/?filter=${query}`;
    },
    getHeaders: () => ({
      Authorization: `Token token=${process.env.FAVQKEY}`,
    }),
    normalizer: (results) => {
      return results; // Add normalizer here
    },
  },
  {
    apiSourceName: 'Advice Slip',
    getUrl: (query) => {
      return `https://api.adviceslip.com/advice/search/${query}`;
    },
    getHeaders: () => ({}),
    normalizer: (results) => {
      return results; // Add normalizer here
    },
  },
];

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

  const results = await queryQuoteSources(req.query.query);

  res.send(JSON.stringify({ results: _.flatten(results) }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
