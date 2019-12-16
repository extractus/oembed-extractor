// main

import isValidURL from './utils/isValidURL';
import findProvider from './utils/findProvider';
import fetchEmbed from './utils/fetchEmbed';
import providersFromList from './utils/providersFromList';

import defaultProviderList from './utils/providers.json';

const state = {
  providers: providersFromList(defaultProviderList),
};

export const extract = async (url, params = {}) => {
  if (!isValidURL(url)) {
    throw new Error('Invalid input URL');
  }
  const p = findProvider(url, state.providers);
  if (!p) {
    throw new Error(`No provider found with given url "${url}"`);
  }
  const data = await fetchEmbed(url, p, params);
  return data;
};

export const hasProvider = (url) => {
  return findProvider(url, state.providers) !== null;
};

export const setProviderList = (list) => {
  state.providers = providersFromList(list);
};
