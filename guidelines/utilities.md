# Guidelines : Classes utilitaires

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant l'utilisation de classes utilitaires. Ces indications sont destinées à évoluer dans le temps et à s'adapter à chaque nouveau projet.

Nous utilisons [Uno CSS](https://unocss.dev/) pour les génération des classes utilitaires.

## Environnement de travail et outils recommandés

Uno CSS, pour plus de plaisir, gagne à être associé à un environnement de travail et un workflow adaptés. Nous utilisons Visual Studio Code et l'extension **antfu.unocss** offrant une auto-complétion ainsi qu'une _tooltip_ au survol des classes.

## Configuration d'Uno

Nous utilisons un preset préconfiguré : <https://unocss.dev/presets/mini>, suivre la documentation pour l'installation.

### Le fichier `uno.config.ts`

Nous renseignons ici toutes les valeurs utiles au projet qui sont généralement celles-ci :

- `colors` : Les couleurs de la charte graphique
- `fontFamily` : Les familles de police et alternatives
- `fontSize` : Les tailles de police
- `fontWeight` : Les graisses de police

Ces aspects sont différents à chaque projet et sont donc nécessaires à configurer. Il en résultera un fichier CSS optimisé.

## Usage et bonnes pratiques

Il existe trois manières d'appliquer des styles CSS dans un projet Uno CSS :

1. Dans le Template HTML (ex. `<blockquote class="font-comic sm:text-20 md:text-24 md:text-center">`)
    - Nous tentons au maximum de respecter cette pratique
2. Dans le CSS via `@apply` si le plugin [transformer directives](https://unocss.dev/transformers/directives) est installé (ex. `@apply sm:grid relative col-start-3 sm:grid-cols-2 gap-5 sm:gap-x-20 sm:gap-y-10 lg:gap-x-40;`)
    - À éviter au maximum
3. Dans le CSS via... des propriétés CSS _(pas utilitaire)_
    - À éviter au maxium sauf en cas extrêmes

## Dans le détail : un Composant

Un Composant est un élément généralement réutilisable à divers endroits du projet. Celui-ci dispose d'une **classe sémantique identique à son nom de fichier** (ex. `class="nav-socials"` pour le composant `NavSocials.vue`)

Il est inséré au sein d'une page via `<NavSocials></NavSocials>`.

Les bonnes pratiques suivantes doivent cependant être respectées tant que possible&nbsp;:

1. Attribuer un nom de classe sémantique au composant (ex. `.nav-socials`).
2. Lister des classes utilitaires de façon **organisée**, c'est-à-dire regrouper les classes en fonction de leur utilité par ordre d'importance (l'esthétique à la fin).
3. **Un Composant nécessitant des variantes ou modificateurs (marges, padding, gouttières, couleurs, etc.) disposera de classes utilitaires utilitaires lors de son insertion (`<NavSocials class="mt-60 gap-10 md:gap-20 lg:gap-32"></NavSocials>`)**.

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

## Directives

Nous utilisons quand il est nécessaire, la directive `@screen` si le plugin [transformer directives](https://unocss.dev/transformers/directives) est installé. Nous évitons au maximum l'usage de `@apply`, nous préférons écire les styles via les classes utilitaires dans le HTML.

## Dark Mode

Le mode d'apparence (Light Mode, Dark Mode) est un paramètre que l'utilisateurice peut définir via ses réglages système ainsi que via son navigateur.

Dans nos projets avec classes utilitaires, **le Constructeur de classes utilitaires gère les modes d'apparence** :

- Dans Uno CSS par exemple, le dark mode est indiqué dans le fichier de config : `dark: 'class' /* https://unocss.dev/presets/mini#dark */` (`class` = une classe est ajoutée sur `html`, `media` = c'est `@prefers-color-scheme` qui s'en charge).
- On adapte les propriétés au dark mode en préfixant la classe utilitaire d'un `dark:`

Ainsi, un exemple de bouton qui s'adapte automatiquement aux modes light ou dark pourrait s'écrire de cette façon :

```html
<button
    class="text-gray-90 bg-gray-20 dark:(text-gray-10 bg-gray-90)"
>
    Hey !
</button>
```
