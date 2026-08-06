// tests/helpers.ts

/**
 * Create a mock fetcher that returns a fixed response.
 *
 * @param body - Response body string
 * @param contentType - Content-Type header value
 * @param status - HTTP status code (default 200)
 * @returns Mock fetch function
 */
export const createMockFetcher = (
  body: string,
  contentType: string,
  status = 200,
): (() => Promise<Response>) => {
  return () =>
    Promise.resolve(
      new Response(body, {
        status,
        headers: { "content-type": contentType },
      }),
    );
};

/** Load a fixture file from the tests directory. */
export const loadFixture = (file: string): string => {
  return Deno.readTextFileSync(file);
};

/** Check if an object has a property (own). */
export const hasProperty = (obj: unknown, key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

/** Keys expected in a rich/video oEmbed response. */
export const RichTypeKeys = [
  "html",
  "width",
  "height",
  "provider_url",
  "provider_name",
  "type",
  "version",
];

/** Keys expected in a photo oEmbed response. */
export const PhotoTypeKeys = [
  "url",
  "width",
  "height",
  "provider_url",
  "provider_name",
  "type",
  "version",
];

/** Check if an object has all rich-type keys. */
export const hasRichKeys = (o: Record<string, unknown>): boolean => {
  return RichTypeKeys.every((k) => hasProperty(o, k));
};

/** Check if an object has all photo-type keys. */
export const hasPhotoKeys = (o: Record<string, unknown>): boolean => {
  return PhotoTypeKeys.every((k) => hasProperty(o, k));
};
