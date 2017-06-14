var bella = require('bellajs');
var Promise = require('promise-wtf');
var fetch = require('node-fetch');
var oembedList = require('./oembedList');

var isValidURL = (str) => {
  if (!str || !bella.isString(str)) {
    return false;
  }
  /* eslint-disable*/
  let pattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  /* eslint-enable*/

  if (!pattern.test(str)) {
    return false;
  }
  return true;
};

var extract = (str) => {
  return new Promise((resolve, reject) => {
    let oembedUrl, patternMatch;

    if (!isValidURL(str)) {
      return reject(new Error('Given url is not a valid url'));
    }

    let urls = Object.keys(oembedList);
    for (let i = 0; i < urls.length; i++) {
      let url = urls[i];
      patternMatch = false;
      let ref = oembedList[url];
      for (let j = 0; j < ref.length; j++) {
        let re = new RegExp(ref[j]);
        if (re.test(str)) {
          patternMatch = true;
          break;
        }
      }
      if (patternMatch) {
        let estr = escape(str);
        oembedUrl = `${url}?url=${estr}&format=json`;
        break;
      }
    }

    if (!oembedUrl) {
      return reject(new Error('Given url is not supported by oembed-auto'));
    }

    return fetch(oembedUrl).then((res) => {
      if (res.status !== 200) {
        throw new Error('Request could not be made. ERROR: ' + res.status);
      }
      return res.text();
    }).then((body) => {
      let oem = JSON.parse(unescape(body));
      if (oem && bella.isObject(oem)) {
        return resolve(oem);
      }
      return reject(new Error('Could not objectify!'));
    }).catch((err) => {
      return reject(err);
    });
  });
};

module.exports = {
  extract
};
