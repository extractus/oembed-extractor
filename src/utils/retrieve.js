// utils -> retrieve

import axios from 'axios'

import { getRequestOptions } from '../config.js'

export default async (url) => {
  try {
    const res = await axios.get(url, getRequestOptions())
    return res.data
  } catch (err) {
    throw new Error(`${err.name}: ${err.message}`)
  }
}
