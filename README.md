# @extractus/oembed-extractor

Extract oEmbed content from given URL.

[![JSR](https://jsr.io/badges/@extractus/oembed-extractor)](https://jsr.io/@extractus/oembed-extractor)
[![npm version](https://badge.fury.io/js/@extractus%2Foembed-extractor.svg)](https://badge.fury.io/js/@extractus%2Foembed-extractor)
![CI test](https://github.com/extractus/oembed-extractor/workflows/ci-test/badge.svg)

## Install

### Deno

```bash
deno add jsr:@extractus/oembed-extractor
```

### Node.js / Bun

```bash
pnpm add jsr:@extractus/oembed-extractor
# or
npx jsr add @extractus/oembed-extractor
# or
bunx jsr add @extractus/oembed-extractor
```

Alternatively, install from npm:

```bash
npm install @extractus/oembed-extractor
# or
bun add @extractus/oembed-extractor
```

## Usage

```ts
import { extract } from "jsr:@extractus/oembed-extractor";

const data = await extract("https://www.youtube.com/watch?v=x2bqscVkGxk");
console.log(data);
```

## APIs

- [`extract()`](#extract)
- [`findProvider()`](#findprovider)
- [`hasProvider()`](#hasprovider)
- [`setProviderList()`](#setproviderlist)

---

### `extract()`

Load and extract oEmbed data from a URL.

#### Syntax

```ts
extract(url: string): Promise<OembedData>
extract(url: string, params?: Params): Promise<OembedData>
extract(url: string, params?: Params, fetcher?: Fetcher): Promise<OembedData>
```

Example:

```ts
import { extract } from "jsr:@extractus/oembed-extractor";

try {
  const result = await extract("https://www.youtube.com/watch?v=x2bqscVkGxk");
  console.log(result);
} catch (err) {
  console.error(err);
}
```

The result is an `OembedData` object:

```ts
interface OembedData {
  type: "rich" | "video" | "photo" | "link";
  version: string;
  title?: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  cache_age?: string | number;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
  method?: string;
  [key: string]: unknown;
}
```

#### Parameters

##### `url` *required*

URL of a valid oEmbed resource, e.g. `https://www.youtube.com/watch?v=x2bqscVkGxk`

##### `params` *optional*

| Property | Type | Description |
|---|---|---|
| `maxwidth` | `number` | Max width of embed size |
| `maxheight` | `number` | Max height of embed size |
| `theme` | `string` | e.g. `"dark"` or `"light"` |
| `lang` | `string` | e.g. `"en"`, `"fr"`, `"vi"` |

Note that some params are supported by some providers but not others.
See the provider's oEmbed API docs for exact information.

##### `fetcher` *optional*

A custom fetch function with the signature `(url: string) => Promise<Response>`.
Use this to customize HTTP behavior: proxy, headers, TLS, authentication, timeouts, etc.

Defaults to `globalThis.fetch`.

**Deno** (with proxy):

```ts
import { extract } from "@extractus/oembed-extractor";

const client = Deno.createHttpClient({
  proxy: { url: "http://proxy.example.com:8080" },
});
const myFetcher = (url: string) => fetch(url, { client });

const result = await extract("https://www.youtube.com/watch?v=x2bqscVkGxk", {}, myFetcher);
```

**Node.js** (with proxy via undici):

```ts
import { extract } from "@extractus/oembed-extractor";
import { fetch, ProxyAgent } from "undici";

const dispatcher = new ProxyAgent("http://proxy.example.com:8080");
const myFetcher = (url: string) => fetch(url, { dispatcher });

const result = await extract("https://www.youtube.com/watch?v=x2bqscVkGxk", {}, myFetcher);
```

**Bun** (with proxy):

```ts
import { extract } from "@extractus/oembed-extractor";

const myFetcher = (url: string) =>
  fetch(url, {
    proxy: "http://proxy.example.com:8080",
  });

const result = await extract("https://www.youtube.com/watch?v=x2bqscVkGxk", {}, myFetcher);
```

**Custom headers**:

```ts
const myFetcher = (url: string) =>
  fetch(url, {
    headers: {
      "user-agent": "MyBot/1.0",
      authorization: "Bearer token123",
    },
  });

const result = await extract(url, {}, myFetcher);
```

**Request timeout**:

```ts
const myFetcher = (url: string) =>
  fetch(url, {
    signal: AbortSignal.timeout(5000),
  });

const result = await extract(url, {}, myFetcher);
```

---

### `findProvider()`

Find the provider that matches a given URL.

#### Syntax

```ts
findProvider(url: string): FindResult | null
```

Example:

```ts
import { findProvider } from "jsr:@extractus/oembed-extractor";

const provider = findProvider("https://www.youtube.com/watch?v=x2bqscVkGxk");
console.log(provider?.endpoint); // "https://www.youtube.com/oembed"
```

---

### `hasProvider()`

Check if a URL is supported by any registered provider.

#### Syntax

```ts
hasProvider(url: string): boolean
```

Example:

```ts
import { hasProvider } from "jsr:@extractus/oembed-extractor";

hasProvider("https://www.youtube.com/watch?v=x2bqscVkGxk"); // true
hasProvider("https://example.com/unknown"); // false
```

---

### `setProviderList()`

Replace the provider list with a custom set of providers, overriding the [default](src/utils/providers.original.json).

#### Syntax

```ts
setProviderList(providers: Provider[]): number
```

Example:

```ts
import { setProviderList } from "jsr:@extractus/oembed-extractor";

const count = setProviderList([
  {
    provider_name: "Alpha",
    provider_url: "https://alpha.com",
    endpoints: [
      {
        schemes: ["https://store.alpha.com/*"],
        url: "https://api.alpha.com/oembed",
      },
    ],
  },
]);
```

Default list of resource providers is synchronized from [oembed.com](http://oembed.com/providers.json).

If you want to modify the providers list, please make a pull request on [iamcal/oembed](https://github.com/iamcal/oembed) then create an issue/pr here to ask for sync.

---

## Development

```bash
git clone https://github.com/extractus/oembed-extractor.git
cd oembed-extractor

# run tests
deno test --allow-all

# lint
deno lint

# build npm package
deno run -A ./scripts/build_npm.ts

# sync providers from oembed.com
deno task sync
```

## License

The MIT License (MIT)

## Support the project

This project is maintained in my spare time. If you find it helpful, there are a few simple ways to support its continued development:

* ⭐ Star this repository to help more people discover it.
* ☕ Buy me a coffee: https://paypal.me/ndaidong
* 🚀 Subscribe to the [oEmbed Parser service](https://rapidapi.com/pwshub-pwshub-default/api/oembed-parser/) on RapidAPI.

Every bit of support helps keep this project actively maintained. Thank you! ❤️

---
