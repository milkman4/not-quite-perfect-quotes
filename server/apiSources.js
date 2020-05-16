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
      if (!results.quotes) return [];
      return results.quotes.map((result) => ({
        id: result.id,
        quote: result.body,
        attribution: result.author,
        apiSource: 'FavQs',
      }));
    },
  },
  {
    apiSourceName: 'Advice Slip',
    getUrl: (query) => {
      return `https://api.adviceslip.com/advice/search/${query}`;
    },
    getHeaders: () => ({}), // No Auth Required
    normalizer: (results) => {
      if (!results.slips) return [];
      return results.slips.map((result) => ({
        id: result.id,
        quote: result.advice,
        attribution: `Anonymous`, // API Does not have an attribution
        apiSource: 'Advice Slip',
      }));
    },
  },
];

module.exports = apiSources;
