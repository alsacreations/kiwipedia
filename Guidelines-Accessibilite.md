# Guidelines : Accessibilité

Statut : Working Draft (WD)

Cette présente convention rassemble les bonnes pratiques d'Accessibilité en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

Ce document est divisé en trois parties :

1. La [Checklist](#checklist-niveau-1-base-) (ensemble des points à respecter)
2. Les [Explications techniques détaillées](#explications-techniques-détaillées) (s'y référer lorsqu'un point de la Checklist n'est pas clair)
3. Les [Ressources d'accessibilité](#ressources-générales) (liens et outils)

## Checklist Niveau 1 (base) 🥉

### HTML

- Le code produit est valide et respecte les [standards W3C](https://www.w3.org/standards/).
- Renseigner la langue de la page avec l'attribut `lang` de l’élément `<html>`.
- Indiquer avec l'attribut `lang` les changements de langue locaux dans les blocs d'une page.
- Utiliser un titre `<title>` pertinent pour chaque page.
- Respecter la hiérarchie des titres `<hX>`.
- Utiliser les éléments HTML pour leur fonction/sémantique et non pas pour leur forme.
- Utiliser les [landmarks ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/landmark_role).
- Masquer correctement les contenus qui ne devraient *pas* être retranscrits par un lecteur d’écran (ex. `aria-hidden=true`, `role=presentation`).
- Prévoir au moins un lien d'évitement permettant d'accéder directement au contenu principal.
- Tous les liens doivent avoir un intitulé explicite.
- Signaler lorsqu’un lien s’ouvre dans une nouvelle fenêtre.
- Structurer correctement les listes (`ul`, `ol`, `dl`).

### CSS

- Ne pas fixer de hauteur sur les éléments afin que le contenu reste lisible lorsque le texte est zoomé.
- Travailler avec des tailles de polices fluides (`em` ou `rem`).
- Ne pas supprimer l'outline autour des éléments cliquables/focusables (pas de `outline: none`) ou utiliser `:focus-visible`.
- Ne pas employer de contenu généré (`::before`, `::after`) pour véhiculer des informations ou pour afficher des icônes.
- Masquer correctement les contenus qui devraient être retranscrits par un lecteur d’écran (ex. `.sr-only`)

### Formulaires

- Vérifier l'accessibilité des formulaires notamment au clavier.
- Indiquer clairement les champs obligatoires.
- Utiliser l'élément `<fieldset>` associé à `<legend>` pour regrouper les champs ayant trait à la même thématique.
- Toujours associer un `<label>` à son champ respectif (avec `for` et `id`).
- Indiquer les formats spécifiques des champs lorsqu'il y en a ; ne pas utiliser l'attribut `placeholder` comme indication (privilégier `label`).
- Associer correctement une erreur à son champ.
- Associer un `autocomplete` pour les champs demandant une donnée personnelle (nom, prénom, e-mail, adresse, etc.).

### Médias

- Toutes les images doivent comporter un attribut `alt` ; il doit être vide `alt=""` pour les images décoratives et renseigné pour les images apportant du contenu.
- Lorsqu'un lien renvoie vers un téléchargement de fichier, il faut indiquer : son intitulé, son poids, son format et l'ouverture dans une nouvelle fenêtre.
- Rendre les fichiers SVG accessibles : décoratifs ou non, inline ou non, dans un bouton / lien ou non.

## Checklist Niveau 2 (étendue) 🥈

- Tester l'affichage des pages avec un niveau de zoom de 200%.
- Utiliser un lecteur audio/vidéo accessible, par exemple les éléments HTML5 natifs.
- Vérifier la cohérence de la tabulation et adapter si nécessaire avec `tabindex`.

## Checklist Niveau 3 (demandes spécifiques) 🥇

- Tester avec un lecteur d'écran.
- Fournir une piste de sous-titres avec le format webVTT et l'élément `<track>` pour les vidéos.
- Fournir une alternative textuelle (une retranscription) aux formats audio.
- Rendre les fichiers PDF accessibles ou fournir une alternative `HTML`, `.doc`, `.odt` structurée.
- Utiliser l'attribut `aria-live` judicieusement sur les informations provenant de chargements AJAX ou dévoilées dynamiquement par JavaScript.
- Ajouter une modale de personnalisation d'affichage telle que l'outil [AccessConfig](https://accessconfig.a11y.fr/) (ou autre).
- Rendre chaque script compatible avec les technologies d'assistance.

----

# Explications techniques détaillées

## Sémantique HTML5

### Titres

La hiérarchie peut être testée avec l'extension [Headings Map pour Chrome](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi) ou [Headings Map pour Firefox](https://addons.mozilla.org/fr/firefox/addon/headingsmap/).

### Zone d’en-tête principale

```html
<header role="banner">[…]</header>
```

La balise `<header>` peut être utilisée plusieurs fois dans la page mais l’attribut `role="banner"` ne doit être utilisé qu’une seule fois.

### Pied de page

```html
<footer role="contentinfo">[…]</footer>
```

La balise `<footer>` peut être utilisée plusieurs fois dans la page mais l’attribut `role="contentinfo"` ne doit être utilisé qu’une seule fois.

### Zone de contenu principal

```html
<main role="main">[…]</main>
```

La balise `<main>` ne peut être utilisée qu’une seule fois dans la page ainsi que l’attribut `role="main"`.

### Navigation

Utiliser des combinaisons `<ul><li>` (liste non ordonnée) pour structurer les menus de navigation (principale ou secondaire) dans un élément `<nav role="navigation”>` :

- Le menu principal du site (souvent affiché dans l’en-tête)
- Un menu secondaire affiché dans certaines pages internes (parfois dans une barre latérale)
- Un menu secondaire affiché dans le pied de page
- Un fil d’ariane
- Une pagination
- Une table des matières

Pour chaque balise `<nav role="navigation">`, ajouter un `aria-label` descriptif.

**Exemple :**

`<nav role="navigation" aria-label="Menu principal">[…]</nav>`

### Moteur de recherche

Le rôle `role="search"` doit être ajouté à l'élément HTML englobant le formulaire de recherche, ajouter un `aria-label` descriptif.

```html
<div role="search" aria-label="Moteur de recherche principal">
  <form>[…]</form>
</div>
```
Plus d’informations : <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Search_role/>

### Liens d’évitement ("skip link")

Un lien d'évitement vers le contenu principal est nécessaire. D'autres liens d'évitement peuvent être ajoutés pour accéder rapidement à la navigation, à la recherche, au pied de page, etc.

- Il doit être le premier lien de la page.
- Il peut être masqué (classe Tailwind [`sr-only`](https://tailwindcss.com/docs/screen-readers)) et visible lors du focus.
- Si le contenu principal est un élément non interactif il faut mettre un `tabindex="-1"` pour rendre cet élément focusable (ex. sur une balise `<main>`). Voir [la partie sur les tabindex.](https://github.com/alsacreations/guidelines/blob/master/Guidelines-Accessibilite.md#tabindex)

Voici le lien d'évitement employé au sein du [Design System du W3C](https://design-system.w3.org/)&nbsp;:

```html
<a href="#main" class="skip-link">Skip to content</a>
```

```css
.skip-link {
  background-color: #f9dc4a;
  border: solid 3px #000;
  color: #000;
  padding: 0.625em 0.9375em;
  text-decoration: none;
}
.skip-link:not(:focus):not(:active) {
  border: 0;
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(100%);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.skip-link:focus {
  left: 0;
  position: absolute;
  top: 0;
  z-index: 999;
}
```

### Titres de page

Le titre de la page doit être pertinent et de préférence unique pour chaque page. Dans `<title>`, éviter le caractère `|` (pipe) comme séparateur. Préférer `:` (deux-points).

Pour une page de résultats de recherche, il faut indiquer dans le titre le mot recherché ainsi que la page actuelle si une pagination est présente :
"Vous avez recherché le mot : xxx - page 2"

### Liens

#### Les intitulés des liens

Tous les liens doivent avoir un **intitulé** explicite, un lien "vide" n’est pas accessible.

**Exemple :**

![Liens vers les réseaux sociaux](images/accessibilite02.png)
*Liens vers les réseaux sociaux*

Ne pas faire :

```html
<a href="URL" class="link-facebook"></a>
```

```css
.link-facebook {
  display: block;
  height: 2rem;
  width: 2rem;
  background-image: url('facebook.png');
}
```

→ dans ce cas là, le lecteur d’écran retranscrit l’intégralité de l’URL.

Même en ajoutant un attribut `title="Retrouvez-nous sur Facebook"` sur le lien, celui-ci reste considéré comme vide.
De plus, il n’est pas sûr à 100% que l’attribut `title` soit correctement restitué par le lecteur d’écran (tout dépend de la configuration de l’utilisateur).

À faire :

```html
<a href="URL" class="link-facebook">
  <span class="sr-only">Retrouvez-nous sur Facebook</span>
</a>
```

```css
.link-facebook {
  display: block;
  height: 2rem;
  width: 2rem;
  background-image: url('facebook.png');
}
```

→ dans ce cas là, le lecteur d’écran retranscrit bien *"Retrouvez-nous sur Facebook"*.

#### Ouverture dans une nouvelle fenêtre

Signaler lorsqu’un lien s’ouvre dans une nouvelle fenêtre :

##### Première méthode

```html
<a href="URL" target="_blank" aria-label="Lire l’article (nouvelle fenêtre)">Lire l’article</a>
```

##### Deuxième méthode

```html
<a href="URL" target="_blank" title="Lire l’article (nouvelle fenêtre)">Lire l’article</a>
```

### Formulaires

Utiliser l'élément `<fieldset>` associé à `<legend>` pour regrouper les champs ayant trait à la même thématique. Exemple : coordonnées du visiteur lors d'une commande en ligne :

```html
<form>
  <fieldset>
    <legend>Vos coordonnées</legend>

    <input type="text" id="name" name="name" autocomplete="family-name">
    <label for="name">Nom</label>

    <input type="email" id="email" name="email" autocomplete="email">
    <label for="email">Email</label>
  </fieldset>
</form>
```

Toujours associer un `<label>` à un élément de formulaire `<input>` ou `<textarea>` pour définir son intitulé.

Ne pas enlever les styles au focus pour toujours savoir quel est le champ actif.

Indiquer de manière claire les champs obligatoires, soit en l'indiquant dans le label ou bien en ajoutant une phrase en début de formulaire. Compléter si besoin par `aria-required="true"`.

Si un champ attend un format spécifique, toujours l'indiquer. **Ne pas utiliser l'attribut `placeholder` comme seule indication.**

**Exemple :**

```html
<label for="email">E-mail <span>(nomprenom@mail.com)</label>
<input type="email" name="email" id="email" autocomplete="email">
```

Il est également possible de l'afficher avec `aria-describedby` qui fait référence à un élément comprenant une description.
  
**Exemple :**

```html
<label for="numero-m">Numéro de membre</label>
<input type="text" id="numero-m" name="numero-m" aria-describedby="hint">
<p id="hint">Numéro composé de 4 chiffres.</p>
```

Associer un `autocomplete` pour les champs demandant une donnée personnelle (nom, prénom, e-mail, adresse, etc.) :

```html
<label for="name">Nom</p>
<input type="text" id="name" name="name" autocomplete="family-name">
```

Voir [la liste complète des `autocomplete`.](https://www.w3.org/TR/WCAG21/#input-purposes).

TODO: gestion des erreurs

### Navigation

#### Navigation cohérente

Faciliter la navigation avec un menu, une recherche ou un plan du site, exploitables au clavier.

#### Tabindex

Il permet de capturer l’ordre du focus selon le chiffre qu’on lui attribue. Un ordre logique est "naturellement" créé selon les éléments interactifs du DOM. Il comprend tous les chiffres positifs à partir de 0.

→ Il faut éviter de toucher au `tabindex` positif.

On peut utiliser :

- `-1` : permet de rendre un élément focusable sans le rendre navigable au clavier. S'il est ajouté sur un élément interactif, celui-ci perdra le focus.
- `0` : l'élément peut capturer le focus et être atteint via la navigation au clavier.

→ Les éléments pouvant recevoir le focus autres que nativement `<a>`, `<input>` ou `<button>` pourront être équipés de `tabindex="0"`.

Pour en [savoir plus](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/tabindex)

### Tableaux

N'utiliser les tableaux que pour la présentation de données, et non pour la structure du document ou du design.

TODO: il manque des trucs ici je crois

---

## Bonnes pratiques ARIA

[WAI-ARIA](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA) est une technologie permettant de donner des indications d'accessibilité supplémentaires par rapport aux comportements natifs déjà prévus par les navigateurs pour les éléments HTML de base.

Trois caractéristiques principales sont définies dans la spécification&nbsp;:

- les **attributs** `role` (landmarks), voir la [Matrice des rôles ARIA](http://whatsock.com/training/matrices/)
- les **propriétés**, par exemple `aria-label` ou `aria-required`.
- les **états**, par exemple `aria-disabled`

ARIA est aussi recommandé pour les composants complexes pilotés par JavaScript (ex : menus déroulants, sliders, onglets, modales, etc.).

Voir <https://www.w3.org/WAI/ARIA/apg/patterns/>

Voici un exemple d'usage de l'attribut `aria-label` :

```html
<button aria-label="accéder au code Hypertext markup language">html</button>
```

Cet exemple est issu d'un article des Guidelines Accessibilité de Orange nommé [Les attributs ARIA qui peuvent vous sauver !
](https://a11y-guidelines.orange.com/fr/articles/attributs-aria-qui-peuvent-vous-sauver/) décrivant en détail les différences d'usage de `aria-label`, `aria-labelledby` et  `aria-describedby`.

---

## Bonnes pratiques CSS

### outline et focus

Les éléments interactifs (liens, champs, boutons) affichent un contour lorsqu'ils réagissent au `:focus`, c'est à dire au clic, au touch ou à la navigation clavier (les 3).

Ce contour correspond à la propriété CSS `outline` (ce n'est pas une `border` ni un `box-shadow`).

L'ensemble des navigateurs appliquent par défaut un `outline` visible lors de l'événement `:focus` et, même si nous pourrions trouver cela disgracieux, il est important de ne pas le supprimer autour des éléments cliquables (pas de `outline: none`) car il a été conçu pour rendre ces éléments accessibles à tous (= se repérer lors d'une navigation au clavier).

Grâce à la pseudo-classe `:focus-visible` il est possible de masquer le contour (focus) lors du clic ou d'un touch tout en le préservant lors d'un focus au clavier _(Note : à ce jour, Safari et Internet Explorer ne reconnaissent ni `:focus-visible` ni `@supports selector()` et appliqueront leur outline par défaut lors du focus sur cet exemple)_.:

```css
@supports selector(div:focus-visible) {
  /* uniquement au clic/tap focus */
  .custom-button:focus:not(:focus-visible) {
    outline-color: transparent;
  }
  /* uniquement au focus clavier */
  .custom-button:focus-visible {
    outline: 6px dashed hotpink;
  }
}
```

Voir en ligne et tester [sur CodePen](https://codepen.io/alsacreations/pen/MWbzYJQ?editors=1100)

### CSS generated content

On peut générer du contenu en CSS à l’aide de `::before` et `::after` et la propriété `content`, pour afficher une icône par exemple (gérée via une font-icon).

Mais la plupart des lecteurs d’écrans actuels peuvent retranscrire ce contenu, ce qui peut provoquer une gêne (voir <https://tink.uk/accessibility-support-for-css-generated-content>).

Pour éviter cela, il est préférable d’insérer l’attribut `aria-hidden=true` sur l’élément.

Exemple :

```html
<a href="URL" class="btn"> <i class="icon-kiwi" aria-hidden="true"></i> KiwiParty </a>
```

### Contenu lu mais masqué à l’écran

Ne **jamais** utiliser `display: none` pour masquer visuellement du texte qui devrait être retranscrit par un lecteur d’écran.

Utiliser plutôt la classe `.sr-only`, présente dans [Tailwind](https://tailwindcss.com/docs/screen-readers). Cette astuce CSS permet de cacher visuellement du contenu texte mais tout en restant accessible aux lecteurs d’écrans.

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Exemple :**

![Bouton "précédent" d’un slider](images/accessibilite01.png)
*Bouton "précédent" d’un slider*

Ne pas faire :

```html
<button class="btn-icon swiper-button-prev">
  <i class="icon-arrow" aria-hidden="true"></i>
  <span>Éléments précédents</span>
</button>
```

```css
.swiper-button-prev span {
  display: none;
}
```

À faire :

```html
<button class="btn-icon swiper-button-prev">
  <i class="icon-arrow" aria-hidden="true"></i>
  <span class="sr-only">Éléments précédents</span>
</button>
```

---

## Bonnes pratiques Images et Médias

### Image porteuse d’information ou cliquable

Une image **porteuse d’information ou cliquable** doit avoir une alternative textuelle, l’attribut `alt` doit reprendre l’information figurant sur l’image.

Exemple d’une image **cliquable** :

![KNACSS](images/accessibilite03.png)

```html
<a href="www.knacss.com">
  <img src="knacss.png" alt="Knacss">
</a>
```

Exemple d’une image **porteuse d’information** :

![4,9 milliards € sont consacrés à la modernisation - 10 millions € - 700km](images/accessibilite04.png)

```html
<img src="banner.png" alt="4,9 milliards € sont consacrés à la modernisation […] - 10 millions € […] - 700km">
```

**Attention** : inutile de commencer l’attribut `alt=""` par `"Image : …"`, cette information sera retranscrite par les lecteurs d’écrans lors de la lecture de l’élément `<img>`.

### Image décorative

Une image de **décoration** doit avoir un `alt` vide afin que l’image ne soit pas retranscrite par les lecteurs d’écrans.

Exemple d’une image de **décoration** :

![image alt text](images/accessibilite05.png)

```html
<img src="kiwiparty.png" alt="">
```

---

### SVG et accessibilité

Les exemples à suivre proviennent du [Design System du W3C](https://design-system.w3.org/styles/svg-icons.html) ainsi que de l'article [Contextually Marking up accessible images and SVGs](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html) et [Les images SVG sont de plus en plus utilisées sur le web mais qu’en est-il de leur accessibilité ?](https://a11y-guidelines.orange.com/fr/articles/svg-accessibles/).

**Important :** Toujours commencer par nettoyer proprement les fichiers SVG (avec [SVGOMG](https://jakearchibald.github.io/svgomg/)) car les éditeurs graphiques ajoutent de nombreux éléments inutiles tels que des `<title>` de type "créé par Sketch".

#### SVG porteur d'information

**Cas d'un SVG inline :**

Ajouter l'attribut `role="img"` pour indiquer aux lecteurs d'écrans de la considérer comme une image et lui éviter de lire tous les nœuds HTML du SVG.
Il faut ensuite ajouter un `<title>` (ou un `aria-label`) pour expliciter la fonction de l'image.
Ajouter également `focusable="false"`pour éviter que la touche *Tab* ne navigue au sein du SVG.

```xml
<svg role="img" focusable="false" aria-labelledby="title">
  <title id="title">Le nom accessible</title>
  <use xlink:href="#svg-id-to-reference" aria-hidden="true" />
  <!-- contenu du SVG -->
</svg>
```

ou bien (si l'infobulle au survol n'est pas souhaitée)&nbsp;:

```xml
<svg role="img" aria-label="Nom accessible" focusable="false">
  <use xlink:href="#..." aria-hidden="true"></use>
</svg>
```

**Cas d'une image SVG :**

Ajouter l'attribut `role="img"`.

```xml
<img src="image.svg" role="img" alt="Nom accessible">
```

#### SVG décoratif

**Cas d'un SVG inline :**

Appliquer `aria-hidden="true"` sur le `svg` afin d'indiquer aux lecteurs d'écran de ne pas le restituer, ainsi que `focusable="false"`.

```xml
<svg aria-hidden="true" focusable="false">
  <!-- contenu du SVG -->
</svg>
```

**Cas d'une image SVG :**

`alt` vide, `aria-hidden="true"`.

```html
<img src="image.svg" alt="" aria-hidden="true">
```

#### SVG dans lien ou dans un bouton

La méthode `aria-label="Nom accessible"` est mal supportée par certaines assistances techniques lorsque le SVG est contenu dans un lien ou un bouton.

Il est préférable d'utiliser un `<span>` invisible pour le nom accessible s'il doit être masqué à l'écran, le texte sera alors retranscrit par les lecteurs d’écrans.

**Cas d'un SVG inline :**

```xml
<a href="#">
  <svg aria-hidden="true" focusable="false">
    <!-- contenu du SVG -->
  </svg>
  <span class="sr-only">Nom accessible masqué à l'écran</span>
</a>
```

**Cas d'une image SVG :**

```html
<a href="#">
  <img src="image.svg" alt="">
  Nom accessible visible à l'écran
</a>
```

---

## Bonnes pratiques Javascript

### ARIA live

Utiliser l'attribut `aria-live` sur les informations provenant de chargements AJAX ou dévoilées par JavaScript dynamiquement (ex : non présentes naturellement dans le flux de la page comme des alertes).

```html
<div role="alert" aria-live="assertive" aria-atomic="true">
  <p>Message envoyé avec succès / Article ajouté au panier</p>
</div>
```

On pourra moduler avec `aria-relevant` (`additions`, `removals`, `text`, `all`) selon qu'on ajoute le contenu au conteneur ou que c'est lui-même qui se voit inséré dans le corps de la page.

### Autres composants

Pour tous les composants de page agissant sur le contenu, de type swiper, slider, slideshow, accordéon, pagination, onglets, menu déroulant, on privilégiera les scripts "accessibles", y compris ceux utilisant ARIA. Le but étant, entre autres, de ne pas gêner la navigation au clavier et de permettre la lecture de la page avec une synthèse vocale.

Pour les menus déroulants et mega menus, Accessible Mega Menu a fait ses preuves <https://adobe-accessibility.github.io/Accessible-Mega-Menu/>

---

## Ressources Générales

- [RGAA](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/)
- [Outils d'accessibilité du Gouvernement](https://design.numerique.gouv.fr/outils/)
- [Guide de l'Intégrateur RGAA3](https://disic.github.io/guide-integrateur/)
- [Guide du Développeur RGAA3](https://disic.github.io/guide-developpeur/)
- [Notices Accedeweb](https://www.accede-web.com/notices/)
- [Design System du W3C](https://design-system.w3.org/)
- [Guidelines Accessibilité Orange](https://a11y-guidelines.orange.com/fr/)
- [Modèles de conception accessibles](https://www.w3.org/WAI/ARIA/apg/)
- [SmashingMag : Accessibilité dans les devtools de Chrome](https://www.smashingmagazine.com/2020/08/accessibility-chrome-devtools/)

## Outils

- [Support des Assistances Techniques](https://a11ysupport.io/)
- [AccessConfig](https://accessconfig.a11y.fr/) : Modale de personnalisation d'affichage
- [Checklist accessibilité](https://www.a11yproject.com/checklist/)

### Contraste / Webdesign

- [Contrastes de couleur vs déficiences visuelles](https://whocanuse.com/)
- [Tanaguru Contrast Finder](https://contrast-finder.tanaguru.com/) ou [Contrast Finder](https://app.contrast-finder.org) : outil en ligne, propose des couleurs proches
- [Paciellogroup Color Contrast Checker](https://developer.paciellogroup.com/resources/contrastanalyser/) (Windows, MacOS)
- [Contrast Grid](https://contrast-grid.eightshapes.com/) : grille comparant de multiples valeurs, ex. test d'une palette de couleur complète
- WCAG Color contrast checker (extension [Chrome](https://chrome.google.com/webstore/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf) et [Firefox](https://addons.mozilla.org/fr/firefox/addon/wcag-contrast-checker/)) qui permet de vérifier les contrastes de couleurs directement depuis sa page HTML

### Plugins

- [Wave browser extension](https://wave.webaim.org/extension/) (Firefox, Edge et Chrome)
- [Axe browser extension](https://www.deque.com/axe/) (Firefox, Edge et Chrome)
- HeadingsMap : Extension [Chrome](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi) et [Firefox](https://addons.mozilla.org/fr/firefox/addon/headingsmap/)) permet de vérifier que la hiérachie des titres est cohérente).

### Synthèses vocales

- [NVDA](https://www.nvda-fr.org/)
- VoiceOver (natif sur macOS, iOS) (activation : cmd + fn + F5), voir [raccourcis clavier](https://www.apple.com/voiceover/info/guide/_1131.html)
- [Jaws](https://www.freedomscientific.com/products/software/jaws/)

---
