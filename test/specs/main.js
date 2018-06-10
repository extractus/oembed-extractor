/**
 * Testing
 * @ndaidong
 */

const test = require('tap').test;

const {
  hasProperty,
  isObject,
  isString,
  isFunction,
} = require('bellajs');

const AP = require('../../index');
const {
  extract,
  hasProvider,
} = AP;

const hasRequiredKeys = (o) => {
  let structure = [
    'type',
    'version',
    'html',
    'provider_url',
    'provider_name',
  ];

  return structure.every((k) => {
    return hasProperty(o, k);
  });
};

(() => {
  let url = 'https://www.youtube.com/watch?v=8jPQjjsBbIc';

  test(`Testing with .extract(${url})`, {timeout: 15000}, (t) => {
    extract(url).then((art) => {
      t.comment('(Call returned result is R, so:)');
      t.ok(isObject(art), 'R must be an object.');
      t.ok(hasRequiredKeys(art), 'R must have all required keys.');
      t.ok(isString(art.type), 'R.type must be a string.');
      t.ok(art.type.length > 0, 'R.type is not empty.');
      t.ok(isString(art.html), 'R.html must be a string.');
      t.ok(art.html.length > 0, 'R.html is not empty.');
      t.ok(isString(art.provider_url), 'R.provider_url must be a string.');
      t.ok(art.provider_url.length > 0, 'R.provider_url is not empty.');
      t.ok(isString(art.provider_name), 'R.provider_name must be a string.');
      t.ok(art.provider_name.length > 0, 'R.provider_name is not empty.');
      t.end();
    }).catch((e) => {
      t.end(e);
    });
  });
})();

(() => {
  let badSamples = [
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
    'https://www.flickr.com/services/oembed/?url=http%3A//www.flickr.com/photos/bees/23416sa/',
  ];


  const testBadOne = (url) => {
    test(`Testing with .extract(${url})`, {timeout: 15000}, (t) => {
      extract(url).then((art) => {
        t.fail(art, 'Could not return result in this case');
      }).catch((e) => {
        t.pass(e, 'Test must be failed');
      }).finally(() => {
        t.end();
      });
    });
  };

  badSamples.map(testBadOne);
})();

test(`Testing .hasProvider() method`, (t) => {
  t.ok(isFunction(hasProvider), 'hasProvider must be a function');
  t.equals(hasProvider('https://www.youtube.com/watch?v=zh9NgGf3cxU'), true, 'YouTube URL has oEmbed provider');
  t.equals(hasProvider('https://trello.com/b/BO3bg7yn/notes'), false, 'Trello URL has no oEmbed provider');
  t.end();
});
