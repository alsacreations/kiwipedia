Guidelines WordPress

[[TOC]]

# Recommandations

## Version/git

Utiliser le fichier .gitignore ci-dessous à la racine du projet, ou utiliser [cette technique](http://agence.keyrusdigital.fr/blog/articles-technique/bien-versionner-wordpress-git/).

# -----------------------------------------------------------------

# .gitignore for WordPress

# 

# By default all files are ignored.  You'll need to whitelist

# any mu-plugins, plugins, or themes you want to include in the repo.

# To ignore uncommitted changes in a file that is already tracked, use 

# git update-index --assume-unchanged

# To stop tracking a file that is currently tracked, use 

# git rm --cached

#

# -----------------------------------------------------------------

# ignore everything in the root except the "wp-content" directory and wp-config

/*

!wp-content/

!/wp-config.php

# ignore everything in the "wp-content" directory

wp-content/*

# except:

!wp-content/mu-plugins/

!wp-content/plugins/

!wp-content/themes/

!wp-content/w3tc-config/

!wp-content/index.php

# ignore all files starting with . or ~

.*

~*

# ignore node dependency directories (used by grunt)

node_modules/

# ignore OS generated files

ehthumbs.db

Thumbs.db

.DS_Store

# ignore Editor files

*.sublime-project

*.sublime-workspace

*.komodoproject

# ignore log files and databases

*.log

*.sql

*.sqlite

# ignore sitemaps

sitemap.xml

sitemap.xml.gz

# ignore packaged files

*.7z

*.dmg

*.gz

*.iso

*.jar

*.rar

*.tar

*.zip

# -------------------------

# Whitelisted Files

# -------------------------

# track these files, if they exist

!.gitignore

!.editorconfig

!README.md

!CHANGELOG.md

!composer.json

# track favicon files, if they exist

!android-chrome-*.png

!apple-touch-icon*.png

!browserconfig.xml

!favicon*.png

!favicon*.ico

!manifest.json

!mstile-*.png

!safari-pinned-tab.svg

## Thèmes

* Ne pas modifier les thèmes pro / non développés en interne

* Utiliser les thèmes enfant au maximum

* Supprimer les thèmes par défaut (twenty*) dans le répertoire wp-content/themes/

## Utilisateurs et développement

### Général, sécurité

Créer un utilisateur *administrateur* avec pour login **alsacreations (ou presque)** ayant accès à tout.

Supprimer l’utilisateur *admin*.

Créer un utilisateur *éditeur* avec pour login le nom du client (doit être différent du nom de domaine pour des raisons de sécurité), ayant accès juste aux fonctionnalités utiles.

![image alt text](image_0.png)

### Techniques

* [WP-CLI](http://www.smashingmagazine.com/2015/09/wordpress-management-with-wp-cli/) pour opérations pratiques en ligne de commande

* Toujours utiliser [les nonces](https://css-tricks.com/wordpress-front-end-security-csrf-and-nonces/) pour éviter les CSRF, s’il faut développer des modules admin et/ou pour les utilisateurs identifiés sur le site

* Utiliser les chemins (URL) dynamiques du thème et du site [http://code.tutsplus.com/tutorials/why-you-shouldnt-code-urls-in-themes-or-plugins-and-the-wordpress-functions-to-use-instead--cms-23262](http://code.tutsplus.com/tutorials/why-you-shouldnt-code-urls-in-themes-or-plugins-and-the-wordpress-functions-to-use-instead--cms-23262)

* Chargement de fichiers CSS, JavaScript… : Utiliser les fonctions [wp_enqueue_script](http://codex.wordpress.org/Function_Reference/wp_enqueue_script) et [wp_enqueue_style](http://codex.wordpress.org/Function_Reference/wp_enqueue_style)

### Sécurité

* Surveiller si le thème / les extensions utilisées font l’objet d’une faille sur [https://wpvulndb.com/](https://wpvulndb.com/) 

* Désactiver l’édition du thème et des plugins en ligne dans wp-config.phpdefine('DISALLOW_FILE_EDIT', true);

* [SF Author URL control](http://wordpress.org/extend/plugins/sf-author-url-control/) personnalise le "author" et le slug utilisateur pour sécuriser et personnaliser les URL des pages auteur.

* [Disable emojis](https://geek.hellyer.kiwi/plugins/disable-emojis/) pour ne pas faire appel à un fichier distant hébergé par wp

* [User Name Security](http://wordpress.org/plugins/user-name-security/) supprime les mentions de l’utilisateur (id et username) dans body_class(), entre autres choses

* [Login LockDown](http://wordpress.org/extend/plugins/login-lockdown/) permet de limiter le nombre de tentatives de connexion d’un même utilisateur, et de bannir temporairement une IP

* [Rename wp-login](http://wordpress.org/plugins/rename-wp-login/) permet de renvoyer une 404 pour les attaques bruteforce sur wp-login.php

* [wp-fail2ban](https://wordpress.org/plugins/wp-fail2ban/) permet de logger les erreurs d’identification à part et d’appliquer fail2ban dessus pour bannir les IP tentant du bruteforce **à appliquer systématiquement sur notre hébergement (chou)**

* [https://geek.hellyer.kiwi/plugins/disable-emojis/](https://geek.hellyer.kiwi/plugins/disable-emojis/) pour désactiver les appels de scripts externes vers WordPress

* Valider les données et méthodes natives [http://codex.wordpress.org/Data_Validation](http://codex.wordpress.org/Data_Validation)

## Mise en ligne

Adaptation de base avec URL : [http://pixelentity.com/wordpress-search-replace-domain/](http://pixelentity.com/wordpress-search-replace-domain/) (gère aussi les URL dans les options / tableaux sérialisés)

### Ne pas oublier

* La page 404

* Autoriser l’indexation par les robots à la mise en production

* [https://capsicummediaworks.com/killer-wordpress-checklist/](https://capsicummediaworks.com/killer-wordpress-checklist/) 

## Fonctions

* [http://codex.wordpress.org/Function_Reference](http://codex.wordpress.org/Function_Reference)

* [http://www.wpfunction.me/](http://www.wpfunction.me/)

## Hiérarchie des fichiers

Utiliser l’auto-chargement des fichiers PHP du thème par WordPress (selon slug de la catégorie, du Custom Post Type, etc)

* [https://codex.wordpress.org/fr:Hi%C3%A9rarchie_des_fichiers_mod%C3%A8les](https://codex.wordpress.org/fr:Hi%C3%A9rarchie_des_fichiers_mod%C3%A8les)

* [http://codex.wordpress.org/Template_Hierarchy](http://codex.wordpress.org/Template_Hierarchy)

* [http://wphierarchy.com/](http://wphierarchy.com/)

## Hooks

* Liste des hooks existants [http://adambrown.info/p/wp_hooks](http://adambrown.info/p/wp_hooks)

## Thème : functions.php

Le fichier functions.php fonctionne différemment des autres fichiers "template", lors de la création d’un thème enfant par exemple, il n’est pas simplement écrasé, mais chargé avant le thème parent. Les deux fichiers déclarant des fonctions cohabitent, et il serait dommage de ne pas pouvoir écraser une fonctionnalité, ou de tomber sur une erreur PHP car une fonction est déclarée deux fois.

Il faut donc prendre l’habitude de déclarer TOUTES les fonctions ainsi :

if ( ! function_exists( 'nomdutheme_nom_de_la_fonction' )  {

	

function nomdutheme_nom_de_la_fonction() {

		// do something

}

// éventuellement l’accrocher à un hook

add_filter('filter_name', 'nomdutheme_nom_de_la_fonction');

}

## Maîtriser WP_Query

### Utiliser query_posts, get_posts ou new WP_Query ?

* WP_Query : [http://wp.smashingmagazine.com/2013/01/14/using-wp_query-wordpress/](http://wp.smashingmagazine.com/2013/01/14/using-wp_query-wordpress/)

Ce schéma résume la situation :

![image alt text](image_1.png)

* [http://code.tutsplus.com/tutorials/mastering-wp_query-10-useful-examples--cms-22980](http://code.tutsplus.com/tutorials/mastering-wp_query-10-useful-examples--cms-22980)

* [http://code.tutsplus.com/tutorials/wp_query-arguments-author-search-password-permissions-caching-and-return-fields--cms-23206](http://code.tutsplus.com/tutorials/wp_query-arguments-author-search-password-permissions-caching-and-return-fields--cms-23206) 

* [http://code.tutsplus.com/tutorials/wp_query-arguments-status-order-and-pagination--cms-23167](http://code.tutsplus.com/tutorials/wp_query-arguments-status-order-and-pagination--cms-23167)

* [http://code.tutsplus.com/tutorials/wp_query-arguments-date--cms-23165](http://code.tutsplus.com/tutorials/wp_query-arguments-date--cms-23165) 

* [http://code.tutsplus.com/tutorials/wp_query-arguments-custom-fields--cms-23091](http://code.tutsplus.com/tutorials/wp_query-arguments-custom-fields--cms-23091) 

* [http://code.tutsplus.com/tutorials/wp_query-arguments-taxonomies--cms-23090](http://code.tutsplus.com/tutorials/wp_query-arguments-taxonomies--cms-23090) 

* [http://code.tutsplus.com/tutorials/wp_query-arguments-categories-and-tags--cms-23070](http://code.tutsplus.com/tutorials/wp_query-arguments-categories-and-tags--cms-23070) 

* [http://code.tutsplus.com/tutorials/wp_query-arguments-posts-pages-and-post-types--cms-23164](http://code.tutsplus.com/tutorials/wp_query-arguments-posts-pages-and-post-types--cms-23164) 

* [http://code.tutsplus.com/tutorials/mastering-wp_meta_query-wp_date_query--cms-23352](http://code.tutsplus.com/tutorials/mastering-wp_meta_query-wp_date_query--cms-23352) 

* [http://code.tutsplus.com/tutorials/mastering-wp_comment_query--cms-23238](http://code.tutsplus.com/tutorials/mastering-wp_comment_query--cms-23238)

* [http://code.tutsplus.com/tutorials/mastering-wp_user_query--cms-23204](http://code.tutsplus.com/tutorials/mastering-wp_user_query--cms-23204) 

* [http://code.tutsplus.com/tutorials/combining-wp_query-with-the-main-query--cms-23209](http://code.tutsplus.com/tutorials/combining-wp_query-with-the-main-query--cms-23209) 

* [http://code.tutsplus.com/tutorials/mastering-wp_query-series-finale--cms-23452](http://code.tutsplus.com/tutorials/mastering-wp_query-series-finale--cms-23452) 

## Outils

* [http://generatewp.com/post-type/](http://generatewp.com/post-type/)

* [Theme Check](http://wordpress.org/extend/plugins/theme-check/) Plug-in pour tester la qualité d'un thème réalisé

* Lorem Ipsum spécial WordPress [http://www.wpfill.me/](http://www.wpfill.me/)

* Classe de création de custom field : [https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress](https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress)sa documentation :[https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/wiki](https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/wiki)

# Tutos

* [http://code.tutsplus.com/categories/wordpress](http://code.tutsplus.com/categories/wordpress)

* Creating Custom WordPress Administration : [https://code.tutsplus.com/series/creating-custom-wordpress-administration-pages--cms-1062](https://code.tutsplus.com/series/creating-custom-wordpress-administration-pages--cms-1062) 

## Performance

* [https://css-tricks.com/finding-and-fixing-slow-wordpress-database-queries/](https://css-tricks.com/finding-and-fixing-slow-wordpress-database-queries/)

* [Optimiser les performances dans WordPress](http://www.slideshare.net/nicolasjuen/optimiser-les-performances-dans-wordpress)

* [Performance High Traffic](http://wp.smashingmagazine.com/2012/09/12/secrets-high-traffic-wordpress-blogs/)

## Thèmes

* [http://media.mediatemple.netdna-cdn.com/wp-content/uploads/2015/05/01-wp-template-hierarchy-opt.jpg](http://media.mediatemple.netdna-cdn.com/wp-content/uploads/2015/05/01-wp-template-hierarchy-opt.jpg)

* [http://www.smashingmagazine.com/2015/06/19/wordpress-custom-page-templates/](http://www.smashingmagazine.com/2015/06/19/wordpress-custom-page-templates/)

## Template & conditionnal tags

* [http://code.tutsplus.com/tutorials/the-tuts-guide-to-template-tags-introduction--cms-22574](http://code.tutsplus.com/tutorials/the-tuts-guide-to-template-tags-introduction--cms-22574)

* [http://code.tutsplus.com/tutorials/the-tuts-guide-to-template-tags-first-batch--cms-22575](http://code.tutsplus.com/tutorials/the-tuts-guide-to-template-tags-first-batch--cms-22575)

* [http://code.tutsplus.com/tutorials/the-tuts-guide-to-template-tags-second-batch--cms-22576](http://code.tutsplus.com/tutorials/the-tuts-guide-to-template-tags-second-batch--cms-22576)

* [http://code.tutsplus.com/series/a-walkthrough-on-conditional-tags-in-wordpress--cms-804](http://code.tutsplus.com/series/a-walkthrough-on-conditional-tags-in-wordpress--cms-804)

## Autres

* API REST [http://code.tutsplus.com/tutorials/wp-rest-api-creating-updating-and-deleting-data--cms-24883](http://code.tutsplus.com/tutorials/wp-rest-api-creating-updating-and-deleting-data--cms-24883) 

* [Customize WordPress admin easily](http://wp.smashingmagazine.com/2012/05/17/customize-wordpress-admin-easily/)

* [Customize WordPress admin area](http://www.onextrapixel.com/2012/10/08/10-tips-for-a-deeply-customised-wordpress-admin-area/)

* [Inside the WordPress Toolbar](http://wp.smashingmagazine.com/2012/03/01/inside-the-wordpress-toolbar/)

* [Custom Post Types Complete Guide (Smashing Mag’)](http://wp.smashingmagazine.com/2012/11/08/complete-guide-custom-post-types/)

* [Ultimate WordPress Multi-site network management guide](http://www.onextrapixel.com/2011/07/07/the-ultimate-wordpress-multi-site-network-management-guide/)

* [WordPress Multisite](http://wp.smashingmagazine.com/2011/11/17/wordpress-multisite-practical-functions-methods/)

* [Custom Taxonomies](http://wp.smashingmagazine.com/2012/01/04/create-custom-taxonomies-wordpress/)

* [Post Formats](http://webdesignledger.com/tips/getting-started-with-wordpress-post-formats)

* [Ajouter l'uploader de media sur une page d'option (plugin ou theme)](http://wp.tutsplus.com/tutorials/creative-coding/how-to-integrate-the-wordpress-media-uploader-in-theme-and-plugin-options/)

* [CSS Theme starter, les classes globales](http://www.paulund.co.uk/wordpress-theme-css-starter) appliquées au body

* [Making of: Typespiration](http://rafaltomal.com/making-of-typespiration-com/) custom post type

# Plugins

* Multilangue : nous avons une licence [WPML](http://wpml.org/) (voir Keepass)

* Création de plugins

    * Boilerplate : [http://code.tutsplus.com/tutorials/toolbox-of-the-smart-wordpress-developer-the-wordpress-plugin-boilerplate--cms-23873](http://code.tutsplus.com/tutorials/toolbox-of-the-smart-wordpress-developer-the-wordpress-plugin-boilerplate--cms-23873)

    * [WordPress Plugin Boilerplate](http://wppb.io/) 

    * [http://wppb.me/](http://wppb.me/)

* [https://fr.wordpress.org/plugins/responsive-lightbox/](https://fr.wordpress.org/plugins/responsive-lightbox/) lighbox légère RWD pour galeries photos de WordPress, sans avoir à configurer/toucher au code

* Sélection de plugins : [http://www.wpsitecare.com/best-wordpress-plugins/](http://www.wpsitecare.com/best-wordpress-plugins/)

* [WP Help](http://wordpress.org/extend/plugins/wp-help/) pour ajouter une aide dans l'admin

* [https://tickera.com/](https://tickera.com/) Ticketing system compatible avec WooCommerce

* [Pods](http://podsframework.org/) Construire des Custom Post Types / Pages / Taxonomies / autres "facilement" à ne surtout jamais utiliser

* [Inline Attachments](http://wordpress.org/extend/plugins/inline-attachments/) pour pouvoir ajouter des pièces jointes (ex: Documents utiles) sur une page depuis l'admin dans une Meta Box

* [Custom Login](https://wordpress.org/plugins/custom-login/) pour personnaliser la page de login

* [Front-end Editor](https://wordpress.org/plugins/front-end-editor/) pour éditer les posts inline

* [Edit Flow](https://wordpress.org/plugins/edit-flow/) pour revoir le workflow de publication

* [Disable comments](http://wordpress.org/extend/plugins/disable-comments/) pour désactiver les commentaires sur les articles/pages/médias/admnin, au choix (très propre)

* [Simple Lightbox](http://archetyped.com/tools/simple-lightbox/) Lightbox pour galerie et image solo

* [AJAX Thumbnail Rebuild](http://breiti.cc/wordpress/ajax-thumbnail-rebuild/) Restaure les images aux nouvelles dimensions attribuées dans Settings > Media ou celles ajoutées dans functions.php

* [Simple Image Sizes](http://wordpress.org/extend/plugins/simple-image-sizes/) : Permet de créer de nouvelles dimensions d’images et de restaurer toutes les images en sélectionnant tailles et association (post, page, cpt) à restaurer.

* [Wp-Reservation](http://wordpress.org/extend/plugins/wp-reservation/) (bogue pas mal :s) et [Bookings](http://www.zingiri.net/plugins-and-addons/bookings/) pour du booking/réservation sur calendrier

* [Verve Meta-boxes](http://wordpress.org/extend/plugins/verve-meta-boxes/) pour ajouter des meta boxes dans les pages/articles/custom (trop de la balle)

* [Post Expirator](http://wordpress.org/extend/plugins/post-expirator/) pour ajouter une date d'expiration aux articles

* [Formidable Forms](http://wordpress.org/extend/plugins/formidable/) Gestion complète de formulaire (Drag and Drop, modification HTML...)

* [WP ContactPage Designer](http://wordpress.org/extend/plugins/wp-contactpage-designer/) Formulaire de contact classe à construire en drag and drop.

* [P3 Profiler](http://wordpress.org/extend/plugins/p3-profiler/) Analyse des temps de chargements du cœur, thème et plugins, très pratique pour déceler les points noirs

* [W3 Total Cache](http://wordpress.org/extend/plugins/w3-total-cache/) pour délivrer une version statique

* [WP Super Cache](http://wordpress.org/plugins/wp-super-cache) (fonctionne bien aussi)

* [Relevanssi](http://wordpress.org/extend/plugins/relevanssi/) Améliore les résultats de recherche par critères de pertinence.

* [WP-Less](http://wordpress.org/extend/plugins/wp-less/) Plugin à base de LESS-Php par @oncletom ([fonctionnement de WP-Less](http://www.kiwipedia.fr/index.php/Fonctionnement_de_WP-Less))

* [Posts2Posts](http://wordpress.org/extend/plugins/posts-to-posts/) Permet de lier un type de poste (users et pages compris) à un autre.

* [Members List](http://wordpress.org/extend/plugins/members-list/) Permet de créer des listes de membres à afficher. Markup entièrement personnalisable pour chaque liste et chaque champs (pouvant être custom). Possibilité de définir sur quels champs les recherches sont effectués, et lesquels ont une fonction "sorting" activé.

* [MailPress](http://www.mailpress.org/) Pour envoyer des e-mailings avec des thèmes, éventuellement en intégrant des posts déjà rédigés. (Voir patch ci-dessous)

* [WYSIJA](http://www.wysija.com/review-newsletter-plugin-wordpress/) pour Newsletter

* [WP-Activity](http://wordpress.org/extend/plugins/wp-activity/) pour logger les actions des utilisateurs et rédacteurs (monitor and display users activity - logins, logon failures, new posts, new comments, etc - in backend and frontend of WordPress)

* [Twitter Cards](http://wordpress.org/extend/plugins/jm-twitter-cards/) pour insérer automatiquement des Twitter Cards à un WordPress

* [ACF](http://www.advancedcustomfields.com/) pour ajouter des champs riches aux posts / pages / Custom posts.

* [Adminimize](https://wordpress.org/plugins/adminimize/) - personnaliser l’aspect de l’admin en fonction des niveaux des utilisateurs

## E-commerce

Favoriser l’utilisation de WooCommerce qui est le plugin le plus actif (communauté, support) à l’heure actuelle. Il propose des feuilles de style par défaut, un système de coupon, gestion des stocks automatisé, gestion des e-mails client avancée, plein de hooks partout.

Il fonctionne également en multilingue avec [WPML](http://wpml.org/) (on a une licence, voir keepass) et en SEO avec [WP SEO by Yoast](http://yoast.com/wordpress/seo/).

* [WooCommerce](http://zfer.us/ydn0K) : le coeur

* [WC Delivery notes](http://wordpress.org/extend/plugins/woocommerce-delivery-notes/) : impression automatique de facture et bon de livraison

* [WC compare products](http://wordpress.org/extend/plugins/woocommerce-compare-products/) : pour permettre à l’utilisateur de comparer des produits

* [WC Payment Gateway](http://wordpress.org/extend/plugins/woocommerce-payment-gateway/) : need SSL pour fonctionner, accepte tout système de paiement par carte

* [Top 10 WooCommerce Themes](http://www.webdesigndev.com/inspiration/top-10-woocommerce-themes) (2013)

# Frameworks/thèmes

* [http://www.layerswp.com/](http://www.layerswp.com/)

* Divi [http://www.elegantthemes.com/gallery/divi/](http://www.elegantthemes.com/gallery/divi/)

* [http://vc.wpbakery.com/](http://vc.wpbakery.com/)

* [http://premium.wpmudev.org/blog/10-drag-and-drop-page-builders-wordpress/](http://premium.wpmudev.org/blog/10-drag-and-drop-page-builders-wordpress/)

* [WooThemes](http://www.woothemes.com/)

* [ElegantThemes](http://www.elegantthemes.com/)

* [ThemeForest](http://themeforest.net/)

* X-Theme

# Snippets et astuces

Cheatsheets : [http://www.smashingapps.com/2013/06/26/17-useful-wordpress-cheat-sheets.html](http://www.smashingapps.com/2013/06/26/17-useful-wordpress-cheat-sheets.html)

### Forcer la mise à jour par téléchargement direct

Dans wp-config.php

define('FS_METHOD' 'direct');

### Désactiver les notifications de mise à jour pour les non-admins

(à placer dans functions.php)

/**

 * Remove update notification for non admin users

 */

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

### Mise en prod

#### Méthode requêtes SQL brut

UPDATE wp_posts SET guid = replace(guid, 'http://www.old-domain.com','http://www.new-domain.com');

UPDATE wp_posts SET post_content = replace(post_content, 'http://www.old-domain.com', 'http://www.new-domain.com');

UPDATE wp_options SET option_value = replace(option_value, 'http://www.old-domain.com', 'http://www.new-domain.com') WHERE option_name = 'home' OR option_name = 'siteurl';UPDATE wp_options SET option_value = replace(option_value, 'http://www.old-domain.com', 'http://www.new-domain.com') WHERE option_name LIKE '%widget%';

#### Méthode conseillée

Voir [http://codex.wordpress.org/Moving_WordPress](http://codex.wordpress.org/Moving_WordPress)

Sinon tester : [http://pixelentity.com/wordpress-search-replace-domain/](http://pixelentity.com/wordpress-search-replace-domain/) 

### Lister les pages d’un même type de template de page

Permet de lister des pages utilisant un même template de page. Seule contrainte : le fichier de template de page doit être à la racine du thème (depuis WordPress 3.5 il est possible de mettre les templates dans un sous-dossier, ben il vaut mieux éviter de le faire ! )

$last_pages = new WP_Query(array(

   'posts_per_page'    		 => 3,

   'post_type'    		 => 'page',

   'orderby'   			 => 'date',

   'order'   			 => 'DESC',

   'meta_key'   			 => '_wp_page_template',

   'meta_value'   		 => 'page-slug.php',

   'no_found_rows'   		 => true,    // @opti if no need pagination

   'update_post_term_cache'    => false,   // @opti

   'update_post_meta_cache'    => false    // @opti

 ));if ( $last_pages -> have_posts() ) : //etc.

### Désactiver le warning d'update WP sur l'admin (si non admin)

if ( !current_user_can( 'edit_users' ) ) {

	add_action('admin_menu','wphidenag');

	function wphidenag() {

		remove_action( 'admin_notices', 'update_nag', 3 );

	}

}

### Logo personnalisé admin

function login_logo() {

   echo '<style type="text/css">h1 a { background-image:url('.get_bloginfo('template_directory').'/img/logo_neurex_admin.png) !important;height: 137px!important; }</style>';

}

add_action('login_head', 'login_logo');

### Ajouter des custom post types dans la recherche

/**

 * This function modifies the main WordPress query to include an array of

 * post types instead of the default 'post' post type.

 *

 * @param object $query  The original query.

 * @return object $query The amended query.

 */

function tgm_io_cpt_search( $query ) {

    if ( $query->is_search ) {

      $query->set( 'post_type', array( 'page', 'post', 'annuaire' ) );

    }

    return $query;

}

add_filter( 'pre_get_posts', 'tgm_io_cpt_search' );

### Désactiver le menu admin "Liens"

add_action( 'admin_menu', 'my_admin_menu' );

  function my_admin_menu() {

  remove_menu_page('link-manager.php');

}

### Renommer les fichiers à l’upload

function make_good_filename_upload($filename) {

if(preg_match('/^[0-9]{4}\_[0-9]{2}\_[0-9]{2}\_(.*)/i',$filename)) return $filename;

    return date('Y_m_d_').$filename;

}

add_filter('sanitize_file_name', 'make_good_filename_upload', 10);

### Désactiver les flux RSS

function disable_all_feeds() {

  wp_die( __('Les flux sont désactivés, rendez-vous sur <a href="'. get_bloginfo('url') .'"></a>') );

}

add_action('do_feed', 'disable_all_feeds', 1);

add_action('do_feed_rdf', 'disable_all_feeds', 1);

add_action('do_feed_rss', 'disable_all_feeds', 1);

add_action('do_feed_rss2', 'disable_all_feeds', 1);

add_action('do_feed_atom', 'disable_all_feeds', 1);

### Supprimer des styles (h1 et h2 par ex.) dans l'éditeur WYSIWYG

add_filter('tiny_mce_before_init', 'juiz_custom_block_select');

if ( !function_exists('juiz_custom_block_select')) {

  function juiz_custom_block_select($settings) {

  // on retire `adress`, `h1` et `h2`

    $settings['theme_advanced_blockformats'] = 'p,pre,h3,h4,h5,h6';

    return $settings;

  }

}

### Modifier le menu Format

Permet d'enlever h1 et h2 du menu par exemple et de supprimer des boutons comme Justifier.

Voir le code de [http://wordpress.org/support/topic/tinymce-formatting-options-remove-h1-h1-pre#post-1310072](http://wordpress.org/support/topic/tinymce-formatting-options-remove-h1-h1-pre#post-1310072)

### Ajouter et personnaliser le menu Styles

[http://alisothegeek.com/2011/05/tinymce-styles-dropdown-wordpress-visual-editor/](http://alisothegeek.com/2011/05/tinymce-styles-dropdown-wordpress-visual-editor/) La méthode 2 est AWESOME. Fait appel à functions.php et editor-style.css pour ajouter et personnaliser le menu Styles dans l'éditeur de base de WordPress. À ajouter dans functions.php d'après l'article : (voir commentaires derrière certaines valeurs)

add_filter( 'mce_buttons_2', 'alsa_mce_buttons_2' );

add_filter( 'tiny_mce_before_init', 'alsa_mce_before_init' );

add_editor_style();

function alsa_mce_buttons_2( $buttons ) {

  array_unshift( $buttons, 'styleselect' );

  return $buttons;

}

function alsa_mce_before_init( $settings ) {

   $style_formats = array(

   	array(

   		'title' => 'Button',

   		'selector' => 'a', // Ne s'appliquera que sur les liens existants sélectionnés

   		'classes' => 'button' // Lui ajoute une classe button

   	),

       array(

       	'title' => 'Callout Box',

       	'block' => 'div', // ajoutera un div (type block)

       	'classes' => 'callout', // avec class .callout

       	'wrapper' => true // autour de ce qui est sélectionné (à vérifier: rôle précis de block et wrapper)

       ),

       array(

       	'title' => 'Bold Red Text',

       	'inline' => 'span', // ajoutera un span qui est de type inline

       	'styles' => array( // ajoutera un attribut style en ligne (pouah mais c'est pour l'exemple)

       		'color' => '#f00',

       		'fontWeight' => 'bold' // écriture JS, pas CSS (c'est encodé en JSON plus bas)

       	)

       )

   );

 

   $settings['style_formats'] = json_encode( $style_formats );

 

   return $settings;

}

**editor-style.css (exemple) :**

a.button {

   background-color: pink;

}

 

div.callout {

   border: 4px double black;

}

Voir aussi :

* [http://www.webcitizenmag.com/2010/05/22/how-to-add-your-own-styles-to-the-wordpress-editor-dropdown/](http://www.webcitizenmag.com/2010/05/22/how-to-add-your-own-styles-to-the-wordpress-editor-dropdown/)

* [http://www.sycha.com/wordpress-assign-custom-css-classes-visual-editor](http://www.sycha.com/wordpress-assign-custom-css-classes-visual-editor)

* [http://codex.wordpress.org/Plugin_API/Filter_Reference/mce_css](http://codex.wordpress.org/Plugin_API/Filter_Reference/mce_css) qui permet d'ajouter une CSS supplémentaire (pour un plugin ? Un thème a déjà editor-style.css) qui peut être un fichier dynamique .php

### MailPress

Attention un bug pour les sites qui utilisent des noms de tables MySQL différents, il faut patcher MailPress_post.php

/* ALSA Patch */global $wpdb;$orderby = ' FIELD('.$wpdb->posts.'.ID, ' . implode(',', $MP_post_ids) . ')';/* /ALSA */

### Transfert d’un thème avec OptionTree

#### Installation du site

1. Créer une Base de données

2. Injecter la base de données avec le bon chemin (url absolue du nom de domaine)

3. Transférer les fichiers (par ftp ou autres) à la racine de hébergement (ou l'endroit de destination du site)

4. Modifier le fichier wp-config.php (accès à la Base de données)

5. Se connecter au Back-office, désactiver les permaliens pour test (Réglages -> permaliens -> Valeur par défaut)

6. Le site est en ligne mais il faut encore charger les préférences du thème (diaporama, sidebar...)

#### Importation des préférences du thème

1. Installer le plugin OptionTree :[ http://wordpress.org/extend/plugins/option-tree/](http://wordpress.org/extend/plugins/option-tree/)

2. Dans le backoffice, cliquer sur Option Tree -> Import

3. copier coller le contenu de settings.txt dans le textarea "Settings" puis cliquer sur "Import Settings"

4. copier coller le contenu de theme-options.txt dans le textarea "Settings" puis cliquer sur "Import Theme Options"

5. Le diaporama, les préférences, les barres latérales sont revenues !

#### Vérifier les widgets

Normalement tout est activé, il arrive que certain Widget disparaisse durant un transfère. Genre les widgets textes !

Snippets utiles

[http://wordpress.stackexchange.com/questions/1567/best-collection-of-code-for-your-functions-php-file](http://wordpress.stackexchange.com/questions/1567/best-collection-of-code-for-your-functions-php-file) 

## Réunion WP du 14.09.2016

Bedrock + Raccoon => pas besoin de versionner le CMS

Raccoon pratique pour créer un template spécifique grâce à un manifest.json

Kycof = installation WP basique => Versionner le thème enfant

Ne pas versionner tout le WP car trop lourd pour le .git => et git reset : faille de sécurité.

Thèmes par défaut à virer.

Composer.json => avec bedrock pour récupérer les plugins 

	Conséquence installer les plugins par ligne de commande mais en prod installer un wordpress classique

Thème toujours indépendant du WP et les plugins aussi

Si pas hébergé chez nous : pour la prod installation classique "à la mano" (WP + thèmes + plugins)

composer require *nomdeplugin* (à la racine)

Pour plugin payant => Les extensions fournissent le code nécessaire à mettre dans le composer.json

WPML (extension payante) => Polylang (extension gratuite)

Mettre la doc, pour comment kon fé pour avoir la même base de donnée => wp-config.php mettre l’IP local

1- Bedrock met en place le coeur WP et on l’isole dans un sous-dossier 

	versionner la config du Bedrock (répertoire wp et .env car fichier sensible sont en gitignore)

	Update wp sur chaque machine, être synchro (?)

2- Raccoon est propre au thème

	Clarifie le functions.php via le manifest.json et évite ainsi de recopier les mêmes lignes de codes d’un projet à l’autre

	Manifest.json => faire un starter (?) thème ([http://underscores.me/](http://underscores.me/))

Liens fantômes (symboliques) =>> pour les uploads : ll -s source destination >> Sous Windows cela ne fonctionne pas. (command subst)

Ou sinon installer un plugin de base interne qui installerait un image docker qui accueillerait toutes les images.

Thème acheté = > Pas de bedrock si pas de plugin à installer, sinon oui. Et versionner thème enfant si modification du thème.

## **Nouveau projet WP**

Pré-requis :

* Avoir installer composer sur sa machine

Procédure :

1. Lancer la cmd pour mettre en place WordPress via Bedrock : composer create-project roots/bedrock

2. Renommer le dossier "Bedrock"

3. Création du repo WP sur Gitlab

    1. Ne pas oublier de créer plusieurs branches ! develop et recette

4. Cloner le repo sur votre machine en local

5. Créer la base de donnée sur Mykiwi.alsacreations.fr

6. Editer le .env.example et l’enregistrer .env (serveur local :)

7. Mettre en place le .gitignore des[ guidelines](https://docs.google.com/document/d/1g1rjutr5X7ndJo4R4pzd6QXTt6GB2mfCgseTqwRIRNE/edit#)

### Utilisation URL de production en local via Wamp

Ajouter une redirection vers l’URL de prod depuis Wamp

#### Modifier les hosts de votre serveur local Apache

Ouvrir le fichier : C:/wamp/apache/bin/extra/httpd-vhost et ajouter les lignes suivantes :

<VirtualHost *:80>	ServerName www.urldeproduction.fr	

DocumentRoot c:/wamp/votrecheminenlocal/web	

<Directory  "c:/wamp/votrecheminenlocal/web/">    	

Options +Indexes +FollowSymLinks +MultiViews    	

AllowOverride All	

</Directory>

</VirtualHost>

#### Ajouter l’URL à votre machine Windows

Ouvrir le fichier : C:/windows/system32/drivers/etc/.hosts et ajouter les lignes suivantes :

# Nomduprojet localhost 2016

127.0.0.1 www.urldeproduction.fr

## **Nouveau projet WP**

**Pré-requis :**

* Avoir installer composer sur sa machine

**Procédure :**

1. Lancer la cmd pour mettre en place WordPress via Bedrock : composer create-project roots/bedrock

2. Renommer le dossier "Bedrock" avec le nom de votre projet

3. Initialisation du repo Gitlab au-préaliable créé

    1. Ne pas oublier de créer plusieurs branches ! develop et recette

4. Créer la base de donnée sur Mykiwi.alsacreations.fr

5. Editer le .env.example et l’enregistrer en .env (serveur kiwi : 192.168.0.1)

6. Mettre en place le .gitignore des[ guidelines](https://docs.google.com/document/d/1g1rjutr5X7ndJo4R4pzd6QXTt6GB2mfCgseTqwRIRNE/edit#)

### Utilisation URL de production en local via Wamp

Ajouter une redirection vers l’URL de prod depuis Wamp

#### Modifier les hosts de votre serveur local Apache

Ouvrir le fichier : C:/wamp/apache/bin/extra/httpd-vhost et ajouter les lignes suivantes :

<VirtualHost *:80>	ServerName www.urldeproduction.fr	

DocumentRoot c:/wamp/votrecheminenlocal/web	

<Directory  "c:/wamp/votrecheminenlocal/web/">    	

Options +Indexes +FollowSymLinks +MultiViews    	

AllowOverride All	

</Directory>

</VirtualHost>

#### Ajouter l’URL à votre machine Windows

Ouvrir le fichier : C:/windows/system32/drivers/etc/.hosts et ajouter les lignes suivantes :

# Nomduprojet localhost 2016

127.0.0.1 www.urldeproduction.fr

