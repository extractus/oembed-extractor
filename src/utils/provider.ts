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
 * Convert a scheme string into a RegExp for URL matching.
 *
 * @param scheme - Scheme pattern with wildcards
 * @returns Compiled regular expression
 */
const toRegExp = (scheme = ""): RegExp => {
  return new RegExp(
    scheme
      .replace(/\\./g, ".")
      .replace(/\*/g, "(.*)")
      .replace(/\?/g, "\\?")
      .replace(/,$/g, ""),
    "i",
  );
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
 * Escape dots in a scheme string for regex use.
 *
 * @param scheme - Scheme string
 * @returns Scheme with escaped dots
 */
const undotted = (scheme = ""): string => {
  return scheme.replace(/\./g, "\\.");
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
          ? uniquify(schemes.map(removeProtocol).map(undotted))
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
 * Match a URL against a provider's schemes; fall back to domain comparison when no schemes exist.
 *
 * @param url - URL to match
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
    return url.match(scheme);
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

  const providers = get();

  for (let i = 0; i < providers.length; i++) {
    const { endpoint, schemes } = providers[i];
    const isMatched = compare(url, endpoint, schemes);
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
