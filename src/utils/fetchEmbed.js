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

  // remove these if they're set to zero
  if (params.maxwidth <= 0) {
    delete params.maxwidth
  }
  if (params.maxheight <= 0) {
    delete params.maxheight
  }

  if (isFacebookGraphDependent(provider.providerUrl)) {
    queries.push(getFacebookGraphToken())
  }

  const queryParams = new URLSearchParams(params).toString()

  let query = queries.join('&')

  if (queryParams) {
    query = query + '&' + queryParams
  }

  const link = getRegularUrl(query, provider.fetchEndpoint)
  const body = retrieve(link)
  return body
}

module.exports = fetchEmbed
