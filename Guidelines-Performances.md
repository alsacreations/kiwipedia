# Guidelines : Performances

Statut : Working Draft (WD)

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

## Chargement et Lazy loading

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

## Fonts

TODO:

## Core Web Vitals

TODO:
