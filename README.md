# Mindo — Landing page

Next.js 16 App Router · TypeScript · Tailwind CSS 4 · GSAP · Three.js / React Three Fiber.

## Development

Requires Node.js ≥ 20.9. Install the locked dependencies with `npm ci`.

```sh
npm run dev       # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
npm start         # run the production build
```

## Cloudflare deployment

The current site is deployed to **DOAN VIET** as Worker `mindo-landing`:
[mindo-landing.doanvanviet1510.workers.dev](https://mindo-landing.doanvanviet1510.workers.dev).

Deployment uses the pinned OpenNext adapter to preserve the existing Next.js runtime and contact API. The account ID and Worker name are explicit in `wrangler.jsonc`; no custom domain or DNS record is configured.

```sh
npm run cf:types    # regenerate ignored Cloudflare runtime/binding declarations
npm run cf:preview  # build and test on the Workers runtime
npm run cf:deploy   # build and deploy to the configured DOAN VIET account
```

Cloudflare builds set `CLOUDFLARE_BUILD=1` to serve original image assets without requiring a Cloudflare Images binding. Local `npm run dev` retains Next.js image optimization. There are no R2, KV, D1 or queue bindings; the site does not use ISR. Build output and local runtime state are ignored by Git.

The contact route (`/api/contact`) forwards both the Liên hệ form and the "Đại lý Peer" popup to the Mindo API (`POST /api/v1/public/website-leads`), where Marketing handles them in the admin. It needs `MINDO_API_URL` (a var in `wrangler.jsonc`) and the secret `WEBSITE_LEAD_SECRET` (`npx wrangler secret put WEBSITE_LEAD_SECRET`; locally in `.env.local`). Without them the route answers 503 instead of pretending to accept. Rate limiting is still in memory per isolate.

## Interface and motion

- Be Vietnam Pro, navy/lime palette, responsive typography and shared spacing.
- Fixed transparent header over the opening sections; frosted light surface after scrolling. The mobile menu uses a native modal dialog for focus containment and Escape support.
- The hero displays four product screens: home, AI, news and video calling. White, slim phone geometry, environment lighting, expanding signal waves, drag rotation and direct screen selection are rendered with Three.js. Screens remain unobscured by camera cutouts.
- Feature tiles link to the relevant sections. A sticky product showcase switches between AI and calling as the reader scrolls. Its 3D phone changes angle with the selected section. News has a separate market-focused block with keyboard-accessible topic tabs and clearly labeled illustrative summaries, not a live feed.
- Feature content highlights product strengths, with dark-green headline emphasis on light surfaces. Mindo Peer uses a single flat, landscape collectible visual without payment symbols, serial-switching or flip controls. Customer-facing copy uses “vật phẩm số”. Hover adds a small lift and a light sweep on pointer devices.
- Three.js is loaded dynamically only on eligible desktop devices. Narrow screens, coarse pointers and reduced-motion preferences use the original product images. Poster images also remain available during loading and after context loss or a caught scene error.
- Hero rendering stops outside the viewport and in a hidden tab. The story scene renders on demand. Pixel density follows the display up to 2×, and texture anisotropy is capped at the smaller of 8× or hardware support. Source screenshots are approximately 393×852; sharper high-density presentation requires higher-resolution source exports. The lightweight room environment is generated locally; no model or lighting files are fetched from external services.
- Changing device/media eligibility remounts scene readiness so a stale ready flag cannot hide a new scene's loading image.
- PageMotion reveals feature tiles, section copy, the Peer visual, steps and download buttons once as they enter view. It reacts to reduced-motion changes and keeps server-rendered content visible without JavaScript. Hero light trails are sparse, pause offscreen, and disappear under reduced motion.

### Main files

```text
src/app/
  globals.css                  shared palette, layout and accessibility
  header.css                   transparent/glass header and mobile dialog
  home.css                     home sections and responsive layouts
  feature-bento.css            feature tiles and layered product previews
  news.css                     dedicated market-news preview
src/components/sections/home/
  Hero.tsx / HeroVisual.tsx     opening section and four-screen poster
  SceneSurface.tsx             lazy loading, visibility and image fallback
  PhoneScene.tsx               lighting, hero rig and story scene
  PhoneModel.tsx               shared metallic phone geometry and textures
  ProductStory.tsx             scroll selection and feature content
  PhoneRig.tsx / SignalWaves.tsx    scene animation and signal pulses
  useSceneGesture.ts               drag and pointer lifecycle
  PeerCard.tsx                      single landscape collectible visual
```

The AI and messaging sections are consolidated in `ProductStory`; `News` owns the standalone market-news section.

## Verification checklist

1. Check 1440×900, 1440×720, 1280×720, 1024×768 and 390×844 layouts; no clipped text or horizontal overflow.
2. Verify transparent → glass header, anchors, native mobile dialog, Escape and focus return.
3. Confirm all four hero images and the enhanced desktop canvas. Move the pointer over the hero and scroll away/back.
4. Scroll AI → calling and back; check the phone and selected navigation. Repeat after resizing. Verify news topic selection with click and arrow/Home/End keys.
5. Select each hero screen with mouse/keyboard and by clicking visible rear screens; drag and release outside the scene. Decorative outlines must not participate in raycasting, and small pointer jitter must not start a drag.
6. Check reduced-motion, JavaScript-disabled and WebGL-unavailable/context-loss fallbacks in an environment that supports these simulations.
7. Check the contact page and client validation without sending real personal data.

React Three Fiber 9.7 currently uses `THREE.Clock`; Three.js 0.186 can emit a dependency deprecation warning. This is not suppressed. Frame rate and battery behavior must be measured on target physical devices before release.

## Contact API

`POST /api/contact` validates with Zod and limits successful requests to 5 per 10 minutes per IP. It returns 200 (accepted), 400 (invalid JSON), 422 (invalid fields), 429 (rate limited), 502 (the Mindo API did not accept it) or 503 (not configured).

Accepted requests — the Liên hệ form and the "Đại lý Peer" popup — are forwarded to the Mindo API (`POST /api/v1/public/website-leads`, header `x-website-secret`), where Marketing handles them under "Liên hệ từ website" in the admin. Configure `MINDO_API_URL` (a var in `wrangler.jsonc`) and the secret `WEBSITE_LEAD_SECRET` (`npx wrangler secret put WEBSITE_LEAD_SECRET`; locally in `.env.local`). Rate limits are in isolate memory; multi-instance deployment requires shared storage.

Store links intentionally point to the App Store and Google Play home pages until product URLs are available. Existing social and policy links also need final destinations before publication.

## Asset provenance

Product screenshots and news imagery are from the original [Mindo Figma design](https://www.figma.com/design/oneBH6QD5NcZD7fxNeKEkn/Mindo). The existing SVG logo is retained. Phone geometry is procedural and uses those original screenshots as textures.

Three.js, React Three Fiber and their type declarations use MIT licenses. No additional animation library or external 3D asset service is required.
