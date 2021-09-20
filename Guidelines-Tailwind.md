# Guidelines Tailwind

_Statut : Recommendation (REC)_

Tailwind est un framework CSS qui adopte une approche "atomique" de CSS, comprendre qu'à chaque classe correspond une action et une seule.

Ce framework CSS "Utility First" est notre choix prioritaire et préconisé dans la plupart des projets de l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) (WordPress, PHP, VueJS, Webpackmix).

## Structure de projet

De manière générale, sauf exceptions, Tailwind sera installé et configuré à la racine du projet. Il sera donc toujours placé dans le dossier `node_modules`, au même titre que les autres packages potentiels.

### Installation

#### Wordplate - WordPress

1. Installer les dépendances NPM `npm install tailwindcss postcss autoprefixer mix-tailwindcss`.
2. Créer un fichier de config avec `npx tailwindcss init` vierge si possible.
3. Configurer les fichiers qui seront à purger dans la configuration JS.
4. Dans le fichier `webpack.mix.js` ajouter Mix-Tailwind et l’utiliser sur mix.sass.
5. Enfin dans `resources\styles\app.scss`, ajouter Tailwind.

##### _tailwind.config.js_

```js
purge: ['public/theme/**/*.php', 'public/theme/**/*.twig', 'public/theme/**/*.js']
```

##### _webpack.mix.js_

```js
require('mix-tailwindcss')
mix.sass('resources/styles/app.scss', 'styles').tailwind()
```

##### _resources\styles\app.scss_

```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

#### Vue - Nuxt

> NOTE: Ne pas dire **Oui** quand Nuxt propose d'installer Tailwind automatiquement. On le fait nous même pour éviter tout soucis de compatibilité.

1. Installer les dépendances NPM `npm install -D @nuxtjs/tailwindcss tailwindcss@latest postcss@latest autoprefixer@latest`.
2. Créer un fichier de config avec `npx tailwindcss init` vierge si possible.
3. Configurer les fichiers qui seront à purger dans la config js.
4. Ajouter Tailwind aux `buildModules` de Nuxt.
5. Ajouter les styles `@utilities`, `@base`, `@components` dans le fichier `assets/css/tailwind.css`, il est possible de changer de fichier d'endroit mais il faut le spécifier dans la config de Nuxt.

##### _tailwind.config.js_

```js
purge: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.js']
```

##### _nuxt.config.js_

```js
buildModules: ['@nuxtjs/tailwindcss']
```

#### _assets/css/tailwind.css_

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Outils importants et recommandés

Il est important de télécharger l’extension VSCode [https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).

Cette extension permettra l’autocomplétion des class en prenant en compte la configuration.

_Note: l’extension ne fonctionne que quand le workspace VSCode est ouvert à la racine du projet (où se trouve le fichier `tailwind.config.js`)._

Pour tester Tailwind en ligne : [https://play.tailwindcss.com/](https://play.tailwindcss.com/)

La documentation de Tailwind : [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

Il est également important d’installer `tailwind-loves-sass` `npm i tailwind-loves-sass`.

Il faudra ensuite l’inclure à la suite de Tailwind dans son fichier scss :

```scss
@import “tailwind-loves-sass”;
```

Ce package npm mettra à disposition des `mixins` `sass` pour chaque règle Tailwind comme `apply`, `screen`, …

Il intègre également un [micro-reset CSS issu du projet KNACSS](https://github.com/nicolassutter/Tailwind_loves_sass/tree/main/options/knacss).

### Configuration

Nous utilisons toujours la configuration de Tailwind pour :

- Les couleurs
- Les fonts
- La purge

Ces aspects sont différents à chaque projet et sont donc nécessaires à configurer. Il en résultera un fichier CSS optimisé.

Cependant tout autre modification devra être faite via Tailwind sauf si cela n'est paspossible. De cette manière nous savons où tout est configuré peu importe le projet.

L’ajout de classes utilitairs à une propriété déjà existante devra se faire dans la configuration et non dans le CSS sauf en cas complexe.

Si l’on souhaite ajouter une classe utilitaire qui n’existe pas déjà, nous la créons en `SCSS` dans un fichier à part en utilisant un :

```scss
@include layer('utilities') {
  .utility {
    @include apply('font-bold');
  }
}
```

**Important**: L'ajout de valeur à une utilité existante se fera également dans le fichier de configuration.

EX:

```js
module.exports = {
  theme: {
    /**
     * Ce que nous mettons dans extend sera rajouté à la configuration par défaut
     */
    extend: {
      /**
       * Ceci va donner toutes les valeurs de positions à background position!
       */
      backgroundPosition: (theme) => theme('positions'),
      /**
       * Ici on donne un valeur supplémentaire au spacing utilities de Tailwind
       */
      spacing: {
        '12xl': '90rem',
      },
    },
  },
}
```

Le plus important est de ne conserver que les couleurs que l’on utilise puisque ce sont elles qui pèsent le plus dans le fichiers finaux. Même si la _Purge_ nettoiera ces styles, il est important de le faire pour avoir une autocomplétion correcte et propre.

**Enfin, il est obligatoire de spécifier les fichiers à purger pour le build final de Tailwind.**

### Bonnes pratiques d'intégration

`Tailwind` est axé sur la création et réutilisation de composants HTML et non pas CSS. Il est donc _!important_ de garder en tête de déstructurer son code HTML en composants, partials et autres.

Nous évitons donc d’utiliser `@apply` ou `theme()` pour créer des composants CSS. Tout doit se faire autant que possible dans le HTML (composants `twig`, `php`, `vue`, ...).

Dans un projet où il n’est pas possible de profiter des includes ou composants HTML, il est alors conseillé d’utiliser `@apply` ou `theme()` dans le CSS directement.

**Dans tous les cas, nous devons éviter la répétition.**

### Écriture du HTML

Nous appliquons une classe sémantique permettant d’identifier le contexte de l’élément, cela rendra la lecture du HTML plus simple. **Toujours en début d’attribut `class`.**

Notre liste de classe devrait être organisée, c'est-à-dire, regrouper les classes en fonction de leur utilité. Nous faisons donc référence aux [Guidelines CSS](Guidelines-CSS.md).

_Note : Lors de l’écriture d’un élément HTML qui ne sera pas découpé en composant uniquement (ex: un élément présent une seule fois sur un site), les transitions / animations / dégradés seront à écrire dans un fichier CSS à part. De cette manière nous évitons une pollution du code importante._

```html
<!-- Ne pas faire, le code est pollué -->
<div class="card transition-colors duration-200 ease-in-out ..."></div>

