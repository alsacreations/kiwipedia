# Guidelines : CSS

Statut : Working Draft (WD)

Cette présente convention rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant **CSS**. Elle a pour but d'évoluer dans le temps et de s'adapter au fur et à mesure de nos expériences et projets.

## Résumé

De manière générale et sauf projets d'intégration spécifiques, nous privilégions les méthodologies, langages et outils suivants&nbsp;:

- Méthodologie CSS : **Cube CSS**
- Langage : **Sass** (syntaxe `.scss`)
- Constructeur de classes utilitaires : **Tailwind CSS**

Tous les détails et bonnes pratiques internes concernant ces technologies sont détaillés au sein de ce présent document.

## Bonnes pratiques CSS globales

### Points généraux

- Opter pour des tailles de polices fluides (de préférence en `rem`), éviter les tailles de police de taille fixe (`px` ou `pt`) car inaccessible aux personnes nécessitant d’agrandir les contenus textuels.
- Éviter d’écraser une règle par une autre.
- La règle `!important` doit être éradiquée si possible du fait de son poids extrêmement important (certaines parties des styles peuvent toutefois exceptionnellement employer à juste titre `!important`).
- Durant la phase de développement l'intégration se fait sur plusieurs fichiers CSS (composants, layout, etc.) que l'on rassemble (`@import`) dans un fichier unique.
- Les fichiers CSS doivent être minifiés pour économiser du poids de chargement.
- Toujours préciser quelle(s) propriété(s) doit être animée dans une transition ou animation.
- Éviter d’animer des propriétés autres que **transform** ou **opacity** ou **filter** (ou alors ajouter la propriété `will-change` au cas par cas).

### Sélection des éléments

La maintenabilité des feuilles de styles est une priorité. Il est nécessaire de favoriser les sélecteurs ayant le moins de spécificité (poids) possible afin de faciliter les modifications ultérieures ou dans des contextes différents (Responsive).

- Privilégier au maximum l'usage de [**classes**](http://www.drinchev.com/blog/css-with-only-class-names/) plutôt que d'écrire des sélecteurs basés sur le type des éléments ou leur `id`.
- Le sélecteur CSS doit être _unique_ si cela est possible (une seule classe). Éviter les _sélecteurs composés_ tels que `.modal span` ou `.modal .date` mais plutôt `.modal-date` pour conserver un poids minimal.
- Prévoir dès le départ un nom de classe pour chaque élément HTML (même anodin tels que `<span>`, `<p>` ou `<a>`) afin de pouvoir être ciblés sans avoir à faire à leur hiérarchie.

### Ordre des déclarations

Les déclarations au sein d'une règle CSS sont ordonnées de façon à faire apparaître les propriétés importantes en tête de liste.

Voici dans quel ordre nous déclarons nos propriétés :

1. Propriété **`display`** : tout ce qui affecte le rendu par défaut de l’élément
2. **Positionnement** : tout ce qui détermine la position de l’élément
3. **Modèle de boîte** : tout ce qui influe sur les dimensions de l’élément
4. **Transformations** et **transitions**
5. **Typographie** : tout ce qui détermine les caractéristiques de la police de caractères
6. **Décoration** : les propriétés purement ornementales

Exemple :

```css
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
  background: rgba(0, 0, 0, 0.5);
}
```

**_Note : La démarche de réordonnement est manuelle, en se servant de cette liste comme référence.**

## Méthodologie : Cube CSS

Cube CSS est une Méthodologie d'intégration CSS conçue par Andy Bell en 2019 ([Documentation officielle](https://cube.fyi/)).

**CUBE est un acronyme qui signifie Compositions, Utilities, Blocks, Exceptions** (détails ci-après).

Le grand principe de la méthodologie Cube CSS est - contrairement à beaucoup d'autres - "d'embrasser la Cascade CSS plutôt que d'essayer de la contrer".

Les styles sont progressivement hérités de la page gobale, vers des compositions, puis vers les différents composants.

**Cube CSS est une méthodologie et non un framework, donc s'adapte à Sass, BEM, Bootstrap, WordPress, VueJS, etc.**

### Pré-requis de Cube

Tout projet Cube CSS nécessite en amont au minimum :

