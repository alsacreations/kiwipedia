# Tailwind CSS : bonnes pratiques d'intégration

## Tailwind : un framework "utilitaire" avant tout

Ce que Tailwind fait de bien :

- Le principe des classes utilitaires (espacements, polices, couleurs, etc.)
- L'adaptativité à différents contextes (responsive, survol/focus, dark mode, etc.)

Ce que Tailwind fait de mal (ou ne fait pas du tout) :

- De nombreuses propriétés CSS (transitions, animations, filtres, transformations, etc.)
- De nombreux pseudo-éléments ou pseudo-classes
- Il vite une usine à gaz si l'on veut "tout faire via Tailwind" <br>Par exemple, quel être humain normalement constitué est instinctivement à l'aise avec `class="bg-gradient-to-r from-red-500/50/[0.31]"`&nbsp;?

## Pourquoi on utilise Tailwind chez Alsacréations&nbsp;?

Les classes utilitaires sont une bénédiction sur des gros projets, longs, avec de multiples participants *(notre projet KNACSS, initié en 2012 sous forme de simple fichier Reset.css est devenu de plus en plus cohérent avec la philosophie de Tailwind... en ce qui concerne les classes utilitaires en tout cas)*.

Tailwind, associé à un environnement de travail et un workflow adaptés (VS Code, Intellisense, auto-complétion, coloration syntaxique, etc.) apporte plus de bénéfices que d'inconvénients.

**En bref : utilisons Tailwind pour ses bons côtés et ne nous forçons pas à utiliser Tailwind pour ce qu'il ne fait pas bien.**

## Préambule important : l'environnement de travail

Nous utilisons VS Code et l'extension VSCode [Tailwind CSS intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).

Tailwind apporte son lot de règles-at spécifiques (`@apply`, `@layer`, `@screen`, etc.) pouvant être pointées du doigt par les Linters CSS.

Stylelint est notre formatteur (unique) pour les styles CSS et scss du projet. <br>Les Linters natifs CSS et scss de VSCode **doivent être désactivés** dans la configuration `settings.json`&nbsp;:

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

Nous configurons Stylelint pour ignorer les règles-at inconnues :

```json
'at-rule-no-unknown': [
  true,
  {
    'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'layer', 'extends', 'apply', 'tailwind']
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

Tailwind dispose d'un outil de Purge consistant à supprimer toutes les règles et déclarations CSS non utilisées dans le projet compilé. **Ce mécanisme est primordial et allège considérablement le poids des fichiers (de l'ordre de plusieurs Mo!)**.

Sont purgés par défaut :

- Tous les styles Tailwind du fichier `tailwind.config.js`
- Tous les styles déclaré via `@apply`
- Tous les styles encadrés par une règle `@layer`

Ne sont pas purgés par défaut :

- Tous les styles additionnels "classiques" (fichiers `app.css`, `custom.scss`, etc.).

Dans des projets VueJS / Nuxt, il est important d'inclure dans la Purge les fichiers `.vue` car ils contiennent eux-aussi des styles CSSd&nbsp;:

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

## Comment appliquer les classes TW ?

Il existe trois manières d'appliquer des styles CSS dans un projet Tailwind :

1. Dans le HTML *(Tailwind)*
2. Dans le (S)CSS via `@apply` *(Tailwind)*
3. Dans le (S)CSS via... des propriétés CSS *(pas Tailwind)*

### Dans le HTML

Exemple d'usage dans une classe Tailwind : `<blockquote class="font-comic sm:text-20 md:text-24 md:text-center">`

**Usage pertinent :** des éléments peu déterminants, nécessitant simplement des classes utilitaires (marges, couleurs, tailles de police). Par exemple : des paragraphes, des blocs à décaler

**Usage pertinent :** un Composant (unique ou réutilisable) tel que Navigation, Breadcrumb, Card, Pagination, Header, Footer, Taglist, Bouton, etc.

Concrètement, concernant les Composants :

- Celui-ci dispose d'une classe sémantique identique à son nom de fichier (ex. `class="nav-socials"` pour le composant `NavSocials.vue`)
- Les styles de structure inhérents à ce composant sont à placer en (S)CSS "classique" dans l'élément `<style>`. Par exemple : `.nav-socials { display: flex; justify-content: center; flex-wrap: wrap;}`
- Les styles de structure des descendants sont également renseignés en CSS dans l'élément `<style>`, par exemple `.nav-social-item`, `.nav-social-link`.
- Les classes utilitaires et modificateurs (marges, padding, gouttières, couleurs, etc.) sont à placer dans le HTML car susceptibles d'être modifiés selon les contextes, par exemple `class="nav-socials mt-60 gap-10 md:gap-20 lg:gap-32"`

### Dans le (S)CSS via `@apply`

Exemple d'usage dans un fichier CSS via `@apply` :

```scss
.grid-2 {
  @apply sm:grid relative col-start-3 sm:grid-cols-2 gap-5 sm:gap-x-20 sm:gap-y-10 lg:gap-x-40;
}
```

**Usage pertinent :** Des parties de Layout, les grilles de mise en forme.

Par exemple :

```scss
.grid-wrapper {

    @media (min-width: theme("screens.lg")) {
      grid-template-columns: minmax(theme("spacing.20"), 1fr)
        theme("spacing.60")
        minmax(auto, theme("screens.lg"))
        theme("spacing.60")
        minmax(theme("spacing.20"), 1fr);
    }
  }
