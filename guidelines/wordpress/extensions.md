# WordPress : Extensions

👉 Installation : utiliser `composer require` avec le nom du plugin préfixé par _wpackagist-plugin/_ : par exemple `composer require wpackagist-plugin/wp-migrate-db`

👉 Toute fonctionnalité développée sur-mesure pour le projet se fait dans le cadre d'une extension propre à activer/désactiver.

- Documentation officielle : [Plugin Handbook](https://developer.wordpress.org/plugins/)
- Modèles : [WordPress Plugin Template](https://github.com/hlashbrooke/WordPress-Plugin-Template) ou [WordPress Plugin Boilerplate Generator](https://wppb.me/)

## Obligatoires / fortement recommandées

- [WP fail2ban](https://wordpress.org/plugins/wp-fail2ban/) si hébergement interne équipé de [fail2ban](https://github.com/fail2ban/fail2ban/) permettant de signaler les erreurs d'identification pour bannir les adresses IP tentant du bruteforce ; n'utilisez alors pas d'extension pour changer l'url de wp-admin.
- [WP Migrate Lite](https://fr.wordpress.org/plugins/wp-migrate-db/) pour migrer les données de local > dev > recette > prod (et inversement), à désinstaller par sécurité après mise en production.
- [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/) ou [WP Fastest Cache](https://fr.wordpress.org/plugins/wp-fastest-cache/) ou [WP Super Cache](https://fr.wordpress.org/plugins/wp-super-cache/) : cache/compression de contenu pour améliorer les temps de réponse.
- [SecuPress](https://fr.wordpress.org/plugins/secupress/) pour améliorer le score global (permissions de fichiers, bonnes pratiques).
- [Disable emojis](https://fr.wordpress.org/plugins/disable-emojis/) : désactiver les appels de scripts externes vers WordPress (RGPD).
- [Disable comments](https://wordpress.org/plugins/disable-comments/) : désactiver les commentaires sur les posts/pages/médias, au choix (très propre).
- [ACF](https://www.advancedcustomfields.com/) : ajouter des champs riches aux posts / pages / CPT.

## Formulaires (extensions)

- [Ninja Forms](https://fr.wordpress.org/plugins/ninja-forms/) : génération de formulaires, partiellement accessible.
- [Contact Form 7 par Julie Moynat](https://github.com/juliemoynat/contact-form-7/releases), fork accessible de [Contact Form 7](https://fr.wordpress.org/plugins/contact-form-7/).
- [hCaptcha](https://fr.wordpress.org/plugins/hcaptcha-for-forms-and-more/) s'intègre très bien à de nombreuses autres extensions (dont WooCommerce, WpForms, NinjaForms)

## E-mails (SMTP)

Pour fiabiliser l'envoi des e-mails sortants (notifications, formulaires, etc.) et éviter qu'ils ne soient considérés comme du spam, il est recommandé de ne pas utiliser la fonction `mail()` de PHP mais de configurer un envoi via SMTP, possible avec des extensions :

- [WP Mail SMTP](https://fr.wordpress.org/plugins/wp-mail-smtp/) (payante pour certains services tiers tels que Microsoft)
- [FluentSMTP](https://fr.wordpress.org/plugins/fluent-smtp/)

> [!NOTE]
> Sur certains hébergements managés (ex: Infomaniak), le port 465 peut être bloqué. Il faut alors utiliser le port 587.

Ces extensions permettent de se connecter à un serveur SMTP ou à des services/API tiers spécialisés (Brevo, Postmark, SparkPost, etc.) dont certains proposent un niveau gratuit.

> [!IMPORTANT]
> Pour utiliser un service tiers, il est indispensable de configurer la zone DNS du domaine pour ajouter les enregistrements SPF, DKIM et DMARC nécessaires, autorisant ainsi le service à envoyer des e-mails au nom de votre domaine.

## Multilangue

- [Polylang](https://fr.wordpress.org/plugins/polylang/) : traduction, gestion des liens dans les différentes langues, menu de choix de langue (remplace WPML).

## SEO

- [SEOPress](https://www.seopress.org/fr/) : SEO, ou [Yoast](https://fr.wordpress.org/plugins/wordpress-seo/) (rajoute une grosse surcouche de pub très intrusive dans l'admin).

## Interface d'administration

- [Utiliser SVG dans WordPress](https://wordpress.org/plugins/svg-support/)
- [Filebird](https://wordpress.org/plugins/filebird/) : File Manager (s'ajoute dans la galerie de médias) : créer des dossiers. Attention, il faut prendre la version premium pour créer des dossiers illimités.
- [Duplicate Post](https://wordpress.org/plugins/duplicate-post/) : créer du contenu rapidement en dupliquant d'un simple clic un post, une page, ou un custom post.
- [Adminimize](https://wordpress.org/plugins/adminimize/) : personnaliser l'aspect de l'admin en fonction des niveaux des utilisateurs. || [Hook natif](https://developer.wordpress.org/reference/functions/remove_menu_page/) : supprimer les items du menu (pour un rôle spécifique, vérifier le rôle avec fonction [current_user_can](https://developer.wordpress.org/reference/functions/current_user_can/)).
- [Simple Page Ordering](https://wordpress.org/plugins/simple-page-ordering/) : ordonner les pages, et autres CPT ordonnés, par simple glisser/déposer, sans avoir besoin de rentrer dans chaque page.
- [WP All Export](https://wordpress.org/plugins/wp-all-export/) : exporter les données au format CSV/XML (fonctionne avec ACF, The Events Calendar) fonctionne aussi pour l'import avec [WP All Import](https://wordpress.org/plugins/wp-all-import/)
- [Admin Columns](https://wordpress.org/plugins/codepress-admin-columns/) : ajouter/modifier des colonnes dans l'interface d'administration

## Membres et droits

- [Members](https://wordpress.org/plugins/members/) : Droits et utilisateurs.
- [User Switching](https://wordpress.org/plugins/user-switching/) : switcher facilement d'utilisateur.
- [Peters-login-redirect](https://wordpress.org/plugins/peters-login-redirect/) : redirection des utilisateurs après connexion, ou [Hook natif](https://developer.wordpress.org/reference/hooks/login_redirect/).
- [Custom Login](https://wordpress.org/plugins/custom-login/) : personnaliser la page de login. || [Tuto avec Hooks natifs](https://codex.wordpress.org/Customizing_the_Login_Form)

## Divers

- [WP Maintenance](https://fr.wordpress.org/plugins/wp-maintenance/) : page de maintenance configurable.
- [FooGallery](https://wordpress.org/plugins/foogallery/) : galeries et albums photos, configurable et propre côté administration sans trop de publicité intrusive.
- [Photo gallery](https://fr.wordpress.org/plugins/photo-gallery/) (Galerie de médias, photos et vidéos) + riche en fonctionnalités que la galerie native (img s'ouvrent dans une popup, slider, bouton de téléchargement, création de groupes de galeries, etc…). N'est pas accessible : fenêtre modale qui ne prend pas le focus, pas d'attributs aria, bouton de fermeture non accessible.
- [Job Manager](https://fr.wordpress.org/plugins/wp-job-manager/) : Offres d'emploi.
- [Tarteaucitron](https://tarteaucitron.io/fr/install/) || [Cookie Notice](https://fr.wordpress.org/plugins/cookie-notice/) : bannières cookies, code non accessible (boutons qui n'en sont pas, etc.).
- [Relevanssi](https://wordpress.org/plugins/relevanssi/) : améliore les résultats de recherche par critères de pertinence.
- [Multiple Domain Mapping on Single Site](https://fr.wordpress.org/plugins/multiple-domain-mapping-on-single-site/) pour faire correspondre différentes Pages (d'accueil) à plusieurs domaines ou sous-domaines.
- [Advanced Editor Tools](https://wordpress.org/plugins/tinymce-advanced/) ajoute un bloc "paragraphe classique" à Gutenberg.
- [Layout Grid Block](https://wordpress.org/plugins/layout-grid/) ajoute une grille de mise en page (en colonnes), avec gestion de breakpoints ; n'est plus maintenu suite au FSE.
- [Mailpoet](https://wordpress.org/plugins/mailpoet/) solution de newsletter, campagne e-mailing, avec templates et support optionnel de WooCommerce.

## E-commerce

- [WooCommerce](https://woocommerce.com/) : la solution idéale (communauté, support) avec feuilles de style par défaut, un système de coupon, gestion des stocks automatisé, gestion des e-mails client avancés, plein de hooks.
- [WOOF](https://fr.wordpress.org/plugins/woocommerce-products-filter/) : Filtres plus riche en fonctionnalités que ceux de WooCommerce natif
- [Tickera](https://tickera.com/) : Vente de billets, compatible avec WooCommerce.
