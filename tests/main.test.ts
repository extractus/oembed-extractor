// tests/main.test.ts

import { assertEquals, assertRejects } from "@std/assert";

import {
  extract,
  findProvider,
  hasProvider,
  setProviderList,
} from "../src/main.ts";
import {
  hasPhotoKeys,
  hasRichKeys,
  loadFixture,
} from "./helpers.ts";

Deno.test("extract - bad url (empty string)", async () => {
  await assertRejects(
    async () => await extract(""),
    Error,
    "Invalid input URL",
  );
});

Deno.test("extract - bad url (object)", async () => {
  await assertRejects(
    async () => await extract({ k: 9 } as unknown as string),
    Error,
    "Invalid input URL",
  );
});

Deno.test("extract - bad url (array)", async () => {
  await assertRejects(
    async () => await extract([1, 3, 4] as unknown as string),
    Error,
    "Invalid input URL",
  );
});

Deno.test("extract - bad url (number)", async () => {
  await assertRejects(
    async () => await extract(301932 as unknown as string),
    Error,
    "Invalid input URL",
  );
});

Deno.test("extract - bad url (invalid protocol)", async () => {
  await assertRejects(
    async () => await extract("htt:/abc.com/failed-none-sense"),
    Error,
    "Invalid input URL",
  );
});

Deno.test("extract - YouTube provider", async () => {
  const url = "https://youtu.be/iQzwqZgr8Hc";
  const fixture = loadFixture("tests/test-data/youtube.json");

  const fetcher = () =>
    Promise.resolve(
      new Response(fixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

  const result = await extract(url, {}, fetcher);
  assertEquals(result.provider_name, "YouTube");
  assertEquals(result.type, "video");
  assertEquals(hasRichKeys(result), true);
});

Deno.test("extract - Twitter provider", async () => {
  const url = "https://twitter.com/ndaidong/status/1173592062878314497";
  const fixture = loadFixture("tests/test-data/twitter.json");

  const fetcher = () =>
    Promise.resolve(
      new Response(fixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

  const result = await extract(url, {}, fetcher);
  assertEquals(result.provider_name, "Twitter");
  assertEquals(result.type, "rich");
  assertEquals(hasRichKeys(result), true);
});

Deno.test("extract - Flickr provider", async () => {
  const url = "https://flic.kr/p/2iYctUr";
  const fixture = loadFixture("tests/test-data/flickr_2iYctUr.json");

  const fetcher = () =>
    Promise.resolve(
      new Response(fixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );

  const result = await extract(url, {}, fetcher);
  assertEquals(result.provider_name, "Flickr");
  assertEquals(result.type, "photo");
  assertEquals(hasPhotoKeys(result), true);
});

Deno.test("hasProvider - known provider", () => {
  assertEquals(
    hasProvider("https://www.youtube.com/watch?v=ciS8aCrX-9s"),
    true,
  );
});

Deno.test("hasProvider - unknown provider", () => {
  assertEquals(
    hasProvider("https://trello.com/b/BO3bg7yn/notes"),
    false,
  );
});

Deno.test("findProvider - known provider", () => {
  const result = findProvider("https://www.youtube.com/watch?v=ciS8aCrX-9s");
  assertEquals(result !== null, true);
  assertEquals(result!.endpoint, "https://www.youtube.com/oembed");
});

Deno.test("setProviderList - custom list", () => {
  const customProviderOnly = [
    {
      provider_name: "Example",
      provider_url: "http://www.example.org",
      endpoints: [
        {
          schemes: ["http://www.example.org/media/*"],
          url: "http://www.example.org/oembed",
        },
      ],
    },
  ];
  setProviderList(customProviderOnly);
  assertEquals(hasProvider("http://www.example.org/media/abcdef"), true);
  assertEquals(
    hasProvider("https://www.youtube.com/watch?v=ciS8aCrX-9s"),
    false,
  );

  // ponytail: restoring original providers requires re-importing the default list
  // or exposing a reset function. Acceptable for now since tests run in isolation.
});
