const apiSources = require('./apiSources.js');

describe('Normalizer Tests', () => {
  it('should normalize data correctly for api source 1', () => {
    const FavQsNormalizer = apiSources[0].normalizer;
    const exampleFavQApiResponse = {
      page: 1,
      last_page: false,
      quotes: [
        {
          id: 468,
          dialogue: false,
          private: false,
          tags: ['obstacles', 'success'],
          url:
            'https://favqs.com/quotes/leonardo-da-vinci/468-the-greatest-de-',
          favorites_count: 4,
          upvotes_count: 1,
          downvotes_count: 0,
          author: 'Leonardo da Vinci',
          author_permalink: 'leonardo-da-vinci',
          body: 'The greatest deception men suffer is from their own opinions.',
        },
        {
          id: 390,
          dialogue: false,
          private: false,
          tags: ['challenges', 'failure', 'persistence'],
          url:
            'https://favqs.com/quotes/ralph-waldo-emerson/390-our-greatest-gl-',
          favorites_count: 6,
          upvotes_count: 1,
          downvotes_count: 0,
          author: 'Ralph Waldo Emerson',
          author_permalink: 'ralph-waldo-emerson',
          body:
            'Our greatest glory is not in never failing, but in raising up every time we fail.',
        },
        {
          id: 480,
          dialogue: false,
          private: false,
          tags: ['conquer', 'overcome', 'failure', 'chinese', 'philosopher'],
          url: 'https://favqs.com/quotes/confucius/480-our-greatest-gl-',
          favorites_count: 2,
          upvotes_count: 1,
          downvotes_count: 0,
          author: 'Confucius',
          author_permalink: 'confucius',
          body:
            'Our greatest glory is not in never falling, but in rising every time we fall.',
        },
      ],
    };

    const result = FavQsNormalizer(exampleFavQApiResponse);
    expect(result).toEqual([
      {
        id: 468,
        quote: 'The greatest deception men suffer is from their own opinions.',
        attribution: 'Leonardo da Vinci',
        apiSource: 'FavQs',
      },
      {
        id: 390,
        quote:
          'Our greatest glory is not in never failing, but in raising up every time we fail.',
        attribution: 'Ralph Waldo Emerson',
        apiSource: 'FavQs',
      },
      {
        id: 480,
        quote:
          'Our greatest glory is not in never falling, but in rising every time we fall.',
        attribution: 'Confucius',
        apiSource: 'FavQs',
      },
    ]);
  });

  it('should normalize data correctly for api source 2', () => {
    const AdviceSlipNormalizer = apiSources[1].normalizer;
    const exampleAdviceSlipApiResponse = {
      total_results: '49',
      query: 'hi',
      slips: [
        {
          id: 32,
          advice: 'Everything in moderation, including moderation itself.',
          date: '2016-01-21',
        },
        {
          id: 34,
          advice:
            'To improve productivity, always have a shittier task to put off.',
          date: '2016-09-26',
        },
        {
          id: 35,
          advice:
            'Only those who attempt the impossible can achieve the absurd.',
          date: '2014-12-05',
        },
      ],
    };
    const results = AdviceSlipNormalizer(exampleAdviceSlipApiResponse);
    expect(results).toEqual([
      {
        id: 32,
        quote: 'Everything in moderation, including moderation itself.',
        attribution: 'Anonymous',
        apiSource: 'Advice Slip',
      },
      {
        id: 34,
        quote:
          'To improve productivity, always have a shittier task to put off.',
        attribution: 'Anonymous',
        apiSource: 'Advice Slip',
      },
      {
        id: 35,
        quote: 'Only those who attempt the impossible can achieve the absurd.',
        attribution: 'Anonymous',
        apiSource: 'Advice Slip',
      },
    ]);
  });
});
