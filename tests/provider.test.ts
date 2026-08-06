// tests/provider.test.ts

import { assertEquals } from "@std/assert";

import { find, get, set } from "../src/utils/provider.ts";

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
    (/\/\/store.alpha.com\/(.*)/i).toString(),
  );
});
