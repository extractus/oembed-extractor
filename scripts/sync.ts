#!/usr/bin/env deno run --allow-net --allow-write --allow-read

import { existsSync } from "https://deno.land/std/fs/exists.ts"

import { getJson } from "../utils/retrieve.ts";
import { simplify } from "../utils/provider.ts";

const source = "https://oembed.com/providers.json";
const latest = "./utils/providers.latest.ts";
const prev = "./utils/providers.prev.ts";
const original = "./utils/providers.original.json";

const saveOriginal = (data: any, file: string) => {

};

const sync = async () => {
  try {
    const result = await getJson(source);
    Deno.writeTextFileSync(original, JSON.stringify(result, undefined, 2), { create: true });

    const arr = simplify(result);
    const data = JSON.stringify(arr, undefined, 2);

    // backup previous version
    if (existsSync(latest)) {
      Deno.copyFileSync(latest, prev);
    }

    const syncTime = new Date().toISOString();

    Deno.writeTextFileSync(
      latest,
      [
        `// provider data, synchronized at ${syncTime}`,
        "",
        `export const providers = ${data};`,
        "",
      ].join("\n"),
      { create: true }
    );

    console.log("Providers list has been updated");
  } catch (err) {
    console.trace(err);
  }
};

sync();
