// auto_discovery_test.ts

import { assertEquals, assertRejects } from "https://deno.land/std/testing/asserts.ts";
import { mockFetch, resetFetch } from "jsr:@c4spar/mock-fetch";
import { isObject, hasProperty } from "jsr:@ndaidong/bellajs";

import autoDiscovery from "../utils/auto_discovery.ts";

const parseUrl = (url: string): any => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname,
  }
}

Deno.test("test if autoDiscovery() works correctly", async () => {
  const url = 'https://www.bitchute.com/video/8hXWnkvA8Ao/'
  const htmlFile = './tests/test_data/bitchute.html'
  const jsonFile = './tests/test_data/bitchute.json'

  const { baseUrl, path } = parseUrl(url)

  const fakeHtml = await Deno.readTextFile(htmlFile)
  const fakeJson = await Deno.readTextFile(jsonFile)

  mockFetch(`${baseUrl}${path}`, {
    body: fakeHtml,
    headers: {
      'Content-Type': 'text/html',
    }
  });

  const endpoint = 'https://www.bitchute.com/oembed/'
  const { baseUrl: endpointBaseUrl, path: endpointPath } = parseUrl(endpoint)

  const params = {
    maxwidth: '600',
    maxheight: '400',
  }

  const queries = new URLSearchParams({
    url: 'https://www.bitchute.com/video/8hXWnkvA8Ao/',
    format: 'json',
    ...params,
  })
  const target = `${endpointBaseUrl}${endpointPath}?${queries.toString()}`
  mockFetch(target, {
    body: fakeJson,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const result = await autoDiscovery(url, params)

  assertEquals(isObject(result), true)
  assertEquals(hasProperty(result, 'method'), true)
  assertEquals(hasProperty(result, 'title'), true)
  assertEquals(result.method, "auto-discovery")
  assertEquals(result.title, "2023 Praemium Imperiale White House Program")

  resetFetch();
});
