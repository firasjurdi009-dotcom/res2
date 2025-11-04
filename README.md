# Aivana — Next.js starter

This repo is a starter kit for a course-selling site. It includes a Next.js landing page, a modular Checkout modal, and example API endpoints for Stripe.

## Quickstart

1. Copy files into a new folder.
2. `npm install` or `pnpm install`.
3. Add `.env.local` with your Stripe keys (see example above).
4. `npm run dev`.

## Stripe

- Use test keys for local dev.
- Configure `STRIPE_WEBHOOK_SECRET` when setting up webhook forwarding (Stripe CLI or Vercel).

## Deploy

- Vercel: push the repo and set environment variables in the Project Settings.
- Ensure `NEXT_PUBLIC_URL` is set to your site URL.

## Assets

Replace `/public/logo.svg` and `/public/hero.svg` with production assets when ready.
