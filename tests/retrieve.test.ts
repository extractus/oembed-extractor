// tests/retrieve.test.ts

import { assertEquals, assertRejects } from "@std/assert";

import { getHtml, getJson } from "../src/utils/retrieve.ts";
import { createMockFetcher } from "./helpers.ts";

Deno.test("getJson - custom fetcher", async () => {
  const fetcher = createMockFetcher(
    JSON.stringify({ data: { name: "oembed-parser" } }),
    "application/json",
  );
  const result = await getJson("https://some.where/good/source", fetcher);
  const data = result.data as Record<string, unknown>;
  assertEquals(data.name, "oembed-parser");
});

Deno.test("getJson - proxy fetcher", async () => {
  const fetcher = async (url: string) => {
    const { hostname } = new URL(url);
    assertEquals(hostname, "proxy-server.com");
    return new Response(
      JSON.stringify({ data: { name: "oembed-parser" } }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      },
    );
  };
  const proxyFetcher = async (url: string) => {
    const proxyTarget = "https://proxy-server.com/api/proxy?url=";
    return fetcher(proxyTarget + encodeURIComponent(url));
  };
  const result = await getJson(
    "https://some.where/good/source",
    proxyFetcher,
  );
  const data = result.data as Record<string, unknown>;
  assertEquals(data.name, "oembed-parser");
});

Deno.test("getJson - invalid json response", async () => {
  const fetcher = createMockFetcher(
    "this is not json string",
    "application/json",
  );
  await assertRejects(
    async () => await getJson("https://some.where/bad/source", fetcher),
    Error,
    "Failed to convert data to JSON object",
  );
});

Deno.test("getJson - bad status code", async () => {
  const fetcher = createMockFetcher("Error 500", "text/plain", 500);
  await assertRejects(
    async () => await getJson("https://some.where/bad/source", fetcher),
    Error,
    "Request failed with error code 500",
  );
});

Deno.test("getHtml - success", async () => {
  const fetcher = createMockFetcher("<html><body>OK</body></html>", "text/html");
  const result = await getHtml("https://some.where/page", fetcher);
  assertEquals(result, "<html><body>OK</body></html>");
});

Deno.test("getHtml - bad status code", async () => {
  const fetcher = createMockFetcher("Not Found", "text/plain", 404);
  await assertRejects(
    async () => await getHtml("https://some.where/missing", fetcher),
    Error,
    "Request failed with error code 404",
  );
});
