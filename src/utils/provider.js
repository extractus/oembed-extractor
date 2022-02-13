// utils / provider

import { readFileSync, existsSync } from 'fs'

import isValidURL from './isValidURL.js'
import getDomain from './getDomain.js'

const loadDefaultList = () => {
  const jsontext = readFileSync(existsSync('./providers.json') ? './providers.json' : './src/utils/providers.json')
  return JSON.parse(jsontext)
}

const defaultProviderList = loadDefaultList()

const providersFromList = (providers = []) => {
  return providers.map((provider) => {
    const { provider_url: url } = provider
    provider.domain = getDomain(url)
    return provider
  }).filter((provider) => {
    return provider.domain !== ''
  })
}

const store = {
  providers: providersFromList(defaultProviderList)
}

export const get = () => {
  return [...store.providers]
}

export const set = (providers = []) => {
  store.providers = providersFromList(providers)
  return store.providers.length
}

const getEndpoint = (url, domain, endpoints) => {
  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i]
    const { schemes = [], url: endpointUrl } = endpoint
    if (schemes.length === 0) {
      const endpointDomain = getDomain(endpointUrl)
      if (endpointDomain === domain) {
        return endpoint
      }
    }
    const isMatchedScheme = schemes.some((scheme) => {
      const reg = new RegExp(scheme.replace(/\*/g, '(.*)').replace(/\?/g, '\\?').replace(/,$/g, ''), 'i')
      return url.match(reg)
    })
    if (isMatchedScheme) {
      return endpoint
    }
  }
  return null
}

export const find = (url = '') => {
  if (!isValidURL(url)) {
    return null
  }

  const domain = getDomain(url)

  const providers = get()

  for (let i = 0; i < providers.length; i++) {
    const prov = providers[i]
    const {
      endpoints,
      provider_name: providerName,
      provider_url: providerUrl
    } = prov
    const endpoint = getEndpoint(url, domain, endpoints)
    if (endpoint) {
      return {
        fetchEndpoint: endpoint.url,
        providerName,
        providerUrl
      }
    }
  }

  return null
}

export const has = (url = '') => {
  return find(url) !== null
}

export default {
  find,
  has,
  get,
  set
}
