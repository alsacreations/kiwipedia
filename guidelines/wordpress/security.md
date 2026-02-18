# WordPress : Sécurité

Ce que nous faisons (dans les grandes lignes) pour les projets, à des degrés divers en fonction du temps alloué.

## Mesures à prendre avant le développement ⌚

* 📤 Prévoir des backups côté hébergement (qu'est-ce qu'on backup, à quel rythme, vers où)
* 🚨 Ne pas choisir/retenir d'extensions WordPress peu maintenues, exotiques ou sensibles du côté sécurité

## Mesures à prendre durant le développement ⌨️

* 🐘 Usage des dernières versions des langages et outils PHP, WordPress, MariaDB/MySQL
* 🐳 Développement en conteneurs Docker pour les isoler (données, réseau)
* 🕵️ Supprimer l'utilisateur **admin** et l'utilisateur avec l'ID 1. Créer un utilisateur de niveau administrateur avec identifiant spécifique différent de “admin”.
* ♻️ Mises à jour régulières

### Back-end

* Aucun mot de passe versionné dans le projet (usage de fichiers `.env`)
* Utilisation des protocoles chiffrés TLS et HTTPS
* Utilisation de GitLab/GitHub privé avec clés SSH ed22519

Analyse du code

* Des dépendances JavaScript avec `pnpm audit`
* Suivi des alertes des dépendances à l'aide de `composer audit`
* Audit statique PHP à l'aide de phpstan : `composer phpstan`
* [Gemini CLI](/Guidelines-IA.md#gemini-cli) pour vérifier l'ensemble d'un dossier thème

### À la fin du développement

Renforcer la sécurité **front-end** avec <https://github.com/alsacreations/kiwipedia/blob/main/guidelines/http-security.md> : gestion des en-têtes HTTP permettant d'éviter l'exploitation de failles XSS / code front-end. En général, avec WordPress nous obtenons une note [MDN Observatory](https://developer.mozilla.org/en-US/observatory) de `B` (par défaut `F`). Il est rarement possible de faire mieux et d'atteindre `A` car c'est une limitation de l'usage d'un CMS en général qui autorise les extensions à ajouter du code *inline* dans les pages.

### Hébergement

* Accès via clés SSH pour intervention en ligne de commande ou déploiement d'un projet
* Infomaniak (si cet hébergeur est retenu) [https://news.infomaniak.com/securite-datacenters/](https://news.infomaniak.com/securite-datacenters/) a une excellente réputation en matière de sécurité

## Sécurité du thème WordPress

Résumé priorisé (risques fréquents dans les thèmes)

* 🔴 Critique : exécution de code arbitraire / inclusion de fichiers non contrôlée, upload de fichiers non sécurisé, injection SQL via requêtes non préparées.
* 🟠 Élevé : XSS (sortie non échappée) depuis ACF / champs utilisateurs, endpoints AJAX/REST sans vérification de nonce ou capacités.
* 🟡 Moyen : CSRF sur formulaires/actions d'administration, fuite d'informations debug (WP_DEBUG affiché).
* ⚪️ Faible : dépendances JS/PHP vulnérables, mauvaises politiques CORS, utilisation d'anciennes API WordPress.

### Code

Vérifications :

* Chercher fonctions dangereuses (eval, base64_decode, shell_exec,create_function, system, exec, popen, proc_open, etc.)
* Chercher utilisation directe de superglobales (entrée utilisateur non filtrée) : `$_GET`, `$_POST`, `$_REQUEST`, `$_COOKIE`, `$_FILES`
* Chercher requêtes SQL et `$wpdb` non préparées.
* Chercher endpoints AJAX / REST non sécurisés.
* Chercher opérations fichiers (upload, file_put_contents, move_uploaded_file, fopen, fwrite).
* Chercher affichage d'erreurs / `WP_DEBUG`

Fichiers prioritaires :

* functions.php, inc/, blocks-acf/: recherche de handlers AJAX, REST, uploads, requêtes DB, inclusions require/include.
* templates (index.php, single*.php, template-parts): sortie de champs ACF ou post meta — vérifier usage d'escapes.
* acf-json/: vérifier si des champs acceptent du HTML ; s'assurer que la sortie passe par les fonctions `wp_kses`/`wp_kses_post` si HTML est autorisé.
* assets/JavaScript : vérifier présence d'anciennes libs vulnérables (`pnpm audit`).

Correctifs recommandés

* Échapper toute sortie : esc_html(), esc_attr(), esc_url() selon contexte. Exemple : `echo esc_html( get_field('titre') );`
* Sanitize côté serveur pour entrées : sanitize_text_field(), sanitize_email(), intval(), wp_strip_all_tags(), wp_kses_post() pour HTML autorisé.
* AJAX : utiliser [check_ajax_referer()](https://developer.wordpress.org/reference/functions/check_ajax_referer/) et [current_user_can()](https://developer.wordpress.org/reference/functions/current_user_can/) ou permission_callback dans REST.
* Requêtes SQL : toujours `$wpdb->prepare()` avant exécution. Exemple :`$wpdb->get_row( $wpdb->prepare("SELECT * FROM $wpdb->posts WHERE ID = %d", $id) );`
* Uploads : utiliser [wp_handle_upload()](https://developer.wordpress.org/reference/functions/wp_handle_upload/), vérifier current_user_can('upload_files') et valider/limiter types MIME et extensions.
* REST routes : fournir permission_callback qui retourne current_user_can(...) ou vérifie un nonce.
* Éviter l'utilisation d'eval/base64_decode/inclusions dynamiques ; si usage nécessaire, justifier et restreindre.
* [User Name Security](https://wordpress.org/plugins/user-name-security/) supprime les mentions de l'utilisateur (id et username) dans `body_class()`, entre autres choses.
* [SF Author URL control](https://wordpress.org/plugins/sf-author-url-control/) personnalise le “author” et le slug utilisateur pour sécuriser et personnaliser les URL des pages auteur.
* Toujours utiliser [les nonces](https://css-tricks.com/wordpress-front-end-security-csrf-and-nonces/) pour éviter les [CSRF](https://fr.wikipedia.org/wiki/Cross-site_request_forgery), s'il faut développer des modules admin et/ou pour les utilisateurs identifiés sur le site.
* Dans tous les fichiers autres que `functions.php` et tous les fichiers de la template hierarchy (`index.php`, `page.php`, `single.php`, ...), on protège nos fichiers PHP contre l'accès direct

  ```php
  <?php
  if (!defined('ABSPATH')) {
      exit;
  }
    
  // Votre code ici...
  ```

## Mesures après la mise en ligne et autres ressources/outils

* Activer les backups côté hébergement et prévoir la technique de restauration en cas de besoin.
* Activer une extension de sécurité WordPress telle que [Wordfence](https://wordpress.org/plugins/wordfence/), [SecuPress](https://fr.wordpress.org/plugins/secupress/).
* Scanner vulnérabilités connues de thèmes/extensions avec [WPScan](https://wpscan.com/).
* Plugin Theme Check & WordPress Security Audit plugins (sur un environnement de test).
* phpcs + WordPress Coding Standards (détecte problèmes d'échappement et de sécurité).
* Bloquer les accès à wp-admin par adresse IP, 2FA.
* Définir qui/quand met à jour les extensions et WordPress, suit les alertes de sécurité PHP/WordPress/serveur.
* Surveiller les logs d'accès et d'erreurs pour détecter des anomalies (tentatives d'intrusion, erreurs 500, etc.)
* Créer un ou plusieurs utilisateurs de niveau **éditeur** pour les intervenants (doit être différent du nom de domaine pour des raisons de sécurité), ayant accès juste aux fonctionnalités utiles : ne pas utiliser de compte admin par défaut pour toutes les personnes car cela permet l'installation d'extensions.
* Désactiver l'édition du thème et des extensions en ligne dans wp-config.php `define('DISALLOW_FILE_EDIT', true);`

🔖 [Prévenir les injections SQL](https://www.smashingmagazine.com/2025/03/how-prevent-wordpress-sql-injection-attacks/)