<!-- Dans ce cas on ne laisse que la classe sémantique -->
<div class="card"></div>
```

```scss
// On fait cette transition dans le scss directement
@include layer('components') {
  .card {
    @include apply('transition-colors duration-200 ease-in-out');
  }
}
```

### Écrire du HTML purgeable

`PurgeCSS` est un outil d'optimisation du poids du fichier CSS consistant à supprimer toutes les classes CSS inutilisées au sein du projet.

Purge va chercher toutes les classes `Tailwind` dans nos fichiers et ne comprendra pas une classe dynamique comme `“text-”~variable`.

Il est obligatoire (dans le cas d’une classe `Tailwind`) de faire apparaître explicitement la classe entière.

```html
❌
<div class="text-{{  error ? 'red-500' : 'blue-500' }}"></div>
✔️
<div class="{{  error ? 'text-red-500' : 'text-blue-500' }}"></div>
```

**Note:** Purge ne va supprimer que les styles de `Tailwind` et pas les nôtres (à part si ceux-ci sont dans un `layer`).

### Écriture des styles personnalisés

La règle `apply` doit suivre le même ordre que l’attribut `class` en HTML, c’est à dire comme dans les [Guidelines CSS](Guidelines-CSS.md).

La bonne pratique est de découper les styles en plusieurs `@apply` pour faciliter la lecture. Toujours en suivant l’ordre correct.

Chaque `@apply` doit être commenté pour permettre de déterminer son utilité.

```scss
.custom-css-component {
  // Background
  @include apply('bg-blue-500');

  // Colors
  @include apply('text-blue-800');
}
```

Il est également possible d’accéder aux variables Tailwind avec `theme()`

Ceci est notamment utile pour pouvoir utiliser les valeurs `Tailwind` pour créer des Grilles plus complexes ou dans des `calc()` par exemple.

```scss
.component {
  display: grid;
  grid-template-columns: theme('spacing.10') auto min-content;
}
```

On utilise juste une notation d’objet JS. Ex: `theme('spacing.64')` ou `theme('colors.blue.500')`.

**Note:** Les valeurs sont séparées par des points (`.`) et non des tirets (`-`) dans cette notation.

### Autres Directives Tailwind

#### `@layer`

Notre CSS doit être décomposé entre les différents layer `Tailwind` (“components”, “utilities”, “base”).

Ceci à l’avantage de générer nos classes au même niveau que celles de `Tailwind`. De plus, nos classes seront également _purgeables_.

```scss
@include layer('component') {
  .mon-composant {
    ...
  }
}
```

#### `@variants`

Ceci peut générer toute les classes `responsive`, `hover`, `focus`. Elles seront utilisables de la même manière que celles de Tailwind. `md:`, `hover:`, `focus:`.

Elles seront de préférence dans le layer `utilities`.

```scss
@include layer('utilities') {
  @include variants('resposive, hover, focus') {
    .mon-utilite {
      background-color: transparent;
    }
  }
}
```

**Note:** Ces classes sont indépendantes, il est impossible d’avoir une classe qui fait `color: red;` mais qui fera `color: blue`; à partir d’un autre breakpoint.

Le principe général est qu'`une class = une fonction`. Donc à partir du moment où notre classe a plus d’une classe, elle devient un `component`.

Les préfix `sm`, `md`, `hover`, `focus`, … sont donc des switchs `on/off` pour une seule utilité.

Ex: `sm:text-blue-500 md:text-red-500`

#### `@screen`

Il est possible de l’utiliser pour simplifier la lecture des media queries.

```scss
@include screen('md') {
  ...
}
```
