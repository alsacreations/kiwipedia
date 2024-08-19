# Guidelines : CSS

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant **"CSS"**. Ces indications sont destinées à évoluer dans le temps et à s'adapter à chaque nouveau projet.

## CSS natif ou utilitaire

Ces guidelines CSS sont le fruit de plusieurs années d'expérience en méthodologies (OOCSS, BEM, CubeCSS) et frameworks (Bootstrap, Tailwind). À ce jour, deux méthodes d'intégration CSS ont démontré leurs avantages en production : "CSS natif" et "CSS utilitaire". **Nous optons pour l'une ou l'autre de ces méthodes en début de projet**, selon les contraintes et les affinités des personnes concernées.

**Ce présent document s'applique exclusivement à la méthode "CSS natif".**

### Qu'appelons-nous CSS natif ?

Également appelé "Vanilla", l'intégration CSS native correspond à la méthode historique (fichiers CSS, nommage "sémantique", etc.).

- Nous rédigeons les règles de styles dans une ou plusieurs feuilles de styles
- Nous employons la convention de nommage décrite dans les [guidelines HTML](html.md),
- Nous ne faisons pas usage de classes utilitaires sauf rares exceptions (par exemple pour distinguer un élément parmi d'autres semblables)
- Toutes les valeurs des propriétés CSS sont renseignées au sein d'un fichier de configuration (design tokens) et appliquées sous forme de custom properties (ex. `font-weight: var(--font-weight-400)`)
- De manière optionnelle (mais encore recommandée), nous utilisons un Préprocesseur **Sass** (syntaxe `.scss`) *ou* un Post-processeur (**postCSS**) pour diverses fonctions encore non réalisables en CSS natif.
- Notre Reset CSS (et print) est appliqué sur chaque projet : **[Bretzel](https://github.com/alsacreations/bretzel/blob/main/public/bretzel-reset.css)**

## Bonnes pratiques CSS globales

### Points généraux

- Maintenabilité
  - Nous privilégions systématiquement l'usage de sélecteurs de **class** plutôt que les sélecteurs d'éléments (`li`, `span`, `p`) et ne ciblons jamais via un sélecteur `#id`.
  - Nous évitons tant que possible les *sélecteurs composés* tels que `.modal span` ou `.modal .date` mais plutôt `.modal-date` pour conserver une spécificité minimale.
  - Nous prévoyons dès le départ un nom de classe pour chaque élément HTML (même anodin tels que `<span>`, `<p>` ou `<a>`) afin qu'il puisse être ciblé sans avoir à tenir compte de sa hiérarchie.
  - Nous évitons d’écraser une règle CSS par une autre.
  - Nous évitons tant que possible la règle `!important` du fait de sa spécificité extrême.
- Performances
  - Durant la phase de développement l'intégration se fait sur plusieurs fichiers CSS (composants, layout, etc.) que l'on rassemble dans un fichier unique.
  - Les fichiers CSS sont minifiés en productio pour économiser du poids de chargement.

### Ordre des déclarations

Les déclarations au sein d'une règle CSS sont ordonnées de façon à faire apparaître les propriétés importantes en tête de liste.

Voici dans quel ordre nous déclarons nos propriétés :

1. Propriété **`display`** : tout ce qui affecte le rendu par défaut de l’élément
2. **Positionnement** : tout ce qui détermine la position de l’élément (`position`, `top`, `z-index`, , `overflow` etc.)
3. **Modèle de boîte** : tout ce qui influe sur les dimensions de l’élément (`width`, `height`, `margin`, `padding`, etc.)
4. **Transformations** et **transitions**
5. **Typographie** : tout ce qui détermine les caractéristiques de la police de caractères (`color`, `font-size`, `line-height`, etc.)
6. **Décoration** : les propriétés purement ornementales (`background-color`, `border`, `border-radius`, etc.)

Règles additionnelles :

- On écrit `margin` avant `padding`.
- Les *états* (survol, focus, active) s'écrivent à la fin des règles concernant l'élément, séparés par une ligne vide.
- Les *media queries* s'écrivent à la fin des règles concernant l'élément et ses états, séparées par une ligne vide.
- **On réordonne automatiquement les propriétés CSS à l'aide de [`prettier-plugin-css-order`](https://www.npmjs.com/package/prettier-plugin-css-order)**

Exemple :

```css
.selecteur {
    display: inline-block;
    z-index: var(--z-index-100);
    position: relative;
    top: var(--spacing-4);
    margin: var(--spacing-4);
    padding: 0;
    border: 1px solid var(--colors-pink-60);
    background: var(--colors-blue-10);
    color: var(--colors-pink-60);
    font-weight: var(--font-weight-700);
    font-size: var(--font-size-18);
    font-family: system-ui, arial, sans-ferif;
    text-align: right;

    &:hover,
    &:focus {
        color: var(--colors-kiwigreen);
    }

    @media (width >= 40rem) {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: var(--spacing-4);
    }

    @media (prefers-color-scheme: dark) {
        border-color: var(--colors-pink-10);
        color: var(--colors-kiwigreen);
    }
}
```

## Unités

La première règle à observer est : *"si la valeur doit pouvoir s'adapter à la taille de police de l'utilisateur, utiliser des `rem`, sinon utiliser des `px`"*. Consulter [l'article de Josh Comeau](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/) pour les détails et cas concrets.

La seconde règle est : *"Éviter d'indiquer une taille à un élément, privilégier la fluidité (`1fr` dans Grid Layout, `flex-grow` dans Flexbox) lorsque cela est possible"*.

La troisième règle est : *"Éviter d'imposer une hauteur à un élément possédant du contenu tant que cela est possible"*.

On privilégie le `rem` pour :

- La taille de police (`1rem` est équivalent à `16px`)
- Les Media Queries (`576px` = `36rem`, `992px` = `62rem`, `1400px` = `87.5rem`)

On privilégie le `px` pour :

- Les espacements verticaux et horizontaux entre les élements (gouttières, rythme vertical)
- Les dimensions d'éléments non dépendants de la taille de contenu (images)

Autres unités :

- `dvh` pour la hauteur (minimum) de page (`body`)
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

## Variables / Custom properties

Dans le cas de nos projets en CSS natif avec Constructeur de classes utilitaires&#8239;:

- Nous utilisons **toujours** les [custom properties CSS](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties) (ex. `--color-hotpink`).
- Nous n'utilisons **pas** de variables Sass (ex. `$color-hotpink`) *même si Sass est intégré au projet*.
- Nous n'appliquons pas de classes utilitaires dans le HTML (ex. `<p class="text-hotpink"`) sauf rares exceptions où le gain en temps et code est flagrant.

**Aucune valeur numérique (hors `0`) ne devrait apparaître dans les styles sans être associée à une custom property.**

Pour rappel, les *custom properties* s'appliquent au Shadow DOM et sont parfaites dans le cas de projets spécifiques avec web components.

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
  
  @media (width >= 40rem) {
    &::before {}
  }
}
```

**À éviter** *(le nesting peut conduire à augmenter la spécificité finale) :*

```scss
.wrapper {
  
  & .child {

    & .subchild {

    }
  }
}
```

L'inconvénient de la notation imbriquée est qu'elle génère des sélecteurs CSS composés donc avec une spécificité qui augmente. **Il est conseillé de limiter la syntaxe à un seul niveau d'imbrication.**

🔖 ["When to nest?"](https://cloudfour.com/thinks/when-to-nest-css/)

## Breakpoints et Media Queries

La liste de points de rupture (*breakpoints*) figure dans la configuration du contructeur de classes utilitaires.

Sauf contre-indication selon projet, les valeurs des breakpoints sont exprimées [en unité `rem`](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/#media-queries-7)&#8239;:

- `sm: 40rem` // 640px
- `md: 48rem` // 768px
- `lg: 64rem` // 1024px
- `xl: 80rem` // 1280px
- `2xl: 96rem` // 1536px

```css
/* composant card sur écran "lg" ou plus, version avec Constructeur de classes utilitaires */
.card {
    display: flex;

    @screen lg {
        flex-direction: column;
    }
}
```

Pour les projets sans Constructeur de classes utilitaires, nous utilisons la syntaxe "moderne" des Media Queries&#8239;:

```css
/* composant card sur écran "640" ou plus */
.card {
    display: flex;

    @media (width >= 40rem) {
        flex-direction: column;
    }
}
```

## Transitions et animations

- Éviter d’animer des propriétés autres que `transform` (`translate`, `rotate`, `scale`) ou `opacity` ou `filter` (ou alors ajouter la propriété `will-change` au cas par cas).
- Toujours préciser quelle(s) propriété(s) doit être animée dans une transition ou animation. Par exemple `transition: 0.5s scale`.

### Animer du SVG

Quelques précautions sont à prendre concernant les SVG :

- Compresser le fichier à l'aide de SVGOMG
- donner des noms de classe à chaque `path` qui doit être animé
- appliquer les styles CSS suivants&hellip;:<>

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

Nous privilégions **Grid Layout** en priorité (aidé de *grid area* autant que possible), puis **Flexbox** en tenant compte de certains points d'attention.

### Grid Layout

[Grid Layout](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout) est choisi en priorité pour les avantages suivants :

- **Affichage vertical par défaut**
- Gère parfaitement les deux axes à la fois
- Place très précisément les éléments
- Permet de cibler uniquement le parent
- A peu de comportements contre-intuitifs
- Les *areas* offrent une représentation visuelle idéale
- Gère très bien le Responsive via Media Queries

Les inconvénients majeurs de Grid Layout sont :

- Gère moins bien le Responsive via taille du contenu ou [Container Queries](https://www.alsacreations.com/article/lire/1915-Les-Container-Queries-en-CSS.html)

### Flexbox

[Flexbox](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) est choisi en priorité pour les avantages suivants :

- **Affichage horizontal par défaut**
- Passage à la ligne (wrap) d'enfants de tailles différentes
- Centrage simple de rangées multiples
- Grande liberté donnée aux enfants (grow, shrink)
- Prévoit un affichage inversé (*-reverse)
- Permet de se passer de Media / Container Queries

Les inconvénients majeurs de Flexbox sont :

- Ne gère pas bien les deux axes en même temps
- De nombreux comportements contre-intuitifs (alignements, shrink, min-width)

👉 **Lorsqu'aucune des deux méthodes ne sort clairement du lot, alors Grid Layout est notre choix par défaut.**

🔖 ["When to use Flexbox and when to use CSS Grid"](https://blog.logrocket.com/css-flexbox-vs-css-grid/)

### Autres positionnements

- `position: absolute` : nécessaire pour placer un élément en "overlay" (par-dessus d'autres éléments). Le référent est le premier ancêtre lui-même *positionné*.
- `position: relative` : utile principalement pour servir de référent à un descendant en `absolute`. Ne pas déplacer des éléments via cette position, privilégier systématiquement les transformations (`translate: x y;`).
- `position: static` : valeur par défaut de `position`.
- `position: sticky` : permet de faire *coller* un élément aux bords de la fenêtre (ex. un header). Le référent est le Viewport. Nécessite un point d'ancrage (ex. `top: 0`).
- `float` : permet à un élément de se placer à gauche ou droite et que le contenu suivant s'écoule autour. Uniquement utile pour "habiller" une image.

## Pseudo-classes et pseudo-éléments

Les pseudo-classes s'écrivent avec `:`, les pseudo-éléments s'écrivent avec `::`.

### Pseudo-éléments

- Les pseudo-élements les plus courants sont `::before` et `::after`.
- Ils nécessitent la propriété `content: "contenu"` pour être affichés.
- Leur contenu n'est pas systématiquement restitué (lu) par les assistances techniques, il ne faut pas apporter des informations à l'aide de pseudo-éléments (ex. ne pas écrire ceci `content: "(lien externe)"` ni `content: "[↗]"`).
- Nesting : Les pseudo-éléments sont de bons candidats à la syntaxe imbriquée telle que `&::before`, `&::after`.
- Les pseudo-éléments sont à rédiger en CSS natif et non en classe utilitaire (éviter `class="before:content-['Hello_World']"`)

### Pseudo-classes

- Il existe une [60aine de pseudo-classes](https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-classes)
- Nesting : Les pseudo-classes sont de bons candidats à la syntaxe imbriquée telle que `&:first-child`, `&:empty`, etc.
- Les pseudo-classes sont à rédiger en CSS natif et non en classe utilitaire sauf `:hover`, `:focus` et `:active` qui sont parfaitement adaptées à cette syntaxe (ex. `class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700`).

## Dark Mode

Le mode d'apparence (Light Mode, Dark Mode) est un paramètre que l'utilisateurice peut définir via ses réglages système ainsi que via son navigateur.

Dans nos projets en CSS natif, les techniques modernes permettent de gérer finement ces modes&#8239;:

- `@prefers-color-scheme` : Teste le Mode d'apparence utilisateur (système ou navigateur) et permet de s'y adapter
- `color-scheme` : Force le navigateur à adapter l'UI à un Mode d'apparence (couleurs système, scrollbars, boutons,...). Ce réglage fait partie de notre Reset CSS, il est inutile de le modifier.

Concrètement, la mise en place du Dark Mode dépend de plusieurs approches dont la principale est de savoir si le projet est en "CSS vanilla" ou en "CSS utilitaire".

Pour rappel, cette guideline ne traite que de CSS vanilla. Il s'agit à présent de distinguer comment le Dark Mode sera déclenché :

### Dark Mode déclenché via les préférences utilisateur (système)

Nous employons la Media Query `(prefers-color-scheme: dark)` imbriquée au sein des styles d'un composant afin d'en modifier les valeurs de manière automatique pour s'adapter aux préférences système.

```css
.button {
  color: var(--color-black);
  background-color: var(--color-white);
  
  @media (prefers-color-scheme: dark) {
    color: var(--color-white);
    background-color: var(--color-black);
  }
}
```

### Dark Mode déclenché selon un choix (switch)

Dans les projets où le visiteur doit pouvoir décider de son mode d'apparence au cas par cas, il est nécessaire de proposer un bouton "switch" et de retenir le choix en local storage.

L'[article de Salma Alam-Naylor](https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/) détaille comment mettre en oeuvre un bouton de choix light/dark accessible en JavaScript.

Le principe est de suivre les étapes suivantes :

1. Chercher si une valeur de mode est stockée en local storage
2. Dans le cas contraire, se rabattre sur les préférences système
3. Dans le cas contraire proposer du light mode

Voir le résultat : <https://codepen.io/raphaelgoetter/pen/dyrxgbW>

### Dark Mode déclenché via les préférences utilisateur et/ou selon un choix

La solution précédente (bouton switch) répond également à ce cas de figure. Elle est à privilégier.

## Polices (fonts)

### Recommandations générales

- On privilégie la police système `system-ui` pour les textes de contenus (raison : performance + UX + Layout Shifts).
- On privilégie le format `.woff2`.
- On limite à 2 ou 3 fichiers de police au maximum (regular, bold, italic), sinon préférer une [Variable Font](https://v-fonts.com/) (voir la partie dédiée ci-dessous)
- On utilise la directive `<link rel="preload">` pour charger les polices de manière asynchrone.
- On applique `font-display: swap;` au sein de la règle `@font-face` pour éviter les effets de FOIT. Si la police est pré-chargée, `font-display: optional;` est alors recommandé.
- On héberge la police sur son propre serveur (voir l'outil "Google Webfont Helper").
- On utilise les valeurs chiffrées pour les graisses de police (`font-weight`) :
  - `100` plutôt que `thin`
  - `200` plutôt que `extralight`
  - `300` plutôt que `light`
  - `400` plutôt que `normal`
  - `500` plutôt que `medium`
  - `600` plutôt que `semibold`
  - `700` plutôt que `bold`
  - `800` plutôt que `extrabold`
  - `900` plutôt que `black`

### Outils d'optimisation et de tests de polices

- FontSquirrel webfont generator : <https://www.fontsquirrel.com/tools/webfont-generator> (ou Transfonter : <https://transfonter.org/>)
- Wakamai Fondue : <https://wakamaifondue.com/>
- Glyphhanger (via `npm`) : <https://github.com/zachleat/glyphhanger>

### Code recommandé pour les polices

Voici un exemple de chargement de police conseillé (cas de deux fichiers de police *regular* et *bold*) :

```html
<!-- Dans le <head> après
     la feuille de styles pour ne pas la bloquer -->
<link rel="preload" as="font" href="kiwi.woff2" type="font/woff2" crossorigin="anonymous">
<link rel="preload" as="font" href="kiwi-bold.woff2" type="font/woff2" crossorigin="anonymous">
```

⚠️ Noter ci-dessous que le nom de la font-family est toujours le même ("kiwi") et qu'il ne faut pas confondre avec le nom du fichier.

```css
@font-­face {
  font-­family: "kiwi";
  src: url("kiwi.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* ou "optional" pour éviter les layout shifts */
}
@font-­face {
  font-­family: "kiwi";
  src: url("kiwi-bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### Google Webfont Helper

[Google Webfont Helper](https://gwfh.mranftl.com/fonts) génère le code CSS nécessaire, optimise finement les fichiers et permet de les héberger sans faire appel à Google en choisissant le bon subset (latin, latin-ext, etc.), les variantes (normal, bold, italic, etc.)

### Cas des Variable Fonts

Une variable font est systématiquement recommandée dès lors qu'un projet nécessite plus de 3 ou 4 variantes parmi celles-ci : regular, italic, light, semi-bold, bold, bold italic, etc. Cette fonctionnalité est aujourd'hui reconnue par plus de 95% des navigateurs.

Comme pour les fontes classiques, le format `.woff2` ainsi que l'hébergement de la fonte sont préconisés (les fontes variables peuvent être trouvées sur [Google Fonts](https://fonts.google.com/?vfonly=true) en activant la case "show only variable fonts" puis téléchargées en `.ttf` via le bouton "Download family". Un convertisseur tel que [Cloud converter](https://cloudconvert.com/ttf-to-woff2) pourra produire la version `.woff2`.

#### Code recommandé pour les variable fonts

```css
@font-face {
  font-family: "variable";
  src:
    url("variable.woff2") format("woff2") tech("variations"),
    url("variable.woff2") format("woff2-variations");
  font-display: swap;
  font-weight: 100 900;
}
```

#### Modification des variantes (axis)

Toutes les variantes d'une fonte variable sont modifiables via la propriété `font-variation-settings`. Certains de ces axis sont normalisés et disposent d'un équivalent en propriété CSS.

Ainsi, pour modifier la graisse d'une police, les deux syntaxes sont possibles : `font-variation-settings: 'wght' 625;` ou `font-weight: 625;`. Il est même possible de passer par une variable CSS ainsi `font-variation-settings: 'wght' var(--text-weight);`

## Bonus : Media print (impression)

Nous proposons une feuille de styles "Print" dans nos projets d'intégration web.

La feuille de styles dédiée à l'impression aide aussi à l'export PDF dans le navigateur. La plupart du temps il s'agira en priorité de masquer les éléments inutiles dans un document statique ou papier (ex : navigation) et de retirer les décorations superflues.

- [Une feuille de styles de base pour le media print](https://www.alsacreations.com/astuce/lire/1160-Une-feuille-de-styles-de-base-pour-le-media-print.html)
- [Faire une feuille de style CSS print pour l'impression](https://www.alsacreations.com/tuto/lire/586-feuille-style-css-print-impression.html)
