# oembed-parser
oembed-parser

[![NPM](https://badge.fury.io/js/oembed-parser.svg)](https://badge.fury.io/js/oembed-parser)
[![Build Status](https://travis-ci.org/ndaidong/oembed-parser.svg?branch=master)](https://travis-ci.org/ndaidong/oembed-parser)
[![codecov](https://codecov.io/gh/ndaidong/oembed-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/ndaidong/oembed-parser)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/oembed-parser.svg)](https://gemnasium.com/github.com/ndaidong/oembed-parser)
[![NSP Status](https://nodesecurity.io/orgs/techpush/projects/50686256-aba1-40b5-9ba6-20ff375f6d54/badge)](https://nodesecurity.io/orgs/techpush/projects/50686256-aba1-40b5-9ba6-20ff375f6d54)


### Installation

```
npm install oembed-parser
```

### Usage

```
var {extract} = require('oembed-parser');

let url = 'https://www.youtube.com/watch?v=8jPQjjsBbIc';

extract(url).then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});
```

#### Provider list

List of resource providers is a clone of [oembed.com](http://oembed.com/providers.json) and available [here](https://raw.githubusercontent.com/ndaidong/oembed-parser/master/src/utils/providers.json).


## Test

```
git clone https://github.com/ndaidong/oembed-parser.git
cd oembed-parser
npm install
npm test
```

# License

The MIT License (MIT)
