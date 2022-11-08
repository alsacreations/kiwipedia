# Guidelines : Vue.js, Nuxt et Front-End en général

Statut : Working Draft (WD)

Cette présente convention rassemble les bonnes pratiques "Vue.js, Nuxt et Front-End" en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Environnement de code HTML, CSS, JavaScript

L'Éditeur de code recommandé pour HTML, CSS, PHP, JS est [Visual Studio Code](https://code.visualstudio.com/). Il est libre (son noyau), gratuit et bénéficie de nombreuses mises à jour. Voir les [Guidelines VScode](Guidelines-VScode.md) pour plus d'informations.

## Extensions Visual Studio Code recommandées

Pour les projets de type Vue et Nuxt, la liste des extensions VScode utile est composée de : Editorconfig, ESlint, Stylelint, Markdownlint, Volar, SCSS Intellisense, Tailwind CSS IntelliSense, todo-highlight.

Fichier d'extensions `extensions.json` à placer à la racine du projet au sein d'un dossier `/.vscode` ([afficher/télécharger ce fichier](assets/vue-nuxt-front-end/.vscode/extensions.json))

```yaml
{
  "recommendations": [
    "EditorConfig.EditorConfig",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint",
    "DavidAnson.vscode-markdownlint",
    "mrmlnc.vscode-scss",
    "vue.volar",
    "mikestead.dotenv",
    "bradlc.vscode-tailwindcss",
    "wayou.vscode-todo-highlight"
  ]
}
```

## Linters

Les différents fichiers de configuration des Linters sont :

