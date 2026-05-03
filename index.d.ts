// Type definitions for oembed-extractor
// Project: https://github.com/extractus/oembed-extractor
// Definitions by: BendingBender <https://github.com/BendingBender>
//                 CodeBast4rd <https://github.com/CodeBast4rd>
//                 Marc McIntosh <https://github.com/MarcMcIntosh>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * An oEmbed provider endpoint definition as used in the provider registry.
 */
export interface Endpoint {
  /** URL scheme patterns that match resources for this provider */
  schemes?: string[]
  /** The oEmbed API endpoint URL */
  url: string
  /** Supported response formats, e.g. "json", "xml" */
  formats?: string[]
  /** Whether auto-discovery is supported */
  discovery?: boolean
}

/**
 * A provider entry from the oEmbed registry.
 */
export interface Provider {
  /** Human-readable provider name */
  provider_name: string
  /** Provider's homepage URL */
  provider_url: string
  /** List of API endpoints for this provider */
  endpoints: Endpoint[]
}

/**
 * Result returned by findProvider().
 */
export interface FindProviderResult {
  /** Matched oEmbed API endpoint URL */
  endpoint: string
  /** Regex patterns used to match this URL */
  schemes: RegExp[]
  /** The original queried URL */
  url: string
}

/**
 * Basic fields present in every oEmbed response.
 * See https://oembed.com/
 */
export interface OembedData {
  /** Resource type: rich, video, photo, or link */
  type: 'rich' | 'video' | 'photo' | 'link'
  /** oEmbed version number */
  version: string
  /** A text title describing the resource */
  title?: string
  /** Name of the author/owner of the resource */
  author_name?: string
  /** URL for the author/owner of the resource */
  author_url?: string
  /** Name of the resource provider */
  provider_name?: string
  /** URL of the resource provider */
  provider_url?: string
  /** Suggested cache lifetime in seconds */
  cache_age?: string | number
  /** URL to a thumbnail image representing the resource */
  thumbnail_url?: string
  /** Width of the optional thumbnail in pixels */
  thumbnail_width?: number
  /** Height of the optional thumbnail in pixels */
  thumbnail_height?: number
  /** How the oEmbed data was retrieved: "provider-api" or "auto-discovery" */
  method?: string
}

/**
 * oEmbed response for type "link".
 */
export interface LinkTypeData extends OembedData {
  readonly type: 'link'
}

/**
 * oEmbed response for type "photo".
 */
export interface PhotoTypeData extends OembedData {
  readonly type: 'photo'
  /** Source URL of the image */
  url: string
  /** Width of the image in pixels */
  width: number
  /** Height of the image in pixels */
  height: number
}

/**
 * oEmbed response for type "video".
 */
export interface VideoTypeData extends OembedData {
  readonly type: 'video'
  /** HTML required to embed a video player */
  html: string
  /** Width required to display the HTML in pixels */
  width: number
  /** Height required to display the HTML in pixels */
  height: number
}

/**
 * oEmbed response for type "rich".
 */
export interface RichTypeData extends OembedData {
  readonly type: 'rich'
  /** HTML required to display the resource */
  html: string
  /** Width required to display the HTML in pixels */
  width: number
  /** Height required to display the HTML in pixels */
  height: number
}

/**
 * Optional parameters passed to extract().
 */
export interface Params {
  /** Max width of embed size */
  maxwidth?: number
  /** Max height of embed size */
  maxheight?: number
  /** Theme for the embed, e.g. "dark" or "light" */
  theme?: string
  /** Language for the embed, e.g. "en", "fr", "vi" */
  lang?: string
}

/**
 * Configuration for proxy-based requests.
 */
export interface ProxyConfig {
  /** Base URL of the proxy server */
  target?: string
  /** Headers to send to the proxy (e.g. Proxy-Authorization) */
  headers?: Record<string, string>
}

/**
 * Advanced fetch options for extract().
 */
export interface FetchOptions {
  /** Custom request headers */
  headers?: Record<string, string>
  /** Proxy configuration */
  proxy?: ProxyConfig
  /** HTTP proxy agent (e.g. HttpsProxyAgent) */
  agent?: object
  /** AbortSignal to cancel the request */
  signal?: AbortSignal
}

/**
 * Extract oEmbed data from a given URL.
 *
 * @param url - URL of a valid oEmbed resource
 * @param params - Optional parameters (maxwidth, maxheight, etc.)
 * @param fetchOptions - Advanced fetch options (headers, proxy, agent, signal)
 * @returns Promise resolving to oEmbed data
 */
export function extract(url: string, params?: Params, fetchOptions?: FetchOptions): Promise<OembedData>

/**
 * Check if a URL is supported by any registered provider.
 *
 * @param url - URL to check
 * @returns True if a matching provider exists
 */
export function hasProvider(url: string): boolean

/**
 * Find the provider that matches a given URL.
 *
 * @param url - URL to look up
 * @returns Provider info or undefined if not found
 */
export function findProvider(url: string): FindProviderResult | null

/**
 * Replace the provider list with a custom set of providers.
 *
 * @param providers - List of providers in oEmbed registry format
 * @returns Number of providers in the new list
 */
export function setProviderList(providers: Provider[]): number
