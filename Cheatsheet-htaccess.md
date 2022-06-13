# Cheatsheet htaccess (rewriting, redirections...)

Compilation rapide d'instructions à utiliser dans un fichier .htaccess pour le serveur Apache (équipé de [mod_rewrite](https://httpd.apache.org/docs/2.4/fr/rewrite/)).

## Bloquer l'accès à une ressource

```htaccess
RedirectMatch 404 .git
RedirectMatch 404 /spip/
```

## Rediriger HTTP vers HTTPS

```htaccess
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]
```

## Redirections

```htaccess
RedirectPermanent /home /?lang=en [L]
```

Vers un site externe

```htaccess
RedirectPermanent /formations https://formations.example.org/ [L]
```

Ajouter un slash final (il faut utiliser un regexp ici, un simple /ecrire provoquera une boucle infinie)

```htaccess
RedirectPermanent "^/ecrire$" /ecrire/ [L]
```

Suppprimer un slash final

```htaccess
RedirectMatch "^\/notre-societe\/$" "/notre-societe" [L]
```

Rediriger un chemin

```htaccess
RedirectMatch "^\/spip\/(.*)" "/autre/chemin/$1" [L]
```

Un domaine (ou un ensemble de domaines) vers un autre

```htaccess
RewriteEngine on
RewriteCond %{HTTP_HOST} ^alsacreations.fr [OR]
RewriteCond %{HTTP_HOST} ^www.alsacreations.fr
RewriteRule ^(.*)$ https://www.alsacreations.com/$1 [R=301,NC,L]
```

## Réécriture

```htaccess
RewriteEngine on
```

On ignore la query string qui vient après `?` dans la règle.

```htaccess
RewriteRule "^spip.php$" /home/www/spip/spip.php [L]
# Va aussi répondre à spip.php?article3 ou spip.php?page=truc
```

Un chemin

```htaccess
RewriteRule ^img/(.*)$ /home/www/autre/chemin/img/$1 [L]
```

Une url

```htaccess
RewriteRule ^notre-societe$ /home/www/autre/spip/notre-societe [L]
```

Tout réécrire sauf une condition

```htaccess
RewriteCond %{REQUEST_URI} !^/spip\.php.*
RewriteRule ^(.*)$ /home/www/wordpress/public/$1 [L
```

## WordPress

Fichier-type par défaut

```htaccess
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

## Robots : empêcher l'indexation

```htaccess
Header set X-Robots-Tag "noindex, noarchive"
```
