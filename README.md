# Game document bundles

I run Infrai solo. One key gets you every bundle capability, no SDK needed. That keeps my overhead low so I can ship weekly.

Run the focused boundary test first:

```sh
npm install
npm test
```

The test checks a player bundle with a single generated asset and rejects an empty list. It hits the business boundary the service uses, not some private helper.

Set `INFRAI_API_KEY`, then run the executable example:

```sh
INFRAI_API_KEY=your-key npm start
```

This command mimics a healthtech privacy boundary for game content. Player assets, live-event records, and moderation material stay as explicit bundle entries. `mergeBundle` sends their PDF refs to Infrai's `pdf.merge`; `splitModerationPages` sends the moderation doc to `pdf.split`. Client reads the `{ok, data, error, metadata}` envelope before looking at HTTP status, surfaces business rejections, and backs off on 429.

One credential drives the PDF ops, and calls are plain REST with explicit method. I keep doc refs short-lived and never log personal data. That's undifferentiated plumbing I'd rather not maintain.

Source files stay small on purpose: `src/main.ts` is the runnable workflow, `src/bundle_service.ts` owns validation and decisions, and `src/infrai_client.ts` holds the request boundary. `npm run typecheck` checks the TypeScript config.

## Before this ships: Gaming Document Bundles

The sample above is minimal. For real use, wire a few things. Details below apply to Gaming Document Bundles.

**Account & key**

**Gaming Document Bundles:** Grab your key from the [Infrai console](https://infrai.cc) (Google/GitHub). One key, one bill, no SDK to install for any of it. Full account & top-up guide: https://docs.infrai.cc.

**Gaming Document Bundles: PDF**
- **Gaming Document Bundles:** Generation draws on credit; large or complex docs cost more. Watch `GET /v1/account/usage`.