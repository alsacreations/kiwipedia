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
    - [Tailwind](#tailwind)
    - [`app.css`](#appcss)
  - [5. Optionnel (selon projets)](#5-optionnel-selon-projets)

## Stack commune à tous les projets

Environnement, compilation :

- **pnpm** : gestionnaire de paquets
- **Vite** : outil de compilation/bundler

Linters :

- **Editorconfig** : configuration tabs vs spaces à l'insertion, encodage, eol, etc
- **Prettier** : formatage automatique des fichiers à la sauvegarde
- **Stylelint** : vérification syntaxe et bonnes pratiques CSS
- **ESlint** : vérification syntaxe JavaScript, TypeScript et frameworks

CSS :

- **Tailwind** : génération de classes utilitaires, des variables CSS, de Reset CSS, des layouts et gestion des valeurs du "thème" (même dans nos projets CSS "vanilla")

Les détails de configuration sont précisés ci-dessous. La plupart des fichiers de configuration sont disponibles dans le dossier [`configs/`](../configs/).

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

### Tailwind

**Tailwind CSS** est un générateur de classes utilitaires et de custom properties CSS. **Il est systématiquement incorporé dans nos projets CSS même Vanilla (car on peut toujours avoir besoin d'une classe utilitaire).**

- Se placer dans le dossier Vite (ex. `cd vite-project`)
- Installer et configurer [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) comme l'indique la procédure via Vite.

### `app.css`

Le fichier [`app.css`](../configs/CSS/app.css) (ou la version Tailwind [`app.css`](../configs/CSS/app-tailwind.css)) est le point d'entrée pour les styles.

Il charge toutes les feuilles de styles dans l'ordre des layers CSS *(config, base, components, utilities)* :

1. **Layer config** (reset, polices, themes, layouts) :

- [`reset.css`](https://reset.alsacreations.com/) : Reset CSS moderne (et reset print)
- `theme.css` - Thème principal (ex. `--color-pink-500: #f1498f`) (valeurs primitives issues de Figma) (voir [Guidelines CSS](https://github.com/alsacreations/kiwipedia/blob/main/guidelines/css.md#variables-css-primitives-et-tokens), partie "Primitives")
- `theme-tokens.css` : Design tokens (ex. `--primary: --color-pink-500;`) (voir [Guidelines CSS](https://github.com/alsacreations/kiwipedia/blob/main/guidelines/css.md#variables-css-primitives-et-tokens), partie "Tokens (=roles)")
- [`layouts.css`](https://bretzel.alsacreations.com/) : Utilitaires de disposition des composants (Bretzel)
- [`natives.css`](https://alsacreations.github.io/KNACSS) : Styles natifs des éléments HTML (radio, input, button, etc.)

2. **Layer base** :

- `styles.css` : Styles globaux du projet (gabarits, typographie, etc.)

3. **Layer components** :

- Les fichiers CSS des composants du projet

4. **Layer utilities** :

- Fichier de classes utilitaires si nécessaire (Tailwind, ou classes utilitaires personnalisées)

## 5. Optionnel (selon projets)

Options à installer / configurer au cas par cas, uniquement si prévu dans le projet :

- Installer Sass : `pnpm install --save-dev sass` (renommer `styles.css` en `styles.scss` et adapter le chemin dans `main.js`)
- Installer le plugin [PostCSS Custom Media](https://www.npmjs.com/package/postcss-custom-media) pour bénéficier de Media Queries avec variables : `pnpm install --save-dev postcss-custom-media` (ajouter un fichier [`postcss.config.mjs`](../configs/postcss.config.mjs)). PostCSS est déjà installé par défaut dans Vite, il n'y a donc pas besoin de l'installer.
- Ajouter [alpine.js](https://alpinejs.dev/essentials/installation) avec `pnpm install --save alpinejs`
- **Docker** si besoin de mise en recette ou pré-production
  - Ajouter `Dockerfile` et `docker-compose.yml` suivant les exemples et les adapter
  - Mise en production (optionnel) : `docker-compose up -d --build`
