# Scrolly diagrams

Scrollytelling walkthroughs where a hand-drawn diagram builds up one step at a time as you scroll. Each step's new parts are drawn in blue, then settle into ink.

Two versions of the same idea live here.

## `demo/` — standalone page

A single `index.html` with no build step. Open it in a browser.

- **Rough.js** draws the boxes, arrows and database cylinder. It's the library behind Excalidraw's sketchy look.
- A few lines of plain JavaScript pick the active step as you scroll (or when you click a step or a dot).
- Each stroke gets `pathLength="1"`, and `stroke-dashoffset` animates from 1 to 0, so lines look like they're drawn by a pen.

## `nextjs-codehike/` — Code Hike + Excalidraw

A Next.js app where the content is MDX and Code Hike handles the steps.

```bash
cd nextjs-codehike
npm install
npm run dev
# open http://localhost:3000/request-lifecycle
```

Each `## !!steps` block in `app/request-lifecycle/page.mdx` pairs prose with one image:

```mdx
## !!steps The browser asks

The user clicks a link…

![!image Browser sending a request](/diagrams/request-1.svg)
```

- `components/scrolly-diagram.tsx` parses the steps with Code Hike's `Block` and `ImageBlock` schemas and wraps them in `SelectionProvider` / `Selectable`.
- `components/diagram-stage.tsx` stacks the step images and crossfades to the selected one.

### Swapping in your own Excalidraw frames

The SVGs in `public/diagrams/` are generated placeholders. To replace them:

1. Draw step 1 inside an Excalidraw frame.
2. Duplicate the frame and add to it for step 2, and so on. Keep every frame the same size so the exports line up.
3. Export each frame as SVG with the background off, and save as `public/diagrams/request-N.svg`.

With `<img>` tags you get a crossfade between frames. For the pen-drawing effect from the standalone demo, inline the SVG markup (for example with SVGR, the SVG-to-React-component converter) so CSS can reach the paths, then add the same `pathLength` and `stroke-dashoffset` animation.
