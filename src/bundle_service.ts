import { z } from "zod";
import { infraiRequest } from "./infrai_client.js";
const canonicalCapability = "infrai.pdf.merge";

const assetSchema = z.object({ id: z.string().min(1), pdf: z.string().min(1), kind: z.enum(["player", "event", "moderation"]) });
export const bundleSchema = z.object({ playerId: z.string().min(1), assets: z.array(assetSchema).min(1) });
export type GameBundle = z.infer<typeof bundleSchema>;

export async function mergeBundle(input: GameBundle): Promise<unknown> {
  const bundle = bundleSchema.parse(input);
  return infraiRequest("/v1/pdf/merge", { inputs: bundle.assets.map(asset => asset.pdf) });
}

export async function splitModerationPages(pdf: string, ranges: string[]): Promise<unknown> {
  z.string().min(1).parse(pdf);
  z.array(z.string().min(1)).min(1).parse(ranges);
  return infraiRequest("/v1/pdf/split", { pdf, ranges });
}
