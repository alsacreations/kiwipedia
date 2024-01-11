# Guidelines : CSS

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant **"CSS"**. Ces indications sont destinées à évoluer dans le temps et à s'adapter à chaque nouveau projet.

## Résumé

De manière générale et sauf projets d'intégration spécifiques, nous privilégions les méthodologies, langages et outils suivants&nbsp;:

- Méthodologie CSS : **[Cube CSS](cubecss.md)**
- Constructeur de classes utilitaires : **[Tailwind CSS](tailwind.md)**
- (optionnel mais recommandé) Préprocesseur **Sass** (syntaxe `.scss`) *ou* Post-processeur (**postCSS**)

## Bonnes pratiques CSS globales

### Points généraux

- Maintenabilité
  - Privilégier systématiquement l'usage de sélecteurs de **class** plutôt que les sélecteurs d'éléments (`li`, `span`, `p`) et ne jamais cibler via un sélecteur `#id`.
  - Éviter les *sélecteurs composés* tels que `.modal span` ou `.modal .date` mais plutôt `.modal-date` pour conserver une spécificité minimale.
  - Prévoir dès le départ un nom de classe pour chaque élément HTML (même anodin tels que `<span>`, `<p>` ou `<a>`) afin qu'il puisse être ciblés sans avoir à faire à sa hiérarchie.
  - Éviter d’écraser une règle CSS par une autre.
  - La règle `!important` doit être éradiquée si possible du fait de son poids extrêmement important (certaines parties des styles peuvent toutefois exceptionnellement employer à juste titre `!important`).
