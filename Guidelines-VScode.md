# Guidelines : Visual Studio Code

Statut : Recommendation (REC)

L'Éditeur de code recommandé pour HTML, CSS, PHP, JS est [Visual Studio Code](https://code.visualstudio.com/). Il est libre (son noyau), gratuit et bénéficie de nombreuses mises à jour. Un package réellement libre est [VSCodium](https://vscodium.com/) (absence de la télémétrie Microsoft et utilisation d'un autre store d'extensions).

Cette présente convention rassemble les bonnes pratiques VS Code en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## [Raccourcis incontournables](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference)

- `⌘⇧P` (`Ctrl+Shift+P` sur Windows) : Show Command Palette (permet de lancer une tâche d'un plugin)
- `⌘P` (`Ctrl+P`) : _Quick Open_, _Go to File_ : recherche rapide de fichiers dans le projet
- `⇧⌘L` (`Ctrl+Shift+L`) : _Select all occurrences of current selection_ : sélectionne toutes les occurences d'un mot
- `⇧⌥↓` (`Shift+Alt + ↓`) : _Copy line down_ : duplique la ligne courante
- `⌘⇧F` (`Ctrl+Shift+F`) : _Find_ : rechercher dans le projet
- `⌥⌘F` (`Ctrl+H`) : _Replace_ : remplacer dans le projet
- `⌘,` (`Ctrl+,`) : _Settings_ : paramètres

🔖 Autres astuces <https://developer.mozilla.org/en-US/blog/vs-code-tips-tricks/>

## Extensions Visual Studio Code

Des outils automatiques permettant de vérifier la qualité du code produit de manière continue sont nécessaires dans une équipe&nbsp;:

- Pour ne pas écrire de code obsolète et avoir à gérer des bugs ou de la dette technique par la suite
- Pour connaître les bonnes pratiques dès le départ
- Pour harmoniser la syntaxe lorsque plusieurs personnes agissent sur les mêmes documents

Visual Studio Code dispose de vérificateurs de qualité (Linters) par défaut, au minimum dans les langages suivants&nbsp;: CSS, SCSS et PHP. La configuration par défaut de Visual Studio Code doit être préservée au maximum pour éviter les conflits sur des postes différents.

Lister les extensions : `code --list-extensions`

### Extensions indispensables ❤️

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) (respect configuration tabs vs spaces à l'insertion, encodage, eol, etc)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (vérification syntaxe JavaScript, TypeScript et frameworks)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) (vérifie la syntaxe CSS d'après un ensemble de règles, nécessite une installation de stylelint locale ou globale)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (formatage automatique des fichiers à la sauvegarde)
- [SCSS Intellisense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss) (autocomplétion SCSS : classes, variables, etc.)
- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) (vérification syntaxe Markdown)

### Extensions fortement recommandées ⭐

- [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) (si vous jonglez entre plusieurs projets, c'est un must)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (autocomplétion des classes Tailwind)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) (autocomplétion des chemins)
- [Volar](https://marketplace.visualstudio.com/items?itemName=vue.volar) (extension indispensable pour tout projet pour Vuejs / Nuxt)
- [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css) (autocomplétion et documentation des balises+attributs)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) (fonctions avancées Git dans VS Code)
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) (affichage de l'arbre de commits git)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) (affiche les erreurs des linters directement dans la fenêtre de code)
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) (commandes Docker facilitées et sidebar affichant containers/images/volumes/networks...)
- [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) (pour connexion SSH entre autres, contient déjà [Remote SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) et [Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers))

### Extensions suggérées 👍

- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) (affichage des TODO et FIXME colorés et en arborescence)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) (support de la syntaxe des fichiers .env)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) (fermeture automatiques des balises)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) (très pratique pour JS / React / Vue)
- [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug)
- ~~Auto rename tag~~ activer le paramètre natif (Ctrl+,) `linkedEditing` (modifie les balises ouvrantes/fermantes associées)

Confort visuel :

- [French Language Pack](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-fr)
- [Select highlight in minimap](https://marketplace.visualstudio.com/items?itemName=mde.select-highlight-minimap) (sélection visible dans la minimap)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) (mieux visualiser les types de fichiers dans l'arborescence)
- [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) (coloration des niveaux d'indentation)
- [highlight-matching-tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag) (mise en avant de la balise fermante correspondante en HTML)
- [Statusbar Error](https://marketplace.visualstudio.com/items?itemName=JoeBerria.statusbarerror) (affiche les erreurs des linters dans la barre basse et/ou dans la gouttière)
- [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) (visualisation et édition SQL-like fichiers CSV)

### Extensions spécifiques

- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) : Surveille automatiquement les modifications de fichiers Sass dans le projet et les compile en CSS (ainsi qu'en version minifiée `.min.css`).
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) : L'extension Live Server ouvre un serveur local dans une page du navigateur, rafraîchie automatiquement.
- [i18n Ally](lokalise.i18n-ally) pour les projets Vue/Nuxt avec internationalisation
- [Partial Diff](https://marketplace.visualstudio.com/items?itemName=ryu1kn.partial-diff)
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)

### PHP

Configurer le chemin vers l'exécutable PHP `php.validate.executablePath` dans les paramètres.

- [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)
- [PHP Intellisense](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-intellisense) ou [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)
- [phpcs](https://marketplace.visualstudio.com/items?itemName=ikappas.phpcs)
- [PHPDoc Comment](https://marketplace.visualstudio.com/items?itemName=rexshi.phpdoc-comment-vscode-plugin)

## Configuration des extensions et linters

Pour tous les types de projets, ajouter un dossier `.vscode/` à la racine, contenant :

- un fichier [.vscode/extensions.json](assets/.vscode/extensions.json) listant les extensions recommandées pour le projet
- un fichier [.vscode/settings.json](assets/.vscode/settings.json) contenant les réglages pour (dés)activer les linters

Les détails de configuration des Extensions et Linters sont décrits dans les autres Guidelines :

- [Guidelines Vue-Nuxt-Front-End](Guidelines-Vue-Nuxt-Front-End.md)
- [Guidelines Vue-WordPress](Guidelines-Vue-WordPress.md)
- [Guidelines WordPress](Guidelines-WordPress.md)

## Astuces de configuration

- `"editor.minimap.renderCharacters": false`, et la minimap devient plus belle
- `"editor.renderWhitespace": "boundary"` n'affiche que les espaces pertinents
- `"editor.cursorBlinking": "smooth"` tuning du clignotement du curseur
- `"editor.cursorSmoothCaretAnimation": "on"` tuning des transitions du curseur
