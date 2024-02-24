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

### Ré-ordonner les classes dans le HTML

Le plugin [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) permet d'ordonner les classes utilitaires de Tailwind dans un ordre précis.

Se référer à la [Documentation d'installation](https://github.com/tailwindlabs/prettier-plugin-tailwindcss#installation) du plugin.

## Configuration de Tailwind

### Le fichier `tailwind.config.ts`

Ce fichier contient toutes les centaines de déclarations de couleurs, de tailles, de polices, etc. du framework Tailwind qu'il est possible d'**étendre** ou d'**écraser**.

Pour éviter la présence de centaines de valeurs inutiles (et hors charte graphique), qui pollueront les outils d'auto-complétion, nous **écrasons** toujours la configuration de Tailwind pour les thématiques suivantes, dans cet ordre&nbsp;:

- `colors` : Les couleurs de la charte graphique
- `fontFamily` : Les familles de police et alternatives
- `fontSize` : Les tailles de police
- `fontWeight` : Les graisses de police
- Le `content` (fichiers destinés à être [observés par Tailwind](https://tailwindcss.com/docs/content-configuration))

Ces aspects sont différents à chaque projet et sont donc nécessaires à configurer. Il en résultera un fichier CSS optimisé.

Concrètement, nous renseignons notre palette de couleurs ainsi :

```ts
export default {
    theme: {
        colors: {
            // Ici la palette de couleurs de notre projet
            yellow: "#e9c46a",
        },
    },
}
```

Pour les styles qui doivent conserver l'existant de Tailwind et se contenter d'ajouter des règles/valeurs supplémentaires, nous **étendons** au sein de `theme.extend` :

```js
export default {
    theme: {
        extend: {
            spacing: {
                // Tailwind fonctionne sur une échelle de 4
                120: `${120 / 4}rem`,
            },
        },
    },
}
```

## Usage et bonnes pratiques

Il existe trois manières d'appliquer des styles CSS dans un projet Tailwind :

1. Dans le Template HTML _(Tailwind)_ (ex. `<blockquote class="font-comic sm:text-20 md:text-24 md:text-center">`)
    - Nous tentons au maximum de respecter cette pratique
2. Dans le CSS via `@apply` _(Tailwind)_ (ex. `@apply sm:grid relative col-start-3 sm:grid-cols-2 gap-5 sm:gap-x-20 sm:gap-y-10 lg:gap-x-40;`)
    - À éviter au maximum
3. Dans le CSS via... des propriétés CSS _(pas Tailwind)_
    - À éviter au maxium sauf en cas extrêmes

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

## Directives Tailwind

Nous utilisons quand il est nécessaire, la directive `@screen`. Nous évitons au maximum l'usage de `@apply`, nous
préférons écire les styles via les classes utilitaires dans le HTML.

## Dark Mode

Le mode d'apparence (Light Mode, Dark Mode) est un paramètre que l'utilisateurice peut définir via ses réglages système ainsi que via son navigateur.

Dans nos projets avec classes utilitaires, **le Constructeur de classes utilitaires gère les modes d'apparence** :

- Dans Tailwind par exemple, Le dark mode est indiqué dans le fichier de config : `darkMode: 'class', // 'false' or 'media' or 'class'` (`class` = une classe est ajoutée sur `html`, `media` = c'est `@prefers-color-scheme` qui s'en charge).
- On adapte les propriétés au dark mode en préfixant la classe utilitaire d'un `dark:`

Ainsi, un exemple de bouton qui s'adapte automatiquement aux modes light ou dark pourrait s'écrire ainsi&#8239;:

```html
<button class="
  text-gray-90 dark:text-gray-10 bg-gray-20 dark:bg-gray-90"
>Hey !</button>
```
