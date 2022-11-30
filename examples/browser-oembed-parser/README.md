# browser-oembed-parser

This demo shows how to use `oembed-extractor` at client side, with or without proxy.

To install:

```bash
npm i

# or pnpm, yarn
```

Start server:

```bash
npm start
```

Open `http://127.0.0.1:3101/` to test.

Basically `oembed-extractor` only works at server side.

However there are some noble providers those enable `Access-Control-Allow-Origin` on their service.
For example with oembed links from YouTube, TED or CodeSandbox, we can parse from browser.

Another ideal environment to run `oembed-extractor` directly is browser extensions.

With the remaining cases, we need a proxy layer to bypass CORS policy.

![oembed-extractor on browser](https://res.cloudinary.com/pwshub/image/upload/v1663745151/documentation/oembed-parser-on-browser.png)


---
