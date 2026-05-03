#!/usr/bin/env node

import {
  copyFileSync,
  writeFileSync
} from 'node:fs'

import { getJson } from './src/utils/retrieve.js'
import { simplify } from './src/utils/provider.js'

/** URL of the oEmbed providers registry */
const source = 'https://oembed.com/providers.json'
/** Path to the latest providers module */
const latest = './src/utils/providers.latest.js'
/** Path to the previous providers backup */
const prev = './src/utils/providers.prev.js'
/** Path to the raw original JSON dump */
const original = './src/utils/providers.original.json'

/**
 * Write raw provider data to a JSON file.
 *
 * @param {Array} data - Provider data from the registry
 * @param {string} file - Output file path
 */
const saveOriginal = (data, file) => {
  writeFileSync(
    file,
    JSON.stringify(data, undefined, 2),
    'utf8'
  )
}

/**
 * Synchronize the local provider list with the remote oEmbed registry.
 * Backs up the current list, downloads the latest, and writes both
 * raw JSON and the compact JS module.
 */
const sync = async () => {
  try {
    const result = await getJson(source)
    saveOriginal(result, original)

    const arr = simplify(result)
    const data = JSON.stringify(arr, undefined, 2)

    // backup previous version
    copyFileSync(latest, prev)

    const syncTime = (new Date()).toISOString()

    writeFileSync(
      latest,
      [
        `// provider data, synchronized at ${syncTime}`,
        '',
        '/* eslint-disable */ ',
        '',
        `export const providers = ${data}`,
        '',
      ].join('\n'),
      'utf8'
    )
    console.log('Providers list has been updated')
  } catch (err) {
    console.trace(err)
  }
}

sync()
