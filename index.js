/**
 * Starting app
 * @ndaidong
**/

global.Promise = require('promise-wtf');

const main = require('./src/main');
main.version = require('./package').version;

module.exports = main;
