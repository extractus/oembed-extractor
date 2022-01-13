// utils -> getDomain

export default (url = '') => {
  try {
    const { host } = new URL(url)
    return host
  } catch (err) {
    return ''
  }
}
