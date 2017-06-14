/**
 * Starting app
 * @ndaidong
**/

global.Promise = require('promise-wtf');

var main = require('./src/main');
main.version = require('./package').version;

module.exports = main;