```

**Usage pertinent :** Des styles sur des éléments HTML de base.

Exemple (dans le fichier `app.scss`):

```scss
@layer base {

  body {
    @apply text-base leading-relaxed font-body font-medium bg-white dark:bg-gray-dark text-gray-dark dark:text-white;
  }

  a {
    @apply text-base font-heading font-extrabold underline;

    &:hover, &:focus {
      @apply no-underline;
    }
  }
}
```

### Dans le (S)CSS via... des propriétés CSS

Exemple d'usage dans un fichier CSS ou `.vue` :

```scss
@media (min-width: theme("screens.md")) {

  .glass-layer {
    width: calc(100% - theme("spacing.40"));
  }
}
```

**Usage pertinent :** toutes les fonctionnalités spécifiques, complexes ou impossibles à reproduire via Tailwind :

- transitions / animations
- dégradés
- ombrages
- filtres / `backdrop-filter`
- `:not()`, `:first-child`, `:nth-child()`, `:empty` et autres pseudo classes
- `::before` / `::after` et autres pseudo-éléments
- `calc()`
- `clip()`
- etc.

### Privilégier `@apply` ou des styles CSS "classiques" ?

De manière générale la syntaxe via `@apply` est bien moins verbeuse que la version "classique", notamment lorsque le contexte change (media-query, survol, dark mode, etc.).

Elle est donc à privilégier, comme le montre l'exemple ci-dessous.

Version `@apply` :

```scss
.footer {
  @apply ml-10 md:ml-20 bg-white text-gray-dark dark:bg-gray-dark dark:text-white;
}
```

Équivalent en version Scss :

```scss
.footer {
  margin-left: theme("spacing.10");
  color: theme("colors.gray-dark");
  background-color: theme("colors.white");

  @media (min-width: theme("screens.md")) {
    margin-left: theme("spacing.20");
  }

  .dark & {
    color: theme("colors.white");
    background-color: theme("colors.gray-dark");
  }
}
```

## Nommage et organisation

L'extension VSCode [Tailwind CSS intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) offre une auto-complétion ainsi qu'une tooltip au survol des classe bien pratique, mais nous observons deux principes supplémentaires :

1. Nous appliquons une classe sémantique permettant d’identifier le contexte de l’élément, cela rendra la lecture du HTML plus simple. Toujours en début d’attribut class. Ex: `<ol class="breadcrumb-group leading-none small:my-10">`

2. Notre liste de classe est être organisée, c'est-à-dire, regrouper les classes en fonction de leur utilité par ordre d'importance (l'esthétique à la fin). Nous faisons donc référence à nos Guidelines CSS pour cela.

## Ajouter une nouvelle valeur

-> tailwind.config.js

## Ajouter une nouvelle classe utilitaire

1. Dans un fichier CSS, "à la Tailwind" :

```scss
@include layer('utilities') {
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

## Des questions ?

Quelle Différence entre `.visually-hidden {...}` et `@layer utilities { .visually-hidden {...} }`

La première règle n'est pas "gérée" par Tailwind, elle sera déclarée (et appliquée) après les fichiers Tailwind (donc va les écraser systématiquement). De plus, ces styles ne seront pas comptabilisés parmi ceux pouvant être purgés, et le poids du fichier CSS final s'en ressentira.
