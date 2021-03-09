# Guidelines : HTML

_Statut : Recommendation (REC)_

Cette présente convention rassemble les bonnes pratiques HTML en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Généralités

Sauf spécificités contraires :

- L’encodage des fichiers et des bases de données doit se faire en `UTF-8` (sans `BOM`).
- Les valeurs identiques aux attributs ne sont pas renseignées sauf nécessité (ex. en HTML5 pas de `checked="checked"`),
- Les indentations se font à l’aide de deux espaces et non à l'aide de tabulations. Pour assurer une cohérence inter-projets, utiliser la convention [EditorConfig](https://editorconfig.org/), voire Prettier.
- Séparer les noms des fichiers, des images des classes et id CSS par des tirets (`.slide-info`, `styles-ie.css`, `jquery-3.0.min.css`, etc).
- L'usage des double quotes est préconisé autour des valeurs d’attributs (ex. `class="fruit"`) ainsi que les simples quotes dans les autres langages JavaScript, PHP (ex. `alert('blup');`) de manière à faciliter les imbrications (ex. `alert('<p class="fruit">plop</p>');`).

## Nommage

- Choisir des noms en anglais prioritairement (classes, fichiers, images, etc.).
- Les noms d'éléments et des attributs sont rédigés en minuscules.
- Les éléments disposants d’id (à limiter autant que possible) doivent disposer d’une classe dupliquée (pour CSS).

La règle de nommage des éléments suit le modèle “fonction” puis “variante”, séparées par des traits d'union :

- navigation : ~~`main-navigation` (non)~~ -> `navigation-main` (oui)
- bouton “burger” : ~~`nav-button` (non)~~ -> `button-nav` (oui)
- pagination : ~~`primary-breadcrumb` (non)~~ -> `breadcrumb-primary` (oui)
- boutons : `btn-primary` (oui) ou `button-primary` (oui)
- modales : `modal-fullscreen` (oui)

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
<link rel="alternate" href="https://en.example.com/" hreflang="en">
```

### Encodage

L’encodage du document (en UTF-8) est systématiquement renseigné via un élément meta dans le `<head>` :

```html
<meta charset="UTF-8" />
```

### Titre de la page

Le titre de page, différent à chaque page, d'une longueur maximum de 55 caractères (SEO), est systématiquement renseigné via un élément `<title>` dans le `<head>` :

```html
<title>J'aime la choucroute</title>
```

### Meta "Viewport"

Pour une adaptation du site web vers les terminaux mobiles, l’élément `<meta name="viewport">` est ajouté dans la partie `<head>`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

**_Note : Les syntaxes empêchant l’agrandissement des contenus par le visiteur seront proscrites (maximum-scale=1, user-scalable=no, etc.)._**

Documentation : [https://www.alsacreations.com/article/lire/1490-comprendre-le-viewport-dans-le-web-mobile.html](https://www.alsacreations.com/article/lire/1490-comprendre-le-viewport-dans-le-web-mobile.html)

### Favicon

L’icône de favori (favicon) est utilisée de différentes manières par les navigateurs et systèmes. Le format ICO est ancien, le format PNG permet une meilleure définition avec un poids plus léger, et le [format SVG](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/) se voit [désormais supporté](https://caniuse.com/link-icon-svg).

* [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
* [https://github.com/audreyr/favicon-cheat-sheet](https://github.com/audreyr/favicon-cheat-sheet)

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

### Niveaux de titres

Chaque page doit comprendre un élément de titre de premier niveau `<h1>` et la structure des autres niveaux doit suivre un ordre logique (h1 à h6).

## Liens d’évitement

Afin de proposer une navigation alternative au clavier pour certaines déficiences visuelles, des liens d’évitements sont systématiquement intégrés dans la structure HTML :

```html
<div class="skip-links">
  <a href="#navigation">Aller au menu</a>
  <a href="#main">Aller au contenu</a>
  <a href="#search">Aller à la recherche</a>
