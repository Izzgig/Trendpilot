# AnimeForge

AI anime edit studio — upload a clip, pick an editing style, choose a duration.
The current version is a client-side prototype: video handling uses local
`URL.createObjectURL` previews and no AI rendering is wired up yet.

## Stack

- Next.js (App Router) + React, TypeScript
- Tailwind CSS (v3) via PostCSS
- No backend, no database, no external services or credentials

## Running it (sandbox / local)

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Web entry point: http://localhost:3000 (`npm run dev`, hot reload)
- `node_modules` is a named Docker volume; `npm install` runs at container start
  from the bind-mounted `package.json`, so dependency edits need a restart:
  `docker compose -f docker-compose.base44.yml restart web`

## Non-obvious notes

- The home page originally shipped in this repo as a single file literally named
  `Next.js` (no project scaffold). It now lives at `app/page.tsx`; the stray HTML
  fragments (`</html>`, a leftover `lcalculateProfit();`) were removed from it.
- Tailwind classes are scanned from `app/` only — see `tailwind.config.js`. New
  UI outside `app/` must be added to that content glob.
- `next.config.mjs` appends the preview origin to `allowedDevOrigins` **only**
  when `BASE44_PREVIEW_MODE === "1"` and `BASE44_PUBLIC_HOST_SUFFIX` is set, so
  the proxied preview can load dev assets and HMR. Unset → stock Next behaviour.
- File watching uses `WATCHPACK_POLLING=true` because the source is bind-mounted.

## Verifying

```bash
curl -fsS http://localhost:3000/ | grep -o 'ANIMEFORGE'      # page renders
docker compose -f docker-compose.base44.yml ps                # web = healthy
```

In the browser: choose a style preset, change the duration, press
“Prepare My Anime Edit” without a clip → validation message appears; upload any
video file → it previews in the 9:16 frame and the metadata panel updates.
