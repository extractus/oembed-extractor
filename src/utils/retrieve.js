// utils -> retrieve

/**
 * Fetch a resource through a proxy endpoint.
 *
 * @param {string} url - Target URL to fetch
 * @param {object} [options={}] - Options containing proxy config and signal
 * @param {object} [options.proxy] - Proxy configuration
 * @param {string} options.proxy.target - Proxy base URL
 * @param {object} [options.proxy.headers] - Headers to send to the proxy
 * @param {object} [options.signal] - AbortSignal for request cancellation
 * @returns {Promise<Response>} Fetch response object
 */
const profetch = async (url, options = {}) => {
  const { proxy = {}, signal = null } = options
  const {
    target,
    headers = {},
  } = proxy
  const res = await fetch(target + encodeURIComponent(url), {
    headers,
    signal,
  })
  return res
}

/**
 * Fetch a URL and return the response body as text.
 *
 * @param {string} url - URL to fetch
 * @param {object} [options={}] - Fetch options (headers, proxy, agent, signal)
 * @returns {Promise<string>} Response body as text
 * @throws {Error} If HTTP status is 400 or higher
 */
export const getHtml = async (url, options = {}) => {
  const {
    headers = {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
    },
    proxy = null,
    agent = null,
    signal = null,
  } = options

  const res = proxy ? await profetch(url, { proxy, signal }) : await fetch(url, { headers, agent, signal })

  const status = res.status
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`)
  }

  const text = await res.text()
  return text
}

/**
 * Fetch a URL and parse the response body as JSON.
 *
 * @param {string} url - URL to fetch
 * @param {object} [options={}] - Fetch options (headers, proxy, agent, signal)
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} If HTTP status is 400+ or response is not valid JSON
 */
export const getJson = async (url, options = {}) => {
  const {
    headers = {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0',
    },
    proxy = null,
    agent = null,
    signal = null,
  } = options

  const res = proxy ? await profetch(url, { proxy, signal }) : await fetch(url, { headers, agent, signal })

  const status = res.status
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`)
  }

  try {
    const text = await res.text()
    return JSON.parse(text.trim())
  } catch {
    throw new Error('Failed to convert data to JSON object')
  }
}
