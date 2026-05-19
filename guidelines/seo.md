# SEO

> Statut : stable · Niveau : intermédiaire

**TL;DR** — Bonnes pratiques de référencement naturel chez Alsacréations : sémantique HTML, métadonnées, architecture, robots.txt, sitemap, données structurées.

Ce document rassemble les bonnes pratiques appliquées par l'agence [Alsacreations.fr](https://www.alsacreations.fr/) concernant **le SEO**. Il évolue dans le temps et s'adapte à chaque nouveau projet.

---

## Niveau 1 (base) 🥉

### Sémantique HTML

* Utiliser la sémantique HTML de structure notamment `<main>`, `<header>`, `<footer>`, `<nav>`, `<aside>`, `<search>`.
* Utiliser les balises de contenu sémantique `<p>`, `<ul>`/`<ol>`, `<blockquote>`, `<figure>`, etc.
* Ajouter un attribut `alt` aux images (sauf celles de décoration).
* Bien respecter les niveaux de titre `<h1>`, `<h2>`... privilégier h1 pour le titre unique de la page (ex : titre de l'article) et non pas pour le titre du site (ou logo) commun à toutes les pages.

### Architecture générale

* Bien renseigner `<title>` (page d'accueil et pages internes).
* Bien renseigner les [balises meta](https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=fr) ; la meta description n'influe pas sur le positionnement, mais apparaît dans les résultats de recherche en tant qu'extrait texte.
* Ne pas empêcher la navigation par lien `<a href="...">`.
* Utilise de [belles URLs](https://developers.google.com/search/docs/crawling-indexing/url-structure?hl=fr) comportant des mots clés (_url rewriting_ ou _slugs_).
* Privilégier un seul domaine pour accéder au contenu.
* Ne pas bloquer l'indexation avec [le fichier robots.txt](https://support.google.com/webmasters/answer/6062598?hl=fr)
* Si CMS envisager un [sitemap](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap?hl=fr) par exemple avec [SEOPress](https://www.seopress.org/fr/support/guides/activer-le-sitemap-xml/)

---

## Niveau 2 (étendu) 🥈

* Utiliser les [métadonnées pour les réseaux sociaux](https://github.com/alsacreations/guidelines/blob/master/Guidelines-HTML.md#meta-sp%C3%A9cifiques---seo-et-r%C3%A9seaux-sociaux)
* CSS : S'assurer que le site est _mobile-friendly_ et l'auditer avec _Search Console_.
* Performance : S'assurer que le site se charge rapidement (_devtools_, [lighthouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=fr&pli=1), _webpagetest_)
* Selon le framework/CMS, privilégier certains liens internes, voire pratiquer l'obfuscation des liens moins importants.

### Microdonnées, données enrichies

* Tutoriel : [Microdata et Schema.org, la sémantique chirurgicale](https://www.alsacreations.com/article/lire/1509-microdata-microformats-schema-semantique.html)
* [Hiérarchie des types sur schema.org](https://schema.org/docs/full.html)
* [Google pour développeurs : Comprendre le fonctionnement des données structurées](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data?hl=fr)
* [MDN : Microdonnées](https://developer.mozilla.org/fr/docs/Web/HTML/Microdata)
* [Outil d'aide au balisage](https://www.google.com/webmasters/markup-helper/)

Google se base sur schema.org mais indique qu'il faut d'abord se fier à [Google Search Central](https://developers.google.com/search)

### Outils de tests

* [Outil de test des résultats enrichis par Google](https://search.google.com/test/rich-results?hl=fr)
* [Validateur schema.org](https://validator.schema.org/)

### Exemple HTML

Imbrication de deux types

```html
<article itemscope itemtype="https://schema.org/Book">
  <h1 itemprop="name">Le Guide du voyageur galactique</h1>
  <p itemprop="author" itemscope itemtype="https://schema.org/Person">
    Auteur :
    <span itemprop="name">Douglas Adams</span>
    <time itemprop="birthDate" datetime="1952-03-11">(né le 11 mars 1952)</time>
  </p>
  <p itemprop="genre">Science-fiction</p>
  <p><a href="https://fr.wikipedia.org/wiki/H2G2" itemprop="url">Fiche Wikipédia</a></p>
</article>
```

### Exemple JSON-LD

```json
{
  "@context": "https://json-ld.org/contexts/person.jsonld",
  "@id": "https://dbpedia.org/page/John_Lennon",
  "name": "John Lennon",
  "born": "1940-10-09",
  "spouse": "https://dbpedia.org/page/Cynthia_Lennon"
}
```

---

## Niveau 3 🥇

### Autres démarches actives

* Établir des backlinks depuis d'autres sites.
* Faire des liens vers d'autres ressources pertinentes.
* Analyse de positionnement, de mots clés, etc.

---

## Outils d'analyse

* [Google Search Console](https://search.google.com/search-console)
* [Bing Webmaster Tools](https://www.bing.com/webmasters/)
* [Check Robots](https://www.checkrobots.com/) Vérificateur d'indexabilité d'une page

## Références

* <https://backlinko.com/google-ranking-factors> Liste des facteurs de référencement
* [Google Search Central](https://developers.google.com/search/docs?hl=fr)
* [Google Search Essentials](https://developers.google.com/search/docs/essentials?hl=fr)
* [Google : Mises à jour du classement dans les résultats de recherche](https://developers.google.com/search/updates/ranking)
* [Google : Dynamic rendering](https://developers.google.com/search/docs/advanced/javascript/dynamic-rendering)
* [IndexNow](https://www.indexnow.org/)

### Robots.txt

* [Google Search : robots.txt](https://developers.google.com/search/blog/2025/02/intro-robots-refresher?hl=fr)
* [Google Search : Granularité au niveau de la page](https://developers.google.com/search/blog/2025/03/robots-refresher-page-level?hl=fr)

---

## Voir aussi

* [HTML](html.md) — Sémantique et métadonnées.
* [Performances](performances.md) — Core Web Vitals et classement.
* [Accessibilité](accessibility.md) — Recouvrement entre a11y et SEO.
