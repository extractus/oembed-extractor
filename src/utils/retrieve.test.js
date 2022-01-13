// retrieve.test
/* eslint-env jest */

import nock from 'nock'

import retrieve from './retrieve.js'

const parseUrl = (url) => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname
  }
}

test('test retrieve() from good source', async () => {
  const url = 'https://some.where/good/page'
  const { baseUrl, path } = parseUrl(url)
  const scope = nock(baseUrl)
  scope.get(path).reply(200, { data: { name: 'oembed-parser' } }, {
    'Content-Type': 'application/json'
  })
  const result = await retrieve(url)
  expect(result.data.name).toEqual('oembed-parser')
})

test('test retrieve() from bad source', async () => {
  const url = 'https://some.where/good/page'
  const { baseUrl, path } = parseUrl(url)
  const scope = nock(baseUrl)
  scope.get(path).reply(500, '', {
    'Content-Type': 'application/json'
  })
  const result = await retrieve(url)
  expect(result).toEqual(null)
})

test('test retrieve() with unsupported content type', async () => {
  const url = 'https://some.where/good/page'
  const { baseUrl, path } = parseUrl(url)
  const scope = nock(baseUrl)
  scope.get(path).reply(200, { data: { name: 'oembed-parser' } }, {
    'Content-Type': 'text/json'
  })
  const result = await retrieve(url)
  expect(result).toEqual(null)
})
