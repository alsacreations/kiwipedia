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
