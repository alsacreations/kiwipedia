# Guidelines : Tailwind CSS

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant **"Tailwind"**. Ces indications sont destinées à évoluer dans le temps et à s'adapter à chaque nouveau projet.

Tailwind est un framework CSS qui adopte une approche "atomique" de CSS, comprendre qu'à chaque classe correspond une action et une seule.

- Pour tester Tailwind en ligne : [https://play.tailwindcss.com/](https://play.tailwindcss.com/)
- La documentation de Tailwind : [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

**Sommaire :**

- [Usage et bonnes pratiques](#usage-et-bonnes-pratiques)
- [Configuration avancée](#configuration-avancée)

## Environnement de travail et outils recommandés

Tailwind, pour plus de plaisir, gagne à être associé à un environnement de travail et un workflow adaptés. Nous utilisons Visual Studio Code et **[Tailwind CSS intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)** offrant une auto-complétion ainsi qu'une _tooltip_ au survol des classes.

⚠️ Tailwind apporte son lot de directives sous forme de règles-at spécifiques (`@apply`, `@layer`, `@screen`, `@variants`, etc.) pouvant être pointées du doigt par les Linters CSS. Stylelint est notre formateur (unique) : les linters natifs CSS (css.validate) et scss (scss.validate) **doivent être désactivés** dans [.vscode/settings.json](assets/.vscode/settings.json). Nous configurons spécifiquement Stylelint (dans [`stylelint.config.js`](assets/stylelint.config.js)) pour ignorer les règles-at inconnues avec `at-rule-no-unknown`. De cette manière, nos Linters CSS ne déclenchent aucun avertissement ni erreur lorsqu'ils croisent les règles-at de Tailwind, et nous n'avons pas besoin d'utiliser [Tailwind Loves Sass](https://www.npmjs.com/package/tailwind-loves-sass).

### Ré-ordonner les classes dans le HTML

Le plugin [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) permet d'ordonner les classes utilitaires de Tailwind dans un ordre précis.

Se référer à la [Documentation d'installation](https://github.com/tailwindlabs/prettier-plugin-tailwindcss#installation) du plugin.

## Configuration de Tailwind

### Le fichier `tailwind.config.ts`

Ce fichier contient toutes les centaines de déclarations de couleurs, de tailles, de polices, etc. du framework Tailwind qu'il est possible d'**étendre** ou d'**écraser**.

Pour éviter la présence de centaines de valeurs inutiles (et hors charte graphique), qui pollueront les outils d'auto-complétion, nous **écrasons** toujours la configuration de Tailwind pour les thématiques suivantes, dans cet ordre&nbsp;:

- `screens` : points de rupture
- `colors` : Les couleurs de la charte graphique
- `fontFamily` : Les familles de police et alternatives
- `fontSize` : Les tailles de police
- `fontWeight` : Les graisses de police
- Le `content` (fichiers destinés à être [obervés par Tailwind](https://tailwindcss.com/docs/content-configuration))

Ces aspects sont différents à chaque projet et sont donc nécessaires à configurer. Il en résultera un fichier CSS optimisé.

Concrètement, nous renseignons notre palette de couleurs ainsi :

```js
module.exports = {
    theme: {
        colors: {
            // Ici la palette de couleurs de notre projet
            yellow: "#e9c46a",
        },
    },
};
```

Pour les styles qui doivent conserver l'existant de Tailwind et se contenter d'ajouter des règles/valeurs supplémentaires, nous **étendons** au sein de `theme.extend` :

```js
module.exports = {
    theme: {
        extend: {
            spacing: {
                // Tailwind fonctionne sur une échelle de 4
                120: `${120 / 4}rem`,
            },
        },
    },
};
```

### Remarque concernant les Breakpoints

La liste de points de rupture (breakpoints) recommandée est proposée sous forme de couple "clé:valeur" et peut bien entendu être élargie&nbsp;:

```scss
screens: {
  'sm': '36rem', // => @media (min-width: 576px)
  'md': '62rem', // => @media (min-width: 992px)
  'lg': '87.5rem' // => @media (min-width: 1400px)
},
```

## Usage et bonnes pratiques

Il existe trois manières d'appliquer des styles CSS dans un projet Tailwind :

1. Dans le Template HTML _(Tailwind)_ (ex. `<blockquote class="font-comic sm:text-20 md:text-24 md:text-center">`)
2. Dans le (S)CSS via `@apply` _(Tailwind)_ (ex. `@apply sm:grid relative col-start-3 sm:grid-cols-2 gap-5 sm:gap-x-20 sm:gap-y-10 lg:gap-x-40;`)
3. Dans le (S)CSS via... des propriétés CSS _(pas Tailwind)_

**Usage pertinent de classes dans le HTML :** Nous utilisons les classes utilitaires lorsqu'il s'agit de propriétés liées aux espacements (`margin`, `padding`, `gap`), à la typographie ou aux couleurs. Par exemple : des paragraphes, des blocs à décaler, à modifier selon les contextes.

**Usage pertinent de styles via `@apply` :** jamais ?

**Usage pertinent de CSS "classique" :** Nous utilisons des styles CSS pour les données structurelles ou les Layout, les grilles de mise en forme ainsi que toutes les fonctionnalités spécifiques, complexes ou impossibles à reproduire via Tailwind&nbsp;:

- Grid Layout complexes
- Positions et z-index
- Transitions / animations complexes
- Dégradés
- etc.

## Dans le détail : un Composant

Un Composant est un élément généralement réutilisable à divers endroits du projet. Celui-ci dispose d'une **classe sémantique identique à son nom de fichier** (ex. `class="nav-socials"` pour le composant `NavSocials.vue`)

Il est inséré au sein d'une page via `<NavSocials></NavSocials>`.

Les bonnes pratiques suivantes doivent cependant être respectées tant que possible&nbsp;:

1. Attribuer un nom de classe sémantique au composant (ex. `.nav-socials`).
2. Lister des classes Tailwind de façon **organisée**, c'est-à-dire regrouper les classes en fonction de leur utilité par ordre d'importance (l'esthétique à la fin).
3. **Un Composant nécessitant des variantes ou modificateurs (marges, padding, gouttières, couleurs, etc.) disposera de classes utilitaires Tailwind lors de son insertion (`<NavSocials class="mt-60 gap-10 md:gap-20 lg:gap-32"></NavSocials>`)**.

```vue
<!-- partie Template du fichier NavSocials.vue -->
<template>
    <!--
        Classe qui n'a pas besoin d'exister dans nos CSS,
        elle peut ne servir que de repère pour inspecter dans les devtools.
    -->
    <ul class="nav-socials">
        <li v-for="link in links" class="flex items-center" :key="link.href">
            <a class="text-blue-500 hover:underline focus:underline" :href="link.href">
                {{ link.label }}
            </a>
        </li>
    </ul>
</template>
```

## Configuration avancée

Le fichier Tailwind se charge d'importer 3 fichiers principaux.

Le fichier [alsa-TW-Reset](assets/vue-nuxt-front-end/alsa-tw-reset.scss) apporte des styles complémentaires (fix, accessibilité, print) que nous estimons nécessaires.

```css
/* Fichier `app.css` */
@import "alsa-tw-reset.css";
@import "fonts.css";
```

### Directives Tailwind

En plus de `@apply`, Tailwind CSS propose plusieurs directives intéressantes.

#### `@screen`

La directive `@screen` simplifie significativement la lecture des media queries. Elle est vivement conseillée.

Version via Media Query classique :

```css
body {
    @apply bg-white;

    @media (max-width: theme("screens.lg")) {
        @apply bg-pink;
    }
}
```

Version avec `@screen` :

```css
body {
    @apply bg-white;

    // => @media (min-width: "lg")
    @screen lg {
        @apply bg-pink;
    }
}
```

**Remarque :** Le mécanisme classique des Media Queries dans Taiwlind est "Mobile First", la détection est donc en mode `min-width:`, maisl il est également possible de cibler via `max-width:`.

Pour ce faire, déclarer la valeur de breakpoint dans `tailwing.config.ts` (ici `small`)&nbsp;:

```yaml
theme: { screens: { "small": { "max": "575px" } } }
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
