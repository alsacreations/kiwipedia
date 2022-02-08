# Guidelines : Vue.js, Nuxt et Front-End en général

Statut : Working Draft (WD)

Cette présente convention rassemble les bonnes pratiques "Vue.js, Nuxt et Front-End" en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Environnement de code HTML, CSS, JavaScript

L'Éditeur de code recommandé pour HTML, CSS, PHP, JS est [Visual Studio Code](https://code.visualstudio.com/). Il est libre (son noyau), gratuit et bénéficie de nombreuses mises à jour. Voir les [Guidelines VScode](Guidelines-VScode.md) pour plus d'informations.

## Extensions Visual Studio Code recommandées

Pour les projets de type Vue et Nuxt, la liste des extensions VScode utile est composée de : Editorconfig, ESlint, Stylelint, Markdownlint, Vetur, SCSS Intellisense, Tailwind CSS IntelliSense, todo-highlight.

Fichier d'extensions `extensions.json` à placer à la racine du projet au sein d'un dossier `/.vscode` ([afficher/télécharger ce fichier](assets/vue-nuxt-front-end/.vscode/extensions.json))

```yaml
{
  "recommendations": [
    "EditorConfig.EditorConfig",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint",
    "DavidAnson.vscode-markdownlint",
    "mrmlnc.vscode-scss",
    "octref.vetur",
    "mikestead.dotenv",
    "bradlc.vscode-tailwindcss",
    "wayou.vscode-todo-highlight"
  ]
}
```

## Linters

Les différents fichiers de configuration des Linters sont :

- EditorConfig : cf. `.editorconfig`
- ESLint : cf. `.eslintrc.js`
- Stylelint : cf. `.stylelintrc` (voir détails plus loin)
- *Note : Prettier crée des conflits avec ESLint (ex. sauts de ligne dans les balises). Il est donc recommandé de le désactiver sur les projets Vue/Nuxt.*

La configuration fournie dans le fichier `/.vscode/settings.json` permet de :

- Définir ESLint comme linter/formateur par défaut
- De corriger automatiquement les erreurs ESLint lors de la sauvegarde du fichier
- De désactiver les linters natifs VSCode CSS et scss et d'activer Stylelint uniquement pour éviter certains conflits.

([Afficher/télécharger le fichier `settings.json`](assets/vue-nuxt-front-end/.vscode/settings.json))

```yaml
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

Il est étendu aux fichiers HTML à l'aide d'un plugin installé via `npm install eslint-plugin-html --save-dev` et ajouté dans le fichier de configuration ESlint ainsi :

```yaml
"plugins": [
  "html"
],
```

Via le plugin eslint-plugin-vue on applique [les groupes de règles](https://eslint.vuejs.org/rules/) dans le fichier `.eslintrc.js` avec le tableau extends : *Priority A: Essential (plugin:vue/essential)*, *Priority B: Strongly Recommended (plugin:vue/strongly-recommended)*, *Eslint recommended : eslint:recommended*. Pour Nuxt : *plugin:nuxt/recommended*.

Modification de *Priority B* : on veut des `v-on:click` plutôt que `@click` : `'vue/v-on-style': ['warn', 'longform'],`. On peut aussi vouloir harmoniser l'ordre des déclarations dans les composants avec `'vue/order-in-components': 'warn'`.

([Afficher/télécharger le fichier complet recommandé `.eslintrc.js`](assets/vue-nuxt-front-end/.eslintrc.js)).

### Stylelint

Stylelint est l'unique formatteur pour les styles CSS et scss du projet. Les Linters natifs CSS et scss de VSCode **doivent être désactivés** (voir précédemment).

La procédure d'installation de Stylelint est la suivante :

- Installer l'extension [Stylelint pour VSCode](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint),
- Installer le package Stylelint via `npm install stylelint --save-dev` *(ceci étant généralement déjà prévu dans le `package.json` du projet)*,
- Installer la configuration recommandée de Stylelint via `npm install stylelint-config-recommended --save-dev`
- Créer un fichier `stylelint.config.js` contenant les règles à appliquer.

([Afficher/télécharger le fichier `stylelint.config.js` recommandé](assets/vue-nuxt-front-end/stylelint.config.js)).

### Prettier

Prettier est un formateur de syntaxe permettant d'assurer une consistance tout au long du projet (sauts de ligne, guillemets simples ou doubles, etc.).

**Note : Prettier crée des conflits avec ESLint (ex. sauts de ligne dans les balises). Il est donc recommandé de le désactiver sur les projets nécessitant ESlint.**

### Markdownlint

Markdownlint est un linter pour langage Markdown et prend en compte toutes les règles à appliquer sur les fichiers `.md` notamment les fichiers `readme.md` présents dans chaque projet.

### Vetur

Ensemble d'outils Vue pour VSCode (coloration, linter). Vetur nécessite un fichier `jsconfig.json` dont voici un exemple :

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

- `development` en mode `npm run dev` ou `npm run generate`
- `production` en mode `npm run build` ou `npm run start`

Dans Nuxt, nécessite l’installation de [dotenv-module](https://github.com/nuxt-community/dotenv-module) :

- les variables doivent être préfixées de `VUE_APP_`, exemple `VUE_APP_API_URL=https://api.example.org:80` pour être utilisées dans les scripts avec `process.env.VUE_APP_API_URL`
- dans les composants ou dans nuxt.config.js on pourra utiliser `process.env.NODE_ENV` par exemple `if (process.env.NODE_ENV === 'development')`

