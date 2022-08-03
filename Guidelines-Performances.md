# Guidelines : Performances

Statut : Working Draft (WD)

---

## Bonnes pratiques HTTP

Valable pour HTTP/1.x, plus forcément pour HTTP/2+

- Minifier les ressources texte (css, js, html)
  - Vue/Nuxt : déjà optimisé de base
  - WordPress : utiliser une extension
- Compresser les ressources texte (css, js, html) par exemple avec gzip/deflate
- Réduire le nombre de requêtes

### Cache

- <https://csswizardry.com/2019/03/cache-control-for-civilians/>
- Exploiter le cache serveur
  - WordPress : utiliser une extension

## Core Web Vitals

Les [Core Web Vitals](https://web.dev/vitals/) regroupent des mesures de performance et d'expérience utilisateur. **Google considère que ces indices sont essentiels pour la performance et l'expérience utilisateur** et les intègre dans son algorithme de Ranking depuis 2021.

Les métriques mesurées sont :

- **Largest Contentful Paint (LCP)** : mesure la vitesse de chargement de page. L'indice porte sur le temps de chargement et d'affichage de la plus grande image ou du plus grand bloc de contenu visible dans le viewport. Le critère est "Good" lorsque ce temps est inférieur ou égal à 2.5 secondes.
- **First Input Delay (FID)** : mesure l'interactivité. Calcule le temps nécessaire au navigateur pour offrir une première interaction avec le visiteur (clic sur un lien, un bouton, interagir avec un formulaire) L'expérience est considérée réussie si ce délai est inférieur ou égal à 100 millisecondes.
- **Cumulative Layout Shift (CLS)** : mesure la stabilité visuelle (l'ensemble des repositionnements, redimensionnements, décalages intempestifs des contenus pendant la durée de vie d'une page web). La métrique mesure la quantité de contenu qui se déplace, ainsi que la distance de déplacement. Le CLS doit être égal ou inférieur à 0.1.

Les sections suivantes de ce document indiquent comment améliorer les Web Core Vitals dans le détail&nbsp;:

- Bonnes pratiques générales
- Modes de positionnement CSS
- Aides au pré-chargement de ressources
- Images
- Polices
- Icônes

## Bonnes pratiques générales

On veillera à respecter des critères communs de performance :

- Limiter le nombre de ressources différentes exploitées et donc de requêtes HTTP (images, feuilles de styles, scripts, fonts).
- Minifier les ressources texte (CSS, JavaScript, JSON...)
- Utiliser des formats de fichiers modernes (WEBP, Avif, WOFF2)
- Différer les requêtes moins importantes (lazy loading) (en JavaScript ou avec l'attribut natif `loading`)
- Utiliser `prefetch`, `preload` pour donner des indications de pré-chargement <https://www.keycdn.com/blog/resource-hints>
- Établir [un budget de performance pour Lighthouse](https://bitsofco.de/your-first-performance-budget-with-lighthouse/)

Plus de détails sur ces généralités dans les parties détaillées suivantes.

## Modes de positionnement CSS

TODO:

## Aides au pré-chargement de ressources

Le parseur HTML du navigateur est bloqué par deux types de ressources :

- les éléments `<link>`
- les éléments `<script>` qui ne disposent pas d'attributs `async` ni `defer`

Depuis 2008, un second mécanisme parallèle entre en jeu sur l'ensemble des navigateurs : celui du **"Preload Scanner"**. Ce second parseur agit lorsque le parseur HTML est bloqué sur une ressource et pré-charge les ressources suivantes indiquées dans le markup HTML.

Cela signifie que certains éléments placés hors HTML ne participeront pas à cette recherche anticipée&nbsp;: c'est le cas des polices et des images de fond appelées dans les fichiers CSS, mais également des liens ou ressources situées dans des scripts.

Ce mécanisme est automatique, mais il est possible de l'influencer en proposant le pré-chargement de certaines ressources en priorité en agissant sur les ["Priority Hints"](https://web.dev/priority-hints/) tels que `async`, `defer`, `rel=preload` ou `fetchpriority`

### `async` et `defer`

Ces attributs sont liés au chargement des scripts. Dans les deux cas, ces attributs rendent le chargement asynchrone et ne bloquent pas le paseur HTML&nbsp;:

- `async` est exécuté dès que le navigateur en a la possibilité, les ressources sont potentiellement chargées dans n'importe quel ordre.
- `defer` est exécuté lorsque tout le DOM est parsé, les ressources sont chargées dans l'ordre dans lequel elles sont placées dans le DOM.

`async` et prioritaire sur `defer`.

```html
<script async src="script.js">
<script defer src="script.js">
```

### `rel=preload`

Cette déclaration demande au parseur de découvrir et charger une ressource en priorité avant que le parseur ne les atteigne. Elle est également particulièrement utile pour tous les assets non indiqués dans le markup HTML.

Exemple de pré-chargement de police&nbsp;:

```html
<!-- Dans le <head> après
     la feuille de styles pour ne pas la bloquer -->
<link rel="preload" as="font" href="kiwi.woff2" 
      type="font/woff2" crossorigin="anonymous">
```

*(Note : ici `crossorigin="anonymous"` n'est utile que si la police n'est pas auto-hébergée)*

Exemple de pré-chargement d'image&nbsp;:

```html
<link rel="preload" as="image" href="hero.webp">
```

*Priorité "Mandatory" (obligatoire) : cette fonctionnalité doit être traitée en priorité par le navigateur.*

### `fetchpriority`

L'attribut `fetchpriority` informe ne navigateur sur le degré de priorité du pré-chargement d'une ressource. Il est possible de l'appliquer sur l'élément <link> mais aussi directement sur <img>, <script> et `<iframe>`.

Les valeurs possibles sont "high" (haute priorité), "low" (basse priorité) et "auto" (valeur par défaut).

Quelques exemples :

```html
<!-- Ce script doit être pré-chargé 
     mais d'autres ressources sont prioritaires -->
<link rel="preload" href="script.js" as="script" fetchpriority="low">

<!-- Cette image de fond critique 
     est hautement prioritaire -->
<link rel="preload" as="image" href="hero.webp" fetchpriority="high">

<!-- Cette image doit être pré-chargée
     mais n'est pas vraiment critique -->
<img src="sausage.svg" alt="je ne suis pas importante" fetchpriority="low">
```

*Priorité "Hint" (indice) : cette fonctionnalité est une simple indication pour le navigateur.*

### `preconnect` et `dns-prefetch`

Ces attributs sont liés au chargement des ressources externes (non hébergées localement).

- `rel="preconnect"` informe le navigateur que l'on souhaite établir une connexion le plus rapidement possible à une autre plateforme
- `rel="dns-prefetch"` ne fait que résoudre le nom de domaine sans toutefois atteindre la ressource indiquée.

```html
<link rel="preconnect" href="https://example.com">
<link rel="dns-prefetch" href="https://example.com">
```

Pour en savoir plus sur l'usage de ces attributs : [Optimisation des pré-chargements avec prefetch, dns-prefetch et prerender](https://www.alsacreations.com/astuce/lire/1567-prefetch-prerender-dns-prefetch-link.html)

*Priorité "Hint" (indice) : cette fonctionnalité est une simple indication pour le navigateur.*

### Lazyloading

- [Définition générale du lazy loading par MDN](https://developer.mozilla.org/fr/docs/Web/Performance/Lazy_loading)
- Attribut `fetchpriority` : <https://www.smashingmagazine.com/2022/04/boost-resource-loading-new-priority-hint-fetchpriority/> et <https://web.dev/priority-hints/>
- Attribut `loading="lazy"` pour les images <https://www.alsacreations.com/astuce/lire/1811-chargement-images-differe-loading-lazy.html>
- Ne pas bloquer le preload des script, images <https://web.dev/preload-scanner/>

## Images

- MacOS : <https://github.com/antonreshetov/image-optimizer> très facile par drag&drop et traitement par lot (PNG, JPEG, GIF, SVG)
- Universel en ligne : <https://squoosh.app/> avec aperçu avant/après, redimensionnement, autres options (PNG, JPEG, WEBP)
- SVG : <https://jakearchibald.github.io/svgomg/>
- AVIF : <https://avif.io> en ligne ou <https://github.com/lovell/avif-cli> en ligne de commande
- <https://sharp.pixelplumbing.com>

## Polices

TODO:

## Icônes

Voir le document spécifique des [Guidelines Icônes](Guidelines-Icones.md).

## Outils d'audit

- <https://web.dev/measure/>
- <https://gtmetrix.com/>
- <https://www.webpagetest.org/>
- <https://tools.pingdom.com/>
- Lighthouse dans les devtools, dont l'extension pour Firefox <https://addons.mozilla.org/fr/firefox/addon/google-lighthouse/>

## Autres checklists et ressources

- <https://github.com/thedaviddias/Front-End-Performance-Checklist>
- <https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/>
- <https://browserdiet.com/>
- <https://perf.rocks/>
