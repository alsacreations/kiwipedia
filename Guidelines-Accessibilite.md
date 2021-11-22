# Guidelines : Accessibilité

_Statut : Working Draft (WD)_

Cette présente convention rassemble les bonnes pratiques d'Accessibilité en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Généralités

- Respecter les standards W3C et [valider son code](https://validator.w3.org/).
- Ne pas fixer de hauteur sur les éléments afin que le contenu reste lisible lorsque le texte est zoomé.
- Travailler avec des tailles de polices fluides (`em` ou `rem`).
- Respecter la hiérarchie des titres `<hX>` (l'extension "Headings Map" (extension [Chrome](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi) et [Firefox](https://addons.mozilla.org/fr/firefox/addon/headingsmap/)) permet de vérifier que la hiérachie des titres est cohérente).
- Utiliser les éléments HTML pour leur fonction/sémantique et non pas pour leur forme.
  - Utiliser les éléments pouvant recevoir le focus (`<a>`, `<input type="button">`, `<button>`) lorsqu'ils sont cliquables/interactifs.
- Exploiter WAI ARIA <https://www.w3.org/WAI/standards-guidelines/aria/> lorsque c'est pertinent pour aider le navigateur.

## Bonnes pratiques Webdesign

### Taux de contraste

Respecter les taux de contraste minimum entre le texte et le fond.

Les outils de mesure de contraste employés sont :

- <https://contrast-finder.tanaguru.com/> (outil en ligne)
- <https://developer.paciellogroup.com/resources/contrastanalyser/> (Windows, MacOS)
- <https://app.contrast-finder.org/> (outil en ligne)
- WCAG Color contrast checker (extension [Chrome](https://chrome.google.com/webstore/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf) et [Firefox](https://addons.mozilla.org/fr/firefox/addon/wcag-contrast-checker/)) qui permet de vérifier les contrastes de couleurs directement depuis sa page HTML.

### Checklist accessibilité Webdesign

- Respecter le contraste de couleur + gammes de couleurs
- Ne pas indiquer une information uniquement par la couleur.
- Respecter une taille minimum de police pour la lisibilité.
- Tailles des zones de touch en mobile + espacements suffisants entre les zones
- Présence d’un menu de liens rapides
- Icônes et/ou images accompagnées d’un texte/intitulé si nécessaire
- Clarté du/des textes/du langage
- Mise en contexte des "Call To Action"
- Indiquer clairement quels libellés correspondent à quels champs de formulaires
- Les libellés et les champs doivent être accolés
- Boutons radios/checkboxes : le champ de sélection doit être large et pas seulement sur la box
- Indication des champs obligatoires
- Indication des formats de saisie (numérique, …)
- Validation et affichage des erreurs en temps réel des formulaires (sans actualisation)
- Indiquer le format et la taille des fichiers en téléchargement
- Boutons descriptifs (pas de “cliquez ici”)
- Indiquer l’ouverture d’un lien dans une nouvelle fenêtre (“ce lien s’ouvrira dans une nouvelle fenêtre”)
- Proposer différents médias de contact (téléphone, mail)
- Pas de textes trop longs (utiliser les titres, segmenter, aérer, intégrer des images…)
- Bon espacement des lignes de texte
- Pas de texte justifié
- Conserver les accents sur les majuscules
- Expliciter les abréviations
- Déclarer les citations
- Limiter les informations à télécharger et préférer l’incorporation directement dans la page
- Indication visuelle de la page active
- Les liens et zones cliquables sont visuellement identifiés

---

## Bonnes pratiques HTML

### Rôles ARIA

Notre structure HTML type exploite les rôles landmarks ARIA (`role=`). C'est un choix volontaire de notre part bien que les spécifications WAI-ARIA considèrent que c'est inutile. La raison est que le référentiel français RGAA 4 les recommande.

Pour plus de détails, voir [partie ARIA](#aria) ci-dessous.

### Menu de navigation

Utiliser des combinaisons `<ul><li>` (liste non ordonnée) pour structurer les menus de navigation dans un élément `<nav role="navigation”>`.

## Éléments sémantiques HTML5

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

### Système de navigation

```html
<nav role="navigation">[…]</nav>
```

La balise `<nav>` et son attribut `role="navigation"` peuvent être utilisés pour un système de navigation principale ou secondaire, englobant des menus contenant des liens internes au site.

Exemple :

- Le menu principal du site (souvent affiché dans l’en-tête)
- Un menu secondaire affiché dans certaines pages internes (parfois dans une barre latérale)
- Un menu secondaire affiché dans le pied de page
- Un fil d’ariane
- Une pagination
- Une table des matières

Pour chaque balise `<nav role="navigation">`, ajouter un `aria-label` descriptif.

**Exemple :**

`<nav role="navigation" aria-label="Menu principal">[…]</nav>`

Plus d’informations : <https://www.accede-web.com/notices/html-et-css/structure-generale/structurer-les-menus-de-navigation-principaux-et-secondaires-avec-nav-rolenavigation/>

### Moteur de recherche

Le rôle `role="search"` doit être ajouté dans l'élément HTML englobant le formulaire de recherche.

```html
<div role="search">
  <form>[…]</form>
</div>
```

Pour chaque balise comprenant un `role="search"`, ajouter un `aria-label` descriptif.

**Exemple :**

`<div role="search" aria-label="Moteur de recherche principal">[…]</div>`

Plus d’informations : <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Search_role/>

### Liens d’évitement

- Il est **obligatoire** d'avoir au moins 1 lien d'évitement permettant d'accéder directement au contenu principal. D'autres liens d'évitement peuvent être ajoutés pour accéder rapidement à la navigation, à la recherche, au pied de page, etc.
- Il doit être le premier lien de la page.
- Il peut être masqué (classe Tailwind [`sr-only`](https://tailwindcss.com/docs/screen-readers)) et visible lors du focus.
- Si le contenu principal est un élément non interactif il faut mettre un `tabindex="-1"` pour rendre cet élément focusable (ex. sur une balise `<main>`). Voir [la partie sur les tabindex.](https://github.com/alsacreations/guidelines/blob/master/Guidelines-Accessibilite.md#tabindex)

Voir [Guidelines HTML](Guidelines-HTML.md)

### Titres de page

Le titre de la page doit être pertinent et de préférence unique pour chaque page. Dans `<title>`, éviter le caractère `|` (pipe) comme séparateur. Préférer `:` (deux-points).

**Exemple :**

Pour une page de recherche, il faut indiquer le mot recherché ainsi que la page actuelle si une pagination est présente :
"Vous avez recherché le mot : xxx - page 2"

### Liens

#### Les intitulés des liens

Tous les liens doivent avoir un **intitulé** explicite, un lien "vide" n’est pas accessible.

**Exemple :**

![Liens vers les réseaux sociaux](images/accessibilite02.png)
_Liens vers les réseaux sociaux_

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

→ dans ce cas là, le lecteur d’écran retranscrit bien _"Retrouvez-nous sur Facebook"_.

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
    <legend>Indiquer vos coordonnées</legend>

    <input type="text" id="name" name="name" autocomplete="family-name">
    <label for="name">Nom</label>

    <input type="email" id="email" name="email" autocomplete="email">
    <label for="email">Email</label>
  </fieldset>
</form>
```

Toujours associer un `<label>` à un élément de formulaire `<input>` ou `<textarea>` pour définir son intitulé. Ne pas utiliser l'attribut `placeholder` comme seule indication.

Ne pas enlever les styles au focus pour toujours savoir quel est le champ actif.

Indiquer de manière claire les champs obligatoires, soit en l'indiquant dans le label ou bien en ajoutant une phrase en début de formulaire. Compléter si besoin par `aria-required="true"`.
  
Si un champ attend un format spécifique, toujours l'indiquer.

**Exemple :**

```html
<label for="email">Email <span>(nomprenom@mail.com)</label>
<input type="email" name="email" id="email" autocomplete="email">
```

Il est également possible de l'afficher avec `aria-describedby` qui fait référence à un élément comprenant une description.
  
**Exemple :**

```html
<label for="numero-m">Numéro de membre</label>
<input type="text" id="numero-m" name="numero-m" aria-describedby="hint">
<p id="hint">Numéro composé de 4 chiffres.</p>
```

Associer un `autocomplete` pour les champs demandant une donnée personnelle (nom, prénom, email, adresse, etc.) :

```html
<label for="name">Nom</p>
<input type="text" id="name" name="name" autocomplete="family-name">
```

Voir [la liste complète des `autocomplete`.](https://www.w3.org/TR/WCAG21/#input-purposes)

### Navigation

#### Navigation cohérente

Faciliter la navigation avec un menu, une recherche ou un plan du site, exploitables au clavier.

#### Tabindex

Il permet de capturer l’ordre du focus selon le chiffre qu’on lui attribue. Un ordre logique est "naturellement" créé selon les éléments interactifs du DOM.  Il comprend tous les chiffres positifs à partir de 0.

→ Il faut éviter de toucher au `tabindex` positif.

On peut utiliser :

- `-1` : permet de rendre un élément focusable sans le rendre navigable au clavier. S'il est ajouté sur un élément interactif, celui-ci perdra le focus.
- `0` : l'élément peut capturer le focus et être atteint via la navigation au clavier.

→ Les éléments pouvant recevoir le focus autres que nativement `<a>`, `<input>` ou `<button>` pourront être équipés de `tabindex="0"`.

Pour en [savoir plus](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/tabindex)

### Tableaux

N'utiliser les tableaux que pour la présentation de données, et non pour la structure du document ou du design.

---

## Bonnes pratiques CSS

### outline et focus

Les éléments interactifs (liens, champs, boutons) affichent un contour lorsqu'ils réagissent au `:focus`, c'est à dire au clic, au touch ou à la navigation clavier (les 3).

Ce contour correspond à la propriété CSS `outline` (ce n'est pas une `border` ni un `box-shadow`).

L'ensemble des navigateurs appliquent par défaut un `outline` visible lors de l'événement `:focus` et, même si nous pourrions trouver cela disgracieux, il est important de ne pas le supprimer autour des éléments cliquables (pas de `outline: none`) car il a été conçu pour rendre ces éléments accessibles à tous (= se repérer lors d'une navigation au clavier).

Grâce à la pseudo-classe `:focus-visible` il est possible de masquer le contour (focus) lors du clic ou d'un touch tout en le préservant lors d'un focus au clavier _(Note : à ce jour, Safari et Internet Explorer ne reconnaissent pas `:focus-visible`)_.

Exemple tiré de&nbsp;: <https://developer.mozilla.org/fr/docs/Web/CSS/:focus-visible>

```css
.custom-button:focus {
  /* alternative pour anciens navigateurs */
  outline: none;
  background: lightgrey;
}

.custom-button:focus:not(:focus-visible) {
  /* suppression du focus lors du clic/tap */
  background: transparent;
}

.custom-button:focus-visible {
  /* affichage du focus lors de la navigation au clavier */
  outline: 4px dashed darkorange;
  background: transparent;
}
```

Autre méthode _(Note : à ce jour, Safari et Internet Explorer ne reconnaissent ni `:focus-visible` ni `@supports selector()` et appliqueront leur outline par défaut lors du focus sur cet exemple)_.:

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
_Bouton "précédent" d’un slider_

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

## Bonnes pratiques ARIA

WAI-ARIA est une technologie permettant de donner des indications d'accessibilité supplémentaires par rapport aux comportements natifs déjà prévus par les navigateurs pour les éléments HTML de base. Elle passe par les attributs `role` (landmarks, regions, widgets divers) et `aria-*` (propriétés). ARIA est aussi particulièrement recommandé pour les composants complexes pilotés par JavaScript (ex : menus déroulants, sliders, onglets, modales...).

- [Matrice des rôles ARIA](http://whatsock.com/training/matrices/)
- aria-labelledby + aria-describedby <https://a11y-guidelines.orange.com/fr/articles/attributs-aria-qui-peuvent-vous-sauver/>

La bibliothèque de plugins jQuery Pepin utilise ARIA pour la plupart des composants <https://github.com/alsacreations/pepin>

---

## Bonnes pratiques Images et Médias

Chaque image doit avoir un attribut `alt`. Les images décoratives (qui n'apportent rien au contenu) doivent avoir un attribut alt vide `<img ... alt="">`.

Documentation : [https://www.w3.org/WAI/tutorials/images/](https://www.w3.org/WAI/tutorials/images/)

### Image porteuse d’information ou cliquable

Une image **porteuse d’information ou cliquable** doit avoir une alternative textuelle, l’attribut `alt` doit reprendre l’information figurant sur l’image.

Exemple d’une image **cliquable** :

![KNACSS](images/accessibilite03.png)

```html
<a href="www.knacss.com">
  <img src="knacss.png" alt="Knacss" />
</a>
```

Exemple d’une image **porteuse d’information** :

![4,9 milliards € sont consacrés à la modernisation - 10 millions € - 700km](images/accessibilite04.png)

```html
<img src="banner.png" alt="4,9 milliards € sont consacrés à la modernisation […] - 10 millions € […] - 700km" />
```

**Attention** : inutile de commencer l’attribut `alt=""` par `"Image : …"`, cette information sera retranscrite par les lecteurs d’écrans lors de la lecture de l’élément `<img>`.

### Image décorative

Une image de **décoration** doit avoir un `alt` vide afin que l’image ne soit pas retranscrite par les lecteurs d’écrans.

Exemple d’une image de **décoration** :

![image alt text](images/accessibilite05.png)

```html
<img src="kiwiparty.png" alt="" />
```

### SVG

#### SVG dans lien

Utiliser de préférence un `<span>` invisible pour l’alternative textuelle, le texte sera alors retranscrit par les lecteurs d’écrans (cf "[Astuces CSS](#heading=h.wsw7a5jk60yz)" plus haut).

Meilleure technique relevée par Atalan : <https://blog.atalan.fr/svg-liens-et-lecteurs-decran/>

```html
<a href="…">
  <span class="visually-hidden">Le titre du lien</span>
  <svg aria-hidden="true">…</svg>
</a>
```

#### SVG porteuse d'information

Dans ce cas, il faut lui passer l'attribut `role="img"` pour indiquer aux lecteurs d'écrans de la considérer comme une image et lui éviter de lire tous les nœuds HTML du SVG.
Il faut ensuite ajouter un `<title>` ou un `aria-label` pour explicité la fonction de l'image.

**Exemple :**

```html
<svg role="img" aria-label="Le titre du lien">
<title>Le titre du lien</title>
[…]
</svg>
```

#### SVG décoratives

Dans ce cas, il faut uniquement mettre `aria-hidden="true"` sur le `svg` afin d'indiquer aux lecteurs d'écran de ne pas la restituer.

**Exemple :**

```html
<svg aria-hidden="true">
[…]
</svg>
```

### Vidéos

Utiliser un lecteur audio/vidéo accessible, par exemple les éléments HTML5 natifs.

Fournir une piste de sous-titres avec le format webVTT et l'élément `<track>`.

### PDF

Il faut que le PDF soit lui-même accessible, ou il faut proposer une alternative `HTML`, `.doc`, `.odt` structurés.

Lorsqu'un lien renvoi vers un téléchargement de PDF, il faut spécifier dans le `title`:

- son intitulé
- sa taille
- son format
- et l'ouverture dans une nouvelle fenêtre

**Exemple :**
`<a href="[url]" title="Intitulé (PDF, 456ko, nouvelle fenêtre)>Intitulé</a>`

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

La bibliothèque de plugins jQuery Pepin est un départ pour cela <https://github.com/alsacreations/pepin>

Pour les menus déroulants et mega menus, Accessible Mega Menu a fait ses preuves <https://adobe-accessibility.github.io/Accessible-Mega-Menu/>

---

## Ressources Générales

- Notices Accedeweb <https://www.accede-web.com/notices/>
- Checklist <https://www.a11yproject.com/checklist/>
- Patterns accessibles <https://www.w3.org/TR/wai-aria-practices-1.1/>
- RGAA <https://www.numerique.gouv.fr/publications/rgaa-accessibilite/>
- Scripts vanilla JS accessibles <https://van11y.net/>

## Outils

### Devtools

- Accessibilité dans les devtools de Chrome [https://www.smashingmagazine.com/2020/08/accessibility-chrome-devtools/](https://www.smashingmagazine.com/2020/08/accessibility-chrome-devtools/)

### Synthèses vocales

- [NVDA](https://www.nvda-fr.org/)
- VoiceOver (natif sur macOS, iOS) (activation : cmd + fn + F5), voir [raccourcis clavier](https://www.apple.com/voiceover/info/guide/_1131.html)
- [Jaws](https://www.freedomscientific.com/products/software/jaws/)
