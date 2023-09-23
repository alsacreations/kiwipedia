# Guidelines Tailwind CSS

Statut : Candidate Recommendation (CR)

Tailwind est un framework CSS qui adopte une approche "atomique" de CSS, comprendre qu'à chaque classe correspond une action et une seule.

- Pour tester Tailwind en ligne : [https://play.tailwindcss.com/](https://play.tailwindcss.com/)
- La documentation de Tailwind : [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

**Sommaire :**

- [Introduction](#introduction)
- [Installation et environnement](#installation-et-environnement)
- [Configuration](#configuration-de-tailwind)
- [Usage et bonnes pratiques](#usage-et-bonnes-pratiques)
- [Configuration avancée](#configuration-avancée)

## Introduction

Tailwind est un framework CSS fondé sur une [méthodologie "utilitaire"](https://www.alsacreations.com/tuto/lire/1812-Tailwind-CSS-decouverte-du-framework-original-et-innovant.html) (classes atomiques)

Ce que [Tailwind](https://tailwindcss.com/) fait très bien :

- Gérer les classes utilitaires (espacements, polices, couleurs, etc.)
- S'adapter à différents contextes (responsive, survol/focus, dark mode, etc.)

Ce que Tailwind fait mal (ou ne fait pas du tout) :

- De nombreuses propriétés CSS sont "inadaptées" à Tailwind (transitions, animations, filtres, transformations, grilles, etc.)
- De nombreux pseudo-éléments ou pseudo-classes n'existent pas dans Tailwind
- Tailwind devient vite une usine à gaz si l'on veut *"tout faire via Tailwind"*. Par exemple, quel être humain normalement constitué est instinctivement à l'aise avec `class="bg-gradient-to-r from-red-500/50/[0.31] via-indigo-700 items-baseline backdrop-invert-0 md:row-start-5 sm:content-around leading-snug dark:tracking-wider placeholder-gray-50::placeholder"` ?

Les classes utilitaires sont une bénédiction sur des gros projets, longs, avec de multiples participants *(notre projet KNACSS, initié en 2012 sous forme de simple fichier Reset.css est devenu de plus en plus cohérent avec la philosophie de Tailwind... en ce qui concerne les classes utilitaires en tout cas)*.

**En bref : utilisons Tailwind pour ses bons côtés et ne nous forçons pas à utiliser Tailwind pour ce qu'il ne fait pas bien.**

## Installation et environnement

De manière générale, sauf exceptions, Tailwind sera installé et configuré à la racine du projet. Il sera donc toujours placé dans le dossier `node_modules`, au même titre que les autres packages potentiels.

### Wordplate - WordPress

1. Installer les dépendances NPM `npm install -D tailwindcss postcss autoprefixer`.
2. Créer un fichier de config avec `npx tailwindcss init` vierge si possible.
3. Configurer les fichiers qui seront à observer dans la configuration JS.
4. Dans le fichier `webpack.mix.js` ajouter Tailwind au build postcss. TODO: nous utilisons Vite désormais.
5. Enfin dans `resources\styles\app.css`, ajouter Tailwind.

#### *tailwind.config.js* (pour WordPlate/WordPress)

```js
content: ['public/theme/**/*.php', 'public/theme/**/*.twig', 'public/theme/**/*.js']
```

#### *webpack.mix.js*

```js
mix.postCss("resources/css/app.css", "public/css", [
  require("tailwindcss")
])
```

#### _resources\styles\app.css

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Vue - Nuxt

> NOTE: Ne pas dire **Oui** quand Nuxt propose d'installer Tailwind automatiquement. On le fait nous même pour éviter tout soucis de compatibilité.

1. Installer les dépendances NPM `npm install -D tailwindcss postcss@latest autoprefixer@latest @nuxt/postcss8`.
2. Créer un fichier de config avec `npx tailwindcss init` vierge si possible.
3. Configurer les fichiers qui seront observés dans `tailwind.config.js` dans le tableau `content`.
4. Ajouter `'@nuxt/postcss8'` aux `buildModules` de Nuxt.
5. Ajouter les styles `@utilities`, `@base`, `@components` dans le fichier de styles principal.

#### *tailwind.config.js* (pour Vue/Nuxt)

```js
content: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.js']
```

#### *nuxt.config.js*

```js
buildModules: ['@nuxt/postcss8']
```

#### *assets/css/app.css*

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Environnement de travail et outils recommandés

Tailwind, pour plus de plaisir, nécessite d'être associé à un environnement de travail et un workflow adaptés. Nous utilisons Visual Studio Code et **[Tailwind CSS intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)** offrant une auto-complétion ainsi qu'une *tooltip* au survol des classes.

⚠️ Tailwind apporte son lot de directives sous forme de règles-at spécifiques (`@apply`, `@layer`, `@screen`, `@variants`, etc.) pouvant être pointées du doigt par les Linters CSS. Stylelint est notre formateur (unique) : les linters natifs CSS (css.validate) et scss (scss.validate) **doivent être désactivés** dans [.vscode/settings.json](assets/.vscode/settings.json). Nous configurons spécifiquement Stylelint (dans [`stylelint.config.js`](assets/stylelint.config.js)) pour ignorer les règles-at inconnues avec `at-rule-no-unknown`. De cette manière, nos Linters CSS ne déclenchent aucun avertissement ni erreur lorsqu'ils croisent les règles-at de Tailwind, et nous n'avons pas besoin d'utiliser [Tailwind Loves Sass](https://www.npmjs.com/package/tailwind-loves-sass).

### Ré-ordonner les classes dans le HTML

Le plugin [ESLint-plugin-tailwindCSS](https://www.npmjs.com/package/eslint-plugin-tailwindcss) permet de configurer finement Tailwind au sein d'un projet. Notamment de pouvoir ré-ordonner les classes pour offrir plus de consistance.

Se référer à la [Documentation d'installation](https://www.npmjs.com/package/eslint-plugin-tailwindcss#installation) du plugin.

## Configuration de Tailwind

### Le fichier `tailwind.config.js`

Ce fichier contient toutes les centaines de déclarations de couleurs, de tailles, de polices, etc. du framework Tailwind qu'il est possible d'**étendre** ou d'**écraser**.

Pour éviter la présence de centaines de valeurs inutiles (et hors charte graphique), qui pollueront les outils d'auto-complétion, nous **écrasons** toujours la configuration de Tailwind pour les thématiques suivantes, dans cet ordre&nbsp;:

- `screens` : points de rupture
- `colors` : Les couleurs de la charte graphique
- `spacing` : Les valeurs d'espacement (marges, padding, width, height, etc.)
- `fontFamily` : Les familles de police et alternatives
- `fontWeight` : Les graisses de police
- `fontSize` : Les tailles de police
- `zIndex` : Les niveaux d'empilement
- Le `content` (fichiers destinés à être [obervés par Tailwind](https://tailwindcss.com/docs/content-configuration))

Ces aspects sont différents à chaque projet et sont donc nécessaires à configurer. Il en résultera un fichier CSS optimisé.

Concrètement, nous renseignons notre palette de couleurs ainsi :

```yaml
theme: {
  colors: {
    // Ici la palette de couleurs de notre projet
    'canary': '#C8FA64', // liens, icônes
  }
}
```

Pour les styles qui doivent conserver l'existant de Tailwind et se contenter d'ajouter des règles/valeurs supplémentaires, nous **étendons** au sein de `theme.extend` :

```yaml
theme: {
  extend: {
    gridColumnEnd: {
      'last': '-1'
    },
    gridTemplateColumns: {
      inherit: 'inherit'
    }
  }
}
```

**Écraser** les propriétés les plus utilisées et **étendre** uniquement celles nécessaires permet d'alléger significativement le fichier CSS final.

### Remarque concernant `content`

Tailwind dispose d'un outil permettant de ne générer que les classes CSS utilisées. **Ce mécanisme est primordial et allège considérablement le poids des fichiers qui ne contiendra pas toutes les classes de Tailwind disponibles**.

Sont observés par défaut :

- Tous les styles Tailwind du fichier `tailwind.config.js`
- Tous les styles déclarés via `@apply`
- Tous les styles encadrés par une règle `@layer`

Ne sont pas observés par défaut (et seront donc toujours générés) :

- Tous les styles additionnels "classiques" (fichiers `app.css`, `custom.scss`, etc.). *Ces styles sont, par ailleurs, déclarés à la suite des styles Tailwind et les écrasent.*

Dans des projets VueJS / Nuxt, il est important d'inclure dans `content` (au début de `tailwind.config.js`) les fichiers `.vue` car ils contiennent eux-aussi des styles CSS&nbsp;:

```yaml
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ]
}
```

**Particularité :** `content` va chercher toutes les classes `Tailwind` dans nos fichiers et ne comprend pas une classe dynamique comme `“text-”~variable`.

Il est obligatoire (dans le cas d’une classe `Tailwind`) de faire apparaître explicitement la classe entière.

```html
❌
<div class="text-{{  error ? 'red-500' : 'blue-500' }}"></div>
✅
<div class="{{  error ? 'text-red-500' : 'text-blue-500' }}"></div>
```

### Remarque concernant les Breakpoints

La liste de points de rupture (breakpoints) recommandée est proposée sous forme de couple "clé:valeur" et peut bien entendu être élargie&nbsp;:

```scss
screens: {
  'small': { 'max': '575px' }, // => @media (max-width: 575)
  'sm': '576px', // => @media (min-width: 576)
  'md': '992px', // => @media (min-width: 992)
  'lg': '1400px' // => @media (min-width: 1400)
},
```

Conformément à la démarche "Mobile First", ces valeurs correspondent à des jalons minimum : `sm: '576px'` correspond au Media Query `@media (min-width: 576px) {...}`.

### Remarque concernant les valeurs de `spacing` et `fontSize`

Pour être les plus intuitives possibles, les valeurs d'espacement et de tailles de polices correspondent à un "équivalent en pixel". Par exemple la valeur "20" dans `text-20` vaut 1.25rem et est calculée pour être équivalente à 20px.

```yaml
fontSize: {
  0: '0',
  14: '0.875rem', // Note humoristique (corps de la page)
  16: '1rem', // base, texte
  20: '1.25rem', // Titre H4 desktop
  24: '1.5rem', // quotes
  30: '1.875rem', // Titre H3 desktop
  40: '2.5rem', // Titre H2 desktop
  80: '5rem', // Titre H1 desktop
  'base': '1rem'
},
```

### Remarque concernant les valeurs de `z-index`

Les paliers d'empilements conservent des noms agnostiques (`low` et non `navigation`) pour être totalement dissociés d'un quelconque contexte.

```yaml
zIndex: {
  'negative': '-10', // blobs
  'null': '0',
  'lowest': '10', // glass-layer
  'low': '20', // navigation
  'medium': '30',
  'high': '40',
  'highest': '50', // burger button
  'auto': 'auto'
},
```

## Usage et bonnes pratiques

Il existe trois manières d'appliquer des styles CSS dans un projet Tailwind :

1. Dans le Template HTML *(Tailwind)* (ex. `<blockquote class="font-comic sm:text-20 md:text-24 md:text-center">`)
2. Dans le (S)CSS via `@apply` *(Tailwind)* (ex. `@apply sm:grid relative col-start-3 sm:grid-cols-2 gap-5 sm:gap-x-20 sm:gap-y-10 lg:gap-x-40;`)
3. Dans le (S)CSS via... des propriétés CSS *(pas Tailwind)*

**Bien que la "philosophie" de Tailwind consiste à écrire tous les styles sous forme de classes au sein du template (HTML, Vue), nous pensons que cela n'est pas toujours pertinent et préconisons de réserver les classes HTML pour les styles purement utilitaires (marges, polices, couleurs, etc.).**

Nous appliquons donc généralement les styles ainsi :

- Les **Composants** sont stylisés dans la partie `<style>` de leur page `.vue`, à l'exception des variantes en classes utilitaires (voir exemple concret plus loin)
- Les **Styles globaux** (body, liens, titres, etc.) ainsi que les **Layouts** (grilles) sont stylisés dans un fichier `app.scss`

De manière générale la syntaxe via `@apply` est bien moins verbeuse que la version CSS "classique", notamment lorsque le contexte change (media-query, survol, dark mode, etc.). Elle est donc à privilégier.

**Usage pertinent de classes dans le HTML :** Les styles utilitaires (marges, couleurs, tailles de police). Par exemple : des paragraphes, des blocs à décaler, à modifier selon les contextes.

**Usage pertinent de styles via `@apply` :** Les styles récurrents sur des éléments HTML de base (`body`, niveaux de titres, liens, etc.).

**Usage pertinent de CSS "classique" :** Des parties de Layout, les grilles de mise en forme ainsi que toutes les fonctionnalités spécifiques, complexes ou impossibles à reproduire via Tailwind&nbsp;:

- Grid Layout
- transitions / animations
- dégradés
- ombrages
- filtres / `backdrop-filter`
- `:not()`, `:first-child`, `:nth-child()`, `:empty` et autres pseudo classes
- `::before` / `::after` et autres pseudo-éléments
- `calc()`
- `clip()`
- etc.

## Dans le détail : un Composant

Un Composant est un élément généralement réutilisable à divers endroits du projet. Celui-ci dispose d'une **classe sémantique identique à son nom de fichier** (ex. `class="nav-socials"` pour le composant `NavSocials.vue`)

Il est inséré au sein d'une page via `<NavSocials></NavSocials>`.

Les bonnes pratiques suivantes doivent cependant être respectées tant que possible&nbsp;:

1. Attribuer un nom de classe sémantique au composant (ex. `.nav-socials`).
2. Lister des classes Tailwind de façon **organisée**, c'est-à-dire regrouper les classes en fonction de leur utilité par ordre d'importance (l'esthétique à la fin).
3. Attribuer des noms de classes aux éléments à cibler en CSS et **n'utiliser que des sélecteurs de classes** si possible, pas de sélecteurs composés (utiliser `.nav-socials-link` et jamais `.nav-socials a`).
4. **Un Composant nécessitant des variantes ou modificateurs (marges, padding, gouttières, couleurs, etc.) disposera de classes utilitaires Tailwind lors de son insertion (`<NavSocials class="mt-60 gap-10 md:gap-20 lg:gap-32"></NavSocials>`)**.
5. **Préciser le langage des styles** quand Sass est employé (`<style lang="scss">`) pour éviter d'affoler les Linters.
6. Englober les styles de composants au **sein d'un layer** (`@layer components {}`) pour éviter d'écraser les styles utilitaires.

```html
<!-- partie Template du fichier NavSocials.vue -->
<template>
  <ul class="nav-socials">
    <li class="nav-socials-item">
      <a class="nav-socials-link"
        href="">Nos actualités</a>
    </li>
    <li class="nav-socials-item px-12 sm:px-20 md:px-32">
      <a class="nav-socials-link"
        href="">Facebook</a>
    </li>
    <li class="nav-socials-item mt-24">
      <a class="nav-socials-link text-black bg-white dark:text-white dark:bg-black"
        href="">Github</a>
    </li>
  </ul>
</template>
```

```html
<!-- partie <style></style> du fichier NavSocials.vue -->
<style lang="scss">
@layer components {

  .nav-socials {
    @apply flex justify-center flex-wrap;
  }

  .nav-socials-item {
    @apply flex items-center;
  }

  .nav-socials-link {
    @apply font-medium font-body;

    &:hover, &:focus {
      @apply no-underline;
    }
  }
}
</style>
```

## Configuration avancée

Le fichier Tailwind se charge d'importer 3 fichiers principaux.

```scss
// Fichier `tailwind.css`
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Remarque :** le layer `base` contient un fichier reset (Modern Normalize) lui-même [modifié par Tailwind](https://tailwindcss.com/docs/preflight).

Le fichier [alsa-TW-Reset](assets/vue-nuxt-front-end/alsa-tw-reset.scss) apporte des styles complémentaires (fix, accessibilité, print) que nous estimons nécessaires.

```scss
// Fichier `app.css`
@layer base {
  @import "alsa-tw-reset.scss";
  @import "fonts.scss";
}

/* ------------------------------------- */
/* Styles personnalisés                  */
@layer base {
  ...
}
```

### Ajouter une nouvelle valeur

-> tailwind.config.js

### Ajouter une nouvelle classe utilitaire

```css
@layer utilities {
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}
```

### Directives Tailwind

En plus de `@apply`, Tailwind CSS propose plusieurs directives intéressantes.

#### `@layer`

L'ensemble des styles CSS "classiques" sont placés au sein des différentes couches (layer) Tailwind que sont "base", "components" et "utilities".

Ceci a l’avantage de générer des classes au même niveau d'importance que celles de Tailwind.

```scss
@layer component {
  .mon-composant {
    
  }
}
```

#### `@screen`

La directive `@screen` simplifie significativement la lecture des media queries. Elle est vivement conseillée.

Version via Media Query classique :

```scss
body {
  @apply bg-white;

  @media (max-width: theme("screens.lg")) {
    @apply bg-pink;
  }
}
```

Version avec `@screen` :

```scss
body {
  @apply bg-white;

  // => @media (min-width: "lg")
  @screen lg {
    @apply bg-pink;
  }
}
```

**Remarque :** Le mécanisme classique des Media Queries dans Taiwlind est "Mobile First", la détection est donc en mode `min-width:`, maisl il est également possible de cibler via `max-width:`.

Pour ce faire, déclarer la valeur de breakpoint dans `tailwing.config.js` (ici `small`)&nbsp;:

```yaml
theme: {
  screens: {
    'small': { 'max': '575px' }
  }
}
```

Puis utiliser `small` comme n'importe quelle autre valeur :

```scss
body {
  @apply bg-white;

  // => @media (max-width: 575)
  @screen small {
    @apply bg-pink;
  }
}
```

#### `@variants`

Cette directive peut générer toutes les classes `responsive`, `hover`, `focus` pour une classe personnalisée. Elle devient utilisable de la même manière que celles de Tailwind avec les préfixes `md:`, `hover:`, `focus:`.

Elles seront de préférence dans le layer `utilities`.

```scss
@layer utilities {
  @variants responsive, hover, focus {
    .mon-utility {
      @apply bg-pink;
    }
  }
}
```

**Note:** Ces classes sont indépendantes, il est impossible d'avoir une classe  `color: red;` mais qui devient `color: blue`; à partir d'un autre breakpoint.

Le principe général est qu'`une propriété CSS = une fonction`. Donc à partir du moment où notre classe nécessite plus d'une propriété CSS, elle devient un **Component**.

Les préfixes `sm`, `md`, `hover`, `focus`, … sont donc des switchs `on`/`off` pour une seule utilité.

Ex: `sm:text-blue-500 md:text-red-500`
