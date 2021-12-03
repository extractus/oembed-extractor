#!/usr/bin/env node

const {
  unlinkSync,
  writeFileSync
} = require('fs')

const got = require('got')

const {
  fetchOptions
} = require('./src/config')

const source = 'https://oembed.com/providers.json'
const target = './src/utils/providers.json'
const backup = './src/utils/providers.backup.json'

const providerList = require(target)

const merge = async () => {
  // backup previous version
  writeFileSync(
    backup,
    JSON.stringify(providerList, undefined, 2),
    'utf8'
  )

  const res = got(source, fetchOptions)
  const data = await res.json()

  // merging
  unlinkSync(target)
  writeFileSync(
    target,
    JSON.stringify(data, undefined, 2),
    'utf8'
  )
  console.log('Providers list has been updated')
}

merge()
