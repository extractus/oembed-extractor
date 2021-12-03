// provider.test
/* eslint-env jest */

const provider = require('./provider')

describe('test if provider.find() works correctly', () => {
  const cases = [
    {
      url: 'https://www.facebook.com/video.php?v=999999999',
      fetchEndpoint: 'https://graph.facebook.com/v10.0/oembed_video'
    },
    {
      url: 'https://www.facebook.com/someone/photos/somephoto',
      fetchEndpoint: 'https://graph.facebook.com/v10.0/oembed_post'
    },
    {
      url: 'https://www.facebook.com/someone/page',
      fetchEndpoint: 'https://graph.facebook.com/v10.0/oembed_page'
    },
    {
      url: 'http://instagram.com/someone/p/somepage',
      fetchEndpoint: 'https://graph.facebook.com/v10.0/instagram_oembed'
    },
    {
      url: 'https://www.edumedia-sciences.com/en/media/558-heredity',
      fetchEndpoint: 'https://www.edumedia-sciences.com/oembed.json'
    },
    {
      url: 'https://vimeo.com/999999',
      fetchEndpoint: 'https://vimeo.com/api/oembed.{format}'
    },
    {
      url: 'https://www.youtube.com/watch?v=9999999',
      fetchEndpoint: 'https://www.youtube.com/oembed'
    }
  ]

  cases.forEach(({ url, fetchEndpoint }) => {
    test(`  provider.find("${url}") must return "${fetchEndpoint}"`, () => {
      const foundedProvider = provider.find(url)
      expect(foundedProvider.fetchEndpoint).toEqual(fetchEndpoint)
    })
  })

  test('  provider.find("{}") must return null', () => {
    expect(provider.find({})).toEqual(null)
  })

  test('  provider.find("abcdef") must return null', () => {
    expect(provider.find('abcdef')).toEqual(null)
  })

  test('  provider.find("https://somethingdoesnotexist.com") must return null', () => {
    expect(provider.find('https://somethingdoesnotexist.com')).toEqual(null)
  })
})

describe('test if provider set/get works correctly', () => {
  const providerList = [
    {
      provider_name: 'Alpha',
      provider_url: 'https://alpha.com',
      endpoints: []
    },
    {
      provider_name: 'Beta',
      provider_url: 'https://beta.com',
      endpoints: []
    }
  ]
  test('  provider.set()', () => {
    expect(provider.set(providerList)).toEqual(providerList.length)
  })
  test('  provider.get()', () => {
    expect(provider.get()).toEqual(providerList)
  })
})
