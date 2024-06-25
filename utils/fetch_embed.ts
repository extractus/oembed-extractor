// fetch_embed.ts

import { getJson, FetchOptions } from './retrieve.ts';
import { getDomain } from './linker.ts';

const isFacebookGraphDependent = (url: string): boolean => {
  return getDomain(url) === 'graph.facebook.com';
}

const getFacebookGraphToken = (): string => {
  const env = Deno.env.toObject();
  const appId = env.FACEBOOK_APP_ID;
  const clientToken = env.FACEBOOK_CLIENT_TOKEN;
  return `${appId}|${clientToken}`;
}

interface Params {
  [key: string]: string | number | undefined;
}

export default async (
  url: string,
  params: Params = {},
  endpoint: string = '',
  options: FetchOptions = {}
): Promise<any> => {
  const query: Params = {
    url,
    format: 'json',
    ...params,
  };

  const maxwidth: number = Number(query.maxwidth || 0)
  const maxheight: number = Number(query.maxheight || 0)

  if (maxwidth <= 0) {
    delete query.maxwidth;
  }
  if (maxheight <= 0) {
    delete query.maxheight;
  }

  if (isFacebookGraphDependent(endpoint)) {
    query.access_token = getFacebookGraphToken();
  }

  const queryParams = new URLSearchParams(query as Record<string, string>).toString();
  const link = `${endpoint}?${queryParams}`;
  const body = await getJson(link, options);
  body.method = 'provider-api';
  return body;
}
