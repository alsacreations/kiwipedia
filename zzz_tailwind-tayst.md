# Tailwind : Guidelines d'intégration au quotidien

TODO: TODOOOOO:

## Utilitaire avant tout

- Tailwind c'est bien pratique
- Tailwind c'est une belle grosse usine à gaz
- ... et Devient de plus en plus usine à gaz (pseudo-éléments, :first-letter, :checked, selection et plein de nouveaux sélecteurs). <br>Par exemple, quel être humain est instinctivement à l'aise avec `class="bg-gradient-to-r from-red-500/50/[0.31]"` ?

- BAD : transitions, animations, filtres, transformations, backdrop, text clip, marsking
- GOOD : utilities (espacements, polices, couleurs), adaptativité (responsive, survol, dark mode)

Les classes utilitaires sont une bénédictions sur des gros projets, longs, avec de multiples participants *(notre projet KNACSS, initié en 2012 sous forme de simple fichier Reset.css est devenu de plus en plus cohérent avec la philosophie de Tailwind... en ce qui concerne les classes utilitaires en tout cas)*.

**En bref : utilisons Tailwind pour ses bons côtés et ne nous forçons pas à utiliser Tailwind pour ce qu'il ne fait pas bien.**

## Préambule important : l'environnement de travail

Nous utilisons VS Code et l'extension VSCode [Tailwind CSS intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).

Tailwind apporte son lot de règles-at spécifiques (`@apply`, `@layer`, `@screen`, etc.) pouvant être pointées du doigt par les Linters CSS.

Stylelint est notre formatteur (unique) pour les styles CSS et scss du projet. <br>Les Linters natifs CSS et scss de VSCode **doivent être désactivés** (voir précédemment).

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
    // Configure your color palette here
  }
}
```

Pour les thématiques qui doivent conserver l'existant de Tailwind et se contenter d'ajouter des règles/valeurs supplémentaires, nous **étendons** au sein de `theme.extend` :

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

### Remarque concernant les valeurs de `spacing` et `fontSize`

Pour être le plus intuitif possible, les valeurs d'espacement et de tailles de polices correspondent à un "équivalent en pixel". <br>Par exemple la valeur "20" dans `text-20` vaut 1.25rem et est calculée pour être équivalente à 20px.

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

**Usage pertinent :** des éléments peu déterminants, nécessitant simplement des classes utilitaires

**Usage pertinent :** un Composant

### Dans le (S)CSS via `@apply`

Exemple d'usage dans un fichier CSS via `@apply` :

```scss
.grid-2 {
  @apply sm:grid relative col-start-3 sm:grid-cols-2 gap-5 sm:gap-x-20 sm:gap-y-10 lg:gap-x-40;
}
```

**Usage pertinent :** Des parties de Layout, les grilles de mise en forme

**Usage pertinent :** Des styles qui se répètent

### Dans le (S)CSS via... des propriétés CSS

Exemple d'usage dans un fichier CSS ou `.vue` :

```scss
@media (min-width: theme("screens.md")) {

  .glass-layer {
    width: calc(100% - theme("spacing.40"));
  }
}
```

**Usage pertinent :** les transitions, les animations, les dégradés et autres fonctionnalités très spécifiques (filtres, `calc()`, pseudo-éléments, etc.) seront à écrire dans un fichier CSS à part. De cette manière nous évitons une pollution du code importante.

## Nommage et organisation

L'extension VSCode [Tailwind CSS intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) offre une auto-complétion ainsi qu'une tooltip au survol des classe bien pratique, mais nous observons deux principes supplémentaires :

1. Nous appliquons une classe sémantique permettant d’identifier le contexte de l’élément, cela rendra la lecture du HTML plus simple. Toujours en début d’attribut class. Ex: `<ol class="breadcrumb-group flex flex-wrap leading-none small:my-10">`

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

# DES QUESTIONS ?????

- Différence entre `.visually-hidden {...}`
- et `@layer utilities { .visually-hidden {...} }`

1er est déclaré après les fichiers TW + pas purgé

Quid de :

:not()
::before / ::after
calc())
clip
