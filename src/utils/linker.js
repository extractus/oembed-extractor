// utils -> linker

/**
 * Check if a string is a valid HTTP or HTTPS URL.
 *
 * @param {string} [url=''] - URL to validate
 * @returns {boolean} True if URL is valid and uses http/https protocol
 */
export const isValid = (url = '') => {
  try {
    const ourl = new URL(url)
    return ourl !== null && ourl.protocol.startsWith('http')
  } catch {
    return false
  }
}

/**
 * Extract the domain from a URL, stripping the www. prefix.
 *
 * @param {string} url - Full URL
 * @returns {string} Domain without www.
 */
export const getDomain = (url) => {
  const host = (new URL(url)).host
  return host.replace('www.', '')
}
