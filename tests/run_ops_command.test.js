const test = require('node:test');
const assert = require('node:assert/strict');

const { buildPublishCommand } = require('../scripts/lib/run_ops');

test('buildPublishCommand defaults to the auto publish script', () => {
  const rawTitle = '大多数人学 AI 的方向一开始就错了｜再晚一点，红利就不是你的了';
  const result = buildPublishCommand(
    '/repo/scripts',
    '/tmp/xhs',
    {
      title: rawTitle,
      body: '正文',
    },
    {}
  );

  assert.equal(result.scriptPath, '/repo/scripts/xhs_independent_publish.js');
  assert.deepEqual(result.args, [
    '/repo/scripts/xhs_independent_publish.js',
    '--asset-dir', '/tmp/xhs/png',
    '--title', rawTitle,
    '--body', '正文',
  ]);
});

test('buildPublishCommand switches to review publish when configured', () => {
  const rawBody = 'a'.repeat(6);
  const result = buildPublishCommand(
    '/repo/scripts',
    '/tmp/xhs',
    {
      title: 'AI真正拉开差距的是工作流',
      body: rawBody,
    },
    { reviewBeforePublish: true }
  );

  assert.equal(result.scriptPath, '/repo/scripts/xhs_publish.js');
  assert.deepEqual(result.args, [
    '/repo/scripts/xhs_publish.js',
    '--asset-dir', '/tmp/xhs/png',
    '--title', 'AI真正拉开差距的是工作流',
    '--body', rawBody,
  ]);
});
