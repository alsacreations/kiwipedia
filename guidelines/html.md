# Guidelines : HTML

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant **"HTML"**. Ces indications sont destinées à évoluer dans le temps et à s'adapter à chaque nouveau projet.

## Généralités

Sauf spécificités contraires :

- Le code HTML est valide <https://whatwg.org/validator/>
- L’encodage des fichiers et des bases de données doit se faire en `UTF-8` (sans `BOM`).
- Les noms d'éléments et attributs HTML sont rédigés en minuscules, les attributs utilisent les double quotes (ex. `class="fruit"`). Les valeurs identiques aux attributs ne sont pas renseignées sauf nécessité (ex. en HTML5 pas de `checked="checked"`).
- Les éléments disposants d’id (à limiter autant que possible) doivent disposer d’une classe dupliquée (pour CSS).
- Les indentations se font à l’aide de deux espaces et non à l'aide de tabulations. Pour assurer une cohérence inter-projets, utiliser la convention [EditorConfig](https://editorconfig.org/), voire Prettier.
- Séparer les noms des fichiers, des images des classes et id CSS par des tirets (`.slide-info`, `styles-extra.css`, `jquery-3.0.min.css`, etc).
- Exploiter le [Design System du W3C](https://design-system.w3.org/) pour les différents composants

## Modèle-type

```html
<!DOCTYPE html>
<html lang="fr" class="no-js">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Titre unique de la page - Nom du site</title>
    <!-- Pas de ressources bloquantes avant le chargement des styles -->
    <link rel="stylesheet" href="/assets/css/styles.css">
    <link rel="stylesheet" href="/assets/css/print.css" media="print">

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

    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="alternate icon" href="/favicon.png">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff8a01">

    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#abc737">
  </head>

  <body>
    <!-- ... -->
    <script src="/assets/js/global.js"></script>
  </body>
</html>
```

Peut être complété par (ou intégré dans un autre script s'il s'agit d'une application compilée)

```html
<script>
  document.documentElement.classList.remove('no-js')
  document.documentElement.classList.add('js')
</script>
```

## En-tête de document

Tout ce que l'on peut y trouver : <https://htmlhead.dev/> + <https://github.com/joshbuchea/HEAD>

### Doctype

Le doctype HTML/HTML5 est :

```html
<!DOCTYPE html>
```

### Langue

La langue de la page est systématiquement renseignée via un attribut dans l’élément `<html>` et un code [Code ISO 639-1](https://fr.wikipedia.org/wiki/Liste_des_codes_ISO_639-1) :

```html
<html lang="fr"></html>
```

Les langues alternatives en cas de site multilingue sont indiquées par une balise link de type _alternate_.

```html
<link rel="alternate" href="https://en.example.com/" hreflang="en">
```

### Encodage

L’encodage du document (en UTF-8) est systématiquement renseigné via un élément meta dans le `<head>` :

```html
<meta charset="UTF-8">
```

### Titre de la page

Le titre de page, différent à chaque page, d'une longueur maximum de 55 caractères (SEO), est systématiquement renseigné via un élément `<title>` dans le `<head>` :

```html
<title>Titre unique de la page - Nom du site</title>
```

### Meta "Viewport"

Pour une adaptation du site web vers les terminaux mobiles, l’élément `<meta name="viewport">` est ajouté dans la partie `<head>`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

**_Note : Les syntaxes empêchant l’agrandissement des contenus par le visiteur seront proscrites (maximum-scale=1, user-scalable=no, etc.)._**

🔖 Voir [https://www.alsacreations.com/article/lire/1490-comprendre-le-viewport-dans-le-web-mobile.html](https://www.alsacreations.com/article/lire/1490-comprendre-le-viewport-dans-le-web-mobile.html)

### Favicon

L’icône de favori (favicon) est utilisée de différentes manières par les navigateurs (onglets, favoris), systèmes et moteurs de recherche (affichage dans les résultats).

- Le format ICO est ancien,
- le format PNG permet une meilleure définition (carré multiple de 48x48) avec un poids plus léger,
- et le [format SVG](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/) se voit [progressivement supporté](https://caniuse.com/link-icon-svg).

La syntaxe recommandée pour les navigateurs modernes est celle-ci :

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" href="/favicon.png">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff8a01">
```

Les navigateurs ne supportant pas le format `svg` vont ignorer la première instruction.

- [Google : favicon à afficher dans les résultats de recherche](https://developers.google.com/search/docs/appearance/favicon-in-search)
- Générateur de favicon SVG (avec dark thème) : [https://realfavicongenerator.net/svg-favicon/](https://realfavicongenerator.net/svg-favicon/)
- [favicon-cheat-sheet](https://github.com/audreyfeldroy/favicon-cheat-sheet)

## Conventions de nommage

### Nommage des composants

Chaque composant dispose d'un nom sous forme de classe HTML et/ou d'un nom de fichier propre, par exemple `class="slider"` au sein du fichier `slider.astro`.

On privilégie l'anglais pour le nommage des éléments (attributs `class`, `id`...).

Le collectif du W3C **[Open UI](https://open-ui.org/)** a pour mission de spécifier les comportements attendus des composants classique. **Se réferer en priorité à cette ressource pour choisir le nom d'un composant**. Si le composant souhaité n'y figure pas, se reporter à la liste des composants proposés dans [Bootstrap](https://getbootstrap.com/docs/5.3/components).

### Nommage des groupes de composants

Les regroupements de composants sont nommés ainsi&#8239;:

- `.wrapper` : destiné à contenir un élément unique
- `.container` : destiné à contenir  plusieurs éléments
- `*-inner` : désigne un enfant direct d'un wrapper ou container
- `.group` : contient un ensemble d'éléments de même type (ex. `.card-group` qui contient des enfants `.card`)

### Nommage des Layouts

Les "Layouts" sont des zones d'affichages destinées à gérer la façon dont les composants vont s'afficher et interagir entre eux. Ils sont préfixés d'un `l-`.

La liste actuelle des Layouts est : `l-flow`, `l-autogrid`, `l-switcher`, `l-cluster`, `l-repel`, `l-reel`, `l-media`, `l-breakout`, `l-layout-maxed`.

Nos Layouts sont présentés dans [Bretzel](http://bretzel.alsacreations.com/#layouts) et [récupérables sur Github](https://github.com/alsacreations/bretzel/blob/main/public/bretzel-layouts.css).

## Sémantique globale

Les éléments HTML5 `<header>`, `<article>`, `<main>`, `<footer>`, `<aside>`, `<section>` et `<nav>` sont privilégiés aux éléments neutres `<div>` si leur fonction s’y prête.

La structure globale préconisée est celle-ci :

- `<body>` : corps de page et du site web
- `<main id="main" role="main">` : conteneur général du contenu principal, typiquement ce qui n'est pas dans header et footer
- `<header id="header" role="banner">` : entête global, comportant souvent la navigation et des éléments qui se retrouvent en commun sur (quasiment) toutes les pages
- `<footer id="footer" role="contentinfo">` : pied de page global comportant des éléments qui se retrouvent en commun sur (quasiment) toutes les pages
- `<aside class="aside" role="complementary">` : barre latérale globale. Note : `<aside>` doit pouvoir être extrait de la page sans poser de problème, en clair ne pas y placer la navigation par exemple.
- `<nav id="navigation" role="navigation">` : navigation principale
- `<form id="search" role="search">` : recherche principale

### Traductibilité

Utiliser l'attribut `translate="no"` sur toutes les portions de contenu qui **ne doivent pas** être traduites, par exemple noms propres de personnes et d'oeuvres, adresses.

### Niveaux de titres

Chaque page doit comprendre un élément de titre de premier niveau `<h1>` et la structure des autres niveaux doit suivre un ordre logique (h1 à h6).

## Accessibilité

Une attention toute particulière sera apportée à l’accessibilité des documents afin que chaque utilisateur, quelle que soit sa défaillance, puisse avoir plein accès aux contenus proposés.

🔖 Voir [Guidelines Accessibilité](accessibility.md).

## Formulaires

Privilégier au maximum la conception propre et ergonomique de formulaires avec les champs et éléments dédiés :

- Les étiquettes `<label>` reliées à chaque `<input>`, `<textarea>`, etc. grâce aux attributs `for`/`id`.
- L'attribut [autocomplete](https://web.dev/learn/forms/autofill/) pour faciliter la saisie.

## Images

- Toujours indiquer les dimensions initiales de l'image (`width` et `height`) dans le HTML pour que le navigateur puisse calculer le **ratio** et éviter des Layout Shifts.
- Utiliser des formats d'images modernes et plus légers (Webp, Avif) à condition que le processus d'encodage/décodage soit lui-même rapide.
- `max-width: 100%` pour que l'image s'adapte en largeur à son conteneur (images fluides).
- `height: auto` pour que le navigateur applique le ratio systématiquement.
- `background-color` sur l'image pour indiquer visuellement l'espace qui sera occupé quand elle sera chargée (placeholder).

### Code recommandé

```html
<!-- Format unique (webp), moins optimal -->
<img src="kiwi.webp" alt="kiwi" decoding="async" loading="lazy" 
       width="2000" height="1000">

<!-- Formats avif + webp -->
<picture>
  <source type="image/avif" srcset="kiwi.avif">
  <source type="image/webp" srcset="kiwi.webp">
  <img src="kiwi.jpg" alt="kiwi" decoding="async" loading="lazy" 
       width="2000" height="1000">
</picture>
```

```css
img {
  max-width: 100%; /* largeur fluide */
  height: auto; /* ratio préservé */
  background: gray; /* placeholder en attendant */
}
```

### Outils d'optimisation d'images

- Universel en ligne : <https://squoosh.app/> avec aperçu avant/après, redimensionnement, autres options (PNG, JPEG, WEBP)
- MacOS : <https://github.com/antonreshetov/image-optimizer> très facile par drag&drop et traitement par lot (PNG, JPEG, GIF, SVG) ou <https://imageoptim.com/fr>
- SVG : <https://jakearchibald.github.io/svgomg/>
- AVIF : <https://avif.io> en ligne ou <https://github.com/lovell/avif-cli> en ligne de commande
- <https://sharp.pixelplumbing.com>
- <https://www.smashingmagazine.com/2022/07/powerful-image-optimization-tools/>

## Vidéo

On privilégie la balise `<video>` avec au moins une source MP4 par défaut. Sur Safari (macOS, iOS) on observe les [recommandations d'Apple pour la vidéo](https://developer.apple.com/documentation/webkit/delivering_video_content_for_safari/), par exemple l'attribut `playsinline` pour ne pas bloquer la lecture automatique.

### Outils d'optimisation vidéo et audio

- [Handbrake](https://handbrake.fr/)
- [Audacity](https://www.audacityteam.org/)

## Microdata

Dans la mesure du possible, et selon le type de site, les microformats les plus courants seront ajoutés.

Vocabulaire privilégié : [https://schema.org](https://schema.org) (promu et utilisé par Google, Yahoo, Bing, Yandex) avec toute la [hiérarchie](https://schema.org/docs/full.html) de types prévus.

🔖 Documentation : [https://www.alsacreations.com/article/lire/1509-microdata-microformats-schema-semantique.html](https://www.alsacreations.com/article/lire/1509-microdata-microformats-schema-semantique.html)

## Classes et états

- Le lien, l’onglet ou la page active est désigné par la classe `.is-current`
- Tout état est préfixé par "is-". Ex : `.is-paused`, `.is-opened`, `.is-hidden`, `.has-*`
- Tout élément manipulé par JavaScript est préfixé par "js-". Ex : `.js-nav-button`, `.js-menu`, `.js-is-hidden`

## Liens target `\_blank`

Dans la mesure du possible, éviter les liens ouvrant une nouvelle fenêtre/onglet, sans les signaler explicitement. Ils perturbent la navigation classique du visiteur et peuvent créer des failles de sécurité.

🔖 Voir [https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c](https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c).

**_Toujours utiliser `rel="noopener"` sur des liens `target="_blank"`_**

## Meta spécifiques - SEO et réseaux sociaux

Les liens entre site web et les différents réseaux sociaux sont de plus en plus forts. Certaines meta spécifiques permettent de faciliter ou d’améliorer ces liens, sans que l’on connaisse directement leur impact sur le référencement direct.

### OpenGraph

L’[OpenGraph](https://ogp.me/) permet de maîtriser davantage l'apparence des contenus partagés via URL sur les réseaux sociaux (Facebook, Twitter, LinkedIn, Pinterest entre autres). Le titre, l'image d'aperçu, la description, etc. peuvent être personnalisés. On peut tester l'implémentation à l'aide de <https://www.opengraph.xyz/> ou <https://cards-dev.twitter.com/validator> ou <https://debug.iframely.com/> ou <https://developers.facebook.com/tools/debug> et générer à l'aide de <https://metatags.io>. Parmi les valeurs de og: les plus utilisées :

```html
<meta property="og:title" content="Titre unique de la page - Nom du site" />
<meta property="og:url" content="https://www.example.com/page" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:description" content="Description de la page" />
<meta property="og:image" content="https://www.example.com/image.jpg" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Nom du site" />
```

### OpenSearch

Si le projet comporte un moteur de recherche efficace et pertinent, il peut être doté d’[OpenSearch](https://www.opensearch.org/).
