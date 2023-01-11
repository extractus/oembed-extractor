// fetchEmbed.test
/* eslint-env jest */

import nock from 'nock'

import fetchEmbed from './fetchEmbed.js'
import { getEndpoint } from './provider.js'

const parseUrl = (url) => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname,
  }
}

describe('test if fetchEmbed() works correctly', () => {
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
    },
    {
      input: {
        url: 'https://twitter.com/ndaidong/status/1173592062878314497?theme=dark',
        file: './test-data/twitter-dark.json',
      },
      expected: {
        provider_name: 'Twitter',
        type: 'rich',
      },
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
    },
    {
      input: {
        url: 'http://farm4.static.flickr.com/3123/2341623661_7c99f48bbf_m.jpg',
        file: './test-data/flickr-default.json',
      },
      expected: {
        provider_name: 'Flickr',
        type: 'photo',
        maxwidth: 1024,
        maxheight: 683,
      },
    },
    {
      input: {
        url: 'http://farm4.static.flickr.com/3123/2341623661_7c99f48bbf_m.jpg',
        params: {
          maxwidth: 800,
          maxheight: 400,
        },
        file: './test-data/flickr-sizelimit.json',
      },
      expected: {
        provider_name: 'Flickr',
        type: 'photo',
        maxwidth: 800,
        maxheight: 400,
      },
    },
  ]

  cases.forEach(({ input, expected }) => {
    const { url, file, params = {} } = input
    test(`check fetchEmbed("${url}")`, async () => {
      const endpoint = getEndpoint(url)
      const { baseUrl, path } = parseUrl(endpoint)

      const scope = nock(baseUrl, { encodedQueryParams: true })
      const queries = new URLSearchParams({
        url,
        ...params,
        format: 'json',
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

      const result = await fetchEmbed(url, { maxwidth, maxheight }, endpoint)
      expect(result).toBeTruthy()
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
