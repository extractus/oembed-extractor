// utils -> getDomain

module.exports = (url = '') => {
  try {
    const { host } = new URL(url)
    return host
  } catch (err) {
    return ''
  }
}
