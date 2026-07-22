
# oembed-extractor

Extract oEmbed content from given URL.

[![NPM](https://badge.fury.io/js/@extractus%2Foembed-extractor.svg)](https://badge.fury.io/js/@extractus%2Foembed-extractor)
![CodeQL](https://github.com/extractus/oembed-extractor/workflows/CodeQL/badge.svg)
[![CI test](https://github.com/extractus/oembed-extractor/workflows/ci-test/badge.svg)](https://github.com/extractus/oembed-extractor/actions)

## Demo

- [Give it a try!](https://extractus.pwshub.com/oembed)

## Install & Usage

### Bun & Node.js

```bash
# bun
bun add @extractus/oembed-extractor

# npm
npm i @extractus/oembed-extractor

# pnpm
pnpm install @extractus/oembed-extractor

# yarn
yarn add @extractus/oembed-extractor
```

```ts
import { extract } from '@extractus/oembed-extractor'

const result = await extract('https://www.youtube.com/watch?v=x2bqscVkGxk')
console.log(result)
```

### Deno

```ts
import { extract } from 'npm:@extractus/oembed-extractor'
```

## APIs

### `.extract()`

Load and extract oembed data.

#### Syntax

```ts
extract(String url)
extract(String url, Object params)
extract(String url, Object params, Function fetcher)
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

##### `fetcher` *optional*

A custom fetch function with the signature `(url: string) => Promise<Response>`.
Use this to customize HTTP behavior: proxy, headers, TLS, authentication, timeouts, etc.

Defaults to `globalThis.fetch`.

**Node.js** (with proxy via undici):

```js
import { extract } from '@extractus/oembed-extractor'
import { fetch, ProxyAgent } from 'undici'

const dispatcher = new ProxyAgent('http://proxy.example.com:8080')
const myFetcher = (url) => fetch(url, { dispatcher })

const result = await extract('https://www.youtube.com/watch?v=x2bqscVkGxk', {}, myFetcher)
```

**Bun** (with proxy):

```js
import { extract } from '@extractus/oembed-extractor'

const myFetcher = (url) => fetch(url, {
  proxy: {
    url: 'http://proxy.example.com:8080',
  },
})

const result = await extract('https://www.youtube.com/watch?v=x2bqscVkGxk', {}, myFetcher)
```

**Deno** (with proxy):

```js
import { extract } from 'npm:@extractus/oembed-extractor'

const client = Deno.createHttpClient({
  proxy: { url: 'http://localhost:8080' },
})
const myFetcher = (url) => fetch(url, { client })

const result = await extract('https://www.youtube.com/watch?v=x2bqscVkGxk', {}, myFetcher)
```

**Custom headers**:

```js
const myFetcher = (url) => fetch(url, {
  headers: {
    'user-agent': 'MyBot/1.0',
    'authorization': 'Bearer token123',
  },
})

const result = await extract(url, {}, myFetcher)
```

**Request timeout**:

```js
const myFetcher = (url) => fetch(url, {
  signal: AbortSignal.timeout(5000),
})

const result = await extract(url, {}, myFetcher)
```


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


## Support the project

If you find value from this open source project, you can support in the following ways:

- Give it a star ⭐
- Buy me a coffee: https://paypal.me/ndaidong 🍵
- Subscribe [oEmbed Parser service](https://rapidapi.com/pwshub-pwshub-default/api/oembed-parser/) on RapidAPI 😉

Thank you.

---
