// utils/provider.ts

import { getDomain, isValid as isValidURL } from "./linker.ts";
import { providers as defaultProviderList } from "./providers.latest.ts";
import type { SimplifiedProvider } from "./providers.latest.ts";

/** Provider entry with endpoint URL and compiled regex schemes. */
export interface ProviderEntry {
  endpoint: string;
  schemes: RegExp[];
}

/** Result returned by find(). */
export interface FindResult {
  schemes: RegExp[];
  endpoint: string;
  url: string;
}

/**
 * Escape regex metacharacters so scheme text is matched literally.
 * The `*` wildcard is intentionally left untouched.
 *
 * @param text - Host or path portion of a scheme
 * @returns Text safe to embed in a RegExp
 */
const escapeRegex = (text: string): string => {
  return text.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Convert a scheme string into a RegExp for URL matching.
 *
 * The scheme is treated as an oEmbed glob (spec 2.1): `*` is the only
 * wildcard and every other character is literal. Provider data may ship
 * with backslash-escaped dots, so escapes are normalized away first.
 * The pattern is split into host and path so host wildcards cannot
 * cross into the path, then anchored so it must match the whole URL.
 *
 * @param scheme - Protocol-relative scheme pattern, e.g. `//*.x.com/*`
 * @returns Compiled regular expression
 */
const toRegExp = (scheme = ""): RegExp => {
  const raw = scheme.replace(/\\(.)/g, "$1");
  const body = raw.startsWith("//") ? raw.slice(2) : raw;
  const slash = body.indexOf("/");
  const host = slash === -1 ? body : body.slice(0, slash);
  const path = slash === -1 ? "" : body.slice(slash);
  const hostRe = escapeRegex(host).replace(/\*/g, "[^/]*");
  const pathRe = path === ""
    ? "(?:/.*)?"
    : escapeRegex(path).replace(/\*/g, ".*");
  return new RegExp(`^(?:https?:)?//${hostRe}${pathRe}$`, "i");
};

/**
 * Remove duplicate entries from an array.
 *
 * @param arr - Input array
 * @returns Array with unique values
 */
const uniquify = (arr: string[]): string[] => {
  return [...new Set(arr)];
};

/**
 * Strip protocol prefix (https:// or http://) from a URL.
 *
 * @param url - URL with protocol
 * @returns URL without protocol (protocol-relative)
 */
const removeProtocol = (url: string): string => {
  return url.replace("https://", "//").replace("http://", "//");
};

/**
 * Simplify raw provider data into a compact format for internal use.
 *
 * @param providers - Raw provider list from oEmbed registry
 * @returns Simplified provider entries with { s: patterns, e: endpoint }
 */
export const simplify = (
  providers: Record<string, unknown>[],
): SimplifiedProvider[] => {
  return providers
    .map((item) => {
      const endpoints = item.endpoints as Record<string, unknown>[];
      return endpoints.map((endpoint) => {
        const schemes = (endpoint.schemes as string[]) || [];
        const url = endpoint.url as string;
        const patterns = schemes.length > 0
          ? uniquify(schemes.map(removeProtocol))
          : [];

        return {
          s: patterns,
          e: removeProtocol(url).replace(/\{format\}/g, "json"),
        };
      });
    })
    .reduce((prev, curr) => {
      return prev.concat(curr);
    }, []);
};

/**
 * Build internal provider entries from simplified format with compiled regex patterns.
 *
 * @param providers - Simplified provider entries
 * @returns Provider entries with endpoint URL and RegExp schemes
 */
const providersFromList = (
  providers: SimplifiedProvider[],
): ProviderEntry[] => {
  return providers.map((provider) => {
    const { e: endpoint, s: schemes } = provider;
    return {
      endpoint: `https:${endpoint}`,
      schemes: schemes.map(toRegExp),
    };
  });
};

/** Internal mutable store holding the current provider list. */
const store: { providers: ProviderEntry[] } = {
  providers: providersFromList(defaultProviderList),
};

/**
 * Get a copy of the current provider list.
 *
 * @returns List of provider entries with endpoint and schemes
 */
export const get = (): ProviderEntry[] => {
  return [...store.providers];
};

/**
 * Replace the provider list with a custom set of providers.
 *
 * @param providers - Raw provider list in oEmbed registry format
 * @returns Length of the new provider list
 */
export const set = (providers: Record<string, unknown>[]): number => {
  store.providers = providersFromList(simplify(providers));
  return store.providers.length;
};

/**
 * Match a normalized URL against a provider's schemes; fall back to domain comparison when no schemes exist.
 *
 * @param url - Normalized URL (from `URL#href`) to match
 * @param endpoint - Provider endpoint URL
 * @param schemes - RegExp schemes to test against
 * @returns True if URL matches the provider
 */
const compare = (
  url = "",
  endpoint = "",
  schemes: RegExp[] = [],
): boolean => {
  if (!schemes.length) {
    const domain = getDomain(url);
    const endpointDomain = getDomain(endpoint);
    return domain === endpointDomain;
  }
  return schemes.some((scheme) => {
    return scheme.test(url);
  });
};

/**
 * Find a provider that matches the given URL.
 *
 * @param url - URL to look up
 * @returns Provider info with schemes, endpoint, and url, or null if not found
 */
export const find = (url = ""): FindResult | null => {
  if (!isValidURL(url)) {
    return null;
  }

  // Match against the normalized form so whitespace, letter case and
  // default ports cannot bypass the anchored scheme patterns.
  const normalized = new URL(url).href;
  const providers = get();

  for (let i = 0; i < providers.length; i++) {
    const { endpoint, schemes } = providers[i];
    const isMatched = compare(normalized, endpoint, schemes);
    if (isMatched) {
      return {
        schemes,
        endpoint,
        url,
      };
    }
  }

  return null;
};

/**
 * Check if any registered provider supports the given URL.
 *
 * @param url - URL to check
 * @returns True if a matching provider exists
 */
export const has = (url = ""): boolean => {
  return find(url) !== null;
};

/**
 * Get the oEmbed API endpoint for a given URL.
 *
 * @param url - URL to resolve
 * @returns Endpoint URL or null if no provider matches
 */
export const getEndpoint = (url: string): string | null => {
  const p = find(url);
  return p ? p.endpoint : null;
};