</div>
```

Afin de rendre automatiquement visibles / audibles les liens d’évitement lors de la navigation au clavier via la touche Tab, nous employons par défaut ces règles de styles CSS :

```html
.skip-links { position: absolute; } .skip-links a { position: absolute; left: -9999px; padding: 0.5em; background: #000;
color:#fff; text-decoration: none; } .skip-links a:focus { position: static; }
```

## Accessibilité

Une attention toute particulière sera apportée à l’accessibilité des documents afin que chaque utilisateur, quelle que soit sa défaillance, puisse avoir plein accès aux contenus proposés. Voir aussi [Guidelines Accessibilité](Guidelines-Accessibilite.md) et <https://github.com/DISIC/guide-integrateur>.

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

### Twitter card

Elle permet une présentation améliorée d’un site web sur le réseau Twitter et lien ce site web à un compte Twitter via son URL mentionnée dans un Tweet. Exemple :

![twitter card](images/html01.png)

Exemple d’une carte de type _summary_

Le code correspondant pourrait ressembler à cela :

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="https://alsacreations.com/{content_url}" />
<meta name="twitter:image" content="/default_square_icon.png" />
<meta name="twitter:title" content="{page_title} – Alsacréations" />
<meta
  name="twitter:description"
  content="Alsacréations, blog d'actualité dans le monde des technologies web (HTML5, CSS 3, JavaScript, etc.)"
/>
<meta name="twitter:site" content="@alsacreations" />
<meta name="twitter:creator" content="@diou" />
```

- **Twitter:card** : "summary", “player” ou “photo” sont des valeurs possibles
- **Twitter:url** : l’URL canonique de la référence
- **Twitter:title** : Le titre de la carte (devrait correspondre au titre de la page de l’URL canonique)
- **Twitter:image** : l’URL de l’image illustrant la page
- **Twitter:site** : le compte Twitter associé au site web éditeur (publisher)
- **Twitter:creator** : le compte Twitter associé à l’auteur

Plus d’infos : [https://dev.twitter.com/cards/types/summary](https://dev.twitter.com/cards/types/summary)

Exemple d’une carte de type "photo" (la première) et “player” (la seconde) :

![photo card](images/html02.png)![player card](images/html03.png)

**_Note : l’utilisation de ces meta invalide le document s’il est de doctype HTML5. La valeur twitter:\* n’est en effet pas reconnue pour la balise meta._**

Une fois en place, il faut demander la validation par Twitter : [https://dev.twitter.com/docs/cards/validation/validator](https://dev.twitter.com/docs/cards/validation/validator)

### OpenGraph

L’[OpenGraph](https://ogp.me/) permet de maîtriser davantage l'apparence des contenus partagés via URL sur les réseaux sociaux (Facebook, Twitter, LinkedIn, Pinterest entre autres). Le titre, l'image d'aperçu, la description, etc. peuvent être personnalisés. On peut tester l'implémentation à l'aide de <https://www.opengraph.xyz/>

Parmi les valeurs de og: les plus utilisées on retrouve :

```html
<meta property="og:title" content="Alsacréations, agence Web exotique" />
<meta property="og:url" content="https://alsacreations.fr" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:site_name" content="Alsacréations.fr" />
<meta
  property="og:description"
  content="Alsacréations est une agence Web exotique proposant à ses clients des solutions originales et professionnelles."
/>
<meta property="og:image" content="/default_square_icon.png" />
<meta property="og:type" content="website" />
```

### OpenSearch

Si le projet comporte un moteur de recherche efficace et pertinent, il peut être doté d’[OpenSearch](https://www.opensearch.org/).

## Performance

On veillera à respecter des critères communs de performance :

- Limiter le nombre de ressources différentes exploitées et donc de requêtes HTTP (images, feuilles de styles, scripts, fonts).
- Minifier les ressources texte (CSS, JavaScript, JSON...)
- Différer les requêtes moins importantes (lazy loading) (en JavaScript ou avec l'attribut natif `loading`)
- Utiliser `prefetch` pour donner des indications de pré-chargement
- Établir [https://bitsofco.de/your-first-performance-budget-with-lighthouse/](un budget de performance pour Lighthouse)

Voir aussi : <https://github.com/thedaviddias/Front-End-Performance-Checklist>
