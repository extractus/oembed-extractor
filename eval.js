// eval.js
// to quickly test with a single url or file

import { extract } from './src/main.js'

/**
 * Extract and log oEmbed data from a URL.
 *
 * @param {string} url - URL to extract oEmbed from
 */
const run = async (url) => {
  try {
    console.time('extract-oembed')
    const oembed = await extract(url)
    console.log(oembed)
    console.timeEnd('extract-oembed')
  } catch (err) {
    console.log(err.message)
  }
}

/**
 * Parse CLI arguments and run extraction.
 *
 * @param {Array} argv - Process argument array
 * @returns {Promise|string} Extraction promise or info message
 */
const init = (argv) => {
  if (argv.length === 3) {
    const url = argv[2]
    return run(url)
  }
  return 'Nothing to do!'
}

init(process.argv)
