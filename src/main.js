// main.js

import { isValid as isValidURL } from './utils/linker.js'
import extractWithDiscovery from './utils/autoDiscovery.js'
import fetchEmbed from './utils/fetchEmbed.js'

import { getEndpoint } from './utils/provider.js'

export const extract = async (url, params = {}, options = {}) => {
  if (!isValidURL(url)) {
    throw new Error('Invalid input URL')
  }
  const endpoint = getEndpoint(url)

  return endpoint
    ? fetchEmbed(url, params, endpoint, options)
    : extractWithDiscovery(url, params, options)
}

export {
  find as findProvider,
  has as hasProvider,
  set as setProviderList
} from './utils/provider.js'
