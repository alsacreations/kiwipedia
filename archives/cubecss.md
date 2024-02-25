# Guidelines : Cube CSS

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant **"Cube CSS"**. Ces indications sont destinées à évoluer dans le temps et à s'adapter à chaque nouveau projet.

Cube CSS est la Méthodologie d'intégration CSS générale que nous appliquons chez Alsacréations.

## Installation

- Il n'y a rien à installer, c'est une méthodologie et non un framework.
- Se référer à la [Documentation officielle](https://cube.fyi/).
- Cube CSS s'adapte à Sass, BEM, Bootstrap, WordPress, VueJS, etc.

### Pré-requis de Cube

Tout projet Cube CSS nécessite en amont au minimum :

- Un fichier **["Reset CSS"](https://github.com/alsacreations/bretzel/blob/main/public/bretzel-reset.css)**&#8239;: ce fichier est maintenu en interne chez nous et mis à jour régulièrement.
- Un Constructeur de classes utilitaires : **[Tailwind CSS](tailwind.md)** (sauf exceptions) pour la partie utilitaire dans Cube.

## Checklist

- On intègre la page à partir de [**Layouts**](#layouts-compositions) (des zones neutres et flexibles) déjà existants au sein d'une bibliothèque (ex. [Bretzel](http://bretzel.alsacreations.com/#layouts)).
- On insère les [**Composants**](#composants-blocks) au sein des Layouts. On les nomme à l'aide d'une classe "sémantique" *(ex. .card, .progressbar, .pagination)*.
- Les styles relatifs aux couleurs, espacements, typographie sont gérés prioritairement via [**classes utilitaires**](#utilities-classes-utilitaires) *(ex. .mt-16 md:gap-32 .bg-avocado .color-hotpink)*.
- Les classes d'un composant sont séparées visuellement via des [**crochets ou pipe**](#groupement-des-classes-dans-cube-css) avec un ordre précis&#8239;: nom sémantique, puis layout(s), puis classe(s) utilitaire(s). *(ex. [ card ] [ switcher ] [ .mt-16 md:gap-32 bg-avocado color-hotpink ])*
- On se sert principalement des attributs [**aria- (ou data-)**](#exceptions-variantes) pour différencier les états d'un composant *(ex. .link[aria-hidden] {...})* plutôt que d'ajouter une classe inutile.

----

### Layouts (Compositions)

**Les Layouts constituent l'un des principaux apports de la méthodologie CubeCSS&#8239;: il s'agit de zones d'affichages neutres et flexibles, conçues en Flexbox ou Grid Layout, réutilisables un peu partout et destinées à recueillir les composants.**

Toutes les pages web comportent l'un ou plusieurs de ces Layouts, souvent répétés. Il s'agit donc dans un premier temps de faire la liste des Layouts nécessaires pour les maquettes.

![galerie de Layouts visibles sur Bretzel](../images/layouts.png)

*(exemples de Layouts rassemblés sur [Bretzel](http://bretzel.alsacreations.com/#layouts))*

### Utilities (classes utilitaires)

Le "U" de "CUBE" signifie "Utilities" et désigne les classes utilitaires (également appelées atomiques) dont le principe est qu'à chaque classe correspond une action et une seule.

Les classes utilitaires sont à rédiger dans le HTML directement (ex. `<p class="mt-20 text-pink"></p>`) et on devrait se limiter aux informations de **Couleurs**, **Espacements** et **Typographie**, tant que possible.

Nous utilisons Tailwind CSS comme générateur de classes utilitaires. Le fichier de config de Tailwind, qu'il est indispensable d'adapter à chaque projet, permet :

- d'utiliser directement les classes utilitaires dans le HTML (ex. `<p class="mt-20 text-pink"></p>`)
- d'utiliser les variables au sein de CSS (ex. `p {margin-top: theme("clé.clé")`)

### Composants (Blocks)

Le "B" de "CUBE" signifie "Blocks". *Note : nous les appelons **"Components"** chez nous... parce que ce sont des "Composants" card, button, carrousel, progressbar, ...*

Exemple :

```css
.card-group {
  /* ici des styles qui ne seraient ni apportés par le Layout ni par les Utilities */
  display: grid;
  grid-template-columns: 1fr auto minmax(200px, 1fr);
}
```

```html
<div class="card-group | gap-8 md:gap-24"
```

### Exceptions (Variantes)

Le "E" de "CUBE" signifie "Exceptions", ce sont les variantes d'un composant ou d'un layout.

Cube CSS se sert des attributs `aria-` ou `data-` en HTML et le sélecteur d'attributs en CSS pour cibler les Exceptions ([pourquoi ?](https://www.aleksandrhovhannisyan.com/blog/represent-state-with-html-attributes-not-class-names/))&#8239;:

```html
<!-- exemple de variante de card -->
<div class="[ card ]" data-variant="reversed"></div>
```

```css
.card[data-variant="reversed"] {
  flex-direction: row-reverse;
}
```

Lorsqu'ils sont présents, utiliser autant que possible les **attributs ARIA** pour cibler les variantes d'un élément&#8239;:

```css
a[aria-current="page"] {...}
.toggle-btn[aria-expanded="true"] {...}
.label[aria-hidden="true"] {...}
```

### Groupement des classes dans Cube CSS

Les noms de classes sont regroupés par fonctions :

- Soit entre crochets (symboles `[` et `]`, ne pas oublier l'espace)
- Soit séparés par un "pipe" (symbole `|`, ne pas oublier l'espace)

 et dans cet ordre&#8239;:

1. Le **nom primaire** ("sémantique") du Block
2. Les **noms des Layouts** si nécessaires
3. Les **classes utilitaires** (*core* + *design tokens*)

```html
<!-- exemple de nommage groupé -->
<article class="[ card card--primary ] [ l-media ] [ bg-base color-primary ]" data-variant="reversed">
</article>
```

```html
<!-- autre exemple de nommage -->
<section class="[ card-group ] [ l-autogrid ]" role="group">
  <div class="[ card ] [ l-media ] [ mx-8 text-hotpink ]"></div>
</section>
```

```html
<!-- autre exemple de nommage (avec pipe) -->
<section class="card-group | l-autogrid" role="group">
  <div class="card | l-media | mx-8 text-hotpink"></div>
</section>
```
