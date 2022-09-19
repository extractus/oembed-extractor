// utils -> linker

export const isValid = (url = '') => {
  try {
    const ourl = new URL(url)
    return ourl !== null && ourl.protocol.startsWith('http')
  } catch (err) {
    return false
  }
}

export const getDomain = (url) => {
  const host = (new URL(url)).host
  return host.replace('www.', '')
}
