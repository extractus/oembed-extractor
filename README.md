
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


## Install & Usage

### Node.js

```bash
npm i oembed-parser

# pnpm
pnpm i oembed-parser

# yarn
yarn add oembed-parser
```

```js
import { extract } from 'oembed-parser'

// with CommonJS environments
// const { extract } = require('oembed-parser')
// or specify exactly path to cjs variant
// const { extract } = require('oembed-parser/dist/cjs/oembed-parser.js')

const url = 'https://www.youtube.com/watch?v=x2bqscVkGxk'

extract(url).then((oembed) => {
  console.log(oembed)
}).catch((err) => {
  console.trace(err)
})
```

### Deno

```ts
import { extract } from 'https://esm.sh/oembed-parser'

(async () => {
  const data = await extract('https://www.youtube.com/watch?v=x2bqscVkGxk')
  console.log(data)
})();
```

View [more examples](https://github.com/ndaidong/oembed-parser/tree/main/examples).


## APIs

### `.extract()`

Load and extract oembed data.

#### Syntax

```js
extract(String url)
extract(String url, Object params)
extract(String url, Object params, Object fetchOptions)
```

#### Parameters

##### `url` *required*

URL of a valid oEmbed resource, e.g. `https://www.youtube.com/watch?v=x2bqscVkGxk`

##### `params` *optional*

Optional argument `params` can be useful when you want to specify some additional customizations.

Here are several popular params:

- `maxwidth`: max width of embed size
- `maxheight`: max height of embed size
- `theme`: e.g, `dark` or `light`
- `lang`: e.g, 'en', 'fr', 'cn', 'vi', etc

Note that some params are supported by these providers but not by the others.
Please see the provider's oEmbed API docs carefully for exact information.

##### `fetchOptions` *optional*

You can use this param to set request headers to fetch.

For example:

```js
import { extract } from 'oembed-parser'

const url = 'https://codepen.io/ndaidong/pen/LYmLKBw'
extract(url, null, {
  headers: {
    'user-agent': 'Opera/9.60 (Windows NT 6.0; U; en) Presto/2.1.1'
  }
})
```

You can also specify a proxy endpoint to load remote content, instead of fetching directly.

For example:

```js
import { extract } from 'oembed-parser'

const url = 'https://codepen.io/ndaidong/pen/LYmLKBw'
extract(url, null, {
  headers: {
    'user-agent': 'Opera/9.60 (Windows NT 6.0; U; en) Presto/2.1.1'
  },
  proxy: {
    target: 'https://your-secret-proxy.io/loadJson?url=',
    headers: {
      'Proxy-Authorization': 'Bearer YWxhZGRpbjpvcGVuc2VzYW1l...'
    }
  }
})
```

With the above setting, request will be forwarded to `https://your-secret-proxy.io/loadJson?url={OEMBED_ENDPOINT}`.


### `.setProviderList()`

Apply a list of providers to use, overriding the [default](https://raw.githubusercontent.com/ndaidong/oembed-parser/master/src/utils/providers.json).

#### Syntax

```js
setProviderList(Array providers)
```

#### Parameters

##### `providers` *required*

List of providers to apply.

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

Default list of resource providers is synchronized from [oembed.com](http://oembed.com/providers.json).


## Facebook and Instagram

In order to work with the links from Facebook and Instagram, you need a [reviewed Facebook's app](https://developers.facebook.com/docs/app-review) with [oEmbed Read](https://developers.facebook.com/docs/features-reference/oembed-read) permission.

When seeing a link from Facebook or Instagram, `oembed-parser` will look for environment variables `FACEBOOK_APP_ID` and `FACEBOOK_CLIENT_TOKEN` to retrieve oembed data using your app credentials.

For example:

```bash
export FACEBOOK_APP_ID=your_app_id
export FACEBOOK_CLIENT_TOKEN=your_client_token

npm run eval https://www.instagram.com/tv/CVlR5GFqF68/
```

## License
The MIT License (MIT)

---
