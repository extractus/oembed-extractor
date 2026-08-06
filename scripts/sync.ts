import { getJson } from "../src/utils/retrieve.ts";
import { simplify } from "../src/utils/provider.ts";

/** URL of the oEmbed providers registry */
const source = "https://oembed.com/providers.json";
/** Path to the latest providers module */
const latest = "./src/utils/providers.latest.ts";
/** Path to the previous providers backup */
const prev = "./src/utils/providers.prev.ts";
/** Path to the raw original JSON dump */
const original = "./src/utils/providers.original.json";

/**
 * Write raw provider data to a JSON file.
 *
 * @param data - Provider data from the registry
 * @param file - Output file path
 */
const saveOriginal = async (
  data: Record<string, unknown>[],
  file: string,
): Promise<void> => {
  await Deno.writeTextFile(
    file,
    JSON.stringify(data, undefined, 2),
  );
};

/**
 * Synchronize the local provider list with the remote oEmbed registry.
 * Backs up the current list, downloads the latest, and writes both
 * raw JSON and the compact TypeScript module.
 */
const sync = async (): Promise<void> => {
  try {
    const result = await getJson(source, globalThis.fetch);
    await saveOriginal(
      result as unknown as Record<string, unknown>[],
      original,
    );

    const arr = simplify(result as unknown as Record<string, unknown>[]);
    const data = JSON.stringify(arr, undefined, 2);

    // backup previous version
    const latestContent = await Deno.readTextFile(latest);
    await Deno.writeTextFile(prev, latestContent);

    const syncTime = new Date().toISOString();

    await Deno.writeTextFile(
      latest,
      [
        `// provider data, synchronized at ${syncTime}`,
        "",
        "/** Simplified provider entry with scheme patterns and endpoint. */",
        "export interface SimplifiedProvider {",
        "  /** Scheme patterns (protocol-relative, regex-escaped) */",
        "  s: string[];",
        "  /** Endpoint URL (protocol-relative, format=json) */",
        "  e: string;",
        "}",
        "",
        `export const providers: SimplifiedProvider[] = ${data}`,
        "",
      ].join("\n"),
    );
    console.log("Providers list has been updated");
  } catch (err) {
    console.trace(err);
  }
};

sync();
