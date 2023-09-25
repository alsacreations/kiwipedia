# Initialisation d'un projet

- Ajouter un fichier `.gitignore` (contenant notamment `node_modules`)
- Ajouter `README.md`
- Ajouter `.editorconfig`
- Ajouter `.vscode/settings.json`, `.vscode/extensions.json`

1. Installation d'[ESLint](https://eslint.org/docs/latest/user-guide/getting-started)
    - [Configuration Alsacréations](https://www.npmjs.com/package/eslint-config-alsacreations)

2. Installation de [Stylelint](https://stylelint.io/user-guide/get-started)
    - `npm install stylelint --save-dev`
    - Récupérer le [fichier de configuration](assets/stylelint.config.js) dans ce repo et le placer à la racine.

3. Installation optionnelle de [Prettier](https://prettier.io/docs/en/install.html)
    - Attention, bien suivre les étapes de configuration du preset [Alsacréations](https://www.npmjs.com/package/eslint-config-alsacreations)

4. Installation de [Commitlint](https://commitlint.js.org/#/guides-local-setup) ([husky](https://www.npmjs.com/package/husky) sera installé en même temps)
    - Utiliser le preset `@commitlint/config-conventional`
