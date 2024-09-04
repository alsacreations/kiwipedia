# Vite un projet statique minimaliste

## Quand appliquer ce starter ?

- Pour tous nos sites statiques
- Pour les projets Vue/Nuxt : Vite y est déjà intégré, ce starter décrit nos adaptations spécifiques
- Pas pour les projets WordPress : on utilise Vite dans notre workflow kiwiplate que l'on a configuré nous même, et on ne passe pas par le starter car kiwiplate en est déjà un

## Organisation des dossiers et fichiers

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

- Utiliser le dossier [`public/`](https://vitejs.dev/guide/assets.html#the-public-directory) pour les ressources statiques (ex: images, svg, fonts...)

## Initialisation de projet

- Suivre les étapes décrites dans le fichier [`project-init`](project-init.md) concernant les configurations des fichiers linters, readme, gitignore, reset CSS, etc.

## Installation et configuration de Vite

[Vite](https://vitejs.dev/guide/) est l'outil de compilation/bundler

- Démarrer un dossier projet avec `pnpm create vite`, choisir _Vanilla_ + _JavaScript_
- Se rendre dans le dossier créé (`cd <dossier>`)
- Installer les dépendances avec `pnpm i`
- Supprimer les fichiers d'exemple (`counter.js`, `javascript.svg`, `public/vite.svg`); nettoyer `style.css`, nettoyer `main.js` pour ne conserver que l'import CSS; côté HTML ne pas oublier de changer `lang="fr"` et `<title>` puis supprimer `link rel="icon"`

## Styles CSS

- Dans `vite.config.js` : `import UnoCSS from 'unocss/vite'`
- Dans `vite.config.js` : `plugins: [ UnoCSS(), ],`
- Renommer `style.css` en `style.scss` et adapter le chemin dans `main.js`
- Installer Sass (uniquement si besoin) : `pnpm install --save-dev sass`,

## Optionnel

- Ajouter [launch.json](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) au projet pour lancer le debugger.
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
FROM node:20-slim

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

RUN pnpm install

RUN pnpm build

CMD [ "pnpm", "preview", "--host" ]
```

docker-compose.yml

```yaml
version: '3.9'

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
  // (correspond au chemin public http vers le dossier contenant assetsDir)
  // base: command === 'build' ? `/themes/${process.env.WP_THEME}/assets/` : '/',

  // Dossier dans lequel on place les ressources statiques non compilées, qui seront copiées vers outDir
  publicDir: 'resources/static',
  build: {
    outDir: `dist`, // Dossier destination du build
    assetsDir: 'assets', // Sous-dossier dans lequel placer les assets (js, css) générés par Vite
    emptyOutDir: true, // Vide le dossier destination à chaque build
    manifest: true, // Génère un manifeste json listant les chemins vers les assets
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'), // Point d'entrée HTML
        // index: 'main.js', // Point d'entrée JS, important les assets
        // custom: 'resources/scripts/burger-menu.js',
      },
    },
    sourcemap: command === 'serve' ? 'inline' : false,
  },
  css: {
    devSourcemap: command === 'serve',
  },
  server: {
    // origin: 'http://localhost:5173',
  }
}))
```

Pour exploiter le mode `dev` de Vite et bénéficier du _hot module_reloading_, il conviendra d'injecter dans la page :

```html
<script src="http://localhost:5173/@vite/client" type="module"></script>
<script src="http://localhost:5173/main.js" type="module"></script>
```
