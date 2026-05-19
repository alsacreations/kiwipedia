# HTML

> Statut : stable · Niveau : avancé

**TL;DR** — Sémantique, structure et métadonnées HTML pour des documents valides, accessibles et performants. Standards WHATWG, encodage UTF-8, doctype HTML5.

Ce document rassemble les bonnes pratiques HTML appliquées par l'agence [Alsacreations.fr](https://www.alsacreations.fr/). Il évolue dans le temps et s'adapte à chaque nouveau projet.

## Table des matières

1. [Généralités et conventions](#généralités-et-conventions)
2. [Structure de document](#structure-de-document)
3. [Sémantique et architecture](#sémantique-et-architecture)
4. [Optimisation des médias](#optimisation-des-médias)
5. [Formulaires et interactions](#formulaires-et-interactions)
6. [Accessibilité](#accessibilité)
7. [SEO et métadonnées](#seo-et-métadonnées)

---

## Généralités et conventions

### Standards et validation

- ✅ Le code HTML est valide selon les standards WHATWG : <https://whatwg.org/validator/>
- ✅ Encodage UTF-8 (sans BOM) pour tous les fichiers et bases de données
- ✅ Doctype HTML5 : `<!DOCTYPE html>`

### Règles syntaxiques

- **Casse** : Éléments et attributs en minuscules
- **Quotes** : Toujours utiliser les guillemets doubles `"`
- **Attributs booléens** : Pas de valeur redondante (ex. `required` et non `required="required"`)
- **Indentation** : 2 espaces (configuration [EditorConfig](https://editorconfig.org/) + Prettier)

### Nommage des fichiers et classes

- **Séparateurs** : Utiliser des tirets pour les fichiers, classes et IDs
  - Fichiers : `styles-extra.css`, `jquery-3.0.min.css`
  - Classes : `.slide-info`, `.card-header`
- **Langue** : Privilégier l'anglais pour les attributs `class` et `id`
- **IDs** : Limiter leur usage et toujours doubler par une classe CSS

### Ressources de référence

- **[Design System W3C](https://design-system.w3.org/)** : composants standardisés
- **[Open UI](https://open-ui.org/)** : spécifications comportements attendus
- **[Bootstrap Components](https://getbootstrap.com/docs/5.3/components)** : nommage de fallback

---

## Structure de document

### Modèle-type HTML5

```html
<!DOCTYPE html>
<html lang="fr" class="no-js">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Titre unique de la page - Nom du site</title>
    
    <!-- Styles critiques en priorité -->
    <link rel="stylesheet" href="/assets/css/styles.css">
    <link rel="stylesheet" href="/assets/css/print.css" media="print">

    <!-- Métadonnées SEO et réseaux sociaux -->
    <meta name="description" content="Description de la page">
    <meta property="og:title" content="Titre unique de la page - Nom du site">
    <meta property="og:description" content="Description de la page">
    <meta property="og:image" content="https://www.example.com/image.jpg">
    <meta property="og:image:alt" content="Description de l'image">
    <meta property="og:locale" content="fr_FR">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Nom du site">
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:url" content="https://www.example.com/page">
    <link rel="canonical" href="https://www.example.com/page">

    <!-- Favicon moderne -->
    <link rel="icon" href="/favicon.ico" sizes="32x32">
    <link rel="icon" href="/icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
  </head>

  <body>
    <!-- Contenu principal -->
    <script src="/assets/js/global.js"></script>
  </body>
</html>
```

### Éléments critiques du `<head>`

#### Viewport responsive

> ⚠️ **Important** : Proscrire les syntaxes limitant l'agrandissement (`maximum-scale=1`, `user-scalable=no`)

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

#### Titre et description

```html
<!-- Max 55 caractères pour le SEO -->
<title>Titre unique de la page - Nom du site</title>
<meta name="description" content="Description concise et pertinente">
```

#### Langue et encodage

```html
<html lang="fr">
<meta charset="UTF-8">

<!-- Langues alternatives pour sites multilingues -->
<link rel="alternate" href="https://en.example.com/" hreflang="en">
```

#### Favicon moderne

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
```

> 📚 **Ressource** : [How to Favicon](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)

### Detection JavaScript

```html
<script>
  document.documentElement.classList.remove('no-js')
  document.documentElement.classList.add('js')
</script>
```

---

## Sémantique et architecture

### Structure globale recommandée

```html
<body>
  <header id="header" role="banner">
    <!-- En-tête global, navigation -->
  </header>

  <main id="main" role="main">
    <!-- Contenu principal -->
  </main>

  <aside class="aside" role="complementary">
    <!-- Barre latérale (extractible sans impact) -->
  </aside>

  <footer id="footer" role="contentinfo">
    <!-- Pied de page global -->
  </footer>
</body>
```

### Éléments sémantiques privilégiés

Préférer les éléments HTML5 sémantiques aux `<div>` neutres :

| Élément | Usage | Exemple |
|---------|-------|---------|
| `<header>` | En-tête de section ou page | Navigation principale |
| `<main>` | Contenu principal unique | Zone centrale |
| `<article>` | Contenu autonome | Article de blog |
| `<section>` | Section thématique | Chapitre |
| `<nav>` | Navigation | Menu principal |
| `<aside>` | Contenu tangentiel | Barre latérale |
| `<footer>` | Pied de section ou page | Copyright, liens |

### Zones fonctionnelles spécialisées

```html
<nav id="navigation" role="navigation">
  <!-- Navigation principale -->
</nav>

<form id="search" role="search">
  <!-- Recherche principale -->
</form>
```

### Hiérarchie des titres

> 🎯 **Règle** : Une seule balise `<h1>` par page, hiérarchie logique h1→h6

```html
<h1>Titre principal de la page</h1>
  <h2>Section principale</h2>
    <h3>Sous-section</h3>
    <h3>Autre sous-section</h3>
  <h2>Autre section principale</h2>
```

### Convention des noms de composants

#### Nommage de base

- Référence prioritaire : **[Open UI](https://open-ui.org/)** pour les noms standard
- Référence secondaire : **[Bootstrap Components](https://getbootstrap.com/docs/5.3/components)** si non disponible

#### Groupes de composants

| Pattern | Convention | Exemple |
|---------|------------|---------|
| Conteneur unique | `.wrapper` | `.modal-wrapper` |
| Conteneur multiple | `.container` | `.cards-container` |
| Enfant direct | `*-inner` | `.sidebar-inner` |
| Groupe homogène | `.group` | `.button-group` |

#### Layouts et états

| Type | Règle | Exemples |
|------|---------|----------|
| Layouts | Utiliser [Bretzel](https://bretzel.alsacreations.com/) | `data-layout="switcher"`, `data-layout="duo"` |
| États | `is-` | `.is-active`, `.is-loading` |
| Capacités | `has-` | `.has-dropdown`, `.has-error` |
| JavaScript | `js-` | `.js-toggle`, `.js-menu` |

### Traductibilité

```html
<!-- Contenu à ne pas traduire -->
<span translate="no">Jean Dupont</span>
<address translate="no">123 rue de la Paix, Paris</address>
```

---

## Optimisation des médias

### Images : règles essentielles

> 💡 **Règle critique** : Toujours ajouter `width` et `height` (dimensions réelles) pour éviter les Layout Shifts

```html
<!-- Format moderne optimisé -->
<img src="photo.avif" alt="Description précise" 
     width="1200" height="800"
     loading="lazy" decoding="async">
```

### Formats recommandés

#### Hiérarchie des formats

| Format | Usage principal | Qualité recommandée |
|--------|-----------------|-------------------|
| **AVIF** | Photos, captures complexes | 60-85 |
| **WebP** | Schémas précis (lossless) | - |
| **SVG** | Illustrations vectorielles | Optimisé SVGOMG |
| JPG/PNG | Legacy uniquement | Éviter |

#### Largeurs suggérées

- **2000px** : images pleine largeur
- **1200px** : images demi-page
- **800px** : cards/vignettes

### Code images responsive

```html
<!-- Format unique AVIF -->
<img src="kiwi.avif" alt="Un kiwi en tutu" 
     width="1200" height="800" 
     loading="lazy" decoding="async">

<!-- Fallback multi-formats -->
<picture>
  <source type="image/avif" srcset="kiwi.avif">
  <img src="kiwi.webp" alt="Un kiwi en tutu" 
       width="1200" height="800"
       loading="lazy" decoding="async">
</picture>
```

### Reset CSS pour images

```css
img {
  max-width: 100%; /* Largeur fluide */
  height: auto; /* Ratio préservé */
  background: #f0f0f0; /* Placeholder */
}
```

### Vidéo optimisée

```html
<video width="800" height="450" controls playsinline>
  <source src="video.mp4" type="video/mp4">
  <p>Votre navigateur ne supporte pas la vidéo HTML5.</p>
</video>
```

> 📚 [Recommandations Apple pour Safari](https://developer.apple.com/documentation/webkit/delivering_video_content_for_safari/)

### Outils d'optimisation

#### Images

- **Navigateur** : [Squoosh](https://squoosh.app/), [Quetsche (by Alsacréations)](http://quetsche.alsacreations.com/)
- **Vite** : [Vite Image Optimizer](https://www.npmjs.com/package/vite-plugin-image-optimizer)
- **CLI** : [Sharp](https://sharp.pixelplumbing.com), [Avif-CLI](https://github.com/lovell/avif-cli)
- **macOS** : [Image Optimizer](https://github.com/antonreshetov/image-optimizer), [ImageOptim](https://imageoptim.com/fr)

#### Vidéo et audio

- [Handbrake](https://handbrake.fr/) (vidéo)
- [Audacity](https://tenacityaudio.org/) (audio)

---

## Formulaires et interactions

### Structure accessible

```html
<form>
  <div class="field">
    <label for="email">Adresse e-mail *</label>
    <input type="email" id="email" name="email" 
           autocomplete="email" required
           aria-describedby="email-help">
    <small id="email-help">Format : nom@exemple.com</small>
  </div>
  
  <div class="field">
    <label for="message">Message</label>
    <textarea id="message" name="message" 
              autocomplete="off"></textarea>
  </div>
  
  <button type="submit">Envoyer</button>
</form>
```

### Attributs d'amélioration UX

| Attribut | Fonction | Exemple |
|----------|----------|---------|
| `autocomplete` | Assistance saisie | `email`, `tel`, `name` |
| `inputmode` | Clavier mobile | `numeric`, `tel` |
| `pattern` | Validation côté client | `[0-9]{5}` |
| `aria-describedby` | Aide contextuelle | Référence ID d'aide |

### Liens externes sécurisés

> ⚠️ **Sécurité** : Toujours utiliser `rel="noopener"` sur `target="_blank"`

```html
<!-- Lien externe sécurisé -->
<a href="https://example.com" target="_blank" rel="noopener">
  Site externe
</a>

<!-- Encore mieux : éviter target="_blank" -->
<a href="https://example.com">Site externe</a>
```

---

## Accessibilité

> 📚 **Référence complète** : [Guidelines Accessibilité](accessibility.md)

### Points critiques

- **Contrastes** : Respecter WCAG AA (4.5:1 minimum)
- **Navigation clavier** : Tous les éléments interactifs accessibles
- **Alternatives** : `alt` sur images, transcriptions pour vidéos
- **Structure** : Hiérarchie logique des titres

### ARIA essentiel

```html
<!-- Landmarks -->
<nav aria-label="Navigation principale">
<main aria-label="Contenu principal">

<!-- États dynamiques -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<div id="menu" aria-hidden="true">

<!-- Descriptions -->
<input aria-describedby="help-text">
<div id="help-text">Texte d'aide</div>
```

---

## SEO et métadonnées

### OpenGraph (réseaux sociaux)

```html
<meta property="og:title" content="Titre unique - Nom du site">
<meta property="og:url" content="https://www.example.com/page">
<meta property="og:locale" content="fr_FR">
<meta property="og:description" content="Description de la page">
<meta property="og:image" content="https://www.example.com/image.jpg">
<meta property="og:image:alt" content="Description de l'image">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Nom du site">
<meta name="twitter:card" content="summary_large_image">
```

### Données structurées (Schema.org)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titre de l'article",
  "author": {
    "@type": "Person",
    "name": "Nom de l'auteur"
  },
  "datePublished": "2024-01-15"
}
</script>
```

### Outils de validation

- **OpenGraph** : [OpenGraph.xyz](https://www.opengraph.xyz/), [Meta Tags](https://metatags.io)
- **Twitter Cards** : [Twitter Validator](https://cards-dev.twitter.com/validator)
- **Données structurées** : [Google Rich Results Test](https://search.google.com/test/rich-results)

### OpenSearch (moteur interne)

```html
<link rel="search" type="application/opensearchdescription+xml" 
      title="Recherche sur le site" href="/opensearch.xml">
```

---

> 📚 **Ressources complémentaires**
>
> - 🔗 [HTMLHead.dev](https://htmlhead.dev/) — Référence complète pour `<head>`.
> - 🔗 [Josh Buchea HEAD](https://github.com/joshbuchea/HEAD) — Collection métadonnées.

---

## Voir aussi

- [CSS](css.md) — Architecture, variables, dark mode.
- [Accessibilité](accessibility.md) — Sémantique et patterns ARIA.
- [SEO](seo.md) — Métadonnées et référencement.
- [Performances](performances.md) — Optimisation des médias et du chargement.
