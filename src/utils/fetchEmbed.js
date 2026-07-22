// utils -> fetchEmbed

import { getJson } from './retrieve.js'
import { getDomain } from './linker.js'

/**
 * Check if an endpoint belongs to Facebook Graph API.
 *
 * @param {string} url - Endpoint URL
 * @returns {boolean} True if domain is graph.facebook.com
 */
const isFacebookGraphDependent = (url) => {
  return getDomain(url) === 'graph.facebook.com'
}

/**
 * Build the Facebook access token from environment variables.
 *
 * @returns {string} Token in format "appId|clientToken"
 */
const getFacebookGraphToken = () => {
  const env = process.env || {}
  const appId = env.FACEBOOK_APP_ID || ''
  const clientToken = env.FACEBOOK_CLIENT_TOKEN || ''
  return `${appId}|${clientToken}`
}

/**
 * Fetch oEmbed data from a known provider endpoint.
 *
 * @param {string} url - Original resource URL
 * @param {object} [params={}] - oEmbed parameters (maxwidth, maxheight, etc.)
 * @param {string} [endpoint=''] - Provider oEmbed API endpoint
 * @param {Function} fetcher - Custom fetch function (url) => Promise<Response>
 * @returns {Promise<object>} oEmbed response data
 */
export default async (url, params = {}, endpoint = '', fetcher) => { // eslint-disable-line
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
  const body = await getJson(link, fetcher)
  body.method = 'provider-api'
  return body
}
