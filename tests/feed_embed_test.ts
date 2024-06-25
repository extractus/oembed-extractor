// feed_embed_test.ts

import { assertEquals, assertRejects } from "https://deno.land/std/testing/asserts.ts";
import { mockFetch, resetFetch } from "jsr:@c4spar/mock-fetch";
import { isObject, hasProperty } from "jsr:@ndaidong/bellajs";

import { getEndpoint } from '../utils/provider.ts'

import fetchEmbed from '../utils/fetch_embed.ts'

const parseUrl = (url: string): any => {
  const re = new URL(url)
  return {
    baseUrl: `${re.protocol}//${re.host}`,
    path: re.pathname,
  }
}

Deno.test("test if fetchEmbed() works correctly", async (t) => {
  const cases = [
    {
      input: {
        url: 'https://youtu.be/iQzwqZgr8Hc',
        file: './tests/test_data/youtube.json',
      },
      expected: {
        provider_name: 'YouTube',
        type: 'video',
      },
    },
    {
      input: {
        url: 'https://twitter.com/ndaidong/status/1173592062878314497',
        file: './tests/test_data/twitter.json',
      },
      expected: {
        provider_name: 'Twitter',
        type: 'rich',
      },
    },
    {
      input: {
        url: 'https://twitter.com/ndaidong/status/1173592062878314497?theme=dark',
        file: './tests/test_data/twitter-dark.json',
      },
      expected: {
        provider_name: 'Twitter',
        type: 'rich',
      },
    },
    {
      input: {
        url: 'https://www.facebook.com/facebook/videos/10153231379946729/',
        params: {
          access_token: '845078789498971|8ff3ab4ddd45b8f018b35c4fb7edac62',
        },
        file: './tests/test_data/facebook.json',
      },
      expected: {
        provider_name: 'Facebook',
        type: 'video',
      },
    },
    {
      input: {
        url: 'http://farm4.static.flickr.com/3123/2341623661_7c99f48bbf_m.jpg',
        file: './tests/test_data/flickr-default.json',
      },
      expected: {
        provider_name: 'Flickr',
        type: 'photo',
        maxwidth: 1024,
        maxheight: 683,
      },
    },
    {
      input: {
        url: 'http://farm4.static.flickr.com/3123/2341623661_7c99f48bbf_m.jpg',
        params: {
          maxwidth: 800,
          maxheight: 400,
        },
        file: './tests/test_data/flickr-sizelimit.json',
      },
      expected: {
        provider_name: 'Flickr',
        type: 'photo',
        maxwidth: 800,
        maxheight: 400,
      },
    },
  ];

  for (const ucase of cases) {
    const { input, expected } = ucase;
    const { url, file: mockFile } = input;
    const params: any = input.params || {}
    await t.step(`check fetchEmbed("${url}")`, async () => {
      const endpoint = getEndpoint(url) || ''
      const { baseUrl, path } = parseUrl(endpoint)

      const queries = new URLSearchParams({
        url,
        format: 'json',
        ...params,
      })

      const target = `${endpoint}?${queries.toString()}`;
      console.log(target)

      const fakeJson = await Deno.readTextFile(mockFile);
      mockFetch(target, {
        body: fakeJson,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const maxwidth: number = Number(params.maxwidth || 0)
      const maxheight: number = Number(params.maxheight || 0)

      const result = await fetchEmbed(url, { maxwidth, maxheight }, endpoint);
      assertEquals(isObject(result), true);
      assertEquals(result.provider_name, expected.provider_name)
      assertEquals(result.type, expected.type)

      resetFetch();
    });
  }
});
