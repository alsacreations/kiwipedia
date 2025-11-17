# Routine d'initialisation d'un projet

> 📋 À propos  
> Cette routine constitue une base commune à toutes nos typologies de projets (statique, Nuxt, WordPress). Elle standardise l’environnement, les outils de qualité, la structure CSS et les options liées.

## Sommaire

> 💡 **Important :**
>
> - Dans la majorité des projets “simples”, l’étape 2 (fichiers de configuration) n’est pas nécessaire car Vite génère l’essentiel.
> - Cas des projets “multi” (mono-repo) avec une partie front (Vite) et d’autres parties au sein du même dépôt: réaliser l’étape 2 (fichiers de configuration) avant l’étape 1 (Vite).

- [Routine d'initialisation d'un projet](#routine-dinitialisation-dun-projet)
  - [Sommaire](#sommaire)
  - [Stack commune à tous les projets](#stack-commune-à-tous-les-projets)
  - [1. Vite](#1-vite)
  - [2. Fichiers de configuration](#2-fichiers-de-configuration)
  - [3. Linter, formatters et correcteurs](#3-linter-formatters-et-correcteurs)
  - [4. Styles CSS](#4-styles-css)
    - [`app.css`](#appcss)
  - [5. Custom Media Queries (optionnel)](#5-custom-media-queries-optionnel)
  - [6. Autres Options (selon projets)](#6-autres-options-selon-projets)

---

## Stack commune à tous les projets

Environnement / compilation

- **pnpm :** gestionnaire de paquets
- **Vite :** bundler/outil de compilation

Linters / qualité

- **Editorconfig :** indentation, encodage, EOL
- **Prettier :** formatage automatique
- **Stylelint :** vérification CSS
- **ESLint :** vérification JavaScript/TypeScript (+ frameworks)

---

## 1. Vite

1) Se placer à la racine et créer un projet

```bash
pnpm create vite
# choisir le nom du projet
# sélectionner "Vanilla + JavaScript" (ou "TypeScript")
cd <vite-project>
pnpm install
```

2) Ajouter la configuration Vite

- Copier [`vite.config.ts`](../configs/vite.config.ts) dans le dossier du projet (ex. vite-project)

3) Nettoyer les fichiers d’exemple

- Supprimer: `counter.js`, `javascript.svg`, `public/vite.svg`
- Renommer `style.css` en `styles.css`
- Nettoyer `main.js` pour ne conserver que l’import CSS
- Dans `index.html`: définir `lang="fr"`, ajuster `<title>`, supprimer le favicon `<link rel="icon">`

4) Utiliser le dossier `public/` pour les assets statiques

- Réf.: <https://vitejs.dev/guide/assets.html#the-public-directory>

Tâches Vite

```bash
pnpm dev    # démarrer le serveur de développement
pnpm build  # compiler la version de production (dossier dist/)
```

---

## 2. Fichiers de configuration

Note: la plupart sont générés automatiquement par Vite. Vérifier leur présence.

1) Pré-requis

```bash
# installer pnpm s'il n'est pas présent
npm install -g pnpm
# créer un dossier racine si besoin
mkdir projet && cd projet
# initialiser le package
pnpm init
```

2) Fichiers racine

- Ajouter `.gitignore` (et optionnellement `.dockerignore`)
- Ajouter `README.md`
- Ajouter `.editorconfig` (installer l’extension VS Code “EditorConfig”)

3) Dossier VS Code

- Créer `.vscode/`
- Ajouter [`settings.json`](../configs/.vscode/settings.json) et [`extensions.json`](../configs/.vscode/extensions.json)

---

## 3. Linter, formatters et correcteurs

On installe les linters après avoir choisi le type de projet (vanilla, Vue/Nuxt, WordPress).

1) ESLint (JS/TS)

```bash
pnpm create @eslint/config@latest
```

- Utiliser la configuration adaptée au projet
  - Base par défaut
  - Vue: <https://eslint.vuejs.org/>
  - Nuxt: <https://nuxt.com/modules/eslint>
- Extension VS Code: “ESLint”

2) Prettier (formatteur)

```bash
pnpm install --save-dev prettier
```

- Extension VS Code: “Prettier - Code formatter”
- Ajouter `.prettierrc.mjs` à la racine

1) Stylelint (CSS)

