# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## NihongoGakkushu — JLPT Mock Test App

### Artifact: `artifacts/jlpt-mocktest`
- React + Vite + Tailwind CSS, Indonesian UI
- All 5 JLPT levels (N1–N5) with mixed packets of questions
- Features: freemium model (1 free, ad-gate for rest), BroadcastToast, light/dark mode, AdSense placeholders

### Exam Data Encryption (AES-256-GCM)
- Plain exam JSONs in `artifacts/jlpt-mocktest/public/*.json` (local dev fallback)
- Encrypted versions in `artifacts/jlpt-mocktest/public/*.enc.json` (committed to git)
- Encryption key stored as `VITE_EXAM_KEY` Replit shared env var (64-char hex)
- To re-encrypt after data changes: `pnpm --filter @workspace/jlpt-mocktest run encrypt`
- Loader: `src/lib/examLoader.ts` — auto-uses encrypted files if `VITE_EXAM_KEY` is set, falls back to plain JSON

### Vercel Deployment
- **Push to GitHub** then connect repo on vercel.com
- **Root Directory**: leave as default (monorepo root)
- **Build Command**: auto-detected from `vercel.json` → `pnpm --filter @workspace/jlpt-mocktest run build:vercel`
- **Output Directory**: `artifacts/jlpt-mocktest/dist`
- **Environment Variables to set on Vercel**:
  - `VITE_EXAM_KEY` = same 64-char hex as Replit env var
- Vercel config: `vercel.json` at repo root (SPA rewrites, cache headers, pnpm build)
- Vercel-specific Vite config: `artifacts/jlpt-mocktest/vite.vercel.config.ts`
