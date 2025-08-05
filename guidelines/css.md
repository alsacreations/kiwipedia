# Guidelines&#8239;: CSS

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant&#8239;: "CSS". Ces guidelines CSS sont le fruit de plusieurs années d'expérience en méthodologies (OOCSS, BEM, CubeCSS) et frameworks (Bootstrap, Tailwind, UnoCSS) et sont destinées à constamment évoluer dans le temps et à s'adapter à chaque nouveau projet.

À ce jour, deux méthodes d'intégration CSS ont démontré leurs avantages en production&#8239;: CSS "vanilla" (natif) et CSS utilitaire (via Tailwind ou UnoCSS par exemple).

**Sauf contre-indication (client, projet historique) nous intégrons nos projets en CSS Vanilla**.

<!-- markdownlint-disable MD036 -->

## Sommaire

- [Guidelines : CSS](#guidelines-css)
  - [Sommaire](#sommaire)
  - [Configuration dans un projet](#configuration-dans-un-projet)
  - [Bonnes pratiques CSS globales](#bonnes-pratiques-css-globales)
  - [Syntaxe](#syntaxe)
  - [Variables CSS (primitives et tokens)](#variables-css-primitives-et-tokens)
  - [Unités](#unités)
  - [Notation imbriquée (nesting)](#notation-imbriquée-nesting)
  - [Breakpoints et Media Queries](#breakpoints-et-media-queries)
  - [Transitions et animations](#transitions-et-animations)
  - [Méthodes de positionnement](#méthodes-de-positionnement)
  - [Pseudo-classes et pseudo-éléments](#pseudo-classes-et-pseudo-éléments)
  - [Dark Mode](#dark-mode)
  - [Polices (fonts)](#polices-fonts)
  - [Media print (impression)](#media-print-impression)

## Configuration dans un projet

**Tailwind optionnel**

Nous intégrons nos styles en **"CSS Vanilla"**, c'est à dire que ne faisons pas usage de classes utilitaires dans le HTML *sauf rares exceptions* (par exemple pour distinguer un élément parmi d'autres semblables).

Pour ce faire, un générateur de classes utilitaires **Tailwind** (version 4 minimum) peut être incorporé dans nos projets afin de bénéficier de classes utilitaires lorsque cela est nécessaire.

L'installation et la configuration de Tailwind est décrite ([dans le fichier `project-init.md`](../starters/project-init.md))

**PostCSS / Sass**

Certaines fonctionnalités CSS indispensables ne sont actuellement pas réalisables en natif (Concaténation des fichiers, Mixins, Custom Media).

Selon les projets, deux options sont envisagées pour bénéficier de ces fonctionnalités&nbsp;:

- Le post-processeur [PostCSS](https://postcss.org/)
- Le pré-processeur [Sass](https://sass-lang.com/) (syntaxe `.scss`) dans nos projets d'intégration (non conseillé)

Quelle que soit la solution choisie, la méthode de compilation vers CSS dépend du type de projet (statique, Vue, Vite, Webpack, etc.).

**Linters**

Stylelint et Prettier sont utilisés pour vérifier la syntaxe et les bonnes pratiques CSS.

La configuration de ces linters est détaillée dans le guide [`project-init.md`](/starters/project-init.md).

## Bonnes pratiques CSS globales

- Nous privilégions systématiquement l'usage de sélecteurs de **class** plutôt que les sélecteurs d'éléments (`li`, `span`, `p`) et ne ciblons jamais via un sélecteur `#id`.
- Nous évitons tant que possible les **sélecteurs composés** tels que `.modal span` ou `.modal .date` mais plutôt `.modal-date` pour conserver une spécificité minimale.
- Nous employons les **variables CSS** plutôt que des valeurs "en dur" (ex.&#8239;: `gap: var(--spacing-m)` plutôt que `gap: 1rem`) et faisons référence aux tokens plutôt qu'au primitives **si c'est possible** (ex.&#8239;: `gap: var(--spacing-m)` plutôt que `gap: var(--spacing-16)`)

## Syntaxe

**Ordre des déclarations**

Les déclarations au sein d'une règle CSS sont ordonnées de façon à faire apparaître les propriétés importantes en tête de liste.

**Les déclarations sont automatiquement réordonnées à l'aide de `stylelint-order` en suivant l'ordre `"smacss"`** (voir la configuration dans le guide [`project-init.md`](/starters/project-init.md)).

## Variables CSS (primitives et tokens)

Les variables CSS (custom properties) du projet s'articulent en trois étapes&#8239;:

1. Les valeur primitives (ex. `--color-pink-300: #f9a8d4;`) -> fichier `theme.css`
2. Les tokens, ou roles (ex. `--color-primary: var(--color-pink-300);`) -> fichier `theme-tokens.css` *(voir section suivante)*
3. L'usage des tokens dans les styles des composants (ex. `color: var(--color-primary);`) -> fichier `styles.css`

**Primitives**

Les valeurs *primitives* sont des valeurs de base issues de l'UI-Kit qui ne changent pas et qui sont utilisées pour définir les rôles (tokens) du projet.
Un développeur n'est pas censé inventer de nouvelles primitives ni modifier ces valeurs. Si une valeur n'existe pas, il est nécessaire de la créer en concertation avec le designer.

```css
/* fichier `theme.css` */
/* valeurs d'exemple (toutes issues de l'UI-Kit FIGMA) */
:root {
  /* Breakpoints (en dur) */
  --breakpoint-md: 48rem; /* 768px */
  --breakpoint-lg: 64rem; /* 1024px */

  /* Espacements */
  --spacing-0: 0;
  --spacing-1: 1px;
  --spacing-2: 0.125rem;
  --spacing-4: 0.25rem;
  --spacing-8: 0.5rem;
  --spacing-12: 0.75rem;
  --spacing-16: 1rem;
  --spacing-20: 1.25rem;
  --spacing-24: 1.5rem;
  --spacing-32: 2rem;
  --spacing-40: 2.5rem;
  --spacing-48: 3rem;
  --spacing-56: 3.5rem;
  --spacing-64: 4rem;
  --spacing-80: 5rem;
  --spacing-128: 8rem;
  --spacing-160: 10rem;
  --spacing-180: 11.25rem;
  --spacing-260: 16.25rem;

  /* Typographie */
  --font-base: system-ui, sans-serif;
  --font-poppins: poppins, sans-serif;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;
  --text-14: 0.875rem;
  --text-16: 1rem;
  --text-18: 1.125rem;
  --text-20: 1.25rem;
  --text-24: 1.5rem;
  --text-30: 1.875rem;
  --text-36: 2.25rem;
  --text-48: 3rem;
  --text-60: 3.75rem;
  --text-80: 5rem;
  --leading-20: 1.25rem;
  --leading-24: 1.5rem;
  --leading-28: 1.75rem;
  --leading-32: 2rem;
  --leading-36: 2.25rem;
  --leading-40: 2.5rem;
  --leading-48: 3rem;
  --leading-56: 3.5rem;
  --leading-80: 5rem;
  --leading-100: 6.25rem;

  /* Border radius */
  --radius-none: 0;
  --radius-md: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;

  /* Divers */
  --transition-duration: 0.25s;
  --z-under-page-level: -1;
  --z-above-page-level: 1;
  --z-header-level: 1000;
  --z-above-header-level: 2000;
  --z-above-all-level: 3000;

  /* Couleurs (globales) */
  --color-gray-50: oklch(97% 0 0);
  --color-gray-100: oklch(92.2% 0 0);
  --color-gray-200: oklch(87% 0 0);
  --color-gray-300: oklch(70.8% 0 0);
  --color-gray-400: oklch(55.6% 0 0);
  --color-gray-500: oklch(43.9% 0 0);
  --color-gray-600: oklch(37.1% 0 0);
  --color-gray-700: oklch(26.9% 0 0);
  --color-gray-800: oklch(20.5% 0 0);
  --color-gray-900: oklch(14.5% 0 0);
  --color-white: oklch(100% 0 0);
  --color-black: oklch(0% 0 0);
  --color-red-100: oklch(97% 0.1 27.52);
  --color-red-300: oklch(70.54% 0.19 27.52);
  --color-red-500: oklch(50.54% 0.19 27.52);
  --color-red-700: oklch(35.54% 0.19 27.52);
  --color-red-900: oklch(20.54% 0.11 27.52);
  --color-green-100: oklch(97% 0.06 150.73);
  --color-green-300: oklch(71.66% 0.13 150.73);
  --color-green-500: oklch(51.66% 0.13 150.73);
  --color-green-700: oklch(36.66% 0.13 150.73);
  --color-green-900: oklch(21.66% 0.13 150.73);
  --color-orange-100: oklch(97% 0.08 49.95);
  --color-orange-300: oklch(83.15% 0.17 49.95);
  --color-orange-500: oklch(63.15% 0.17 49.95);
  --color-orange-700: oklch(48.15% 0.17 49.95);
  --color-orange-900: oklch(33.15% 0.11 49.95);
  --color-blue-100: oklch(97% 0.09 256.37);
  --color-blue-300: oklch(71.33% 0.18 256.37);
  --color-blue-500: oklch(51.33% 0.18 256.37);
  --color-blue-700: oklch(36.33% 0.18 256.37);
  --color-blue-900: oklch(21.33% 0.11 256.37);

  /* Couleurs (Theme) */
  /* Ici les palettes spécifiques au projet */
}
```

**Règles de nommage des primitives**

Pour assurer un workflow fluide entre designer et développeur, les variables sont nommées de manière codifiée par les deux parties.

Les règles de nommage sont les suivantes (issues de la [documentation Tailwind 4](https://tailwindcss.com/docs/theme#theme-variable-namespaces))&#8239;:

- Une couleur est préfixée par `--color-*` (ex. `--color-pink-300`)
- Un espacement (marge, padding) est préfixé par `--spacing-*` (ex. `--spacing-16`)
- Une goutière est préfixée par `--gap-*` (ex. `--gap-16`)
- Une taille de police est préfixée par `--text-*` (ex. `--text-16`)
- Une famille de police est préfixée par `--font-*` (ex. `--font-poppins`)
- Une graisse de police est préfixée par `--font-weight-*` (ex. `--font-weight-regular`)
- Une `line-height` est préfixée par `--leading-*` (ex. `--leading-28`)
- Un arrondi est préfixé par `--radius-*` (ex. `--radius-lg`)
- Une ombre est préfixée par `--shadow-*` (ex. `--shadow-md`)
- Un z-index est préfixé par `--z-*` (ex. `--z-above-header-level`)

**Tokens (=roles)**

Les tokens sont des propriétés auxquelles des roles/fonctions ont été attibués.

- Un token fait référence à une **valeur primitive** : par exemple `--primary` fait référence à `--color-pink-300`.
- Un token est **sémantique** : le but est de savoir à quoi *sert* `--primary` ou `--spacing-m` sans forcément connaître leurs style.
- Un token est **agnostique** (décontextualisé) : `--primary` est OK en light ou dark mode, `--spacing-m` est OK en desktop ou mobile.

```css
/* fichier `theme-tokens.css` */
/* ⚠️ Les noms des tokens sont à conserver à chaque projet */
/* Les valeurs d'exemple sont à adapter, évidemment */
:root {
  --primary: light-dark(var(--color-blue-500), var(--color-blue-300));
  --on-primary: light-dark(var(--color-white), var(--color-black));
  --surface: light-dark(var(--color-white), var(--color-gray-800));
  --on-surface: light-dark(var(--color-gray-900), var(--color-gray-100));
  --on-surface-secondary: light-dark(var(--color-gray-600), var(--color-gray-300));
  --layer-1: light-dark(var(--color-gray-50), var(--color-gray-900));
  --layer-2: light-dark(var(--color-gray-100), var(--color-gray-700));
  --layer-3: light-dark(var(--color-gray-200), var(--color-gray-600));
  --accent: light-dark(var(--primary), var(--color-blue-300));
  --accent-invert: light-dark(var(--color-blue-300), var(--primary));
  --warning: light-dark(var(--color-orange-500), var(--color-orange-300));
  --error: light-dark(var(--color-red-500), var(--color-red-300));
  --success: light-dark(var(--color-green-300), var(--color-green-500));

  --link: light-dark(var(--color-green-500), var(--color-orange-300));
  --link-hover: light-dark(var(--color-green-500),var(--color-orange-300));
  --selection: light-dark(var(--color-orange-300), var(--color-orange-500));

  /* Font size Tokens */
  /* Source https://utopia.fyi/clamp/calculator/?a=360,1240 */
  --text-s: clamp(var(--text-14), 0.8239rem + 0.2273vw, var(--text-16));
  --text-m: clamp(var(--text-16), 0.9489rem + 0.2273vw, var(--text-18));
  --text-l: clamp(var(--text-18), 1.0739rem + 0.2273vw, var(--text-20));
  --text-xl: clamp(var(--text-20), 0.9943rem + 1.1364vw, var(--text-30));
  --text-2xl: clamp(var(--text-24), 1.1932rem + 1.3636vw, var(--text-36));
  --text-3xl: clamp(var(--text-30), 1.4148rem + 2.0455vw, var(--text-48));

  /* Spacing Tokens */
  --gap-s: clamp(var(--spacing-8), 0.2955rem + 0.9091vw, var(--spacing-16));
  --gap-m: clamp(var(--spacing-16), 0.5909rem + 1.8182vw, var(--spacing-32));
  --gap-l: clamp(var(--spacing-24), 0.8864rem + 2.7273vw, var(--spacing-48));
  --gap-xl: clamp(var(--spacing-32), 0.7727rem + 5.4545vw, var(--spacing-80));
  --spacing-s: clamp(var(--spacing-8), 0.2955rem + 0.9091vw, var(--spacing-16));
  --spacing-m: clamp(var(--spacing-16), 0.5909rem + 1.8182vw, var(--spacing-32));
  --spacing-l: clamp(var(--spacing-24), 0.8864rem + 2.2727vw, var(--spacing-48));
  --spacing-xl: clamp(var(--spacing-32), 0.7727rem + 5.4545vw, var(--spacing-80));

  /* Forms Tokens */
  --form-control-background: light-dark(var(--color-slate-200), var(--color-slate-700));
  --on-form-control: light-dark(var(--color-gray-900), var(--color-gray-100));
  --form-control-spacing: var(--spacing-12) var(--spacing-16);
  --form-control-border-width: 1px;
  --form-control-border-color: var(--color-gray-400);
  --form-control-border-radius: var(--radius-md);
  --checkables-border-color: var(--color-gray-400);
  --checkable-size: 1.25em;

  /* States Tokens */
  --focus-ring-color: AccentColor;
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
}
```

**Liste des rôles des tokens**

Cette liste est non exhaustive. Elle concerne les tokens les plus courants et dont la portée concerne l'ensemble du projet.

Nos tokens de couleurs (`surface`, `on-surface`, etc.) sont inspirés de [Material Design](https://m3.material.io/styles/color/roles).

- `primary` : couleur d'accent principale
- `on-primary` : couleur de d'un élément posé sur `primary` (peut être du texte, une icône, etc.)
- `surface` : aplat de couleur principal (généralement celle de `body`)
- `on-surface` : couleur d'un élément posé sur `surface` (ou sur un niveau de `layer`)
- `on-surface-secondary` : variante de couleur d'un élément posé sur `surface` ou `layer`
- `layer-1` aplat de couleur (background en général)
- `layer-2` aplat de couleur (background en général) (variante)
- `layer-3` aplat de couleur (background en général) (variante)
- `link` : couleur des liens
- `link-hover` : couleur des liens au survol / focus
- `border-light` : couleur éclaircie des bordures
- `border-medium` : couleur de base des bordures (ex. inputs, textarea)
- `border-dark` : couleur assombrie des bordures
- `error` : couleur des messages d'erreur
- `success` : couleur des messages de succès
- `selection` : couleur de fond lors de la sélection de texte
- `text-m` : taille de police "moyenne" (peut être variable)
- `text-l` : taille de police pour textes plus grands
- `text-xl` : taille de police pour gros textes
- `spacing-m` : espacement "moyen" (peut être variable)
- `gap-m` : gouttière "moyenne" (peut être variable)

En plus de cette liste commune à tous projets, il est envisageable d'appliquer des tokens spécifiques à chacun des composants.

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

Sauf contre-indication selon projet, on privilégie la méthode **Mobile First** et les valeurs des breakpoints sont exprimées [en unité `rem`](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/#media-queries-7)&#8239;:

- `40rem` // correspond à 640px
- `48rem` // 768px
- `64rem` // 1024px
- `80rem` // 1280px
- `96rem` // 1536px

Nous utilisons de préférence la syntaxe "moderne" des Media Queries&#8239;:

```css
/* composant card sur écran "640" ou plus */
.card {
    display: flex;

    @media (width >= 40rem) {
        flex-direction: column;
    }
}
```

Pour éviter les collisions d'intervalles de media queries, notre convention est :

1. En mobile first (conseillé) on inclut la valeur, donc "=" -> `@media (width >= 48rem)`
2. En desktop first, on exclut la valeur, donc pas de "=" -> `@media (width < 48rem)`

## Transitions et animations

- Éviter d’animer des propriétés autres que `transform` (`translate`, `rotate`, `scale`) ou `opacity` ou `filter` (ou alors ajouter la propriété `will-change` au cas par cas).
- Toujours préciser quelle(s) propriété(s) doit être animée dans une transition ou animation. Par exemple `transition: 0.5s scale`.

**Animer du SVG**

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

**Grid Layout**

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

**Flexbox**

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

**Autres positionnements**

- `position: absolute`&#8239;: nécessaire pour placer un élément en "overlay" (par-dessus d'autres éléments). Le référent est le premier ancêtre lui-même *positionné*.
- `position: relative`&#8239;: utile principalement pour servir de référent à un descendant en `absolute`. Ne pas déplacer des éléments via cette position, privilégier systématiquement les transformations (`translate: x y;`).
- `position: static`&#8239;: valeur par défaut de `position`.
- `position: sticky`&#8239;: permet de faire *coller* un élément aux bords de la fenêtre (ex. un header). Le référent est le Viewport. Nécessite un point d'ancrage (ex. `top: 0`).
- `float`&#8239;: permet à un élément de se placer à gauche ou droite et que le contenu suivant s'écoule autour. Uniquement utile pour "habiller" une image.

## Pseudo-classes et pseudo-éléments

Les pseudo-classes s'écrivent avec `:`, les pseudo-éléments s'écrivent avec `::`.

**Pseudo-éléments**

- Les pseudo-élements les plus courants sont `::before` et `::after`.
- Ils nécessitent la propriété `content: "contenu"` pour être affichés.
- Leur contenu est restitué (lu) par les assistances techniques, mais cela n'est toujours pas validé par RGAA donc il ne faut pas apporter des informations à l'aide de pseudo-éléments (ex. ne pas écrire ceci `content: "(lien externe)"` ni `content: "[↗]"`).
- Nesting&#8239;: Les pseudo-éléments sont de bons candidats à la syntaxe imbriquée telle que `&::before`, `&::after`.
- Les pseudo-éléments sont à rédiger en CSS vanilla et non en classe utilitaire (éviter `class="before:content-['Hello_World']"`)

**Pseudo-classes**

- Il existe une [60aine de pseudo-classes](https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-classes)
- Nesting&#8239;: Les pseudo-classes sont de bons candidats à la syntaxe imbriquée telle que `&:first-child`, `&:empty`, etc.
- Les pseudo-classes sont à rédiger en CSS natif et non en classe utilitaire.

## Dark Mode

Le mode d'apparence (Light Mode, Dark Mode) est un paramètre dont l'utilisateur doit pouvoir bénéficier pour ses préférences personnelles ou pour des besoins spécifiques.

Il existe deux moyens pour un utilisateur de modifier le mode d'apparence des pages web&#8239;:

1. Via ses réglages système (ou via son navigateur)
2. Via un bouton "theme switcher" intégré au site web

**Dark Mode déclenché via les réglages système uniquement (non conseillé)**

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

**Dark Mode déclenché via un bouton "theme switcher" (conseillé)**

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

**Dark Mode et SVG inline** :

- De manière générale utiliser `currentcolor` pour les couleurs des `stroke` et `fill` des SVG inline. Cela permet de s'adapter automatiquement à la valeur de `color` du parent.
- Utiliser `light-dark()` pour pour appliquer des couleurs spécifiques au SVG sans être dépendant de la couleur du parent. Ex. `fill: light-dark(var(--couleur-light), var(--couleur-dark));`

**Dark Mode et SVG externe (on peut toucher au SVG)** :

Ajouter un élément `<style>` dans le SVG pour appliquer les styles CSS suivants (ici la classe `.path` a été ajoutée à l'élément dont la couleur doit s'adapter)&#8239;:

```xml
<svg width="" height="" viewBox="" fill="none">
  <style>
    @media (prefers-color-scheme: dark) {
      .path {
        fill: white; /* valeur en dur ou currentcolor */
      }
    }
    [data-theme="dark"] .path {
      fill: white;
    }
  </style>
  <path class="path" d="" fill="black" />
</svg>
```

**Dark Mode et SVG externe (on ne peut pas toucher au SVG)** :

Il est possible d'appliquer un masque CSS sur une image externe (le rendu final sera monochrome)&#8239;:

```html
<span class="icon icon-cart"></span>
```

```css
.icon {
  /* Dimension des icônes */
  display: inline-block;
  width: 200px;
  height: 200px;
  /* Couleur des icônes */
  background-color: currentColor;
  /* Masque SVG */
  mask: var(--svg) no-repeat center;
  mask-size: contain;
}

.icon-cart {
  --svg: url("cart.svg");
}
```

**Dark Mode et `::selection`** :

- Les custom properties CSS ne sont pas supportées dans `::selection` donc il faut définir les couleurs en dur.
- `light-dark()` n'est pas supporté, il faut une media query ou un `[data-theme=dark]`.
- L'imbrication (nesting) n'est pas supportée (on ne peut pas `[data-theme=dark] & {}`).

Ce qui fonctionne :

```css
::selection {
  background-color: pink;
}
[data-theme="dark"] ::selection {
  background-color: hotpink;
}
```

## Polices (fonts)

**Recommandations générales**

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

**Outils d'optimisation et de tests de polices**

- FontSquirrel webfont generator&#8239;: <https://www.fontsquirrel.com/tools/webfont-generator> (ou Transfonter&#8239;: <https://transfonter.org/>)
- Wakamai Fondue&#8239;: <https://wakamaifondue.com/>
- Glyphhanger (via `npm`)&#8239;: <https://github.com/zachleat/glyphhanger>

**Code recommandé pour les polices**

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

**Google Webfont Helper**

[Google Webfont Helper](https://gwfh.mranftl.com/fonts) génère le code CSS nécessaire, optimise finement les fichiers et permet de les héberger sans faire appel à Google en choisissant le bon subset (latin, latin-ext, etc.), les variantes (normal, bold, italic, etc.)

**Cas des Variable Fonts**

Une variable font est systématiquement recommandée dès lors qu'un projet nécessite plus de 3 ou 4 variantes parmi celles-ci&#8239;: regular, italic, light, semi-bold, bold, bold italic, etc. Cette fonctionnalité est aujourd'hui reconnue par plus de 95% des navigateurs.

Comme pour les fontes classiques, le format `.woff2` ainsi que l'hébergement de la fonte sont préconisés (les fontes variables peuvent être trouvées sur [Google Fonts](https://fonts.google.com/?vfonly=true) en activant la case "show only variable fonts" puis téléchargées en `.ttf` via le bouton "Download family". Un convertisseur tel que [Cloud converter](https://cloudconvert.com/ttf-to-woff2) pourra produire la version `.woff2`.

Code recommandé pour les variable fonts :

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

**Modification des variantes (axis)**

Toutes les variantes d'une fonte variable sont modifiables via la propriété `font-variation-settings`. Certains de ces axis sont normalisés et disposent d'un équivalent en propriété CSS.

Ainsi, pour modifier la graisse d'une police, les deux syntaxes sont possibles&#8239;: `font-variation-settings: 'wght' 625;` ou `font-weight: 625;`. Il est même possible de passer par une variable CSS ainsi `font-variation-settings: 'wght' var(--text-weight);`

## Media print (impression)

Nous proposons une feuille de styles "Print" dans nos projets d'intégration web.

La feuille de styles dédiée à l'impression aide aussi à l'export PDF dans le navigateur. La plupart du temps il s'agira en priorité de masquer les éléments inutiles dans un document statique ou papier (ex&#8239;: navigation) et de retirer les décorations superflues.

- [Une feuille de styles de base pour le media print](https://www.alsacreations.com/astuce/lire/1160-Une-feuille-de-styles-de-base-pour-le-media-print.html)
- [Faire une feuille de style CSS print pour l'impression](https://www.alsacreations.com/tuto/lire/586-feuille-style-css-print-impression.html)