- Un fichier **["Reset CSS"](https://github.com/alsacreations/bretzel/tree/main/_base)** : ce fichier est maintenu en interne chez nous et mis à jour régulièrement.
- Une **feuille de styles basique** pour définir les styles des éléments de générique : html, body (taille de base, couleur, police), liens (+ survol et focus), titres, listes, etc.

### Compositions (Layouts)

Le "C" de "CUBE" signifie "Compositions". _Note : nous les appelons **"Layouts"** chez nous pour éviter de faire la confusion avec "Composants"._

![galerie de Layouts visibles sur Bretzel](images/layouts.png)

_(exemples de Layouts rassemblés sur [Bretzel](http://bretzel.alsacreations.com/#layouts))_

**Les Layouts constituent l'un des principaux apports de la méthodologie CubeCSS&nbsp;: il s'agit de zones d'affichages neutres et flexibles réutilisables un peu partout et destinées à recueillir les composants.**

Toutes les pages web comportent l'un ou plusieurs de ces Layouts, souvent répétés. Il s'agit donc dans un premier temps de faire la liste des Layout nécessaires pour les maquettes.

### Utilities (classes utilitaires)

Le "U" de "CUBE" signifie "Utilities" et désigne les classes utilitaires (également appelées atomiques) dont le principe est qu'à chaque classe correspond une action et une seule.

Les classes utilitaires sont à rédiger dans le HTML directement (ex. `<p class="mt-20 text-pink"></p>`) et on devrait se limiter aux informations de **Couleurs**, **Espacements** et **Typographie**, tant que possible.

#### Générateur de classes utilitaires&nbsp;: Tailwind

Nous utilisons [Tailwind CSS](https://tailwindcss.com) comme générateur de classes utilitaires (uniquement la partie `@utilities`).

Le fichier de config de Tailwind, qu'il est indispensable d'adapter à chaque projet, permet :

- d'utiliser directement les classes utilitaires dans le HTML (ex. `<p class="mt-20 text-pink"></p>`)
- d'utiliser les variables au sein de CSS (ex. `p {margin-top: theme(clé.clé)`)

### Blocks (Composants)

Le "B" de "CUBE" signifie "Blocks". _Note : nous les appelons **"Components"** chez nous... parce que ce sont des "Composants" card, button, carrousel, progressbar, ...)_

Exemple :

```css
.card {
  /* ici des styles qui ne seraient ni apportés par le Layout ni par les Utilities */
}
```

### Exceptions (Variantes)

Le "E" de "CUBE" signifie "Exceptions", ce sont les variantes d'un composant ou d'un layout.

Cube CSS utilise les attributs `data-` en HTML et le sélecteur d'attributs en CSS pour cibler les Exceptions ([pourquoi ?](https://www.aleksandrhovhannisyan.com/blog/represent-state-with-html-attributes-not-class-names/))&nbsp;:

```html
<!-- exemple de variante de card -->
<div class="[ card ]" data-variant="reversed"></div>
```

```css
.card[data-variant="reversed"] {
  flex-direction: row-reverse;
}
```

Lorsqu'ils sont présents, utiliser autant que possible les **attributs ARIA** pour cibler les variantes d'un élément&nbsp;:

```css
a[aria-current="page"] {...}
.toggle-btn[aria-expanded="true"] {...}
.label[aria-hidden="true"] {...}
```

### Groupement des classes dans Cube CSS

Les noms de classes sont regroupés par fonctions, entre crochets (symboles `[` et `]`, ne pas oublier l'espace) et dans cet ordre&nbsp;:

1. Le **nom primaire** ("sémantique") du Block
2. Les **noms des Layouts** si nécessaires
3. Les **classes utilitaires** (core + design tokens)

```html
<!-- exemple de nommage groupé -->
<article class="[ card ] [ section box ] [ bg-base color-primary ]" data-variant="reversed">
</article>
```

```html
<!-- autre exemple de nommage -->
<section class="[ card-group ] [ auto-grid ]" role="group">
  <div class="[ card ] [ sidebar ] [ mx-8 text-hotpink ]"></div>
</section>
```

## Guidelines Sass

Nous employons le pré-processeur [Sass](https://sass-lang.com/) (syntaxe `.scss`) dans nos projets d'intégration.

Sass apporte des fonctionnalités CSS indispensables&nbsp;: concaténation, variables, notation imbriquée, mixins, etc. La méthode de compilation de Sass vers CSS dépend du type de projet (statique, Vue, Gulp, etc.).

### Variables

Utiliser systématiquement les variables Sass (`$variable`) pour éviter les répétitions de code et favoriser la maintenance du projet.

Cette consigne concerne principalement :

- les couleurs de texte
- les couleurs de fond
- les tailles de police
- les breakpoints des Media Queries en Responsive
- les margin et les padding

**Aucune de ces valeurs ne devraient apparaître dans les styles de développement sans être associées à des variables.**

### Notation imbriquée

La [Notation imbriquée](https://sass-lang.com/guide#topic-3) (nesting) de Sass offre une vision sur la "hiérarchie" du composant et facilite la lecture du code.

Les inconvénients majeurs de cette notation sont :

- Qu'elle génère des sélecteurs CSS composés (donc avec un poids qui augmente).
- Qu'elle impose une structure au sélecteur. L'élément n'est ciblé que s'il est descendant d'un autre élément. On ne peut plus réutiliser l'élément ailleurs, au sein d'une autre structure.

**Il est conseillé d'éviter les sélecteurs imbriqués, ou au pire de limiter la syntaxe à un seul niveau d'imbrication.**

**À éviter** (car génère des sélecteurs composés de 3 niveaux `.home .home-first .home-spotlights { … }`) :

```scss
.home {
  .home-first {
    .home-spotlights {
    }
  }
}
```

**À éviter** (génère un sélecteur simple `.home-first-spotlights { … }`, mais rend difficile la lecture du code et la recherche dans les fichiers) :

```scss
.home {
  &-first {
    &-spotlights {
    }
  }
}
```

**À conseiller si vraiment nécessaire** (un seul niveau d'imbrication génère des sélecteurs composés de 2 niveaux au maximum `.home .home-first { … }`) :

```scss
.home {
  .home-first {
  }
  .home-spotlights {
  }
}
```

**Exception : le sélecteur de parent `&` est parfaitement préconisé dans le cas d'événements tels que `&:hover`, `&:focus` ou `&:active`.**

### Breakpoints et Media Queries

La liste de points de rupture (breakpoints) recommandée est proposée sous forme de couple "clé:valeur" et peut bien entendu être élargie&nbsp;:

```scss
$breakpoints : (
  sm: 576px,
  md: 992px,
  lg: 1400px
);
```

Conformément à la démarche "Mobile First", ces valeurs correspondent à des jalons minimum : `sm: '576px'` correspond au Media Query `@media (min-width: 576px) {...}`.

Pour éviter les intervalles qui se chevauchent, ou des Media Queries trop variés, nous préconisons d'appliquer un [mixin Sass "respond-to"](https://github.com/alsacreations/KNACSS/blob/master/sass/abstracts/_mixins-sass.scss) pour appliquer des styles Responsive&nbsp;:

```scss
.modal {
  background: $hotpink;
  @include respond-to('medium-up') {
    background: $tomato;
  }
}
```

Les valeurs prévues dans notre mixin sont (privilégier les premières, respectueuses de la méthodologie "Mobile First") :

- `'small-up'` : correspond à `(min-width: $small)`
- `'medium-up'` : correspond à `(min-width: $medium)`
- `'large-up'` : correspond à `(min-width: $large)`
- `'extra-large-up'` : correspond à `(min-width: $extra-large)`
- `'small'` : correspond à `(max-width: $small - 1)`
- `'medium'` : correspond à `(max-width: $medium - 1)`
- `'large'` : correspond à `(max-width: $large - 1)`
- `'extra-large'` : correspond à `(max-width: $extra-large - 1)`

## Bonus : Media print (impression)

Nous proposons une feuille de styles "Print" dans nos projets d'intégration web.

La feuille de styles dédiée à l'impression aide aussi à l'export PDF dans le navigateur. La plupart du temps il s'agira en priorité de masquer les éléments inutiles dans un document statique ou papier (ex : navigation) et de retirer les décorations superflues.

- [Une feuille de styles de base pour le media print](https://www.alsacreations.com/astuce/lire/1160-Une-feuille-de-styles-de-base-pour-le-media-print.html)
- [Faire une feuille de style CSS print pour l'impression](https://www.alsacreations.com/tuto/lire/586-feuille-style-css-print-impression.html)
