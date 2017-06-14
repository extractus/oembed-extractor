// utils -> findProvider

var {
  URL
} = require('url');

var providerList = require('./providers.json');

var providers = providerList.map((item) => {
  let {
    provider_name,
    provider_url,
    endpoints
  } = item;

  let endpoint  = endpoints[0];
  let {
    schemes = [],
    url
  } = endpoint;

  let {hostname} = new URL(url);
  let domain = hostname.replace('www.', '');

  return {
    provider_name,
    provider_url,
    schemes,
    domain,
    url
  };
});

var findProvider = (url) => {
  let candidates = providers.filter((provider) => {
    let {
      schemes,
      domain
    } = provider;
    if (!schemes.length) {
      return url.includes(domain);
    }
    return schemes.some((scheme) => {
      let reg = new RegExp(scheme.replace('*', '(.*)'), 'i');
      return url.match(reg);
    });
  });

  return candidates.length > 0 ? candidates[0] : null;
};

module.exports = findProvider;
