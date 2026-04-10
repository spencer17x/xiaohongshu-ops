const test = require('node:test');
const assert = require('node:assert/strict');

const {
  resolvePublishMode,
  resolvePublishScriptPath,
} = require('../scripts/lib/publish_mode');

test('defaults to auto publish when reviewBeforePublish is missing', () => {
  assert.equal(resolvePublishMode({}), 'auto');
  assert.equal(resolvePublishMode(undefined), 'auto');
});

test('uses review mode when reviewBeforePublish is true', () => {
  assert.equal(resolvePublishMode({ reviewBeforePublish: true }), 'review');
});

test('resolves the review publish script when review mode is enabled', () => {
  assert.equal(
    resolvePublishScriptPath('/repo/scripts', { reviewBeforePublish: true }),
    '/repo/scripts/xhs_publish.js'
  );
});

test('resolves the independent publish script for auto mode', () => {
  assert.equal(
    resolvePublishScriptPath('/repo/scripts', { reviewBeforePublish: false }),
    '/repo/scripts/xhs_independent_publish.js'
  );
});
