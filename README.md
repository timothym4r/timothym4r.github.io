# Timothy Pasaribu's portfolio

This site adapts [Starfolio](https://github.com/webrating/starfolio) to Timothy's portfolio content. The site uses Astro and builds to static files for GitHub Pages. Starfolio's MIT license is included in [LICENSE](LICENSE).

## Local development

Requires Node.js 22.12 or newer and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Run `pnpm build` to produce `dist/`.

Portfolio content lives in `src/data/resume.tsx`. Site settings and light theme colors live in `src/data/config.ts`. The profile photo and CV are in `public/`.

The GitHub Pages workflow builds `main` when it is pushed. Set the repository's Pages source to **GitHub Actions** before using the workflow.

## Visual credits

The favicon uses [Akatsuki nuage](https://commons.wikimedia.org/wiki/File:Akatsuki_nuage.svg) by Chatsam under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The project card illustrations were created for this site.

The About section's pointer ripple is inspired by [Animorio's water-line background](https://animorio.com/en/animations/background-of-lines-rippling-in-the-pointer-wake/). The site uses its own lightweight canvas implementation.
