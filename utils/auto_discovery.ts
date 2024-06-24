// autoDiscovery.ts

import { DOMParser } from "jsr:@b-fuze/deno-dom";

import {
  getHtml,
  getJson,
  FetchOptions
} from "./retrieve.ts";

interface Params {
  [key: string]: any;
}

export default async (
  url: string,
  params: Params = {},
  options: FetchOptions = {}
): Promise<any> => {
  const html = await getHtml(url, options);
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const elm = doc.querySelector('link[type="application/json+oembed"]');
  if (!elm) {
    throw new Error("No oEmbed link found in the HTML");
  }
  const href = elm.getAttribute('href');
  if (!href) {
    throw new Error("oEmbed link does not contain an href attribute");
  }
  const q = new URL(href);
  const { origin, pathname, searchParams } = q;

  Object.keys(params).forEach((key) => {
    if (!searchParams.has(key)) {
      searchParams.append(key, params[key]);
    }
  });

  const link = `${origin}${pathname}?${searchParams.toString()}`;
  const body = await getJson(link, options);
  body.method = 'auto-discovery';
  return body;
};
