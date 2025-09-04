// linker.test

import { describe, it } from 'node:test'
import assert from 'node:assert'

import { isValid as isValidURL } from './linker.js'

describe('test isValidURL()', () => {
  const cases = [
    {
      url: 'https://www.23hq.com',
      expected: true,
    },
    {
      url: 'https://secure.actblue.com',
      expected: true,
    },
    {
      url: 'https://docs.microsoft.com/en-us/azure/iot-edge/quickstart?view=iotedge-2018-06',
      expected: true,
    },
    {
      url: 'http://192.168.1.199:8081/example/page',
      expected: true,
    },
    {
      url: 'ftp://192.168.1.199:8081/example/page',
      expected: false,
    },
    {
      url: '',
      expected: false,
    },
    {
      url: null,
      expected: false,
    },
    {
      url: { a: 'x' },
      expected: false,
    },
  ]
  cases.forEach(({ url, expected }) => {
    it(`isValidURL("${url}") must return "${expected}"`, () => {
      const result = isValidURL(url)
      assert.equal(result, expected)
    })
  })
})
