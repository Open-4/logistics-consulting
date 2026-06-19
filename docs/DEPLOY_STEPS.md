# Deployment Steps — Far Horizon Logistics Consulting

## Prerequisites

- Node.js 20+
- Git
- GitHub account: `Open-4`
- Vercel account (free tier)

---

## Step 1: Initialize Git & Push to GitHub

Open a terminal (PowerShell / CMD) and run:

```bash
cd "C:\Users\贺义泉\Documents\Codex\2026-06-19\package-json-next-config-mjs-tailwind"

# Remove sandbox-restricted .git and reinit
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
git init
git add -A
git commit -m "Initial commit: Next.js 14 logistics consulting website with i18n"

# Create GitHub repo (requires GitHub CLI authenticated)
gh repo create logistics-consulting --public --source=. --remote=origin --push

# If gh is not authenticated, create the repo manually:
#   1. Go to https://github.com/new
#   2. Repository name: logistics-consulting
#   3. Public, no README, no .gitignore
#   4. Click "Create repository"
#   5. Then run:
#      git remote add origin https://github.com/Open-4/logistics-consulting.git
#      git push -u origin master
```

---

## Step 2: Deploy to Vercel

### Option A: Vercel CLI (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login (opens browser)
vercel login

# Deploy from project root
cd "C:\Users\贺义泉\Documents\Codex\2026-06-19\package-json-next-config-mjs-tailwind"
vercel --prod

# Follow prompts:
#   - Link to existing project? → No
#   - Project name: logistics-consulting
#   - Framework preset: Next.js (auto-detected)
#   - Root directory: ./
#   - Build command: next build
#   - Output directory: .next
#   - Override settings? → No
```

### Option B: Vercel Dashboard (manual)

1. Go to https://vercel.com/new
2. Import `Open-4/logistics-consulting` from GitHub
3. Framework preset: Next.js (auto-detected)
4. Environment Variables (add these):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://farhorizon-logistics.com` (or vercel.app URL) |
| `NEXT_PUBLIC_SITE_NAME` | `Far Horizon International Logistics Consulting` |
| `CONTACT_EMAIL` | `contact@farhorizon-logistics.com` |
| `CONTACT_PHONE` | `+86-21-5888-8888` |

5. Click **Deploy**

---

## Step 3: Post-Deployment Checks

### Verify build
```bash
# In the Vercel dashboard, check deployment log for:
# ✓ Compiled successfully
# ✓ Generating static pages (52/52)
```

### Verify routes
| Route | Expected |
|---|---|
| `/` | Homepage (zh) |
| `/en` | Homepage (en) |
| `/zh/services` | Services list |
| `/en/services/freight-forwarding` | Service detail |
| `/zh/cases` | Cases list |
| `/en/news/2026-trends` | News article |
| `/zh/about` | About page |
| `/robots.txt` | Robots rules |
| `/sitemap.xml` | XML sitemap |
| `/api/health` | `{ "success": true, "data": { "status": "ok" } }` |

### Set custom domain (optional)
1. Vercel Dashboard → Project → Settings → Domains
2. Add `farhorizon-logistics.com`
3. Configure DNS: add CNAME record pointing to `cname.vercel-dns.com`

### Set up monitoring
- **Vercel Analytics**: Dashboard → Analytics → Enable
- **Google Search Console**: Add property, verify via DNS TXT record
- **Submit sitemap**: `https://farhorizon-logistics.com/sitemap.xml`

---

## Step 4: GitHub Actions CI/CD (optional)

The `.github/workflows/deploy.yml` is already configured.
After pushing to GitHub, add these secrets:

| Secret | Value |
|---|---|
| `VERCEL_TOKEN` | Generate from Vercel: Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel: Project Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Vercel: Project Settings → General → Project ID |

Then every push to `main` will auto-build and deploy.