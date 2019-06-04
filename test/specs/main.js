/**
 * Testing
 * @ndaidong
 */

const test = require('tap').test;

const {
  hasProperty,
  isObject,
  isString,
  isNumber,
  isFunction,
} = require('bellajs');

const AP = require('../../index');
const {
  extract,
  hasProvider,
} = AP;

const UTILS = require('../../src/utils/index');

const {
  isValidURL,
} = UTILS;

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
  test('Testing isValidUrl', (t) => {
    t.notOk(isValidURL(5));
    t.notOk(isValidURL(false));
    t.notOk(isValidURL(null));
    t.notOk(isValidURL(undefined));
    t.notOk(isValidURL('no/URL/xxx.css//'));
    t.ok('google.com');
    t.end();
  });
})();

(() => {
  test('Testing hasProvider', (t) => {
    t.notOk(hasProvider('fantasticfreefoodforyou.de'));
    t.ok(hasProvider('https://www.deviantart.com/joeyjazz/art/SP-Ocean-Eclipse-781257606'));
    t.ok(hasProvider('https://www.facebook.com/alternate.de/photos/a.391014166661/10156375231596662/?type=3&theater'));
    t.ok(hasProvider('https://www.ted.com/talks/monique_w_morris_why_black_girls_are_targeted_for_punishment_at_school_and_how_to_change_that?utm_campaign=tedspread&utm_medium=referral&utm_source=tedcomshare'));
    t.end();
  });
})();

(() => {
  test('Testing isValidUrl', (t) => {
    t.end();
  });
})();

(() => {
  const richSamples = [
    'https://www.youtube.com/watch?v=8jPQjjsBbIc',
    'https://www.ted.com/talks/monique_w_morris_why_black_girls_are_targeted_for_punishment_at_school_and_how_to_change_that?utm_campaign=tedspread&utm_medium=referral&utm_source=tedcomshare',
    'https://www.instagram.com/p/Bx9h8mdpMPF/?utm_source=ig_web_button_share_sheet',
    'https://www.facebook.com/alternate.de/photos/a.391014166661/10156375231596662/?type=3&theater',
    'https://www.facebook.com/RocketBeansTV/videos/364684367488603/',
    'https://twitter.com/tribandtweets/status/1133308311917481984',
    'https://twitter.com/NetflixDE/status/1133310428476530688',
    'https://twitter.com/officialmcafee/status/1133280322039291905',
  ];

  const photoSamples = [
    'http://fav.me/dcx5286',
    'https://www.deviantart.com/joeyjazz/art/SP-Ocean-Eclipse-781257606',
    'https://flic.kr/p/5QEkmq',
  ];

  let url = 'https://www.youtube.com/watch?v=8jPQjjsBbIc';
  const sizes = {
    maxheight: 250,
    maxwidth: 250,
  };


  test('Testing all goodSamples for valid URL', {timeout: 15000}, (t) => {
    richSamples.every((sample) => {
      t.comment('Sample is ' + sample);
      return t.ok(isValidURL(sample));
    });
    t.end();
  });

  const testRichOne = (url) => {
    test(`Testing with .extract(${url})`, {timeout: 15000}, (t) => {
      extract(url).then((art) => {
        t.comment('(Call returned result is R, so:)');
        t.ok(isObject(art), 'R must be an object.');
        t.ok(hasRichKeys(art), 'R must have all required keys.');
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
        t.error(e);
        t.end();
      });
    });
  };

  const testPhotoOne = (url) => {
    test(`Testing with .extract(${url})`, {timeout: 15000}, (t) => {
      extract(url).then((art) => {
        t.comment('(Call returned result is R, so:)');
        t.ok(isObject(art), 'R must be an object.');
        t.ok(hasPhotoKeys(art), 'R must have all required keys.');
        t.ok(isString(art.type), 'R.type must be a string.');
        t.ok(art.type.length > 0, 'R.type is not empty.');
        t.ok(isString(art.url), 'R.url must be a string.');
        t.ok(art.url.length > 0, 'R.url is not empty.');
        t.ok(isString(art.provider_url), 'R.provider_url must be a string.');
        t.ok(art.provider_url.length > 0, 'R.provider_url is not empty.');
        t.ok(isString(art.provider_name), 'R.provider_name must be a string.');
        t.ok(art.provider_name.length > 0, 'R.provider_name is not empty.');
        t.end();
      }).catch((e) => {
        t.error(e);
        t.end();
      });
    });
  };

  richSamples.forEach((item) => testRichOne(item));
  photoSamples.forEach((item) => testPhotoOne(item));

  test(`Testing with .extract(${url},${JSON.stringify(sizes)}`, {timeout: 15000}, (t) => {
    extract(url, sizes).then((art) => {
      t.comment('(Call returned result is R, so:)');
      t.ok(/width="250"/.test(art.html), 'R.html provides correct width param.');
      t.ok(isNumber(art.width), 'R.width not empty.');
      t.ok(isNumber(art.height), 'R.height not empty.');
      t.end();
    }).catch((e) => {
      t.error(e);
      t.end();
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
