// autoDiscovery.test

import { describe, it } from 'node:test'
import assert from 'node:assert'

import nock from 'nock'

import autoDiscovery from './autoDiscovery.js'

const parseUrl = (url) => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname,
  }
}

describe('test if autoDiscovery() works correctly', () => {
  const url = 'https://www.bitchute.com/video/8hXWnkvA8Ao/'
  it(`check fetchEmbed("${url}")`, async () => {
    const htmlFile = './test-data/bitchute.html'
    const jsonFile = './test-data/bitchute.json'

    const { baseUrl, path } = parseUrl(url)
    const scope = nock(baseUrl)
    scope.get(path)
      .replyWithFile(200, htmlFile, {
        'Content-Type': 'text/html',
      })

    const endpoint = 'https://www.bitchute.com/oembed/'
    const { baseUrl: endpointBaseUrl, path: endpointPath } = parseUrl(endpoint)

    const params = {
      maxwidth: 600,
      maxheight: 400,
    }

    const jsonScope = nock(endpointBaseUrl, { encodedQueryParams: true })
    const queries = new URLSearchParams({
      url: 'https://www.bitchute.com/video/8hXWnkvA8Ao/',
      format: 'json',
      ...params,
    })
    jsonScope.get(endpointPath)
      .query(queries)
      .replyWithFile(200, jsonFile, {
        'Content-Type': 'application/json',
      })

    const result = await autoDiscovery(url, params)
    assert.ok(result)
    nock.cleanAll()
  })
})
