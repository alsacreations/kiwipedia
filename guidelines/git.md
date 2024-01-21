# Guidelines : Git

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant **"Git"**. Ces indications sont destinées à évoluer dans le temps et à s'adapter à chaque nouveau projet.

▶️ On respecte les Conventional Commits <https://www.conventionalcommits.org/fr/v1.0.0/>

- **build**: Changements relatifs au processus de _build_ ou dépendances comme vite ou npm.
- **ci**: Changements des fichiers de configurations de la CI comme workflows GitHub.
- **docs**: Changements relatifs à la documentation du projet (wiki, readme, commentaires).
- **feat**: Changements qui ajoutent un nouvelle fonctionnalité.
  - Dans le cas d'un site, c'est une fonctionnalité pour l'utilisateur final.
  - Dans le cas d'un projet du type "framework css" comme Bretzel, une _feature_ est l'ajout d'une nouvelle classe CSS par exemple.
- **fix**: Changements qui corrigent un bug visible pour l'utilisateur final.
  - Pour savoir si le commit est vraiment un fix ou non, se poser la question: "Mon commit vaut-il le coup d'être affiché dans un changelog ou non ?"
    - Si oui, c'est un `fix:`.
- **perf**: Changements qui améliorent la performance du projet.
- **refactor**: Changements qui ne sont ni un bug ni une _feature_.
  - Exemple: j'arrive à reproduire le même fonctionnement qu'avant mais en supprimant 50 lignes de code.
  - Exemple: je renomme une fonction mais le fonctionnement reste le même.
- **style**: Changements qui ne modifient pas le fonctionnement du code.
  - Exemple: formatage de fichiers avec eslint, prettier, ajout d'espaces, etc.
- **test**: Ajout ou modifications de tests unitaires, d'intégration et e2e.
- **chore**: Quand le reste ne convient pas.
  - Exemple: modification du fichier de configuration eslint, prettier, tâches de maintenance interne, mise à jour des dépendances.
