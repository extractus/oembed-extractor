#!/usr/bin/env node

const {
  unlinkSync,
  writeFileSync
} = require('fs')

const axios = require('axios')

const { getRequestOptions } = require('./src/config')

const source = 'https://oembed.com/providers.json'
const target = './src/utils/providers.json'
const backup = './src/utils/providers.backup.json'

const providerList = require(target)

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
