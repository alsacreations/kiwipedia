# Accessibilité

> Statut : stable · Niveau : avancé

Conventions **spécifiques à Alsacréations** pour l'accessibilité (référentiels&#8239;: RGAA 4.1 et WCAG). Les bonnes pratiques génériques (sémantique HTML, `lang` sur `<html>`, hiérarchie de titres sans saut, `<label for>` associé à chaque champ, `<fieldset>`/`<legend>` pour grouper, `alt` sur toutes les images, `<caption>` + `<th scope>` sur les tableaux, `headers`/`id` sur les tableaux complexes, attribut `lang` sur les changements de langue, `dir` pour le sens de lecture, pas de piège au clavier, pas de `tabindex` positif, ARIA uniquement en complément du HTML natif, contrastes suffisants, information jamais portée par la seule couleur…) ne sont **pas** reprises ici&#8239;: elles sont déjà appliquées par défaut. Ce document ne liste que ce qui distingue nos projets — à appliquer sans qu'il soit nécessaire de le redemander.

---

## Niveaux d'exigence

| Niveau | Quand | Objectif |
| --- | --- | --- |
| **Niveau 1 — base** 🥈 | **Tous les projets**, par défaut | Conformité RGAA au moins partielle (supérieure à 50&#8239;%) |
| **Niveau 2 — à la carte** 🥇 | Uniquement si demandé par le client | Conformité RGAA partielle ou totale |

Toutes les sections ci-dessous relèvent du niveau 1, sauf la section [Niveau 2](#niveau-2--sur-demande).

## Structure de page

- Landmarks&#8239;: toujours doubler l'élément HTML5 de son `role` explicite (`<main role="main">`, etc.) — exigé par le RGAA 4.1. Tableau des `role` + `id` fixes et règle « ne pas nettoyer cette redondance »&#8239;: voir [HTML](html.md).
- `role="banner"`, `role="main"` et `role="contentinfo"`&#8239;: **une seule fois par page** (les éléments `<header>`/`<footer>` peuvent, eux, être répétés).
- Plusieurs `<nav>` ou plusieurs zones de recherche sur une page&#8239;: les distinguer par un `aria-label` («&#8239;Menu principal&#8239;», «&#8239;Fil d'Ariane&#8239;»…).
- Recherche&#8239;: avec l'élément natif `<search>`, ne pas ajouter `role="search"` (rôle implicite). Sinon, poser `role="search"` sur l'élément qui englobe le formulaire.
- Menus, fil d'Ariane, pagination, table des matières&#8239;: toujours en `<ul><li>` dans un `<nav role="navigation">`.
- Proposer **au moins deux moyens de navigation** parmi&#8239;: menu, plan du site, moteur de recherche interne. Menu, fil d'Ariane et recherche restent au même endroit et atteignables de la même façon (y compris au clavier) sur toutes les pages.
- Le `<h1>` porte le titre du **contenu courant**, jamais le nom du site commun à toutes les pages.
- Ordre du DOM = ordre logique de lecture (ex. titre en premier dans une carte d'actualité). Réordonner visuellement en CSS si besoin, sans compter sur `order` qui ne change pas l'ordre de restitution.

### `<title>` de page

- Séparateur `:` (deux-points), **jamais** `|` (pipe).
- Pages de résultats de recherche&#8239;: inclure le terme recherché et la page courante — «&#8239;Vous avez recherché le mot : xxx - page 2&#8239;».

### Liens d'évitement

Obligatoires. Premier élément focusable de la page, masqués hors focus, au minimum vers le contenu principal (d'autres possibles&#8239;: navigation, recherche, formulaire…). Si la cible n'est pas interactive, lui ajouter `tabindex="-1"`. Implémentation de référence&#8239;:

```html
<body>
  <ul class="skip-links">
    <li><a href="#navigation">Aller à la navigation</a></li>
    <li><a href="#main">Aller au contenu</a></li>
  </ul>
  […]
  <main id="main" role="main" tabindex="-1">
```

```css
@scope (.skip-links) {
  :scope {
    position: absolute;
    top: 8px;
    left: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    padding: 0.6rem 1rem;
    border: 3px solid currentcolor;
    background-color: mark;
    color: marktext;
    text-decoration: none;

    &:not(:focus, :active) {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      white-space: nowrap;
      clip-path: inset(50%);
    }

    &:focus-visible {
      position: absolute;
      z-index: calc(infinity);
      width: max-content;
    }
  }
}
```

## Liens

- Lien = changement de page ou de contexte&#8239;; action sur place (déplier, révéler, ouvrir une modale) = `<button>`.
- Lien sans texte visible (icône, image de fond, font-icon)&#8239;: intitulé dans un `<span class="visually-hidden">`, icône en `aria-hidden="true"`. **Ne pas** compter sur `title` seul (lien toujours considéré vide, restitution non garantie).

```html
<a href="https://www.facebook.com/…" class="link-facebook">
  <span class="icon" aria-hidden="true"></span>
  <span class="visually-hidden">Retrouvez-nous sur Facebook</span>
</a>
```

- **Nouvelle fenêtre** (`target="_blank"`)&#8239;: toujours le signaler. Méthode recommandée&#8239;: un `title` qui **reprend l'intitulé visible** suivi de «&#8239;(nouvelle fenêtre)&#8239;». Alternatives acceptées&#8239;: `aria-label` équivalent, ou pictogramme avec `alt="nouvelle fenêtre"` / `<span class="visually-hidden">nouvelle fenêtre</span>`.

```html
<a href="…" target="_blank" title="Lire l'article (nouvelle fenêtre)">Lire l'article</a>
```

- `title` en général&#8239;: uniquement pour une information complémentaire, et il doit reprendre l'intitulé du lien.
- **Lien de téléchargement**&#8239;: indiquer intitulé, **format**, **poids**, langue si différente de la page, et nouvelle fenêtre le cas échéant (ex. «&#8239;Rapport annuel (PDF, 2,4 Mo)&#8239;»).
- Intitulés type «&#8239;OK&#8239;», «&#8239;GO&#8239;», «&#8239;Valider&#8239;» interdits&#8239;; un «&#8239;En savoir plus&#8239;» n'est acceptable que si son contexte (phrase, paragraphe, `<li>`, titre précédent, en-tête de tableau) le rend explicite.

## Formulaires

- **Champ obligatoire**&#8239;: mention `(obligatoire)` dans chaque `<label>` (méthode par défaut), sinon un astérisque `(*)` **avec une légende explicative placée avant le premier champ**. Dans le code&#8239;: `required` ou `aria-required="true"`.

```html
<label for="lastname">Nom (obligatoire)</label>
<input type="text" id="lastname" name="lastname" autocomplete="family-name" required>
```

- **Format attendu / limite de caractères**&#8239;: dans le `<label>`, ou dans un texte lié par `aria-describedby`. Le `placeholder` ne sert **qu'à** donner un exemple, jamais d'étiquette ni d'indication.
- **Erreurs**&#8239;: `aria-invalid="true"` sur le champ + message explicite qui nomme le champ, lié par `aria-describedby`.

```html
<label for="email">E-mail (format attendu : john@example.org)</label>
<input type="email" id="email" name="email" autocomplete="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error">Le format de l'adresse e-mail n'est pas correct.</p>
```

- `autocomplete` **systématique** sur les champs de données personnelles ([valeurs WCAG](https://www.w3.org/TR/WCAG21/#input-purposes)).
- Intitulés de boutons explicites&#8239;: «&#8239;Envoyer le message&#8239;» plutôt que «&#8239;OK&#8239;» ou «&#8239;Valider&#8239;».

## Composants

- Modales&#8239;: élément natif `<dialog>`, avec titre et contenu identifiés, utilisable au clavier.
- Accordéons simples&#8239;: `<details>`/`<summary>` acceptés (voir les [limites connues](https://www.scottohara.me/blog/2022/09/12/details-summary.html)).
- Menus déroulants et mega menus&#8239;: [Accessible Mega Menu](https://adobe-accessibility.github.io/Accessible-Mega-Menu/) a fait ses preuves.
- Sliders, carrousels, onglets, accordéons, pagination…&#8239;: n'utiliser que des scripts accessibles (clavier + lecteur d'écran), suivre les [patterns APG](https://www.w3.org/WAI/ARIA/apg/patterns/).
- Contenu injecté dynamiquement (fetch, ajout au panier, confirmation d'envoi)&#8239;: zone `aria-live` (rôles `alert`, `status`, `log`…), ajustée avec `aria-atomic`/`aria-relevant` selon que le contenu est ajouté au conteneur ou que le conteneur lui-même est inséré.

```html
<div role="alert" aria-live="assertive" aria-atomic="true">
  <p>Article ajouté au panier</p>
</div>
```

## CSS

- Tailles de police en `rem`/`em`&#8239;; pas de hauteur fixe sur les éléments contenant du texte (les éléments décoratifs et l'attribut `height` des `<img>` ne sont pas concernés)&#8239;; zoom à 200&#8239;% sans perte.
- Viewport&#8239;: `<meta name="viewport" content="width=device-width, initial-scale=1">`, jamais `user-scalable=0`.
- **Focus**&#8239;: jamais `outline: none` ni d'outline dégradé. Pour masquer le focus au clic/tap tout en le gardant au clavier, utiliser ce pattern&#8239;:

```css
.custom-button:focus:not(:focus-visible) {
  outline-color: transparent;
}

.custom-button:focus-visible {
  outline: 6px dashed hotpink;
}
```

- Contenu généré (`::before`/`::after`)&#8239;: jamais porteur d'information&#8239;; s'il sert à une icône, poser `aria-hidden="true"` sur l'élément.
- Texte à lire mais masqué à l'écran&#8239;: classe `.visually-hidden`, **jamais** `display: none` (qui le masque aussi aux lecteurs d'écran)&#8239;:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
}
```

- Respecter les préférences utilisateur via les media features (`prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, `prefers-color-scheme`…).
- Exigences visuelles (contrastes, tailles de cibles…)&#8239;: voir [Webdesign — checklist accessibilité](webdesign.md#checklist-accessibilité).

## Images et SVG

- `alt` reprend l'information de l'image porteuse d'information ou cliquable (pour un lien image&#8239;: la destination, ex. `alt="Retour à l'accueil"`). Ne **jamais** préfixer par «&#8239;Image :&#8239;».
- Image décorative&#8239;: `alt=""`. Lien composite (texte + image)&#8239;: si le texte est explicite, l'image est décorative.
- Image complexe (graphique, infographie)&#8239;: `alt` court qui renvoie vers une description détaillée, placée juste après l'image (repliable dans un `<details>` si elle est longue) ou sur une autre page.
- SVG&#8239;: toujours nettoyer d'abord avec SVGOMG (voir [Icônes](icons.md)), notamment les `<title>` parasites ajoutés par les éditeurs. Ne plus ajouter `focusable="false"` (contournement IE devenu inutile).

| Cas | Balisage |
| --- | --- |
| SVG inline informatif | `role="img"` + `<title id>` référencé par `aria-labelledby`, ou `aria-label` si l'infobulle n'est pas souhaitée |
| SVG inline décoratif | `aria-hidden="true"`, sans `<title>`, `<desc>`, `title`, `aria-label`, `aria-labelledby` ni `role="img"` |
| SVG externe (`<img>`) | `alt` renseigné ou vide, comme toute image |
| **Icône SVG** | **Toujours décorative** (`aria-hidden="true"`)&#8239;: l'intitulé est porté par le lien/bouton parent ou par un `<span class="visually-hidden">` |

```html
<button>
  <svg aria-hidden="true">…</svg>
  <span class="visually-hidden">Fermer</span>
</button>
```

## Médias

- Lecteur audio/vidéo accessible prêt à l'emploi (éléments natifs `<audio>`/`<video>`, ou YouTube).
- Pas de lecture automatique&#8239;; contrôles lecture/pause/stop, son, sous-titres et audiodescription si présents.
- Chaque média est précédé d'un titre ou d'un texte qui l'identifie.
- Aucune animation de plus de 5 secondes (sans moyen de l'arrêter).
- `<iframe>`&#8239;: toujours un `title` pertinent.
- Documents bureautiques&#8239;: PDF rendu accessible à l'export, ou alternative structurée (HTML, .odt, .doc).

## Niveau 2 — sur demande

- Tests avec lecteur d'écran (NVDA, VoiceOver).
- Sous-titres WebVTT via `<track>` sur les vidéos ([article de référence](https://www.alsacreations.com/article/lire/1878-Le-sous-titrage-video-avec-WebVTT.html))&#8239;; transcription textuelle des contenus audio.
- PDF accessibles ou alternative HTML/.odt/.doc.
- `aria-live` sur tous les contenus chargés ou révélés dynamiquement.
- Outil de personnalisation d'affichage&#8239;: [AccessConfig](https://accessconfig.a11y.fr/) ou [Orange Confort+](https://confort-plus.orange.com/).
- Compatibilité de chaque script avec les technologies d'assistance, lecteurs audio/vidéo conçus ou personnalisés pour être accessibles.
- Ordre de tabulation retravaillé (`tabindex="0"`/`"-1"`), y compris dans les modales et la navigation.

## Checklist contribution (CMS)

À transmettre aux personnes qui saisissent les contenus (WordPress ou autre)&#8239;:

- Texte non justifié, taille de police suffisante, pas d'espacement par sauts de ligne.
- Hiérarchie de titres respectée, listes à puces, citations (`<blockquote>`/`<q>`), tableaux réservés aux données.
- Abréviations explicitées à la première occurrence (`<abbr>`)&#8239;; dates en toutes lettres avec l'année sur 4 chiffres&#8239;; changements de langue déclarés.
- Liens explicites, ouverture en nouvelle fenêtre signalée, fichiers à télécharger avec titre, format, poids et langue.
- Alternative textuelle des images (ou vide si décorative), description détaillée pour les images complexes.
- Ne jamais désigner un élément par sa position, sa couleur ou sa forme.

## Outils utilisés à l'agence

- Audit&#8239;: [Wave](https://wave.webaim.org/extension/), [Axe](https://www.deque.com/axe/), [Tanaguru Webextension](https://github.com/Tanaguru/webextension), HeadingsMap ([Chrome](https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi), [Firefox](https://addons.mozilla.org/fr/firefox/addon/headingsmap/)).
- Contrastes&#8239;: [Contrast Finder](https://app.contrast-finder.org), [Contrast Grid](https://contrast-grid.eightshapes.com/) (palette complète), [Colour Contrast Analyser](https://developer.paciellogroup.com/resources/contrastanalyser/).
- Lecteurs d'écran&#8239;: [NVDA](https://www.nvda-fr.org/), VoiceOver (macOS/iOS).
- Références&#8239;: [RGAA](https://accessibilite.numerique.gouv.fr/), [Notices AcceDe Web](https://www.accede-web.com/notices/), [Guidelines Orange](https://a11y-guidelines.orange.com/fr/), [APG W3C](https://www.w3.org/WAI/ARIA/apg/).

---

## Voir aussi

- [HTML](html.md) — Landmarks `role` + `id`, `translate="no"`.
- [CSS](css.md) — Focus visible, `prefers-reduced-motion`.
- [JavaScript](javascript.md) — Amélioration progressive, états `is-*`.
- [Webdesign](webdesign.md) — Contrastes et lisibilité dès la conception.
- [WordPress — Accessibilité](wordpress/accessibility.md) — Spécificités WordPress.
