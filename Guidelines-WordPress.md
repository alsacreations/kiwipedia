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

- 👉 On privilégie de démarrer avec un starter thème épuré <https://underscores.me/> ou <https://github.com/timber/starter-theme> lorsque l’on utilise Timber.
- 👉 Supprimer les autres thèmes livrés par défaut.
- Il est plus rapide de développer le thème dans WordPress plutôt que de passer par une phase d’intégration statique.
- On évite d’utiliser un thème acheté car cela sous-entend qu’on ne pourra pas tout mettre en place dans ces guidelines et qu’on ne maîtrise pas son contenu (code, extensions, évolutions). Si toutefois cela arrive, utiliser le principe de thème enfant pour ne pas modifier le thème parent, qui pourrait être mis à jour par la suite.
- Modifier le logo sur le formulaire de connexion admin (voir snippets).

### Intégration du thème

TODO:

### Hiérarchie de fichiers et documentation

TODO:

### À prévoir dans le thème

👉On ne nomme/préfixe pas le thème ou ses classes/fonctions par alsa_ mais plutôt par le nom du projet.

La [structure standard](https://developer.wordpress.org/themes/basics/organizing-theme-files/) est :

```text
assets (dir)
      - css (dir)
      - images (dir)
      - js (dir)
inc (dir)
template-parts (dir)
      - footer (dir)
      - header (dir)
      - navigation (dir)
      - page (dir)
      - post (dir)
404.php
archive.php
comments.php
footer.php
front-page.php
functions.php
header.php
index.php
page.php
README.txt
rtl.css
screenshot.png
search.php
searchform.php
sidebar.php
single.php
style.css
```

[Theme Check](https://wordpress.org/plugins/theme-check/) permet de vérifier si le thème correspond aux standards (ne fonctionne pas avec Timber).

### Traductions

Voir <https://www.alsacreations.com/article/lire/1837-wordpress-theme-internationalisation.html>

### functions.php

TODO:

### Shortcodes

Lors de la création d’un [shortcode](https://codex.wordpress.org/fr:Shortcode) avec paramètres, il est conseillé de ne plus utiliser la fonction extract (voir <https://core.trac.wordpress.org/ticket/22400>). Tout shortcode ajouté doit faire l’objet d’un guide écrit pour l’utilisateur final.

Voir <https://capitainewp.io/formations/developper-theme-wordpress/shortcode/> et <https://kinsta.com/fr/blog/shortcodes-wordpress/>

### Gutenberg / éditeur wysiwyg

- Palette de couleurs <https://speckyboy.com/custom-color-palette-wordpress-gutenberg-editor/>

### Formulaires

- Valider les données avec les méthodes natives <https://codex.wordpress.org/Data_Validation>
- Un formulaire = un nonce <https://codex.wordpress.org/WordPress_Nonces>

## Extensions

TODO:

### Obligatoires

- [wp-fail2ban](https://wordpress.org/plugins/wp-fail2ban/) si hébergement interne : permet de signaler les erreurs d’identification à fail2ban+iptables pour bannir les IP tentant du bruteforce ; n’utilisez alors pas d’extension pour changer l’url de wp-admin.
- [WP Migrate DB](https://fr.wordpress.org/plugins/wp-migrate-db/) pour migrer les données de local > dev > recette > prod (et inversement), à désinstaller par sécurité après mise en production.

### Recommandées selon usage

TODO:

### E-commerce

- [WooCommerce](https://woocommerce.com/) est le plugin le plus actif (communauté, support) à l’heure actuelle. Il propose des feuilles de style par défaut, un système de coupon, gestion des stocks automatisé, gestion des e-mails client avancés, plein de hooks partout.
- [WOOF](https://fr.wordpress.org/plugins/woocommerce-products-filter/) : Filtres plus riche en fonctionnalités que ceux de WooCommerce natif
- [Tickera](https://tickera.com/) Vente de billets, compatible avec WooCommerce.

## Sécurité

TODO:

## Développement

TODO:

## Performance

👉 Mettre en place un plugin de cache (voir extensions)

- Identifier les requêtes lentes <https://css-tricks.com/finding-and-fixing-slow-wordpress-database-queries/>

## Recette

👉 On utilise wp-migrate-db pour exporter les contenus en adaptant les URLs développement vers recette.

👉 Ne pas laisser indexer ce site par Google, en ajoutant une identification HTTP (par exemple avec .htaccess).

- Mise en place d’un webhook Gitlab possible pour auto-pull les derniers commits git.
- Checklist de qualité <https://wpaudit.site>

## Mise en ligne

👉 On utilise wp-migrate-db pour exporter les contenus en adaptant les URLs développement/recette vers production.

- Autoriser l’indexation par les robots à la mise en production (dans la configuration).
- Modifier l’adresse e-mail du compte administrateur.
- Activer le cache.
- Vérifier que toutes les anciennes URLs de développement ont disparu de la base.
- Modifier les constantes `WP_ENVIRONMENT_TYPE` à `production` et `WP_DEBUG` à `false`.

Si l'hébergement est mutualisé et ne permet de pointer dans le dossier /public, activer la réécriture avec un fichier .htaccess à la racine :

```htaccess
RewriteEngine on
RewriteRule ^(.*)$ /public/$1 [L]
```

## Maintenance

On peut utiliser [WP-CLI](http://www.smashingmagazine.com/2015/09/wordpress-management-with-wp-cli/) pour opérations pratiques en ligne de commande.

TODO:

## Environnement sans Docker

TODO:
