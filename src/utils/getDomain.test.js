// getDomain.test
/* eslint-env jest */

const getDomain = require('./getDomain')

describe('test getDomain()', () => {
  const cases = [
    {
      url: 'https://www.23hq.com',
      expected: 'www.23hq.com'
    },
    {
      url: 'https://secure.actblue.com',
      expected: 'secure.actblue.com'
    },
    {
      url: 'https://docs.microsoft.com/en-us/azure/iot-edge/quickstart?view=iotedge-2018-06',
      expected: 'docs.microsoft.com'
    },
    {
      url: 'http://192.168.1.199:8081/example/page',
      expected: '192.168.1.199:8081'
    },
    {
      url: '',
      expected: ''
    },
    {
      url: null,
      expected: ''
    },
    {
      url: { a: 'x' },
      expected: ''
    }
  ]
  cases.forEach(({ url, expected }) => {
    test(`  getDomain("${url}") must return "${expected}"`, () => {
      const result = getDomain(url)
      expect(result).toEqual(expected)
    })
  })
})
