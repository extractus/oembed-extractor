#!/usr/bin/env node

import {
  copyFileSync,
  writeFileSync
} from 'fs'

import retrieve from './src/utils/retrieve.js'

const source = 'https://oembed.com/providers.json'
const latest = './src/utils/providers.latest.js'
const prev = './src/utils/providers.prev.js'

const sync = async () => {
  try {
    const result = await retrieve(source)
    const data = JSON.stringify(result, undefined, 2)

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
