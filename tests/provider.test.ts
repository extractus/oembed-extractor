// tests/provider.test.ts

import { assertEquals } from "@std/assert";

import { find, get, has, set } from "../src/utils/provider.ts";

Deno.test("find - known provider (edumedia)", () => {
  const result = find("https://www.edumedia-sciences.com/en/media/558-heredity");
  assertEquals(result?.endpoint, "https://www.edumedia-sciences.com/oembed.json");
});

Deno.test("find - known provider (vimeo)", () => {
  const result = find("https://vimeo.com/999999");
  assertEquals(result?.endpoint, "https://vimeo.com/api/oembed.json");
});

Deno.test("find - known provider (youtube)", () => {
  const result = find("https://www.youtube.com/watch?v=9999999");
  assertEquals(result?.endpoint, "https://www.youtube.com/oembed");
});

Deno.test("find - invalid input (object)", () => {
  const result = find({} as unknown as string);
  assertEquals(result, null);
});

Deno.test("find - invalid input (random string)", () => {
  const result = find("abcdef");
  assertEquals(result, null);
});

Deno.test("find - unknown domain", () => {
  const result = find("https://somethingdoesnotexist.com");
  assertEquals(result, null);
});

Deno.test("find - does not match unrelated hosts (issue #198)", () => {
  const unrelated = [
    "https://mywordpress.com/2026/post",
    "https://netflix.com/title/status/123",
    "https://wwwXyoutubeYcom/watch?v=abc",
    "https://notyoutube.com/watch?v=abc",
    "https://example.org/share?url=https://www.youtube.com/watch?v=abc",
    "https://web.archive.org/web/20250101/https://vimeo.com/123456",
  ];
  for (const url of unrelated) {
    assertEquals(find(url), null, url);
  }
});

Deno.test("find - matches normalized URL forms", () => {
  assertEquals(
    find("HTTPS://WWW.YOUTUBE.COM/watch?v=abc")?.endpoint,
    "https://www.youtube.com/oembed",
  );
  assertEquals(
    find(" https://www.youtube.com/watch?v=abc ")?.endpoint,
    "https://www.youtube.com/oembed",
  );
});

Deno.test("set and get - custom provider list", () => {
  const providerList = [
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
    {
      provider_name: "Beta",
      provider_url: "https://beta.com",
      endpoints: [
        {
          schemes: ["https://store.beta.com/*"],
          url: "https://api.beta.com/oembed",
        },
      ],
    },
  ];
  assertEquals(set(providerList), providerList.length);
  const newList = get();
  assertEquals(newList.length, providerList.length);
  assertEquals(
    newList[0].schemes[0].toString(),
    (/^(?:https?:)?\/\/store\.alpha\.com\/.*$/i).toString(),
  );
});

Deno.test("has - schemes are literal except for * (issue #198)", () => {
  set([
    {
      provider_name: "Ex",
      provider_url: "https://example.net",
      endpoints: [
        {
          schemes: ["https://example.net/a+b/*", "https://example.net/(x)/*"],
          url: "https://example.net/oembed",
        },
      ],
    },
  ]);
  assertEquals(has("https://example.net/a+b/1"), true);
  assertEquals(has("https://example.net/aab/1"), false);
  assertEquals(has("https://example.net/(x)/1"), true);
  assertEquals(has("https://example.net/x/1"), false);
});
