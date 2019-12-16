// utils -> findProvider

export default (url, providers) => {
  const candidates = providers.filter((provider) => {
    const {
      schemes,
      domain,
    } = provider;
    if (!schemes.length) {
      return url.includes(domain);
    }
    return schemes.some((scheme) => {
      const reg = new RegExp(scheme.replace(/\*/g, '(.*)'), 'i');
      return url.match(reg);
    });
  });

  return candidates.length > 0 ? candidates[0] : null;
};
