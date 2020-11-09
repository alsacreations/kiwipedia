# Guidelines : CSS

Cette présente convention rassemble les bonnes pratiques CSS (et SCSS) en production appliquées par l'agence web Alsacreations.fr. Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Généralités

### Éditeur, Formatage et Qualité

- L'éditeur de code recommandé pour HTML, CSS, PHP, JS est [Visual Studio Code](https://code.visualstudio.com/). Il est libre (son noyau), gratuit et bénéficie de nombreuses mises à jour. Un package réellement libre est [VSCodium](https://vscodium.com/) (absence de la télémétrie Microsoft et utilisation d'un autre store d'extensions).
- [EditorConfig](http://editorconfig.org/) et [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) imposent un formatage (UTF-8, espace vs tabs, guillemets) et des règles de syntaxe directement dans l'éditeur, ainsi ce dernier s'adapte à chaque projet.
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) est un linter CSS (SCSS, LESS) apportant une configuration qui vient s'ajouter aux linters natifs de VS Code.

### Langage : Scss

Le pré-processeur [Sass](https://sass-lang.com/) (syntaxe `.scss`) est un langage compilé employé afin d'apporter certaines fonctionnalités indispensables&nbsp;: variables, notation imbriquée, mixins, etc.

La méthode de compilation de Sass vers CSS dépend du type de projet (voir partie "Conventions variables selon les projets").

### Compatibilité navigateurs

L'ensemble des recommandations de ce document est prévu pour être compatible avec tous les navigateurs représentant plus de 1.5% de la population, ce qui représente notamment tous les navigateurs modernes supportant [CSS Grid Layout](https://caniuse.com/css-grid). **Cela ne concerne donc pas IE10 et IE11.**

La liste des navigateurs supportés est définie par le fichier `.browserslistrc` placé en racine du projet, sur lequel se base Autoprefixer et dont la valeur est&nbsp;:

```json
>1.5%
not op_mini all
```

### Fichier CSS de base ("Reset")

Un "reset" CSS permettant d'harmoniser les styles par défaut des navigateurs est systématiquement appliqué en début de projet.

Normalize, Sanitize et Reboot sont des fichiers de base courants. **Nous privilégions les fichiers de base de KNACSS Reborn** qui est un récapitulatif de ces ressources.

Documentation : [fichiers reset de KNACSS Reborn](https://github.com/raphaelgoetter/knacss-reborn/tree/master/sass/base)

## Sélection des éléments

La maintenabilité des feuilles de styles est une priorité. Il est nécessaire de prioriser les sélecteurs ayant le moins de spécificité (poids) possible.

Privilégier au maximum l'usage de [**classes**](http://www.drinchev.com/blog/css-with-only-class-names/) plutôt que d'écrire des sélecteurs basés sur le type des éléments ou leur `id`.

Cibler avec un seul sélecteur tant que cela est possible. Éviter de cibler `.modal span` ou `.modal .date` mais plutôt `.modal-date` pour conserver un poids minimal. Cela implique que chaque élément HTML, même anodin tels que des `<span>`, de `<p>` ou des `<a>` disposent d'attributs de classe afin de pouvoir être ciblés sans avoir à faire à leur hiérarchie.

## Notation imbriquée Scss

TODO:

## Conventions variables selon les projets

### Workflow

TODO:

### Framework

TODO:

### Nommage

TODO: Sémantique (BEM) ou Utility first (TW)

## Faciliter la réutilisation de code

Repérer systématiquement les « objets CSS » (OOCSS), c'est-à-dire des « patterns visuels » qui se répètent, afin de définir ainsi des classes réutilisables, des styles de base et des variantes.

- Privilégier au maximum l'usage de classes plutôt que d'écrire des sélecteurs basés sur le type des éléments ou leur `id` [CSS with only class names](http://www.drinchev.com/blog/css-with-only-class-names/)
- Séparer la structure de l’apparence (une règle CSS ne devrait pas comporter à la fois `padding` et `background` par exemple)
- Séparer le conteneur du contenu (un composant ne devrait jamais être ciblé par un sélecteur qui tient compte de son parent)

Documentation : [http://www.nicoespeon.com/fr/2013/05/plongee-au-coeur-de-oocss/](http://www.nicoespeon.com/fr/2013/05/plongee-au-coeur-de-oocss/)

## Syntaxe

Les propriétés CSS sont - sauf exception - rédigées ligne par ligne dans chacun des blocs.

Un espace sépare le nom de la propriété de sa valeur, après les `:`.
Un espace sépare le sélecteur du bloc avant la première accolade `{`.

```
selecteur {
  color: hotpink;
  background: tomato;
}
```

## Ordre des déclarations

Les déclarations au sein d’une règle CSS sont ordonnées de façon à faire apparaître les propriétés importantes en tête de liste.

Voici dans quel ordre nous déclarons nos propriétés :

1. Contenu généré : les propriétés afférentes au contenu créé via `::after` et `::before` (`content`, `counter`, `quotes`).
2. Propriété display : tout ce qui affecte le rendu par défaut de l’élément (`none`, `block`, `inline`, `inline-block`, `flex`, `grid`, &hellip;).
3. Positionnement : tout ce qui détermine la position de l’élément (`position`, `float`, `top`, `right`, `bottom`, `left`, `vertical-align`, `z-index`, `clear`).
4. Modèle de boîte : tout ce qui influe sur les dimensions de l’élément (`width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`, `margin`, `padding`, `border`, `overflow`).
5. Transformations et transitions : propriétés et valeurs CSS 3 (`transform`, `transition`, `animation`).
6. Typographie : tout ce qui détermine les caractéristiques de la police de caractères (`font`, `text-align`, `text-decoration`, `letter-spacing`, `text-indent`, `line-height`, `text-transform`, `white-space`, `word-wrap`).
   Décoration : les propriétés purement ornementales (`background`, `color`, `list-style`, `outline`).

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

**_Note : l’outil "Stylelint" permet de réordonner automatiquement les déclarations CSS. Il devrait être intégré à notre Workflow sous forme de tâche Gulp : [https://www.npmjs.com/package/stylelint-order](https://www.npmjs.com/package/stylelint-order)_**

## Préfixes navigateurs

Certaines propriétés CSS nécessitent d’être préfixées de la manière suivante (et dans cet ordre) :

Exemple :

- `-webkit-propriété`
- `-moz-propriété`
- `-ms-propriété`
- `propriété`

**_Note : l’outil "Autoprefixer" permet de préfixer automatiquement les propriétés CSS. Il peut être utilisé sous forme de plugin (Atom, Brackets, Sublime text) ou intégré à un Workflow sous forme de tâche Gulp ou Grunt : [https://autoprefixer.github.io/](https://autoprefixer.github.io/)_**

## Hacks navigateurs

Les "hacks" sont des détournements de propriétés ou valeurs, permettant de tirer profit d’une faille des parseurs CSS des navigateurs.

En priorité, il est recommandé de privilégier d’autres méthodes que les hacks, car ceux-ci sont aléatoires et non pérennes.

En dernier ressort, employer la ressource [Browserhacks](http://browserhacks.com/).

## Commentaires

Usage de mots-clés informatifs au sein de commentaires importants sont appréciés, sous la forme :

- `TODO:` → point à finir / corriger avant de livrer

Cette syntaxe est préconisée car correspond au réglage par défaut de l'extension VSCode TODO Highlight <https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight>

D'autres mots-clés peuvent être utiles selon les projets (ne pas en abuser) :

- `@BUGFIX` → explication d’une correction de bug
- `@NOTE` → note importante à partager
- `@AUTHOR` → auteur du document
- `@TESTED` → navigateurs / environnements testés
- `@TOPROD` → note à l’intention de la version de production

## Choix des sélecteurs CSS

Le choix des sélecteurs CSS doit se faire en priorité pour leur pertinence et leur maintenabilité.

Ainsi, il est indiqué de pouvoir cibler n’importe quel élément indépendamment de son contexte : si l’élément doit être déplacé de son contexte, tel un module ou un composant, les styles devraient toujours s’appliquer.

De manière générale :

- **Il est préférable de cibler les éléments à l’aide de leur classe** qui pourrait être utilisée dans n’importe quel contexte, par exemple `.title-primary`,
- **Les sélecteurs #id doivent être évités en CSS** car trop spécifiques dans le calcul du poids. Si un id doit être ciblé, préférer un sélecteur d’attribut, par exemple `[id=header]`,
- **Les sélecteurs en cascade ou hyper-structurel doivent être évités** de manière générale (ex: `ul.header li .info` ou `h1 + p + p`),
- **Un sélecteur parfait est une classe unique,** par exemple `.title-primary` (pas d'imbrication, pas de sélecteurs multiples),
- La règle `!important` doit être éradiquée si possible du fait de son poids extrêmement important (certaines parties des styles peuvent toutefois exceptionnellement employer à juste titre `!important`).

## Nommage des sélecteurs CSS

Le nom d'un sélecteur CSS doit être "sémantique" dans le sens où il sera compris et maintenu par des collègues de travail (des êtres humains en général).

Se rapprocher d'une convention de nommage telle que
[BEM](https://en.bem.info/) facilite ce choix dans le cas de projets d'envergure ou de longue haleine : opter pour des nommages `__` pour les éléments, ou `--` pour les variantes est une convention de plus en plus courante.

Grâce au préprocesseur Sass, il est possible de bénéficier du sélecteur de parent `&` pour éviter les imbrications et favoriser ce nommage :

```css
.block {
  &__element {
    ...;
  }
  &--modifier {
    ...;
  }
}
```

Sera compilé en :

```css
.block__element {
  ...;
}
.block--modifier {
  ...;
}
```

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
  font-size: 62.5%; /* "base 10" au départ */
}
body {
  font-size: 1.4rem;
}
```

## Positionnement

### Modèle de boîte

Opter pour le modèle de boîte CSS3 (`box-sizing: border-box`) en début de la feuille de style.

Cela permet de connaître la taille de tous les éléments sans avoir à faire le calcul de `taille+padding+border`.

```
*,
*::before,
*::after {
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

Positionner les éléments en choisissant de préférence parmi ces méthodes selon l'objectif souhaité :

- Gabarit global de page : **Grid Layout** en priorité (prévoir une dégradation pour IE11);
- Composants (modales, galeries, paginations) : **Flexbox** en priorité, mais Grid Layout est une sérieuse option également;
- Placements d'éléments divers : `display: block` | `inline;`;
- Déplacements d'éléments : `transform: translate()`;
- Superposition d'éléments : Grid Layout, Flexbox, `position: absolute` | `sticky` | `fixed`;
- Enrobage d'éléments (images), ou cas très particuliers : `float: left` | `right`.

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
.o-container, .o-mod, .o-grid-container {
  /* objects : éléments génériques multitâches */
}
.c-button, .c-nav, .c-lightbox {
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
.kn-container, .kn-mod, .kn-grid {
  ...
}
```

Documentation : [http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

### Intervalles de z-index

Définir des plages d’empilement (z-index) et s’y tenir, afin d’éviter les chevauchements indésirables.

Par exemple :

- `0000–1999`: Elements and Components
- `2000–2999`: Element and Component Drop Downs
- `3000–3999`: Secondary Navigation
- `4000–4999`: Header / Footer
- `5000–5999`: Primary Navigation
- `6000–6999`: Full Screen Features
- `7000–7999`: Special Cases
- `8000–8999`: Modals / Dialog Windows
- `9000–9999`: Notifications

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

**Note :** La seule exception à cette règle concerne la propriété `flex-basis`. L'unité doit toujours être renseignée même si la valeur est de `0`. Ex. ne jamais écrire `flex: 1` mais `flex: 1 1 0%`.

### Animations gourmandes

- Toujours préciser quelle(s) propriété(s) doit être animée dans transition ou animation
- Éviter d’animer des propriétés autres que **transform** ou **opacity** ou **filter** (ou alors ajouter la
  propriété `will-change` et/ou le hack de `translateZ()`.) Source : [https://tzi.github.io/presentation-CSS-perfs/](https://tzi.github.io/presentation-CSS-perfs/)

**Non :**

```
div {
  margin-left: 10rem;
  transition: .5s;
}
```

**Oui :**

```
div {
  transform: translateX(10rem);
  transition: transform .5s;
  will-change: transform;
}
```

**Oui (variante) :**

```
div {
  margin-left: 10rem;
  transition: margin-left .5s;
  will-change: margin-left;
}
```

Documentation : [https://csstriggers.com/](https://csstriggers.com/)

### `@font-face`

N’imposez pas de chargements aux anciens navigateurs (IE8). Privilégiez `.woff2`.

Pour le détail, voir la partie ["medias / polices"](#polices)

## Sass et outils d’automatisation

### Répétitions

Utiliser des pré-processeurs (Sass, LESS) pour éviter les répétitions de code.

Concerne principalement :

- les couleurs de texte
- les couleurs de fond
- les tailles de police
- les breakpoints des Media Queries en Responsive

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

- **(min-width: \$breakpoint)\*\*** \*\*
- **(max-width: (\$breakpoint - 1))**

Exemple avec les variables de Breakpoints suivantes :

```
$tiny: 480px;
$small: 576px;
$medium: 768px;
$large: 992px;
$extra-large: 1200px;
```

**Non :**

```
@media (min-width: 767px) {...}
@media (max-width: 768px) {...}
@media (min-width: $small - 1) {...}
@media (min-width: $small) and (max-width: $large) {...}
```

**Oui :**

```
@media (min-width: 768px) {...}
@media (max-width: 767px) {...}
@media (min-width: $small) {...}
@media (min-width: $small) and (max-width: ($large - 1)) {...}
```

### Préfixes navigateurs

- Automatiser la gestion des préfixes à l’aide de Autoprefixer, ne pas le faire à la main
- Ne pas utiliser un mixin Sass/LESS pour cette tâche.

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

Éviter tant que possible les imbrications de plus d'un niveau en Sass.

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

Ces formats seront mentionnés en priorité dans la déclaration `@font-face` avant les autres formats (TTF, OTF, SVG). Voir [Optimiser le rendu des police @font-face](http://www.clever-age.com/veille/blog/optimiser-le-rendu-de-font-face.html)

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

**BONUS :** Il est vivement conseillé d'utiliser la directive `<link rel="preload">` pour charger les fontes de manière asynchrone.

Compatibilité : <http://caniuse.com/#feat=link-rel-preload>

Ressource : <https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf>

### Contenus de remplissage

Le remplissage par du contenu temporaire peut faire appel à _Lorem Ipsum_.

- Pour le texte :
  - [http://schnaps.it/](http://schnaps.it/)
  - [http://loripsum.net/](http://loripsum.net/)
  - [http://chuckipsum.com/](http://chuckipsum.com/)
- Pour les images :
  - [http://placekitten.com/](http://placekitten.com/)
  - [http://flickholdr.com/](http://flickholdr.com/)
