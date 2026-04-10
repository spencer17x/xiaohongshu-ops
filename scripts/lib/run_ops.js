const path = require('path');
const { resolvePublishScriptPath } = require('./publish_mode');

function buildPublishCommand(scriptDir, outDir, post, profile) {
  const scriptPath = resolvePublishScriptPath(scriptDir, profile);
  return {
    scriptPath,
    args: [
      scriptPath,
      '--asset-dir', path.join(outDir, 'png'),
      '--title', post.title,
      '--body', post.body,
    ],
  };
}

module.exports = {
  buildPublishCommand,
};
