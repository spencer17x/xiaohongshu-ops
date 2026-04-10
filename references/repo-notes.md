# Repo Notes

## Default publish behavior

- Default behavior: full automatic publish
- Optional behavior: review before publish when `reviewBeforePublish` is `true`

## Ownership boundary

Use `rules.md` for content policy:

- title/body limits
- tone and wording constraints
- forbidden expressions
- tag preferences
- image-style guidance

Use `profile.json` for stable operating configuration:

- `reviewBeforePublish`
- `publishPath`
- `imageMode`
- `defaultPages`
- positioning, goals, audience, auto-learning

Use scripts for executable behavior:

- browser automation
- upload waits and selectors
- publish-mode routing
- output directories
- image/card generation
- do not rewrite or truncate title/body content
