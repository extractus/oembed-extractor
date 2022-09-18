// utils -> fetchEmbed

import retrieve from './retrieve.js'
import { getDomain } from './linker.js'

const isFacebookGraphDependent = (url) => {
  const domain = getDomain(url)
  return ['facebook.com', 'instagram.com'].includes(domain)
}

const getFacebookGraphToken = () => {
  const env = process.env || {}
  const appId = env.FACEBOOK_APP_ID
  const clientToken = env.FACEBOOK_CLIENT_TOKEN
  return `${appId}|${clientToken}`
}

const getRegularUrl = (query, basseUrl) => {
  return basseUrl.replace(/\{format\}/g, 'json') + '?' + query
}

export default async (url, provider, params = {}) => {
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
