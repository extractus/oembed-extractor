// main

const {
  isValidURL,
  findProvider,
  fetchEmbed,
} = require('./utils');

const extract = (url) => {
  return new Promise((resolve, reject) => {
    if (!isValidURL(url)) {
      return reject(new Error('Invalid input URL'));
    }
    let p = findProvider(url);
    if (!p) {
      return reject(new Error(`No provider found with given url "${url}"`));
    }
    return resolve(fetchEmbed(url, p));
  });
};

const hasProvider = (url) => {
  return findProvider(url) !== null;
};

module.exports = {
  extract,
  hasProvider,
};
