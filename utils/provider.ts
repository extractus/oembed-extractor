// provider.ts

import { getDomain, isValid as isValidURL } from "./linker.ts";
import { providers as defaultProviderList } from "./providers.latest.ts";

export interface ProviderEndpoint {
  schemes?: string[];
  url: string;
  formats?: string[]; // "json" "xml"
  discovery?: boolean;
}

export interface Provider {
  "provider_name": string;
  "provider_url": string;
  endpoints: ProviderEndpoint[];
}

export interface FindProviderResult {
  "fetchEndpoint": string;
  "provider_name": string;
  "provider_url": string;
}

interface SimplifiedProvider {
  s: string[];
  e: string;
}

interface ProcessedProvider {
  endpoint: string;
  schemes: RegExp[];
}

const toRegExp = (scheme: string = ""): RegExp => {
  return new RegExp(
    scheme.replace(/\\./g, ".").replace(/\*/g, "(.*)").replace(/\?/g, "\\?")
      .replace(/,$/g, ""),
    "i",
  );
};

const uniquify = (arr: string[] = []): string[] => {
  return [...new Set(arr)];
};

const undotted = (scheme: string = ""): string => {
  return scheme.replace(/\./g, "\\.");
};

const removeProtocol = (url: string): string => {
  return url.replace("https://", "").replace("http://", "");
};

export const simplify = (providers: Provider[] = []): SimplifiedProvider[] => {
  return providers.map((item) => {
    const { endpoints } = item;
    return endpoints.map((endpoint) => {
      const { schemes = [], url } = endpoint;
      const patterns = schemes.length > 0
        ? uniquify(schemes.map(removeProtocol).map(undotted))
        : [];

      return {
        s: patterns,
        e: removeProtocol(url).replace(/\{format\}/g, "json"),
      };
    });
  }).reduce((prev, curr) => {
    return prev.concat(curr);
  }, []);
};

const providersFromList = (
  providers: SimplifiedProvider[] = [],
): ProcessedProvider[] => {
  return providers.map((provider) => {
    const { e: endpoint, s: schemes } = provider;
    return {
      endpoint: `https://${endpoint}`,
      schemes: schemes.map(toRegExp),
    };
  });
};

const store = {
  providers: providersFromList(defaultProviderList),
};

export const get = (): ProcessedProvider[] => {
  return [...store.providers];
};

export const set = (providers: Provider[] = []): number => {
  store.providers = providersFromList(simplify(providers));
  return store.providers.length;
};

const compare = (
  url: string = "",
  endpoint: string = "",
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

export const find = (
  url: string = "",
): { schemes: RegExp[]; endpoint: string; url: string } | null => {
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

export const has = (url: string = ""): boolean => {
  return find(url) !== null;
};

export const getEndpoint = (url: string): string | null => {
  const p = find(url);
  return p ? p.endpoint : null;
};

export default {
  find,
  has,
  get,
  set,
};
