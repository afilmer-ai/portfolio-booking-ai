# Bookin-AI One-Click Publish

This project is pre-configured for static deployment.

## Option 1: Vercel (fastest)

1. Push this folder to a GitHub repo.
2. Go to Vercel and click **Add New... -> Project**.
3. Import your repo and click **Deploy**.
4. No build settings required (`vercel.json` handles config).

## Option 2: Netlify

1. Push this folder to a GitHub repo.
2. Go to Netlify and click **Add new site -> Import an existing project**.
3. Select the repo and click **Deploy site**.
4. No build step required (`netlify.toml` handles config).

## Option 3: GitHub Pages

1. Push to GitHub.
2. Repo **Settings -> Pages**.
3. Source: **Deploy from branch**.
4. Branch: `main` and folder `/ (root)`.
5. Save.

`.nojekyll` is included so Pages serves all files correctly.

## Domain checklist (bookin-ai.com)

- Point DNS to your host.
- Confirm SSL is enabled.
- Keep these files live at root:
  - `/robots.txt`
  - `/sitemap.xml`
  - `/site.webmanifest`

