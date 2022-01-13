#!/usr/bin/env node

import {
  unlinkSync,
  readFileSync,
  writeFileSync
} from 'fs'

import axios from 'axios'

import { getRequestOptions } from './src/config.js'

const source = 'https://oembed.com/providers.json'
const target = './src/utils/providers.json'
const backup = './src/utils/providers.backup.json'

const providerList = JSON.parse(readFileSync(target))

const merge = async () => {
  try {
    const res = await axios.get(source, getRequestOptions())

    // backup previous version
    writeFileSync(
      backup,
      JSON.stringify(providerList, undefined, 2),
      'utf8'
    )

    // merging
    unlinkSync(target)
    writeFileSync(
      target,
      JSON.stringify(res.data, undefined, 2),
      'utf8'
    )
    console.log('Providers list has been updated')
  } catch (err) {
    console.trace(err)
  }
}

merge()
