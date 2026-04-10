const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildPublishCommand } = require('./lib/run_ops');

function main() {
  const profilePath = path.join(process.cwd(), 'data/xiaohongshu/profile.json');
  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  const topic = process.argv[2] || 'AI 工作流';
  const angle = process.argv[3] || '大多数人学 AI 的方向一开始就错了';
  const outDir = process.argv[4] || '/tmp/openclaw/uploads/xhs_ops_run';

  fs.mkdirSync(outDir, { recursive: true });

  const opsScriptDir = __dirname;
  const studio = spawnSync('node', [
    path.join(opsScriptDir, 'build_xhs_post.js'),
    '--topic', topic,
    '--angle', angle,
    '--pages', String(profile.defaultPages || 2),
    '--out', outDir
  ], { stdio: 'inherit' });
  if (studio.status !== 0) process.exit(studio.status || 1);

  const post = JSON.parse(fs.readFileSync(path.join(outDir, 'post.json'), 'utf8'));
  const publishCommand = buildPublishCommand(opsScriptDir, outDir, post, profile);
  const publish = spawnSync('node', publishCommand.args, { stdio: 'inherit' });
  if (publish.status !== 0) process.exit(publish.status || 1);

  console.log('XHS_OPS_ONCE_DONE');
}

if (require.main === module) main();
