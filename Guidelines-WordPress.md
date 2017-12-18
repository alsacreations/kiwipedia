# Guidelines : WordPress

## Installation

## Migration

* https://codex.wordpress.org/Changing_The_Site_URL
* Utiliser WP Migrate DB pour remplacer les URLs de la base de données, y compris dans les données sérialisées.

## Développement et versionnement

### .gitignore

Utiliser/adapter https://salferrarello.com/wordpress-gitignore/

## Thèmes

## Plugins

## Maintenance et mises à jour

## Snippets

### Forcer la mise à jour par téléchargement direct

Dans `wp-config.php` ajouter
```
define('FS_METHOD' 'direct');
```
