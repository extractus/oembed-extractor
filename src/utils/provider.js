// utils / provider

import { isValid as isValidURL, getDomain } from './linker.js'

import { providers as defaultProviderList } from './providers.latest.js'

const toRegExp = (scheme = '') => {
  return new RegExp(scheme.replace(/\\./g, '.').replace(/\*/g, '(.*)').replace(/\?/g, '\\?').replace(/,$/g, ''), 'i')
}

const uniquify = (arr = []) => {
  return [...(new Set(arr))]
}

const undotted = (scheme = '') => {
  return scheme.replace(/\./g, '\\.')
}

const removeProtocol = (url) => {
  return url.replace('https://', '').replace('http://', '')
}

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

const providersFromList = (providers = []) => {
  return providers.map((provider) => {
    const { e: endpoint, s: schemes } = provider
    return {
      endpoint: `https://${endpoint}`,
      schemes: schemes.map(toRegExp),
    }
  })
}

const store = {
  providers: providersFromList(defaultProviderList),
}

export const get = () => {
  return [...store.providers]
}

export const set = (providers = []) => {
  store.providers = providersFromList(simplify(providers))
  return store.providers.length
}

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

export const has = (url = '') => {
  return find(url) !== null
}

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
