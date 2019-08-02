/**
 * Import specs
 */

const {
  existsSync,
  readdirSync,
} = require('fs');

const {
  extname,
  join,
} = require('path');


const where = './test/specs';
if (existsSync(where)) {
  readdirSync(where).forEach((file) => {
    if (extname(file) === '.js') {
      require(join('.' + where, file));
    }
  });
}
