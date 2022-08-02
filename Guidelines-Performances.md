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
