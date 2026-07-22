// utils -> retrieve

/**
 * Fetch a URL and return the response body as text.
 *
 * @param {string} url - URL to fetch
 * @param {Function} fetcher - Custom fetch function (url) => Promise<Response>
 * @returns {Promise<string>} Response body as text
 * @throws {Error} If HTTP status is 400 or higher
 */
export const getHtml = async (url, fetcher) => {
  const res = await fetcher(url)

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
 * @param {Function} fetcher - Custom fetch function (url) => Promise<Response>
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} If HTTP status is 400+ or response is not valid JSON
 */
export const getJson = async (url, fetcher) => {
  const res = await fetcher(url)

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
