# Initialisation d'un projet

Concerne toutes nos typologies de projets.

- Ajouter un fichier [`.gitignore`](../configs/.gitignore) s'il n'est pas fourni dans le projet
- Ajouter un [`README.md`](../configs/README.md) conventionnel
- Ajouter [`.editorconfig`](../configs/.editorconfig) à la racine (et installer l'extension VSCode)
- Ajouter [`.vscode/settings.json`](../configs/.vscode/settings.json), [`.vscode/extensions.json`](../configs/.vscode/extensions.json) à la racine

1. Installer [ESLint](https://eslint.org/docs/latest/user-guide/getting-started)
    - Bien suivre les étapes de configuration du preset Alsacréations [`eslint-config-alsacreations`](https://www.npmjs.com/package/eslint-config-alsacreations) spécifique pour ESLint ainsi que Prettier et Prettier-plugin-CSS-order

2. Installer [Stylelint](https://stylelint.io/user-guide/get-started) *si prévu dans le projet* (sinon verifier que les linters CSS/SCSS natifs de VSCode sont activés)
    - `pnpm install -D stylelint`
    - Ajouter le fichier de configuration [`.stylelintrc.json`](../configs/.stylelintrc.json) à la racine.

3. Installer [Prettier](https://prettier.io/docs/en/install.html) (et l'extension VSCode)
    - Ajouter [`.prettierrc.mjs`](../configs/.prettierrc.mjs) à la racine
    - Installer [`prettier-plugin-css-order`](https://www.npmjs.com/package/prettier-plugin-css-order)
    - Rappel : bien suivre les étapes de configuration du preset Alsacréations `eslint-config-alsacreations`
