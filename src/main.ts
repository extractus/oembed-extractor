// main.ts

import { isValid as isValidURL } from "./utils/linker.ts";
import extractWithDiscovery from "./utils/autoDiscovery.ts";
import fetchEmbed from "./utils/fetchEmbed.ts";
import { getEndpoint } from "./utils/provider.ts";
import { find, has, set } from "./utils/provider.ts";

/** An oEmbed provider endpoint definition. */
export interface Endpoint {
  /** URL scheme patterns that match resources for this provider. */
  schemes?: string[];
  /** The oEmbed API endpoint URL. */
  url: string;
  /** Supported response formats, e.g. `"json"`, `"xml"`. */
  formats?: string[];
  /** Whether auto-discovery is supported for this endpoint. */
  discovery?: boolean;
}

/** A provider entry from the oEmbed registry. */
export interface Provider {
  /** Human-readable provider name. */
  provider_name: string;
  /** Provider's homepage URL. */
  provider_url: string;
  /** List of API endpoints for this provider. */
  endpoints: Endpoint[];
}

/** Optional parameters passed to `extract()`. */
export interface Params {
  /** Max width of embed size in pixels. */
  maxwidth?: number;
  /** Max height of embed size in pixels. */
  maxheight?: number;
  /** Theme for the embed, e.g. `"dark"` or `"light"`. */
  theme?: string;
  /** Language for the embed, e.g. `"en"`, `"fr"`, `"vi"`. */
  lang?: string;
}

/** Custom fetch function type. Receives a URL and returns a Response promise. */
export type Fetcher = (url: string) => Promise<Response>;

/** oEmbed response data. */
export interface OembedData {
  /** Resource type: `"rich"`, `"video"`, `"photo"`, or `"link"`. */
  type: "rich" | "video" | "photo" | "link";
  /** oEmbed version number. */
  version: string;
  /** A text title describing the resource. */
  title?: string;
  /** Name of the author/owner of the resource. */
  author_name?: string;
  /** URL for the author/owner of the resource. */
  author_url?: string;
  /** Name of the resource provider. */
  provider_name?: string;
  /** URL of the resource provider. */
  provider_url?: string;
  /** Suggested cache lifetime in seconds. */
  cache_age?: string | number;
  /** URL to a thumbnail image representing the resource. */
  thumbnail_url?: string;
  /** Width of the optional thumbnail in pixels. */
  thumbnail_width?: number;
  /** Height of the optional thumbnail in pixels. */
  thumbnail_height?: number;
  /** How the oEmbed data was retrieved: `"provider-api"` or `"auto-discovery"`. */
  method?: string;
  /** Additional provider-specific fields. */
  [key: string]: unknown;
}

/**
 * Extract oEmbed data from a given URL.
 *
 * @param url - URL of a valid oEmbed resource
 * @param params - Optional parameters (maxwidth, maxheight, theme, lang, etc.)
 * @param fetcher - Custom fetch function (url) => Promise<Response>. Defaults to globalThis.fetch.
 * @returns oEmbed data object
 * @throws If URL is invalid
 */
export const extract = async (
  url: string,
  params: Params = {},
  fetcher: Fetcher = globalThis.fetch,
): Promise<OembedData> => {
  if (!isValidURL(url)) {
    throw new Error("Invalid input URL");
  }
  const endpoint = getEndpoint(url);

  const result = endpoint
    ? await fetchEmbed(
      url,
      params as Record<string, unknown>,
      endpoint,
      fetcher,
    )
    : await extractWithDiscovery(
      url,
      params as Record<string, string>,
      fetcher,
    );

  return result as OembedData;
};

/**
 * Find the provider that matches a given URL.
 *
 * @param url - URL to look up
 * @returns Provider info or null if not found
 */
export const findProvider = find;

/**
 * Check if a URL is supported by any registered provider.
 *
 * @param url - URL to check
 * @returns True if a matching provider exists
 */
export const hasProvider = has;

/**
 * Replace the provider list with a custom set of providers.
 *
 * @param providers - List of providers in oEmbed registry format
 * @returns Number of providers in the new list
 */
export const setProviderList = set;
