# oembed-parser

[![NPM](https://badge.fury.io/js/oembed-parser.svg)](https://badge.fury.io/js/oembed-parser)
[![Build Status](https://travis-ci.org/ndaidong/oembed-parser.svg?branch=master)](https://travis-ci.org/ndaidong/oembed-parser)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/oembed-parser/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/oembed-parser?branch=master)


### Installation

```bash
npm i oembed-parser
```

### Usage

```js
import {
  extract,
} from 'oembed-parser';

const url = 'https://www.youtube.com/watch?v=8jPQjjsBbIc';

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

#### .setProviderList(Array of provider definitions)

Sets the list of providers to use, overriding the defaults.

This can be useful for whitelisting only certain providers, or for adding
custom providers.

For the expected format, see the
[default list](https://raw.githubusercontent.com/ndaidong/oembed-parser/master/src/utils/providers.json).


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
