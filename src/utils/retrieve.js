// utils -> retrieve

const axios = require('axios')

const { getRequestOptions } = require('../config')

module.exports = async (url) => {
  try {
    const res = await axios.get(url, getRequestOptions())

    const contentType = res.headers['content-type'] || ''
    if (!contentType || !contentType.includes('application/json')) {
      return null
    }

    return res.data
  } catch (err) {
    return null
  }
}
