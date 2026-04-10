const path = require('path');
const { runPublishFlow, DEFAULT_PUBLISH_SELECTOR } = require('./lib/publish_shared');

function arg(name, fallback = undefined) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return fallback;
}

(async () => {
  const userDataDir = path.join(process.env.HOME, '.openclaw/browser/xhs-independent-user-data');
  const assetDir = arg('asset-dir', '/tmp/openclaw/uploads/xhs_test_run/png');
  const title = arg('title', 'AI真正拉开差距的是工作流');
  const body = arg('body', '');
  const result = await runPublishFlow({
    mode: 'auto',
    userDataDir,
    assetDir,
    title,
    body,
    staleProfilePattern: 'xhs-independent-user-data',
    publishSelector: DEFAULT_PUBLISH_SELECTOR,
  });

  const pageUrl = result.pageUrl;
  const pageText = result.pageText;
  console.log(`TITLE_USED=${title}`);
  console.log('INDEPENDENT_PUBLISH_CLICKED');
  console.log(`PAGE_URL=${pageUrl}`);
  if (pageText.includes('标题最多输入20字')) console.log('PUBLISH_HINT=TITLE_TOO_LONG');
  if (pageText.includes('发布成功') || pageText.includes('笔记管理')) console.log('PUBLISH_STATUS=LIKELY_SUCCESS');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
