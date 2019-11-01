// utils -> fetchEmbed

const fetch = require('node-fetch');

const fetchEmbed = async (url, provider, params = {}) => {
  const {
    provider_name, // eslint-disable-line camelcase
    provider_url, // eslint-disable-line camelcase
    url: resourceUrl,
  } = provider;

  const baseUrl = resourceUrl.replace(/\{format\}/g, 'json');

  const queries = [
    'format=json',
    `url=${encodeURIComponent(url)}`,
  ];

  const {
    maxwidth = 0,
    maxheight = 0,
  } = params;

  if (maxwidth > 0) {
    queries.push(`maxwidth=${maxwidth}`);
  }
  if (maxheight > 0) {
    queries.push(`maxheight=${maxheight}`);
  }

  const link = `${baseUrl}?${queries.join('&')}`;
  const res = await fetch(link, {mode: 'no-cors'});
  const json = await res.json();
  json.provider_name = provider_name; // eslint-disable-line camelcase
  json.provider_url = provider_url; // eslint-disable-line camelcase
  return json;
};

module.exports = fetchEmbed;
