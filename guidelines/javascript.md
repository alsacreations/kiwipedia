# JavaScript

> Statut : stable · Niveau : intermédiaire

Conventions **spécifiques à Alsacréations** pour JavaScript, sur les projets d'amélioration progressive (scripts d'agrément, jQuery encore en usage) — pour les projets Vue/Nuxt voir [Vue.js et Nuxt](vue.md). Les bonnes pratiques génériques (`let`/`const` et portée, `lowerCamelCase`, point-virgules, ESLint, pas de `console.log`/`eval` en production, ARIA/clavier sur les composants dynamiques — voir [Accessibilité](accessibility.md) —, éviter les fuites dans le scope global…) ne sont **pas** reprises ici&#8239;: elles sont déjà appliquées par défaut. Ce document ne liste que ce qui distingue nos projets d'un projet JS standard — à appliquer sans qu'il soit nécessaire de le redemander.

---

## Amélioration progressive

Sur les petits scripts d'agrément (effet purement visuel, non essentiel au contenu), dégradation gracieuse obligatoire&#8239;: le contenu doit rester accessible si JavaScript est désactivé ou échoue. Charger ces scripts en fin de `<body>` ou via `defer`/`async` selon le besoin — voir [l'article de référence](https://www.alsacreations.com/astuce/lire/1562-script-attribut-async-defer.html).

Référence à une librairie/framework externe (jQuery, etc.)&#8239;: toujours faire apparaître le numéro de version et le suffixe `-min` si le fichier est minifié.

## S'appuyer sur le HTML statique plutôt que dupliquer l'état en JS

Exploiter au maximum les attributs `data-*`, les classes et l'ordre des éléments déjà présents dans le HTML pour piloter un script, plutôt que de reconstruire cet état ailleurs en JS. Convention `.js-*` pour les hooks JS distincts des classes de style&#8239;: voir [HTML](html.md).

Vocabulaire d'état, en complément du préfixe générique `is-` ([HTML](html.md))&#8239;:

| Classe | Sémantique |
| --- | --- |
| `.is-active` | Élément visible en permanence, état actif au focus/survol (item de menu…) |
| `.is-selected` | Élément visible en permanence, état sélectionné/désélectionné (radio, checkbox…) |
| `.is-opened` / `.is-closed` | Élément avec deux états affiché/masqué (accordéon, menu déroulant…) |

## Chaînes de texte et traduction

Simple quotes par défaut, backquotes pour le multiligne. Éviter de stocker des textes traduisibles dans les fichiers JS&#8239;: passer par le HTML (texte visible, ou caché/`data-*` si nécessaire).

## Commentaires

`//` pour les commentaires courts ; `/* */` pour désactiver un bloc qui en contient sans être gêné par eux ; `/** */` en tête de fichier ou de fonction. Un commentaire à préserver malgré la minification&#8239;: syntaxe `/*! */`.

## jQuery&#8239;: conventions pour les scripts d'amélioration progressive

- Isoler le code dans une IIFE en mode strict, wrapper no-conflict si jQuery est chargé globalement&#8239;:

```js
(function ($) {
  'use strict'
  // Le code avec $...
})(jQuery)
```

- Préfixer par `$` toute variable représentant un objet jQuery&#8239;: `const $el = $('#el')`.
- `.on()` systématique pour les gestionnaires d'événement, jamais les alias (`.click()`…) — plus simple à retrouver dans le code.
- Prévoir la ré-application du script sur une même page (idempotence)&#8239;: `.off()`/`.on()`, flag `data-*` pour savoir si déjà appliqué.
- Manipuler des classes CSS plutôt que `.hide()`/`.show()` (`$el.addClass('visually-hidden')`) — la logique de visibilité reste pilotée par le CSS, pas par du style inline.
- Principe des *optimistic updates*&#8239;: une action visiteur prend effet immédiatement dans l'UI, corrigée seulement si le retour serveur diffère du résultat attendu.

## Plugin boilerplate maison

Encapsuler les développements jQuery réutilisables dans un plugin&#8239;: options par défaut remplaçables via l'objet d'options ou les attributs `data-*`, méthodes privées/publiques séparées. Boilerplate de référence&#8239;: [alsacreations/pepin](https://github.com/alsacreations/pepin). Avant d'utiliser un plugin tiers, vérifier qu'il supporte plusieurs instances sur une même page.

---

## Voir aussi

- [TypeScript](typescript.md) — Typage et configuration.
- [Vue.js et Nuxt](vue.md) — Architecture et composants.
- [Accessibilité](accessibility.md) — Patterns ARIA et clavier des composants dynamiques.
- [HTML](html.md) — Convention `js-`/`is-`, hooks JS vs classes de style.
- [Conventions de nommage](naming-conventions.md) — Casse et nommage des identifiants.
