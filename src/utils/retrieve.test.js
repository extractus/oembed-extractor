// retrieve.test

import { describe, it } from 'node:test'
import assert from 'node:assert'

import { getJson } from './retrieve.js'

const mockFetch = (data) => {
  return async () => {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }
}

describe('test getJson() method', () => {
  it('test getJson with custom fetcher', async () => {
    const fetcher = mockFetch({ data: { name: 'oembed-parser' } })
    const result = await getJson('https://some.where/good/source', fetcher)
    assert.equal(result.data.name, 'oembed-parser')
  })

  it('test getJson with proxy fetcher', async () => {
    const fetcher = async (url) => {
      const { hostname } = new URL(url)
      assert.equal(hostname, 'proxy-server.com')
      return new Response(JSON.stringify({ data: { name: 'oembed-parser' } }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    }
    const proxyFetcher = async (url) => {
      const proxyTarget = 'https://proxy-server.com/api/proxy?url='
      return fetcher(proxyTarget + encodeURIComponent(url))
    }
    const result = await getJson('https://some.where/good/source', proxyFetcher)
    assert.equal(result.data.name, 'oembed-parser')
  })

  it('test getJson invalid json response', async () => {
    const fetcher = async () => {
      return new Response('this is not json string', {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    }
    try {
      await getJson('https://some.where/bad/source', fetcher)
    } catch (err) {
      assert.ok(err)
    }
  })
})
