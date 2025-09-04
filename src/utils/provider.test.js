// provider.test

import { describe, it } from 'node:test'
import assert from 'node:assert'

import provider from './provider.js'

describe('test if provider.find() works correctly', () => {
  const cases = [
    {
      url: 'https://www.edumedia-sciences.com/en/media/558-heredity',
      fetchEndpoint: 'https://www.edumedia-sciences.com/oembed.json',
    },
    {
      url: 'https://vimeo.com/999999',
      fetchEndpoint: 'https://vimeo.com/api/oembed.json',
    },
    {
      url: 'https://www.youtube.com/watch?v=9999999',
      fetchEndpoint: 'https://www.youtube.com/oembed',
    },
  ]

  cases.forEach(({ url, fetchEndpoint }) => {
    it(`provider.find("${url}") must return "${fetchEndpoint}"`, () => {
      const foundedProvider = provider.find(url)
      assert.equal(foundedProvider.endpoint, fetchEndpoint)
    })
  })

  it('provider.find("{}") must return null', () => {
    assert.equal(provider.find({}), null)
  })

  it('provider.find("abcdef") must return null', () => {
    assert.equal(provider.find('abcdef'), null)
  })

  it('provider.find("https://somethingdoesnotexist.com") must return null', () => {
    assert.equal(provider.find('https://somethingdoesnotexist.com'), null)
  })
})

describe('test if provider set/get works correctly', () => {
  const providerList = [
    {
      provider_name: 'Alpha',
      provider_url: 'https://alpha.com',
      endpoints: [
        {
          schemes: [
            'https://store.alpha.com/*',
          ],
          url: 'https://api.alpha.com/oembed',
        },
      ],
    },
    {
      provider_name: 'Beta',
      provider_url: 'https://beta.com',
      endpoints: [
        {
          schemes: [
            'https://store.beta.com/*',
          ],
          url: 'https://api.beta.com/oembed',
        },
      ],
    },
  ]
  it('provider.set() & provider.get()', () => {
    assert.equal(provider.set(providerList), providerList.length)
    const newList = provider.get()
    assert.equal(newList.length, providerList.length)
    assert.equal((newList[0].schemes[0]).toString(), (/\/\/store.alpha.com\/(.*)/i).toString())
  })
})
