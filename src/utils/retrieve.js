// utils -> retrieve

import axios from 'axios'

import { getRequestOptions } from '../config.js'

const isValidContentType = (ctype) => {
  return [
    'application/json',
    'application/javascript',
    'text/javascript'
  ].some((item) => {
    return ctype.includes(item)
  })
}

export default async (url) => {
  try {
    const res = await axios.get(url, getRequestOptions())
    const contentType = res.headers['content-type'] || ''
    if (!isValidContentType(contentType)) {
      throw new Error(`Invalid content type: "${contentType}"`)
    }
    return res.data
  } catch (err) {
    throw new Error(`${err.name}: ${err.message}`)
  }
}
