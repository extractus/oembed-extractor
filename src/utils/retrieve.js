// utils -> retrieve

const got = require('got')

const { fetchOptions } = require('../config')

module.exports = async (url) => {
  try {
    const { headers, body } = await got(url, fetchOptions)

    const contentType = headers['content-type'] || ''
    if (!contentType || !contentType.includes('application/json')) {
      return null
    }

    return body
  } catch (err) {
    return null
  }
}
