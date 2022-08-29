# Guidelines : Icônes

Statut : Working Draft (WD)

Voir aussi

- <https://css-tricks.com/tools-for-optimizing-svg/>
- <https://uxdesign.cc/8-tricks-for-svg-optimization-c2c519c10c1e>

## Optimisation

On cherchera à réduire le poids des ressources icônes (SVG) par

- plusieurs techniques d'intégration dans le document
- une réduction de la syntaxe SVG

### Intégration

Selon la façon dont l'icône est intégrée au document, la performance de chargement peut être affectée.

- En image `<img src="/icones/kiwi.svg">` (mise en cache possible, code inline réduit, requête HTTP supplémentaire au premier chargement, pas de style possible par CSS depuis le document)
- Code inline `<svg>...</svg>` (pas de mise en cache, code inline, une seule requête HTTP, style possible via CSS du document et `currentColor` car fait partie de l'arborescence DOM)
- Composants/sprites/[use](https://developer.mozilla.org/fr/docs/Web/SVG/Element/use) et divers

### Optimisations de la source SVG

Diverses techniques complémentaires.

- Utiliser [svgomg](https://jakearchibald.github.io/svgomg/)
  - Utiliser les options par défaut, éventuellement tester en cochant les paramètres supplémentaires.
  - Jouer sur la _Precision_ pour arrondir les valeurs numériques (un niveau de 1 ou 2 est atteignable, attention à zoomer pour vérifier les détails).
- Ouvrir dans un éditeur de code source
  - Supprimer les bitmaps éventuels dans le code (parfois le cas d'ombrages ou logos), remplacer par du vectoriel.
  - Simplifier encore ce que svgomg n'a pas pu remarquer notamment doublons/imbrications de `<g>`.
- Ouvrir dans un éditeur graphique tel que Figma
  - Supprimer les formes inutiles, recadrer, etc.
