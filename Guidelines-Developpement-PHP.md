# Guidelines PHP / MySQL

_Statut : Working Draft (WD)_

* On suit [https://www.php-fig.org/psr/psr-12/](PSR-12: Extended Coding Style)

## Généralités

- L’encodage des fichiers et des bases de données doit se faire en UTF-8 (sans BOM).
- Les indentations se font à l’aide d'espaces.
  Pour assurer une cohérence inter-projets, utiliser la convention [EditorConfig](http://editorconfig.org/).
- La numérotation des versions suit [Semantic Versioning](http://semver.org/)

## Garder à l’esprit

- DRY : Don't Repeat Yourself : Utiliser au maximum des fonctions (même très simples) pour stocker le code exécuté à différents endroits
- KISS : Keep it simple, stupid : Penser simple
- Modulaire : Quand on développe une feature : pouvoir la désactiver (= option)
- Commenter son code
- Vérifier s’il n’y a pas déjà un code existant qui fait déjà le travail
- Ne pas modifier le noyau des cms/extensions pour supporter les mises à jour
- Toujours penser à la sécurité !

![faites simple](images/php01.png)

Source : https://xkcd.com/1319/ (Automation)

## PHP

Conventions générales :

- [http://www.phptherightway.com/](http://www.phptherightway.com/)
- [http://www.php-fig.org/psr/](http://www.php-fig.org/psr/) (de 1 à ?, en anglais a priori)

Les balises fermantes `?>` doivent être omises en fin de fichier pour éviter la production d’espaces indésirables entre différents scripts. Dans la mesure du possible, un commentaire peut être ajouté signifiant la fin du fichier, afin de déterminer si celui-ci n’a pas été tronqué.

**Incorrect :**

```
<?php
echo "Hello!";
?>
```

**Correct :**

```
<?php
echo "Hello!";

// Fin de monfichier.php
// Emplacement: ./chemin/vers/monfichier.php
```

### Variables, constantes et classes

Les variables sont rédigées en minuscules, les termes séparés par underscore.

```
$str
$buffer
$group_id
$last_city
```

Les constantes sont rédigées exclusivement en majuscules ainsi que les mots-clés booléens

```
PUBLIC_URL
TRUE
FALSE
NULL
```

Les noms de classes doivent débuter par une majuscule. Les méthodes doivent être écrites en minuscules avec des termes séparés par underscore.

```
class Super_class {
  function __construct() {
  }
  function get_file_properties() {
  }
}
```

### Commentaires

Pour les brefs commentaires, le double slash est privilégié.

```
// Une ligne de commentaire

// Une deuxième ligne
```

Pour les descriptions de fonctions, le style DocBlock peut être utilisé.

```
/**

 * Rôle de la fonction
 *
 * @access	public
 * @param	string
 * @return	string
 */

function xml_encode($str) {
}
```

### Indentation et instructions

L’indentation utilise les espaces, il n’y a pas plus d’une instruction par ligne.

### Chaînes de texte

Pour des raisons de performance, les chaînes de texte sont délimitées par des apostrophes simples, sauf exception possible pour éviter l’échappement dans les requêtes SQL nécessitant des guillemets internes simples.

```
'Mon texte'
"SELECT * FROM table WHERE champ = 'valeur'"
```

### Valeurs par défaut

Spécifier des valeurs par défaut pour les arguments de fonction évite des appels incomplets et permet des solutions de repli rapides.

```
function kiwi($val1 = '', $val2 = FALSE)
```

En cas de gestion des erreurs avec des try/catch, toujours mettre en derniers les valeurs qui ont une value définie par défaut.

```
function kaki($val1, $val2 = FALSE)
```

### Sécurité

Quelques critères essentiels sont à observer (parmi d’autres, la liste est non exhaustive) :

- Suivre les recommandations de l'OWASP pour éviter les failles XSS (Cross Site Scripting) https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
- Utiliser les fonctions d’échappement pour valider les données utlisateur, avant traitement ou insertion dans la base de données.
  - MySQL : [mysql_real_escape_string](http://php.net/manual/fr/function.mysql-real-escape-string.php) pour les chaînes de texte.
  - [preg_quote](http://php.net/manual/fr/function.preg-quote.php) pour les expressions régulières.
  - MySQL : Utiliser les fonctions de PDO quand c’est possible pour [échapper](http://www.php.net/manual/fr/pdostatement.bindparam.php) ou [préparer une requête](http://www.php.net/manual/fr/pdo.prepare.php).
- Vérifier toutes les variables trouvées dans `$_REQUEST`, `$_POST`, `$_GET` et `$_COOKIE` avant usage.
- Vérifier précautionneusement les fichiers envoyés en upload s'il y a lieu (types MIME, extensions, noms, etc).
- Eviter de manipuler des fichiers et des chemins d’accès au filesystem, ainsi que des fonctions d’exécution de code (`eval`, `system`, `exec`, etc).
- Utiliser un framework PHP tel que CodeIgniter qui sécurise par défaut quantité d’actions.

### Données

- Tester et valider les expressions régulières (regexp) avec https://regex101.com/ (entre autres).

## Composer

Utilisation de https://getcomposer.org/ pour la gestion des dépendances PHP.

Fichier de configuration : `composer.json`

Initialiser de manière interactive le projet `composer init`

Installer un paquet et le sauvegarde dans le fichier de configuration `composer require [nom du paquet]`

Désinstalle la dépendance `composer remove [nom du paquet]`

Met à jour les dépendances `composer update`

## MySQL

### Nommage

Les noms des tables doivent être explicites. Les noms des champs associés doivent être préfixés par le nom de la table pour faciliter la lecture et l'écriture de requêtes avec jointures, s'ils ne sont pas assortis du nom de table.

```
Table users :
user_id
user_email
user_email_archive
user_status
```

### Types de champs

<table>
  <tr>
    <td>Usage</td>
    <td>Type à privilégier</td>
  </tr>
  <tr>
    <td>Booléen</td>
    <td>TINYINT</td>
  </tr>
  <tr>
    <td>Valeur numérique entière</td>
    <td>TINYINT à BIGINT selon la taille prévue</td>
  </tr>
  <tr>
    <td>Chaîne de texte simple</td>
    <td>CHAR(x)</td>
  </tr>
  <tr>
    <td>Choix limités</td>
    <td>ENUM</td>
  </tr>
  <tr>
    <td>Valeur décimale</td>
    <td>DECIMAL</td>
  </tr>
  <tr>
    <td>Année</td>
    <td>YEAR</td>
  </tr>
  <tr>
    <td>Date et heure</td>
    <td>DATETIME</td>
  </tr>
  <tr>
    <td>Timestamp Unix</td>
    <td>INT</td>
  </tr>
  <tr>
    <td>Texte et contenu</td>
    <td>TEXT</td>
  </tr>
</table>

### Index et performance

Afin d’améliorer la performance :

- Des index doivent être placés sur les champs servant dans les requêtes SELECT (au moins celles-là).
- Examiner la performance de ces requêtes et l'usage des index avec l'instruction EXPLAIN https://dev.mysql.com/doc/refman/5.7/en/execution-plan-information.html
- Dans le cas de jointures, les champs mis en relation (d’une table à l’autre) doivent être de même type (par exemple `INT` avec `INT` et non `INT` avec `MEDIUMINT`).
- Faire attention au type de table utilisé (MyISAM vs InnoDB).

### Requêtes SQL

Tous les mots clés doivent être rédigés en majuscules, et les requêtes longues peuvent être décomposées en plusieurs lignes avec un retour avant chaque mot clé.

```
$query = $this->db->query("
SELECT foo, bar, foofoo, foobar AS raboof, foobaz
FROM table
WHERE foo != 'oof'
ORDER BY foofoo
LIMIT 5, 100");
```

## Serveur et performance

Afin d’améliorer la réactivité de chargement et l’évaluation des performances par les moteurs de recherche, des bonnes pratiques sont à considérer :

- Configurer la mise en cache des fichiers (notamment JS, CSS, images) avec les en-têtes HTTP Expires ou Cache-Control.
- Configurer la compression des fichiers (textes, JS, CSS, HTML) et leur minification (gzip, deflate et autres algorithmes).

### Outils de diagnostic

- L’onglet Network/Réseau et Timeline des outils de développement navigateur
- [PageSpeed](https://developers.google.com/speed/pagespeed/insights/)

### Références

- [https://css-tricks.com/performance-tools/](https://css-tricks.com/performance-tools/)
- [Web Performance best practices](https://developers.google.com/speed/docs/insights/rules) (Google)

## Sitemap

Un fichier sitemap est placé à la racine du site et contient des références vers les pages les plus importantes du site ainsi que leur fréquence de mise à jour pour faciliter leur indexation par les moteurs de recherche. Des extensions pour CMS (WordPress, etc) existent pour générer automatiquement ce fichier.