```bash
pnpm install --save-dev stylelint stylelint-config-standard stylelint-config-html stylelint-order stylelint-config-property-sort-order-smacss
```

- Extension VS Code: “Stylelint”
- Ajouter `stylelint.config.js` à la racine
- Dans VS Code (cmd+,), ajouter:

```json
"stylelint.validate": ["css", "scss", "html", "vue"]
```

> 💡 **Important :** Relancer VS Code pour activer les linters: cmd+maj+p → “Reload Window”

---

## 4. Styles CSS

### `app.css`

Le fichier `app.css` est le point d’entrée.
Il charge les feuilles dans l’ordre des layers CSS: config, base, components, utilities.

1) Layer config (reset, polices, thèmes, layouts)

- [`reset.css`](https://reset.alsacreations.com/): reset moderne + print
- `theme.css`: primitives (ex. `--color-pink-500: #f1498f`) issues de Figma  
  Voir “Primitives” dans les [Guidelines CSS](https://github.com/alsacreations/kiwipedia/blob/main/guidelines/css.md#variables-css-primitives-et-tokens)
- `theme-tokens.css`: design tokens (ex. `--primary: var(--color-pink-500)`)  
  Voir “Tokens (=roles)” dans les [Guidelines CSS](https://github.com/alsacreations/kiwipedia/blob/main/guidelines/css.md#variables-css-primitives-et-tokens)
- [`layouts.css`](https://bretzel.alsacreations.com/): utilitaires de disposition (Bretzel)
- [`natives.css`](https://knacss.com/css/natives.css): styles natifs des éléments HTML

2) Layer base

- `styles.css`: styles globaux du projet (gabarits, typo, liens, etc.)

3) Layer components

- Feuilles de styles des composants

4) Layer utilities

- Tailwind et/ou utilitaires personnalisés

> 📚  **Outil**&#8239;: [Primary](https://primary.alsacreations.com/) est un configurateur CSS pour les projets Alsacréations. Il permet de générer des fichiers CSS conformes aux normes de l'équipe.

---

## 5. Custom Media Queries (optionnel)

Installer le plugin PostCSS Custom Media:

```bash
pnpm add -D postcss-custom-media
```

Ajouter `postcss.config.mjs`:

```js
export default {
  plugins: {
    "postcss-custom-media": {
      /* plugin options */
    },
  },
}
```

Déclarer les breakpoints du projet:

```css
/* assets/css/theme.css */
@custom-media --md (width >= 48rem); /* 768px */
@custom-media --lg (width >= 64rem); /* 1024px */
@custom-media --xl (width >= 80rem); /* 1280px */
@custom-media --xxl (width >= 96rem); /* 1536px */
```

Utilisation dans les règles (syntaxe moderne des plages):

```css
.toc {
  padding: var(--spacing-s);
  border-radius: var(--radius-md);

  @media (--lg) {
    position: fixed;
    top: var(--spacing-m);
    left: var(--spacing-s);
  }
}
```

Remplacement effectué à la compilation:

```css
@media (--md) { /* … */ }
/* devient */
@media (width >= 48rem) { /* … */ }
```

Avantages

- Centralisation des seuils (un seul fichier)
- Lisibilité (noms explicites `--md`, `--lg`, `--xl`)
- Cohérence (mêmes breakpoints partout)

---

## 6. Autres Options (selon projets)

- Tailwind : Se placer dans le dossier Vite (`cd vite-project`). Suivre l’installation via Vite: <https://tailwindcss.com/docs/installation/using-vite>

- Sass

```bash
pnpm install --save-dev sass
# renommer styles.css -> styles.scss
# adapter l'import dans main.js
```

- Alpine.js

```bash
pnpm install --save alpinejs
```

- Docker (recette / pré-production)
  - Ajouter `Dockerfile` et `docker-compose.yml` depuis les exemples et les adapter
  - Mise en production (optionnel): `docker-compose up -d --build`
