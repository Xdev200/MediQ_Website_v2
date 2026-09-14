# MediQ — Connected Health Coach

Marketing site for MediQ (home, privacy, terms).

## Run locally

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Host it

### Vercel (recommended)

1. Go to [vercel.com/new](https://vercel.com/new) and import this repo.
2. Set **Build Command** to `NITRO_PRESET=vercel npm run build`.
3. Deploy.

### Netlify

1. Import the repo at [app.netlify.com](https://app.netlify.com).
2. Build command: `NITRO_PRESET=netlify npm run build`

### Any Node host (Railway, Render, VPS)

```bash
npm install
npm run build
npm start
```

## Pages

- `/` — landing
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

Play Store: https://play.google.com/store/apps/details?id=com.mediq.health
