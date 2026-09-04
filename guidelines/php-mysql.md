# PHP / MySQL

> Statut : stable · Niveau : avancé

Conventions **spécifiques à Alsacréations** pour PHP et MySQL. Les bonnes pratiques génériques (PSR-12, casse par type de symbole — voir [Conventions de nommage](naming-conventions.md) —, typage systématique des paramètres/retours, syntaxe moderne `??`/`?->`/`match`/arguments nommés, guard clauses, namespaces + autoload PSR-4, durcissement sécurité standard OWASP — requêtes préparées, hachage de mot de passe, cookies sécurisés, échappement contextuel — clés étrangères/contraintes d'intégrité…) ne sont **pas** reprises ici&#8239;: elles sont déjà appliquées par défaut. Ce document ne liste que ce qui distingue nos projets d'un projet PHP/MySQL standard — à appliquer sans qu'il soit nécessaire de le redemander.

---

## PHP

### Outillage imposé

> ✅ **Par défaut** — `declare(strict_types=1);` en toute première ligne de chaque fichier PHP.

- Analyse statique&#8239;: [PHPStan](https://phpstan.org/) niveau 6 minimum (Psalm en repli si besoin).
- Lint/format&#8239;: PHPCS ou PHP-CS-Fixer sur PSR-12.
- Montées de version&#8239;: [Rector](https://github.com/rectorphp/rector) plutôt qu'une réécriture manuelle.
- Logs structurés en production avec [Monolog](https://github.com/Seldaek/monolog), `display_errors=Off`.
- VS Code&#8239;: extension [Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client), `"editor.formatOnSave": true`, `"php-cs-fixer.useCache": true`.

### Style de fichier

- Pas de balise fermante `?>` en fin de fichier — évite les espaces indésirables entre scripts inclus. À la place, un commentaire de fin de fichier avec son chemin, pour repérer un fichier tronqué&#8239;:

```php
<?php
echo "Hello!";

// Fin de monfichier.php
// Emplacement: ./chemin/vers/monfichier.php
```

- Apostrophes simples par défaut (`'texte'`)&#8239;; guillemets doubles réservés à l'interpolation contrôlée (`"Bonjour $prenom"`). Heredoc/nowdoc pour les blocs de texte, jamais de concaténation en boucle.
- Commentaires&#8239;: code auto-documenté en priorité. [DocBlocks](https://docs.phpdoc.org/guide/getting-started/what-is-a-docblock.html) réservés aux API publiques, exceptions et invariants — jamais de `@param`/`@return` redondants avec les types natifs déjà présents dans la signature.

```php
/**
 * Encode une chaîne au format XML.
 * @throws \RuntimeException si l'encodage échoue
 */
function xmlEncode(string $str): string
{
    // ...
}
```

- Ne jamais modifier le noyau d'un CMS ou d'une extension pour le faire correspondre à un besoin projet — passer par les hooks/filtres/overrides prévus, sous peine de casser les futures mises à jour.

### Composer

- Committer `composer.lock` en plus de `composer.json`.
- `composer audit` régulièrement ; contraintes de version en caret (`^`) ; fixer la version PHP cible du projet via `config.platform.php`.

## MySQL

### Nommage

Noms de tables explicites, sans abréviation. Ne pas préfixer systématiquement les colonnes par le nom de la table&#8239;: préférer des noms clairs, des alias SQL et s'appuyer sur les clés étrangères. Exemple&#8239;: `users(id, email, status, created_at)`. Mots-clés SQL en MAJUSCULES, identifiants en `snake_case`.

### Types de champs imposés

| Usage | Type à privilégier |
| --- | --- |
| Charset/collation | `utf8mb4` / `utf8mb4_0900_ai_ci` |
| Moteur | InnoDB (jamais MyISAM) |
| Booléen | `BOOLEAN`/`TINYINT(1)` |
| Monétaire | `DECIMAL(p,s)` — jamais `FLOAT`/`DOUBLE` |
| Choix limités | Table de référence + FK, pas `ENUM` (maintenance difficile) |
| Données semi-structurées | `JSON`, avec parcimonie |
| Date/heure | `DATETIME` en UTC (large plage) ; `TIMESTAMP` si auto-update/zone limitée |
| Timestamp Unix | `INT UNSIGNED` |

### Index et performance

- Index sur les champs utilisés en `WHERE`/jointures, composites dans l'ordre de sélectivité des prédicats ; viser le covering index, éviter `SELECT *`.
- Vérifier l'usage réel des index avec [`EXPLAIN`](https://dev.mysql.com/doc/refman/8.4/en/execution-plan-information.html) et le [slow query log](https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html), pas seulement à la conception.
- Éviter les fonctions sur colonnes indexées dans un `WHERE` — préférer une colonne dérivée/générée.
- Pagination&#8239;: éviter les `OFFSET` élevés, préférer la keyset pagination (`WHERE id > ? ORDER BY id LIMIT ?`).
- Jointures&#8239;: les colonnes mises en relation doivent être du même type exact (`INT` avec `INT`, pas `INT` avec `MEDIUMINT`).

```php
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
```

### Migrations

Versionner le schéma via des migrations (Doctrine Migrations, Laravel Migrations) plutôt que des altérations manuelles en production.

---

## Voir aussi

- [Conventions de nommage](naming-conventions.md) — Casse par langage, indentation.
- [WordPress](wordpress/README.md) — Stack PHP/MySQL spécifique.
- [Sécurité HTTP](http-security.md) — En-têtes, CSP, sécurisation côté serveur.
- [Performances](performances.md) — Optimisations back-end.
- [RGPD](rgpd.md) — Stockage et traitement des données personnelles.
