// config

const fetchOptions = {
  headers: {
    'user-agent': 'Mozilla/5.0 (X11; Linux i686; rv:94.0) Gecko/20100101 Firefox/94.0',
    accept: 'application/json; charset=utf-8'
  },
  responseType: 'json',
  timeout: 30 * 1e3,
  redirect: 'follow'
}

module.exports = {
  fetchOptions
}
