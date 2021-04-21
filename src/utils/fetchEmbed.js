// utils -> fetchEmbed

const fetch = require('node-fetch').default;

const isFacebookGraphDependent = (provider) => {
  return provider.provider_name === 'Facebook' || provider.provider_name === 'Instagram';
};

const getFacebookGraphToken = () => {
  const env = process.env || {};
  const appId = env.FACEBOOK_APP_ID || '365101066946402';
  const clientToken = env.FACEBOOK_CLIENT_TOKEN || 'a56861eb5b787f9e9a18e4e09ea5c873';

  return `access_token=${appId}|${clientToken}`;
};

const getRegularUrl = (query, basseUrl) => {
  return basseUrl.replace(/\{format\}/g, 'json') + '?' + query;
};

const fetchEmbed = async (url, provider, params = {}) => {
  const {
    provider_name, // eslint-disable-line camelcase
    provider_url, // eslint-disable-line camelcase
  } = provider;

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

  if (isFacebookGraphDependent(provider)) {
    queries.push(getFacebookGraphToken());
  }

  const query = queries.join('&');

  const link = getRegularUrl(query, provider.url);
  const res = await fetch(link, {mode: 'no-cors'});
  const json = await res.json();
  json.provider_name = provider_name; // eslint-disable-line camelcase
  json.provider_url = provider_url; // eslint-disable-line camelcase
  return json;
};

module.exports = fetchEmbed;
