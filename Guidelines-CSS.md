# Guidelines : CSS

_Bonnes pratiques CSS (et SCSS)  en production_


## Généralités

* L’encodage des fichiers et des bases de données doit se faire en UTF-8 (sans BOM).
* Les indentations se font à l’aide de deux espaces et sous forme de tabulations.
Pour assurer une cohérence inter-projets, utiliser la convention [EditorConfig](http://editorconfig.org/).
* Le code CSS produit doit être propre, optimisé et (autant que faire se peut) valide selon les normes (http://jigsaw.w3.org/css-validator/).
* La feuille de style CSS est de préférence unique et minifiée et appelée à l'aide d'un élément `<link>` dans la section `<head>`. Pas de `@import` dans un fichier CSS.
* Privilégier tant que possible les syntaxes via propriétés raccourcies : `margin`, `padding`, `font`, `border`, `background`, `border-radius`
* Utiliser toujours le même type de guillemets. De préférence des doubles guillemets, exemple : `content: ""`;
* Utiliser toujours des guillemets pour les valeurs dans les sélecteurs, exemple : `input[type="checkbox"]`
* Éviter de spécifier les unités pour les valeurs nulles ainsi que pour les hauteurs de lignes, exemple : `margin: 0; line-height: 1.5`.

## Patterns visuels (OOCSS)

Repérer systématiquement les « objets CSS », c'est-à-dire des « patterns visuels » qui se répètent, afin de définir ainsi des classes réutilisables, des styles de base et des variantes.
* Séparer la structure de l’apparence (une règle CSS ne doit pas comporter à la fois `padding` et `background` par exemple)
* Séparer le conteneur du contenu (un composant ne doit jamais être ciblé par un sélecteur qui tient compte de son parent)
* Utiliser au maximum le pattern objet "media" : [http://codepen.io/raphaelgoetter/pen/KMWWwj?editors=1100](http://codepen.io/raphaelgoetter/pen/KMWWwj?editors=1100)
* Utiliser au maximum le pattern objet "autogrid" : [http://codepen.io/raphaelgoetter/pen/KMgBJd?editors=1100](http://codepen.io/raphaelgoetter/pen/KMgBJd?editors=1100)

Documentation : [http://www.nicoespeon.com/fr/2013/05/plongee-au-coeur-de-oocss/](http://www.nicoespeon.com/fr/2013/05/plongee-au-coeur-de-oocss/)

## Reset

Un "reset" CSS permettant d’harmoniser les styles par défaut des navigateurs est systématiquement appliqué en début de projet.

Normalize.css est recommandé. Il s’agit d’un célèbre reset CSS employé par Twitter, Github, Bootstrap, Guardian, KNACSS, etc.

Documentation : [http://necolas.github.io/normalize.css/](http://necolas.github.io/normalize.css/)

## Syntaxe

Les propriétés CSS sont - sauf exception - rédigées ligne par ligne dans chacun des blocs.

Un espace sépare le nom de la propriété de sa valeur, après les `:`.
Un espace sépare le sélecteur du bloc avant la première accolade `{`.

```
selecteur {
  color: pink;
  background: tomato;
}
```

## Ordre des déclarations

Les déclarations au sein d’une règle CSS sont ordonnées de façon à faire apparaître les propriétés importantes en tête de liste.

Exemple :

```
selecteur {
  display: inline-block;
  position: relative;
  top: -1em;
  z-index: 1337;
  max-width: 50%;
  margin: 1em;
  padding: 0;
  overflow: hidden;
  text-align: right;
  font: bold 1.5em/1.3 arial, verdana, sans-serif;
  background: rgba(0,0,0,.5);
}
```

**_Note : l’outil "CSScomb" permet de réordonner automatiquement les déclarations CSS. Il peut être utilisé sous forme de plugin (Atom, Brackets, Sublime text) ou intégré à un Workflow sous forme de tâche Gulp ou Grunt : [http://csscomb.com/](http://csscomb.com/)_**

## Préfixes navigateurs

Certaines propriétés CSS nécessitent d’être préfixées de la manière suivante (et dans cet ordre) :

Exemple :

* `-webkit-propriété`
* `-moz-propriété`
* `-ms-propriété`
* `propriété`

**_Note : l’outil "Autoprefixer" permet de préfixer automatiquement les propriétés CSS. Il peut être utilisé sous forme de plugin (Atom, Brackets, Sublime text) ou intégré à un Workflow sous forme de tâche Gulp ou Grunt : [https://autoprefixer.github.io/](https://autoprefixer.github.io/)_**

## Hacks navigateurs

Les "hacks" sont des détournements de propriétés ou valeurs, permettant de tirer profit d’une faille des parseurs CSS des navigateurs.

En priorité, il est recommandé de privilégier d’autres méthodes que les hacks, car ceux-ci sont aléatoires et non pérennes.

En dernier ressort, employer la ressource [Browserhacks](http://browserhacks.com/).

## Commentaires

Usage de mots-clés informatifs au sein de commentaires importants sont appréciés, sous la forme :

* `@TODO` → point à finir / corriger avant de livrer
* `@BUGFIX` → explication d’une correction de bug
* `@NOTE` → note importante à partager
* `@AUTHOR` → auteur du document
* `@TESTED` → navigateurs / environnements testés
* `@TOPROD` → note à l’intention de la version de production

## Choix global des sélecteurs CSS

Le choix des sélecteurs CSS doit se faire en priorité pour leur pertinence et leur maintenabilité.

Ainsi, il est indiqué de pouvoir cibler n’importe quel élément indépendamment de son contexte : si l’élément doit être déplacé de son contexte, tel un module ou un composant, les styles devraient toujours s’appliquer.

De manière générale :

* **Il est préférable de cibler les éléments à l’aide de leur classe HTML** qui pourrait être utilisée dans n’importe quel contexte, par exemple `.title-primary`,
* **Les sélecteurs  #id doivent être évités en CSS** car trop spécifiques dans le calcul du poids. Si un id doit être ciblé, préférer un sélecteur d’attribut, par exemple `[id=header]`,
* **Les sélecteurs en cascade ou hyper-structurel doivent être évités** de manière générale (ex: `ul.header li .info` ou `h1 + p + p`),
* La règle `!important` doit être éradiquée si possible du fait de son poids extrêmement important (certaines parties des styles peuvent toutefois exceptionnellement employer à juste titre `!important`).

## Taille des polices

Opter pour des tailles de polices fluides (de préférence en `rem`), éviter les tailles de police de taille fixe (`px` ou `pt`) car inaccessible aux personnes nécessitant d’agrandir les contenus textuels.

**Non :**

```
body {
  font-size: 14px;
}
```

**Oui :**

```
html {
  font-size: 62.5%;
}
body {
  font-size: 1.4rem;
}
```

## Positionnement

### Modèle de boîte

Opter pour le modèle de boîte CSS3 (`box-sizing: border-box`) en début de la feuille de style.

```
* {
  box-sizing: border-box;
}
```

ou bien :

```
html {
  box-sizing: border-box;
}
* {
  box-sizing: inherit;
}
```

Documentation : [https://blog.goetter.fr/2012/07/27/box-sizing-et-pourquoi-pas/](https://blog.goetter.fr/2012/07/27/box-sizing-et-pourquoi-pas/)

### Flux

Éviter de sortir les éléments du flux (`float`, `position`) sans nécessité.

**Non :**

```
div {
  position: absolute;
  right: 0;
}
```

**Oui :**

```
div {
  margin-left: auto;
}
```

Documentation : [https://github.com/bendc/frontend-guidelines#flow](https://github.com/bendc/frontend-guidelines#flow)

### Choix de positionnement

Positionner les éléments en choisissant de préférence parmi ces méthodes, dans l’ordre :

1. `display: block` | `inline;`
2. `display: flex` | `inline-flex;`
3. `display: inline-block` | `table-cell;`
4. `float: left` | `right;`
5. `position: relative` | `absolute` | `sticky` | `fixed;`

## Compréhension et lecture

Règles permettant de faciliter la relecture de code CSS existant.

### Compréhension

Écrire des syntaxes compréhensibles par des êtres humains et des collègues.

**Non :**

```
li + li {
  visibility: hidden;
}
```

**Oui :**

```
li:not(:first-child) {
  visibility: hidden;
}
```

### Namespacing

Selon la complexité du projet, il peut être utile de préfixer les classes par « namespace » pour les regrouper et les distinguer aisément.

**Exemple de Namespace (préfixe par "fonction") :**

```
.o-container, .o-mod, -o-grid-container {
  /* objects : éléments génériques multitâches */
}
.c-button, .c-nav, -c-lightbox {
  /* components : éléments concrets */
}
.is-opened, .is-hidden, .has-* {
  /* state : désigne un état ou une condition */
}
.js-menu, .js-is-hidden {
  /* comportement : éléments liés à JavaScript */
}
```

**Autre exemple de Namespace (préfixe par nom du framework) :**

```
.kn-container, .kn-mod, -kn-grid {
  ...
}
```

Documentation : [http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

### Intervalles de z-index

Définir des plages d’empilement (z-index) et s’y tenir, afin d’éviter les chevauchements indésirables.

Par exemple :

* `0000–1999`: Elements and Components
* `2000–2999`: Element and Component Drop Downs
* `3000–3999`: Secondary Navigation
* `4000–4999`: Header / Footer
* `5000–5999`: Primary Navigation
* `6000–6999`: Full Screen Features
* `7000–7999`: Special Cases
* `8000–8999`: Modals / Dialog Windows
* `9000–9999`: Notifications

Documentation : [https://medium.com/@davidjpfeiffer/z-index-organization-in-css-5913fd4c25c9#.49lr5zmrs](https://medium.com/@davidjpfeiffer/z-index-organization-in-css-5913fd4c25c9#.49lr5zmrs)

## Maintenabilité

Règles permettant de faciliter la maintenance de code CSS existant.

### Poids des sélecteurs

Éviter de surcharger un sélecteur, car cela lui ajoute du poids inutilement.

**Non :**

```
ul.nav li a.navlink {
  …
}
```

**Oui :**

```
.navlink {
  …
}
```

**Non :**

```
input[type="submit"] {
…
}
```

**Oui :**

```
[type="submit"] {
…
}
```

Documentation : [http://cssspecificity.com/](http://cssspecificity.com/)

### Sélecteur #id

Éviter d’utiliser le sélecteur d’`id`, son poids est trop important et difficile à maintenir, éviter également le bazooka `!important`

**Non :**

```
#nav a {
  …
}
```

**Oui :**

```
[id="nav"] a {
  …
}
```

**Oui :**

```
.nav a {
  …
}
```

Documentation : [http://maintainablecss.com/chapters/ids/](http://maintainablecss.com/chapters/ids/)

### Sélecteurs "structurels"

Éviter les sélecteurs associés à la structure HTML, un élément doit pouvoir être ciblé quel que soit son conteneur ou son emplacement dans le DOM.

**Non :**

```
div > h1 + p {
  …
}
```

**Oui :**

```
.intro {
  …
}
```

**Non :**

```
#navigation h2, #sidebar h2 {
  …
}
```

**Oui :**

```
.h2-like {
  …
}
```

**Non :**

```
.sidebar .button {
  …
}
```

**Oui :**

```
.button-primary {
  …
}
```

Documentation : [https://github.com/bendc/frontend-guidelines#selectors](https://github.com/bendc/frontend-guidelines#selectors)

### Structure vs Apparence

Toujours séparer la structure de l’apparence dans les sélecteurs pour faciliter la factorisation.

Au sein d’une seule règle CSS ne doivent jamais cohabiter des propriétés décoratives et des propriétés de boîte ou de positionnement.

**Non :**

```
.button {
  display: inline-block;
  padding: 1em;
  background: blue;
  color: white;
}
```

**Oui :**

```
.button {
  display: inline-block;
}
.button-large {
  padding: 1em;
}
.button-primary {
  background: blue;
  color: white;
}
```

### Surcharge

Éviter d’écraser une règle par une autre.

**Non :**

```
li {
  visibility: hidden;
}
li:first-child {
  visibility: visible;
}
```

**Oui :**

```
li + li {
  visibility: hidden;
}
```

**Oui :**

```
li:not(:first-child) {
  visibility: hidden;
}
```

Documentation : [https://github.com/bendc/frontend-guidelines#overriding](https://github.com/bendc/frontend-guidelines#overriding)

## Performances

Règles permettant de faciliter la performance (vitesse d’affichage) des pages web.

### Concaténation

Les fichiers CSS doivent être rassemblés en un seul afin d’éviter les requêtes multiples.

**Non :**

```
<link rel="stylesheet" href="css/knacss.css">
<link rel="stylesheet" href="css/modal.css">
<link rel="stylesheet" href="css/carousel.css">
<link rel="stylesheet" href="css/styles.css">
```

**Oui :**

```
<link rel="stylesheet" href="css/styles.css">
```

### Minification

Les fichiers CSS doivent être minifiés pour économiser du poids de chargement.

**Non :**

```
<link rel="stylesheet" href="css/styles.css">
```

**Oui :**

```
<link rel="stylesheet" href="css/styles.min.css">
```

### Propriétés raccourcies

Préférer les propriétés raccourcies.

**Non :**

```
div {
  top: 50%;
  margin-top: -10px;
  flex-grow: 1;
  flex-basis: 0;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
}
```

**Oui :**

```
div {
  top: calc(50% - 10px);
  flex: 1 0 auto;
  padding: 5px 10px 20px;
}
```

Documentation : [https://github.com/bendc/frontend-guidelines#brevity-1](https://github.com/bendc/frontend-guidelines#brevity-1)

### Unités

L’unité est inutile si la valeur est nulle. Ne pas donner d’unité à `line-height`.

**Non :**

```
div {
  margin: 0px;
  font-size: 0.9rem;
  line-height: 2em;
  border: none;
}
```

**Oui :**

```
div {
  margin: 0;
  font-size: .9rem;
  line-height: 2;
  border: 0;
}
```

Documentation : [https://github.com/bendc/frontend-guidelines#units](https://github.com/bendc/frontend-guidelines#units)

### Animations gourmandes

* Toujours préciser quelle(s) propriété(s) doit être animée dans transition ou animation
* Éviter d’animer des propriétés autres que **transform** ou **opacity** ou **filter** (ou alors ajouter la
propriété `will-change` et/ou le hack de `translateZ()`.) Source : [https://tzi.github.io/presentation-CSS-perfs/](https://tzi.github.io/presentation-CSS-perfs/)

**Non :**

```
div {
  margin-left: 100px;
  transition: .5s;
}
```

**Oui :**

```
div {
  transform: translateX(100px);
  transition: transform .5s;
}
```

**Oui (variante) :**

```
div {
  margin-left: 100px;
  will-change: margin-left;
  transition: margin-left .5s;
}
```

Documentation : [https://csstriggers.com/](https://csstriggers.com/)

### `@font-face`

N’imposez pas de chargements aux anciens navigateurs (IE8). Privilégiez `.woff2`.

**Non :**

```
@font-face {
  font-family: kiwi;
  src: url("/fonts/kiwi.eot?#iefix") format("embedded opentype");
  src: url("/fonts/kiwi.eot?#iefix") format("embedded opentype"),
  url("/fonts/kiwi.woff2") format("woff2"),
  url("/fonts/kiwi.woff") format("woff"),
  url("/fonts/kiwi.ttf") format("truetype"),
  url("/fonts/kiwi.svg#svgFontName") format("svg");
}
```

**Oui :**

```
@font-face {
  font-family: 'kiwi';
  src: url('kiwi.woff2') format('woff2'),
  url('kiwi.woff') format('woff');
}
```

Documentation : [https://twitter.com/kaelig/status/609362210759012353](https://twitter.com/kaelig/status/609362210759012353)

## Sass et outils d’automatisation

### Répétitions

Utiliser des pré-processeurs (Sass, LESS, Stylus) pour éviter les répétitions de code.

Concerne principalement :

* les couleurs de texte
* les couleurs de fond
* les tailles de police
* les breakpoints des Media Queries en Responsive

**Non :**

```
li {
  color: red;
}
div {
  color: #F00;
}
p {
  color: #FF0000;
}
p {
  color: #FF0001;
}
```

**Oui :**

```
// déclaration de variable Sass
$color: #F00;

// application de la variable
li {
  color: $color;
}
div {
  color: $color;
}
p {
  color: $color;
}
```


Documentation : [http://sass-lang.com/](http://sass-lang.com/)

### Media Queries

Pour éviter les intervalles qui se chevauchent, ou des Media Queries trop variés, la convention pour définir la valeur d’un Breakpoint est systématiquement :

* **(min-width: ($breakpoint + 1))**** **
* **(max-width: $breakpoint)**

Exemple avec les variables de Breakpoints suivantes :

```
$tiny-screen: 543px;
$small-screen: 767px;
$medium-screen: 991px;
$large-screen: 1199px;
```

**Non :**

```
@media (min-width: 767px) {...}
@media (max-width: 768px) {...}
@media (min-width: $small-screen) {...}
@media (min-width: $small-screen) and (max-width: $large-screen) {...}
```

**Oui :**

```
@media (min-width: 768px) {...}
@media (max-width: 767px) {...}
@media (min-width: $small-screen + 1) {...}
@media (min-width: $small-screen + 1) and (max-width: $large-screen) {...}
```

### Préfixes navigateurs

* Automatiser la gestion des préfixes à l’aide de Autoprefixer, ne pas le faire à la main
* Ne pas utiliser un mixin Sass/LESS pour cette tâche.

**Non (mixin Sass) :**

```
div {
  transform: scale(2);
  -webkit-transform: scale(2);
  -moz-transform: scale(2);
  -ms-transform: scale(2);
  transition: 1s;
  -webkit-transition: 1s;
  -moz-transition: 1s;
  -ms-transition: 1s;
}
```

**Oui (Autoprefixer) :**

```
div {
  -webkit-transform: scale(2);
  transform: scale(2);
  transition: 1s;
}
```

Documentation : [https://autoprefixer.github.io/](https://autoprefixer.github.io/)

### Nestings (imbrications)

Éviter tant que possible les imbrications en Sass.

**Non :**

```
.foo {
  .bar {
    &:hover {
      color: red;
    }
  }
}
```

Résultat :

```
.foo .bar:hover {
  color: red;
}
```

**Oui (pas de nesting) :**

```
.foo {
  &-bar {
    color: red;
  }
}
```

Résultat :

```
.foo-bar {
  color: red;
}
```


Documentation : [http://sass-guidelin.es/#syntax--formatting](http://sass-guidelin.es/#syntax--formatting)

## Médias (polices, images)

### Polices

Autant que possible, privilégier le chargement de polices légères et respectueuses des performances, indiquées notamment sur [Google Web Fonts](http://www.google.com/webfonts/v2). Limiter le nombre de ces polices à 2, voire 3 grand maximum.

Alsacréations partage une collection de fontes adaptées et optimisées pour le web : [https://github.com/alsacreations/webfonts](https://github.com/alsacreations/webfonts)

Il est conseillé de récupérer les fontes sur ce repo Github si cela est possible.

Le format WOFF2 (Web Open Font Format 2) est privilégié dans tous les cas de figure, pour sa compatibilité et sa légèreté. En second lieu, utiliser WOFF.

Ces formats seront mentionnés en priorité dans la déclaration `@font-face` avant les autres formats (TTF, OTF,  SVG). Voir [Optimiser le rendu des police @font-face](http://www.clever-age.com/veille/blog/optimiser-le-rendu-de-font-face.html)

Voici un exemple de chargement de police conseillé (IE9 minimum) :

```
@font-­face {
  font-­family: 'kiwi';
  src:   url('kiwi.woff2') format('woff2'),
         url('kiwi.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-­face {
  font-­family: 'kiwi';
  src:   url('kiwi-bold.woff2') format('woff2'),
         url('kiwi-bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}
```

### Contenus de remplissage

Le remplissage par du contenu temporaire peut faire appel à *Lorem Ipsum*.

* Pour le texte :
    * [http://schnaps.it/](http://schnaps.it/)
    * [http://loripsum.net/](http://loripsum.net/)
    * [http://chuckipsum.com/](http://chuckipsum.com/)
* Pour les images :
    * [http://placekitten.com/](http://placekitten.com/)
    * [http://flickholdr.com/](http://flickholdr.com/)
