// utils -> fetchEmbed

const retrieve = require('./retrieve')

const isFacebookGraphDependent = (url) => {
  return url.includes('facebook.com') || url.includes('instagram.com')
}

const getFacebookGraphToken = () => {
  const env = process.env || {}
  const appId = env.FACEBOOK_APP_ID || '845078789498971'
  const clientToken = env.FACEBOOK_CLIENT_TOKEN || '8ff3ab4ddd45b8f018b35c4fb7edac62'

  return `${appId}|${clientToken}`
}

const getRegularUrl = (query, basseUrl) => {
  return basseUrl.replace(/\{format\}/g, 'json') + '?' + query
}

const fetchEmbed = async (url, provider, params = {}) => {
  const query = {
    url,
    format: 'json',
    ...params
  }

  if (query.maxwidth <= 0) {
    delete query.maxwidth
  }
  if (query.maxheight <= 0) {
    delete query.maxheight
  }

  if (isFacebookGraphDependent(provider.providerUrl)) {
    query.access_token = getFacebookGraphToken()
  }

  const queryParams = new URLSearchParams(query).toString()

  const link = getRegularUrl(queryParams, provider.fetchEndpoint)
  const body = retrieve(link)
  return body
}

module.exports = fetchEmbed
