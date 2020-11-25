# Guidelines : Visual Studio Code

_Statut : Candidate Recommendation (CR)_

L'Éditeur de code recommandé pour HTML, CSS, PHP, JS est [Visual Studio Code](https://code.visualstudio.com/). Il est libre (son noyau), gratuit et bénéficie de nombreuses mises à jour. Un package réellement libre est [VSCodium](https://vscodium.com/) (absence de la télémétrie Microsoft et utilisation d'un autre store d'extensions).

## [Raccourcis incontournables](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference)

- `⌘⇧P` (`Ctrl+Shift+P` sur Windows) : Show Command Palette (permet de lancer une tâche d'un plugin)
- `⌘P` (`Ctrl+P`) : _Quick Open_, _Go to File_ : recherche rapide de fichiers dans le projet
- `⌘⇧F` (`Ctrl+Shift+F`) : _Find_ : rechercher dans le projet
- `⌥⌘F` (`Ctrl+H`) : _Replace_ : remplacer dans le projet
- `⌘,` (`Ctrl+,`) : _Settings_ : paramètres

## Extensions Visual Studio Code

Des outils automatiques permettant de vérifier la qualité du code produit de manière continue sont nécessaires dans une équipe&nbsp;:

- Pour ne pas écrire de code obsolète et avoir à gérer des bugs ou de la dette technique par la suite
- Pour connaître les bonnes pratiques dès le départ
- Pour harmoniser la syntaxe lorsque plusieurs personnes agissent sur les mêmes documents

Visual Studio Code dispose de vérificateurs de qualité (Linters) par défaut, au minimum dans les langages suivants&nbsp;: CSS, SCSS et PHP. La configuration par défaut de Visual Studio Code doit être préservée au maximum pour éviter les conflits sur des postes différents.

### Extensions indispensables ❤️

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) (respect configuration tabs vs spaces à l'insertion, encodage, eol, etc)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (vérification syntaxe JavaScript)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) (vérifie la syntaxe CSS d'après un ensemble de règles)
- [SCSS Intellisense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss) (autocomplétion SCSS : classes, variables, etc.)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (reformatage du code d'après une configuration précise)
- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) (vérification syntaxe Markdown)

### Extensions fortement recommandées ⭐

- [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) (si vous jonglez entre plusieurs projets, c'est un must)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) (autocomplétion des chemins)
- [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css) (autocomplétion et documentation des balises+attributs)
- [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion) (autocomplétion des classes HTML)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) (fonctions avancées Git dans VS Code)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) (affiche les erreurs des linters directement dans la fenêtre de code)

### Extensions suggérées 👍

- [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) (remise en forme, à la demande, d'un code mal indenté/formaté)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) (support de la syntaxe des fichiers .env)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) (fermeture automatiques des balises)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) (très pratique pour JS / React / Vue)
- [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug)
- ~~[Auto rename tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) (modifie les balises ouvrantes/fermantes en synchronisation)~~ natif avec le paramètre `editor.renameOnType`

Confort visuel :

- [French Language Pack](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-fr)
- [Select highlight in minimap](https://marketplace.visualstudio.com/items?itemName=mde.select-highlight-minimap) (sélection visible dans la minimap)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) (mise en avant des `TODO:` et `FIXME:`)
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) (mise en avant de l'accolade fermante correspondante en CSS)
- [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) (coloration des niveaux d'indentation)
- [highlight-matching-tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag) (mise en avant de la balise fermante correspondante en HTML)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) (mieux visualiser les types de fichiers dans l'arborescence)
- [Statusbar Error](https://marketplace.visualstudio.com/items?itemName=JoeBerria.statusbarerror) (affiche les erreurs des linters dans la barre basse et/ou dans la gouttière)
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) (version graphique des branches Git)

### Extensions spécifiques ou avancées

- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) : Surveille automatiquement les modifications de fichiers Sass dans le projet et les compile en CSS (ainsi qu'en version minifiée `.min.css`).
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) : L'extension Live Server ouvre un serveur local dans une page du navigateur, rafraîchie automatiquement.
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) (pour Vue.js)
- [Partial Diff](https://marketplace.visualstudio.com/items?itemName=ryu1kn.partial-diff)
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
- [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)
- [PHP Intellisense](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-intellisense)
- [phpcs](https://marketplace.visualstudio.com/items?itemName=ikappas.phpcs)

## Extensions détaillées

#### [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

Editorconfig impose un formatage (espace vs tabs) et des règles de syntaxe directement dans l'éditeur, ainsi ce dernier s'adapte à chaque projet.

La configuration de Editorconfig se fait via un fichier `.editorconfig` placé à la racine du projet dont voici un exemple recommandé&nbsp;:

```js
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

#### [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Prettier est un formateur de syntaxe permettant d'assurer une consistance tout au long du projet (sauts de ligne, guillemets simples ou doubles, etc.).

Prettier applique les consignes d'Editorconfig et peut être lui-même configuré via un fichier `.prettierrc` à la racine du projet.
À la différence d'Editorconfig, Prettier ne modifie pas les réglages natifs de l'IDE, il ne fait qu'appliquer les règles lors de son application (activer, si souhaité, `"editor.formatOnSave": true` dans les settings de Visual Studio Code).

Prettier, intégré dans un Workflow, peut également empêcher la validation de code ou le commit dans Git.

Exemple recommandé de fichier `.prettierrc` :

```json
{
  "endOfLine": "lf",
  "semi": false,
  "arrowParens": "always",
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "overrides": [
    {
      "files": ["*.css", "*.scss"],
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

#### [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

ESLint est un analyseur de code pour identifier les problématiques trouvés dans le code JavaScript (Vue, React, etc.) et les résoudre automatiquement.

L'extension VS Code ESlint avec ses réglages de base (sans configuration particulière) est suffisante dans la plupart des cas.

Au sein d'un Workflow, et lorsque des paramètres avancés sont nécessaires, ESlint est configuré via un fichier `.eslintrc`).

#### [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

Stylelint est un linter CSS (SCSS, LESS) apportant une configuration plus fine que les linters natifs de VS Code.

L'extension VS Code Stylelint avec ses réglages de base (sans configuration particulière) est suffisante dans la plupart des cas.

Au sein d'un Workflow, et lorsque des paramètres avancés sont nécessaires, Stylelint est configuré via un fichier `.stylelintrc`) qui permet alors par exemple d'appliquer des fonctionnalités telles que la correction de l'ordre d'affichage des propriétés CSS (plugin `stylelint-order`).

#### [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

Markdownlint est un linter pour langage Markdown et prend en compte toutes les règles à appliquer sur les fichiers `.md` notamment les fichiers `readme.md` présents dans chaque projet.

### Extensions recommandées par projet

Dans Visual Studio Code un fichier `.vscode/extensions.json` liste les extensions recommandées du projet (voir <https://twitter.com/j_niewczas/status/1284157199741157376>)

Exemple :

```json
{
  "recommendations": ["esbenp.prettier-vscode", "EditorConfig.EditorConfig", "mrmlnc.vscode-scss"]
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
