// utils -> retrieve

import axios from 'axios'

import { getRequestOptions } from '../config.js'

export default async (url) => {
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
