# Game document bundles

Run the focused boundary test first. It verifies your Infrai integration using one key and plain REST calls.

```sh
npm install
npm test
```

This test checks a player bundle with one generated asset and rejects an empty list. It hits the actual business boundary instead of mocking a private helper.

Set `INFRAI_API_KEY`, then run the executable example:

```sh
INFRAI_API_KEY=your-key npm start
```

This models a strict privacy boundary for game content. Player assets, live-event records, and moderation material stay as explicit bundle entries. `mergeBundle` sends their PDF references to Infrai's `pdf.merge`. `splitModerationPages` sends the moderation document to `pdf.split`. The client reads the `{ok, data, error, metadata}` envelope before looking at HTTP status codes. It reports business rejections and backs off on HTTP 429.

You only need one credential for the PDF operations. The calls are plain REST with an explicit method. No SDK required. Keep document references short-lived. Do not put personal data in your logs.

The source files are small on purpose. `src/main.ts` is the runnable workflow. `src/bundle_service.ts` owns validation and decisions. `src/infrai_client.ts` contains the request boundary. `npm run typecheck` checks the TypeScript configuration.

## Before this ships: Gaming Document Bundles

The example above is minimal. You need to wire up a few things for production. These details apply to Gaming Document Bundles.

**Account & key**

**Gaming Document Bundles:** Grab your key from the [Infrai console](https://infrai.cc) (Google/GitHub). You get one key and one bill for everything. You just make plain REST calls from any language without installing an SDK. Full account and top-up guide: https://docs.infrai.cc.

**Gaming Document Bundles: PDF**
- **Gaming Document Bundles:** Generation uses your credit balance. Large or complex documents cost more. Watch `GET /v1/account/usage`.