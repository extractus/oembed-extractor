// config

const { clone, copies } = require('bellajs')

const requestOptions = {
  headers: {
    'user-agent': 'Mozilla/5.0 (X11; Linux i686; rv:94.0) Gecko/20100101 Firefox/94.0',
    accept: 'application/json; charset=utf-8'
  },
  responseType: 'json',
  responseEncoding: 'utf8',
  timeout: 6e4, // 1 minute
  maxRedirects: 3
}

module.exports = {
  getRequestOptions: () => {
    return clone(requestOptions)
  },
  setRequestOptions: (opts) => {
    copies(opts, requestOptions)
  }
}
