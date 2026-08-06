// tests/linker.test.ts

import { assertEquals } from "@std/assert";

import { getDomain, isValid } from "../src/utils/linker.ts";

Deno.test("isValid - valid https URL", () => {
  assertEquals(isValid("https://www.23hq.com"), true);
});

Deno.test("isValid - valid http URL", () => {
  assertEquals(isValid("http://192.168.1.199:8081/example/page"), true);
});

Deno.test("isValid - URL with query params", () => {
  assertEquals(
    isValid(
      "https://docs.microsoft.com/en-us/azure/iot-edge/quickstart?view=iotedge-2018-06",
    ),
    true,
  );
});

Deno.test("isValid - secure subdomain", () => {
  assertEquals(isValid("https://secure.actblue.com"), true);
});

Deno.test("isValid - ftp protocol", () => {
  assertEquals(isValid("ftp://192.168.1.199:8081/example/page"), false);
});

Deno.test("isValid - empty string", () => {
  assertEquals(isValid(""), false);
});

Deno.test("isValid - null", () => {
  assertEquals(isValid(null as unknown as string), false);
});

Deno.test("isValid - object", () => {
  assertEquals(isValid({ a: "x" } as unknown as string), false);
});

Deno.test("getDomain - strips www.", () => {
  assertEquals(getDomain("https://www.example.com/path"), "example.com");
});

Deno.test("getDomain - no www.", () => {
  assertEquals(getDomain("https://api.example.com/path"), "api.example.com");
});
