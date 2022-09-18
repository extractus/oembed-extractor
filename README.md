
# oembed-parser

Extract oEmbed content from given URL.

[![NPM](https://badge.fury.io/js/oembed-parser.svg)](https://badge.fury.io/js/oembed-parser)
[![CI test](https://github.com/ndaidong/oembed-parser/workflows/ci-test/badge.svg)](https://github.com/ndaidong/oembed-parser/actions)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/oembed-parser/badge.svg)](https://coveralls.io/github/ndaidong/oembed-parser)
![CodeQL](https://github.com/ndaidong/oembed-parser/workflows/CodeQL/badge.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Deploy](https://button.deta.dev/1/svg)](https://go.deta.dev/deploy?repo=https://github.com/ndaidong/oembed-parser-deta)

## Demo

- [Give it a try!](https://demos.pwshub.com/oembed-parser)
- [Example FaaS](https://oembed.deta.dev/?url=https://www.instagram.com/tv/CVlR5GFqF68/)


## Setup

- Node.js

  ```bash
  npm i oembed-parser

  # pnpm
  pnpm i oembed-parser

  # yarn
  yarn add oembed-parser
  ```

### Usage

```js
import { extract } from 'oembed-parser'

// with CommonJS environments

// const { extract } = require('oembed-parser')

// or specify exactly path to cjs variant
// const { extract } = require('oembed-parser/dist/cjs/oembed-parser.js')

const url = 'https://www.youtube.com/watch?v=8jPQjjsBbIc'

extract(url).then((oembed) => {
  console.log(oembed)
}).catch((err) => {
  console.trace(err)
})
```

## APIs

### `.extract(String url [, Object params])`

Load and extract oembed data.

Example:

```js
import { extract } from 'oembed-parser'

const getOembed = async (url) => {
  try {
    const oembed = await extract(url)
    return oembed
  } catch (err) {
    console.trace(err)
    return null
  }
}

const data = getOembed('your url')
console.log(data)
```

Optional argument `params` can be useful when you want to specify some additional customizations.

Here are several popular params:

- `maxwidth`: max width of embed size
- `maxheight`: max height of embed size
- `theme`: e.g, `dark` or `light`
- `lang`: e.g, 'en', 'fr', 'cn', 'vi', etc

Note that some params are supported by these providers but not by the others.
Please see the provider's oEmbed API docs carefully for exact information.

### `.hasProvider(String URL)`

Check if a URL matches with any provider in the list.

Examples:

```js
import { hasProvider } from 'oembed-parser'

hasProvider('https://www.youtube.com/watch?v=ciS8aCrX-9s') // return true
hasProvider('https://trello.com/b/BO3bg7yn/notes') // return false
```

### `.findProvider(String URL)`

Get the provider which is relevant to given URL.

For example:

```js
import { findProvider } from 'oembed-parser'

findProvider('https://www.facebook.com/video.php?v=999999999')
```

Result looks like below:

```js
{
  fetchEndpoint: 'https://graph.facebook.com/v10.0/oembed_video',
  providerName: 'Facebook',
  providerUrl: 'https://www.facebook.com/'
}
```

### `.setProviderList(Array providers)`

Apply a list of providers to use, overriding the [default](https://raw.githubusercontent.com/ndaidong/oembed-parser/master/src/utils/providers.json).

This can be useful for whitelisting only certain providers, or for adding
custom providers.

Default list of resource providers is synchronized from [oembed.com](http://oembed.com/providers.json).

For example:

```js
import { setProviderList } from 'oembed-parser'

const providers = [
  {
    provider_name: 'Alpha',
    provider_url: 'https://alpha.com',
    endpoints: [
      // endpoint definition here
    ]
  },
  {
    provider_name: 'Beta',
    provider_url: 'https://beta.com',
    endpoints: [
      // endpoint definition here
    ]
  }
]

setProviderList(providers)
```

## Facebook and Instagram

In order to work with the links from Facebook and Instagram, you need a [reviewed Facebook's app](https://developers.facebook.com/docs/app-review) with [oEmbed Read](https://developers.facebook.com/docs/features-reference/oembed-read) permission.

When seeing a link from Facebook or Instagram, `oembed-parser` will look for environment variables `FACEBOOK_APP_ID` and `FACEBOOK_CLIENT_TOKEN` to retrieve oembed data using your app credentials.

For example:

```bash
export FACEBOOK_APP_ID=your_app_id
export FACEBOOK_CLIENT_TOKEN=your_client_token

npm run eval https://www.instagram.com/tv/CVlR5GFqF68/
```

## Test

```bash
git clone https://github.com/ndaidong/oembed-parser.git
cd oembed-parser
npm install
npm test

# quick evaluation
npm run eval {URL_TO_PARSE_OEMBED}
```

## License
The MIT License (MIT)

---
