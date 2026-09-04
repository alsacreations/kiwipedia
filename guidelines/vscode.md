# Visual Studio Code

> Statut : stable · Niveau : tous

Conventions **spécifiques à Alsacréations** pour la configuration VS Code. Les usages génériques de l'éditeur (raccourcis clavier standards, confort visuel personnel — thème, police, minimap —, fonctionnement de base des extensions) ne sont **pas** repris ici. Seule la configuration imposée en équipe (fichiers `.vscode/`, extensions de référence) est documentée — à répliquer telle quelle dans tout nouveau projet plutôt qu'improvisée.

---

## Fichiers `.vscode/` imposés

Générés par [Primary](https://primary.alsacreations.com/) ou lors de l'[initialisation de projet](../starters/project-init.md) — reproduire tels quels plutôt que réinventer une config.

### `settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "modificationsIfAvailable",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "stylelint.validate": ["css", "scss", "html", "vue"],
  "css.validate": false,
  "scss.validate": false,
  "workbench.editorAssociations": {
    "*.svg": "default"
  },
  "[markdown]": {
    "editor.formatOnSave": false
  }
}
```

- `css.validate`/`scss.validate` à `false`&#8239;: désactive la validation CSS native de VS Code, sinon elle fait doublon (et parfois contredit) Stylelint.
- `workbench.editorAssociations` sur `*.svg`&#8239;: ouvre les SVG en code source plutôt qu'en aperçu — nécessaire au nettoyage manuel décrit dans [Icônes](icons.md).
- `[markdown].editor.formatOnSave` à `false`&#8239;: évite un reformatage Markdown non désiré (largeur de ligne, listes) à l'enregistrement des fiches.

### `extensions.json`

```json
{
  "recommendations": [
    "editorconfig.editorconfig",
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint",
    "dbaeumer.vscode-eslint"
  ]
}
```

> ⚠️ **Piège fréquent** — L'extension Prettier officielle est `esbenp.prettier-vscode`, pas `prettier.prettier-vscode`.

## Extensions à ajouter selon la stack

| Stack | Extensions |
| --- | --- |
| Vue / Nuxt | `vue.volar`, `mrmlnc.vscode-scss` |
| Vue / Nuxt multilingue | `lokalise.i18n-ally` |
| PHP | `bmewburn.vscode-intelephense-client`, `felixfbecker.php-debug`, `ikappas.phpcs` |
| Markdown | `DavidAnson.vscode-markdownlint` |
| Git avancé | `eamodio.gitlens` |

## Configuration par langage

```json
// PHP — chemin de l'exécutable
{ "php.validate.executablePath": "/usr/bin/php" }
```

```json
// JavaScript/TypeScript
{
  "eslint.workingDirectories": ["./"],
  "eslint.format.enable": true,
  "eslint.validate": ["javascript", "typescript", "vue"]
}
```

## Principe&#8239;: ne pas sur-configurer

> ✅ **Par défaut** — Préserver la configuration VS Code par défaut au maximum ; n'ajouter un réglage que pour une règle d'équipe explicite (évite les conflits entre postes différents).

- **Workspace Settings** (`.vscode/settings.json`, committé)&#8239;: réservé aux règles d'équipe (formatters, linters).
- **User Settings** (profil personnel, jamais committé)&#8239;: tout le confort individuel (thème, police, raccourcis) — ne jamais le faire remonter dans le repo.

---

## Voir aussi

- [Initialisation de projet](../starters/project-init.md) — Bootstrap d'un nouveau projet.
- [CSS](css.md) — Stylelint, Prettier, PostCSS.
- [Conventions de nommage](naming-conventions.md) — Indentation, casse, langue.
