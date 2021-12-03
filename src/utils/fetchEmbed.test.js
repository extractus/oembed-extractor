// fetchEmbed.test
/* eslint-env jest */

const nock = require('nock')

const fetchEmbed = require('./fetchEmbed')
const { find: findProvider } = require('./provider')

const parseUrl = (url) => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname
  }
}

test('test fetchEmbed(youtube video)', async () => {
  const url = 'https://youtu.be/qQpb1oCernE'
  const provider = findProvider(url)
  const { baseUrl, path } = parseUrl(provider.fetchEndpoint)

  const scope = nock(baseUrl, { encodedQueryParams: true })
  const params = new URLSearchParams({
    url,
    format: 'json'
  })
  scope.get(path)
    .query(params)
    .replyWithFile(200, './test-data/youtube.json', {
      'Content-Type': 'application/json'
    })

  const result = await fetchEmbed(url, provider)
  expect(result).toBeTruthy()
  expect(result.provider_name).toEqual('YouTube')
  expect(result.type).toEqual('video')
})

test('test fetchEmbed(twitter tweet)', async () => {
  const url = 'https://twitter.com/ndaidong/status/1173592062878314497'
  const provider = findProvider(url)
  const { baseUrl, path } = parseUrl(provider.fetchEndpoint)

  const scope = nock(baseUrl, { encodedQueryParams: true })
  const params = new URLSearchParams({
    url,
    format: 'json'
  })
  scope.get(path)
    .query(params)
    .replyWithFile(200, './test-data/twitter.json', {
      'Content-Type': 'application/json'
    })

  const result = await fetchEmbed(url, provider)
  expect(result).toBeTruthy()
  expect(result.provider_name).toEqual('Twitter')
  expect(result.type).toEqual('rich')
})

test('test fetchEmbed(facebook video)', async () => {
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

  const result = await fetchEmbed(url, provider)
  expect(result).toBeTruthy()
  expect(result.provider_name).toEqual('Facebook')
  expect(result.type).toEqual('video')
})

test('test fetchEmbed(flikr photo)', async () => {
  const url = 'http://farm4.static.flickr.com/3123/2341623661_7c99f48bbf_m.jpg'
  const provider = findProvider(url)
  const { baseUrl, path } = parseUrl(provider.fetchEndpoint)

  const scope = nock(baseUrl, { encodedQueryParams: true })
  const params = new URLSearchParams({
    url,
    format: 'json'
  })
  scope.get(path)
    .query(params)
    .replyWithFile(200, './test-data/flickr-default.json', {
      'Content-Type': 'application/json'
    })

  const result = await fetchEmbed(url, provider)
  expect(result).toBeTruthy()
  expect(result.provider_name).toEqual('Flickr')
  expect(result.type).toEqual('photo')
  expect(result.width).toEqual(1024)
  expect(result.height).toEqual(683)
})

test('test fetchEmbed(flikr photo) with size limit', async () => {
  const url = 'http://farm4.static.flickr.com/3123/2341623661_7c99f48bbf_m.jpg'
  const provider = findProvider(url)
  const { baseUrl, path } = parseUrl(provider.fetchEndpoint)

  const scope = nock(baseUrl, { encodedQueryParams: true })
  const params = new URLSearchParams({
    url,
    maxwidth: 800,
    maxheight: 400,
    format: 'json'
  })
  scope.get(path)
    .query(params)
    .replyWithFile(200, './test-data/flickr-sizelimit.json', {
      'Content-Type': 'application/json'
    })

  const result = await fetchEmbed(url, provider, { maxwidth: 800, maxheight: 400 })
  expect(result).toBeTruthy()
  expect(result.provider_name).toEqual('Flickr')
  expect(result.type).toEqual('photo')
  expect(result.width).toBeLessThan(1024)
  expect(result.height).toBeLessThan(683)
})
