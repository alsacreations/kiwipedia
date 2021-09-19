# Tailwind CSS : bonnes pratiques d'intégration

## Tailwind : un framework "utilitaire" avant tout

Ce que [Tailwind](https://tailwindcss.com/) fait bien :

- Le principe des classes utilitaires (espacements, polices, couleurs, etc.)
- L'adaptativité à différents contextes (responsive, survol/focus, dark mode, etc.)

Ce que Tailwind fait mal (ou ne fait pas du tout) :

- De nombreuses propriétés CSS sont "inadaptées" à Tailwind (transitions, animations, filtres, transformations, grilles, etc.)
- De nombreux pseudo-éléments ou pseudo-classes n'existent pas dans Tailwind
- Tailwind devient vite une usine à gaz si l'on veut *"tout faire via Tailwind"* <br>Par exemple, quel être humain normalement constitué est instinctivement à l'aise avec `class="bg-gradient-to-r from-red-500/50/[0.31] via-indigo-700 items-baseline backdrop-invert-0 md:row-start-5 sm:content-around leading-snug dark:tracking-wider placeholder-gray-50::placeholder"`&nbsp;?

## Pourquoi utilise-t-on Tailwind chez Alsacréations ?

Les classes utilitaires sont une bénédiction sur des gros projets, longs, avec de multiples participants *(notre projet KNACSS, initié en 2012 sous forme de simple fichier Reset.css est devenu de plus en plus cohérent avec la philosophie de Tailwind... en ce qui concerne les classes utilitaires en tout cas)*.

Tailwind, associé à un environnement de travail et un workflow adaptés (VS Code, Intellisense, auto-complétion, coloration syntaxique, etc.) apporte plus de bénéfices que d'inconvénients.

**En bref : utilisons Tailwind pour ses bons côtés et ne nous forçons pas à utiliser Tailwind pour ce qu'il ne fait pas bien.**

## Préambule important : l'environnement de travail

Nous utilisons VS Code et l'extension VSCode [Tailwind CSS intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).

Tailwind apporte son lot de directives sous forme de règles-at spécifiques (`@apply`, `@layer`, `@screen`, `@variants`, etc.) pouvant être pointées du doigt par les Linters CSS.

Stylelint est notre formatteur (unique) pour les styles CSS et scss du projet. <br>Les Linters natifs CSS et scss de VSCode **doivent être désactivés** dans la configuration VSCode `settings.json`&nbsp;:

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

De plus, nous configurons spécifiquement Stylelint (dans `stylelint.config.js`) pour ignorer les règles-at inconnues :

```json
'at-rule-no-unknown': [
  true,
  {
    'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'layer', 'extends', 'apply', 'tailwind', 'screen']
  }
]
```

De cette manière, nos Linters CSS ne déclenchent aucun avertissement ni erreur lorsqu'ils croisent les règles-at de Tailwind, et nous n'avons pas besoin d'utiliser [Tailwind Loves Sass](https://www.npmjs.com/package/tailwind-loves-sass).

## Le fichier `tailwind.config.js`

Ce fichier contient toutes les centaines de déclarations de couleurs, de tailles, de polices, etc. du framework Tailwind qu'il est possible d'**étendre** ou d'**écraser**.

Pour éviter la présence de centaines de valeurs inutiles (et hors charte graphique), qui pollueront les outils d'auto-complétion, nous **écrasons** toujours la configuration de Tailwind pour les thématiques suivantes, dans cet ordre&nbsp;:

- `screens` : points de rupture
- `colors` : Les couleurs de la charte graphique
- `spacing` : Les valeurs d'espacement (marges, padding, width, height, etc.)
- `fontFamily` : Les familles de police et alternatives
- `fontWeight` : Les graisses de police
- `fontSize` : Les tailles de police
- `zIndex` : Les niveaux d'empilement
- La purge (fichiers destinés à être [purgés par Tailwind](https://tailwindcss.com/docs/optimizing-for-production#basic-usage))

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

### Remarque concernant la Purge

Tailwind dispose d'un outil de Purge consistant à supprimer toutes les règles et déclarations CSS non utilisées dans le projet compilé. **Ce mécanisme est primordial et allège considérablement le poids des fichiers (de 3.5 Mo par défaut à quelques Ko)**.

Sont purgés par défaut :

- Tous les styles Tailwind du fichier `tailwind.config.js`
- Tous les styles déclarés via `@apply`
- Tous les styles encadrés par une règle `@layer`

Ne sont pas purgés par défaut :

- Tous les styles additionnels "classiques" (fichiers `app.css`, `custom.scss`, etc.). *Ces styles sont, par ailleurs, déclarés à la suite des styles Tailwind et les écrasent.*

Dans des projets VueJS / Nuxt, il est important d'inclure dans la Purge (au début de `tailwind.config.js`) les fichiers `.vue` car ils contiennent eux-aussi des styles CSS&nbsp;:

```yaml
module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ]
}
```

**Particularité :** Purge va chercher toutes les classes `Tailwind` dans nos fichiers et ne comprend pas une classe dynamique comme `“text-”~variable`.

Il est obligatoire (dans le cas d’une classe `Tailwind`) de faire apparaître explicitement la classe entière.

```html
❌
<div class="text-{{  error ? 'red-500' : 'blue-500' }}"></div>
✅
<div class="{{  error ? 'text-red-500' : 'text-blue-500' }}"></div>
```

### Remarque concernant les valeurs de `spacing` et `fontSize`

Pour être les plus intuitives possibles, les valeurs d'espacement et de tailles de polices correspondent à un "équivalent en pixel". <br>Par exemple la valeur "20" dans `text-20` vaut 1.25rem et est calculée pour être équivalente à 20px.

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

## Comment appliquer les classes Tailwind ?

Il existe trois manières d'appliquer des styles CSS dans un projet Tailwind :

1. Dans le Template HTML *(Tailwind)*
2. Dans le (S)CSS via `@apply` *(Tailwind)*
3. Dans le (S)CSS via... des propriétés CSS *(pas Tailwind)*

### Dans le HTML

Exemple d'usage dans une classe Tailwind : `<blockquote class="font-comic sm:text-20 md:text-24 md:text-center">`

### Dans le (S)CSS via `@apply`

Exemple d'usage dans un fichier CSS via `@apply` :

```scss
.grid-2 {
  @apply sm:grid relative col-start-3 sm:grid-cols-2 gap-5 sm:gap-x-20 sm:gap-y-10 lg:gap-x-40;
}
```

### Dans le (S)CSS via... des propriétés CSS

Exemple d'usage dans un fichier CSS ou la partie `<style></style>` d'un fichier `.vue` :

```scss
@screen md {

  .glass-layer {
    width: calc(100% - theme("spacing.40"));
  }
}
```

## Privilégier les classes HTML, `@apply` ou des styles CSS "classiques" ?

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

## Dans le détail : les éléments basiques

Ce sont les éléments que l'on retrouve maintes fois dans les documents (`body`, niveaux de titres, liens, etc.)

**Les styles des éléments basiques sont généralement appliqués via `@apply`** au sein d'un fichier `app.scss` :

```scss
// La règle @layer ajoute les styles dans la couche Tailwind "base". 
// Ceci leur permet d'être Purgés et de ne être déclarés en fin des fichiers CSS
// (ils n'écraseront pas les classes Tailwind utilitaires par exemple)
@layer base {

  body {
    // séparer en plusieurs apply selon les groupes de styles
    @apply text-base leading-relaxed font-body font-medium;
    @apply text-gray-dark dark:text-white;
    @apply bg-white dark:bg-gray-dark;
  }

  a {
    @apply text-base font-heading font-extrabold;
    @apply underline;

    &:hover, &:focus {
      @apply no-underline;
    }
  }
}
```

## Dans le détail : un élément de Layout

Un élément de Layout désigne une zone dépourvue de "sémantique", uniquement destinée à placer son contenu selon une grille ou un alignement spécifique.

**Les styles des éléments de Layout sont généralement appliqués via CSS "classique"** (car trop complexes pour être pris en compte par Tailwind entièrement) au sein d'un fichier `app.scss` :

Par exemple :

```scss
// Placer les styles de Layout au niveau des couches de base
@layer base {
// Donner un nom différent de la nomenclature Tailwind (pas de "grid-8" par ex.)
.layout-wrapper {

    @screen lg {
      grid-template-columns: minmax(theme("spacing.20"), 1fr)
        theme("spacing.60")
        minmax(auto, theme("screens.lg"))
        theme("spacing.60")
        minmax(theme("spacing.20"), 1fr);
    }
  }
}
```

Notons sur cet exemple la possibilité d'accéder aux variables Tailwind avec **`theme()`**.

Le principe est d'employer une notation d'objet JavaScript. Ex: `theme('spacing.64')` ou `theme('colors.blue.500')`.

Les valeurs sont séparées par des points (`.`) et non des traits d'union (`-`) dans cette notation.

## Dans le détail : un Composant

Un Composant est un élément généralement réutilisable à divers endroits du projet. Celui-ci dispose d'une **classe sémantique identique à son nom de fichier** (ex. `class="nav-socials"` pour le composant `NavSocials.vue`)

Il est inséré au sein d'une page via `<NavSocials></NavSocials>`.

```html
<!-- partie Template du fichier NavSocials.vue -->
<template>
  <ul class="nav-socials">
    <li class="nav-socials-item">
      <a class="nav-socials-link"
        href="">Nos actualités</a>
    </li>
    <li class="nav-socials-item">
      <a class="nav-socials-link"
        href="">Facebook</a>
    </li>
    <li class="nav-socials-item">
      <a class="nav-socials-link"
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

**Bonnes pratiques d'intégration des Composants :**

- Les styles sont généralement à déclarer via `@apply` **(pas de classes dans le template HTML)**
- Attribuer des noms de classes aux éléments à cibler en CSS et **n'utiliser que des sélecteurs de classes** si possible, pas de sélecteurs composés (utiliser `.nav-socials-link` et jamais `.nav-socials a`)
- **Un Composant nécessitant des variantes ou modificateurs (marges, padding, gouttières, couleurs, etc.) disposera de classes Tailwind lors de son insersion (`<NavSocials class="mt-60 gap-10 md:gap-20 lg:gap-32"></NavSocials>`)**
- **Préciser le langage des styles** quand Sass est employé (`<style lang="scss">`) pour éviter d'affoler les Linters
- Englober les styles de composants au **sein d'un layer** (`@layer components {}`) pour permettre la purge et éviter d'écraser les styles utilitaires

## Nommage et organisation

L'extension VSCode [Tailwind CSS intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) offre une auto-complétion ainsi qu'une tooltip au survol des classe bien pratique, mais nous observons deux principes supplémentaires :

Notre liste de classes Tailwind est **organisée**, c'est-à-dire que nous regroupons les classes en fonction de leur utilité par ordre d'importance (l'esthétique à la fin). Nous faisons donc référence à nos Guidelines CSS pour cela.

## Importer les styles dans un projet Tailwind

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

## Ajouter une nouvelle valeur

-> tailwind.config.js

## Ajouter une nouvelle classe utilitaire

1. Dans un fichier CSS, "à la Tailwind" :

```scss
@layer utilities {
  .visually-hidden {
    @include apply('absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0');
    clip: rect(0, 0, 0, 0);
  }
}
```

2. Dans un fichier CSS, en CSS "classique" :

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

## Directives Tailwind

En plus de `@apply`, Tailwind CSS propose plusieurs directives intéressantes.

### `@layer`

L'ensemble des styles CSS "classiques" sont placés au sein des différentes couches (layer) Tailwind que sont "base", "components" et "utilities".

Ceci a l’avantage de générer des classes au même niveau d'importance que celles de Tailwind et qui pourront être purgeables.

```scss
@layer component {
  .mon-composant {
    
  }
}
```

### `@screen`

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

### `@variants`

Cette directive peut générer toutes les classes `responsive`, `hover`, `focus` pour une classe personnalisée. Elle devient utilisable de la même manière que celles de Tailwind avec les préfixes `md:`, `hover:`, `focus:`.

Elles seront de préférence dans le layer `utilities`.

```scss
@layer utilities {
  @include variants('responsive, hover, focus') {
    .mon-utility {
      @apply bg-pink;
    }
  }
}
```

**Note:** Ces classes sont indépendantes, il est impossible d'avoir une classe  `color: red;` mais qui devient `color: blue`; à partir d'un autre breakpoint.

Le principe général est qu'`une propriété CSS = une fonction`. Donc à partir du moment où notre classe nécessite plus d'une propriété CSS, elle devient un **Component**.

Les préfixes `sm`, `md`, `hover`, `focus`, … sont donc des switchs `on/off` pour une seule utilité.

Ex: `sm:text-blue-500 md:text-red-500`
