#!/usr/bin/env node

import {
  copyFileSync,
  writeFileSync
} from 'fs'

import axios from 'axios'

import { getRequestOptions } from './src/config.js'

const source = 'https://oembed.com/providers.json'
const latest = './src/utils/providers.latest.js'
const prev = './src/utils/providers.prev.js'

const sync = async () => {
  try {
    const res = await axios.get(source, getRequestOptions())
    const data = JSON.stringify(res.data, undefined, 2)

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
        ''
      ].join('\n'),
      'utf8'
    )
    console.log('Providers list has been updated')
  } catch (err) {
    console.trace(err)
  }
}

sync()
