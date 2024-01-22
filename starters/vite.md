# Vite un projet statique minimaliste

... avec des bonnes pratiques tout de même. On respecte nos guidelines [HTML](../guidelines/html.md) + [CSS](../guidelines/css.md) + [JavaScript](../guidelines/javascript.md) + [Visual Studio Code](../resources/vscode.md).

On profite ainsi du HMR (Hot Module Reloading), de Sass, d'une compilation...

## Installation et configuration

L'organisation des dossiers et sous-dossiers est à la libre appréciation de chacun mais il est conseillé d'adopter cette structure :

```text
├── index.html
├── main.js
├── package.json
├── pnpm-lock.yaml
├── .eslintrc.cjs
├── .gitignore
├── assets
│   └── css
│       ├── _reset.scss
│       ├── fonts.scss
│       └── style.scss
├── public
│   ├── fonts
│   ├── img
│   └── ...
├── .dockerignore
├── docker-compose.yml
├── Dockerfile
└── README.md
```

- On utilise [pnpm](https://pnpm.io/fr/installation), installation avec `npm install -g pnpm`
- [Vite](https://vitejs.dev/guide/) est l'outil de compilation/bundler
  - Démarrer un dossier projet avec `pnpm create vite`, choisir _Vanilla_ + _JavaScript_
  - Se rendre dans le dossier créé (`cd <dossier>`)
  - Installer les dépendances avec `pnpm i`
  - Supprimer les fichiers d'exemple (counter.js, javascript.svg, public/vite.svg) ; nettoyer `style.css`, nettoyer `main.js` pour ne conserver que l'import CSS ; côté HTML ne pas oublier de changer `lang="fr"` et `<title>` puis supprimer `link rel="icon"`
- **CSS**
  - Installer Sass (si besoin) : `pnpm install --save-dev sass`, renommer `style.css` en `style.scss` et adapter le chemin dans `main.js`
  - Ajouter le [reset CSS](https://github.com/alsacreations/bretzel/blob/main/public/bretzel-reset.css) et l'importer dans `main.js`
- **Linters**
  - Installer eslint `pnpm i --save-dev eslint-config-alsacreations @rushstack/eslint-patch eslint`
  - Ajouter [le fichier de configuration](https://github.com/alsacreations/eslint#configuration) et **adapter** les lignes tel qu'indiqué dans les commentaires
  - Ajouter [.editorconfig](../configs/.editorconfig) - l'extension [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) doit être installée
  - Installer stylelint `pnpm install --save-dev stylelint`
  - Ajouter [.stylelintrc.json](../configs/.stylelintrc.json) - l'extension [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) doit être installée
- **Divers**
  - Ajouter `README.md` et penser à se reposer sur [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
  - Ajouter `.gitignore` et  `.dockerignore`, contenant au moins les chemins vers `node_modules` et `dist`
  - Ajouter [les fichiers](../configs/.vscode) `.vscode/settings.json` et `.vscode/extensions.json`
  - On utilise le dossier [`public/`](https://vitejs.dev/guide/assets.html#the-public-directory) pour les ressources statiques (ex: images, svg, fonts...)
- **En option**
  - Ajouter [launch.json](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) au projet pour lancer le debugger.
  - Ajouter Prettier `pnpm install --save-dev prettier prettier-plugin-tailwindcss` + ajouter un [fichier de configuration](https://prettier.io/docs/en/configuration.html) `prettier.config.cjs`
  - Ajouter [alpine.js](https://alpinejs.dev/essentials/installation) avec `pnpm install --save alpinejs`
- **Docker** si besoin de mise en recette ou pré-production
  - Ajouter `Dockerfile` et `docker-compose.yml` suivant les exemples et les adapter

## Tâches

- Développer : `pnpm dev`
- Compiler : `pnpm build` et utiliser les fichiers produits dans `dist/`
- Mise en production : `docker-compose up -d --build`

---

## Exemples de fichiers

main.js

```js
import './assets/css/_reset.scss'
import './assets/css/fonts.scss'
import './assets/css/style.scss'
```

index.html

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Le titre</title>
  </head>
  <body>
    ...
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

.gitignore et .dockerignore

```text
node_modules
dist
.DS_Store
# etc. voir https://mrkandreev.name/snippets/gitignore-generator/
```

Dockerfile

```text
FROM node:18-slim

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

RUN pnpm install

RUN pnpm build

CMD [ "pnpm", "preview", "--host" ]
```

docker-compose.yml

```yaml
version: '3'

services:
  web:
    container_name: projet-web
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    #ports:
    #  - "3000:4173"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.client-projet.rule=Host(`projet.client.alsacreations.net`)"
      - "traefik.http.routers.client-projet.entrypoints=web,websecure" # ou juste web (sans https)
      - "traefik.http.services.client-projet.loadbalancer.server.port=4173" # Port interne différent de 80
    networks:
      - web-network

networks:
  web-network:
    external: true
    name: traefik-network
```

.eslintrc.cjs

```js
require('@rushstack/eslint-patch/modern-module-resolution')

/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'alsacreations/javascript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  }
}
```

package.json (exemple approximatif)

```json
{
  "name": "nom-projet",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@rushstack/eslint-patch": "^1.4.0",
    "eslint": "^8.49.0",
    "eslint-config-alsacreations": "^1.4.0",
    "sass": "^1.68.0",
    "vite": "^4.4.9"
  }
}
```

## Astro

```sh
pnpm create astro@latest
pnpm astro add tailwind
```

---

## vite.config

Exemple plus complexe commenté avec explications, voir aussi <https://vitejs.dev/guide/build.html>

```js
import dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config()

export default defineConfig(({ command }) => ({
  // Chemin remplacé dans les ressources compilées
  // base: command === 'build' ? `/themes/${process.env.WP_THEME}/assets/` : '/',

  // Dossier dans lequel on place les ressources statiques non compilées, qui seront copiées vers outDir
  publicDir: 'resources/static',
  build: {
    assetsDir: '', // Sous-dossier dans lequel placer les assets (js, css) générés
    emptyOutDir: true, // Vide le dossier destination
    manifest: true, // Génère un manifeste
    outDir: `public/themes/${process.env.WP_THEME}/assets/dist`, // Dossier destination
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        // index: 'resources/scripts/main.js', // Point d'entrée JS
        // custom: 'resources/static/burger-menu.js',
      },
    },
    sourcemap: command === 'serve' ? 'inline' : false,
  },
  css: {
    devSourcemap: command === 'serve',
  },
  server: {
    // origin: 'http://localhost:5173',
  },
  /*
  plugins: [
    {
      name: 'php-twig-reload',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.php') || file.endsWith('.twig')) {
          server.ws.send({ type: 'full-reload', path: '*' })
        }
      },
    },
  ],
  */
}))
```
