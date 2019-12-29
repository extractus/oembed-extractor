#!/usr/bin/env node

const PROVIDERS_URL = 'https://oembed.com/providers.json';

const {writeFile} = require('fs').promises;
const fetch = require('node-fetch');
const path = require('path');

fetch(PROVIDERS_URL)
  .then((res) => res.json())
  .then((json) =>
    writeFile(
      path.resolve(__dirname, '../src/utils/providers.json'),
      JSON.stringify(json, null, 2)
    )
  )
  .catch((err) => console.error(err) && process.exit(1));
