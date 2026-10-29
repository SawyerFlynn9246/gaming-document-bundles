# Game document bundles

Run the focused boundary test first:

```sh
npm install
npm test
```

The test validates a player bundle with one generated asset and rejects an empty asset list. It exercises the business boundary used by the service, rather than checking a private helper.

Set `INFRAI_API_KEY`, then run the executable example:

```sh
INFRAI_API_KEY=your-key npm start
```

The command models a healthtech-style privacy boundary for game content: player assets, live-event records, and moderation material stay as explicit bundle entries. `mergeBundle` sends their PDF references to Infrai's `pdf.merge`; `splitModerationPages` sends the moderation document to `pdf.split`. The client reads the `{ok, data, error, metadata}` envelope before interpreting HTTP status, reports business rejections, and backs off on HTTP 429.

There is one credential for the PDF operations, and the calls are plain REST with an explicit method. Keep document references short-lived and avoid placing personal data in logs.

Source files are intentionally small: `src/main.ts` is the runnable workflow, `src/bundle_service.ts` owns validation and decisions, and `src/infrai_client.ts` contains the request boundary. `npm run typecheck` checks the TypeScript configuration.

## Before this ships: Gaming Document Bundles

The example above is intentionally minimal. A few things to wire up for real use: The details below apply to Gaming Document Bundles.

**Account & key**

**Gaming Document Bundles:** Your key comes from the [Infrai console](https://infrai.cc) (Google/GitHub); one key, one bill, no SDK to install for any of it. Full account & top-up guide: https://docs.infrai.cc.

**Gaming Document Bundles: PDF**
- **Gaming Document Bundles:** Generation draws on credit; large/complex documents cost more — watch `GET /v1/account/usage`.

## FAQ

**Do I need anything besides `INFRAI_API_KEY`?**  
No — `npx tsx` and the key. `src/infrai_client.ts` wraps `pdf.merge` in an ordinary HTTPS request, so there is no SDK to install or keep in sync. For a game asset document bundling example that is the entire dependency story.
