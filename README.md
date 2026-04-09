# Xiaohongshu Ops

中文 / English

一个用于小红书（RedNote / Xiaohongshu）自动化运营的 OpenClaw skill。  
An OpenClaw skill for end-to-end Xiaohongshu (RedNote) operations.

---

## 功能概览 / What it does

### 中文
- 配置可复用的小红书运营 profile
- 读取 `data/xiaohongshu/` 下的本地规则与风格笔记
- 从 topic / angle 一路编排到可发布资产
- 生成小红书风格标题、正文、分页结构
- 支持中英混合标题在 20 字内自然重写
- 按配置控制正文长度
- 支持图片模式：`stock` / `cards-lite` / `mixed`
- 优先真实相关图，轻卡片兜底
- 生成 `post.json`、`pages.json`、PNG 目录等发布资产
- 通过独立浏览器发布链自动发布到小红书
- 支持 daily reference-only 自动学习，不会黑箱改主 profile

### English
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

## 目录结构 / Directory layout

```text
xiaohongshu-ops/
├── README.md
├── SKILL.md
├── .gitignore
├── references/
└── scripts/
```

本地运行时配置推荐放在：  
Suggested local runtime data directory:

```text
data/xiaohongshu/
├── profile.json
├── rules.md
└── style-notes.md
```

---

## 目录说明 / File responsibilities

### `SKILL.md`
- 中文：skill 主说明，给 agent 用。
- English: main skill entrypoint and instructions for the agent.

### `references/`
- 中文：按需加载的参考文档，放规则、流程、图片来源、发布说明等。
- English: on-demand reference docs for workflow, rules, image sourcing, and publish details.

### `scripts/`
- 中文：低自由度执行脚本，适合稳定、可重复的步骤。
- English: low-freedom helper scripts for deterministic and repeatable execution.

### `data/xiaohongshu/`
- 中文：本地配置层，不一定要跟 skill 一起公开。
- English: local runtime configuration layer; does not have to be published with the skill.

---

## 关键脚本 / Key scripts

- `scripts/init_profile.js` — 初始化 / 更新 profile
- `scripts/run_ops_once.js` — 跑一轮完整小红书 ops 流程
- `scripts/build_xhs_post.js` — 组装图文资产
- `scripts/select_image_mode.js` — 选择图片策略
- `scripts/build_image_pipeline.js` — 构建图片生成/选图链路
- `scripts/fetch_stock_images.js` — 获取或规划图库图候选
- `scripts/generate_xhs_cards.js` — 生成卡片图
- `scripts/xhs_independent_publish.js` — 通过独立浏览器发布

---

## 行为边界 / Operating boundaries

### 中文
- 优先真实相关图，轻卡片兜底
- 不去水印，也不提供去水印指导
- 自动学习是参考模式，不会偷偷改主配置
- 运行产物是临时工作文件，不是长期内容库存

### English
- Prefer real relevant images first; use cards as fallback
- Do not remove watermarks or instruct watermark removal
- Treat auto learning as reference-only; do not silently rewrite the main profile
- Generated runtime outputs are temporary working files, not a long-term local content library

---

## GitHub / 单独仓库使用 / Standalone Git usage

如果你想把这个目录单独作为 Git 仓库管理：  
If you want to manage only this directory as its own Git repository:

```bash
cd skills/xiaohongshu-ops
git init
```

建议 / Recommended:
1. 保留本目录下的 `.gitignore`  
   Keep the local `.gitignore` in this folder.
2. 运行时账号配置留在仓库外，或者只公开脱敏样例  
   Keep runtime account config outside this repo, or publish only sanitized examples.
3. 在仓库首页说明本地 `data/xiaohongshu/` 结构  
   Document the expected local `data/xiaohongshu/` layout in the repo homepage.

---

## 注意事项 / Notes

- 不要提交临时上传/测试输出  
  Do not commit temporary upload/test outputs.
- 不要提交浏览器 profile 或登录态  
  Do not commit browser profiles or authenticated runtime state.
- 如果公开 profile 示例，先检查是否包含账号偏好或私有运营信息  
  If you publish profile examples, review them for account-specific or private operating preferences first.
