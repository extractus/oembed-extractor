// main

const {
  isValidURL,
  findProvider,
  fetchEmbed,
  createLink,
  providersFromList,
} = require('./utils');

const defaultProviderList = require('./utils/providers.json');
let providers = providersFromList(defaultProviderList);

const extract = async (url, params = {}) => {
  if (!isValidURL(url)) {
    throw new Error('Invalid input URL');
  }
  const p = findProvider(url, providers);
  if (!p) {
    throw new Error(`No provider found with given url "${url}"`);
  }
  return fetchEmbed(url, p, params);
};

const getLink = (url, params = {}) => {
  if (!isValidURL(url)) {
    throw new Error('Invalid input URL');
  }
  const p = findProvider(url, providers);
  if (!p) {
    throw new Error(`No provider found with given url "${url}"`);
  }
  return createLink(url, p, params);
};

const hasProvider = (url) => {
  return findProvider(url, providers) !== null;
};

const setProviderList = (list) => {
  providers = providersFromList(list);
};

module.exports = {
  extract,
  getLink,
  hasProvider,
  setProviderList,
};
