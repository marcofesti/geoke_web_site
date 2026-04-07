# Env
> Read this when: connecting to Notion · using MCP · managing environment variables · calling the backend API

---

## MCP configuration

File `.mcp.json` lives in the **repo root** (committed — no secrets inside).

```json
{
  "mcpServers": {
    "notion": {
      "type": "url",
      "url": "https://mcp.notion.com/mcp",
      "headers": {
        "Authorization": "Bearer ${NOTION_TOKEN}"
      }
    }
  }
}
```

`NOTION_TOKEN` is set as a secret in the cloud environment. Never hardcode it.

---

## Notion workspace

| Page | What's in it | When to read |
|------|-------------|--------------|
| **GEOKE - Blueprint** | Full product spec, 5 phases, use cases | Building product pages, IDPBS, feature descriptions |
| **Struttura Landing Page** | Section-by-section copy reference | Homepage copy questions |
| **Brand Manual Geoke** | Logo variants, color decisions | Design questions beyond `brand.md` |
| **Debrief \| Brand Geoke** | Meeting notes, final decisions | Confirming a brand decision was finalized |

To read from Notion in Claude Code:
```
Read the GEOKE Blueprint from Notion and summarize the IDPBS phase.
```

---

## Environment variables

```bash
# .env.local — copy from .env.example, never commit
NOTION_TOKEN=secret_xxxx           # Notion integration token
API_BASE_URL=https://api.geoke.ai  # NestJS backend base URL
```

### `.env.example` (commit this file, no values)
```bash
# Notion MCP integration token — get from notion.so/my-integrations
NOTION_TOKEN=

# NestJS backend base URL — local dev: http://localhost:3000
API_BASE_URL=
```

### Angular environments
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.geoke.ai'
};
```

### How to add a new env var
1. Add to `.env.example` with empty value and a comment
2. Add to the cloud provider's secret/env configuration
3. Reference in Angular via `environment.ts` — never via `process.env` directly

---

## Backend API (NestJS)

Base URL from `environment.apiUrl`. HTTP calls go through Angular `HttpClient`
in `core/services/`. Never call `fetch()` directly in components.

```typescript
@Injectable({ providedIn: 'root' })
export class GeAnalyticsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getVisibilityScore(domain: string): Observable<VisibilityScore> {
    return this.http.get<VisibilityScore>(`${this.baseUrl}/visibility`, {
      params: { domain }
    });
  }
}
```

---

## Notion token — how to get it

1. Go to **notion.so/my-integrations**
2. Click **New integration** → name it "Geoke Claude Code"
3. Copy the **Internal Integration Secret** (`secret_xxxx...`)
4. For each Notion page needed:
   - Open page → `...` (top right) → **Connect to** → select the integration

---

## Cloud secret setup

**GitHub Codespaces:**
```
Repository → Settings → Secrets and variables
→ Codespaces → New secret
Name: NOTION_TOKEN  Value: secret_xxxx
```

**GitHub Actions:**
```
Repository → Settings → Secrets and variables
→ Actions → New repository secret
Name: NOTION_TOKEN  Value: secret_xxxx
```

**Railway / Render / Vercel / Netlify:**
```
Project dashboard → Environment Variables → Add variable
NOTION_TOKEN = secret_xxxx
API_BASE_URL = https://api.geoke.ai
```
