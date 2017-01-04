# Guidelines : WorkFlow

_Quelques bonnes pratiques pour un WorkFlow de production_

## Généralités

* L’encodage des fichiers et des bases de données doit se faire en UTF-8 (sans BOM).
* Les indentations se font à l’aide de deux espaces et non sous forme de tabulations.
Pour assurer une cohérence inter-projets, utiliser la convention [EditorConfig](http://editorconfig.org/).

## Organisation globale et outils

### Git

Tous les projets sont versionnés sur Git.

La notation des versions (tags) sera sous la forme : version majeure . version mineure . correctifs mineurs. Exemple: `v1.3.37`

### Dépendances

#### NPM

NPM est utilisé pour l’installation et la mise à jour des dépendances (par défaut dans un dossier `/node_modules`).

Les dépendances, optionnelles dans un projet, désignent l’ensemble des ressources externes (par exemple produites par d’autres développeurs, disponibles sur Github, etc). Il peut s’agir de codes JavaScript, de feuilles de styles CSS, d’icon-font, de polyfills, de KNACSS, etc.

_**Note :** Yarn est un excellent gestionnaire de dépendances également._

#### Éditeurs

Voici la liste des éditeurs de code communément adoptés :

* Atom.io
* Sublime Text (2 ou 3)
* Brackets.io
* Visual Studio Code

#### Automatisation de tâches

**Gulp** est utilisé pour automatiser les tâches courantes :

* minification des fichiers js (gulp-uglify)
* minification des fichiers css (gulp-csso)
* préprocesseur Sass (gulp-sass)
* concaténation tous types (gulp-concat)
* renommage (gulp-rename)
* sourcemaps (gulp-sourcemaps)
* autoprefixer (gulp-autoprefixer)
* compression des images (avec imagemin, pour jpeg, png, svg)
* En bonus : browser-sync

## Nouveau Projet

### Projet type

L'outil de création d’un projet-type, **"Bretzel"**, se trouve sur Github à l’adresse [https://github.com/alsacreations/bretzel](https://github.com/alsacreations/bretzel)

Il est prévu pour fonctionner automatiquement avec les outils suivants :

* Gulp
* Sass
* KNACSS

### Nouveau projet

* Création d'un dossier au nom du projet
* récupérez **Bretzel** :
    * grâce au plugin npm [bretzel-start](https://github.com/alsacreations/bretzel-start) ❤
    * ou bien en enregistrant le `.zip`
    * ou au pire via `npm install alsacreations/bretzel`
* lancez `npm install` (ou `npm update`) pour installer les plugins gulp nécessaires et les dépendances (KNACSS et jQuery par défaut)
* Créer un dépôt Git

### EditorConfig

Afin d’assurer une consistance entre notre éditeur HTML et notre convention d’espaces / tabulations pour chaque projet :

* Installer le [plugin EditorConfig](http://editorconfig.org/#download) correspondant à notre éditeur
* Ajouter un fichier [.editorconfig](http://editorconfig.org/) à la racine du projet, dont le contenu sera :

```
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
```

# Méthodologie d’intégration

Les outils ci-après sont contenus dans le prototype de nouveau projet [Bretzel](https://github.com/alsacreations/bretzel)[ ](https://github.com/alsacreations/bretzel)(sur Github)

## Préprocesseurs

L’emploi de surcouches préprocesseurs (LESS, Sass, Stylus), destinées à automatiser certaines tâches pourra être justifié selon les projets et les besoins du clients. Il ne sera cependant pas systématique, chacun de nos intégrateurs ayant suffisamment de compétences pour disposer d’outils annexes.

Si le choix d’un préprocesseur est justifié, nous opterons par défaut pour **Sass** plutôt que LESS.

### Versions des dépendances

Éviter d'utiliser le mot-clé _"latest"_, par contre on choisit le dernier numéro de version au début d'un projet puis on ne change plus en cours de projet (sauf exceptions).

Il est possible de proposer un numéro de version évolutif tout en interdisant une mise à jour majeure à l'aide du signe `^`. Par exemple `"gulp-sass": "^2.2.0",` autorise la mise à jour vers `2.x.x` mais pas vers `3.x.x`.

### Gulp

Notre outil d’environnement de développement front-end est **[Gulp](http://gulpjs.com/)** pour [NodeJS](https://www.npmjs.com/).

Deux utilisations sont possibles :

* à distance sur le serveur par SSH
* en disque local sur son poste (avec la ligne de commande)

Ne pas utiliser la ligne de commande locale sur le partage de fichiers distant

#### Usage direct sur le serveur distant

* Se connecter en SSH sur le serveur de développement
* Aller dans le répertoire du projet avec la commande cd (ex : `cd /var/www/`)
* Utiliser les commandes habituelles de gulp


#### Usage local avec disque local

* si vous n’avez pas Gulp installé sur votre machine :
    * si `package.json` existe,  alors installer gulp ainsi : `npm install --save-dev gulp`
    * si `package.json` n’est pas présent, le créer d’abord : `npm init`
    * pour installer Gulp sans créer de `package.json` (normalement on ne le fait pas) : `npm install gulp`
* pour installer les plugins gulp nécessaires :
    * l’un après l’autre :  `npm install <gulp-*>` (`*` = nom du plugin)
    * tous d’un coup (via `package.json`) : `npm install`
    * (voire `npm upgrade` pour tous les modules manquants listés dans `package.json`)
* (note : pour installer gulp en global sur sa machine, une fois pour toutes (précéder de `sudo` sur Mac OS X) : `npm install -g gulp`)

La configuration de Gulp se trouve au sein des fichiers :

* `package.json` (liste des plugins : minify, autoprefixer, Sass, etc.)
* `gulpfile.js` (liste des tâches)

#### Commandes

* `gulp` (équivalent à gulp default, qui est lié aux tâches suivantes communes)
* `gulp styles` : génération des styles à partir des pré-processeurs
* `gulp scripts` : génération des scripts
* `gulp watch` : exécution des tâches communes précédentes lorsqu’un fichier change

#### Guide pour reprendre un projet

* `git pull` (récupération des fichiers du repository)
* `npm install` (installation des nouveau modules gulp présents dans `package.json` - le dossier `node_modules` n’étant normalement pas versionné.)
* `gulp` , `gulp styles` ou `gulp watch` (tâches classiques gulp)
