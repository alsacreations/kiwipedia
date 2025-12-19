# Guidelines Visual Studio Code

> 📋 **À propos de ce document**  
> Ce document rassemble les bonnes pratiques Visual Studio Code appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Ces guidelines standardisent l'environnement de développement pour garantir cohérence et qualité du code en équipe.

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Configuration de base](#configuration-de-base)
3. [Extensions essentielles](#extensions-essentielles)
4. [Raccourcis et productivité](#raccourcis-et-productivité)
5. [Langages spécifiques](#langages-spécifiques)
6. [Optimisation et personnalisation](#optimisation-et-personnalisation)

---

## Vue d'ensemble

### Éditeur recommandé

**[Visual Studio Code](https://code.visualstudio.com/)** est notre éditeur de référence pour HTML, CSS, PHP, JavaScript et tous les frameworks associés.

#### Avantages

- ✅ **Gratuit** et open-source (noyau libre)
- ✅ **Performant** avec de nombreuses mises à jour
- ✅ **Écosystème riche** d'extensions
- ✅ **Support multiplateforme** (Windows, macOS, Linux)

#### Alternative libre

**[VSCodium](https://vscodium.com/)** : version entièrement libre sans télémétrie Microsoft et avec un store d'extensions alternatif.

### Objectifs des guidelines

> 🎯 **Mission** : Harmoniser l'environnement de développement pour&#8239;:
>
> - Éviter le code obsolète et la dette technique
> - Enseigner les bonnes pratiques dès le départ
> - Uniformiser la syntaxe en équipe
> - Automatiser la vérification qualité

---

## Configuration de base

### Structure de projet type

Chaque projet doit contenir à la racine&#8239;:

```bash
projet/
├── .vscode/
│   ├── extensions.json    # Extensions recommandées
│   └── settings.json      # Configuration workspace
├── .editorconfig          # Règles d'indentation/encodage
├── prettier.config.mjs        # Configuration Prettier
└── stylelint.config.mjs    # Configuration Stylelint
```

> 📚 **Fichiers disponibles** : Tous les exemples sont fournis dans <https://primary.alsacreations.com/>

### Configuration essentielle VS Code

#### Fichier `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "prettier.prettier-vscode",
  "stylelint.validate": ["css", "scss", "html", "vue"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  }
}
```

#### Fichier `.vscode/extensions.json`

```json
{
  "recommendations": [
    "editorconfig.editorconfig",
    "prettier.prettier-vscode",
    "stylelint.vscode-stylelint",
    "dbaeumer.vscode-eslint"
  ]
}
```

### Principe de configuration

> ⚠️ **Important** : Préserver la configuration par défaut de VS Code au maximum pour éviter les conflits entre postes différents.

---

## Extensions essentielles

### Extensions indispensables ❤️

| Extension | Fonction | Pourquoi essentiel |
|-----------|----------|-------------------|
| **[EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)** | Normalisation indentation/encodage | Cohérence équipe |
| **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** | Vérification JS/TS/frameworks | Qualité code |
| **[Prettier](https://marketplace.visualstudio.com/items?itemName=prettier.prettier-vscode)** | Formatage automatique | Uniformité style |
| **[Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)** | Vérification CSS/SCSS | Standards CSS |
| **[Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)** | Vérification Markdown | Documentation |

### Extensions fortement recommandées ⭐

#### Productivité

- **[Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager)** : Navigation entre projets
- **[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)** : Erreurs linters inline
- **[Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)** : Autocomplétion chemins

#### Git et versioning

- **[Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)** : Visualisation commits
- **[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)** : Fonctions Git avancées
- **[Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)** : Historique ligne par ligne

#### Développement web

- **[CSS var complete](https://marketplace.visualstudio.com/items?itemName=phoenisx.cssvar)** : Autocomplétion variables CSS
- **[HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)** : Autocomplétion HTML/CSS
- **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)** : Support Tailwind

#### Frameworks

- **[Volar](https://marketplace.visualstudio.com/items?itemName=vue.volar)** : Indispensable Vue.js/Nuxt
- **[SCSS Intellisense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)** : Support SCSS avancé

### Extensions suggérées 👍

#### Développement

- **[Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)** : Gestion TODO/FIXME
- **[Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)** : Client API Rest
- **[Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)** : Support Docker
- **[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)** : Développement distant

#### Confort visuel

- **[Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)** : Icônes fichiers
- **[Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)** : Niveaux indentation
- **[Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)** : Balises correspondantes

### Utilitaires spécialisés

| Extension | Usage | Cas d'application |
|-----------|-------|------------------|
| **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** | Serveur local + live reload | HTML statique |
| **[Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)** | Compilation Sass auto | Projets Sass legacy |
| **[i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally)** | Internationalisation | Vue/Nuxt multilingue |
| **[DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)** | Support .env | Variables environnement |

### Gestion des extensions

```bash
# Lister les extensions installées
code --list-extensions

# Installer une extension via CLI
code --install-extension prettier.prettier-vscode
```

---

## Raccourcis et productivité

### Raccourcis incontournables

| Raccourci | Windows/Linux | macOS | Fonction |
|-----------|---------------|-------|----------|
| **Command Palette** | `Ctrl+Shift+P` | `⌘⇧P` | Accès toutes commandes |
| **Quick Open** | `Ctrl+P` | `⌘P` | Recherche rapide fichiers |
| **Select All Occurrences** | `Ctrl+Shift+L` | `⇧⌘L` | Sélection multi-occurences |
| **Copy Line Down** | `Shift+Alt+↓` | `⇧⌥↓` | Duplication ligne |
| **Find in Files** | `Ctrl+Shift+F` | `⌘⇧F` | Recherche projet |
| **Replace in Files** | `Ctrl+H` | `⌥⌘F` | Remplacement projet |
| **Settings** | `Ctrl+,` | `⌘,` | Paramètres |

### Fonctions natives activées

- **Linked Editing** : Modification balises ouvrantes/fermantes simultanée (remplace Auto Rename Tag)
- **Format on Save** : Formatage automatique à la sauvegarde

> 📚 **Plus d'astuces** : [MDN VS Code Tips & Tricks](https://developer.mozilla.org/en-US/blog/vs-code-tips-tricks/)

---

## Langages spécifiques

### PHP

#### Configuration requise

Définir le chemin vers l'exécutable PHP dans les paramètres&#8239;:

```json
{
  "php.validate.executablePath": "/usr/bin/php"
}
```

#### Extensions PHP recommandées

- **[PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)** : Débogage Xdebug
- **[PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)** : Autocomplétion avancée
- **[phpcs](https://marketplace.visualstudio.com/items?itemName=ikappas.phpcs)** : Standards de codage
- **[PHPDoc Comment](https://marketplace.visualstudio.com/items?itemName=rexshi.phpdoc-comment-vscode-plugin)** : Documentation automatique

### JavaScript/TypeScript

#### Configuration ESLint

```json
{
  "eslint.workingDirectories": ["./"],
  "eslint.format.enable": true,
  "eslint.validate": ["javascript", "typescript", "vue"]
}
```

### CSS/SCSS

#### Configuration Stylelint

```json
{
  "stylelint.validate": ["css", "scss", "html", "vue"],
  "css.validate": false,
  "scss.validate": false
}
```

---

## Optimisation et personnalisation

### Réglages de performance

```json
{
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

### Amélioration visuelle

```json
{
  "editor.minimap.renderCharacters": false,
  "editor.renderWhitespace": "boundary",
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.fontLigatures": true,
  "workbench.iconTheme": "material-icon-theme"
}
```

### Configuration avancée

#### Format on Save intelligent

```json
{
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "modificationsIfAvailable",
  "[markdown]": {
    "editor.formatOnSave": false
  }
}
```

#### Actions automatiques

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit",
    "source.organizeImports": "explicit"
  }
}
```

### Workspace vs User Settings

| Type | Portée | Usage recommandé |
|------|--------|------------------|
| **User Settings** | Global utilisateur | Préférences personnelles |
| **Workspace Settings** | Projet spécifique | Configuration équipe |

> 💡 **Conseil** : Privilégier Workspace Settings pour les règles d'équipe, User Settings pour le confort personnel.

---

> 📚 **Ressources complémentaires**
>
> - [VS Code Keyboard Shortcuts Reference](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference)
> - [Configuration EditorConfig](https://editorconfig.org/)
> - [Marketplace Extensions](https://marketplace.visualstudio.com/vscode)
