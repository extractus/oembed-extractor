// main

const {
  isValidURL,
  findProvider,
  fetchEmbed,
} = require('./utils');


async function extract(url, params) {
  try {
    if (!isValidURL(url)) {
      throw new Error('Invalid input URL');
    }
    const p = findProvider(url);
    if (!p) {
      throw new Error(`No provider found with given url "${url}"`);
    }
    const result = await fetchEmbed(url, p, params);
    return result;
  } catch (err) {
    return err;
  }
}

const hasProvider = (url) => {
  return findProvider(url) !== null;
};

(async () => {
  try {
    const a = await extract('1235');
    if (a) {
      console.log(a);
    }
  } catch (err) {
    console.log(err);
  }
})();

module.exports = {
  extract,
  hasProvider,
};
