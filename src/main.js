/**
 * oembed parser
 * @ndaidong
 **/

const isValidURL = require('./utils/isValidURL')
const fetchEmbed = require('./utils/fetchEmbed')

const provider = require('./utils/provider')

const extract = async (url, params = {}) => {
  if (!isValidURL(url)) {
    throw new Error('Invalid input URL')
  }
  const p = provider.find(url)
  if (!p) {
    throw new Error(`No provider found with given url "${url}"`)
  }
  const data = await fetchEmbed(url, p, params)
  return data
}

module.exports = {
  extract,
  hasProvider: provider.has,
  findProvider: provider.find,
  setProviderList: provider.set
}