- EditorConfig : cf. `.editorconfig`
- [ESLint](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) : cf. `.eslintrc.js`
- [Stylelint](https://stylelint.io/user-guide/configure) : cf. `.stylelintrc` (voir détails plus loin)
- *Note : Prettier crée des conflits avec ESLint (ex. sauts de ligne dans les balises). Il est donc recommandé de le désactiver sur les projets Vue/Nuxt.*

La configuration fournie dans le fichier `/.vscode/settings.json` permet de :

- Définir ESLint comme linter/formateur par défaut
- De corriger automatiquement les erreurs ESLint lors de la sauvegarde du fichier
- De désactiver les linters natifs VSCode CSS et scss et d'activer Stylelint uniquement pour éviter certains conflits.

([Afficher/télécharger le fichier `settings.json`](assets/vue-nuxt-front-end/.vscode/settings.json))

```json
{
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "stylelint.enable": true,
  "css.validate": false,
  "scss.validate": false,
  "stylelint.validate": [
    "css",
    "less",
    "postcss",
    "scss",
    "sass"
  ],
}
```

### Editorconfig

Editorconfig impose un formatage (espace vs tabs) et des règles de syntaxe directement dans l'éditeur, ainsi ce dernier s'adapte à chaque projet.

La configuration de Editorconfig se fait via un fichier `.editorconfig` à la racine du projet. ([Afficher/télécharger ce fichier](assets/vue-nuxt-front-end/.editorconfig))

### ESlint

ESLint est un analyseur de code pour identifier les problématiques du code JavaScript (Vue, React, etc.) et les résoudre automatiquement. ESlint est configuré via un fichier `.eslintrc.js`.

Via le plugin [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) on applique [les groupes de règles](https://eslint.vuejs.org/rules/) dans le fichier `.eslintrc.js` avec le tableau extends : *Priority A: Essential (plugin:vue/essential)*, *Priority B: Strongly Recommended (plugin:vue/strongly-recommended)*, *Eslint recommended : eslint:recommended*. Pour Nuxt : *plugin:nuxt/recommended*.

([Afficher/télécharger le fichier complet recommandé `.eslintrc.js`](assets/vue-nuxt-front-end/.eslintrc.js)).

### Stylelint

Stylelint est l'unique formatteur pour les styles CSS et SCSS du projet. Les Linters natifs CSS et SCSS de VSCode **doivent être désactivés** (voir précédemment).

La procédure d'installation de Stylelint est la suivante :

- Installer l'extension [Stylelint pour VSCode](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint),
- Installer le package Stylelint via `npm install stylelint --save-dev`,
- Installer la configuration recommandée de Stylelint via `npm install stylelint-config-recommended --save-dev`
- Créer un fichier `stylelint.config.js` contenant les règles à appliquer.

([Afficher/télécharger le fichier `stylelint.config.js` recommandé](assets/vue-nuxt-front-end/stylelint.config.js)).

### Prettier

Prettier est un formateur de syntaxe permettant d'assurer une consistance tout au long du projet (sauts de ligne, guillemets simples ou doubles, etc.).

**Note : Prettier crée des conflits avec ESLint (ex. sauts de ligne dans les balises). Il est donc recommandé de le désactiver sur les projets nécessitant ESlint.**

### Markdownlint

Markdownlint est un linter pour langage Markdown et prend en compte toutes les règles à appliquer sur les fichiers `.md` notamment les fichiers `readme.md` présents dans chaque projet.

### Volar

Ensemble d'outils Vue pour VSCode (coloration, linter). Volar nécessite un fichier `jsconfig.json` ou `tsconfig.json` (normalement générés par défaut) dont voici un exemple :

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

## Environnements et fichiers .env

On utilise des fichiers `.env` multiples pour définir les grandes constantes de l'application selon le contexte ; les fichiers `*.local` sont propres à chaque machine et ne sont pas versionnés :

| Fichier | Description | Priorité | Versionné ? |
| --- | --- | --- | --- |
| .env | Par défaut | + | git |
| .env.local | Prioritaire sur .env | ±± | - |
| .env.development | Prioritaire sur .env | ±±+ | git |
| .env.development.local | Prioritaire sur .env | ±±++ | - |

...et équivalent avec `production` selon le nom de l'environnement déclenché par les scripts avec `cross-env NODE_ENV=***` grâce à <https://github.com/kentcdodds/cross-env>. Voir package.json et <https://www.npmjs.com/package/dotenv-flow>.

```text
# local .env* files
.env.local
.env.*.local
```

Avec Nuxt l'environnement peut être :

- `development` en mode `npm run dev`
- `production` en mode `npm run build` et `npm run generate`

- dans les composants ou dans nuxt.config.js on pourra utiliser `process.env.NODE_ENV` par exemple `if (process.env.NODE_ENV === 'development')`

Voir aussi <https://stackoverflow.com/questions/55406055/toggle-between-multiple-env-files-like-env-development-with-node-js>.

### config.{js,ts}

Les variables de configuration ou globales (activation de fonctionnalités) sont ajoutées dans le fichier config.{js,ts} dans l'entrée correspondante. Si cette entrée n'existe pas, il convient d'en ajouter une nouvelle.

```js
const config = {
  isProduction: process.env.NODE_ENV === 'production',
  app: {
    title: 'MonApp',
  },
  api: {
    apiUrl: process.env.APP_API_URL
  }
```

## Installation et configuration initiale

### Installation de Vue

L'installation d’un nouveau projet se fait à l’aide de [Vite](https://vitejs.dev/).

- Par ligne de commande `npm create vite@latest`

Options recommandées :

- vue
- vue ou vue-ts

On développe avec `npm run dev`, on compile avec `npm run build`

**Template déjà prêt**: <https://github.com/antfu/vitesse>

### Installation de Nuxt

Documentation : <https://v3.nuxtjs.org/getting-started/quick-start/>

```sh
npx nuxi init nuxt-app
```

## Dépendances

Les dépendances fortement recommandées sont :

- [pinia](https://pinia.vuejs.org/) (store)
- [vue-router](https://router.vuejs.org/) (routage)
- [vue-i18n](https://kazupon.github.io/vue-i18n/) (traduction) et [vue-i18n-loader](https://www.npmjs.com/package/@intlify/vue-i18n-loader)
- [axios](https://www.npmjs.com/package/axios) s'il y a usage d'une API

Les dépendances de développement recommandées sont : eslint, eslint-plugin-vue, sass, autoprefixer.

👉 Avant l'ajout d’une dépendance au projet (`npm install`) vérifier le poids avec <https://bundlephobia.com/>.

Autres dépendances utiles :

⚠️ Vérifier compatibilité avec Vue 3

- [vue-the-mask](https://vuejs-tips.github.io/vue-the-mask/) : masques de saisie (téléphone, date, code postal, carte bancaire...).
- [vee-validate](https://logaretm.github.io/vee-validate/overview.html) : validation de formulaires.
- [v-calendar](https://vcalendar.io/) : calendrier, datepicker.
- [vue-gtag](https://github.com/MatteoGabriele/vue-gtag) : G. Analytics.
- [date-fns](https://date-fns.org/) : Dates.
- [day.js](https://day.js.org/) : Dates
- [vueuse/head](<https://github.com/vueuse/head> : Balises meta, SEO.
- [vueuse](https://vueuse.org/): Utilités composition API (debounce, click-outside, etc.)
- [vue-toasted](https://github.com/shakee93/vue-toasted) : Notifications/toasts.
- [vue-infinite-loading](https://peachscript.github.io/vue-infinite-loading/) : Infinite loading.
- [vue-svg-loader](https://vue-svg-loader.js.org/) : Icônes SVG + composant maison permettant de compiler/inline tous les fichiers SVG avec `<icon i="nomdelicone">` + `fill="currentColor"` dans le .svg ; pour créer un sprite à base de `<symbol>` : nuxt-svg-sprite-module (qui sans surprise reprend svg-sprite-module).

## Composants : conventions et nommage

- On classe les composants dans des sous-dossiers selon leur usage (ex : ui/, profile/, modals/).
- Tous les composants ont une propriété `name` de la même syntaxe que l'on retrouve dans les autres `<template>`. Si `name: 'MonComposant'` alors on écrira `<MonComposant>` ; si `name: 'mon-composant'` alors on écrira `<mon-composant>`.
- Les noms de fichiers et de classes sont en anglais-américain (en-US).
- Lors de l'import d'un composant l'extension `.vue` est obligatoire.

```vue
<script setup lang="ts">
import MyComponent from './MyComponent.vue'
</script>
```

### Template

- Les directives `v-if`, `v-for` et `v-show` sont les premières directives dans la déclaration du composant
- La directive `v-for` est toujours complétée par `:key` pour les itérations. `:key` peut être utilisée pour [forcer le rafraîchissement d’un composant](https://michaelnthiessen.com/force-re-render/).
- On espace les expressions entre moustaches `{{ variable }}`.
- On écrit les composants en `<PascalCase>`.
- On n'utilise pas les attributs `id` car ils peuvent se retrouver dupliqués dans la page si un composant est utilisé plusieurs fois. Si besoin, il faudra générer un id unique avec [uuid](https://www.npmjs.com/package/uuid) par exemple.
- On utilise un élément `button` ou `input type="button"` plutôt qu'un lien pour des actions ne changeant pas de page.
- Pour l'ajout d'événements, on utilise `v-on:click="action"` au lieu de `@click="action"` pour rechercher plus facilement les événements de manière globale dans le code source du projet. La méthode est appelée sans parenthèses s'il n'y a pas de paramètre à lui passer. [Pourquoi ?](https://stackoverflow.com/questions/50635404/parentheses-while-calling-a-method-in-vue).

⚠️ On évite au maximum d'utiliser les instructions natives pour privilégier les techniques propres à Vue :

- `ref` pour sélectionner un noeud DOM plutôt que `getElement*` ou `querySelector`
- classes et styles dynamiques avec `:class`, voire `v-show` plutôt que d'accéder à la propriété de style `style.display = '...'`

### Styles

Les styles des composants sont écris dans le fichier `.vue` du composant lui-même.

- Si des styles sont réutilisés entres plusieurs composants (ex: checkbox et radio), ces styles seronts placés dans un fichier de mixins ou variables `sass`,
et importés dans le fichier `.vue` avec `@use`.

- Les styles sont de préférences scopés (attribut `scoped`) pour ne pas affecter les autres composants.

Cette méthode permet d'avoir le JS, HTML, et CSS au même endroit et d'éviter le code mort une fois le composant supprimé. Nous évitons aussi une arborescence de fichier trop volumineuse dès que le projet commence à grossir.

En plus de cela, inclure les styles directement dans le composant facilite le lazy-loading des styles le jour où nous en aurions besoin.

Attention cependant, les composants doivent rester lisibles, il ne faut donc pas hésiter à sous découper le template en plusieurs composants (sans en abuser évidement).

```vue
<script setup lang="ts"></script>

<template>
  <button>
    <span>Contenu du bouton</span>
  </button>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/colors";

button {
  color: colors.hotpink;
}

span {
  color: red; // Super contraste !
}
</style>
```

### Props

Toutes les props ont une valeur par défaut (sauf si la prop est requise). Les variables d'état sont préfixées par `is` (ex : `isLoading`, `isDoingThis` , `isReady`).

Nous préfererons passer des objets complets plutôt que des props seules: Exemple:

```vue
<script setup lang="ts">
// ✅
defineProps({
  person: {
    /** @type {Vue.PropType<Person>} */
    type: Object as Vue.PropType<Person>, // Nous typons obligatoirement ces objets avec TS **ou** JSDoc (dans du JS)
    required: true
  }
})

// ❌ trop verbeux
defineProps({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  age: {
    type: Number
    required: true
  }
})
</script>

<template>
  <button>
    <span>Contenu du bouton</span>
  </button>
</template>
```

ℹ️ Ne pas hésiter à utiliser le commentaire spécial `// @ts-check` ou la prop `checkJs` dans tsconfig.json quand nous sommes dans un projet JavaScript.

### Data

On réunit les variables liées (v-model) à des champs de formulaires dans un objet unique, cela permet de les nommer/regrouper proprement et d'envoyer cet objet complet à l'API directement. Par exemple

```js
const form = reactive({
  email : '',
  productQty: 0
})
```

Lors d'un développement avec données partielles/de remplissage, on peut préfixer les données temporaires par `TEMP`, `TODO`, etc, ou les charger depuis un fichier externe pour éviter la surcharge du composant `import('demodata.js')`.

### Computed

On favorise au maximum les propriétés calculées pour des raisons de performance/cache/concision, calcul automatique sans avoir besoin de déclencher une fonction. Voir <https://vuejs.org/guide/essentials/computed.html#computed-properties>

### Methods

On privilégie un nommage bien parlant. Les méthodes sont appelées sans parenthèses dans le template.

### Events

Voir <https://vuejs.org/guide/essentials/event-handling.html#event-handling>

Pour *debounce* des événements (limiter leur nombre d'appels toutes les *n* millisecondes) voir <https://www.npmjs.com/package/lodash.debounce>

### Composables

On privilégie l’écriture de [Composables](https://v3.nuxtjs.org/docs/directory-structure/composables#composables-directory) pour éviter la répétition dans plusieurs composants.

### Composants globaux

Dans Vue, pour éviter d'avoir à importer des composants très fréquemment utilisés on peut initialiser un chargement de composants globaux.

```js
import { createApp } from 'vue'
import Icon from '@/components/global/Icon.vue'

const app = createApp({})

app.component('icon', Icon)
```

## Routage

On utilise le paramètre `:to` ainsi qu'une route nommée. Ainsi, un retour à la page d'accueil se fait avec `:to="{ name: 'accueil' }"`

En cas de redirection à faire dans une fonction, on utilise router.push avec une route nommée, par exemple `router.push({ name: 'accueil' })` pour retourner à l'accueil.

## Store

Le store Pinia est toujours découpé en modules par type d'usage.

Nommage de clés :

- `id` pour les identifiants internes au store (itérations)
- `image` pour les urls vers des images
- `href` pour les liens externes
- `slug` pour les portions de texte servant à l'écriture des urls internes
- `title` pour le titre principal
- `label` lorsqu'il s'agit d'un titre court
- `description` pour la description étendue

## API

Les appels API sont gérés dans les stores correspondants, ou encore mieux via des fichiers spécifiques importés par les stores/composants (~ `api.js`) pour ne pas surcharger l'écriture des composants.

On utilise [Axios](https://axios.nuxtjs.org/).

On utilise les promesses avec `async`/`await` et les blocs `try`/`catch`.

```js
async function getData() {
  try {
    const response = await axios.get('/api/data')
    // const response = await axios.get<{ ... }>('/api/data') // Avec TypeScript, nous donnons le type attendu.
    return response.data
    // ou return await axios.get('/api/data')
  } catch (error) {
    console.log(error) // Ou autre variante
    throw error // Si besoin de la remonter d'un niveau, sinon on s'arrête
  }
}
```

## Internationalisation (i18n)

Usage de <https://github.com/intlify/vue-i18n-next> avec fichiers de configuration des langues (par exemple `i18n/fr-FR.js` et `i18n/en-US.js`) organisant les chaînes par une structure objet. On privilégie les regroupements par fonctionnalité (ex : formulaires, boutons, actions utilisateur communes), puis par nom de composant s'ils sont plus spécifiques.

- En tant que texte brut dans un balisage HTML : `<legend>{{ $t('identSignin.createAccount') }}</legend>`
- En tant que valeur de prop/attribut : `:placeholder="$t('formInput.lastname')"`
- En tant que valeur dans script : `title: this.$t('result.title')`
- En tant que condition : `v-if="$i18n.locale == 'fr'"`
- Lien racine : `<nuxt-link :to="localePath('/')">`

On formate les nombres/prix avec `$n(13.37, 'currency')` ou `$n(13.37, { currency: 'EUR' })`. Voir aussi <https://vue-i18n.intlify.dev/guide/essentials/number.html#basic-usage> pour importer *numberFormats* dans le fichier de configuration (vueI18n).

Pour des formatages plus complexes voir <https://kazupon.github.io/vue-i18n/guide/formatting.html#html-formatting>

### Écrire des clés i18n dans une fichier/composant Vue

Permet d'utiliser la balise `<i18n>` en fin de fichier et de ne pas faire grossir le fichier commun des chaînes traduites. Activer vueI18nLoader dans `nuxt.config.js`, `modules`, ajouter `['@nuxtjs/i18n', { vueI18nLoader: true }]`. Attention, traductions non reconnues par l'extension i18n-ally et à utiliser avec modération (textes uniques de pages types).

```html
<i18n>
{
  "fr": {
    "title": "Le titre",
    "description": "La description"
  }
}
</i18n>
```

### Écrire les routes en fonction de la locale

Dans `nuxt.config.js`, `i18n`, `pages` utiliser la structure

```js
'tunnel/my-cart': {
  fr: '/panier',
  en: '/cart'
}
```

Dans un fichier, pour créer la route dynamiquement en fonction de la locale, il suffit d'utiliser `localePath` avec le chemin du fichier. Attention, si le chemin du fichier contient des slash "/", les remplacer par des tirets. Pour notre l'exemple précédent, la route dynamique correspondante devient `this.localePath('tunnel-my-cart')`.

## Validation des formulaires avec vee-validate

Par l'usage de [VeeValidate](https://vee-validate.logaretm.com/) on n'utilise pas d'attribut HTML natif `required` sur les `<input>` texte ou équivalent qui sont assortis d'un message de validation texte (on le tolère pour les checkbox/radio qui en sont dépourvus dans certains cas).

1. Exploiter `<ValidationProvider v-slot="v" rules="required|autre_regle" slim>` *autour* du conteneur `<p class="form-group" :class="v.classes">`. Voir les [règles](https://logaretm.github.io/vee-validate/guide/rules.html#rules).
2. Les classes ajoutées sont définies dans `plugins\vee-validate.js` [Afficher/télécharger un exemple du fichier `vee-validate.js`](assets/vue-nuxt-front-end/vee-validate.js).
3. Il doit encapsuler un input avec `v-model`, par ex `<input v-model="currentIban" type="text">`.
4. Affichage du message d'erreur dans ce même bloc `<span class="form-label-error">{{ v.errors[0] }}</span>`.
5. Ne pas oublier `</ValidationProvider>`.
6. Moduler si nécessaire par le mode `agressive`, `passive`, `lazy`, `eager`, voir <https://vee-validate.logaretm.com/v2/guide/interaction.html#configuration> ; `mode="eager"` permet de n’afficher l’erreur que si on tente une validation de formulaire. L'attribut slim (ou `:slim="true"`) évite de générer un élément span autour d'un élément p (invalide en HTML). L'attribut `tag="div"` qui génère un div au lieu d'un span ne convient souvent pas car on souhaite conserver des éléments ayant un parent commun pour des raisons de styles CSS.

Exemple :

```html
<ValidationProvider v-slot="v" rules="required|iban" slim>
  <p class="form-group" :class="v.classes">
    <label class="form-label" for="iban">
      <span class="form-text">Numéro de compte bancaire (IBAN)<span class="form-required">&nbsp;*</span></span>
      <input
        id="iban"
        v-model="currentIban"
        type="text"
        class="form-control"
      />
      <span class="form-label-error">{{ v.errors[0] }}</span>
    </label>
  </p>
</ValidationProvider>
```

### Bloquer un formulaire non valide

1. Englober le formulaire (élément `<form>`) avec `<ValidationObserver v-slot="{ handleSubmit }">`
2. Ajouter la fonction à la validation `<form v-on:submit.prevent="handleSubmit(submitForm)">`

Ce qui produit une structure similaire à :

```html
<ValidationObserver v-slot="{ handleSubmit }">
  <form v-on:submit.prevent="handleSubmit(submitForm)">
    <ValidationProvider v-slot="v" rules="required" slim>
      <p class="form-group" :class="v.classes">
        <input>
        <span class="form-label-error">{{ v.errors[0] }}</span>
      </p>
    ...
```

On tolère l'usage de l'attribut HTML natif `required` sur les inputs checkbox ou radio.

### Réinitialiser un formulaire et ses erreurs après validation

1. Utiliser `v-slot="{ handleSubmit, reset }"`
2. `<form v-on:submit.prevent="handleSubmit(submitForm)" v-on:reset.prevent="reset" ref="theform">`

Puis exploitable côté script à la demande

```js
this.$nextTick(() => {
  this.$refs['theform'].reset()
})
```

## Performance

- Compression : [Nuxt.js on Brotli](https://blog.lichter.io/posts/nuxtjs-on-brotli/)
- Cache : [Nuxt SSR cache](https://www.npmjs.com/package/nuxt-ssr-cache)

### Lazy-loading de routes

- Lazy-loading de routes pour les pages les moins consultées : on utilise <https://vuejs.org/api/general.html#defineasynccomponent>

```js
const routes = [
  { path: '/', component: defineAsyncComponent(() => import('./Home.vue')) }
  { path: '/apropos', component: defineAsyncComponent(() => import('./Apropos.vue')) }
]
```

### Lazy-loading de composants

- Lazy-loading import à l’interaction : on utilise <https://calendar.perfplanet.com/2020/optimizing-performance-with-the-import-on-interaction-pattern/>

```vue
<script setup>
defineComponent({
  name: 'xxx',
  components: {
    LeComposant: defineAsyncComponent(() => import('~/components/component.vue'))
  }
})

const activated = ref(false)
</script>

<template>
  <header>
    <LeComposant v-if="activated" />
  </header>
</template>
```

## Modales

Gestion des modales avec [Teleport](https://vuejs.org/guide/built-ins/teleport.html#teleport)

```vue
<Teleport to="body">
  <modal v-if="isOpened"
    name="burger"
    variant="modal-simple modal-xxx"
    classname="modal-burger"
    title="Menu"
  >
    <p>Le contenu de la modale, ou un autre composant :</p>
    <modal-burger></modal-burger>
  </modal>
</Teleport>
```

## Nuxt

### Pratiques permises par Nuxt

- Routage automatique (fichiers placés dans `pages/`) <https://v3.nuxtjs.org/docs/directory-structure/pages>
- Layouts (dossier `layouts/`) <https://v3.nuxtjs.org/docs/directory-structure/layouts>
- Gestion des erreurs avec `error.vue` <https://nuxtjs.org/docs/2.x/concepts/views#error-page>
- Auto-import des composants <https://v3.nuxtjs.org/concepts/auto-imports#auto-imports>
- Transitions full-page

Exécution du code en front ou en back (SSR) : vérifier `process.client` ou `process.server`

### Distinction exécution client (navigateur) / serveur (SSR, node)

Dans la liste des plugins de `nuxt.config.js` on distingue ceux destinés au côté client et ceux destinés au côté serveur, ou les deux.

```js
plugins: [
  { src: '~/plugins/vue-scrollto', mode: 'client' },
  { src: '~/plugins/something', mode: 'server' },
  { src: '~/plugins/axios' },
]
```

### Extensions

- Nuxt Content <https://content.nuxtjs.org/fr/>

### Accéder au store ou à un autre plugin injecté

Nous utilisons les [plugins](https://v3.nuxtjs.org/guide/directory-structure/plugins) Nuxt pour faire des opérations au niveau global.

```js
/**
 * @see https://v3.nuxtjs.org/api/composables/use-nuxt-app
 */
export default defineNuxtPlugin(nuxtApp => {
  // Faire des choses sur l'objet `nuxtApp`
})
```

---

## Astuces

### Déployer sur un CDN/statique/AWS S3/Cloudfront

Suivre les indications de <https://nuxtjs.org/deployments/amazon-web-services> et [Guidelines Vue-Nuxt-S3](Guidelines-Vue-Nuxt-S3.md).

### Générer une instance de composant et l'attacher dans le DOM

⚠️ Ce fonctionnement n'est pas forcément le même dans Vue 3

```js
import TheComponent from '~/components/TheComponent.vue'

// ...

// Props du composant
const props = {
    prop1: 'value1',
    prop2: 'value2'
}

// On génère une instance de composant à la volée avec les props correspondantes
const Duplicate = Vue.extend(TheComponent)
const Component = new Duplicate({
    propsData: props,
    store: this.$store,
    // i18n: this.$i18n (s'il y a i18n)
})

// On l'insère dans le DOM
const mp = document.querySelector('#mount-point')
Component.$mount(mp)
```
