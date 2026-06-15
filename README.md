# Issy Ng

Personal portfolio site for Issy Ng.

Live URL after GitHub Pages is enabled:

```txt
https://issyngissy.github.io/issyng/
```

The Astro site lives in `apps/portfolio` and deploys through GitHub Actions.

## Development

```bash
bun install
bun --cwd apps/portfolio run dev
```

## Deployment

GitHub Pages should be set to **GitHub Actions** as the source in the repository settings. Pushing to `main` triggers `.github/workflows/deploy-pages.yml`.
