/**
 * oembed parser
 * @ndaidong
 **/

import { isValid as isValidURL } from './utils/linker.js'
import fetchEmbed from './utils/fetchEmbed.js'

import { getEndpoint } from './utils/provider.js'

export const extract = async (url, params = {}) => {
  if (!isValidURL(url)) {
    throw new Error('Invalid input URL')
  }
  const endpoint = getEndpoint(url)
  if (!endpoint) {
    throw new Error(`No provider found with given url "${url}"`)
  }

  const data = await fetchEmbed(url, params, endpoint)
  return data
}

export {
  find as findProvider,
  has as hasProvider,
  set as setProviderList
} from './utils/provider.js'
