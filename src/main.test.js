// main

const {
  hasProperty,
  isFunction,
} = require('bellajs');

const {
  extract,
  hasProvider,
  setProviderList,
} = require('./main');

const required = [
  'type',
  'version',
];

const optional = [
  'provider_url',
  'provider_name',
];

const RichTypeKeys = [
  'html',
  'width',
  'height',
  ...optional,
  ...required,
];

const PhotoTypeKeys = [
  'url',
  'width',
  'height',
  ...optional,
  ...required,
];

const hasRichKeys = (o) => {
  return RichTypeKeys.every((k) => {
    return hasProperty(o, k);
  });
};

const hasPhotoKeys = (o) => {
  return PhotoTypeKeys.every((k) => {
    return hasProperty(o, k);
  });
};

(() => {
  const badSamples = [
    '',
    {k: 9},
    [1, 3, 4],
    301932,
    'htt:/abc.com/failed-none-sense',
    'https://abc.com/failed-none-sense',
    'http://badcom/146753785',
    'https://674458092126388225',
    'http://www.ted.com/talks/something-does-not-exist',
    'https://soundcloud^(*%%$%^$$%$$*&(&)())',
  ];


  const testBadOne = (url) => {
    test(`testing extract bad url "${url}"`, async () => {
      try {
        await extract(url);
      } catch (err) {
        expect(err instanceof Error).toBe(true);
      }
    });
  };

  badSamples.map(testBadOne);
})();

test(`test .hasProvider() method`, () => {
  expect(hasProvider('https://www.youtube.com/watch?v=zh9NgGf3cxU')).toBe(true);
  expect(hasProvider('https://trello.com/b/BO3bg7yn/notes')).toBe(false);
});

test(`test .setProviderList() method`, () => {
  const customProviderOnly = [
    {
      provider_name: 'Example',
      provider_url: 'http://www.example.org',
      endpoints: [
        {
          schemes: [
            'http://www.example.org/media/*',
          ],
          url: 'http://www.example.org/oembed',
        },
      ],
    },
  ];
  setProviderList(customProviderOnly);
  expect(hasProvider('http://www.example.org/media/abcdef')).toBe(true);
  expect(hasProvider('https://www.youtube.com/watch?v=zh9NgGf3cxU')).toBe(false);
});
