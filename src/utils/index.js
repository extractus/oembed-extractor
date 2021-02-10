module.exports = {
  isValidURL: require('./isValidURL'),
  findProvider: require('./findProvider'),
  fetchEmbed: require('./fetchEmbed').fetchEmbed,
  createLink: require('./fetchEmbed').createLink,
  providersFromList: require('./providersFromList'),
};
