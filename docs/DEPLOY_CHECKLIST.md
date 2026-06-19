# Deployment Checklist — Far Horizon Logistics Consulting

## Pre-Deployment

- [ ] All translations are complete (zh.json, en.json — no missing keys)
- [ ] Content files are complete (services, cases, news — .md + .mdx)
- [ ] No hardcoded user-facing text in components
- [ ] All 50 static pages build successfully (`npm run build`)
- [ ] TypeScript lint passes (`npm run lint`)
- [ ] All images/assets are optimized and committed

## Environment Variables

Ensure these are set in the deployment platform (Vercel/Netlify):

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Production domain, e.g. `https://farhorizon-logistics.com` |
| `NEXT_PUBLIC_SITE_NAME` | Yes | `Far Horizon International Logistics Consulting` |
| `CONTACT_EMAIL` | Yes | Shown in footer and contact section |
| `CONTACT_PHONE` | Yes | Shown in footer and contact section |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID |
| `SENDGRID_API_KEY` | No | For contact form email forwarding |
| `SLACK_WEBHOOK_URL` | No | For contact form Slack notifications |

## Vercel Configuration

- [ ] Project imported from GitHub repository
- [ ] Framework preset: Next.js (auto-detected)
- [ ] Build command: `next build`
- [ ] Output directory: `.next`
- [ ] Install command: `npm install`
- [ ] Regions configured: `hkg1` (see vercel.json)
- [ ] Environment variables added (see above)
- [ ] Custom domain configured: `farhorizon-logistics.com`
- [ ] SSL/TLS: Automatic (Vercel Edge Network)

## Sitemap & SEO

- [ ] Visit `/sitemap.xml` — confirms all static + content pages
- [ ] Visit `/robots.txt` — confirms proper rules
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify `OrganizationSchema` JSON-LD on homepage
- [ ] Verify `BreadcrumbSchema` on subpages
- [ ] Verify `ArticleSchema` on detail pages
- [ ] Run Google Rich Results Test on homepage

## DNS & Domain

- [ ] Domain registrar: configure nameservers to Vercel (or add CNAME)
- [ ] Primary domain: `farhorizon-logistics.com`
- [ ] Redirect `www.farhorizon-logistics.com` → root domain
- [ ] SSL certificate active (Vercel auto-provisions)
- [ ] SPF/DKIM/DMARC records for `contact@` email domain

## Monitoring

- [ ] Vercel Analytics enabled (or GA4 installed)
- [ ] Visit `/api/health` — confirms `{ success: true, data: { status: "ok" } }`
- [ ] Vercel Error Monitoring enabled
- [ ] Uptime monitoring configured (e.g. Better Uptime, Pingdom)

## Post-Deployment

- [ ] Visit homepage (zh + en)
- [ ] Navigate through all sections: About, Services, Cases, News
- [ ] Test language switch (中文 ↔ EN)
- [ ] Test Chat Widget (bottom-right floating button)
- [ ] Test mobile responsive (Chrome DevTools device toolbar)
- [ ] Test `/api/contact` with sample payload:
  ```bash
  curl -X POST https://farhorizon-logistics.com/api/contact \
    -H "Content-Type: application/json" \
    -d '{"message":"Test inquiry","source":"checklist"}'
  ```
- [ ] Run Lighthouse audit (target: 90+ Performance, 90+ Accessibility, 100 SEO)
- [ ] Verify Open Graph preview (Twitter Card Validator, Facebook Sharing Debugger)
- [ ] Check `console` for 404s or runtime errors