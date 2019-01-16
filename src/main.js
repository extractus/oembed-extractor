// main

const {
  isValidURL,
  findProvider,
  fetchEmbed,
} = require('./utils');

const defaultParams = { maxwidth:480, maxheight:260 }

const extract = (url, params=defaultParams) => {
  return new Promise((resolve, reject) => {
    if (!isValidURL(url)) {
      return reject(new Error('Invalid input URL'));
    }
    let p = findProvider(url);
    if (!p) {
      return reject(new Error(`No provider found with given url "${url}"`));
    }
    return resolve(fetchEmbed(url, p, params));
  });
};

const hasProvider = (url) => {
  return findProvider(url) !== null;
};

module.exports = {
  extract,
  hasProvider,
};
