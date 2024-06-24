// retrieve.ts

export const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64; rv:126.0) Gecko/20100101 Firefox/126.0";

export interface ProxyConfig {
  target?: string;
  headers?: Record<string, string>;
}

export interface FetchOptions {
  headers?: Record<string, string>;
  /**
   * the values to configure proxy
   * default: null
   */
  proxy?: ProxyConfig;
  /**
   * http proxy agent
   * default: null
   */
  agent?: object;
  /**
   * signal to terminate request
   * default: null
   */
  signal?: object;
}

const profetch = async (
  url: string,
  options: { proxy?: ProxyConfig } = {},
): Promise<Response> => {
  const { proxy = {} } = options;
  const { target, headers = {} } = proxy;

  const res = await fetch(target + encodeURIComponent(url), {
    headers,
  });

  return res;
};

export const getHtml = async (
  url: string,
  options: FetchOptions = {},
): Promise<string> => {
  const {
    headers = {
      "user-agent": USER_AGENT,
    },
    proxy = null,
  } = options;

  const res = proxy
    ? await profetch(url, { proxy })
    : await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`Request failed with error code ${res.status}`);
  }

  const text = await res.text();
  return text;
};

export const getJson = async (
  url: string,
  options: FetchOptions = {},
): Promise<any> => {
  const {
    headers = {
      "user-agent": USER_AGENT,
    },
    proxy = null,
  } = options;

  const res = proxy
    ? await profetch(url, { proxy })
    : await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`Request failed with error code ${res.status}`);
  }

  try {
    const text = await res.text();
    return JSON.parse(text.trim());
  } catch {
    throw new Error("Failed to convert data to JSON object");
  }
};
