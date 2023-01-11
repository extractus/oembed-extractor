// utils -> fetchEmbed

import retrieve from './retrieve.js'
import { getDomain } from './linker.js'

const isFacebookGraphDependent = (url) => {
  return getDomain(url) === 'graph.facebook.com'
}

const getFacebookGraphToken = () => {
  const env = process.env || {}
  const appId = env.FACEBOOK_APP_ID
  const clientToken = env.FACEBOOK_CLIENT_TOKEN
  return `${appId}|${clientToken}`
}

export default async (url, params = {}, endpoint = '', options = {}) => { // eslint-disable-line
  const query = {
    url,
    format: 'json',
    ...params,
  }

  if (query.maxwidth <= 0) {
    delete query.maxwidth
  }
  if (query.maxheight <= 0) {
    delete query.maxheight
  }

  if (isFacebookGraphDependent(endpoint)) {
    query.access_token = getFacebookGraphToken()
  }

  const queryParams = new URLSearchParams(query).toString()
  const link = endpoint + '?' + queryParams
  const body = retrieve(link, options)
  return body
}
