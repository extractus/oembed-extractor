// utils -> fetchEmbed

const fetch = require('node-fetch');

const fetchEmbed = (url, provider) => {
  return new Promise((resolve, reject) => {
    let {
      provider_name, // eslint-disable-line camelcase
      provider_url, // eslint-disable-line camelcase
      url: resourceUrl,
    } = provider;


    resourceUrl = resourceUrl.replace(/\{format\}/g, 'json');

    let link = `${resourceUrl}?format=json&url=${encodeURIComponent(url)}`;

    return fetch(link).then((res) => {
      return res.json();
    }).then((json) => {
      json.provider_name = provider_name; // eslint-disable-line camelcase
      json.provider_url = provider_url; // eslint-disable-line camelcase
      return resolve(json);
    }).catch((err) => {
      return reject(err);
    });
  });
};

module.exports = fetchEmbed;
