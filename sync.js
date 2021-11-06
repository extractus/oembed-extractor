#!/usr/bin/env node

const {
  unlinkSync,
  writeFileSync
} = require('fs')

const fetch = require('cross-fetch')

const source = 'https://oembed.com/providers.json'
const target = './src/utils/providers.json'
const backup = './src/utils/providers.backup.json'

const providerList = require(target)

const merge = (data) => {
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
    JSON.stringify(data, undefined, 2),
    'utf8'
  )
  console.log('Providers list has been updated')
}

fetch(source)
  .then((res) => res.json())
  .then(merge)
  .catch(console.trace)
