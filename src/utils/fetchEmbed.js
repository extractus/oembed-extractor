// utils -> fetchEmbed

const retrieve = require('./retrieve')

const isFacebookGraphDependent = (url) => {
  return url.includes('facebook.com') || url.includes('instagram.com')
}

const getFacebookGraphToken = () => {
  const env = process.env || {}
  const appId = env.FACEBOOK_APP_ID || '845078789498971'
  const clientToken = env.FACEBOOK_CLIENT_TOKEN || '8ff3ab4ddd45b8f018b35c4fb7edac62'

  return `access_token=${appId}|${clientToken}`
}

const getRegularUrl = (query, basseUrl) => {
  return basseUrl.replace(/\{format\}/g, 'json') + '?' + query
}

const fetchEmbed = async (url, provider, params = {}) => {
  const queries = [
    'format=json',
    `url=${encodeURIComponent(url)}`
  ]

  const {
    maxwidth = 0,
    maxheight = 0
  } = params

  if (maxwidth > 0) {
    queries.push(`maxwidth=${maxwidth}`)
  }
  if (maxheight > 0) {
    queries.push(`maxheight=${maxheight}`)
  }

  if (isFacebookGraphDependent(provider.providerUrl)) {
    queries.push(getFacebookGraphToken())
  }

  const query = queries.join('&')

  const link = getRegularUrl(query, provider.fetchEndpoint)
  const body = retrieve(link)
  return body
}

module.exports = fetchEmbed
