// utils/fetchEmbed.ts

import { getJson } from "./retrieve.ts";
import type { Fetcher } from "./retrieve.ts";

/**
 * Fetch oEmbed data from a known provider endpoint.
 *
 * @param url - Original resource URL
 * @param params - oEmbed parameters (maxwidth, maxheight, etc.)
 * @param endpoint - Provider oEmbed API endpoint
 * @param fetcher - Custom fetch function (url) => Promise<Response>
 * @returns oEmbed response data
 */
export default async (
  url: string,
  params: Record<string, unknown> = {},
  endpoint = "",
  fetcher: Fetcher,
): Promise<Record<string, unknown>> => {
  const query: Record<string, unknown> = {
    url,
    format: "json",
    ...params,
  };

  if ((query.maxwidth as number) <= 0) {
    delete query.maxwidth;
  }
  if ((query.maxheight as number) <= 0) {
    delete query.maxheight;
  }

  const queryParams = new URLSearchParams(
    query as Record<string, string>,
  ).toString();
  const link = endpoint + "?" + queryParams;
  const body = await getJson(link, fetcher);
  body.method = "provider-api";
  return body;
};
