# Conventions de nommage

> Statut : stable · Niveau : tous

Conventions **spécifiques à Alsacréations** pour le nommage. Les principes génériques (noms descriptifs, éviter les abréviations obscures, cohérence au sein d'un même fichier) ne sont **pas** repris ici&#8239;: seules les règles propres à l'agence — parfois à contre-courant d'un choix par défaut — sont documentées.

---

## Langue&#8239;: français pour la prose, anglais pour le code

| Contenu | Langue |
| --- | --- |
| Commentaires de code, titres de commit, README | Français |
| Dossiers/architecture (`assets`, `components`, `fonts`) | Anglais |
| Noms de fichiers (`single-something.html`, `ProductCard.vue`) | Anglais |
| Branches Git principales (`main`, `develop`) | Anglais (exception FR si besoin&#8239;: `recette`) |
| Composants, classes HTML/CSS | Anglais |

> ⚠️ Ne pas étendre la préférence « répondre en français » au code lui-même — seule la prose (commentaires, commits, docs) est en français ; tous les identifiants restent en anglais.

## Casse selon le contexte

| Convention | Contexte | Exemple |
| --- | --- | --- |
| `under_score` | Fonctions PHP | `function display_breadcrumb()` |
| `kebab-case` | Fichiers exposés en URL, classes HTML/CSS | `single-something.html`, `.slide-info` |
| `PascalCase` | Composants Vue/Nuxt, classes PHP | `ModalAccountMixins.js` |
| `camelCase` | Variables/fonctions JavaScript, méthodes PHP | `dateFormat`, `getResellSwitchQty()` |
| `ALL_CAPS` | Constantes | `MAX_RETRY_COUNT` |
| `snake_case` | — | ❌ jamais utilisé |

> ⚠️ **Contre-intuitif** — Les fonctions PHP sont en `under_score` (`display_breadcrumb`), pas en camelCase malgré l'usage JS adjacent dans le même projet ; ne pas harmoniser les deux langages sur la même casse.

Indentation&#8239;: 2 espaces par défaut, sauf **PHP** (4 espaces, [PSR-12](https://www.php-fig.org/psr/psr-12/)) et **WordPress** (docblocks [PSR-5](https://www.php-fig.org/psr/)) — ces conventions de langage priment sur la règle générale.

## Documentation de fonctions

JSDoc/PHPDoc pour les fonctions non triviales&#8239;: tags en anglais (`@param`, `@returns`), texte descriptif en français — cohérent avec la règle de langue ci-dessus.

```js
/**
 * Représente un livre.
 * @constructor
 * @param {string} title - Titre du livre.
 * @param {string} author - Auteur du livre.
 */
function Book(title, author) {}
```

## Choix de verbe&#8239;: un seul par intention

Ne jamais faire coexister plusieurs synonymes pour la même action (ex. `cancel`/`remove`/`delete` sur un même composant). Verbe imposé selon l'intention&#8239;:

| Intention | Verbe |
| --- | --- |
| Ajouter à une liste | `add` / `append` |
| Suppression complète (correspond à `DELETE` REST) | `delete` |
| Retirer un élément d'une liste | `remove` |
| Annuler une action | `cancel` |
| Ouvrir/fermer | `open` / `close` (ou `toggle`) |
| Récupérer des données (correspond à `GET`) | `get` |
| Remplacer entièrement des données | `set` |
| Mettre à jour partiellement | `update` |
| Réinitialiser à l'état initial | `reset` |
| Callback/gestionnaire | `handle` (`handleClick`) |
| Dénombrement | `count` (`pageCount`) |
| État booléen | `is` / `has` (`isOpened`, `hasItems`) |
| Précédent/suivant | `prev` / `next` |

## Code en attente&#8239;: `TODO:` vs `FIXME:`

Distinction stricte&#8239;: `TODO:` = partie non implémentée (`TODO: implémenter les données`) ; `FIXME:` = partie fonctionnelle à améliorer (`FIXME: refactoring`). Jamais `@TODO`.

> 🚨 **Règle de livraison** — Un projet ne doit **jamais** être livré avec un tag `TODO:` restant dans le code.

## Domaines et données factices

- URLs d'exemple&#8239;: toujours `example.com`/`example.org` (réservés à cet usage), jamais un domaine inventé.
- Motif d'environnements cohérent entre local/préprod/prod, ex.&#8239;: `projet.test` (local) → `projet.alsacreations.eu` (préprod) → `projet.com` (prod).
- ⚠️ Ne pas cumuler sous-domaine ET changement de TLD (éviter `preprod.projet.alsacreations.eu` si le TLD change déjà) — un seul élément doit changer pour passer d'un environnement à l'autre.

---

## Voir aussi

- [HTML](html.md) — Nommage IDs/classes, conventions de composants.
- [CSS](css.md) — Design tokens, `@scope`.
- [JavaScript](javascript.md) — Conventions spécifiques JS/TS.
- [WordPress](wordpress/README.md) — Conventions spécifiques PHP/WordPress.
- [Visual Studio Code](vscode.md) — Configuration de l'éditeur.
- [Workflow Git](git.md) — Conventions de commits et de branches.
- [Guide de style éditorial](../STYLE.md) — Conventions d'écriture des fiches Kiwipedia.
