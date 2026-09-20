## Deploy Configuration (configured by /setup-deploy)

- Platform: GitHub Pages
- Production URL: https://refhealth.consulting
- Deploy workflow: auto-deploy on push to main (legacy GitHub Pages source)
- Deploy status command: HTTP health check
- Merge method: squash
- Project type: web app / static site
- Post-deploy health check: https://refhealth.consulting/

### Custom deploy hooks

- Pre-merge: none
- Deploy trigger: automatic on push to main
- Deploy status: poll production URL
- Health check: https://refhealth.consulting/
- Additional smoke checks: https://refhealth.consulting/intake.html and https://refhealth.consulting/sitemap.xml

## Infrastructure & Domain Configuration

- Registrar: Cloudflare Registrar (transferred from Namecheap on 2026-09-20, renews at wholesale at-cost)
- Nameservers: `barbara.ns.cloudflare.com`, `damien.ns.cloudflare.com` (Cloudflare Anycast DNS)
- Edge CDN: Cloudflare Proxy (Full strict SSL/TLS upstream to GitHub Pages)
- Inbound Email: Cloudflare Email Routing (active catch-all `*@refhealth.consulting` forwarded to `refhealth.consulting@gmail.com`)

