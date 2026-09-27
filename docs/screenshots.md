# Screenshotting the page

The page's sections start at `opacity: 0` and are revealed by IntersectionObserver or
scroll-driven CSS animations. A plain screenshot (an in-app browser pane, a quick headless
capture) taken before those fire shows an empty band where a section should be, so a layout
that measures correctly in JavaScript can still look broken. Look at a change, do not only
measure it.

## The tool

`shotpage.mjs` is a small Node script in the owner's Claude tools folder
(`tools/shot/shotpage.mjs`, next to its own `package.json` for `playwright-core`). It is not
part of this repo. Before capturing a single pixel it:

1. Drives the system Chrome headless through `playwright-core`, so nothing depends on a
   visible window and there is no browser download.
2. Emulates `prefers-reduced-motion`.
3. Injects a stylesheet that forces every animation and transition to its finished state and
   un-hides the usual reveal patterns, so no section can stay invisible.
4. Scrolls the whole document to trip any IntersectionObserver that survived step 3, then
   returns to the top.
5. Waits for fonts, for every image to decode, and for layout to stop changing.

It exits non-zero when the capture cannot be trusted (blank frame, an image that never
decoded, layout still moving), so a dark rectangle is never mistaken for the real page.

## Usage

```
node shotpage.mjs <url|file> -o out.png                 full page
node shotpage.mjs <url> --sel "#pricing" -o out.png     one section
node shotpage.mjs <url> --each-section outdir/          every <section>, one file each
node shotpage.mjs <url> --width 1400 --mobile           viewport control
```

Point it at `index.html` for a local edit or at https://agenthydra.lunarwerx.com for the live
page. `--keep-motion` skips the animation override when the motion itself is what you are
checking.

## Without the tool

Any headless browser works if it does steps 2 to 5 above: reduced motion, a stylesheet that
sets `animation: none; transition: none; opacity: 1` on the reveal classes, a full scroll, and
a wait for fonts and images before the capture.
