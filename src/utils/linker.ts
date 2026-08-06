// utils/linker.ts

/**
 * Check if a string is a valid HTTP or HTTPS URL.
 *
 * @param url - URL to validate
 * @returns True if URL is valid and uses http/https protocol
 */
export const isValid = (url = ""): boolean => {
  try {
    const ourl = new URL(url);
    return ourl !== null && ourl.protocol.startsWith("http");
  } catch {
    return false;
  }
};

/**
 * Extract the domain from a URL, stripping the www. prefix.
 *
 * @param url - Full URL
 * @returns Domain without www.
 */
export const getDomain = (url: string): string => {
  const host = (new URL(url)).host;
  return host.replace("www.", "");
};
