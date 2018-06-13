#!/usr/bin/env node

const {
  unlinkSync,
  writeFileSync,
} = require('fs');

const fetch = require('node-fetch');

const source = 'https://oembed.com/providers.json';
const target = './src/utils/providers.json';

const {
  error,
  info,
} = require('./src/utils/logger');

const overwrite = (text) => {
  unlinkSync(target);
  writeFileSync(target, text, 'utf8');
  info('providers.json has been updated.');
};

fetch(source)
  .then((res) => res.text())
  .then(overwrite)
  .catch(error);