Voir aussi <https://stackoverflow.com/questions/55406055/toggle-between-multiple-env-files-like-env-development-with-node-js>.

### config.js

config.js
Les variables de configuration ou globales (activation de fonctionnalités) sont ajoutées dans le fichier config.js dans l'entrée correspondante. Si cette entrée n'existe pas, il convient d'en ajouter une nouvelle.
const config = {
  isProduction: isMaster,
  app: {
    title: 'MonApp',
  },
  api: {
    apiUrl: process.env.VUE_APP_API_URL
...

## Installation et configuration initiale

### Installation de Vue

L'installation d’un nouveau projet se fait à l’aide de [vue cli](https://cli.vuejs.org/) : `npm install -g @vue/cli`, voir aussi <https://cli.vuejs.org/guide/creating-a-project.html>

- Par interface graphique : `vue ui`
- Par ligne de commande `vue create <projet>`

Options recommandées :

- Manually select features
- ESLint (sans Prettier)
- Lint on save
- Config in dedicated config files

On développe avec `npm run serve`, on compile avec `npm run build`

### Installation de Nuxt

Doc : <https://nuxtjs.org/docs/2.x/get-started/installation>

```yaml
npm init nuxt-app
```

Réponses recommandées aux questions :

- Programming language: JavaScript
- Package manager: Npm
- UI framework: au choix ou None si on ajoute Tailwind autrement
- Modules: Axios si usage d'API
- Linting tools : EsLint (PAS Prettier) + Stylelint
- Testing: None ou selon projet
- Rendering mode: SSR/SSG
- Deployment target: selon projet
- Development tools : jsconfig.json
- Continuous integration: None
- Version control system: Git

Installation de Tailwind dans Nuxt : voir <https://tailwindcss.com/docs/guides/nuxtjs>

## Dépendances

Les dépendances fortement recommandées sont :

- [vuex](https://vuex.vuejs.org/) (store)
- [vue-router](https://router.vuejs.org/) (routage)
- [vue-i18n](https://kazupon.github.io/vue-i18n/) (traduction) et [vue-i18n-loader](https://www.npmjs.com/package/@intlify/vue-i18n-loader)
- [axios](https://fr.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html) s'il y a usage d'une API

Les dépendances de développement recommandées sont : eslint, eslint-plugin-vue, sass, autoprefixer, babel.

👉 Avant l'ajout d’une dépendance au projet (`npm install`) vérifier le poids avec <https://bundlephobia.com/>.

Autres dépendances utiles :

- [vue-the-mask](https://vuejs-tips.github.io/vue-the-mask/) : masques de saisie (téléphone, date, code postal, carte bancaire...).
- [vee-validate](https://logaretm.github.io/vee-validate/overview.html) : validation de formulaires.
- [v-calendar](https://vcalendar.io/) : calendrier, datepicker.
- [vue-gtag](https://github.com/MatteoGabriele/vue-gtag) : G. Analytics.
- [date-fns](https://date-fns.org/) : Dates.
- [vue-meta](https://vue-meta.nuxtjs.org/) : Balises meta, SEO.
- [vue-toasted](https://github.com/shakee93/vue-toasted) : Notifications/toasts.
- [vue-infinite-loading](https://peachscript.github.io/vue-infinite-loading/) : Infinite loading.
- [vue-svg-loader](https://vue-svg-loader.js.org/) : Icônes SVG + composant maison permettant de compiler/inline tous les fichiers SVG avec `<icon i="nomdelicone">` + `fill="currentColor"` dans le .svg ; pour créer un sprite à base de `<symbol>` : nuxt-svg-sprite-module (qui sans surprise reprend svg-sprite-module).

## Composants : conventions et nommage

- On classe les composants dans des sous-dossiers selon leur usage (ex : ui/, profile/, modals/).
- Tous les composants ont une propriété name de la même syntaxe que l'on retrouve dans les autres `<template>`. Si `name: 'MonComposant'` alors on écrira `<MonComposant>` ; si `name: 'mon-composant'` alors on écrira `<mon-composant>`.
- Les noms de fichiers et de classes sont en anglais-américain (en-US).

### Template

- Les directives `v-if`, `v-for` et `v-show` sont sur la même ligne que la déclaration du composant. De cette manière, on peut identifier en un coup d’œil ces conditions importantes, même si le bloc de code est compacté dans l'éditeur. Le reste des attributs HTML et directives Vue vont en dessous, à la ligne. Règle eslint : `vue/max-attributes-per-line`.
- La directive `v-for` est toujours complétée par `:key` pour les itérations. `:key` peut être utilisée pour [forcer le rafraîchissement d’un composant](https://michaelnthiessen.com/force-re-render/).
- On espace les expressions entre moustaches `{{ variable }}`.
- On écrit les composants en `<PascalCase>`.
- On n'utilise pas les attributs `id` car ils peuvent se retrouver dupliqués dans la page si un composant est utilisé plusieurs fois. Si besoin : `:id="'truc'+_uid"` car `_uid` est un identifiant unique généré pour chaque composant chargé.
- On utilise un élément `button` ou `input type="button"` plutôt qu'un lien pour des actions ne changeant pas de page.
- Pour l'ajout d'événements, on utilise `v-on:click="action"` au lieu de `@click="action"` pour rechercher plus facilement les événements de manière globale dans le code source du projet. La méthode est appelée sans parenthèses s'il n'y a pas de paramètre à lui passer. [Pourquoi ?](https://stackoverflow.com/questions/50635404/parentheses-while-calling-a-method-in-vue).

### Props

Toutes les props ont une valeur par défaut. Les variables d'état sont préfixées par `is` (ex : `isLoading`, `isDoingThis` , `isReady`).

### Data

On réunit les variables liées (v-model) à des champs de formulaires dans un objet unique, cela permet de les nommer/regrouper proprement et d'envoyer cet objet complet à l'API directement. Par exemple

```js
data() {
  return {
    form: {
      email : '',
      productQty: 0
    }
    autreData: ''
  }
}
```

Lors d'un développement avec données partielles/de remplissage, on peut préfixer les données temporaires par `TEMP`, `TODO`, etc, ou les charger depuis un fichier externe pour éviter la surcharge du composant `require('demodata.js')`.

### Computed

On favorise au maximum les propriétés calculées pour des raisons de performance/cache/concision, calcul automatique sans avoir besoin de déclencher une fonction. Voir <https://vuejs.org/v2/guide/computed.html>

### Methods

On privilégie un nommage bien parlant. Les méthodes sont appelées sans parenthèses dans le template.

### Events

Voir <https://vuejs.org/v2/guide/components-events.html>

Pour *debounce* des événements (limiter leur nombre d'appels toutes les *n* millisecondes) voir <https://dmitripavlutin.com/vue-debounce-throttle/>

### Hooks

Pour le chargement de données (depuis une API), on utilise le hook `created` et non pas `mounted`.

### Mixins

On privilégie l’écriture de [Mixins](https://fr.vuejs.org/v2/guide/mixins.html) pour éviter la répétition dans plusieurs composants.

### Composants globaux

Dans Vue, pour éviter d'avoir à importer des composants très fréquemment utilisés on peut initialiser un chargement de composants globaux. Le fichier `globalComponentLoader.js` est à ajouter aux plugins (dans le fichier `vue.config.js` ou `nuxt.config.js`) :

```js
export default
  plugins: [
    {
      // Loader de composants globaux
      src: '~plugins/globalComponentLoader.js'
    },
```

Exemple de contenu du fichier globalComponentLoader.js

```js
import Vue from 'vue'
import Icon from '@/components/global/Icon'
import ButtonSimple from '@/components/global/ButtonSimple'
import Alert from '@/components/ui/Alert'
Vue.component('icon', Icon)
Vue.component('button-simple', ButtonSimple)
Vue.component('alert', Alert)
```

## Routage

On utilise le paramètre :to ainsi qu'une route nommée. Ainsi, un retour à la page d'accueil se fait avec `:to="{ name: 'accueil' }"`

En cas de redirection à faire dans une fonction, on utilise router.push avec une route nommée, par exemple `router.push({ name: 'accueil' })` pour retourner à l'accueil.

## Store

Le store Vuex est toujours découpé en modules par type d'usage (ce qui permet de nommer également les mutations par module).

Nommage de clés :

- `id` pour les identifiants internes au store (itérations)
- `image` pour les urls vers des images
- `href` pour les liens externes
- `slug` pour les portions de texte servant à l'écriture des urls internes
- `title` pour le titre principal
- `label` lorsqu'il s'agit d'un titre court
- `description` pour la description étendue

## API

Les appels API sont gérés dans les stores correspondants, ou encore mieux via des fichiers spécifiques importés par les stores (~ `api.js`) pour ne pas surcharger l'écriture des composants. On utilise [Axios](https://axios.nuxtjs.org/). Voir aussi <https://www.smashingmagazine.com/2020/05/getting-started-axios-nuxt/>.

On utilise les promesses avec async/await et les blocs try/catch.

```js
async function getData() {
  try {
    const response = await axios.get('/api/data')
    return response.data
    // ou return await axios.$get('/api/data')
  } catch (error) {
    console.log(error) // Ou autre variante
    throw error
  }
}
```

### API en tant que plugin injecté

Dans `nuxt.config.js` on déclare un plugin `{ src: '~/plugins/api' },` et on utilise [Afficher/télécharger un exemple de fichier `api.js`](assets/vue-nuxt-front-end/api.js) qui permet la syntaxe `this.$api` dans les composants et dans le Store.

## Internationalisation (i18n)

Usage de <https://nuxt-community.github.io/nuxt-i18n/> avec fichiers de configuration des langues (par exemple `i18n/fr-FR.js` et `i18n/en-US.js`) organisant les chaînes par une structure objet. On privilégie les regroupements par fonctionnalité (ex : formulaires, boutons, actions utilisateur communes), puis par nom de composant s'ils sont plus spécifiques.

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

- Lazy-loading de routes pour les pages les moins consultées : on utilise <https://www.digitalocean.com/community/tutorials/vuejs-lazy-loading-vue-cli-3-webpack>

```js
const routes = [
  { path: '/', component: () => import('./Home.vue') }
  { path: '/apropos', component: () => import('./Apropos.vue') }
]
```

### Lazy-loading de composants

- Lazy-loading import à l’interaction : on utilise <https://calendar.perfplanet.com/2020/optimizing-performance-with-the-import-on-interaction-pattern/>

```html
<template>
  <header>
    <LeComposant v-if="activated" />
  </header>
</template>
<script>
export default {
  components: {
    LeComposant: () => import('~/components/component.vue')
  },
  data() {
    return {
      activated: false
    }
  }
}
</script>
```

## Modales

TODO: Composant-type avec slot, overlay, ouverture/fermeture, piloté par l'intermédiaire du store.

```html
<modal
  name="burger"
  variant="modal-simple modal-xxx"
  classname="modal-burger"
  title="Menu"
  >
  <p>Le contenu de la modale, ou un autre composant :</p>
  <modal-burger></modal-burger>
</modal>
```

Ouvrir une modale : `this.$store.commit('modals/open', { name: 'burger' })`. Émettre un événement depuis une modale (dans un slot) : `$parent.$emit('blabla')`.

## Nuxt

### Pratiques permises par Nuxt

- Routage automatique (fichiers placés dans `pages/`) <https://nuxtjs.org/docs/2.x/get-started/routing>
- Layouts (dossier `layouts/`) <https://nuxtjs.org/docs/2.x/directory-structure/layouts>
- Gestion des erreurs avec `error.vue` <https://nuxtjs.org/docs/2.x/concepts/views#error-page>
- Auto-import des composants <https://fr.nuxtjs.org/docs/2.x/configuration-glossary/configuration-components>
- Transitions full-page

Exécution du code en front ou en back (SSR) : vérifier `process.client` ou `process.server`

### Distinction exécution client (navigateur) / serveur (SSR, node)

Dans la liste des plugins de `nuxt.config.js` on distingue ceux destinés au côté client et ceux destinés au côté serveur, ou les deux.

```js
plugins: [
  {src: '~/plugins/vue-scrollto', mode: 'client'},
  {src: '~/plugins/something', mode: 'server'},
  {src: '~/plugins/axios'},
]
```

### Hooks Nuxt

- asyncdata
- fetch

### Extensions

- Nuxt Content <https://content.nuxtjs.org/fr/>

### Accéder au store ou à un autre plugin injecté

On ajoute par exemple `{ src: '~/plugins/init', mode: 'client' },` aux plugins de `nuxt.config.js` (attention à l’ordre de chargement dans nuxt.config), avec cet exemple d'usage :

```js
export default function({ store, app: { $axios, $api } }) {
  // Si la session n'est pas établie...
  if (!store.getters['session/isLogged']) {
    store.dispatch('session/loadGetconnectedUser')
  }
}
```

---

## Astuces

### Déployer sur un CDN/statique/AWS S3/Cloudfront

Suivre les indications de <https://nuxtjs.org/deployments/amazon-web-services> et [Guidelines Vue-Nuxt-S3](Guidelines-Vue-Nuxt-S3.md).

### Générer une instance de composant et l'attacher dans le DOM

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
