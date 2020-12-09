# Guidelines : WorkFlow

_Statut : Working Draft (WD)_

## Organisation globale et outils

### Git

* Tous les projets sont versionnés par Git.
* La notation des versions (tags) sera sous la forme : version majeure . version mineure . correctifs mineurs. Exemple: `v1.3.37`
* On utilise les branches
  * `master` : principale, destinée à la mise en production
  * `develop` : mise en commun des développements
  * `feature/xxx` : par fonctionnalités

### Dépendances

#### NPM

NPM est utilisé pour l’installation et la mise à jour des dépendances (par défaut dans un dossier `/node_modules`, avec la liste dans `packge.json`).

Les dépendances, optionnelles dans un projet, désignent l’ensemble des ressources externes (par exemple produites par d’autres développeurs, disponibles sur Github, etc). Il peut s’agir de codes JavaScript, de feuilles de styles CSS, d’icon-font, de polyfills, de KNACSS, etc.

Il est possible de proposer un numéro de version évolutif tout en interdisant une mise à jour majeure à l'aide du signe `^`. Par exemple `"gulp-sass": "^2.2.0",` autorise la mise à jour vers `2.x.x` mais pas vers `3.x.x`.

#### Automatisation de tâches

Pour les projets d'application exploitant un framework tel que Vue.js, **webpack** est inclus dans le projet.

Pour les projets d'intégration statique **Gulp** est utilisé pour automatiser les tâches courantes :

- minification des fichiers js (gulp-uglify)
- minification des fichiers css (gulp-csso)
- préprocesseur Sass (gulp-sass)
- concaténation tous types (gulp-concat)
- renommage (gulp-rename)
- sourcemaps (gulp-sourcemaps)
- autoprefixer (gulp-autoprefixer)
- compression des images (avec imagemin, pour jpeg, png, svg)
- En bonus : browser-sync

#### Préprocesseurs

L’emploi de préprocesseurs (Sass, autoprefixer...), destinés à automatiser certaines tâches pourra être justifié selon les projets et les besoins de maintenabilité.

### Versions des dépendances

Éviter d'utiliser le mot-clé _"latest"_, par contre on choisit le dernier numéro de version au début d'un projet puis on ne change plus en cours de projet (sauf exceptions).
