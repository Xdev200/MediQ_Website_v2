# MediQ — Connected Health Coach

Marketing site for MediQ (home, privacy, terms).

## Quick start

Needs **Node.js 22+**.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy (host it)

### Vercel (easiest)

1. Import this repo at https://vercel.com/new
2. Framework: Other
3. Build command: `NITRO_PRESET=vercel npm run build`
4. Deploy

CLI:

```bash
npx vercel
```

### Netlify

Build command: `NITRO_PRESET=netlify npm run build`

### Any Node host (Railway, Render, VPS)

```bash
npm install
npm run build
npm start
```

Listens on `PORT`.

## Pages

- `/` — landing
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

Play Store: https://play.google.com/store/apps/details?id=com.mediq.health
