# Conventions Générales de Nommage

Statut : Working Draft (WD)

Ces présentes conventions ont pour objectif d'harmoniser les noms des fichiers, des fonctions ou classes utilisées au sein des projets web de l'agence [Alsacréations](https://www.alsacreations.fr/).

## Langue

La langue employée pour tout texte rédigé au cours d’un projet est le français :

- les commentaires dans un fichier de code,
- les titres de commit (_versionning_),
- les instructions dans le fichier `readme.md`,
- toute documentation explicative ou technique.

La langue anglaise demeure préconisée pour :

- L’architecture et les dossiers du projet (_assets_, _layout_, _components_, _fonts_)
- Le nom des fichiers (`single-something.html`, `ProductCard.vue`)
- Les branches principales de versionning (`main`, `develop`), avec possibilités en français si besoin (`recette`)

## Formatage

La règle d’indentation appliquée par défaut est de **2 espaces** pour l’ensemble des langages. Les conventions spécifiques à certains langages ou technologies (PHP, WordPress) sont prioritaires sur cette règle générale au cas par cas.

Par exemple :

- PHP suit la convention de styles [PSR-12 "Extended Coding Style"](https://www.php-fig.org/psr/psr-12/) qui stipule _“Code MUST use an indent of 4 spaces for each indent level, and MUST NOT use tabs for indenting.”_
- WordPress suit la convention [PSR-5 "PHPDoc Standard"](https://www.php-fig.org/psr/)
- Les Documentations techniques se réfèrent à PHPdoc, JSdoc, etc.

On débute par `/**` dans VSCode qui auto-complète en optant pour un formatage conventionnel.

JSDoc est [supporté nativement par VSCode](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support), mais peut être facilité par une [extension JSDoc](https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments).

Exemple :

```js
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {}
```

Toujours configurer et appliquer les Linters et Formatters **editorconfig**, **ESlint** et **Stylelint** (voir détails dans les [Guidelines VSCode](Guidelines-VScode.md))

## Union de mots

Les conventions d’usage pour lier les mots sont :

- under_score :
  - Fonctions PHP
- kebab-case :
  - fichiers pouvant se retrouver dans les URLs (ex : `single-something.html`)
  - classes HTML/CSS
- PascalCase :
  - noms de composants dans Vue/Nuxt (ex : `ModalAccountMixins.js`)
  - classes PHP
- camelCase :
  - variables et fonctions dans JavaScript (ex : `dateFormat`, `getResellSwitchQty()`)
  - méthodes PHP
- ALL_CAPS (SCREAMING_SNAKE_CASE) :
  - constantes
- snake_case :
  - nope

## Synonymes

Si on privilégie l'anglais pour le code et malgré son apparente simplicité, il existe toujours des synonymes.

Exemple à ne **pas** reproduire (coexistence de _cancel_/_remove_/_delete_) :

```html
<button class="cancelProduct" onclick="removeProduct(1337)">
  <svg id="remove" ...>
</button>
function removeProduct(id) {
   axios.delete('/api/product', id)
}
```

Suggestions et raisons :

- Ajouter à une liste : `add` ou `append`
- Suppression complète de données : `delete` (car les méthodes REST utilisent DELETE)
- Retirer un élément d'une liste : `remove`
- Annulation d'action : `cancel`
- Ouverture/fermeture : `open`/`close` (alternativement : `toggle`)
- Récupération de données : `get` (existe en tant que méthode HTTP)
- Remplacement de données : `set` (écrase tout)
- Mise à jour de données : `update` (similaire à patch, peut remplacer certaines clés d'un objet mais pas toutes)
- Réinitialisation à l'état initial : `reset`
- Callback/gestionnaire : `handle` (ex : _handleClick_)
- Dénombrement : `count` (ex: _pageCount_)
- États : `is` ou `has` (ex : _isOpened_, _hasItems_)
- Précédent/suivant : `prev`/`next`

Voir aussi [Coding like Shakespeare: Practical Function Naming Conventions](https://dmitripavlutin.com/coding-like-shakespeare-practical-function-naming-conventions/) et [Naming cheatsheet](https://github.com/kettanaito/naming-cheatsheet)

## Nommage pour code en attente

En phase de développement d'un projet, les notes de modifications et améliorations restant à réaliser dans le code (CSS, HTML, JavaScript) doivent être consignées et notées `TODO:` (et non ~~@TODO~~) ou `FIXME:` selon leur fonction&nbsp;:

- `TODO:` Partie de code **non finalisée**, non mis en oeuvre (par exemple `TODO: implémenter les données`, `<a href="TODO:">`)
- `FIXME:` Partie de code **à améliorer**, à modifier pour être plus performant, plus maintenable, etc. (par exemple : `FIXME: mieux gérer le responsive`, `FIXME: refactoring`)

L'extension VSCode **[TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)** permet de mettre en exergue les tags `TODO:` (en jaune par défaut) et `FIXME:` (en rose par défaut).

TODO Highlight propose également de lister l'ensemble des tags par fichier via `ctrl/cmd + maj + p` > `List highlighted annotations` (liste les tags dans le document en cours).

Si nécessaire, il est possible d'indiquer quels types de fichiers sont à surveiller par TODO Highlight au sein de `settings.json` (par exemple, les fichiers `.vue` et `.md` ne sont pas surveillés par défaut).

```json
"todohighlight.include": [
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
    "**/*.html",
    "**/*.vue",
    "**/*.php",
    "**/*.md",
    "**/*.css",
    "**/*.scss"
  ]
```

**En fin de phase de développement, avant la livraison du projet, il est fondamental de vérifier la présence indésirable de ces tags au sein du code. L'idéal étant qu'un projet soit livré sans aucun tag `TODO:`.**

### Remplissage et données d'exemple

Pour les URLs vers des domaines fictifs, on privilégie `https://example.org/` ou `https://example.com/` qui sont réservés à cet usage.

## Convention pour Langages spécifiques et Frameworks

Les règles de nommage particulières à chaque langage sont consignées dans leurs Guidelines respectives :

- [Guidelines HTML](Guidelines-HTML.md)
- [Guidelines CSS](Guidelines-CSS.md)
- [Guidelines Développement PHP](Guidelines-Developpement-PHP.md)
- [Guidelines JavaScript](Guidelines-JavaScript.md)
- [Guidelines WordPress](Guidelines-WordPress.md)
