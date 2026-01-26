# Guidelines : WordPress

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant **"WordPress"**. Ces indications sont destinées à évoluer dans le temps et à s'adapter à chaque nouveau projet.

- 📕 [Environnement de développement](environnement.md)
- 📕 [Thème](themes.md)
- 📕 [Extensions](extensions.md)

## Accessibilité

- [Vidéos de WordPress Accessibility Day](https://www.youtube.com/channel/UCes9XCUZd51CAigbBEGlfNg)
- [Articles d'Access42 autour de WordPress](https://access42.net/wordpress)
- [WordPress.org : Accessibilité](https://fr.wordpress.org/about/accessibility/)

## Sécurité

- 👉 Supprimer l'utilisateur **admin** et l'utilisateur avec l'ID 1. Créer un utilisateur de niveau administrateur avec identifiant spécifique différent de “admin”.
- Créer un ou plusieurs utilisateurs de niveau **éditeur** pour les intervenants (doit être différent du nom de domaine pour des raisons de sécurité), ayant accès juste aux fonctionnalités utiles : ne pas utiliser de compte admin par défaut pour toutes les personnes car cela permet l'installation d'extensions.
- Compléter le fichier `wp-config.php` avec les valeurs de <https://vinkla.github.io/salts/>
- Désactiver l'édition du thème et des plugins en ligne dans wp-config.php `define('DISALLOW_FILE_EDIT', true);`
- [User Name Security](https://wordpress.org/plugins/user-name-security/) supprime les mentions de l'utilisateur (id et username) dans `body_class()`, entre autres choses.
- [SF Author URL control](https://wordpress.org/plugins/sf-author-url-control/) personnalise le “author” et le slug utilisateur pour sécuriser et personnaliser les URL des pages auteur.
- Toujours utiliser [les nonces](https://css-tricks.com/wordpress-front-end-security-csrf-and-nonces/) pour éviter les [CSRF](https://fr.wikipedia.org/wiki/Cross-site_request_forgery), s'il faut développer des modules admin et/ou pour les utilisateurs identifiés sur le site.
- Surveiller si le thème / les extensions utilisées font l'objet d'une faille sur [wpscan](https://wpscan.com/)
- Ajouter le script pour enlever l'avertissement à la connexion qui permet d'indiquer que l'identifiant est le bon mais pas le mot de passe.
- Dans tous les fichiers autres que `functions.php` et tous les fichiers de la template hierarchy (`index.php`, `page.php`, `single.php`, ...), on protège nos fichiers PHP contre l'accès direct

  ```php
  <?php
  if (!defined('ABSPATH')) {
      exit;
  }
    
  // Votre code ici...
  ```

🔖 [Prévenir les injections SQL](https://www.smashingmagazine.com/2025/03/how-prevent-wordpress-sql-injection-attacks/)

## Performance

👉 Mettre en place une extension de cache + compression/minification (voir [extensions](extensions.md)).

- Identifier les requêtes lentes <https://css-tricks.com/finding-and-fixing-slow-wordpress-database-queries/>
- [Query Monitor](https://wordpress.org/plugins/query-monitor/) affiche les requêtes SQL exécutées et leur performance ainsi que les fichiers templates utilisés.

Éviter les requêtes SQL multiples pour charger des données ACF, par exemple récupérer les champs [par groupe](https://www.advancedcustomfields.com/resources/group/) ou par `get_fields`.

```php
// Au lieu de :
$api_path = get_field('api_path', 'option'); // 1 requête
$api_version = get_field('api_version', 'option'); // 1 requête
$api_provider_id = get_field('api_provider_id', 'option'); // 1 requête

// Mieux vaut :
$acf_options = get_fields('option') ?: []; // 1 requête
$api_path = $acf_options['api_path'] ?? null;
$api_version = $acf_options['api_version'] ?? null;
$api_provider_id = $acf_options['api_provider_id'] ?? null;
```

## Recette

👉 Utiliser [wp-migrate-db](https://fr.wordpress.org/plugins/wp-migrate-db/) pour exporter les contenus en adaptant correctement les URLs vers le nouveau domaine.

👉 Ne pas laisser indexer ce site par les robots, en ajoutant une authentification HTTP (par exemple avec .htaccess).

- Checklist de qualité <https://wpaudit.site>

## Mise en ligne

👉 Utiliser [wp-migrate-db](https://fr.wordpress.org/plugins/wp-migrate-db/) pour exporter les contenus en adaptant correctement les URLs vers le nouveau domaine.

- Modifier `WP_ENVIRONMENT_TYPE`/`WP_ENV` à `production` et `WP_DEBUG` à `false`.
- Autoriser l'indexation par les robots (dans la configuration) et retirer du fichier .htaccess `Header set X-Robots-Tag "noindex,nofollow"` s'il est présent.
- Modifier l'adresse e-mail du compte administrateur.
- Vérifier que toutes les anciennes URLs de développement ont disparu de la base.
- Activer le cache.

> [!TIP]
> Si l'hébergement est mutualisé et ne permet de pointer dans le dossier `/public`, activer la réécriture avec un fichier `.htaccess` à la racine :
>
> ```htaccess
> RewriteEngine on
> RewriteRule ^(.*)$ /public/$1 [L]
> ```

## Maintenance

On peut utiliser [WP-CLI](https://www.smashingmagazine.com/2015/09/wordpress-management-with-wp-cli/) pour opérations pratiques en ligne de commande, comme regénération des thumbnails ou gestion des extensions.

🔖 [Méthodes d'installation de WP-CLI](https://make.wordpress.org/cli/handbook/guides/installing/) et [Usage de base de WP-CLI](https://make.wordpress.org/cli/handbook/guides/quick-start/). Avec Bedrock il faut que wp-cli.yml renseigne le bon chemin vers le dossier WordPress par exemple path: `www/wp`.

Forcer la mise à jour par téléchargement direct dans wp-config.php `define('FS_METHOD' 'direct');`

Désactiver le warning d'update WordPress pour les non-admins :

```php
if ( !current_user_can( 'edit_users' ) ) {
    add_action('admin_menu','wphidenag');
    function wphidenag() {
        remove_action( 'admin_notices', 'update_nag', 3 );
    }
}
```

Désactiver les notifications de mise à jour pour les non-admins :

```php
function hide_update_notice_to_all_but_admin_users()
{
    if (!current_user_can('update_core')) {
        remove_action( 'admin_notices', 'update_nag', 3 );
        remove_action('load-update-core.php','wp_update_plugins');
        add_filter('pre_site_transient_update_plugins','__return_null');
        echo '<style>#setting-error-tgmpa>.updated settings-error notice is-dismissible, .update-nag, .updated, .core-updates { display: none; }</style>';
    }
}
add_action( 'admin_head', 'hide_update_notice_to_all_but_admin_users', 1 );
```

### Personnalisation de l'admin

- [Modifier le logo](https://wpmarmite.com/snippet/modifier-logo-connexion-wordpress/) sur la page de connexion admin.
- [Retirer l'accès aux pages inutiles](https://wpthinker.com/hide-wordpress-admin-menu-items/) selon le rôle.
- [Afficher un message dans l'interface d'admin](https://developer.wordpress.org/reference/hooks/admin_notices/) par exemple avec `if (!class_exists('ACF'))`.

#### Documentation intégrée à l'admin

Ajoute un lien vers une documentation externe (ex: Wiki GitLab, GitHub).

```php
/**
 * wiki
 */

function add_wiki_link()
{
    add_menu_page('Wiki', 'Wiki', 'read', 'https://gitlab.example.org/projet/projet/-/wikis/Plan', '', 'dashicons-editor-help');
}
add_action('admin_menu', 'add_wiki_link', 999);
```

## Divers, dépannage et astuces

- Ajouter l'affichage des champs personnalisés dans l'éditeur <https://css-tricks.com/use-custom-fields-in-wordpress/>
- Réinitialiser un mot de passe admin en ayant accès à la base MySQL (ex : via phpmyadmin) : modifier la table `wp_users` et remplacer `user_pass` par une nouvelle valeur générée <https://codebeautify.org/wordpress-password-hash-generator>
- [Ajouter les catégories et étiquettes aux Pages](assets/wordpress/snippet_add_taxonomies_to_pages.php)
- Configurer le mode développement <https://make.wordpress.org/core/2023/07/14/configuring-development-mode-in-6-3/>
- Pour afficher un e-mail, utiliser la fonction [antispambot](https://developer.wordpress.org/reference/functions/antispambot/)

## Autres ressources

🔖 Beaucoup de cours chez [Capitaine WP](https://capitainewp.io/) et [Grafikart](https://grafikart.fr/tutoriels/wordpress)

TODO: routing template hierarchy (minimum) + création d'url avec page enfant

TODO: réglages de base (page principale home/front, permaliens, dates)
