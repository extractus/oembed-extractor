// retrieve.test
/* eslint-env jest */

import nock from 'nock'

import { getJson } from './retrieve.js'

const parseUrl = (url) => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname,
  }
}

describe('test getJson() method', () => {
  test('test getJson from good source', async () => {
    const url = 'https://some.where/good/source'
    const { baseUrl, path } = parseUrl(url)
    nock(baseUrl).get(path).reply(200, { data: { name: 'oembed-parser' } }, {
      'Content-Type': 'application/json',
    })
    const result = await getJson(url)
    expect(result.data.name).toEqual('oembed-parser')
    nock.cleanAll()
  })

  test('test getJson using proxy', async () => {
    const url = 'https://some.where/good/source-with-proxy'
    const { baseUrl, path } = parseUrl(url)
    nock(baseUrl).get(path).reply(200, { data: { name: 'oembed-parser' } }, {
      'Content-Type': 'application/json',
    })
    nock('https://proxy-server.com')
      .get('/api/proxy?url=https%3A%2F%2Fsome.where%2Fgood%2Fsource-with-proxy')
      .reply(200, { data: { name: 'oembed-parser' } })

    const result = await getJson(url, {
      proxy: {
        target: 'https://proxy-server.com/api/proxy?url=',
      },
    })
    expect(result.data.name).toEqual('oembed-parser')
    nock.cleanAll()
  })

  test('test getJson invalid json reponsse', async () => {
    const url = 'https://some.where/bad/source'
    const { baseUrl, path } = parseUrl(url)
    nock(baseUrl).get(path).reply(200, 'this is not json string', {
      'Content-Type': 'application/json',
    })
    try {
      await getJson(url)
    } catch (err) {
      expect(err).toBeTruthy()
    }
    nock.cleanAll()
  })
})
