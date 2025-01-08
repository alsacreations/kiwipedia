# Checklist mise en production et finalisation

## Avant

- [ ] Le CMS et ses extensions sont à jour
  - Y compris `composer.json` et `package.json`
- [ ] Backup de l'ancien site
- Si refonte et blog/actus : penser à faire un tour la veille de la mise en ligne pour prendre en compte les derniers ajouts sur le blog
- Si refonte et migration : préparer/gérer la réécriture/redirection des URLs
- Les métadonnées HTML sont présentes dans `<head>`
- Les [microdonnées](../guidelines/html.md#microdata) sont exploitées
- Le fichier [manifest.json](https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/manifest.json) est présent, même minimaliste

## Pendant

- [ ] Configuration de l'hébergement via le panel d'administration
  - Certificat HTTPS
  - Alias éventuels (domaine avec/sans www)
  - Base de données associée
  - Pointage vers le dossier racine du projet (ex: app/public/)
- [ ] Transfert des fichiers et de la base de données
- [ ] Vérifier le fonctionnement en modifiant *temporairement* le fichier `/etc/hosts` local avec l'adresse IP de l'hébergement (exemple `312.13.42.37 www.domaine.fr`)
- [ ] Modifier le pointage de la zone DNS vers la nouvelle adresse IPv4 et IPv6 (si changement d'hébergement)
- [ ] Les clés d'API temporaires (ex : Maps) sont remplacées par celles de production / du client
  - Les réseaux sociaux sont bien ceux du client (si demandé)
- Si WordPress
  - [ ] Modifier les URLs de recette production avec [WP Migrate DB](https://wordpress.org/plugins/wp-migrate-db/)
  - [ ] Changer l'adresse e-mail superadmin (ou avec l'adresse officielle du client)
  - [ ] Configurer les envois e-mail via SMTP ou extension [WP Mail SMTP](https://fr.wordpress.org/plugins/wp-mail-smtp/)
  - [ ] Supprimer les comptes de test, les pages test
  - [ ] Formulaires : enlever les mails de test
  - [ ] Désactiver le mode debug / fichier .env

## Après

- [ ] Le site est enregistré sur [Google Search Console](https://search.google.com/search-console/)
- [ ] La disponibilité du site est monitorée (par Uptime Kuma)
- [ ] On n'empêche plus le site d'être référencé de manière publique en bloquant avec htaccess ou robots.txt (cas par défaut dans WordPress)
- [ ] Derniers backups, et vérification de l'existence d'un backup automatique
- [ ] Si WordPress : installer SecuPress et améliorer le score
- [ ] Tous les accès/identifiants sont enregistrés
- [ ] La procédure de mise en ligne est à jour dans le Wiki/Readme
- [ ] Si le projet est suivi en maintenance, les informations sont renseignées dans une liste Clickup
- [ ] Résilier l'ancien hébergement, le cas échéant

- Performance et sécurité
  - Ajustements de sécurité front-end (après test avec [MDN Observatory](https://developer.mozilla.org/en-US/observatory) par exemple)
  - Un contrôle performance est réalisé (poids global et délai de réponse devtools)
  - Les fichiers ont une date d'expiration HTTP et/ou il y a un cache activé
