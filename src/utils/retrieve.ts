// utils/retrieve.ts

/** Custom fetch function type. */
export type Fetcher = (url: string) => Promise<Response>;

/**
 * Fetch a URL and return the response body as text.
 *
 * @param url - URL to fetch
 * @param fetcher - Custom fetch function (url) => Promise<Response>
 * @returns Response body as text
 * @throws If HTTP status is 400 or higher
 */
export const getHtml = async (
  url: string,
  fetcher: Fetcher,
): Promise<string> => {
  const res = await fetcher(url);

  const status = res.status;
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`);
  }

  const text = await res.text();
  return text;
};

/**
 * Fetch a URL and parse the response body as JSON.
 *
 * @param url - URL to fetch
 * @param fetcher - Custom fetch function (url) => Promise<Response>
 * @returns Parsed JSON response
 * @throws If HTTP status is 400+ or response is not valid JSON
 */
export const getJson = async (
  url: string,
  fetcher: Fetcher,
): Promise<Record<string, unknown>> => {
  const res = await fetcher(url);

  const status = res.status;
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`);
  }

  try {
    const text = await res.text();
    return JSON.parse(text.trim());
  } catch {
    throw new Error("Failed to convert data to JSON object");
  }
};
