// utils / provider

import { isValid as isValidURL, getDomain } from './linker.js'

import { providers as defaultProviderList } from './providers.latest.js'

/**
 * Convert a scheme string into a RegExp for URL matching.
 *
 * @param {string} [scheme=''] - Scheme pattern with wildcards
 * @returns {RegExp} Compiled regular expression
 */
const toRegExp = (scheme = '') => {
  return new RegExp(scheme.replace(/\\./g, '.').replace(/\*/g, '(.*)').replace(/\?/g, '\\?').replace(/,$/g, ''), 'i')
}

/**
 * Remove duplicate entries from an array.
 *
 * @param {Array} [arr=[]] - Input array
 * @returns {Array} Array with unique values
 */
const uniquify = (arr = []) => {
  return [...(new Set(arr))]
}

/**
 * Escape dots in a scheme string for regex use.
 *
 * @param {string} [scheme=''] - Scheme string
 * @returns {string} Scheme with escaped dots
 */
const undotted = (scheme = '') => {
  return scheme.replace(/\./g, '\\.')
}

/**
 * Strip protocol prefix (https:// or http://) from a URL.
 *
 * @param {string} url - URL with protocol
 * @returns {string} URL without protocol (protocol-relative)
 */
const removeProtocol = (url) => {
  return url.replace('https://', '//').replace('http://', '//')
}

/**
 * Simplify raw provider data into a compact format for internal use.
 *
 * @param {Array} [providers=[]] - Raw provider list from oEmbed registry
 * @returns {Array} Simplified provider entries with { s: patterns, e: endpoint }
 */
export const simplify = (providers = []) => {
  return providers.map((item) => {
    const {
      endpoints,
    } = item
    return endpoints.map((endpoint) => {
      const { schemes = [], url } = endpoint
      const patterns = schemes.length > 0 ? uniquify(schemes.map(removeProtocol).map(undotted)) : []

      return {
        s: patterns,
        e: removeProtocol(url).replace(/\{format\}/g, 'json'),
      }
    })
  }).reduce((prev, curr) => {
    return prev.concat(curr)
  }, [])
}

/**
 * Build internal provider entries from simplified format with compiled regex patterns.
 *
 * @param {Array} [providers=[]] - Simplified provider entries
 * @returns {Array} Provider entries with endpoint URL and RegExp schemes
 */
const providersFromList = (providers = []) => {
  return providers.map((provider) => {
    const { e: endpoint, s: schemes } = provider
    return {
      endpoint: `https:${endpoint}`,
      schemes: schemes.map(toRegExp),
    }
  })
}

/**
 * Internal mutable store holding the current provider list.
 */
const store = {
  providers: providersFromList(defaultProviderList),
}

/**
 * Get a copy of the current provider list.
 *
 * @returns {Array} List of provider entries with endpoint and schemes
 */
export const get = () => {
  return [...store.providers]
}

/**
 * Replace the provider list with a custom set of providers.
 *
 * @param {Array} [providers=[]] - Raw provider list in oEmbed registry format
 * @returns {number} Length of the new provider list
 */
export const set = (providers = []) => {
  store.providers = providersFromList(simplify(providers))
  return store.providers.length
}

/**
 * Match a URL against a provider's schemes; fall back to domain comparison when no schemes exist.
 *
 * @param {string} [url=''] - URL to match
 * @param {string} [endpoint=''] - Provider endpoint URL
 * @param {Array} [schemes=[]] - RegExp schemes to test against
 * @returns {boolean} True if URL matches the provider
 */
const compare = (url = '', endpoint = '', schemes = []) => {
  if (!schemes.length) {
    const domain = getDomain(url)
    const endpointDomain = getDomain(endpoint)
    return domain === endpointDomain
  }
  return schemes.some((scheme) => {
    return url.match(scheme)
  })
}

/**
 * Find a provider that matches the given URL.
 *
 * @param {string} [url=''] - URL to look up
 * @returns {object|null} Provider info with schemes, endpoint, and url, or null if not found
 */
export const find = (url = '') => {
  if (!isValidURL(url)) {
    return null
  }

  const providers = get()

  for (let i = 0; i < providers.length; i++) {
    const { endpoint, schemes } = providers[i]
    const isMatched = compare(url, endpoint, schemes)
    if (isMatched) {
      return {
        schemes,
        endpoint,
        url,
      }
    }
  }

  return null
}

/**
 * Check if any registered provider supports the given URL.
 *
 * @param {string} [url=''] - URL to check
 * @returns {boolean} True if a matching provider exists
 */
export const has = (url = '') => {
  return find(url) !== null
}

/**
 * Get the oEmbed API endpoint for a given URL.
 *
 * @param {string} url - URL to resolve
 * @returns {string|null} Endpoint URL or null if no provider matches
 */
export const getEndpoint = (url) => {
  const p = find(url)
  return p ? p.endpoint : null
}

export default {
  find,
  has,
  get,
  set,
}
