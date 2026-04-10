# Usage

## Files

- Auto publish script: `scripts/xhs_independent_publish.js`
- Review-mode script: `scripts/xhs_publish.js`
- Default image directory: `/tmp/openclaw/uploads/xhs_post_assets`
- Default auto-publish profile: `~/.openclaw/browser/xhs-independent-user-data`
- Default review profile: `~/.openclaw/browser/xhs-playwright-user-data`

## Example

```bash
node scripts/xhs_independent_publish.js \
  --asset-dir /tmp/openclaw/uploads/xhs_post_assets \
  --title "别再把 AI 当聊天机器人了｜很多人一开始就用错了" \
  --body "很多人用 AI，一开始方向就错了..."
```

Review mode:

```bash
node scripts/xhs_publish.js \
  --asset-dir /tmp/openclaw/uploads/xhs_post_assets \
  --title "别再把 AI 当聊天机器人了｜很多人一开始就用错了" \
  --body "很多人用 AI，一开始方向就错了..."
```

## Environment variable alternatives

- `XHS_ASSET_DIR`
- `XHS_TITLE`
- `XHS_BODY`
- `XHS_USER_DATA_DIR`

## Expected behavior

1. Opens Xiaohongshu creator publish page
2. Waits for login if needed
3. Uploads images
4. Fills title
5. Fills body
6. Auto script clicks publish; review script stops for manual confirmation

## Troubleshooting

### Browser/profile lock
Use a dedicated user-data-dir. Do not share OpenClaw browser profile with Playwright.

### Login required
Log in manually in the opened browser window, then rerun if the first pass timed out.

### Upload area not found
Xiaohongshu UI may have changed; update selectors in `scripts/lib/publish_shared.js`.
