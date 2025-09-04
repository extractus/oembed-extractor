// utils -> autoDiscovery.js

import { DOMParser } from 'linkedom'

import { getHtml, getJson } from './retrieve.js'

export default async (url, params = {}, options = {}) => {
  const html = await getHtml(url, options)
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const elm = doc.querySelector('link[type="application/json+oembed"]')
  if (!elm) {
    throw new Error('No oEmbed link found')
  }
  const href = elm.getAttribute('href')
  const q = new URL(href)
  const { origin, pathname, searchParams } = q
  Object.keys(params).forEach((key) => {
    if (!searchParams.has(key)) {
      searchParams.append(key, params[key])
    }
  })
  const link = `${origin}${pathname}?${searchParams.toString()}`
  const body = await getJson(link, options)
  body.method = 'auto-discovery'
  return body
}
