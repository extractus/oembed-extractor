// release.test

/* eslint-env jest */

import {
  existsSync,
  readFileSync
} from 'fs'

const pkg = JSON.parse(readFileSync('./package.json'))

const cjsFile = `./dist/${pkg.name}.js`
const esmFile = `./dist/${pkg.name}.esm.js`

describe('Validate commonjs version output', () => {
  test(`Check if ${cjsFile} created`, () => {
    expect(existsSync(cjsFile)).toBeTruthy()
  })
  const constent = readFileSync(cjsFile, 'utf8')
  const lines = constent.split('\n')
  test('Check if file meta contains package info', () => {
    expect(lines[0].includes(`${pkg.name}@${pkg.version}`)).toBeTruthy()
    expect(lines[0].includes(pkg.author)).toBeTruthy()
    expect(lines[0].includes(pkg.license)).toBeTruthy()
  })
})

describe('Validate ESM version output', () => {
  test(`Check if ${esmFile} created`, () => {
    expect(existsSync(esmFile)).toBeTruthy()
  })
  const constent = readFileSync(esmFile, 'utf8')
  const lines = constent.split('\n')
  test('Check if file meta contains package info', () => {
    expect(lines[0].includes(`${pkg.name}@${pkg.version}`)).toBeTruthy()
    expect(lines[0].includes(pkg.author)).toBeTruthy()
    expect(lines[0].includes(pkg.license)).toBeTruthy()
  })
})
