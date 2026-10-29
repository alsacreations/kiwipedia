# Initialisation d'un projet

> Statut : stable · Niveau : tous

Procédure commune à tous nos nouveaux projets (statique, Nuxt, WordPress). **[Primary](https://primary.alsacreations.com/) est la source de vérité** pour les fichiers de configuration et le kit CSS&#8239;: ce document dit **quoi récupérer, où le placer et dans quel ordre**, sans recopier le contenu des fichiers. Il s'utilise aussi bien à la main (interface web de Primary) que par un agent (fichiers bruts du [dépôt Primary](https://github.com/alsacreations/primary) et ses scripts Node).

> ⚠️ **Règle absolue** — Ne jamais écrire, réécrire ou « améliorer » à la main `.editorconfig`, `prettier.config.mjs`, `stylelint.config.mjs`, `postcss.config.mjs`, `.vscode/*` ni `app.css`. Les récupérer depuis Primary. Un changement de convention se fait **dans le dépôt Primary**, pas dans un projet.

---

## Stack commune

| Rôle | Outil |
| --- | --- |
| Gestionnaire de paquets | **pnpm** |
| Compilation | **Vite** (embarqué par Nuxt et WordPlate) |
| Qualité | **EditorConfig**, **Prettier**, **Stylelint**, **ESLint** |
| CSS | Kit Primary&#8239;: layers `config` → `base` → `components` → `utilities`, voir [CSS](../guidelines/css.md) |

## 1. Créer le projet selon sa typologie

| Typologie | Création | Dossier CSS |
| --- | --- | --- |
| Site statique | `pnpm create vite@latest <nom> --template vanilla` (ou `vanilla-ts`), puis `pnpm install` | `src/assets/css/` |
| Nuxt | `pnpm create nuxt@latest <nom>`, puis voir [Nuxt](#nuxt) | `app/assets/styles/` |
| WordPress | Environnement Docker + Composer + WordPlate&#8239;: voir [WordPress — Environnement](../guidelines/wordpress/environnement.md) et [WordPress — Thème](../guidelines/wordpress/theme.md) | `resources/` (sources compilées par Vite) |

Projet multi-parties (mono-dépôt avec un front Vite et d'autres parties)&#8239;: faire l'étape 2 **à la racine** avant de créer le front.

Nettoyage d'un projet Vite statique&#8239;: supprimer les fichiers d'exemple (`src/counter.js`, `src/style.css`, le contenu de `src/assets/` et de `public/`)&#8239;; réduire `src/main.js` à `import './assets/css/app.css'`&#8239;; dans `index.html`, mettre `lang="fr"`, un `<title>` réel, et retirer le `<link rel="icon">` par défaut. Assets statiques dans `public/`.

## 2. Récupérer les fichiers de configuration

Source&#8239;: dossier [`config_files/`](https://github.com/alsacreations/primary/tree/main/config_files) de Primary. Les noms y sont **sans point initial**&#8239;: les renommer à la copie.

| Fichier Primary | Destination dans le projet |
| --- | --- |
| `config_files/editorconfig` | `.editorconfig` |
| `config_files/gitignore` | `.gitignore` |
| `config_files/vscode/settings.json` | `.vscode/settings.json` |
| `config_files/vscode/extensions.json` | `.vscode/extensions.json` |
| `config_files/prettier.config.mjs` | `prettier.config.mjs` |
| `config_files/stylelint.config.mjs` | `stylelint.config.mjs` |
| `config_files/postcss.config.mjs` | `postcss.config.mjs` |
| `config_files/vite.config.js` | `vite.config.js` (projet statique uniquement, si absent) |

Par un agent ou en ligne de commande, depuis la racine du projet&#8239;:

```bash
P=https://raw.githubusercontent.com/alsacreations/primary/main/config_files
mkdir -p .vscode
curl -fsSL $P/editorconfig -o .editorconfig
curl -fsSL $P/gitignore -o .gitignore
curl -fsSL $P/vscode/settings.json -o .vscode/settings.json
curl -fsSL $P/vscode/extensions.json -o .vscode/extensions.json
curl -fsSL $P/prettier.config.mjs -o prettier.config.mjs
curl -fsSL $P/stylelint.config.mjs -o stylelint.config.mjs
curl -fsSL $P/postcss.config.mjs -o postcss.config.mjs
```

Puis installer les dépendances qu'ils requièrent&#8239;:

```bash
pnpm add -D prettier postcss-custom-media stylelint stylelint-config-standard stylelint-config-html stylelint-order stylelint-config-property-sort-order-smacss
```

Ajouter un `README.md` (informations de prise en main du projet, voir [WordPress — Environnement](../guidelines/wordpress/environnement.md) pour le contenu attendu).

ESLint&#8239;: Primary ne fournit pas encore de configuration de référence. En attendant&#8239;: `pnpm create @eslint/config@latest` (assistant interactif — à lancer par un humain), puis la configuration officielle du framework ([Vue](https://eslint.vuejs.org/), [Nuxt](https://nuxt.com/modules/eslint)).

## 3. Générer le kit CSS

Le kit comprend&#8239;: `app.css` (point d'entrée), `theme.css` (primitives et tokens), `custom-media.css` (points de rupture), `styles.css`, `utilities.css`, et les fichiers externes `reset.css`, `print.css`, `natives.css`, `layouts.css`.

**À la main**&#8239;: [Primary](https://primary.alsacreations.com/) → importer les JSON exportés de Figma (plugin _Variables_, option «&#8239;Export modes&#8239;») ou choisir «&#8239;Projet vide&#8239;» → cocher «&#8239;Extra CSS&#8239;» (et «&#8239;WordPress&#8239;» si besoin) → télécharger le ZIP → copier le dossier `css/` dans le dossier CSS du projet.

**Par un agent**&#8239;:

1. `theme.css` et `custom-media.css` — avec le script Node de Primary (aucune dépendance à installer). Si l'équipe a fourni les exports JSON de Figma, les placer dans un dossier `<json>`&#8239;; sinon passer un dossier vide (équivalent de «&#8239;Projet vide&#8239;», primitives et tokens par défaut).

```bash
git clone --depth 1 https://github.com/alsacreations/primary.git /tmp/primary
node /tmp/primary/scripts/figmatocss.js <json> /tmp/primary-out
cp /tmp/primary-out/theme.css /tmp/primary-out/custom-media.css <dossier-css>/
```

1. `styles.css` et `utilities.css` — copier `assets/templates/styles.css` et `assets/templates/utilities.css` du dépôt Primary.
2. Fichiers externes, toujours dans leur dernière version. Les URL GitHub servent les mêmes fichiers que les sites et restent accessibles quand le réseau d'un agent est filtré&#8239;:

| Fichier | Source (site) | Source (GitHub brut) |
| --- | --- | --- |
| `reset.css` | `https://reset.alsacreations.com/public/reset.css` | `https://raw.githubusercontent.com/alsacreations/reset/main/public/reset.css` |
| `print.css` | `https://reset.alsacreations.com/public/print.css` | `https://raw.githubusercontent.com/alsacreations/reset/main/public/print.css` |
| `natives.css` | `https://knacss.com/css/natives.css` | `https://raw.githubusercontent.com/alsacreations/knacss/master/public/css/natives.css` |
| `layouts.css` | `https://bretzel.alsacreations.com/` | `https://raw.githubusercontent.com/alsacreations/bretzel/refs/heads/main/public/layouts.css` |

1. `app.css` — contenu de référence (identique à celui généré par Primary). Le `@layer` doit rester en tête, immédiatement suivi d'un bloc ininterrompu de `@import`&#8239;: un `@import` placé avant le `@layer` invalide silencieusement tous ceux qui suivent.

```css
/* L'ordre des layers définit la priorité des styles */

/* Chaque layer écrase le précédent si conflit */
@layer config, base, components, utilities;

/* Custom media queries (hors layers, requises avant leur utilisation) */
@import "custom-media.css";

/* Config */
@import "reset.css" layer(config);
@import "natives.css" layer(config);
@import "layouts.css" layer(config);
@import "theme.css" layer(config);

/* Base */
@import "styles.css" layer(base);

/* Utilities */
@import "print.css" layer(utilities);
@import "utilities.css" layer(utilities);
```

1. WordPress uniquement — générer `theme.json` à partir des mêmes primitives et tokens&#8239;:

```bash
node /tmp/primary/scripts/generateThemeJson.js --in /tmp/primary-out --out <theme>/theme.json
```

Les feuilles de styles des composants vont dans le layer `components`. Points de rupture&#8239;: utiliser les custom media de `custom-media.css` (`@media (--md)`, `@media (--until-lg)`…), compilés par `postcss-custom-media`.

## 4. Vérifier

- `pnpm dev` démarre, `pnpm build` produit `dist/` sans erreur.
- `pnpm exec prettier --check .` et `pnpm exec stylelint "**/*.css"` passent sur les fichiers du projet (les fichiers externes `reset.css`, `print.css`, `natives.css` et `layouts.css` ne sont pas concernés et ne doivent pas être modifiés).
- Dans VS Code&#8239;: installer les extensions recommandées (`.vscode/extensions.json`), puis «&#8239;Reload Window&#8239;» pour activer les linters.

## Nuxt

Nuxt embarque Vite. Après `pnpm create nuxt@latest <nom>`&#8239;:

- Créer dans `app/`&#8239;: `assets/`, `components/`, `layouts/`, `pages/`.
- `app/app.vue`&#8239;:

```html
<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- `app/layouts/default.vue`&#8239;: en-tête (composant), `<NuxtPage />`, pied de page (composant).
- Kit CSS (étape 3) dans `app/assets/styles/`, déclaré dans `nuxt.config.ts`&#8239;: `css: ['~/assets/styles/app.css']`.
- Conventions Vue/Nuxt&#8239;: voir [Vue.js et Nuxt](../guidelines/vue.md).

## Options selon les projets

- **Sass**&#8239;: `pnpm add -D sass`, puis renommer `styles.css` en `styles.scss` et adapter l'import.
- **Alpine.js**&#8239;: `pnpm add alpinejs`.
- **Docker** (recette, préproduction)&#8239;: ajouter `Dockerfile` et `docker-compose.yml` à partir des exemples et les adapter.
- **Hébergement statique S3** (Vue/Nuxt)&#8239;: voir [AWS S3](aws-s3.md).

---

## Voir aussi

- [CSS](../guidelines/css.md) — Architecture, layers, design tokens, Bretzel.
- [Starter Vite](vite.md) — Configuration Vite détaillée.
- [Visual Studio Code](../guidelines/vscode.md) — Réglages et extensions.
- [Git](../guidelines/git.md) — Conventions de commit.
- [WordPress — Environnement](../guidelines/wordpress/environnement.md) — Docker, Composer, WordPlate.