- Performances
  - Durant la phase de développement l'intégration se fait sur plusieurs fichiers CSS (composants, layout, etc.) que l'on rassemble  dans un fichier unique (par exemple via `@use` qui [remplace progressivement `@import` dans Sass](https://sass-lang.com/documentation/at-rules/import/))
  - Les fichiers CSS doivent être minifiés pour économiser du poids de chargement.

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

## Unités

La première règle est : *"si la valeur doit pouvoir s'adapter à la taille de police de l'utilisateur, utiliser des `rem`, sinon utiliser des `px`"*. Consulter [l'article de Josh Comeau](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/) pour les détails et cas concrets.

La seconde règle est : *"Éviter d'indiquer une taille à un élément, privilégier la fluidité (`1fr` dans Grid Layout, `flex-grow` dans Flexbox) lorsque cela est possible"*.

La troisième règle est : *"Éviter d'imposer une hauteur à un élément possédant du contenu tant que cela est possible"*.

On privilégie le `rem` pour :

- La taille de police (`1rem` est équivalent à `16px`)
- Les Media Queries (`576px` = `36rem`, `992px` = `62rem`, `1400px` = `87.5rem`)

On privilégie le `px` pour :

- Les espacements verticaux et horizontaux entre les élements (gouttières, rythme vertical)
- Les dimensions d'éléments non dépendants de la taille de contenu (images)

Autres unités :

- `dvh` pour la hauteur de page (`body`)
- `pt` exclusivement en feuille de styles print

## Sass / postCSS

Certaines fonctionnalités CSS indispensables ne sont actuellement pas réalisables en natif&nbsp;:

- Concaténation des fichiers lors d'un `@use` (successeur de `@import`)
- Mixins
- Custom Media (Media Queries contenant une variable)
- <del>Imbrications de sélecteurs</del>
- <del>Variables et constantes</del>

Selon les projets, deux options sont envisagées pour bénéficier de ces fonctionnalités&nbsp;:

- Le pré-processeur [Sass](https://sass-lang.com/) (syntaxe `.scss`) dans nos projets d'intégration.
- Le post-processeur [PostCSS](https://postcss.org/)

Quelle que soit la solution choisie, la méthode de compilation vers CSS dépend du type de projet (statique, Vue, Vite, Webpack, etc.).

## Variables

Le Constructeur de classes utilitaires propose un fichier de configuration contenant les "variables" de l'ensemble du projet (couleurs, tailles, breakpoints, etc.). Ces variables sont à utiliser en priorité (ex. `font-size: theme('fontSize.18');` pour Tailwind), et **nous n'utilisons pas de variables Sass dans nos projets**.

**Aucune valeur numérique ne devrait apparaître dans les styles de développement sans être associée à une variable.**

## Notation imbriquée (nesting)

Nous utilisons **la notation imbriquée (nesting) de CSS natif** car elle facilite la lecture et la maintenabilité du code en évitant de répéter les occurences de chaque sélecteur.

Le nesting est particulièrement préconisé pour :

- Les événements tels que `&:hover`, `&:focus`, `&:active`.
- Les pseudo-classes telles que `&:first-child`, `&:empty`, etc.
- Les pseudo-éléments tels que `&::before`, `&::after`.
- Les media queries `@media ()`.

**À privilégier** *(le nesting permet de réduire les duplications de sélecteurs) :*

```scss
.wrapper {
  
  &:hover, &:focus {}
  &::before, &::after {}
  
  @media (width > 36rem) {
    &::before {}
  }
}
```

L'inconvénient de la notation imbriquée est qu'elle génère des sélecteurs CSS composés donc avec une spécificité qui augmente. **Il est conseillé de limiter la syntaxe à un seul niveau d'imbrication.**

📖 **Ressource complémentaire : ["When to nest?"](https://cloudfour.com/thinks/when-to-nest-css/)**

## Breakpoints et Media Queries

La liste de points de rupture (breakpoints) figure dans la configuration du contructeur de classes utilitaires (ex. `@screen valeur {}` pour Tailwind).

Sauf contre-indication selon projet, les valeurs des breakpoints sont :

- `sm: 36rem` // 576px
- `md: 62rem` // 992px
- `lg: 87.5rem` // 1400px

```css
/* composant card sur écran "lg" ou plus, version Tailwind */
.card {
    display: flex;

    @screen lg {
        flex-direction: column;
    }
}
```

Pour les projets sans Tailwind, nous utilisons la syntaxe "moderne" des Media Queries :

```css
/* composant card sur écran "lg" ou plus, version classique */
.card {
    display: flex;

    @media (width >= 87.5rem) {
        flex-direction: column;
    }
}
```

## Transitions et animations

- Éviter d’animer des propriétés autres que `transform` (`translate`, `rotate`, `scale`) ou `opacity` ou `filter` (ou alors ajouter la propriété `will-change` au cas par cas).
- Toujours préciser quelle(s) propriété(s) doit être animée dans une transition ou animation. Par exemple `transition: 0.5s scale`.

🔖 <https://animotion.dev/>

### Animer du SVG

Quelques précautions sont à prendre concernant les SVG :

- Compresser le fichier à l'aide de SVGOMG
- donner des noms de classe à chaque `path` qui doit être animé
- appliquer les styles CSS suivants&hellip;

```css
svg {
  /* Par défaut les navigateurs masquent ce qui dépasse du Viewbox */
  /* ressource : https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/overflow */
  overflow: visible;
}
```

```css
svg * {
  /* Par défaut le référent pour transform-origin est l'ensemble du SVG (view-box) */
  /* ressource : https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box#svg_transform-origin_scoping */
  transform-box: fill-box;
}
```

## Méthodes de positionnement

Nous privilégions **Flexbox et Grid Layout** de manière générale en tenant compte de certains points d'attention.

### Grid Layout

[Grid Layout](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout) sera choisi en priorité pour les avantages suivants :

- Gère parfaitement les deux axes à la fois
- Place très précisément les éléments
- Permet de cibler uniquement le parent
- A peu de comportements contre-intuitifs
- Les areas offrent une représentation visuelle idéale
- Gère très bien le Responsive via Media Queries

Les inconvénients majeurs de Grid Layout sont :

- Gère moins bien le Responsive via taille du contenu ou [Container Queries](https://www.alsacreations.com/article/lire/1915-Les-Container-Queries-en-CSS.html)

### Flexbox

[Flexbox](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) sera choisi en priorité pour les avantages suivants :

- Passage à la ligne (wrap) d'enfants de tailles différentes
- Centrage simple de rangées multiples
- Grande liberté donnée aux enfants (grow, shrink)
- Prévoit un affichage inversé (*-reverse)
- Permet de se passer de Media / Container Queries

Les inconvénients majeurs de Flexbox sont :

- Ne gère pas bien les deux axes en même temps
- De nombreux comportements contre-intuitifs (alignements, shrink, min-width)

👉 **Lorsqu'aucune des deux méthodes ne sort clairement du lot, alors Grid Layout sera notre choix par défaut.**

📖 **Ressource complémentaire : ["When to use Flexbox and when to use CSS Grid"](https://blog.logrocket.com/css-flexbox-vs-css-grid/)**

## Mode d'apparence (Light Mode, Dark Mode)

Le mode d'apparence est un paramètre que l'utilisateur peut définir via ses réglages systèmes ainsi que via son navigateur.

Les techniques CSS modernes permettent de gérer finement ces modes :

- Couleurs système (ex. Canvas, CanvasText)
- `@prefers-color-scheme` : Teste le Mode d'apparence utilisateur (système ou navigateur) et permet de s'y adapter
- `color-scheme` : Force le navigateur à adapter l'UI à un Mode d'apparence (couleurs système, scrollbars, boutons,...)
- `light-dark()` : Fonction permettant d'alterner deux couleurs selon le Mode d'apparence. Expérimental

Dans nos projets, **les classes utilitaires de Tailwind sont idéales pour gèrer les modes d'apparence** à partir du moment où le dark mode est indiqué dans le fichier de config : `darkMode: 'class', // 'false' or 'media' or 'class'` (`class` = une classe est ajoutée sur `html`, `media` = c'est `@prefers-color-scheme` qui s'en charge).

Ainsi, un exemple de bouton qui s'adapte automatiquement aux modes light ou dark pourrait s'écrire ainsi :

```html
<button class="
  btn btn-icon | text-gray-90 dark:text-gray-10  bg-fairytale dark:bg-gray-90"
>Hey !</button>
```

## Fonts, polices de caractère

On privilégie l'auto-hébergement des fichiers de police, sans passer par Google Fonts <https://gwfh.mranftl.com/fonts>

## Bonus : Media print (impression)

Nous proposons une feuille de styles "Print" dans nos projets d'intégration web.

La feuille de styles dédiée à l'impression aide aussi à l'export PDF dans le navigateur. La plupart du temps il s'agira en priorité de masquer les éléments inutiles dans un document statique ou papier (ex : navigation) et de retirer les décorations superflues.

- [Une feuille de styles de base pour le media print](https://www.alsacreations.com/astuce/lire/1160-Une-feuille-de-styles-de-base-pour-le-media-print.html)
- [Faire une feuille de style CSS print pour l'impression](https://www.alsacreations.com/tuto/lire/586-feuille-style-css-print-impression.html)
