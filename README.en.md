# Xiaohongshu Ops

> 中文说明：见 [README.md](./README.md)

An OpenClaw skill for end-to-end Xiaohongshu (RedNote) operations.

---

## What it does

- Configure a reusable Xiaohongshu operating profile
- Read local operating rules and style notes from `data/xiaohongshu/`
- Orchestrate the workflow from topic/angle to publish-ready assets
- Generate Xiaohongshu-style titles, body copy, and page structure
- Support mixed Chinese/English title rewriting within 20 characters
- Keep body length within the configured limit
- Support image modes: `stock`, `cards-lite`, `mixed`
- Prefer real relevant imagery first and use lightweight cards as fallback
- Assemble post assets such as `post.json`, `pages.json`, and PNG output directories
- Publish through the dedicated independent browser flow
- Support daily reference-only auto learning without silently mutating the main profile

---

## Directory layout

```text
xiaohongshu-ops/
├── README.md
├── README.en.md
├── SKILL.md
├── .gitignore
├── references/
└── scripts/
```

Suggested local runtime data directory:

```text
data/xiaohongshu/
├── profile.json
├── rules.md
└── style-notes.md
```

---

## File responsibilities

### `SKILL.md`
Main skill entrypoint and instructions for the agent.

### `references/`
On-demand reference docs for workflow, rules, image sourcing, and publish details.

### `scripts/`
Low-freedom helper scripts for deterministic and repeatable execution.

### `data/xiaohongshu/`
Local runtime configuration layer; it does not have to be published with the skill.

---

## Key scripts

- `scripts/init_profile.js` — initialize/update profile
- `scripts/run_ops_once.js` — run one full Xiaohongshu ops cycle
- `scripts/build_xhs_post.js` — assemble post assets
- `scripts/select_image_mode.js` — choose image strategy
- `scripts/build_image_pipeline.js` — build the image generation/source pipeline
- `scripts/fetch_stock_images.js` — fetch or plan stock-image candidates
- `scripts/generate_xhs_cards.js` — generate cards
- `scripts/xhs_independent_publish.js` — publish via dedicated browser profile

---

## Operating boundaries

- Prefer real relevant images first; use cards as fallback
- Do not remove watermarks or instruct watermark removal
- Treat auto learning as reference-only; do not silently rewrite the main profile
- Generated runtime outputs are temporary working files, not a long-term local content library

---

## Standalone repository usage

If you want to manage only this directory as its own Git repository:

```bash
cd skills/xiaohongshu-ops
git init
```

Recommended:
1. Keep the local `.gitignore` in this folder
2. Keep runtime account config outside this repo, or publish only sanitized examples
3. Document the expected local `data/xiaohongshu/` layout in the repository homepage

---

## Notes

- Do not commit temporary upload/test outputs
- Do not commit browser profiles or authenticated runtime state
- If you publish profile examples, review them for account-specific or private operating preferences first
