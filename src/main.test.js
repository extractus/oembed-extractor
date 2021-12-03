// main
/* eslint-env jest */

const nock = require('nock')

const {
  extract,
  hasProvider,
  findProvider,
  setProviderList
} = require('./main')

const required = [
  'type',
  'version'
]

const optional = [
  'provider_url',
  'provider_name'
]

const RichTypeKeys = [
  'html',
  'width',
  'height',
  ...optional,
  ...required
]

const PhotoTypeKeys = [
  'url',
  'width',
  'height',
  ...optional,
  ...required
]

const InstagramKeys = [
  'html',
  'width',
  ...optional,
  ...required
]

const parseUrl = (url) => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname
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
    'https://soundcloud^(*%%$%^$$%$$*&(&)())'
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

test('test extract YouTube link', async () => {
  const url = 'https://www.youtube.com/watch?v=ciS8aCrX-9s'
  const provider = findProvider(url)
  const { baseUrl, path } = parseUrl(provider.fetchEndpoint)
  const scope = nock(baseUrl, { encodedQueryParams: true })
  const params = new URLSearchParams({
    url,
    format: 'json'
  })
  scope.get(path)
    .query(params)
    .replyWithFile(200, './test-data/youtube_ciS8aCrX-9s.json', {
      'Content-Type': 'application/json'
    })
  const result = await extract(url)
  expect(hasRichKeys(result)).toBe(true)
  expect(result.provider_name).toEqual('YouTube')
  expect(result.type).toEqual('video')
})

test('test extract Flickr link', async () => {
  const url = 'https://flic.kr/p/2iYctUr'
  const provider = findProvider(url)
  const { baseUrl, path } = parseUrl(provider.fetchEndpoint)
  const scope = nock(baseUrl, { encodedQueryParams: true })
  const params = new URLSearchParams({
    url,
    format: 'json'
  })
  scope.get(path)
    .query(params)
    .replyWithFile(200, './test-data/flickr_2iYctUr.json', {
      'Content-Type': 'application/json'
    })
  const result = await extract(url)
  expect(hasPhotoKeys(result)).toBe(true)
  expect(result.provider_name).toEqual('Flickr')
  expect(result.type).toEqual('photo')
  expect(result.width).toEqual(1024)
  expect(result.height).toEqual(768)
})

test('test extract Flickr link with params', async () => {
  const url = 'https://flic.kr/p/2iYctUr'
  const provider = findProvider(url)
  const { baseUrl, path } = parseUrl(provider.fetchEndpoint)
  const scope = nock(baseUrl, { encodedQueryParams: true })
  const params = new URLSearchParams({
    url,
    maxwidth: 640,
    maxheight: 480,
    format: 'json'
  })
  scope.get(path)
    .query(params)
    .replyWithFile(200, './test-data/flickr_2iYctUr_640x480.json', {
      'Content-Type': 'application/json'
    })
  const result = await extract(url, { maxwidth: 640, maxheight: 480 })
  expect(hasPhotoKeys(result)).toBe(true)
  expect(result.provider_name).toEqual('Flickr')
  expect(result.type).toEqual('photo')
  expect(result.width).toBeLessThanOrEqual(640)
  expect(result.height).toBeLessThanOrEqual(480)
})

test('test extract Instagram link', async () => {
  const url = 'https://www.instagram.com/p/ic7kRDqOlt/'
  const provider = findProvider(url)
  const { baseUrl, path } = parseUrl(provider.fetchEndpoint)
  const scope = nock(baseUrl, { encodedQueryParams: true })
  const params = new URLSearchParams({
    url,
    format: 'json',
    access_token: '845078789498971|8ff3ab4ddd45b8f018b35c4fb7edac62'
  })
  scope.get(path)
    .query(params)
    .replyWithFile(200, './test-data/instagram_ic7kRDqOlt.json', {
      'Content-Type': 'application/json'
    })
  const result = await extract(url)
  expect(hasInstagramKeys(result)).toBe(true)
  expect(result.provider_name).toEqual('Instagram')
  expect(result.type).toEqual('rich')
})

test('test extract Facebook video', async () => {
  const url = 'https://www.facebook.com/facebook/videos/10153231379946729/'
  const provider = findProvider(url)
  const { baseUrl, path } = parseUrl(provider.fetchEndpoint)
  const scope = nock(baseUrl, { encodedQueryParams: true })
  const params = new URLSearchParams({
    url,
    format: 'json',
    access_token: '845078789498971|8ff3ab4ddd45b8f018b35c4fb7edac62'
  })
  scope.get(path)
    .query(params)
    .replyWithFile(200, './test-data/facebook.json', {
      'Content-Type': 'application/json'
    })
  const result = await extract(url)
  expect(hasRichKeys(result)).toBe(true)
  expect(result).toBeTruthy()
  expect(result.provider_name).toEqual('Facebook')
  expect(result.type).toEqual('video')
})

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
            'http://www.example.org/media/*'
          ],
          url: 'http://www.example.org/oembed'
        }
      ]
    }
  ]
  setProviderList(customProviderOnly)
  expect(hasProvider('http://www.example.org/media/abcdef')).toBe(true)
  expect(hasProvider('https://www.youtube.com/watch?v=ciS8aCrX-9s')).toBe(false)
})
