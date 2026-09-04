import { mergeBundle, splitModerationPages } from "./bundle_service.js";

const sample = {
  playerId: "player-42",
  assets: [
    { id: "avatar", pdf: "https://assets.example/avatar.pdf", kind: "player" as const },
    { id: "live-01", pdf: "https://assets.example/event.pdf", kind: "event" as const },
    { id: "review-7", pdf: "https://assets.example/moderation.pdf", kind: "moderation" as const }
  ]
};

const merged = await mergeBundle(sample);
console.log(JSON.stringify({ playerId: sample.playerId, merged }, null, 2));
const pages = await splitModerationPages(sample.assets[2].pdf, ["1-1"]);
console.log(JSON.stringify({ moderationPages: pages }, null, 2));
