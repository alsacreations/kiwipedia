# Guidelines Tailwind CSS

Statut : Candidate Recommendation (CR)

Tailwind est un framework CSS qui adopte une approche "atomique" de CSS, comprendre qu'à chaque classe correspond une action et une seule.

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
- Tailwind devient vite une usine à gaz si l'on veut *"tout faire via Tailwind"*. Par exemple, quel être humain normalement constitué est instinctivement à l'aise avec `class="bg-gradient-to-r from-red-500/50/[0.31] via-indigo-700 items-baseline backdrop-invert-0 md:row-start-5 sm:content-around leading-snug dark:tracking-wider placeholder-gray-50::placeholder"` ?

Les classes utilitaires sont une bénédiction sur des gros projets, longs, avec de multiples participants *(notre projet KNACSS, initié en 2012 sous forme de simple fichier Reset.css est devenu de plus en plus cohérent avec la philosophie de Tailwind... en ce qui concerne les classes utilitaires en tout cas)*.

**En bref : utilisons Tailwind pour ses bons côtés et ne nous forçons pas à utiliser Tailwind pour ce qu'il ne fait pas bien.**

## Installation et environnement

Nous suivons: <https://tailwindcss.com/docs/installation/framework-guides>

## Environnement de travail et outils recommandés

Tailwind, pour plus de plaisir, nécessite d'être associé à un environnement de travail et un workflow adaptés (VS Code, Intellisense, auto-complétion, coloration syntaxique, etc.).

Nous utilisons VS Code et l'extension **[Tailwind CSS intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)**. Cette extension offre une auto-complétion ainsi qu'une tooltip au survol des classe bien pratique.

Tailwind apporte son lot de directives sous forme de règles-at spécifiques (`@apply`, `@layer`, `@screen`, etc.) pouvant être pointées du doigt par les Linters CSS.

Stylelint est notre formateur pour les styles CSS et scss du projet. Les Linters natifs CSS et scss de VSCode **doivent être désactivés** dans la configuration VSCode `settings.json` :

```json
{
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.markdownlint": true,
    "source.fixAll.stylelint": true
  },
  "stylelint.enable": true,
  "css.validate": false,
  "scss.validate": false
}
```

De plus, nous configurons spécifiquement Stylelint (dans [`stylelint.config.js`](https://github.com/alsacreations/guidelines/blob/master/assets/stylelint.config.js)) pour ignorer les règles-at inconnues :

```json
'at-rule-no-unknown': [
  true,
  {
    'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'layer', 'extends', 'apply', 'tailwind', 'screen']
  }
]
```

De cette manière, nos Linters CSS ne déclenchent aucun avertissement ni erreur lorsqu'ils croisent les règles-at de Tailwind.

## Ré-ordonner les classes dans le HTML

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

### Remarque concernant `content`

Tailwind dispose d'un outil permettant de ne générer que les classes CSS utilisées. **Ce mécanisme est primordial et allège considérablement le poids des fichiers qui ne contiendra pas toutes les classes de Tailwind disponibles**.

Seront donc toujours générés:

- Tous les styles additionnels "classiques" (fichiers `app.css`, `custom.scss`, etc.). *Ces styles sont, par ailleurs, déclarés à la suite des styles Tailwind et les écrasent.*

**Particularité :** `content` va chercher toutes les classes Tailwind dans nos fichiers et ne comprend pas une classe dynamique comme `“text-”~variable`.

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
3. Dans le (S)CSS via... des propriétés CSS avec `padding: theme('spacing.5');`

**Bien que la "philosophie" de Tailwind consiste à écrire tous les styles sous forme de classes au sein du template (HTML, Vue), nous pensons que cela n'est pas toujours pertinent et préconisons de réserver les classes HTML pour les styles purement utilitaires (marges, polices, couleurs, etc.).**

Nous appliquons donc généralement les styles ainsi :

- Les **Composants** sont stylisés dans la partie `<style>` de leur page `.vue`, à l'exception des variantes en classes utilitaires (voir exemple concret plus loin)
- Les **Styles globaux** (body, liens, titres, etc.) ainsi que les **Layouts** (grilles) sont stylisés dans un fichier `app.scss`

**Usage pertinent de classes dans le HTML :** Les styles utilitaires (marges, couleurs, tailles de police). Par exemple : des paragraphes, des blocs à décaler, à modifier selon les contextes.

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

1. Attribuer un nom de classe sémantique au composant (ex. `.nav-socials`).
2. Lister des classes Tailwind de façon **organisée**, c'est-à-dire regrouper les classes en fonction de leur utilité par ordre d'importance (l'esthétique à la fin).
3. Attribuer des noms de classes aux éléments à cibler en CSS et **n'utiliser que des sélecteurs de classes** si possible, pas de sélecteurs composés (utiliser `.nav-socials-link` et jamais `.nav-socials a`).
4. **Un Composant nécessitant des variantes ou modificateurs (marges, padding, gouttières, couleurs, etc.) disposera de classes utilitaires Tailwind lors de son insertion (`<NavSocials class="mt-60 gap-10 md:gap-20 lg:gap-32"></NavSocials>`)**.

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
@import "alsa-tw-reset.scss";
@import "fonts.scss";

/* Styles personnalisés */
...
```

## Ressources complémentaires

- Pour tester Tailwind en ligne : [https://play.tailwindcss.com/](https://play.tailwindcss.com/)
- La documentation de Tailwind : [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
