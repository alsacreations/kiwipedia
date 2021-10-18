# Guidelines : WordPress

_Statut : Working Draft (WD)_

Cette présente convention rassemble les bonnes pratiques WordPress en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Structure de projet

On utilise
- [Composer](https://getcomposer.org/) pour installer WordPress et ses extensions.
- [WordPlate](https://github.com/wordplate/wordplate) qui fonctionne avec [webpackmix](https://github.com/devanandb/webpack-mix/tree/master/docs).
- [Tailwind](https://github.com/timber/timber) en tant que framework CSS.
- [Timber](https://github.com/timber/timber) pour utiliser Twig dans les templates (facultatif).

## Environnement de développement

👉 On utilise [Docker](https://www.docker.com/)

- Par défaut, on part d’une base MySQL locale. Il est possible d’utiliser une base MySQL “partagée” accessible à distance, attention cependant à la synchronisation d’informations et de fichiers (options, réglages de plugins activés…).
- Utiliser `define('WP_ENVIRONMENT_TYPE','staging');` puis [wp_get_environment_type()](https://make.wordpress.org/core/2020/07/24/new-wp_get_environment_type-function-in-wordpress-5-5/)
- Utiliser `define('WP_DEBUG',true);` pour activer le mode debug

## Git

On versionne les fichiers :
- .env.example
- composer.lock
- package.json
- le thème développé pour le projet
- les extensions développées pour le projet
- les fichiers de configuration
- les fichiers de traduction du thème (dossier /languages) ou de l’extension (dossier de l’extension)

On ne versionne **pas** :
- .env (sauf exception)
- WordPress lui-même (car installé/mis à jour par composer)
- les extensions tierces (car installé/mis à jour par composer)
- les uploads

👉 Le fichier README.md à la racine du projet doit contenir toutes les informations pour ré-installer le site rapidement en production.

## Configuration de base

### Sécurité, utilisateurs

- 👉 Supprimer l’utilisateur admin et l’utilisateur avec l’ID 1. Créer un utilisateur de niveau administrateur avec identifiant spécifique différent de “admin”.
- Créer un ou plusieurs utilisateurs de niveau éditeur pour les intervenants (doit être différent du nom de domaine pour des raisons de sécurité), ayant accès juste aux fonctionnalités utiles.
- Ajouter le script pour enlever le warning à la connexion qui permet d’indiquer que l’identifiant est le bon mais pas le mot de passe.

## Thème

- 👉 On privilégie de démarrer avec un starter thème épuré https://underscores.me/ ou https://github.com/timber/starter-theme lorsque l’on utilise Timber.
- 👉 Supprimer les autres thèmes livrés par défaut.
- Il est plus rapide de développer le thème dans WordPress plutôt que de passer par une phase d’intégration statique.
- On évite d’utiliser un thème acheté car cela sous-entend qu’on ne pourra pas tout mettre en place dans ces guidelines et qu’on ne maîtrise pas son contenu (code, extensions, évolutions). Si toutefois cela arrive, utiliser le principe de thème enfant pour ne pas modifier le thème parent, qui pourrait être mis à jour par la suite.
- Modifier le logo sur le formulaire de connexion admin (voir snippets).

### Intégration du thème

TODO:

### Hiérarchie de fichiers et documentation

TODO:

### À prévoir dans le thème

TODO:

### Traductions

TODO:

### functions.php

TODO:

### Shortcodes

TODO:

### Gutenberg / éditeur wysiwyg

TODO:

### Formulaires

TODO:

## Extensions

TODO:

### Obligatoires

TODO:

### Recommandées selon usage

TODO:

### E-commerce

TODO:

## Sécurité

TODO:

## Développement

TODO:

## Performance

TODO:

## Recette

TODO:

## Mise en ligne

TODO:

## Maintenance

TODO:

## Environnement sans Docker

TODO:

