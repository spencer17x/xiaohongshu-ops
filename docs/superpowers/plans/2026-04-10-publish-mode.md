# Publish Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Default Xiaohongshu publishing to full automation while supporting profile-configured review mode and documenting the rules/profile/script boundary.

**Architecture:** Move shared browser publishing steps into a reusable helper, keep thin mode-specific entrypoints, and let `run_ops_once.js` choose the mode from `profile.reviewBeforePublish`. Align defaults and docs so the repository consistently documents "auto by default, review optional."

**Tech Stack:** Node.js, built-in `node:test`, Playwright

---

### Task 1: Lock Publish Mode Rules With Tests

**Files:**
- Create: `tests/publish_mode.test.js`
- Create: `scripts/lib/publish_mode.js`

- [ ] Step 1: Write failing tests for default auto mode, explicit review mode, and script selection helpers.
- [ ] Step 2: Run `node --test tests/publish_mode.test.js` and confirm the tests fail for missing helpers.
- [ ] Step 3: Implement the minimal helper module exporting publish-mode and publish-script resolution.
- [ ] Step 4: Run `node --test tests/publish_mode.test.js` and confirm the tests pass.

### Task 2: Refactor Publish Scripts To Use Shared Flow

**Files:**
- Create: `scripts/lib/publish_shared.js`
- Modify: `scripts/xhs_publish.js`
- Modify: `scripts/xhs_independent_publish.js`

- [ ] Step 1: Extract shared browser automation into `publish_shared.js`.
- [ ] Step 2: Update the two entry scripts to call the shared helper with `review` or `auto`.
- [ ] Step 3: Run syntax checks on the modified scripts.

### Task 3: Route Main Flow By Profile Config

**Files:**
- Modify: `scripts/run_ops_once.js`

- [ ] Step 1: Replace inline publish-script selection with helper-based resolution.
- [ ] Step 2: Keep missing `reviewBeforePublish` behavior defaulting to `auto`.
- [ ] Step 3: Re-run publish mode tests and script syntax checks.

### Task 4: Align Repository Defaults And Documentation

**Files:**
- Modify: `references/profile-schema.json`
- Modify: `references/questions.md`
- Modify: `README.md`
- Modify: `README.en.md`
- Modify: `SKILL.md`
- Modify: `references/publish-usage.md`

- [ ] Step 1: Update docs to state the default is full automation and review mode is optional.
- [ ] Step 2: Clarify the rules/profile/script ownership boundary in the docs.
- [ ] Step 3: Remove or fix obvious doc drift discovered during the review.
