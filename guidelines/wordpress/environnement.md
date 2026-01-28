# WordPress : environnement

## Structure de projet

On utilise [Docker](https://www.docker.com/) avec une structure-type déjà éprouvée construite avec :

- [Composer](https://getcomposer.org/) pour installer WordPress et ses extensions.
- [WordPlate](https://github.com/wordplate/wordplate) qui fonctionne avec [Vite](https://github.com/vitejs/vite).
- [Tailwind](https://tailwindcss.com/) en tant que framework CSS (optionnel).
- [ACF](https://www.advancedcustomfields.com/) pour gérer les champs personnalisés, les CPT, les options.

## Environnement de développement

- Utiliser `define('WP_ENVIRONMENT_TYPE','staging');` puis [wp_get_environment_type()](https://make.wordpress.org/core/2020/07/24/new-wp_get_environment_type-function-in-wordpress-5-5/)
- Utiliser `define('WP_DEBUG',true);` pour activer le mode debug
- Utiliser `define( 'WP_DEBUG_DISPLAY', true );` pour afficher les erreurs

## Git

On versionne les fichiers de structure et de configuration, tels que :

- le thème développé pour le projet
- les extensions développées pour le projet
- les fichiers de configuration (vite, eslint, prettier)
- le fichier modèle d'environnement `.env.example`
- les fichiers listant les dépendances `composer.lock` et `package.json`
- les fichiers de traduction du thème (dossier /languages) ou de l'extension (dossier de l'extension)

On ne versionne **pas** (voir fichiers .gitignore) :

- `.env`
- le dossier `public/wordpress` et `vendor` (car installé/mis à jour par composer)
- les extensions tierces (car installées/mises à jour par composer)
- les dossiers `public/uploads` (stockés à part car binaires occupant beaucoup de place), `public/upgrade`
- les thèmes installés "par défaut" (_Twenty*_) qui doivent de toute façon être supprimés

👉 Le fichier `README.md` à la racine du projet doit contenir toutes les informations pour prendre en main le développement et ré-installer le site rapidement en production.
