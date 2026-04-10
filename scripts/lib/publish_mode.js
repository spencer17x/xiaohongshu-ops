const path = require('path');

function resolvePublishMode(profile) {
  return profile && profile.reviewBeforePublish === true ? 'review' : 'auto';
}

function resolvePublishScriptPath(scriptDir, profile) {
  const filename = resolvePublishMode(profile) === 'review'
    ? 'xhs_publish.js'
    : 'xhs_independent_publish.js';
  return path.join(scriptDir, filename);
}

module.exports = {
  resolvePublishMode,
  resolvePublishScriptPath,
};
