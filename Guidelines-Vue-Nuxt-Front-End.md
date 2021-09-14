# Guidelines : Vue.js, Nuxt et Front-End en général

_Statut : Working Draft (WD)_

Cette présente convention rassemble les bonnes pratiques "Vue.js, Nuxt et Front-End" en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Environnement de code HTML, CSS, JavaScript

L'Éditeur de code recommandé pour HTML, CSS, PHP, JS est [Visual Studio Code](https://code.visualstudio.com/). Il est libre (son noyau), gratuit et bénéficie de nombreuses mises à jour. Voir les [Guidelines VScode](Guidelines-VScode.md) pour plus d'informations.

## Extensions Visual Studio Code recommandées

Pour les projets de type Vue et Nuxt, la liste des extensions VScode utile est composée de : Editorconfig, ESlint, Stylelint, Markdownlint, Vetur, SCSS Intellisense, Tailwind CSS IntelliSense, todo-highlight.

Fichier d'extensions `extensions.json` à placer à la racine du projet au sein d'un dossier `/.vscode` ([afficher/télécharger ce fichier](assets/vue-nuxt-front-end/.vscode/extensions.json))

```yaml
{
  "recommendations": [
    "EditorConfig.EditorConfig",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint",
    "DavidAnson.vscode-markdownlint",
    "mrmlnc.vscode-scss",
    "octref.vetur",
    "mikestead.dotenv",
    "bradlc.vscode-tailwindcss",
    "wayou.vscode-todo-highlight"
  ]
}
```

## Linters

Les différents fichiers de configuration des Linters sont :

- EditorConfig : cf. `.editorconfig`
- ESLint : cf. `.eslintrc.js`
- Stylelint : cf. `.stylelintrc` (voir détails plus loin)
- *Note : Prettier crée des conflits avec ESLint (ex. sauts de ligne dans les balises). Il est donc recommandé de le désactiver sur les projets Vue/Nuxt.*

La configuration fournie dans le fichier `/.vscode/settings.json` permet de :

- Définir ESLint comme linter/formateur par défaut
- De corriger automatiquement les erreurs ESLint lors de la sauvegarde du fichier
- De désactiver les linters natifs VSCode CSS et scss et d'activer Stylelint uniquement pour éviter certains conflits.

([Afficher/télécharger ce fichier](assets/vue-nuxt-front-end/.vscode/settings.json))

```yaml
{
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "stylelint.enable": true,
  "css.validate": false,
  "scss.validate": false
}
```

### Editorconfig

Editorconfig impose un formatage (espace vs tabs) et des règles de syntaxe directement dans l'éditeur, ainsi ce dernier s'adapte à chaque projet.

La configuration de Editorconfig se fait via un fichier `.editorconfig` à la racine du projet. ([Afficher/télécharger ce fichier](assets/vue-nuxt-front-end/.editorconfig))

### ESlint

ESLint est un analyseur de code pour identifier les problématiques trouvés dans le code JavaScript (Vue, React, etc.) et les résoudre automatiquement.

ESlint est configuré via un fichier `.eslintrc.js`).

Il est étendu aux fichiers HTML à l'aide d'un plugin installé via `npm install eslint-plugin-html --save-dev` et ajouté dans le fichier de configuration ESlint ainsi :

```yaml
"plugins": [
  "html"
],
```

([Afficher/télécharger le fichier `.eslintrc.js`](assets/vue-nuxt-front-end/.eslintrc.js)).

### Stylelint

Stylelint est l'unique formatteur pour les styles CSS et scss du projet. <br>Les Linters natifs CSS et scss de VSCode **doivent être désactivés** (voir précédemment).

La configuration recommandée de Stylelint est récupérée dans le projet via `npm install stylelint-config-recommended --save-dev`

Stylelint pour Nuxt est installé via `npm install --save-dev stylelint`.

([Afficher/télécharger le fichier `stylelint.config.js`](assets/vue-nuxt-front-end/stylelint.config.js)).

### Prettier

Prettier est un formateur de syntaxe permettant d'assurer une consistance tout au long du projet (sauts de ligne, guillemets simples ou doubles, etc.).

**Note : Prettier crée des conflits avec ESLint (ex. sauts de ligne dans les balises). Il est donc recommandé de le désactiver sur les projets nécessitant ESlint.**

### Markdownlint

Markdownlint est un linter pour langage Markdown et prend en compte toutes les règles à appliquer sur les fichiers `.md` notamment les fichiers `readme.md` présents dans chaque projet.

### Vetur

Ensemble d'outils Vue pour VSCode (coloration, linter).

Vetur nécessite un fichier `jsconfig.json` dont voici un exemple :

```yaml
{
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "~/*": ["./*"],
    "@/*": ["./*"],
    "~~/*": ["./*"],
    "@@/*": ["./*"]
  }
},
"exclude": ["node_modules", ".nuxt", "dist"]
}
```

## Installation initiale

### Installation Nuxt

Doc : <https://nuxtjs.org/docs/2.x/get-started/installation>

```yaml
npm init nuxt-app
```

Réponses recommandées aux questions :

- Programming language: JavaScript
- Package manager: Npm
- UI framework: au choix ou None si on ajoute Tailwind autrement
- Modules: Axios si usage d'API
- Linting tools : EsLint (PAS Prettier) + Stylelint
- Testing: None ou selon projet
- Rendering mode: SSR/SSG
- Deployment target: selon projet
- Development tools : jsconfig.json
- Continuous integration: None
- Version control system: Git

### Installation Tailwind dans Nuxt

Doc : <https://tailwindcss.com/docs/guides/nuxtjs>

### Internationalisation (i18n)

Usage de <https://nuxt-community.github.io/nuxt-i18n/> avec fichiers de configuration des langues (par exemple `i18n/fr-FR.js` et `i18n/en-US.js`) organisant les chaînes par une structure objet. On privilégie les regroupements par fonctionnalité (ex : formulaires, boutons, actions utilisateur communes), puis par nom de composant s'ils sont plus spécifiques.

- En tant que texte brut dans un balisage HTML : `<legend>{{ $t('identSignin.createAccount') }}</legend>`
- En tant que valeur de prop/attribut : `:placeholder="$t('formInput.lastname')"`
- En tant que valeur dans script : `title: this.$t('result.title')`
- En tant que condition : `v-if="$i18n.locale == 'fr'"`
- Lien racine : `<nuxt-link :to="localePath('/')">`

Pour des formatages plus complexes voir <https://kazupon.github.io/vue-i18n/guide/formatting.html#html-formatting>

### Pratiques permises par Nuxt

- Routage automatique (fichiers placés dans `pages/`) <https://nuxtjs.org/docs/2.x/get-started/routing>
- Layouts (dossier `layouts/`) <https://nuxtjs.org/docs/2.x/directory-structure/layouts>
- Gestion des erreurs avec `error.vue` <https://nuxtjs.org/docs/2.x/concepts/views#error-page>
- Auto-import des composants <https://fr.nuxtjs.org/docs/2.x/configuration-glossary/configuration-components>
- Transitions full-page

Exécution du code en front ou en back (SSR) : vérifier `process.client` ou `process.server`

### Hooks

- asyncdata
- fetch

### Extensions

- Nuxt Content <https://content.nuxtjs.org/fr/>
