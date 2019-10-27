/**
 * Testing
 * @ndaidong
 */

/* eslint-disable camelcase */

import {test} from 'tap';

import {
  hasProperty,
  isObject,
  isString,
  isNumber,
  isFunction,
} from 'bellajs';

import {
  extract,
  hasProvider,
  setProviderList,
} from '../../index';

import {
  isValidURL,
} from '../../src/utils/index';

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
    t.ok(hasProvider('https://www.kijk.nl/video/7UFNzXmSKSn'));
    t.ok(hasProvider('https://www.kijk.nl/net5/hotelrules/videos/7UFNzXmSKSn/komen-ze-er-zonder-kleerscheuren-vanaf'));
    t.ok(hasProvider('https://www.instagram.com/farid_rueda/p/Bx-0nVPCe2c/?igshid=18g4fpv1khfug'));
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
    'https://www.youtube.com/watch?v=cc-elFcs96Y',
    'https://youtu.be/I8u2NdWuaYs',
    'https://www.ted.com/talks/monique_w_morris_why_black_girls_are_targeted_for_punishment_at_school_and_how_to_change_that?utm_campaign=tedspread&utm_medium=referral&utm_source=tedcomshare',
    'https://www.instagram.com/p/Bx9h8mdpMPF/?utm_source=ig_web_button_share_sheet',
    'https://www.facebook.com/alternate.de/photos/a.391014166661/10156375231596662/?type=3&theater',
    'https://www.facebook.com/RocketBeansTV/videos/364684367488603/',
    'https://twitter.com/tribandtweets/status/1133308311917481984',
    'https://twitter.com/NetflixDE/status/1133310428476530688',
    'https://twitter.com/officialmcafee/status/1133280322039291905',
    'https://www.kijk.nl/video/7UFNzXmSKSn',
    'https://www.kijk.nl/net5/hotelrules/videos/7UFNzXmSKSn/komen-ze-er-zonder-kleerscheuren-vanaf',
    'https://www.instagram.com/farid_rueda/p/Bx-0nVPCe2c/?igshid=18g4fpv1khfug',
  ];

  const photoSamples = [
    'http://fav.me/dcx5286',
    'https://www.deviantart.com/joeyjazz/art/SP-Ocean-Eclipse-781257606',
    'https://flic.kr/p/5QEkmq',
  ];

  const url = 'https://www.youtube.com/watch?v=8jPQjjsBbIc';
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
    test(`Testing with .extract(${url})`, {timeout: 15000}, async (t) => {
      try {
        const art = await extract(url);
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
      } catch (e) {
        t.error(e);
      } finally {
        t.end();
      }
    });
  };

  const testPhotoOne = (url) => {
    test(`Testing with .extract(${url})`, {timeout: 15000}, async (t) => {
      try {
        const art = await extract(url);
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
      } catch (e) {
        t.error(e);
      } finally {
        t.end();
      }
    });
  };

  richSamples.map(testRichOne);
  photoSamples.map(testPhotoOne);

  test(`Testing with .extract(${url},${JSON.stringify(sizes)})`, {timeout: 15000}, async (t) => {
    try {
      const art = await extract(url, sizes);
      t.comment('(Call returned result is R, so:)');
      t.ok(/width="250"/.test(art.html), 'R.html provides correct width param.');
      t.ok(isNumber(art.width), 'R.width not empty.');
      t.ok(isNumber(art.height), 'R.height not empty.');
    } catch (e) {
      t.error(e);
    } finally {
      t.end();
    }
  });
})();

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
    'https://www.flickr.com/services/oembed/?url=http%3A//www.flickr.com/photos/bees/23416sa/',
  ];


  const testBadOne = (url) => {
    test(`Testing with .extract(${url})`, {timeout: 15000}, async (t) => {
      try {
        t.comment(`Start testing ${url}`);
        const art = await extract(url);
        if (art) {
          t.fail(art, 'Could not return result in this case');
        } else {
          t.pass('Done');
        }
      } catch (err) {
        t.pass(err, 'Test must be failed');
      } finally {
        t.end();
      }
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

test(`Testing .setProviderList() method`, (t) => {
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

  t.ok(isFunction(setProviderList), 'setProviderList must be a function');
  setProviderList(customProviderOnly);
  t.equals(hasProvider('https://www.youtube.com/watch?v=zh9NgGf3cxU'), false, 'YouTube URL has no oEmbed provider');
  t.equals(hasProvider('http://www.example.org/media/abcdef'), true, 'www.example.org URL has oEmbed provider');
  t.end();
});
