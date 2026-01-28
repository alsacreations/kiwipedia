# WordPress : Sécurité

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
