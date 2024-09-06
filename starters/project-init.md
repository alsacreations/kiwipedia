# Routine d'initialisation d'un projet

Cette routine consiste en une base commune à **toutes nos typologies de projets** (statique, Nuxt, WordPress).

## Stack commune à tous les projets

- **pnpm** : gestionnaire de paquets
- **Vite** : outil de compilation/bundler
- **Editorconfig** : configuration tabs vs spaces à l'insertion, encodage, eol, etc
- **Prettier** : formatage automatique des fichiers à la sauvegarde
- **ESlint** : vérification syntaxe JavaScript, TypeScript et frameworks
- **UnoCSS** : génération de classes utilitaires, des variables CSS, de Reset CSS, des layouts et gestion des valeurs du "thème"

## 1. Fichiers de configuration

- Créer un dossier racine (ex. `mkdir projet`) et s'y rendre (`cd projet`)
- Si ce n'est pas déjà fait, installer [pnpm](https://pnpm.io/fr/installation) via `npm install -g pnpm`
- Créer un fichier `package.json` via `pnpm init`
- Ajouter un fichier [`.gitignore`](../configs/.gitignore) (et, optionnel, `.dockerignore`) s'ils ne sont pas fournis dans le projet
- Ajouter un [`README.md`](../configs/README.md) conventionnel
- Ajouter [`.editorconfig`](../configs/.editorconfig) à la racine (si ce n'est pas déjà fait, installer [l'extension VSCode editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
- Créer un sous-dossier `.vscode` à la racine de `projet`
- Ajouter [`.vscode/settings.json`](../configs/.vscode/settings.json), [`.vscode/extensions.json`](../configs/.vscode/extensions.json) dans le sous-dossier `.vscode`

## 2. Linter, formatters et correcteurs

1. Installer [ESLint](https://eslint.org/docs/latest/user-guide/getting-started) via `pnpm create @eslint/config@latest` (vérification et validation du code JavaScript et TypeScript) (si ce n'est pas déjà fait, installer [l'extension VSCode ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
    - Option 1 : Installer et configurer le preset Alsacréations [`eslint-config-alsacreations`](https://www.npmjs.com/package/eslint-config-alsacreations) spécifique pour ESLint
    - Option 2 : Employer la config ESlint adaptée au projet
      - Config de base fournie par dévaut
      - Config spécifique VueJS : <https://eslint.vuejs.org/>

2. Installer [Prettier](https://prettier.io/docs/en/install.html) via `pnpm add --save-dev --save-exact prettier` (formatteur par défaut pour HTML, CSS, etc.)
    - Installer [l'extension VSCode Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - Ajouter [`.prettierrc.mjs`](../configs/.prettierrc.mjs) à la racine
    - Installer [`prettier-plugin-css-order`](https://www.npmjs.com/package/prettier-plugin-css-order) via `pnpm i prettier-plugin-css-order`

- Relancer VS Code pour activer les linters (`cmd+maj+p -> reload window`)

## 3. Vite

- Se placer à la racine, démarrer un projet Vite avec `pnpm create vite`, choisir *Vanilla* + *JavaScript* (ou *TypeScript*)
- Choisir le nom d'un sous-dossier (ex. `vite`) et s'y rendre (`cd <vite>`)
- Installer les dépendances avec `pnpm install`
- Supprimer les fichiers d'exemple (`counter.js`, `javascript.svg`, `public/vite.svg`); nettoyer `style.css`, nettoyer `main.js` pour ne conserver que l'import CSS; côté HTML ne pas oublier de changer `lang="fr"` et `<title>` puis supprimer `link rel="icon"`
- Utiliser le dossier [`public/`](https://vitejs.dev/guide/assets.html#the-public-directory) pour les ressources statiques (ex: images, svg, fonts…)

Tâches Vite :

- Développer : `pnpm dev`
- Compiler : `pnpm build` et utiliser les fichiers produits dans `dist/`

## 4. Styles CSS

**UnoCSS** est notre générateur principal de classes utilitaires et de custom properties CSS. **Il est employé dans tous nos projets CSS (qu'ils soient vanilla ou utilitaires).**

- Se placer à la racine
- Installer et configurer [UnoCSS](https://unocss.dev/) via `pnpm add -D unocss`
- Ajouter [`uno.config.ts`](../configs/uno.config.ts) à la racine
- Ajouter [`uno-bretzel.ts`](../configs/uno-bretzel.ts) à la racine. Il s'agit de notre preset UnoCSS qui ajoute les éléments spécifiques Alsacréations (reset CSS, .visually-hidden, layouts, etc.)
- Dans `vite.config.js` : `import UnoCSS from 'unocss/vite'`
- Dans `vite.config.js` : `plugins: [ UnoCSS(), ],`
- Installer Sass (optionnel) : `pnpm install --save-dev sass` (renommer `style.css` en `style.scss` et adapter le chemin dans `main.js`)

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
- Ajouter [launch.json](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) au projet pour lancer le debugger.
- Ajouter [alpine.js](https://alpinejs.dev/essentials/installation) avec `pnpm install --save alpinejs`
- **Docker** si besoin de mise en recette ou pré-production
  - Ajouter `Dockerfile` et `docker-compose.yml` suivant les exemples et les adapter
  - Mise en production (optionnel) : `docker-compose up -d --build`
