// provider.test
/* eslint-env jest */

import provider from './provider.js'

describe('test if provider.find() works correctly', () => {
  const cases = [
    {
      url: 'https://www.facebook.com/video.php?v=999999999',
      fetchEndpoint: 'https://graph.facebook.com/v10.0/oembed_video',
    },
    {
      url: 'https://www.facebook.com/someone/photos/somephoto',
      fetchEndpoint: 'https://graph.facebook.com/v10.0/oembed_post',
    },
    {
      url: 'https://www.facebook.com/someone/page',
      fetchEndpoint: 'https://graph.facebook.com/v10.0/oembed_page',
    },
    {
      url: 'http://instagram.com/someone/p/somepage',
      fetchEndpoint: 'https://graph.facebook.com/v10.0/instagram_oembed',
    },
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
    test(`provider.find("${url}") must return "${fetchEndpoint}"`, () => {
      const foundedProvider = provider.find(url)
      expect(foundedProvider.endpoint).toEqual(fetchEndpoint)
    })
  })

  test('provider.find("{}") must return null', () => {
    expect(provider.find({})).toEqual(null)
  })

  test('provider.find("abcdef") must return null', () => {
    expect(provider.find('abcdef')).toEqual(null)
  })

  test('provider.find("https://somethingdoesnotexist.com") must return null', () => {
    expect(provider.find('https://somethingdoesnotexist.com')).toEqual(null)
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
  test('provider.set() & provider.get()', () => {
    expect(provider.set(providerList)).toEqual(providerList.length)
    const newList = provider.get()
    expect(newList.length).toEqual(providerList.length)
    expect(newList[0].schemes[0]).toEqual(/store.alpha.com\/(.*)/i)
  })
})
