# HTML

> Statut : stable · Niveau : avancé

Conventions **spécifiques à Alsacréations** pour le HTML. Les bonnes pratiques génériques (validité W3C/WHATWG, UTF-8, doctype HTML5, casse minuscule, guillemets doubles, attributs booléens sans valeur redondante, `alt` sur les images, un seul `<h1>`, hiérarchie de titres logique, `rel="noopener"` sur `target="_blank"`, usage des éléments sémantiques `<header>`/`<main>`/`<article>`/`<section>`/`<nav>`/`<aside>`/`<footer>`…) ne sont **pas** reprises ici&#8239;: elles sont déjà appliquées par défaut. Ce document ne liste que ce qui distingue nos projets d'un projet HTML standard — à appliquer sans qu'il soit nécessaire de le redemander.

---

## Landmarks&#8239;: doubler la sémantique HTML5 avec `role` + `id` fixe

> ✅ **Par défaut** — Même si les éléments HTML5 (`<header>`, `<main>`, `<nav>`, `<footer>`) portent un rôle ARIA implicite, ajouter explicitement le `role` correspondant **et** un `id` fixe. Ce n'est pas une redondance à corriger&#8239;: c'est une convention volontaire (exigence RGAA 4.1, compatibilité lecteurs d'écran anciens, ancrage stable pour skip-links/CSS/JS). Ne pas la « nettoyer » en la jugeant superflue.

| Zone | Élément + attributs |
| --- | --- |
| En-tête global | `<header id="header" role="banner">` |
| Contenu principal | `<main id="main" role="main">` |
| Barre latérale | `<aside role="complementary">` |
| Pied de page global | `<footer id="footer" role="contentinfo">` |
| Navigation principale | `<nav id="navigation" role="navigation">` |
| Recherche | `<form id="search" role="search">` |

Règles d'unicité (`role="banner"`/`role="main"`/`role="contentinfo"` une seule fois par page), `aria-label` si plusieurs `<nav>`/recherches, nuance avec l'élément `<search>` natif&#8239;: voir [Accessibilité — Structure générale](accessibility.md).

## Détection JavaScript&#8239;: pattern `no-js` / `js`

Convention maison pour cibler du CSS/JS selon la disponibilité réelle de JavaScript&#8239;: `<html>` démarre avec la classe `no-js`, retirée au profit de `js` par un script synchrone placé en tout début de `<head>` (avant toute feuille de styles qui en dépendrait).

```html
<html lang="fr" class="no-js">
  <head>
    <script>
      document.documentElement.classList.remove('no-js')
      document.documentElement.classList.add('js')
    </script>
    ...
```

Permet des règles `.no-js .carousel { ... }` / `.js .carousel { ... }` sans dépendre uniquement de `@supports` ou d'un flash de contenu non-stylé JS.

## Nommage

- Convention générale (langue, casse, séparateurs)&#8239;: voir [Conventions de nommage](naming-conventions.md). Règle propre au HTML&#8239;: un `id` est toujours doublé d'une classe CSS — jamais de sélecteur CSS ciblant un `id` seul.
- Référence de nommage des composants, dans cet ordre de priorité&#8239;: 1) **[Open UI](https://open-ui.org/)** (noms standard), 2) **[Bootstrap Components](https://getbootstrap.com/docs/5.3/components)** en repli si absent d'Open UI.

| Pattern | Convention | Exemple |
| --- | --- | --- |
| Conteneur unique | `.wrapper` | `.modal-wrapper` |
| Conteneur multiple | `.container` | `.cards-container` |
| Enfant direct | `*-inner` | `.sidebar-inner` |
| Groupe homogène | `.group` | `.button-group` |
| État | `is-` | `.is-active`, `.is-loading` |
| Capacité | `has-` | `.has-dropdown`, `.has-error` |
| Hook JavaScript | `js-` | `.js-toggle`, `.js-menu` |

> 💡 Ces suffixes restent compatibles avec l'isolation `@scope` (voir [CSS](css.md)) — ce ne sont pas des noms composés façon BEM, seulement des marqueurs de rôle sur des classes courtes.

## Layouts

Toujours passer par [Bretzel](https://bretzel.alsacreations.com/) (`data-layout="…"`) avant d'écrire du Grid/Flexbox manuel — détaillé dans [CSS](css.md), ne pas redupliquer la logique ici.

## Traductibilité

Marquer `translate="no"` sur tout contenu qui ne doit pas être traduit automatiquement par un outil tiers (noms propres, adresses)&#8239;:

```html
<span translate="no">Jean Dupont</span>
<address translate="no">123 rue de la Paix, Paris</address>
```

## Images&#8239;: formats, largeurs et qualité imposés

> 📌 Référencé depuis [Performances](performances.md) — section faisant autorité pour les réglages d'images, ne pas déplacer sans mettre à jour le renvoi.

Hiérarchie de formats et réglages à respecter (en plus de `width`/`height`/`loading="lazy"`/`decoding="async"` déjà systématiques)&#8239;:

| Format | Usage | Qualité |
| --- | --- | --- |
| **AVIF** | Photos, captures complexes | 60–85 |
| **WebP** | Schémas précis (lossless) | — |
| **SVG** | Illustrations vectorielles | Optimisé SVGOMG (voir [Icônes](icons.md)) |
| JPG/PNG | Legacy uniquement | À éviter |

Largeurs suggérées&#8239;: **2000px** (pleine largeur), **1200px** (demi-page), **800px** (cards/vignettes).

Outils imposés/recommandés&#8239;: **[Quetsche](http://quetsche.alsacreations.com/)** (outil maison, à privilégier) ou [Squoosh](https://squoosh.app/) en interactif, [Vite Image Optimizer](https://www.npmjs.com/package/vite-plugin-image-optimizer) en build, [Sharp](https://sharp.pixelplumbing.com)/[Avif-CLI](https://github.com/lovell/avif-cli) en CLI.

---

## Voir aussi

- [CSS](css.md) — Architecture, `@scope`, Bretzel, design tokens.
- [Accessibilité](accessibility.md) — Landmarks, ARIA, formulaires, médias.
- [SEO](seo.md) — Métadonnées, OpenGraph, données structurées.
- [Performances](performances.md) — Lazy-loading, preload, Core Web Vitals.
- [Icônes](icons.md) — Intégration et optimisation SVG.
- [Conventions de nommage](naming-conventions.md) — Langue, casse, séparateurs.
