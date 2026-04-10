# Publish Mode And Rules Boundary Design

**Goal**

Make Xiaohongshu publishing default to full automation while still supporting a profile-level review mode, and clarify what belongs in content rules versus executable scripts.

**Design**

The publishing flow will be split into a shared publish helper plus two thin entrypoints:

- `auto` mode fills the draft and clicks publish
- `review` mode fills the draft and stops for manual confirmation

`scripts/run_ops_once.js` remains the orchestration entrypoint. It reads `data/xiaohongshu/profile.json`, builds the post assets, then routes to the correct publish mode based on `profile.reviewBeforePublish`. The default remains full automation, so missing or false config values route to `auto`.

Shared browser automation logic will move into a reusable module under `scripts/lib/`. That module owns browser launch, page readiness, upload, title/body fill, and publish-button handling. The thin entry scripts only parse args and choose the mode.

**Ownership Boundary**

`rules.md` owns content policy:

- title/body length limits
- tone and wording constraints
- forbidden expressions
- tag preferences
- image style preference such as "prefer real images"

`profile.json` owns stable operating configuration:

- `reviewBeforePublish`
- `publishPath`
- `imageMode`
- `defaultPages`
- positioning, audience, goals, auto-learning

Scripts own executable behavior:

- publish-mode routing
- browser automation and selectors
- upload waits and retries
- temporary output paths
- image/card generation only, without rewriting or truncating content

**Testing**

Add Node built-in tests for:

- publish mode resolution defaults to `auto`
- `reviewBeforePublish: true` resolves to `review`
- the orchestration layer chooses the expected publish script
