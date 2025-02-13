# Guidelines&#8239;: CSS

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant&#8239;: "CSS". Ces guidelines CSS sont le fruit de plusieurs années d'expérience en méthodologies (OOCSS, BEM, CubeCSS) et frameworks (Bootstrap, Tailwind, UnoCSS) et sont destinées à constamment évoluer dans le temps et à s'adapter à chaque nouveau projet.

## CSS vanilla ou CSS utilitaire&#8239;?

À ce jour, deux méthodes d'intégration CSS ont démontré leurs avantages en production&#8239;: CSS "vanilla" (natif) et CSS utilitaire (via Tailwind ou UnoCSS par exemple).

**Sauf contre-indication (client, projet historique) nous intégrons nos projets en CSS Vanilla**.

Cependant, un générateur de classes utilitaires (Tailwind ou [UnoCSS](../starters/project-init.md)) est incorporé dans nos projets afin de bénéficier de classes utilitaires lorsque nécessaire.

### Qu'appelons-nous CSS Vanilla&#8239;?

L'intégration CSS Vanilla correspond à la méthode *historique*&#8239;:

- Nos styles sont rédigés dans une ou plusieurs feuilles de styles CSS de manière générale.
- Nous ne faisons pas usage de classes utilitaires dans le HTML *sauf rares exceptions* (par exemple pour distinguer un élément parmi d'autres semblables).
- Notre Reset "Bretzel CSS" (et print) est appliqué sur chaque projet (voir dossier `/configs`).
- Dans la cas d'un projet VueJS, les styles spécifiques à un composant sont rédigés dans le fichier du composant au sein de l'élément `<style>`.

## Variables du projet

Les variables CSS (custom properties) du projet s'articulent en trois étapes&#8239;:

1. Les valeur primitives (ex. `--color-pink-300: #f9a8d4;`)
2. Les tokens, ou roles (ex. `--color-primary: var(--color-pink-300);`) *(voir section suivante)*
3. L'usage des tokens dans les styles des composants (ex. `color: var(--color-primary);`)

### Primitives

Les valeurs *primitives* sont des valeurs de base issues de l'UI-Kit qui ne changent pas et qui sont utilisées pour définir les rôles (tokens) du projet.
Un développeur n'est pas censé inventer de nouvelles primitives ni modifier ces valeurs. Si une valeur n'existe pas, il est nécessaire de la créer en concertation avec le designer.

```css
/* fichier `theme.css` */
/* valeurs issues de l'UI-Kit */
:root {
  --color-pink-100: #fce7f3;
  --color-pink-300: #f9a8d4;
  --color-pink-500: #f1498f;
  --color-pink-700: #be185d;
  --spacing-0: 0;
  --spacing-1: 1px;
  --spacing-2: 0.125rem;
  --spacing-4: 0.25rem;
  --spacing-8: 0.5rem;
  --spacing-16: 1rem;
  --font-base: system-ui, sans-serif;
  --font-poppins: poppins, sans-serif;
  --font-weight-regular: 400;
  --font-weight-bold: 700;
  --text-16: 1rem;
  --text-18: 1.125rem;
  --text-20: 1.25rem;
  --radius-none: 0;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
}
```

#### Règles de nommage des primitives

Pour assurer un workflow fluide entre designer et développeur, les variables sont nommées de manière codifiée par les deux parties.

Les règles de nommage sont les suivantes (issues de la [documentation Tailwind 4](https://tailwindcss.com/docs/theme#theme-variable-namespaces))&#8239;:

- Une couleur est préfixée par `--color-*` (ex. `--color-pink-300`)
- Un espacement (marge, padding, gouttière) est préfixé par `--spacing-*` (ex. `--spacing-16`)
- Une taille de police est préfixée par `--text-*` (ex. `--text-16`)
- Une famille de police est préfixée par `--font-*` (ex. `--font-base`)
- Une graisse de police est préfixée par `--font-weight-*` (ex. `--font-weight-regular`)
- Une `line-height` est préfixée par `--leading-*` (ex. `--leading-28`)
- Un arrondi est préfixé par `--radius-*` (ex. `--radius-lg`)
- Une ombre est préfixée par `--shadow-*` (ex. `--shadow-md`)
- Un z-index est préfixé par `--z-*` (ex. `--z-above-header-level`)

### Tokens (=roles)

Les tokens sont des propriétés auxquelles des roles/fonctions ont été attibués.

- Un token fait référence à une **valeur primitive** : par exemple `--color-primary` fait référence à `--color-pink-300`.
- Un token est **sémantique** : le but est de savoir à quoi *sert* `--color-primary` ou `--spacing-m` sans forcément connaître leurs style.
- Un token est **agnostique** (décontextualisé) : `--color-primary` est OK en light ou dark mode, `--spacing-m` est OK en desktop ou mobile.

```css
/* fichier `app.css` */
/* valeurs d'exemple à adapter au projet, évidemment */
:root {
  --primary: var(--color-blue-500);
  --surface: light-dark(var(--color-white), var(--color-gray-900));
  --on-primary: var(--color-white);
  --on-surface: light-dark(var(--color-gray-900), var(--color-white));
  --spacing-m: clamp(var(--spacing-32), 1.5909rem + 1.8182vw, var(--spacing-48));
  --spacing-l: clamp(var(--spacing-40), 1.4773rem + 4.5455vw, var(--spacing-80));
  --text-m: clamp(var(--text-16), 0.9565rem + 0.2174vw, var(--text-18));
  --text-2xl: clamp(var(--text-24), 1.3466rem + 0.6818vw, var(--text-30));
  --link: light-dark(var(--color-blue-700), var(--color-blue-300));
  --link-hover: light-dark(var(--color-blue-900), var(--color-blue-500));
  --shadow: light-dark(#00000014, #ffffff14);
}
```

#### Liste des rôles des tokens

Cette liste est non exhaustive. Elle concerne les tokens les plus courants et dont la portée concerne l'ensemble du projet.

Nos tokens de couleurs (`surface`, `on-surface`, etc.) sont inspirés de [Material Design](https://m3.material.io/styles/color/roles).

- `Primary` : couleur d'accent principale (boutons, états actifs,…)
- `Secondary` : couleur d'accent secondaire
- `Surface` : aplat de couleur principal (généralement celle de `body`)
- `Surface Dim` : aplat de couleur secondaire (ici "obscurci")
- `On Primary` : couleur de d'un élément posé sur `Primary` (peut être du texte, une icône, etc.)
- `On Surface` : couleur d'un élément posé sur `Surface`
- `Layer` aplat de couleur d'un bloc posé sur une surface
- `Layer High` aplat de couleur d'un bloc posé sur un `Layer`
- `On Layer` : couleur d'un élément posé sur `Layer`
- `Link` : couleur des liens
- `Link Hover` : couleur des liens au survol / focus
- `Outline` : couleur des bordures (ex. inputs, textarea)
- `Outline Hover` : couleur des bordures au survol / focus
- `Error` : couleur des messages d'erreur
- `Success` : couleur des messages de succès
- `Shadow` : couleur de l'ombre portée
- `Selection` : couleur de fond lors de la sélection de texte
- `Text M` : taille de police "moyenne" (peut être variable)
- `Text L` : taille de police pour titres moyens
- `Text XL` : taille de police pour grosd titres

En plus de cette liste commune à tous projets, il est conseillé d'appliquer des tokens spécifiques à chacun des composants. Par exemple un composant "Tabs" (onglets) pourrait bénéficier de tokens tels que&#8239;:

- `Tab Surface` : aplat de couleur d'un onglets
- `Tab On Surface` : couleur du contenu des onglets
- `Tab Outline` : couleur de la bordure des onglets
- `Tab Surface Active` : aplat de couleur de l'onglet actif
- `Tab Layer`: aplat de couleur du contenu des onglets
- etc.

## Bonnes pratiques CSS globales

### Règles essentielles

- Nous employons les **variables CSS** plutôt que des valeurs "en dur" (ex.&#8239;: `gap: var(--spacing-m)` plutôt que `gap: 1rem`) et faisons référence aux tokens plutôt qu'au primitives **si c'est possible** (ex.&#8239;: `gap: var(--spacing-m)` plutôt que `gap: var(--spacing-16)`)
- Nous privilégions systématiquement l'usage de sélecteurs de **class** plutôt que les sélecteurs d'éléments (`li`, `span`, `p`) et ne ciblons jamais via un sélecteur `#id`.
- Nous évitons tant que possible les **sélecteurs composés** tels que `.modal span` ou `.modal .date` mais plutôt `.modal-date` pour conserver une spécificité minimale.

### Ordre des déclarations

Les déclarations au sein d'une règle CSS sont ordonnées de façon à faire apparaître les propriétés importantes en tête de liste.

**Les déclarations sont automatiquement réordonnées à l'aide de `stylelint-order` en suivant l'ordre `"smacss"`** (voir la configuration dans le fichier [`stylelint.config.js`](../configs/stylelint.config.js)).

Exemple&#8239;:

```css
.selecteur {
    display: inline-block;
    position: absolute;
    top: var(--spacing-4);
    z-index: var(--z-above-header-level);
    margin: var(--spacing-16);
    padding: 0;
    border: 1px solid var(--color-pink-600);
    background: var(--surface);
    color: var(--on-surface);
    font-size: var(--text-m);
    line-height: var(--leading-28);
    font-family: var(--font-base);
    font-weight: var(--font-weight-regular);
    text-align: end;

    &:hover,
    &:focus {
        color: var(--color-kiwi-400);
    }

    @media (width >= 40rem) {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: var(--spacing-4);
    }
}
```

## Unités

- La première règle à observer est&#8239;: *"si la valeur doit pouvoir s'adapter à la taille de police de l'utilisateur, utiliser des `rem`, sinon utiliser des `px`"*. Consulter [l'article de Josh Comeau](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/) pour les détails et cas concrets.
- La seconde règle est&#8239;: *"Éviter d'indiquer une taille à un élément, privilégier la fluidité (`1fr` dans Grid Layout, `flex-grow` dans Flexbox) lorsque cela est possible"*.
- La troisième règle est&#8239;: *"Éviter d'imposer une hauteur à un élément possédant du contenu tant que cela est possible"*.

On privilégie le `rem` pour&#8239;:

- La taille de police (`1rem` est équivalent à `16px`)
- Les Media Queries (`576px` = `36rem`, `992px` = `62rem`, `1400px` = `87.5rem`)

On privilégie le `px` pour&#8239;:

- Les espacements verticaux et horizontaux entre les élements (gouttières, rythme vertical)
- Les dimensions d'éléments non dépendants de la taille de contenu (images)

Autres unités&#8239;:

- `dvh` pour la hauteur (minimum) de page (`body`)
- `pt` exclusivement en feuille de styles print

## Sass / postCSS

Certaines fonctionnalités CSS indispensables ne sont actuellement pas réalisables en natif&#8239;:

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

Dans le cas de nos projets en CSS vanilla avec Constructeur de classes utilitaires&#8239;:

- Nous utilisons **toujours** les [custom properties CSS](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties) (ex. `--color-pink-400`).
- Nous n'utilisons **pas** de variables Sass (ex. `$color-pink-400`).
- Nous n'appliquons pas de classes utilitaires dans le HTML (ex. `<p class="text-pink-400"`) sauf rares exceptions où le gain en temps et code est flagrant.

**Aucune valeur numérique (hors `0`) ne devrait apparaître dans les styles sans être associée à une custom property.**

## Notation imbriquée (nesting)

Nous utilisons **la notation imbriquée (nesting) de CSS natif** car elle facilite la lecture et la maintenabilité du code en évitant de répéter les occurences de chaque sélecteur.

Le nesting est particulièrement préconisé pour&#8239;:

- Les événements tels que `&:hover`, `&:focus`, `&:active`.
- Les pseudo-classes telles que `&:first-child`, `&:empty`, etc.
- Les pseudo-éléments tels que `&::before`, `&::after`.
- Les media queries `@media ()`.

**À privilégier** *(le nesting permet de réduire les duplications de sélecteurs)&#8239;:*

```scss
.wrapper {
  
  &:hover, &:focus {}
  &::before, &::after {}
  
  @media (width >= 40rem) {
    &::before {}
  }
}
```

**À éviter** *(le nesting peut conduire à augmenter la spécificité finale)&#8239;:*

```scss
.wrapper {
  
  & .child {

    & .subchild {

    }
  }
}
```

L'inconvénient de la notation imbriquée est qu'elle génère des sélecteurs CSS composés donc avec une spécificité qui augmente. **Il est conseillé de limiter la syntaxe à un seul niveau d'imbrication.**

## Breakpoints et Media Queries

La liste de points de rupture (*breakpoints*) figure dans la configuration du contructeur de classes utilitaires.

Sauf contre-indication selon projet, les valeurs des breakpoints sont exprimées [en unité `rem`](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/#media-queries-7)&#8239;:

- `40rem` // correspond à 640px
- `48rem` // 768px
- `64rem` // 1024px
- `80rem` // 1280px
- `96rem` // 1536px

Pour nos projets, nous utilisons la syntaxe "moderne" des Media Queries&#8239;:

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

Quelques précautions sont à prendre concernant les SVG&#8239;:

- Toujours compresser le fichier à l'aide de SVGOMG
- Donner des noms de classe à chaque `path` qui doit être animé
- Appliquer les styles CSS suivants…

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

[Grid Layout](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout) est choisi en priorité pour les avantages suivants&#8239;:

- **Affichage vertical par défaut**
- Gère parfaitement les deux axes à la fois
- Place très précisément les éléments
- Permet de cibler uniquement le parent
- A peu de comportements contre-intuitifs
- Les *areas* offrent une représentation visuelle idéale
- Gère très bien le Responsive via Media Queries

Les inconvénients majeurs de Grid Layout sont&#8239;:

- Gère moins bien le Responsive via taille du contenu ou [Container Queries](https://www.alsacreations.com/article/lire/1915-Les-Container-Queries-en-CSS.html)

### Flexbox

[Flexbox](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) est choisi en priorité pour les avantages suivants&#8239;:

- **Affichage horizontal par défaut**
- Passage à la ligne (wrap) d'enfants de tailles différentes
- Centrage simple de rangées multiples
- Grande liberté donnée aux enfants (grow, shrink)
- Prévoit un affichage inversé (*-reverse)
- Permet de se passer de Media / Container Queries

Les inconvénients majeurs de Flexbox sont&#8239;:

- Ne gère pas bien les deux axes en même temps
- De nombreux comportements contre-intuitifs (alignements, shrink, min-width)

👉 **Lorsqu'aucune des deux méthodes ne sort clairement du lot, alors Grid Layout est notre choix par défaut.**

🔖 ["When to use Flexbox and when to use CSS Grid"](https://blog.logrocket.com/css-flexbox-vs-css-grid/)

### Autres positionnements

- `position: absolute`&#8239;: nécessaire pour placer un élément en "overlay" (par-dessus d'autres éléments). Le référent est le premier ancêtre lui-même *positionné*.
- `position: relative`&#8239;: utile principalement pour servir de référent à un descendant en `absolute`. Ne pas déplacer des éléments via cette position, privilégier systématiquement les transformations (`translate: x y;`).
- `position: static`&#8239;: valeur par défaut de `position`.
- `position: sticky`&#8239;: permet de faire *coller* un élément aux bords de la fenêtre (ex. un header). Le référent est le Viewport. Nécessite un point d'ancrage (ex. `top: 0`).
- `float`&#8239;: permet à un élément de se placer à gauche ou droite et que le contenu suivant s'écoule autour. Uniquement utile pour "habiller" une image.

## Pseudo-classes et pseudo-éléments

Les pseudo-classes s'écrivent avec `:`, les pseudo-éléments s'écrivent avec `::`.

### Pseudo-éléments

- Les pseudo-élements les plus courants sont `::before` et `::after`.
- Ils nécessitent la propriété `content: "contenu"` pour être affichés.
- Leur contenu est restitué (lu) par les assistances techniques, mais cela n'est toujours pas validé par RGAA donc il ne faut pas apporter des informations à l'aide de pseudo-éléments (ex. ne pas écrire ceci `content: "(lien externe)"` ni `content: "[↗]"`).
- Nesting&#8239;: Les pseudo-éléments sont de bons candidats à la syntaxe imbriquée telle que `&::before`, `&::after`.
- Les pseudo-éléments sont à rédiger en CSS vanilla et non en classe utilitaire (éviter `class="before:content-['Hello_World']"`)

### Pseudo-classes

- Il existe une [60aine de pseudo-classes](https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-classes)
- Nesting&#8239;: Les pseudo-classes sont de bons candidats à la syntaxe imbriquée telle que `&:first-child`, `&:empty`, etc.
- Les pseudo-classes sont à rédiger en CSS natif et non en classe utilitaire.

## Dark Mode

Le mode d'apparence (Light Mode, Dark Mode) est un paramètre dont l'utilisateur doit pouvoir bénéficier pour ses préférences personnelles ou pour des besoins spécifiques.

Il existe deux moyens pour un utilisateur de modifier le mode d'apparence des pages web&#8239;:

1. Via ses réglages système (ou via son navigateur)
2. Via un bouton "theme switcher" intégré au site web

### Dark Mode déclenché via les réglages système uniquement (non conseillé)

La Media Query `(prefers-color-scheme: dark)` détecte les préférences système et permet de s'y adapter en CSS, mais la syntaxe de la fonction `light-dark()` est plus intéressante et évite des imbrications inutiles.

**À privilégier** *(`light-dark()`)&#8239;:*

```scss
:root {
    color-scheme: light dark;
    --color-burger: light-dark(var(--color-red-700), var(--color-red-300));
}
.burger-text {
  fill: var(--color-burger);
}
```

**À éviter** *(`(prefers-color-scheme: dark)`)&#8239;:*

```scss
:root {
    color-scheme: light dark;
    --color-burger: var(--color-red-700);

    @media (prefers-color-scheme: dark) {
    --color-burger: var(--color-red-300);
  }
}
.burger-text {
  fill: var(--color-burger);
}
```

### Dark Mode déclenché via un bouton "theme switcher" (conseillé)

En plus de ses préférences par défaut, il est conseillé de proposer au visiteur de pouvoir décider de son mode d'apparence au cas par cas à l'aide d'un "theme switcher".

**Voici un exemple de Switcher accessible sur Codepen&#8239;: <https://codepen.io/alsacreations/pen/ExBPExE>**

Le bouton de theme modifie l'attribut `data-theme` sur `html`, on s'en servira côté CSS pour forcer la valeur de `color-scheme`&#8239;:

```css
:root {
  color-scheme: light dark;

  &[data-theme="light"] {
    color-scheme: light;
  }

  &[data-theme="dark"] {
    color-scheme: dark;
  }
}
```

**La fonction `light-dark()` vue dans la partie précédente sera parfaitement adaptée là aussi pour gérer dynamiquement les couleurs quel que soit le mode adopté (préférences système ou choix manuel utilisateur).**

## Polices (fonts)

### Recommandations générales

- On privilégie la police système `system-ui` pour les textes de contenus (raison&#8239;: performance + UX + Layout Shifts).
- On privilégie le format `.woff2`.
- On limite à 2 ou 3 fichiers de police au maximum (regular, bold, italic), sinon préférer une [Variable Font](https://v-fonts.com/) (voir la partie dédiée ci-dessous)
- On utilise la directive `<link rel="preload">` pour charger les polices de manière asynchrone.
- On applique `font-display: swap;` au sein de la règle `@font-face` pour éviter les effets de FOIT. Si la police est pré-chargée, `font-display: optional;` est alors recommandé.
- On héberge la police sur son propre serveur (voir l'outil "Google Webfont Helper").
- On utilise les valeurs chiffrées pour les graisses de police (`font-weight`)&#8239;:
  - `100` plutôt que `thin`
  - `200` plutôt que `extralight`
  - `300` plutôt que `light`
  - `400` plutôt que `normal`
  - `500` plutôt que `medium`
  - `600` plutôt que `semibold`
  - `700` plutôt que `bold`
  - `800` plutôt que `extrabold`
  - `900` plutôt que `black`

🔖 <https://www.debugbear.com/blog/website-font-performance>

### Outils d'optimisation et de tests de polices

- FontSquirrel webfont generator&#8239;: <https://www.fontsquirrel.com/tools/webfont-generator> (ou Transfonter&#8239;: <https://transfonter.org/>)
- Wakamai Fondue&#8239;: <https://wakamaifondue.com/>
- Glyphhanger (via `npm`)&#8239;: <https://github.com/zachleat/glyphhanger>

### Code recommandé pour les polices

Voici un exemple de chargement de police conseillé (cas de deux fichiers de police *regular* et *bold*)&#8239;:

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

Une variable font est systématiquement recommandée dès lors qu'un projet nécessite plus de 3 ou 4 variantes parmi celles-ci&#8239;: regular, italic, light, semi-bold, bold, bold italic, etc. Cette fonctionnalité est aujourd'hui reconnue par plus de 95% des navigateurs.

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

Ainsi, pour modifier la graisse d'une police, les deux syntaxes sont possibles&#8239;: `font-variation-settings: 'wght' 625;` ou `font-weight: 625;`. Il est même possible de passer par une variable CSS ainsi `font-variation-settings: 'wght' var(--text-weight);`

## Bonus&#8239;: Media print (impression)

Nous proposons une feuille de styles "Print" dans nos projets d'intégration web.

La feuille de styles dédiée à l'impression aide aussi à l'export PDF dans le navigateur. La plupart du temps il s'agira en priorité de masquer les éléments inutiles dans un document statique ou papier (ex&#8239;: navigation) et de retirer les décorations superflues.

- [Une feuille de styles de base pour le media print](https://www.alsacreations.com/astuce/lire/1160-Une-feuille-de-styles-de-base-pour-le-media-print.html)
- [Faire une feuille de style CSS print pour l'impression](https://www.alsacreations.com/tuto/lire/586-feuille-style-css-print-impression.html)
