# SEO

Statut : Working Draft (WD)

## Niveau 1 (base) 🥉

### Sémantique HTML

* Utiliser la sémantique HTML5, notamment `<main>`, `<header>`, `<footer>`, `<nav>`, `<aside>`,
* Utiliser les balises de contenu `<p>`, `<ul>`/`<ol>` lorsqu'il s'agit de listes, etc.
* Ajouter un attribut `alt` aux images (sauf celles de décoration)
* Bien respecter les niveaux de titre `<h1>`, `<h2>`... privilégier h1 pour le titre unique de la page (ex : titre de l'article) et non pas pour le titre du site (ou logo) commun à toutes les pages

### Architecture générale

* Bien renseigner `<title>` (page d'accueil et pages internes)
* La meta description n'influe pas sur le positionnement, mais apparaît dans les résultats de recherche en tant qu'extrait texte
* Ne pas empêcher la navigation par lien `<a href="...">`
* Utilise de belles URLs comportant des mots clés (_url rewriting_ ou _slugs_)
* Privilégier un seul domaine pour accéder au contenu
* Ne pas bloquer l'indexation avec robots.txt
* Si CMS : Utiliser un [sitemap](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap?hl=fr) par exemple avec [SEOPress](https://www.seopress.org/fr/support/guides/activer-le-sitemap-xml/)

---

## Niveau 2 (étendu) 🥈

* Utiliser les [métadonnées pour les réseaux sociaux](https://github.com/alsacreations/guidelines/blob/master/Guidelines-HTML.md#meta-sp%C3%A9cifiques---seo-et-r%C3%A9seaux-sociaux)
* CSS : S'assurer que le site est _mobile-friendly_ et l'auditer avec Search Console + suivre les retours
* Performance : S'assurer que le site se charge rapidement (_devtools_ + _webpagetest_)
* Selon le framework/CMS : Privilégier certains liens internes, voire pratiquer l'obfuscation des liens moins importants

### Microdonnées, données enrichies

* Tutoriel : [Microdata et Schema.org, la sémantique chirurgicale](https://www.alsacreations.com/article/lire/1509-microdata-microformats-schema-semantique.html)
* [Hiérarchie des types sur schema.org](https://schema.org/docs/full.html)
* [Google pour développeurs : Comprendre le fonctionnement des données structurées](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data?hl=fr)
* [Outil de test des résultats enrichis](https://search.google.com/test/rich-results?hl=fr)
* [Validateur schema.org](https://validator.schema.org/)

Google se base sur schema.org mais indique qu'il faut d'abord se fier à [Google Search Central](https://developers.google.com/search)

### Exemple HTML

Imbrication de deux types

```html
<article itemscope itemtype="http://schema.org/Book">
  <h1 itemprop="name">Le Guide du voyageur galactique</h1>
  <p itemprop="author" itemscope itemtype="http://schema.org/Person">
    Auteur :
    <span itemprop="name">Douglas Adams</span>
    <time itemprop="birthDate" datetime="1952-03-11">(né le 11 mars 1952)</time>
  </p>
  <p itemprop="genre">Science-fiction</p>
  <p><a href="http://fr.wikipedia.org/wiki/H2G2" itemprop="url">Fiche Wikipédia</a></p>
</article>
```

### Exemple JSON-LD

```json
{
  "@context": "http://json-ld.org/contexts/person.jsonld",
  "@id": "http://dbpedia.org/resource/John_Lennon",
  "name": "John Lennon",
  "born": "1940-10-09",
  "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"
}
```

---

## Niveau 3 🥇

### Autres démarches actives

* Établir des backlinks depuis d'autres sites
* Faire des liens vers d'autres ressources pertinentes
* Analyse de positionnement, de mots clés, etc.

---

## Outils d'analyse

* [Google Search Console](https://search.google.com/search-console)
* [Bing Webmaster Tools](https://www.bing.com/webmasters/)

## Références

* [Google Search Essentials](https://developers.google.com/search/docs/essentials?hl=fr)
* [Google : Mises à jour du classement dans les résultats de recherche](https://developers.google.com/search/updates/ranking)
* [Google : Dynamic rendering](https://developers.google.com/search/docs/advanced/javascript/dynamic-rendering)
* [IndexNow](https://www.indexnow.org/)
