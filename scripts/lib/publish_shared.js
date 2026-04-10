const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const DEFAULT_PUBLISH_SELECTOR = '#web > div > div > div.publish-page-container > div.publish-page-publish-btn > button.d-button.d-button-default.d-button-with-content.--color-static.bold.--color-bg-fill.--color-text-paragraph.custom-button.bg-red';

function getImages(dir) {
  return fs.readdirSync(dir)
    .filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file))
    .sort()
    .map((file) => path.join(dir, file));
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function clickByText(page, text) {
  const locator = page.getByText(text, { exact: true }).first();
  await locator.waitFor({ state: 'visible', timeout: 15000 });
  await locator.click();
}

async function ensureImagePublishPage(page) {
  if (!page.url().includes('target=image')) {
    await page.goto('https://creator.xiaohongshu.com/publish/publish?from=tab_switch&target=image', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});
  }
}

async function waitForLoginIfNeeded(page) {
  const start = Date.now();
  while (Date.now() - start < 10 * 60 * 1000) {
    if (page.url().includes('creator.xiaohongshu.com/publish')) return;
    await wait(1500);
  }
  throw new Error('Timed out waiting for login / publish page');
}

async function ensureFileInput(page) {
  let fileInput = page.locator('input[type="file"]').first();
  try {
    await fileInput.waitFor({ state: 'attached', timeout: 15000 });
  } catch {
    await clickByText(page, '上传图片').catch(() => {});
    await wait(1000);
    fileInput = page.locator('input[type="file"]').first();
    await fileInput.waitFor({ state: 'attached', timeout: 15000 });
  }
  return fileInput;
}

async function runPublishFlow(options) {
  const {
    mode,
    userDataDir,
    assetDir,
    title,
    body,
    staleProfilePattern,
    publishSelector = DEFAULT_PUBLISH_SELECTOR,
  } = options;

  const images = getImages(assetDir);
  if (!images.length) throw new Error(`No images found in ${assetDir}`);

  if (staleProfilePattern) {
    spawnSync('pkill', ['-f', staleProfilePattern], { stdio: 'ignore' });
    await wait(1500);
  }

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    channel: 'chrome',
  });

  const page = context.pages()[0] || await context.newPage();
  await page.goto('https://creator.xiaohongshu.com/publish/publish?from=tab_switch&target=image', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});

  await waitForLoginIfNeeded(page);
  await ensureImagePublishPage(page);

  const fileInput = await ensureFileInput(page);
  await fileInput.setInputFiles(images);
  await wait(8000);

  const titleBox = page.locator('input[placeholder*="标题"], textarea[placeholder*="标题"]').first();
  await titleBox.waitFor({ state: 'visible', timeout: 30000 });
  await titleBox.fill(title);

  const editor = page.locator('[contenteditable="true"]').last();
  await editor.waitFor({ state: 'visible', timeout: 30000 });
  await editor.click();
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A').catch(() => {});
  await page.keyboard.type(body, { delay: 8 });

  if (mode === 'review') {
    return {
      mode,
      title,
      imagesCount: images.length,
      pageUrl: page.url(),
    };
  }

  await page.waitForSelector(publishSelector, { timeout: 20000 });
  await page.click(publishSelector);
  await page.waitForTimeout(3000);

  return {
    mode,
    title,
    imagesCount: images.length,
    pageUrl: page.url(),
    pageText: await page.locator('body').innerText().catch(() => ''),
  };
}

module.exports = {
  DEFAULT_PUBLISH_SELECTOR,
  runPublishFlow,
};
