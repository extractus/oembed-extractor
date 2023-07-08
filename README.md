
# oembed-extractor

Extract oEmbed content from given URL.

[![NPM](https://badge.fury.io/js/@extractus%2Foembed-extractor.svg)](https://badge.fury.io/js/@extractus%2Foembed-extractor)
![CodeQL](https://github.com/extractus/oembed-extractor/workflows/CodeQL/badge.svg)
[![CI test](https://github.com/extractus/oembed-extractor/workflows/ci-test/badge.svg)](https://github.com/extractus/oembed-extractor/actions)
[![Coverage Status](https://coveralls.io/repos/github/extractus/oembed-extractor/badge.svg)](https://coveralls.io/github/extractus/oembed-extractor)

## Demo

- [Give it a try!](https://extractor-demos.pages.dev/oembed-extractor)
- [Example FaaS](https://extractus.deno.dev/extract?apikey=rn0wbHos2e73W6ghQf705bdF&type=oembed&url=https://www.instagram.com/tv/CVlR5GFqF68/)


## Install & Usage

### Node.js

```bash
npm i @extractus/oembed-extractor

# pnpm
pnpm i @extractus/oembed-extractor

# yarn
yarn add @extractus/oembed-extractor
```

```ts
// es6 module
import { extract } from '@extractus/oembed-extractor'

// CommonJS
const { extract } = require('@extractus/oembed-extractor')

// or specify exactly path to CommonJS variant
const { extract } = require('@extractus/oembed-extractor/dist/cjs/oembed-extractor.js')

const result = await extract('https://www.youtube.com/watch?v=x2bqscVkGxk')
console.log(result)
```

### Deno

```ts
// deno < 1.28
import { extract } from 'https://esm.sh/@extractus/oembed-extractor'

// deno > 1.28
import { extract } from 'npm:@extractus/oembed-extractor'

const result = await extract('https://www.youtube.com/watch?v=x2bqscVkGxk')
console.log(result)
```

### Browser

```ts
import { extract } from "https://esm.sh/@extractus/oembed-extractor@latest"
```

Please check [the examples](examples) for reference.


## APIs

### `.extract()`

Load and extract oembed data.

#### Syntax

```ts
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

`fetchOptions` is an object that can have the following properties:

- `headers`: to set request headers
- `proxy`: another endpoint to forward the request to
- `agent`: a HTTP proxy agent
- `signal`: AbortController signal or AbortSignal timeout to terminate the request

You can use this param to set request headers to fetch.

For example:

```js
import { extract } from '@extractus/oembed-extractor'

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
import { extract } from '@extractus/oembed-extractor'

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

Another way to work with proxy is use `agent` option instead of `proxy` as below:

```js
import { extract } from '@extractus/oembed-extractor'

import { HttpsProxyAgent } from 'https-proxy-agent'

const proxy = 'http://abc:RaNdoMpasswORd_country-France@proxy.packetstream.io:31113'

const url = 'https://codepen.io/ndaidong/pen/LYmLKBw'

const oembed = await extract(url, null, {
  agent: new HttpsProxyAgent(proxy),
})
console.log('Run oembed-extractor with proxy:', proxy)
console.log(oembed)
```

For more info about [https-proxy-agent](https://www.npmjs.com/package/https-proxy-agent), check [its repo](https://github.com/TooTallNate/proxy-agents).

By default, there is no request timeout. You can use the option `signal` to cancel request at the right time.

The common way is to use AbortControler:

```js
const controller = new AbortController()

// stop after 5 seconds
setTimeout(() => {
  controller.abort()
}, 5000)

const oembed = await extract(url, null, {
  signal: controller.signal,
})
```

A newer solution is AbortSignal's `timeout()` static method:

```js
// stop after 5 seconds
const oembed = await extract(url, null, {
  signal: AbortSignal.timeout(5000),
})
```

For more info:

- [AbortController constructor](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [AbortSignal: timeout() static method](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static)


### `.setProviderList()`

Apply a list of providers to use, overriding the [default](src/utils/providers.orginal.json).

#### Syntax

```ts
setProviderList(Array providers)
```

#### Parameters

##### `providers` *required*

List of providers to apply.

For example:

```js
import { setProviderList } from '@extractus/oembed-extractor'

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

If you want to modify providers list, please make pull request on [iamcal/oembed](https://github.com/iamcal/oembed) then create issue/pr here to ask for sync.


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
git clone https://github.com/extractus/oembed-extractor.git
cd oembed-extractor
npm i
npm test
```

![oembed-extractor unit test](https://i.imgur.com/Nr5BgUx.png)


## Quick evaluation

```bash
git clone https://github.com/extractus/oembed-extractor.git
cd oembed-extractor
npm i
npm run eval {URL_TO_PARSE_OEMBED}
```

## License
The MIT License (MIT)

---
