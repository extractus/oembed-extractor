/**
 * build.js
 * @ndaidong
**/

import { readFileSync } from 'fs'
import { execSync } from 'child_process'

import { buildSync } from 'esbuild'

const pkg = JSON.parse(readFileSync('./package.json'))

execSync('rm -rf dist')
execSync('mkdir dist')

const buildTime = (new Date()).toISOString()
const comment = [
  `// ${pkg.name}@${pkg.version}, by ${pkg.author}`,
  `built with esbuild at ${buildTime}`,
  `published under ${pkg.license} license`
].join(' - ')

const baseOpt = {
  entryPoints: ['src/main.js'],
  bundle: true,
  charset: 'utf8',
  target: ['es2020', 'node14'],
  pure: ['console.log', 'debug', 'alert'],
  legalComments: 'none',
  minify: false,
  sourcemap: false,
  write: true
}

const cjsVersion = {
  ...baseOpt,
  platform: 'node',
  format: 'cjs',
  mainFields: ['main'],
  outfile: `dist/${pkg.name}.js`,
  banner: {
    js: comment
  }
}
buildSync(cjsVersion)

const esmVersion = {
  ...baseOpt,
  platform: 'browser',
  format: 'esm',
  mainFields: ['module'],
  outfile: `dist/${pkg.name}.esm.js`,
  banner: {
    js: comment
  }
}
buildSync(esmVersion)
