# Guidelines : Visual Studio Code

L'Éditeur de code recommandé pour HTML, CSS, PHP, JS est [Visual Studio Code](https://code.visualstudio.com/). Il est libre (son noyau), gratuit et bénéficie de nombreuses mises à jour. Un package réellement libre est [VSCodium](https://vscodium.com/) (absence de la télémétrie Microsoft et utilisation d'un autre store d'extensions).

## Suivi de Qualité de code

Visual Studio Code dispose de vérificateurs de qualité (Linters) par défaut, au minimum dans les langages suivants&nbsp;: PHP, CSS, SCSS. La configuration par défaut de Visual Studio Code est préservée au maximum.

Toujours vérifier les erreurs et warnings déclarés par les **linters** dans la console de Visual Studio Code.

Le **formatage** (indentation, espaces ou tabulations, lignes vides, etc.) est consigné dans le fichier `.editorconfig` et appliqué via `.prettierrc` (activer, si souhaité, `"editor.formatOnSave": true` dans les settings de Visual Studio Code).

## [Raccourcis incontournables](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference)

- `⌘⇧P` (`Ctrl+Shift+P` sur Windows) : Show Command Palette (permet de lancer une tâche d'un plugin)
- `⌘P` (`Ctrl+P`) : _Quick Open_, _Go to File_ : recherche rapide de fichiers dans le projet
- `⌘⇧F` (`Ctrl+Shift+F`) : _Find_ : rechercher dans le projet
- `⌥⌘F` (`Ctrl+H`) : _Replace_ : remplacer dans le projet
- `⌘,` (`Ctrl+,`) : _Settings_ : paramètres

## Extensions Visual Studio Code

### Extensions indispensables (tous projets)

- Général
  - [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager)
- Qualité / Linting / Formatage
  - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) (pour imposer un formatage de syntaxe commun à tous, avec configuration via `.editorconfig`)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (pour appliquer le formatage, avec configuration via `.prettierrc`)
  - [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) (Linter pour Markdown)
- CSS / SCSS
  - [SCSS Intellisense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss) (autocomplétion SCSS : classes, variables, etc.)

### Extensions recommandées

- Git
  - [Gitlens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
  - [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
- Qualité / Linting / Formatage
  - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
  - [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) (très pratique pour JS / React / Vue)
- Divers
  - [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)
  - [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

### Extensions suggérées

- [French Language Pack](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-fr)
- [highlight-matching-tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [Select highlight in minimap](https://marketplace.visualstudio.com/items?itemName=mde.select-highlight-minimap)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

### Extensions spécifiques ou avancées

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) pour Vue.js
- Partial Diff
- Git History
- PHP Debug
- PHP Intellisense
- phpcs

### Extensions spécifiques par projets

Dans Visual Studio Code un fichier `.vscode/extensions.json` liste les extensions recommandées du projet (voir <https://twitter.com/j_niewczas/status/1284157199741157376>)

Exemple :

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "EditorConfig.EditorConfig",
    "mrmlnc.vscode-scss"
  ]
}
```

## Astuces

- `editor.minimap.renderCharacters = false`, et la minimap devient plus belle
- `explorer.openEditors.visible = false`, car on voit déjà les fichiers ouverts dans les onglets

## Créer un snippet personnalisé (ex. “schnapsit”)

1. Dans le menu : `Code -> Preferences -> User Snippets` (ou `Fichier -> Préférences -> Extraits Utilisateur`)
2. Choisir l’option `"New Global Snippets File"` (sauf s’il y a déjà un fichier de snippets global)
3. Donner un nom au fichier, par exemple `"schnapsum"`
4. Récupérer le code source (cliquer sur “raw”) de ce Gist : <https://gist.github.com/raphaelgoetter/152a21e85c5310bcb5eec132983fce27>
5. Le coller dans le fichier (remplacer tout le code déjà existant par le Gist)
6. Enregistrer

Usage :

- aller dans n’importe quel fichier,
- taper “sch” ou “schnaps” puis Tabulation
- 3 choix sont proposés : version courte, moyenne ou longue
- valider le choix avec Entrée
- Enjoy!
