# oembed-parser

[![NPM](https://badge.fury.io/js/oembed-parser.svg)](https://badge.fury.io/js/oembed-parser)
[![Build Status](https://travis-ci.org/ndaidong/oembed-parser.svg?branch=master)](https://travis-ci.org/ndaidong/oembed-parser)


### Installation

```bash
npm install oembed-parser
```

### Usage

```js
const {
  extract,
} = require('oembed-parser');

let url = 'https://www.youtube.com/watch?v=8jPQjjsBbIc';

// Promise style
extract(url).then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});


// async/await style
const getArticle = async (link) => {
  try {
    let data = await extract(link);
    return data;
  } catch (err) {
    return err;
  }
}

console.log(getArticle(url));
```

### APIs

#### .extract(String URL)

Return a Promise object.

#### .hasProvider(String URL)

Return boolean. True if the URL matches with any provider in the list.


#### Provider list

List of resource providers is a clone of [oembed.com](http://oembed.com/providers.json) and available [here](https://raw.githubusercontent.com/ndaidong/oembed-parser/master/src/utils/providers.json).


## Test

```bash
git clone https://github.com/ndaidong/oembed-parser.git
cd oembed-parser
npm install
npm test
```

# License

The MIT License (MIT)
