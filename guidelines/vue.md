# Guidelines : VueJS, Nuxt et Front-End en général

Ce document rassemble les bonnes pratiques appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/) concernant **"VueJS"**. Ces indications sont destinées à évoluer dans le temps et à s'adapter à chaque nouveau projet.

## Extensions Visual Studio Code recommandées

Pour les projets de type Vue et Nuxt, on ajoute `vue.volar` à `.vscode/extensions.json`.

### Volar

[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) est un ensemble d'outils (coloration, linter) nécessitant un fichier `tsconfig.json` (normalement générés par défaut).

## Installation et configuration initiale

### Installation de Vue

Documentation: <https://vitejs.dev/guide/#scaffolding-your-first-vite-project>

### Installation de Nuxt

Documentation : <https://nuxt.com/docs/getting-started/installation>

## Dépendances

Les dépendances fortement recommandées sont :

- [pinia](https://pinia.vuejs.org/) (store)
- [vue-router](https://router.vuejs.org/) (routage)
- [vue-i18n](https://kazupon.github.io/vue-i18n/) (traduction) et [vue-i18n-loader](https://www.npmjs.com/package/@intlify/vue-i18n-loader)
- [vueuse/head](https://github.com/vueuse/head) : Balises meta, SEO.
- [vueuse](https://vueuse.org/): Utilités composition API (debounce, click-outside, etc.)

👉 Avant l'ajout d’une dépendance au projet (`npm install`) vérifier le poids avec <https://bundlephobia.com/> ou inspecter avec <https://node-modules.dev/>.

## Composants : conventions et nommage

- On classe les composants dans des sous-dossiers selon leur usage (ex : ui/, profile/, modals/).
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

⚠️ On évite au maximum d'utiliser les instructions natives pour privilégier les techniques propres à Vue :

- `ref` pour sélectionner un noeud DOM plutôt que `getElement*` ou `querySelector`
- classes et styles dynamiques avec `:class`, voire `v-show` plutôt que d'accéder à la propriété de style `style.display = '...'`

### Styles

Les styles des composants sont écrits dans le fichier `.vue` du composant lui-même.

- Les styles sont de préférences scopés (attribut `scoped`) pour ne pas affecter les autres composants.

Cette méthode permet d'avoir le JS, HTML, et CSS au même endroit et d'éviter le code mort une fois le composant supprimé. Nous évitons aussi une arborescence de fichiers trop volumineuse dès que le projet commence à grossir.

En plus de cela, inclure les styles directement dans le composant facilite le lazy-loading des styles le jour où nous en aurions besoin.

Attention : les composants doivent rester lisibles, il ne faut donc pas hésiter à sous découper le template en plusieurs composants (sans en abuser évidement).

```vue
<script setup lang="ts"></script>

<template>
  <button>
    <span>Contenu du bouton</span>
  </button>
</template>

<style scoped>
button {
  color: hotpink;
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
defineProps<{
  person: Person
}>()

// ✅ (si besoin de valeur par défaut)
withDefaults(
  defineProps<{
    person?: Person
  }>(),
  {
    person: { /* */ }
  }
)

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

👉 Lors d'un développement avec données partielles/de remplissage :

- On préfixe par `TEMP` autant que possible (afin que ce soit clairement identifiable dans le code).

### Computed

On favorise au maximum les propriétés calculées pour des raisons de performance/cache/concision, calcul automatique sans avoir besoin de déclencher une fonction. Voir <https://vuejs.org/guide/essentials/computed.html#computed-properties>

### Methods

On privilégie un nommage bien parlant. Les méthodes sont appelées sans parenthèses dans le template.

### Events

Voir <https://vuejs.org/guide/essentials/event-handling.html#event-handling>

Pour _debounce_ des événements (limiter leur nombre d'appels toutes les _n_ millisecondes) voir <https://www.npmjs.com/package/lodash.debounce>

La définitions des `emits` se fera de cette manière:

```vue
<script setup lang="ts">
defineEmits<{
  change: [param: string  /* ou autre */]
  update: [param: number /* ou autre */]
}>()
</script>
```

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

## Internationalisation (i18n)

Usage de <https://github.com/intlify/vue-i18n-next> avec fichiers de configuration des langues (par exemple `i18n/fr-FR.js` et `i18n/en-US.js`) organisant les chaînes par une structure objet. On privilégie les regroupements par fonctionnalité (ex : formulaires, boutons, actions utilisateur communes), puis par nom de composant s'ils sont plus spécifiques.

- En tant que texte brut dans un balisage HTML : `<legend>{{ $t('identSignin.createAccount') }}</legend>`
- En tant que valeur de prop/attribut : `:placeholder="$t('formInput.lastname')"`
- En tant que valeur dans script : `title: $t('result.title')`
- En tant que condition : `v-if="$i18n.locale == 'fr'"`
- Lien racine : `<nuxt-link :to="localePath('/')">`

On formate les nombres/prix avec `$n(13.37, 'currency')` ou `$n(13.37, { currency: 'EUR' })`. Voir aussi <https://vue-i18n.intlify.dev/guide/essentials/number.html#basic-usage> pour importer _numberFormats_ dans le fichier de configuration (vueI18n).

Pour des formatages plus complexes voir <https://kazupon.github.io/vue-i18n/guide/formatting.html#html-formatting>

### Écrire des clés i18n dans une fichier/composant Vue

Permet d'utiliser la balise `<i18n>` en fin de fichier et de ne pas faire grossir le fichier commun des chaînes traduites. À utiliser avec modération (textes uniques de pages types).

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

## Lazy-loading de routes

- Lazy-loading de routes pour les pages les moins consultées : on utilise <https://vuejs.org/api/general.html#defineasynccomponent>

```js
const routes = [
  { path: '/', component: defineAsyncComponent(() => import('./Home.vue')) }
  { path: '/apropos', component: defineAsyncComponent(() => import('./Apropos.vue')) }
]
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
