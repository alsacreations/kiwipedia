# Icônes

> Statut : stable · Niveau : intermédiaire

Conventions **spécifiques à Alsacréations** pour les icônes SVG. Les techniques d'intégration génériques (`<img>` vs SVG inline vs sprite `<use>`, styling via `currentColor`) ne sont **pas** détaillées ici&#8239;: elles sont déjà maîtrisées par défaut, et `currentColor` en dark mode est couvert dans [CSS](css.md). Ce document ne liste que l'outil et les étapes de nettoyage imposés au-delà de l'optimiseur automatique.

---

## Outil imposé&#8239;: SVGOMG

> ✅ **Par défaut** — [SVGOMG](https://jakearchibald.github.io/svgomg/) sur toute icône avant intégration, jamais le SVG brut exporté par l'outil de design.

- Partir des options par défaut ; tester les paramètres additionnels au cas par cas.
- Jouer sur le curseur **Precision** pour arrondir les valeurs numériques&#8239;: un niveau de 1 ou 2 est généralement atteignable — zoomer pour vérifier qu'aucun détail visuel n'est perdu avant de valider.

## Nettoyage manuel complémentaire

SVGOMG ne détecte pas tout&#8239;: compléter systématiquement dans un éditeur de code source.

- Repérer et supprimer les bitmaps embarqués (fréquent sur les ombrages/logos exportés) — remplacer par du vectoriel, jamais les laisser tels quels.
- Simplifier les doublons/imbrications de `<g>` que SVGOMG n'a pas su remarquer.

> 💡 Pour éditer directement le code source d'un SVG dans VS Code plutôt que son aperçu&#8239;: voir [Visual Studio Code](vscode.md).

Le nettoyage en amont côté maquette (formes inutiles, recadrage) relève de la livraison design&#8239;: voir [Webdesign](webdesign.md).

---

## Voir aussi

- [CSS](css.md) — Stylisation des SVG via `currentColor`, gestion du dark mode.
- [Accessibilité](accessibility.md) — Patterns SVG inline/externe, décoratif/informatif.
- [Webdesign](webdesign.md) — Format de livraison des icônes.
- [Performances](performances.md) — Réduire le poids des assets.
- [Visual Studio Code](vscode.md) — Ouvrir les SVG en code plutôt qu'en aperçu.
