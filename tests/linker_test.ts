// linter_test.ts

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { getDomain, isValid } from "../utils/linker.ts";

Deno.test("test if isValid() works correctly", async (t) => {
  await t.step("isValid: returns true for valid HTTP URL", () => {
    const url = "http://example.com";
    const result = isValid(url);
    assertEquals(result, true);
  });

  await t.step("isValid: returns true for valid HTTPS URL", () => {
    const url = "https://example.com";
    const result = isValid(url);
    assertEquals(result, true);
  });

  await t.step("isValid: returns false for invalid URL", () => {
    const url = "invalid-url";
    const result = isValid(url);
    assertEquals(result, false);
  });

  await t.step("isValid: returns false for non-HTTP/HTTPS URL", () => {
    const url = "ftp://example.com";
    const result = isValid(url);
    assertEquals(result, false);
  });
});

Deno.test("test if isValid() works correctly", async (t) => {
  await t.step("getDomain: returns domain without www", () => {
    const url = "http://www.example.com";
    const result = getDomain(url);
    assertEquals(result, "example.com");
  });

  await t.step("getDomain: returns domain with subdomain", () => {
    const url = "http://sub.example.com";
    const result = getDomain(url);
    assertEquals(result, "sub.example.com");
  });

  await t.step("getDomain: returns domain without www for HTTPS", () => {
    const url = "https://www.example.com";
    const result = getDomain(url);
    assertEquals(result, "example.com");
  });
});
