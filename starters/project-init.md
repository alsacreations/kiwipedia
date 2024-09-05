# Routine d'initialisation d'un projet

Cette routine consiste en une base commune à **toutes nos typologies de projets** (statique, Nuxt, WordPress).

## 1. Fichiers de configuration

- Installer [pnpm](https://pnpm.io/fr/installation) via `npm install -g pnpm`
- Ajouter un fichier [`.gitignore`](../configs/.gitignore) (et, optionnel, `.dockerignore`) s'ils ne sont pas fournis dans le projet
- Ajouter un [`README.md`](../configs/README.md) conventionnel
- Ajouter [`.editorconfig`](../configs/.editorconfig) à la racine (et installer [l'extension VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
- Ajouter [`.vscode/settings.json`](../configs/.vscode/settings.json), [`.vscode/extensions.json`](../configs/.vscode/extensions.json) à la racine

## 2. Linter, formatters et correcteurs

1. Installer [ESLint](https://eslint.org/docs/latest/user-guide/getting-started) (vérification et validation du code JavaScript et TypeScript)
    - Bien suivre les étapes de configuration du preset Alsacréations [`eslint-config-alsacreations`](https://www.npmjs.com/package/eslint-config-alsacreations) spécifique pour ESLint ainsi que Prettier et *Prettier-plugin-CSS-order* (voir point suivant)

2. Installer [Prettier](https://prettier.io/docs/en/install.html) (formatteur par défaut pour HTML, CSS, etc.)
    - Installer [l'extension VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - Ajouter [`.prettierrc.mjs`](../configs/.prettierrc.mjs) à la racine
    - Installer [`prettier-plugin-css-order`](https://www.npmjs.com/package/prettier-plugin-css-order)
    - Rappel : bien suivre les étapes de configuration du preset Alsacréations `eslint-config-alsacreations`

## 3. Styles CSS

**UnoCSS** est notre générateur principal de classes utilitaires et de custom properties CSS. **Il est employé dans tous nos projets CSS (qu'ils soient vanilla ou utilitaires).**

- Installer et configurer [UnoCSS](https://unocss.dev/)
- Ajouter [`uno.config.ts`](../configs/uno.config.ts) à la racine
- Ajouter [`uno-bretzel.ts`](../configs/uno-bretzel.ts) à la racine. Il s'agit de notre preset UnoCSS qui ajoute les règles spécifiques Alsacréations (reset CSS, .visually-hidden, layouts, etc.)

### Si intégration en "CSS natif"

*Rappel : en CSS natif (ou vanilla), nous écrivons les règles CSS dans les feuilles de styles et nous n'utilisons pas de classes utilitaires, sauf exceptions.*

Le plugin `unocss-custom-properties` transforme toutes les valeurs de thème du fichier `uno.config.ts` en custom properties (ex. `font-weight: var(--font-weight-400)`) et génère un fichier `vars.css` qui les contient :

- Dans `uno.config.ts` : `import customProperties from 'unocss-custom-properties'`
- Dans `uno.config.ts` : `import { resolve } from "node:path"`
- Dans `uno.config.ts` : `presets: [ customProperties({ writeFile: true, filePath: resolve(__dirname, "vars.css"), }), ],`

### Si intégration en "CSS utilitaire"

*Rappel : en CSS utilitaire, nous écrivons les styles CSS dans le fichier HTML de chaque composant, sous forme de classes utilitaires. Nous n'écrivons pas de règles au sein d'un fichier CSS, sauf exceptions.*

- Dans `uno.config.ts` : `import { presetMini } from 'unocss'`
- Dans `uno.config.ts` : `presets: [ presetMini() ]`

## 4. Optionnel (selon projets)

- Installer [Stylelint](https://stylelint.io/user-guide/get-started) *si prévu dans le projet* (sinon verifier que les linters CSS/SCSS natifs de VSCode sont activés)
  - `pnpm install -D stylelint`
  - Ajouter le fichier de configuration [`.stylelintrc.json`](../configs/.stylelintrc.json) à la racine.
