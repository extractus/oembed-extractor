/**
 * oembed parser
 * @ndaidong
 **/

import isValidURL from './utils/isValidURL.js'
import fetchEmbed from './utils/fetchEmbed.js'

import { find } from './utils/provider.js'

export const extract = async (url, params = {}) => {
  if (!isValidURL(url)) {
    throw new Error('Invalid input URL')
  }
  const p = find(url)
  if (!p) {
    throw new Error(`No provider found with given url "${url}"`)
  }
  const data = await fetchEmbed(url, p, params)
  return data
}

export {
  setRequestOptions,
  getRequestOptions
} from './config.js'

export {
  find as findProvider,
  has as hasProvider,
  set as setProviderList
} from './utils/provider.js'
