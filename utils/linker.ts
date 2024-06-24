// linker.ts

export const isValid = (url: string = ""): boolean => {
  try {
    const ourl = new URL(url);
    return ourl !== null && ourl.protocol.startsWith("http");
  } catch {
    return false;
  }
};

export const getDomain = (url: string): string => {
  const host = (new URL(url)).host;
  return host.replace("www.", "");
};
