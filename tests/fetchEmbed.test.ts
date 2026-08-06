// tests/fetchEmbed.test.ts

import { assertEquals } from "@std/assert";

import fetchEmbed from "../src/utils/fetchEmbed.ts";
import { getEndpoint } from "../src/utils/provider.ts";
import { hasPhotoKeys, hasRichKeys, loadFixture } from "./helpers.ts";

Deno.test("fetchEmbed - YouTube (rich type)", async () => {
  const url = "https://youtu.be/iQzwqZgr8Hc";
  const endpoint = getEndpoint(url)!;
  const fixture = loadFixture("tests/test-data/youtube.json");

  const fetcher = (reqUrl: string) => {
    assertEquals(new URL(reqUrl).searchParams.get("url"), url);
    return Promise.resolve(
      new Response(fixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
  };

  const result = await fetchEmbed(url, {}, endpoint, fetcher);
  assertEquals(result.provider_name, "YouTube");
  assertEquals(result.type, "video");
  assertEquals(hasRichKeys(result), true);
});

Deno.test("fetchEmbed - Twitter (rich type)", async () => {
  const url = "https://twitter.com/ndaidong/status/1173592062878314497";
  const endpoint = getEndpoint(url)!;
  const fixture = loadFixture("tests/test-data/twitter.json");

  const fetcher = (reqUrl: string) => {
    assertEquals(new URL(reqUrl).searchParams.get("url"), url);
    return Promise.resolve(
      new Response(fixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
  };

  const result = await fetchEmbed(url, {}, endpoint, fetcher);
  assertEquals(result.provider_name, "Twitter");
  assertEquals(result.type, "rich");
  assertEquals(hasRichKeys(result), true);
});

Deno.test("fetchEmbed - Flickr (photo type, default size)", async () => {
  const url = "http://farm4.static.flickr.com/3123/2341623661_7c99f48bbf_m.jpg";
  const endpoint = getEndpoint(url)!;
  const fixture = loadFixture("tests/test-data/flickr-default.json");

  const fetcher = () =>
    Promise.resolve(
      new Response(fixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

  const result = await fetchEmbed(url, {}, endpoint, fetcher);
  assertEquals(result.provider_name, "Flickr");
  assertEquals(result.type, "photo");
  assertEquals(hasPhotoKeys(result), true);
});

Deno.test("fetchEmbed - Flickr (photo type, size limit)", async () => {
  const url = "http://farm4.static.flickr.com/3123/2341623661_7c99f48bbf_m.jpg";
  const endpoint = getEndpoint(url)!;
  const fixture = loadFixture("tests/test-data/flickr-sizelimit.json");

  const fetcher = (reqUrl: string) => {
    const u = new URL(reqUrl);
    assertEquals(u.searchParams.get("maxwidth"), "800");
    assertEquals(u.searchParams.get("maxheight"), "400");
    return Promise.resolve(
      new Response(fixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
  };

  const result = await fetchEmbed(
    url,
    { maxwidth: 800, maxheight: 400 },
    endpoint,
    fetcher,
  );
  assertEquals(result.provider_name, "Flickr");
  assertEquals(result.type, "photo");
  assertEquals(hasPhotoKeys(result), true);
  assertEquals((result.width as number) <= 800, true);
  assertEquals((result.height as number) <= 400, true);
});

Deno.test("fetchEmbed - maxwidth/maxheight <= 0 are omitted", async () => {
  const url = "https://youtu.be/iQzwqZgr8Hc";
  const endpoint = getEndpoint(url)!;
  const fixture = loadFixture("tests/test-data/youtube.json");

  const fetcher = (reqUrl: string) => {
    const u = new URL(reqUrl);
    assertEquals(u.searchParams.has("maxwidth"), false);
    assertEquals(u.searchParams.has("maxheight"), false);
    return Promise.resolve(
      new Response(fixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
  };

  await fetchEmbed(url, { maxwidth: 0, maxheight: -1 }, endpoint, fetcher);
});

Deno.test("fetchEmbed - method is set to provider-api", async () => {
  const url = "https://youtu.be/iQzwqZgr8Hc";
  const endpoint = getEndpoint(url)!;
  const fixture = loadFixture("tests/test-data/youtube.json");

  const fetcher = () =>
    Promise.resolve(
      new Response(fixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

  const result = await fetchEmbed(url, {}, endpoint, fetcher);
  assertEquals(result.method, "provider-api");
});
