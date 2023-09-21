# Guidelines : HTML

Statut : Recommendation (REC)

Bonnes pratiques HTML appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/), évoluant dans le temps et adaptées à chaque nouveau projet.

## Généralités

Sauf spécificités contraires :

- Le code HTML est valide <https://whatwg.org/validator/>
- L’encodage des fichiers et des bases de données doit se faire en `UTF-8` (sans `BOM`).
- Les noms d'éléments et attributs HTML sont rédigés en minuscules, les attributs utilisent les double quotes (ex. `class="fruit"`). Les valeurs identiques aux attributs ne sont pas renseignées sauf nécessité (ex. en HTML5 pas de `checked="checked"`).
- Les éléments disposants d’id (à limiter autant que possible) doivent disposer d’une classe dupliquée (pour CSS).
- Les indentations se font à l’aide de deux espaces et non à l'aide de tabulations. Pour assurer une cohérence inter-projets, utiliser la convention [EditorConfig](https://editorconfig.org/), voire Prettier.
- Séparer les noms des fichiers, des images des classes et id CSS par des tirets (`.slide-info`, `styles-ie.css`, `jquery-3.0.min.css`, etc).
- Exploiter le [Design System du W3C](https://design-system.w3.org/) pour les différents composants

## Modèle-type

```html
<!DOCTYPE html>
<html lang="fr" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

    <title>Titre unique de la page - Nom du site</title>
    <!-- Pas de ressources bloquantes avant le chargement des styles -->
    <link rel="stylesheet" href="/assets/css/styles.css" />
    <link rel="stylesheet" href="/assets/css/print.css" media="print" />

    <meta name="description" content="Description de la page" />
    <meta property="og:title" content="Titre unique de la page - Nom du site" />
    <meta property="og:description" content="Description de la page" />
    <meta property="og:image" content="https://www.example.com/image.jpg" />
    <meta property="og:image:alt" content="Description de l'image" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Nom du site" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:url" content="https://www.example.com/page" />
    <link rel="canonical" href="https://www.example.com/page" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="alternate icon" href="/favicon.ico" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff8a01" />

    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#abc737" />
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

Tout ce que l'on peut y trouver : <https://github.com/joshbuchea/HEAD>

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
<link rel="alternate" href="https://en.example.com/" hreflang="en" />
```

### Encodage

L’encodage du document (en UTF-8) est systématiquement renseigné via un élément meta dans le `<head>` :

```html
<meta charset="UTF-8" />
```

### Titre de la page

Le titre de page, différent à chaque page, d'une longueur maximum de 55 caractères (SEO), est systématiquement renseigné via un élément `<title>` dans le `<head>` :

```html
<title>Titre unique de la page - Nom du site</title>
```

### Meta "Viewport"

Pour une adaptation du site web vers les terminaux mobiles, l’élément `<meta name="viewport">` est ajouté dans la partie `<head>`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**_Note : Les syntaxes empêchant l’agrandissement des contenus par le visiteur seront proscrites (maximum-scale=1, user-scalable=no, etc.)._**

Documentation : [https://www.alsacreations.com/article/lire/1490-comprendre-le-viewport-dans-le-web-mobile.html](https://www.alsacreations.com/article/lire/1490-comprendre-le-viewport-dans-le-web-mobile.html)

### Favicon

L’icône de favori (favicon) est utilisée de différentes manières par les navigateurs (onglets, favoris), systèmes et moteurs de recherche (affichage dans les résultats). Le format ICO est ancien, le format PNG permet une meilleure définition (carré multiple de 48x48) avec un poids plus léger, et le [format SVG](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/) se voit [progressivement supporté](https://caniuse.com/link-icon-svg).

La syntaxe recommandée pour les navigateurs modernes est celle-ci :

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" href="/favicon.ico" />
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff8a01" />
```

Les navigateurs ne supportant pas le format `svg` vont ignorer la première instruction.

- [Google : favicon à afficher dans les résultats de recherche](https://developers.google.com/search/docs/appearance/favicon-in-search)
- Générateur de favicon SVG (avec dark thème) : [https://realfavicongenerator.net/svg-favicon/](https://realfavicongenerator.net/svg-favicon/)
- [favicon-cheat-sheet](https://github.com/audreyfeldroy/favicon-cheat-sheet)

## Sémantique globale

Les éléments HTML5 `<header>`, `<article>`, `<main>`, `<footer>`, `<aside>`, `<section>` et `<nav>` sont privilégiés aux éléments neutres `<div>` si leur fonction s’y prête.

La structure globale préconisée est celle-ci :

- `<body>` : corps de page et du site web
- `<div id="layout-page">` : sous-conteneur optionnel. Par exemple si body ne suffit pas
- `<div class="layout-inner">` : sous-conteneur optionnel. Par exemple pour centrer plusieurs blocs de la même manière
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

Une attention toute particulière sera apportée à l’accessibilité des documents afin que chaque utilisateur, quelle que soit sa défaillance, puisse avoir plein accès aux contenus proposés. Voir aussi [Guidelines Accessibilité](Guidelines-Accessibilite.md).

## Formulaires

Privilégier au maximum la conception propre et ergonomique de formulaires avec les champs et éléments dédiés :

- Les étiquettes `<label>` reliées à chaque `<input>`, `<textarea>`, etc. grâce aux attributs `for`/`id`.
- L'attribut [autocomplete](https://web.dev/learn/forms/autofill/) pour faciliter la saisie.

## Microdata

Dans la mesure du possible, et selon le type de site, les microformats les plus courants seront ajoutés.

Vocabulaire privilégié : [https://schema.org](https://schema.org) (promu et utilisé par Google, Yahoo, Bing, Yandex) avec toute la [hiérarchie](https://schema.org/docs/full.html) de types prévus.

Documentation : [https://www.alsacreations.com/article/lire/1509-microdata-microformats-schema-semantique.html](https://www.alsacreations.com/article/lire/1509-microdata-microformats-schema-semantique.html)

## Classes et états

- Le lien, l’onglet ou la page active est désigné par la classe `.is-current`
- Tout état est préfixé par "is-". Ex : `.is-paused`, `.is-opened`, `.is-hidden`, `.has-*`
- Tout élément manipulé par JavaScript est préfixé par "js-". Ex : `.js-nav-button`, `.js-menu`, `.js-is-hidden`

## Liens target \_blank

Dans la mesure du possible, éviter les liens ouvrant une nouvelle fenêtre/onglet, sans les signaler explicitement. Ils perturbent la navigation classique du visiteur et peuvent créer des failles de sécurité. Voir aussi [https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c](https://medium.com/@jitbit/target-blank-the-most-underestimated-vulnerability-ever-96e328301f4c).

**_Toujours utiliser `rel="noopener"` sur des liens `target="_blank"`_**

## Meta spécifiques - SEO et réseaux sociaux

Les liens entre site web et les différents réseaux sociaux sont de plus en plus forts. Certaines meta spécifiques permettent de faciliter ou d’améliorer ces liens, sans que l’on connaisse directement leur impact sur le référencement direct.

### OpenGraph

L’[OpenGraph](https://ogp.me/) permet de maîtriser davantage l'apparence des contenus partagés via URL sur les réseaux sociaux (Facebook, Twitter, LinkedIn, Pinterest entre autres). Le titre, l'image d'aperçu, la description, etc. peuvent être personnalisés. On peut tester l'implémentation à l'aide de <https://www.opengraph.xyz/>

Parmi les valeurs de og: les plus utilisées on retrouve :

```html
<meta property="og:title" content="Titre unique de la page - Nom du site" />
<meta property="og:url" content="https://www.example.com/page" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:description" content="Description de la page" />
<meta property="og:image" content="https://www.example.com/image.jpg" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Nom du site" />
```

### Twitter card

Elle complète les métadonnées OpenGraph et permet une présentation améliorée d’un site web sur le réseau Twitter et lien ce site web à un compte Twitter via son URL mentionnée dans un Tweet.

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@alsacreations" />
<meta name="twitter:creator" content="@diou" />
```

- `twitter:card` : valeurs possibles [summary_large_image](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image), [summary](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary), [player](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card), [app](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card)
- `twitter:site` : Compte Twitter associé au site web éditeur (_publisher_)
- `twitter:creator` : Compte Twitter associé à l’auteur

On peut donc omettre les valeurs twitter:url, twitter:image, twitter:title, twitter:description qui sont déjà lues dans les balises OpenGraph. Plus d'informations : [https://dev.twitter.com/cards/types/summary](https://dev.twitter.com/cards/types/summary)

**_Note : l’utilisation de ces meta invalide le document s’il est de doctype HTML5. La valeur twitter:\* n’est en effet pas reconnue pour la balise meta._**

Il existe un validateur de syntaxe Twitter Card Validator <https://cards-dev.twitter.com/validator>

### OpenSearch

Si le projet comporte un moteur de recherche efficace et pertinent, il peut être doté d’[OpenSearch](https://www.opensearch.org/).
