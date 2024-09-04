# Initialisation d'un projet

Concerne toutes nos typologies de projets.

- Ajouter un fichier [`.gitignore`](../configs/.gitignore) s'il n'est pas fourni dans le projet
- Ajouter un [`README.md`](../configs/README.md) conventionnel
- Ajouter [`.editorconfig`](../configs/.editorconfig) à la racine (et installer [l'extension VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
- Ajouter [`.vscode/settings.json`](../configs/.vscode/settings.json), [`.vscode/extensions.json`](../configs/.vscode/extensions.json) à la racine

1. Installer [ESLint](https://eslint.org/docs/latest/user-guide/getting-started) (vérification et validation du code JavaScript et TypeScript)
    - Bien suivre les étapes de configuration du preset Alsacréations [`eslint-config-alsacreations`](https://www.npmjs.com/package/eslint-config-alsacreations) spécifique pour ESLint ainsi que Prettier et Prettier-plugin-CSS-order

2. Installer [Prettier](https://prettier.io/docs/en/install.html) (formatteur par défaut pour HTML, CSS, etc.)
    - Installer [l'extension VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - Ajouter [`.prettierrc.mjs`](../configs/.prettierrc.mjs) à la racine
    - Installer [`prettier-plugin-css-order`](https://www.npmjs.com/package/prettier-plugin-css-order)
    - Rappel : bien suivre les étapes de configuration du preset Alsacréations `eslint-config-alsacreations`

3. Installer et configurer UnoCSS

## UnoCSS

[UnoCSS](https://unocss.dev/) est notre générateur principal de classes utilitaires et de custom properties CSS.

### Dans un projet Vite

- Dans `vite.config.js` : `import UnoCSS from 'unocss/vite'`
- Dans `vite.config.js` : `plugins: [ UnoCSS(), ],`

### Reset CSS

Le Reset CSS employé dans nos projet est celui de Tailwind ([Preflight](https://tailwindcss.com/docs/preflight)) auquel nous ajoutons à la main quelques règles spécifiques à Alsacréations : `min-width: 0`, `prefers-reduced-motion`, `visually-hidden` et `Liquid/Splash`.

- Installer `pnpm add @unocss/reset`
- Dans la feuille de style globale : `import '@unocss/reset/tailwind.css'` même si on n'utilise pas Tailwind
- Dans `uno.config.ts` : `preflights: [ ** ici les règles Reset à ajouter à la main ** ]`

### Si intégration en "CSS natif"

En CSS natif (ou vanilla), nous écrivons les règles CSS dans les feuilles de styles et nous n'utilisons pas de classes utilitaires, sauf exceptions.

Toutes les valeurs des propriétés CSS sont renseignées au sein d'un fichier de configuration (via le plugin `unocss-custom-properties`) et appliquées sous forme de custom properties (ex. `font-weight: var(--font-weight-400)`).

- Dans `uno.config.ts` : `import customProperties from 'unocss-custom-properties'`
- Dans `uno.config.ts` : `import { resolve } from "node:path"`
- Dans `uno.config.ts` : `presets: [ customProperties({ writeFile: true, filePath: resolve(__dirname, "vars.css"), }), ],`

### Si intégration en "CSS utilitaire"

En CSS utilitaire, nous écrivons les styles CSS dans le fichier HTML de chaque composant, sous forme de classes utilitaires. Nous n'écrivons pas de règles au sein d'un fichier CSS, sauf exceptions.

- Dans `uno.config.ts` : `import { presetMini } from 'unocss'`
- Dans `uno.config.ts` : `presets: [ presetMini() ]`

## Optionnel (selon projets)

3. Installer [Stylelint](https://stylelint.io/user-guide/get-started) *si prévu dans le projet* (sinon verifier que les linters CSS/SCSS natifs de VSCode sont activés)
    - `pnpm install -D stylelint`
    - Ajouter le fichier de configuration [`.stylelintrc.json`](../configs/.stylelintrc.json) à la racine.
