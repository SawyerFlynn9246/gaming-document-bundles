import assert from "node:assert/strict";
import { bundleSchema } from "./bundle_service.js";

const parsed = bundleSchema.parse({ playerId: "p1", assets: [{ id: "a", pdf: "pdf-a", kind: "player" }] });
assert.equal(parsed.assets[0].kind, "player");
assert.throws(() => bundleSchema.parse({ playerId: "p1", assets: [] }));
console.log("bundle boundary test passed");
