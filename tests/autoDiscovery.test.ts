// tests/autoDiscovery.test.ts

import { assertEquals, assertRejects } from "@std/assert";

import autoDiscovery from "../src/utils/autoDiscovery.ts";
import { loadFixture } from "./helpers.ts";

Deno.test("autoDiscovery - bitchute video", async () => {
  const url = "https://www.bitchute.com/video/8hXWnkvA8Ao/";
  const htmlFixture = loadFixture("tests/test-data/bitchute.html");
  const jsonFixture = loadFixture("tests/test-data/bitchute.json");

  const fetcher = (reqUrl: string) => {
    if (reqUrl.includes("video/8hXWnkvA8Ao")) {
      return Promise.resolve(
        new Response(htmlFixture, {
          status: 200,
          headers: { "content-type": "text/html" },
        }),
      );
    }
    return Promise.resolve(
      new Response(jsonFixture, {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
  };

  const result = await autoDiscovery(
    url,
    { maxwidth: "600", maxheight: "400" },
    fetcher,
  );
  assertEquals(typeof result, "object");
  assertEquals(result.method, "auto-discovery");
});

Deno.test("autoDiscovery - no oEmbed link found", async () => {
  const url = "https://example.com/page";
  const html =
    "<html><head><title>No oEmbed</title></head><body></body></html>";

  const fetcher = () =>
    Promise.resolve(
      new Response(html, {
        status: 200,
        headers: { "content-type": "text/html" },
      }),
    );

  await assertRejects(
    async () => await autoDiscovery(url, {}, fetcher),
    Error,
    "No oEmbed link found",
  );
});
