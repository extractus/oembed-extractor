// utils -> fetchEmbed

var fetch = require('node-fetch');

var fetchEmbed = (url, provider) => {
  return new Promise((resolve, reject) => {
    let {
      provider_name,
      provider_url,
      url: resourceUrl
    } = provider;

    let link = `${resourceUrl}?format=json&url=${encodeURIComponent(url)}`;

    return fetch(link).then((res) => {
      return res.json();
    }).then((json) => {
      json.provider_name = provider_name;
      json.provider_url = provider_url;
      return resolve(json);
    }).catch((err) => {
      return reject(err);
    });
  });
};

module.exports = fetchEmbed;
