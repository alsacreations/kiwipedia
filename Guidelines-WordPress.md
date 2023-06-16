# Guidelines : WordPress

Statut : Recommendation (REC)

Bonnes pratiques WordPress appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/), évoluant dans le temps et adaptées à chaque nouveau projet.

## Structure de projet

On utilise :

- [Composer](https://getcomposer.org/) pour installer WordPress et ses extensions.
- [WordPlate](https://github.com/wordplate/wordplate) qui fonctionne avec [Vite](https://github.com/vitejs/vite).
- [Tailwind](https://github.com/timber/timber) en tant que framework CSS (optionnel).
- [Timber](https://github.com/timber/timber) pour la syntaxe Twig dans les templates (optionnel).

## Environnement de développement

👉 On utilise [Docker](https://www.docker.com/)

- Par défaut, on part d’une base MySQL locale. Il est possible d’utiliser une base MySQL “partagée” accessible à distance, attention cependant à la synchronisation d’informations et de fichiers (options, réglages d'extensions activées…).
- Utiliser `define('WP_ENVIRONMENT_TYPE','staging');` puis [wp_get_environment_type()](https://make.wordpress.org/core/2020/07/24/new-wp_get_environment_type-function-in-wordpress-5-5/)
- Utiliser `define('WP_DEBUG',true);` pour activer le mode debug

## Git

On versionne les fichiers :

- `.env.example`
- `composer.lock`
- `package.json`
- le thème développé pour le projet
- les extensions développées pour le projet
- les fichiers de configuration
- les fichiers de traduction du thème (dossier /languages) ou de l’extension (dossier de l’extension)

On ne versionne **pas** (voir fichiers .gitignore) :

- `.env` (sauf exception)
- le dossier public/wordpress (car installé/mis à jour par composer)
- les extensions tierces (car installées/mises à jour par composer)
- les dossiers public/uploads/ (stockés à part car binaires occupant beaucoup de place), public/upgrade/, vendor/
- les thèmes installés "par défaut" (_Twenty*_)

👉 Le fichier `README.md` à la racine du projet doit contenir toutes les informations pour prendre en main le développement et ré-installer le site rapidement en production.

## Thème

- On privilégie de démarrer avec un starter thème épuré <https://underscores.me/> ou <https://github.com/timber/starter-theme> lorsque l’on utilise Timber.
- Supprimer les autres thèmes livrés par défaut.
- On évite d’utiliser un thème acheté car cela implique qu’on ne pourra pas tout mettre en place dans ces guidelines et qu’on ne maîtrise pas son contenu (code, extensions, évolutions). Si toutefois cela arrive, utiliser le principe de [thème enfant](https://developer.wordpress.org/themes/advanced-topics/child-themes/) pour ne pas modifier le thème parent, qui pourrait être mis à jour par la suite.

### Intégration du thème

#### Outils de vérification (linters)

La liste des linters recommandés est décrite par les [guidelines Visual Studio Code](Guidelines-VScode.md).
Les extensions spécifiques WordPress / PHP recommandées sont :  

- [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)
- [Visual Studio Code supporte PHP](https://code.visualstudio.com/docs/languages/php) (Linting, Debug…) : le configurer en indiquant le chemin.

#### Automatisation

Avec [Vite](https://github.com/vitejs/vite) (présent dans WordPlate)

#### Moteur de template

🔖 [Timber](https://www.alsacreations.com/tuto/lire/1813-Timber-pourquoi-ecrire-du-Twig-dans-WordPress-.html) (optionnel, présent dans notre structure-type avec Docker)

#### Framework CSS

On privilégie, dans cet ordre et **seulement s'il y en a besoin** (sinon Sass), les frameworks CSS suivants :

- [TailwindCSS](https://tailwindcss.com/) (couplé à un mini-fichier reset personnel “alsa-TW-Reset”) (pour la configuration voir [Guidelines Tailwind](Guidelines-Tailwind.md))
  - <https://github.com/cjkoepke/wp-tailwind>
  - <https://css-tricks.com/adding-tailwind-css-to-wordpress-themes/>
- [Bootstrap](https://getbootstrap.com/) (si besoin spécifique ou projet le nécessitant)
- [KNACSS](https://www.knacss.com/) (si besoin spécifique) (voir [Guidelines CSS](Guidelines-CSS.md))

#### Nommage HTML, CSS et PHP

Voir Guidelines [HTML](Guidelines-HTML.md) et [CSS](Guidelines-CSS.md)

- Suivre les [PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/) de WordPress.
- Ne pas utiliser les classes CSS générées par WordPress qui sont spécifiques à une installation précise et ne sont pas réutilisables : classes spécifiques des _wrappers_ des menus du type `.menu-nom-de-mon-menu` et la majorité des classes générées par `body_class()` ou `post_class()`.
- Pour le chargement des fichiers CSS et JavaScript on utilise la configuration de [WordPlate](https://github.com/vinkla/wordplate) avec [Vite](https://vitejs.dev/)
- Placer `add_action()` et `add_filter()` après la fonction liée.
- Toutes les chaînes de caractères d’un thème doivent pouvoir être traduites. Il faut donc les entourer dans la bonne fonction gettext ( `__()`, `_n()`, `_x()` ), couplées à un text-domain cohérent en fonction du contexte (thème, thème enfant, extension, ...).
- Découper le thème de manière cohérente (boucles à part, etc.) pour pouvoir utiliser `get_template_part()` correctement.
- Tout ce qui ne fait pas partie intégrante du thème et/ou optionnel doit être réalisé sous forme d'extension.

### Hiérarchie de fichiers et documentation

👉 Utiliser l'auto-chargement des fichiers PHP du thème par WordPress (selon slug de la catégorie, du Custom Post Type, etc).

- Connaître / visualiser la [hiérarchie de templates](https://developer.wordpress.org/themes/basics/template-hierarchy/) ([explications](https://wpshout.com/wordpress-template-hierarchy/))
- Documentation officielle <https://developer.wordpress.org/themes/>
- Fonctions <https://codex.wordpress.org/Function_Reference>
- Hooks <https://adambrown.info/p/wp_hooks>
- WP_Query <https://www.smashingmagazine.com/2013/01/using-wp_query-wordpress/>
- WP_Query, query_posts, get_posts, etc <https://www.rarst.net/wordpress/wordpress-query-functions/>
- Custom Post Type <https://developer.wordpress.org/reference/functions/register_post_type/>
- Ou générateur de Custom Post Type <https://generatewp.com/post-type/> (à noter avec Gutenberg: il faut obligatoirement renseigner le champ "parent_item_colon" pour voir apparaître le sélecteur de pages parentes pour un CPT hiérarchique).
- Taxonomies <https://developer.wordpress.org/reference/functions/register_taxonomy/>

Voir aussi

- [Vie d’une requête](https://roots.io/routing-wp-requests/)
- [Cheatsheet template map](https://cdn.tutsplus.com/wp/uploads/legacy/090_WPCheatSheets/WP_CheatSheet_TemplateMap.pdf)
- [Cheatsheet loop visual model](https://cdn.tutsplus.com/wp/uploads/legacy/090_WPCheatSheets/WP_CheatSheet_LoopVisualModel.pdf)
- [A Detailed Guide To A Custom WordPress Page Templates](https://www.smashingmagazine.com/2015/06/wordpress-custom-page-templates/)

### À prévoir dans le thème

👉 On ne nomme/préfixe pas le thème ou ses classes/fonctions par alsa_ mais plutôt par le nom du projet.

La [structure standard](https://developer.wordpress.org/themes/basics/organizing-theme-files/) est :

```text
├── assets (dir)/
│   ├── css (dir)
│   ├── images (dir)
│   └── js (dir)
├── inc (dir)
├── template-parts (dir)/
│   ├── footer (dir)
│   ├── header (dir)
│   ├── navigation (dir)
│   ├── page (dir)
│   └── post (dir)
├── 404.php
├── archive.php
├── comments.php
├── footer.php
├── front-page.php
├── functions.php
├── header.php
├── index.php
├── page.php
├── README.txt
├── rtl.css
├── screenshot.png
├── search.php
├── searchform.php
├── sidebar.php
├── single.php
└── style.css
```

### Traductions

🔖 Voir <https://www.alsacreations.com/article/lire/1837-wordpress-theme-internationalisation.html>

🪛 Convertir les fichiers .po en .mo en ligne : <https://po2mo.net/>

### functions.php

⚠️ Le fichier `functions.php` fonctionne différemment des autres fichiers “template”, lors de la création d’un thème enfant par exemple, il n’est pas simplement écrasé, mais chargé avant le thème parent. Les deux fichiers déclarant des fonctions cohabitent, et il serait dommage de ne pas pouvoir écraser une fonctionnalité, ou de tomber sur une erreur PHP car une fonction est déclarée deux fois.
Il faut donc prendre l’habitude de déclarer TOUTES les fonctions ainsi :

```php
if ( ! function_exists( 'nomdutheme_nom_de_la_fonction' )  {
    function nomdutheme_nom_de_la_fonction() {
        // do something
    }
}
add_filter('filter_name', 'nomdutheme_nom_de_la_fonction');
```

👉 Idéalement le fichier `functions.php` du thème inclut d'autres scripts PHP dédiés pour organiser le code (ex : actions.php, filters.php, menu.php, theme-setup.php, etc). Exemple de fichier `functions.php` :

```php
/**
 * Menus/Sidebar/Theme options definitions
 */
require_once 'includes/theme-setup.php';
 
/**
 * Filters used to alter front-end rendering
 */
require_once 'includes/menu-filters.php';
 
/**
 * Actions & filters
 */
require_once 'includes/actions.php';
require_once 'includes/filters.php';
 
/**
 * Parent theme overload
 */
require_once 'includes/inc-pages-functions-updated.php';
require_once 'includes/cnrs-functions.php';
```

### Personnalisation du thème

L'[API Customize](https://developer.wordpress.org/themes/customize-api/) permet d'ajouter des options de personnalisation au thème, apparaissant dans l'interface d'administration, notamment avec le hook [customize_register](https://developer.wordpress.org/reference/hooks/customize_register/).

### Formulaires

- Suivre les bonnes pratiques : [Best Practices](https://developer.wordpress.org/plugins/plugin-basics/best-practices/)
- Valider les données avec les méthodes natives : [Validating Data](https://developer.wordpress.org/apis/security/data-validation/)
- Un formulaire = un nonce : [Nonces](https://developer.wordpress.org/apis/security/nonces/)

### Admin

- [Modifier le logo](https://wpmarmite.com/snippet/modifier-logo-connexion-wordpress/) sur la page de connexion admin.
- [Retirer l'accès aux pages inutiles](https://wpthinker.com/hide-wordpress-admin-menu-items/) selon le rôle.

## Développement des contenus éditables

### Menus de navigation

On se repose sur un [Bloc Navigation](https://fr.wordpress.org/support/article/navigation-block/)
ou
la fonctionnalité classique native de [menu éditable (dans Apparence > Menus)](https://wordpress.org/documentation/article/appearance-menus-screen/) en réservant un emplacement.

🔖 Voir <https://wpmarmite.com/menu-wordpress/>

### Shortcodes

Lors de la création d’un [shortcode](https://codex.wordpress.org/fr:Shortcode) avec paramètres, il est conseillé de ne plus utiliser la fonction extract (voir <https://core.trac.wordpress.org/ticket/22400>).

🔖 Voir <https://capitainewp.io/formations/developper-theme-wordpress/shortcode/> et <https://kinsta.com/fr/blog/shortcodes-wordpress/>

### Gutenberg / éditeur wysiwyg

- Palette de couleurs <https://speckyboy.com/custom-color-palette-wordpress-gutenberg-editor/>

#### Blocs sur-mesure

Utiliser les [blocs ACF](https://www.advancedcustomfields.com/resources/blocks/) pour ne rendre modifiables que des champs spécifiques (champ texte, image, colorpicker, etc.) et avoir les fonctionnalités d'ACF (champ [relationnel](https://www.advancedcustomfields.com/resources/relationship/), [taxonomies](https://www.advancedcustomfields.com/resources/taxonomy/), etc.).

Dans le cas où on utilise un thème acheté et que les fichiers PHP ne sont pas utilisables, on se tournera vers une [extension](https://fr.wordpress.org/plugins/blockmeister/) afin de générer des ["patterns" Gutenberg](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/) sur-mesure.

### CPT (Custom Post Types)

On utilise des CPT pour toute entité de données allant au-delà des Pages et Posts.

- <https://wpchannel.com/wordpress/tutoriels-wordpress/creer-custom-post-types-wordpress/>
- <https://salferrarello.com/cpt-best-practices/>
- <https://kinsta.com/fr/blog/types-publications-personnalises-wordpress/>
- Générateur de CPT en plugin <https://wpturbo.dev/generators/post-type/>

### ACF (Advanced Custom Fields)

On utilise ACF pour ajouter des champs personnalisés à certains types de données.

- <https://newslang.ch/blog/tutoriel-acf-advanced-custom-fields-le-guide-complet/>
- <https://www.advancedcustomfields.com/blog/best-practices-designing-custom-fields/>
- <https://kinsta.com/fr/blog/advanced-custom-fields/>

### Ajouter le support de Gutenberg pour les CPT

Si le projet nécessite d’utiliser Gutenberg, penser à ajouter `"show_in_rest" => true` et `"supports" => ['editor']` dans la déclaration des CPT.

### Ajout des fonctionnalités essentielles dans des mu-plugins

Toutes les fonctions de base, sur lesquelles un non-administrateur ne doit pas avoir la main doivent passer par des extensions indispensables, ou _mu-plugins_ (mu = _must use_). Elles ne peuvent être désactivées par l'interface web. C'est le cas notamment du renommage de fichiers dès l’upload dans la bibliothèque de médias, mais également du retrait des indices lors des erreurs de connexion au back-office (admin).

Quelques MU Plugins bien utiles : <https://gitlab.com/ArmandPhilippot/mu-plugins>

```php
function no_wordpress_errors() {
    return __( 'Something is wrong !', 'text-domain' );
}
add_filter( 'login_errors', 'no_wordpress_errors' );
```

## Accessibilité

- [Vidéos de WordPress Accessibility Day](https://www.youtube.com/channel/UCes9XCUZd51CAigbBEGlfNg)
- [Articles d'Access42 autour de WordPress](https://access42.net/wordpress)
- [WordPress.org : Accessibilité](https://fr.wordpress.org/about/accessibility/)

## Extensions

👉 Installation : utiliser `composer` avec le nom du plugin, préfixé par “wpackagist-plugin”, par exemple `composer require wpackagist-plugin/wp-migrate-db`

👉 Toute fonctionnalité développée sur-mesure pour le projet se fait dans le cadre d’une extension propre à activer/désactiver.

- Documentation officielle : [Plugin Handbook](https://developer.wordpress.org/plugins/)
- Modèles : [WordPress Plugin Template](https://github.com/hlashbrooke/WordPress-Plugin-Template) ou [WordPress Plugin Boilerplate Generator](https://wppb.me/)

### Obligatoires

- [WP fail2ban](https://wordpress.org/plugins/wp-fail2ban/) si hébergement interne équipé de [fail2ban](https://github.com/fail2ban/fail2ban/) permettant de signaler les erreurs d’identification pour bannir les adresses IP tentant du bruteforce ; n’utilisez alors pas d’extension pour changer l’url de wp-admin.
- [WP Migrate Lite](https://fr.wordpress.org/plugins/wp-migrate-db/) pour migrer les données de local > dev > recette > prod (et inversement), à désinstaller par sécurité après mise en production.
- [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/) ou [WP Fastest Cache](https://fr.wordpress.org/plugins/wp-fastest-cache/) ou [WP Super Cache](https://fr.wordpress.org/plugins/wp-super-cache/) : cache/compression de contenu pour améliorer les temps de réponse.
- [SecuPress](https://fr.wordpress.org/plugins/secupress/) pour améliorer le score global (permissions de fichiers, bonnes pratiques).
- Notre plugin **[Kiwiplate Setup Theme](assets/wordpress/kiwiplate_setup_theme.php)**, et/ou mettre en place les actions suivantes (extensions + snippets de code).

### Recommandées selon usage

- [Disable emojis](https://fr.wordpress.org/plugins/disable-emojis/) : désactiver les appels de scripts externes vers WordPress (RGPD).
- [Disable comments](https://wordpress.org/plugins/disable-comments/) : désactiver les commentaires sur les posts/pages/médias, au choix (très propre).
- [ACF](https://www.advancedcustomfields.com/) : ajouter des champs riches aux posts / pages / CPT.
- [Duplicate Post](https://wordpress.org/plugins/duplicate-post/) : créer du contenu rapidement en dupliquant d'un simple clic un post, une page, ou un custom post.
- [Ninja Forms](https://fr.wordpress.org/plugins/ninja-forms/) : génération de formulaires. Partiellement accessible.
- [Polylang](https://fr.wordpress.org/plugins/polylang/) : traduction (remplace WPML).
- [SEOPress](https://www.seopress.org/fr/) : SEO, ou [Yoast](https://fr.wordpress.org/plugins/wordpress-seo/) (rajoute une grosse surcouche de pub très intrusive dans l'admin).
- [Filebird](https://wordpress.org/plugins/filebird/) : File Manager (s’ajoute dans la galerie de médias) : créer des dossiers. Attention, il faut prendre la version premium pour créer des dossiers illimités.
- [Photo gallery](https://fr.wordpress.org/plugins/photo-gallery/) (Galerie de médias, photos et vidéos) + riche en fonctionnalités que la galerie native (img s’ouvrent dans une popup, slider, bouton de téléchargement, création de groupes de galeries, etc…). N’est pas accessible : fenêtre modale qui ne prend pas le focus, pas d’attributs aria, bouton de fermeture non accessible.
- [Job Manager](https://fr.wordpress.org/plugins/wp-job-manager/) : Offres d’emploi.
- [Members](https://wordpress.org/plugins/members/) : Droits et utilisateurs.
- [Tarteaucitron](https://fr.wordpress.org/plugins/tarteaucitronjs/) || [Cookie Notice](https://fr.wordpress.org/plugins/cookie-notice/) : bannières cookies, code non accessible (boutons qui n’en sont pas, etc.).
- [Adminimize](https://wordpress.org/plugins/adminimize/) : personnaliser l’aspect de l’admin en fonction des niveaux des utilisateurs. || [Hook natif](https://developer.wordpress.org/reference/functions/remove_menu_page/) : supprimer les items du menu (pour un rôle spécifique, vérifier le rôle avec fonction [current_user_can](https://developer.wordpress.org/reference/functions/current_user_can/)).
- [Peters-login-redirect](https://wordpress.org/plugins/peters-login-redirect/) : redirection des utilisateurs après connexion. || [Hook natif](https://developer.wordpress.org/reference/hooks/login_redirect/)
- [Relevanssi](https://wordpress.org/plugins/relevanssi/) : améliore les résultats de recherche par critères de pertinence.
- [User Switching](https://wordpress.org/plugins/user-switching/) : switcher facilement d’utilisateur.
- [Simple Page Ordering](https://wordpress.org/plugins/simple-page-ordering/) : ordonner les pages, et autres CPT ordonnés, par simple glisser/déposer, sans avoir besoin de rentrer dans chaque page.
- [Multiple Domain Mapping on Single Site](https://fr.wordpress.org/plugins/multiple-domain-mapping-on-single-site/) pour faire correspondre différentes Pages (d’accueil) à plusieurs domaines ou sous-domaines.
- [Custom Login](https://wordpress.org/plugins/custom-login/) : personnaliser la page de login. || [Tuto avec Hooks natifs](https://codex.wordpress.org/Customizing_the_Login_Form)
- [WP All Export](https://wordpress.org/plugins/wp-all-export/) : exporter les données au format CSV/XML (fonctionne avec ACF, The Events Calendar) fonctionne aussi pour l’import avec [WP All Import](https://wordpress.org/plugins/wp-all-import/)
- [Admin Columns](https://wordpress.org/plugins/codepress-admin-columns/) : ajouter/modifier des colonnes dans l'interface d'administration
- [Utiliser SVG dans WordPress - 2 extensions](https://css-tricks.com/using-svg-in-wordpress/)

### E-commerce

- [WooCommerce](https://woocommerce.com/) : la solution idéale (communauté, support) avec feuilles de style par défaut, un système de coupon, gestion des stocks automatisé, gestion des e-mails client avancés, plein de hooks.
- [WOOF](https://fr.wordpress.org/plugins/woocommerce-products-filter/) : Filtres plus riche en fonctionnalités que ceux de WooCommerce natif
- [Tickera](https://tickera.com/) : Vente de billets, compatible avec WooCommerce.

## Sécurité

- 👉 Supprimer l’utilisateur **admin** et l’utilisateur avec l’ID 1. Créer un utilisateur de niveau administrateur avec identifiant spécifique différent de “admin”.
- Créer un ou plusieurs utilisateurs de niveau **éditeur** pour les intervenants (doit être différent du nom de domaine pour des raisons de sécurité), ayant accès juste aux fonctionnalités utiles : ne pas utiliser de compte admin par défaut pour toutes les personnes car cela permet l'installation d'extensions.
- Compléter le fichier `wp-config.php` avec les valeurs de <https://vinkla.github.io/salts/>
- Désactiver l’édition du thème et des plugins en ligne dans wp-config.php `define('DISALLOW_FILE_EDIT', true);`
- [User Name Security](https://wordpress.org/plugins/user-name-security/) supprime les mentions de l’utilisateur (id et username) dans `body_class()`, entre autres choses.
- [SF Author URL control](https://wordpress.org/plugins/sf-author-url-control/) personnalise le “author” et le slug utilisateur pour sécuriser et personnaliser les URL des pages auteur.
- Toujours utiliser [les nonces](https://css-tricks.com/wordpress-front-end-security-csrf-and-nonces/) pour éviter les [CSRF](https://fr.wikipedia.org/wiki/Cross-site_request_forgery), s’il faut développer des modules admin et/ou pour les utilisateurs identifiés sur le site.
- Surveiller si le thème / les extensions utilisées font l’objet d’une faille sur [wpscan](https://wpscan.com/)
- Ajouter le script pour enlever l'avertissement à la connexion qui permet d’indiquer que l’identifiant est le bon mais pas le mot de passe.

## Performance

👉 Mettre en place une extension de cache/compression/minification (voir extensions).

- Identifier les requêtes lentes <https://css-tricks.com/finding-and-fixing-slow-wordpress-database-queries/>
- [Query Monitor](https://wordpress.org/plugins/query-monitor/) affiche les requêtes SQL exécutées et leur performance ainsi que les fichiers templates utilisés.

## Recette

👉 Utiliser [wp-migrate-db](https://fr.wordpress.org/plugins/wp-migrate-db/) pour exporter les contenus en adaptant correctement les URLs vers le nouveau domaine.

👉 Ne pas laisser indexer ce site par les robots, en ajoutant une authentification HTTP (par exemple avec .htaccess).

- Checklist de qualité <https://wpaudit.site>

## Mise en ligne

👉 Utiliser [wp-migrate-db](https://fr.wordpress.org/plugins/wp-migrate-db/) pour exporter les contenus en adaptant correctement les URLs vers le nouveau domaine.

- Modifier `WP_ENVIRONMENT_TYPE`/`WP_ENV` à `production` et `WP_DEBUG` à `false`.
- Autoriser l’indexation par les robots (dans la configuration) et retirer du fichier .htaccess `Header set X-Robots-Tag "noindex,nofollow"` s'il est présent.
- Modifier l’adresse e-mail du compte administrateur.
- Vérifier que toutes les anciennes URLs de développement ont disparu de la base.
- Activer le cache.

Si l'hébergement est mutualisé et ne permet de pointer dans le dossier `/public`, activer la réécriture avec un fichier `.htaccess` à la racine :

```htaccess
RewriteEngine on
RewriteRule ^(.*)$ /public/$1 [L]
```

## Maintenance

On peut utiliser [WP-CLI](https://www.smashingmagazine.com/2015/09/wordpress-management-with-wp-cli/) pour opérations pratiques en ligne de commande.

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

## Dépannage

Réinitialiser un mot de passe admin en ayant accès à la base MySQL (ex : via phpmyadmin) : modifier la table `wp_users` et remplacer `user_pass` par une nouvelle valeur générée <https://codebeautify.org/wordpress-password-hash-generator>

## Environnement sans Docker

### Installer PHP

Pour pouvoir exécuter `composer` en ligne de commande <https://www.php.net/downloads.php>

### Installer Composer

Suivre les instructions de <https://getcomposer.org/download/>

Sur macOS pour faire en sorte que la commande `composer` soit disponible partout :

```sh
mkdir -p /usr/local/bin
mv composer.phar /usr/local/bin/composer
```

### Installer WordPlate avec Composer

```sh
composer create-project --prefer-dist wordplate/wordplate superprojet
```

Modifier le fichier `.env` avec les coordonnées de la base de données MySQL.

### Installer les plugins WordPress

Utiliser `composer` avec le nom du plugin, préfixé par “wpackagist-plugin”, par exemple `composer require wpackagist-plugin/wp-migrate-db`

### Développer le thème

Exploiter webpackmix intégré : `npm install` (ou pnpm)

Optionnel: `npm i concurrently -D`

```json
// Package.json
"scripts": {
    "serve": "php -S localhost:8000 -t public/",
    "build": "...",
    "dev": "...",
    "devstart": "concurrently \"npm run serve\" \"npm run dev\""
  },
```

Tâches :

- Démarrage du serveur php : `npm run serve`
- Démarrage du serveur dev (browsersync, css, js) : `npm run dev`
- Minification/compilation : `npm run build`

Optionnel : démarrage des deux en même temps: `npm run devstart`

Si cross-env n'est pas installé `npm install cross-env -g`

## Autres ressources

- Beaucoup de cours chez [Capitaine WP](https://capitainewp.io/)
