# WordPress : Recette, mise en ligne, maintenance

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
- Configurer le mode développement <https://make.wordpress.org/core/2023/07/14/configuring-development-mode-in-6-3/>
- Pour afficher un e-mail, utiliser la fonction [antispambot](https://developer.wordpress.org/reference/functions/antispambot/)

## Autres ressources

🔖 Beaucoup de cours chez [Capitaine WP](https://capitainewp.io/) et [Grafikart](https://grafikart.fr/tutoriels/wordpress)
