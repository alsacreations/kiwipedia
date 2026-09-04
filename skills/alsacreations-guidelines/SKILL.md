---
name: alsacreations-guidelines
description: Guidelines techniques et conventions internes d'Alsacréations (Kiwipedia) — HTML, CSS, JavaScript, TypeScript, Vue.js, WordPress, PHP/MySQL, accessibilité, performance, SEO, RGPD, écoconception, sécurité HTTP, webdesign, workflow Git, cheatsheets. Utiliser ce skill dès qu'une question porte sur une convention de code, une bonne pratique, ou un standard qu'Alsacréations applique sur ses projets — avant d'écrire du code client, de faire une revue, ou de répondre à une question technique "comment on fait chez nous".
---

# Guidelines Alsacréations (Kiwipedia)

Ce plugin **embarque directement** le contenu du dépôt
[alsacreations/kiwipedia](https://github.com/alsacreations/kiwipedia)
(Kiwipedia) : toutes les fiches sont disponibles en local, aucun `WebFetch`
n'est nécessaire. Lire le fichier concerné avec `Read`, chemin relatif à la
racine de ce plugin.

## Fiches disponibles

L'index complet et à jour vit dans [`README.md`](../../README.md) à la
racine du plugin — s'y référer pour la liste exhaustive et sa structure par
étape de cycle de vie projet (démarrer, fondamentaux, stacks, qualité,
design, aide-mémoire). Les chemins des fiches suivent le même schéma que
dans le README : `guidelines/<sujet>.md`, `starters/<sujet>.md`,
`cheatsheets/<sujet>.md`.

## État de la migration « adapté IA »

Chaque fiche est progressivement réécrite pour un usage direct par une IA
(directives condensées, uniquement ce qui distingue les projets
Alsacréations d'un projet standard — les bonnes pratiques génériques déjà
connues d'une IA ne sont pas répétées). Tant qu'une fiche n'apparaît pas
dans la liste ci-dessous, elle est encore au format initial (plus long,
pédagogique, à destination d'un humain) : la lire avec la même rigueur, mais
s'attendre à devoir filtrer davantage de contenu générique.

- ✅ [CSS](../../guidelines/css.md) — architecture, `@scope`, design tokens,
  Bretzel, dark mode, typographie.

## Méthode

1. Identifier le(s) sujet(s) de la question via le README ou la liste
   ci-dessus.
2. Lire directement le fichier avec `Read` (chemin relatif à la racine de
   ce plugin) — pas de `WebFetch`, tout est déjà en local et à jour avec ce
   qui est installé.
3. Si le sujet touche plusieurs documents (ex. « accessibilité + HTML »),
   lire chacun séparément plutôt que de deviner.
4. Ne jamais présenter une convention « de mémoire » sans l'avoir vérifiée
   dans le fichier source — Kiwipedia évolue.
5. Pour les sujets d'outillage (Bretzel, Primary, Fondue, Elastic, Reset,
   KNACSS…), une fiche renvoie généralement vers le site officiel de
   l'outil plutôt que de le redocumenter — s'y référer directement pour
   éviter toute divergence avec la doc source.
