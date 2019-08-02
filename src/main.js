// main

const {
  isValidURL,
  findProvider,
  fetchEmbed,
} = require('./utils');


const extract = async (url, params) => {
  if (!isValidURL(url)) {
    throw new Error('Invalid input URL');
  }
  const p = findProvider(url);
  if (!p) {
    throw new Error(`No provider found with given url "${url}"`);
  }
  const data = await fetchEmbed(url, p, params);
  return data;
};

const hasProvider = (url) => {
  return findProvider(url) !== null;
};

module.exports = {
  extract,
  hasProvider,
};
