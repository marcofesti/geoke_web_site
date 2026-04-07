# CLAUDE.md
 
Geoke website — Angular marketing site.
San Francisco, CA · hello@geoke.ai
Tagline: **Rank Where AI Looks.**
 
## Stack
| Layer    | Tech          |
|----------|---------------|
| Website  | Angular 17+   |
| Backend  | NestJS        |
| Mobile   | Flutter       |
| Styles   | CSS custom properties only — no frameworks |
| Font     | Plus Jakarta Sans + JetBrains Mono |
 
## Quick start
```bash
npm install
npm start        # → localhost:4200
npm run build
npm run lint
npm test
```
 
## Environment
```bash
# .env.local (never commit)
NOTION_TOKEN=secret_xxxx
API_BASE_URL=https://api.geoke.ai
```
 
---
 
## Read the right file for your task
 
| Task | Read |
|------|------|
| CSS · colors · logo · tokens · animations | `.claude/design.md` |
| Components · routing · folder structure · Angular rules | `.claude/architecture.md` |
| Page copy · headlines · pricing · homepage sections | `.claude/content.md` |
| Naming · TypeScript · commits · quality rules | `.claude/conventions.md` |
| Notion MCP · external APIs · environment vars | `.claude/integrations.md` |
 
> Read **only** the file relevant to your current task.
> Never read all files at once unless the task explicitly spans multiple domains.
 
---
 
## Hard rules — always apply, no exceptions
 
- No Tailwind · No Bootstrap · No CSS frameworks
- No `any` in TypeScript
- No hardcoded hex colors — use CSS variables from `tokens.css`
- No `console.log` in committed code
- No inline styles in Angular templates
- Never modify `src/assets/logo/Logo-geoke.svg`
- Never invent copy — use `.claude/content.md` or Notion
- Never commit `.env` files
