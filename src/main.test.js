// main
/* eslint-env jest */

import { HttpsProxyAgent } from 'https-proxy-agent'

import nock from 'nock'

import {
  extract,
  hasProvider,
  findProvider,
  setProviderList
} from './main.js'

const env = process.env || {}
const PROXY_SERVER = env.PROXY_SERVER || ''

const required = [
  'type',
  'version',
]

const optional = [
  'provider_url',
  'provider_name',
]

const RichTypeKeys = [
  'html',
  'width',
  'height',
  ...optional,
  ...required,
]

const PhotoTypeKeys = [
  'url',
  'width',
  'height',
  ...optional,
  ...required,
]

const InstagramKeys = [
  'html',
  'width',
  ...optional,
  ...required,
]

const parseUrl = (url) => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname,
  }
}

const hasProperty = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

const hasRichKeys = (o) => {
  return RichTypeKeys.every((k) => {
    return hasProperty(o, k)
  })
}

const hasPhotoKeys = (o) => {
  return PhotoTypeKeys.every((k) => {
    return hasProperty(o, k)
  })
}

const hasInstagramKeys = (o) => {
  return InstagramKeys.every((k) => {
    return hasProperty(o, k)
  })
}

describe('test extract(bad url)', () => {
  const badSamples = [
    '',
    { k: 9 },
    [1, 3, 4],
    301932,
    'htt:/abc.com/failed-none-sense',
    'https://abc.com/failed-none-sense',
    'http://badcom/146753785',
    'https://674458092126388225',
    'http://www.ted.com/talks/something-does-not-exist',
    'https://soundcloud^(*%%$%^$$%$$*&(&)())',
  ]

  badSamples.forEach((url) => {
    test(`testing extract bad url "${url}"`, async () => {
      try {
        await extract(url)
      } catch (err) {
        expect(err).toBeTruthy()
      }
    })
  })
})

describe('test if extract() with some popular providers', () => {
  const cases = [
    {
      input: {
        url: 'https://youtu.be/qQpb1oCernE',
        file: './test-data/youtube.json',
      },
      expected: {
        provider_name: 'YouTube',
        type: 'video',
      },
      checkFn: hasRichKeys,
    },
    {
      input: {
        url: 'https://www.youtube.com/watch?v=ciS8aCrX-9s',
        file: './test-data/youtube_ciS8aCrX-9s.json',
      },
      expected: {
        provider_name: 'YouTube',
        type: 'video',
      },
      checkFn: hasRichKeys,
    },
    {
      input: {
        url: 'https://twitter.com/ndaidong/status/1173592062878314497',
        file: './test-data/twitter.json',
      },
      expected: {
        provider_name: 'Twitter',
        type: 'rich',
      },
      checkFn: hasRichKeys,
    },
    {
      input: {
        url: 'https://www.instagram.com/p/ic7kRDqOlt/',
        params: {
          access_token: '845078789498971|8ff3ab4ddd45b8f018b35c4fb7edac62',
        },
        file: './test-data/instagram_ic7kRDqOlt.json',
      },
      expected: {
        provider_name: 'Instagram',
        type: 'rich',
      },
      checkFn: hasInstagramKeys,
    },
    {
      input: {
        url: 'https://www.facebook.com/facebook/videos/10153231379946729/',
        params: {
          access_token: '845078789498971|8ff3ab4ddd45b8f018b35c4fb7edac62',
        },
        file: './test-data/facebook.json',
      },
      expected: {
        provider_name: 'Facebook',
        type: 'video',
      },
      checkFn: hasRichKeys,
    },
    {
      input: {
        url: 'https://flic.kr/p/2iYctUr',
        file: './test-data/flickr_2iYctUr.json',
      },
      expected: {
        provider_name: 'Flickr',
        type: 'photo',
        maxwidth: 1024,
        maxheight: 768,
      },
      checkFn: hasPhotoKeys,
    },
    {
      input: {
        url: 'https://flic.kr/p/2iYctUr',
        file: './test-data/flickr_2iYctUr_640x480.json',
      },
      expected: {
        provider_name: 'Flickr',
        type: 'photo',
        maxwidth: 640,
        maxheight: 480,
      },
      checkFn: hasPhotoKeys,
    },
  ]

  cases.forEach(({ input, expected, checkFn }) => {
    const { url, file, params = {} } = input
    test(`check fetchEmbed("${url}")`, async () => {
      const provider = findProvider(url)
      const { baseUrl, path } = parseUrl(provider.endpoint)

      const scope = nock(baseUrl, { encodedQueryParams: true })
      const queries = new URLSearchParams({
        url,
        format: 'json',
        ...params,
      })
      scope.get(path)
        .query(queries)
        .replyWithFile(200, file, {
          'Content-Type': 'application/json',
        })

      const {
        maxwidth = 0,
        maxheight = 0,
      } = params

      const result = await extract(url, { maxwidth, maxheight })
      expect(result).toBeTruthy()
      expect(checkFn(result)).toBe(true)
      expect(result.provider_name).toEqual(expected.provider_name)
      expect(result.type).toEqual(expected.type)
      if (maxwidth > 0) {
        expect(result.width).toBeLessThanOrEqual(expected.maxwidth)
      }
      if (maxheight > 0) {
        expect(result.height).toBeLessThanOrEqual(expected.maxheight)
      }
      nock.cleanAll()
    })
  })
})

if (PROXY_SERVER !== '') {
  describe('test extract live oembed API via proxy server', () => {
    test('check if extract method works with proxy server', async () => {
      const url = 'https://codepen.io/ndaidong/pen/LYmLKBw'
      const result = await extract(url, {}, {
        agent: new HttpsProxyAgent(PROXY_SERVER),
      })
      console.log(result)
      expect(result.success).toBeTruthy()
    }, 10000)
  })
}

test('test .hasProvider() method', () => {
  expect(hasProvider('https://www.youtube.com/watch?v=ciS8aCrX-9s')).toBe(true)
  expect(hasProvider('https://trello.com/b/BO3bg7yn/notes')).toBe(false)
})

test('test .setProviderList() method', () => {
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
  ]
  setProviderList(customProviderOnly)
  expect(hasProvider('http://www.example.org/media/abcdef')).toBe(true)
  expect(hasProvider('https://www.youtube.com/watch?v=ciS8aCrX-9s')).toBe(false)
})
