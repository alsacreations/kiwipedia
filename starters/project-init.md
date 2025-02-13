# Routine d'initialisation d'un projet

Cette routine consiste en une base commune à **toutes nos typologies de projets** (statique, Nuxt, WordPress).

## Sommaire

**Important !** Dans la majeure partie des projets "simples", l'étape 2 (fichiers de configuration) n'est pas nécessaire car les fichiers sont générés par le projet Vite.
Il existe cependant des projets "multi" (que l'on appelle aussi "mono-repo") où l'on trouve une partie front (ex. Vite) et d'autres parties au sein du même projet. Pour ces projets, les instructions sont légèrement différentes : l'étape 2 (fichiers de configuration) est à réaliser au préalable avant l'étape 1 (Vite).

- [Routine d'initialisation d'un projet](#routine-dinitialisation-dun-projet)
  - [Sommaire](#sommaire)
  - [Stack commune à tous les projets](#stack-commune-à-tous-les-projets)
  - [1. Vite](#1-vite)
  - [2. Fichiers de configuration](#2-fichiers-de-configuration)
  - [3. Linter, formatters et correcteurs](#3-linter-formatters-et-correcteurs)
  - [4. Styles CSS](#4-styles-css)
    - [Si intégration en "CSS natif"](#si-intégration-en-css-natif)
    - [Si intégration en "CSS utilitaire"](#si-intégration-en-css-utilitaire)
  - [5. Optionnel (selon projets)](#5-optionnel-selon-projets)

## Stack commune à tous les projets

- **pnpm** : gestionnaire de paquets
- **Vite** : outil de compilation/bundler
- **Editorconfig** : configuration tabs vs spaces à l'insertion, encodage, eol, etc
- **Prettier** : formatage automatique des fichiers à la sauvegarde
- **Stylelint** : vérification syntaxe et bonnes pratiques CSS
- **ESlint** : vérification syntaxe JavaScript, TypeScript et frameworks
- **Tailwind** : génération de classes utilitaires, des variables CSS, de Reset CSS, des layouts et gestion des valeurs du "thème" (même dans nos projets CSS "vanilla")

## 1. Vite

- Se placer à la racine, démarrer un projet Vite avec `pnpm create vite`, choisir le nom du projet, les options *Vanilla* + *JavaScript* (ou *TypeScript*)
- Se rendre dans le dossier correspondant au nom du projet `cd <vite-project>`
- Installer les dépendances `pnpm install`
- Ajouter [`vite.config.ts`](../configs/vite.config.ts) dans le dossier Vite (ex. `vite-project`)
- Supprimer les fichiers d'exemple (`counter.js`, `javascript.svg`, `public/vite.svg`); nettoyer `style.css` (et renommer en `styles.css`), nettoyer `main.js` pour ne conserver que l'import CSS; côté HTML ne pas oublier de changer `lang="fr"` et `<title>` puis supprimer `link rel="icon"`
- Utiliser le dossier [`public/`](https://vitejs.dev/guide/assets.html#the-public-directory) pour les ressources statiques (ex: images, svg, fonts…)

Tâches Vite :

- Développer : `pnpm dev`
- Compiler : `pnpm build` et utiliser les fichiers produits dans `dist/`

## 2. Fichiers de configuration

*Note : la plupart de ces fichiers sont générés automatiquement dans un projet Vite, vérifiez simplement qu'ils sont présents.*

- Créer un dossier racine (ex. `mkdir projet`) et s'y rendre (`cd projet`)
- Si ce n'est pas déjà fait, installer [pnpm](https://pnpm.io/fr/installation) via `npm install -g pnpm`
- Créer un fichier `package.json` via `pnpm init`
- Ajouter un fichier [`.gitignore`](../configs/.gitignore) (et, optionnel, `.dockerignore`) s'ils ne sont pas fournis dans le projet
- Ajouter un fichier [`README.md`](../configs/README.md)
- Ajouter [`.editorconfig`](../configs/.editorconfig) à la racine (si ce n'est pas déjà fait, installer [l'extension VSCode editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
- Créer un sous-dossier `.vscode` à la racine de `projet`
- Ajouter [`.vscode/settings.json`](../configs/.vscode/settings.json), [`.vscode/extensions.json`](../configs/.vscode/extensions.json) dans le sous-dossier `.vscode`

## 3. Linter, formatters et correcteurs

On part du principe qu'on installe les linters que si l'on a déjà configuré l'environnement avant (vanilla, Vue/Nuxt, WordPress).

1. Installer [ESLint](https://eslint.org/docs/latest/user-guide/getting-started) via `pnpm create @eslint/config@latest` (vérification et validation du code JavaScript et TypeScript) (si ce n'est pas déjà fait, installer [l'extension VSCode ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
    - Employer la config ESlint adaptée au projet *(conseillée par défaut)*
      - Config de base fournie par défaut
      - Config spécifique VueJS *(si non proposée lors de l'install ESLint)* : <https://eslint.vuejs.org/>
      - Config spécifique Nuxt *(si non proposée lors de l'install ESLint)* : <https://nuxt.com/modules/eslint>

2. Installer [Prettier](https://prettier.io/docs/en/install.html) via `pnpm install --save-dev prettier` (formatteur par défaut pour HTML, CSS, etc.)
    - Installer [l'extension VSCode Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - Ajouter [`.prettierrc.mjs`](../configs/.prettierrc.mjs) à la racine

3. Installer [Stylelint](https://stylelint.io/user-guide/get-started) (validation du code CSS)
    - `pnpm install --save-dev stylelint stylelint-config-standard stylelint-config-html stylelint-order stylelint-config-property-sort-order-smacss` (cette commande installe Stylelint, les configs standard et HTML, l'ordre des propriétés et l'ordre des propriétés selon SMACSS)
    - Installer [l'extension VSCode Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
    - Ajouter [`stylelint.config.js`](../configs/stylelint.config.js) à la racine
    - Dans les settings de VS Code (`cmd+,`), ajouter les langages HTML et Vue à la liste des fichiers à vérifier : `"stylelint.validate": ["css", "scss", "html", "vue"]`

**Important :** Relancer VS Code pour activer les linters (`cmd+maj+p -> reload window`)

## 4. Styles CSS

**Tailwind CSS** est notre générateur principal de classes utilitaires et de custom properties CSS. **Il est employé dans tous nos projets CSS (même vanilla, car on peut toujours avoir besoin d'une classe utilitaire).**

- Se placer dans le dossier Vite (ex. `cd vite-project`)
- Installer et configurer [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) comme l'indique la procédure via Vite.

Nous conseillons de faire en sorte que le fichier [`app.css`](../configs/app.css) soit le point d'entrée pour les styles. Il contiendra :

- Tous les imports (Tailwind, Bretzel reset, etc.)
- Le thème du site (couleurs, polices, etc.)
- La feuille de styles globale (`global.css`)
- Les classes utilitaires personnalisées (`visually-hidden`)

### Si intégration en "CSS natif"

*Rappel : en CSS natif (ou vanilla), nous écrivons les règles CSS dans les feuilles de styles et nous n'utilisons pas de classes utilitaires, sauf exceptions.*

Le plugin `unocss-custom-properties` transforme toutes les valeurs de thème du fichier `uno.config.ts` en custom properties (ex. `font-weight: var(--font-weight-400)`) et génère un fichier virtuel `vars.css`.

Vérifier que ces instructions sont présentes (et non commentées) :

- Dans `uno.config.ts` : `import customProperties from 'unocss-custom-properties'`
- Dans `uno.config.ts` : `import { resolve } from "node:path"`
- Dans `uno.config.ts` : `presets: [ customProperties({ writeFile: true, filePath: resolve(__dirname, "vars.css"), }), ],`

### Si intégration en "CSS utilitaire"

*Rappel : en CSS utilitaire, nous écrivons les styles CSS dans le fichier HTML de chaque composant, sous forme de classes utilitaires. Nous n'écrivons pas de règles au sein d'un fichier CSS, sauf exceptions.*

Vérifier que ces instructions sont présentes (et non commentées) :

- Dans `uno.config.ts` : `import { presetMini } from 'unocss'`
- Dans `uno.config.ts` : `presets: [ presetMini() ]`

## 5. Optionnel (selon projets)

Options à installer / configurer au cas par cas, uniquement si prévu dans le projet :

- Installer Sass : `pnpm install --save-dev sass` (renommer `styles.css` en `styles.scss` et adapter le chemin dans `main.js`)
- Installer [Stylelint](https://stylelint.io/user-guide/get-started) (sinon verifier que les linters CSS/SCSS natifs de VSCode sont activés)
  - `pnpm install --save-dev stylelint`
  - Ajouter le fichier de configuration [`.stylelintrc.json`](../configs/.stylelintrc.json) à la racine.
- Ajouter [launch.json](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) au projet pour lancer le debugger.
- Ajouter [alpine.js](https://alpinejs.dev/essentials/installation) avec `pnpm install --save alpinejs`
- **Docker** si besoin de mise en recette ou pré-production
  - Ajouter `Dockerfile` et `docker-compose.yml` suivant les exemples et les adapter
  - Mise en production (optionnel) : `docker-compose up -d --build`
