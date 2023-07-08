// eval.js
// to quickly test with a single url or file

import { extract } from './src/main.js'

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

const init = (argv) => {
  if (argv.length === 3) {
    const url = argv[2]
    return run(url)
  }
  return 'Nothing to do!'
}

init(process.argv)
