const path = require('path');
const { runPublishFlow } = require('./lib/publish_shared');

function arg(name, fallback = undefined) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1];
  return process.env[`XHS_${name.toUpperCase().replace(/-/g, '_')}`] ?? fallback;
}

const USER_DATA_DIR = arg('user-data-dir', path.join(process.env.HOME, '.openclaw/browser/xhs-playwright-user-data'));
const ASSET_DIR = arg('asset-dir', '/tmp/openclaw/uploads/xhs_post_assets');
const TITLE = arg('title', '别再把 AI 当聊天机器人了｜很多人一开始就用错了');
const BODY = arg('body', `很多人用 AI，一开始方向就错了。

最常见的，不是不会用，
而是上来就盯着“哪个模型最强”“参数多不多”“跑分高不高”。

但模型 ≠ 结果。
如果你连自己要解决什么问题都没定义清楚，最后只会变成高级围观群众。

我现在对 AI 最大的感受是：

1. 别迷信一句提示词出奇迹
你给的信息越模糊，AI 越容易一本正经胡说。
真正拉开差距的，不是玄学 prompt，
而是你能不能把目标、背景、限制讲清楚。

2. AI 是工具，不是替身
现阶段它更像能力放大器，
不是能把脑子整包外包的打工人。
你没有判断力，它只会把混乱放大。

3. 真正有价值的是接进工作流
先研究工作流，不是先研究模型。
从高频重复动作切入，比如：
写总结、查资料、改文案、做翻译、整理会议纪要……

AI 最有价值的，不是惊艳你一次，
而是稳定帮你省时间。

真正拉开差距的，
不是最早听说 AI 的人，
而是最早把 AI 接进自己工作流里的人。

你现在用 AI，卡在哪一步？

#AI #人工智能 #AI工具 #效率提升 #工作流 #AI认知 #职场效率 #数字工具`);

async function main() {
  const result = await runPublishFlow({
    mode: 'review',
    userDataDir: USER_DATA_DIR,
    assetDir: ASSET_DIR,
    title: TITLE,
    body: BODY,
  });

  console.log('READY_FOR_REVIEW');
  console.log(`Images: ${result.imagesCount}`);
  console.log(`Title: ${result.title}`);
  console.log(`PAGE_URL=${result.pageUrl}`);
  console.log('Draft filled. Please review in browser and publish manually.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
