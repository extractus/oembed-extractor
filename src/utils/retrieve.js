// utils -> retrieve

import axios from 'axios'

import { getRequestOptions } from '../config.js'
import { error } from './logger.js'

const isValidContentType = (ctype) => {
  return [
    'application/json',
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
      error(`Invalid content type! (${contentType})`)
      return null
    }
    return res.data
  } catch (err) {
    error(err.message)
    return null
  }
}
