// provider_test.ts

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import provider from "../utils/provider.ts";

Deno.test("test if provider.find() works correctly", async (t) => {
  const cases = [
    {
      url: "https://www.facebook.com/video.php?v=999999999",
      fetchEndpoint: "https://graph.facebook.com/v16.0/oembed_video",
    },
    {
      url: "https://www.facebook.com/someone/photos/somephoto",
      fetchEndpoint: "https://graph.facebook.com/v16.0/oembed_post",
    },
    {
      url: "https://www.facebook.com/someone/page",
      fetchEndpoint: "https://graph.facebook.com/v16.0/oembed_page",
    },
    {
      url: "http://instagram.com/someone/p/somepage",
      fetchEndpoint: "https://graph.facebook.com/v16.0/instagram_oembed",
    },
    {
      url: "https://www.edumedia-sciences.com/en/media/558-heredity",
      fetchEndpoint: "https://www.edumedia-sciences.com/oembed.json",
    },
    {
      url: "https://vimeo.com/999999",
      fetchEndpoint: "https://vimeo.com/api/oembed.json",
    },
    {
      url: "https://www.youtube.com/watch?v=9999999",
      fetchEndpoint: "https://www.youtube.com/oembed",
    },
  ];

  for (const ucase of cases) {
    const { url, fetchEndpoint } = ucase;
    await t.step(
      `provider.find("${url}") must return "${fetchEndpoint}"`,
      () => {
        const foundedProvider = provider.find(url);
        assertEquals(foundedProvider?.endpoint, fetchEndpoint);
      },
    );
  }

  await t.step('provider.find("abcdef") must return null', () => {
    assertEquals(provider.find("abcdef"), null);
  });

  await t.step(
    'provider.find("https://somethingdoesnotexist.com") must return null',
    () => {
      assertEquals(provider.find("https://somethingdoesnotexist.com"), null);
    },
  );

  await t.step("test if provider set/get works correctly", () => {
    const providerList = [
      {
        provider_name: "Alpha",
        provider_url: "https://alpha.com",
        endpoints: [
          {
            schemes: [
              "https://store.alpha.com/*",
            ],
            url: "https://api.alpha.com/oembed",
          },
        ],
      },
      {
        provider_name: "Beta",
        provider_url: "https://beta.com",
        endpoints: [
          {
            schemes: [
              "https://store.beta.com/*",
            ],
            url: "https://api.beta.com/oembed",
          },
        ],
      },
    ];
    assertEquals(provider.set(providerList), providerList.length);

    const newList = provider.get();
    assertEquals(newList.length, providerList.length);
    assertEquals(newList[0].schemes[0], /store.alpha.com\/(.*)/i);
  });
});
