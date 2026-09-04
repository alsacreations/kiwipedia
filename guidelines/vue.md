# Vue.js et Nuxt

> Statut : stable · Niveau : avancé

Conventions **spécifiques à Alsacréations** pour Vue.js et Nuxt. Les bonnes pratiques génériques (Composition API, réactivité, `<script setup>`, composants en `PascalCase` — voir [Conventions de nommage](naming-conventions.md) —, `v-for` toujours accompagné de `:key`, favoriser les `computed` aux méthodes, extraire des composables pour éviter la duplication…) ne sont **pas** reprises ici&#8239;: elles sont déjà appliquées par défaut. Ce document ne liste que ce qui distingue nos projets d'un projet Vue/Nuxt standard — à appliquer sans qu'il soit nécessaire de le redemander.

---

## Outillage et dépendances imposées

> ✅ **Par défaut** — [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (`vue.volar` dans `.vscode/extensions.json`), et cette pile de dépendances plutôt que des alternatives équivalentes&#8239;:

- [Pinia](https://pinia.vuejs.org/) pour le store.
- [vue-router](https://router.vuejs.org/) pour le routage.
- [vue-i18n](https://kazupon.github.io/vue-i18n/) + [vue-i18n-loader](https://www.npmjs.com/package/@intlify/vue-i18n-loader) pour la traduction.
- [@vueuse/head](https://github.com/vueuse/head) pour les balises meta/SEO.
- [VueUse](https://vueuse.org/) pour les utilitaires Composition API (debounce, click-outside…) — ne pas réimplémenter ce que VueUse couvre déjà.

> 💡 Avant d'ajouter une dépendance (`npm install`), vérifier son poids avec [pkg-size.dev](https://pkg-size.dev/) ou l'inspecter avec [node-modules.dev](https://node-modules.dev/).

## Organisation des composants

- Sous-dossiers par usage (`ui/`, `profile/`, `modals/`…), pas par type technique.
- Jamais d'attribut `id` sur un élément de composant&#8239;: un composant réutilisé plusieurs fois sur une page dupliquerait l'id. Générer un id unique à l'exécution (ex. [uuid](https://www.npmjs.com/package/uuid)) si un id est réellement nécessaire.
- Styles écrits dans le fichier `.vue` du composant, avec l'attribut `scoped` par défaut&#8239;: colocalisation JS/HTML/CSS, pas de code mort résiduel une fois le composant supprimé. Sous-découper le template en composants dès qu'il devient difficile à lire.

## Template

- `v-if`, `v-for`, `v-show` sont toujours les premières directives déclarées sur l'élément.
- Espacer les expressions entre moustaches&#8239;: `{{ variable }}`, jamais `{{variable}}`.
- `:key` sur un `v-for` peut aussi servir à [forcer le rafraîchissement d'un composant](https://michaelnthiessen.com/force-re-render/) — pas seulement à satisfaire le linter.

## Props

Toute prop a une valeur par défaut sauf si elle est requise. Les props booléennes sont préfixées `is` (`isLoading`, `isReady`). Préférer un objet complet à une liste de props éclatées&#8239;:

```vue
<script setup lang="ts">
// ✅ un objet complet
defineProps<{ person: Person }>()

// ❌ trop verbeux — une prop par champ
defineProps({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
})
</script>
```

## Data

Regrouper les champs de formulaire liés (`v-model`) dans un seul objet `reactive`, envoyé tel quel à l'API plutôt que reconstruit&#8239;:

```js
const form = reactive({ email: '', productQty: 0 })
```

En développement avec données de remplissage, préfixer par `TEMP` pour qu'elles restent repérables dans le code.

## Events

Définir les `emits` typés plutôt qu'un tableau de chaînes&#8239;:

```vue
<script setup lang="ts">
defineEmits<{
  change: [param: string]
  update: [param: number]
}>()
</script>
```

Pour limiter la fréquence d'un événement, [lodash.debounce](https://www.npmjs.com/package/lodash.debounce) plutôt qu'un debounce maison.

## Composants globaux

Pour les composants utilisés très fréquemment (ex. `Icon`), enregistrement global plutôt qu'un import répété partout&#8239;:

```js
import { createApp } from 'vue'
import Icon from '@/components/global/Icon.vue'

const app = createApp({})
app.component('icon', Icon)
```

À réserver aux composants réellement transverses — l'import local reste la règle par défaut.

## Internationalisation (i18n)

[vue-i18n](https://github.com/intlify/vue-i18n-next), fichiers de config par langue (`i18n/fr-FR.js`, `i18n/en-US.js`). Regrouper les clés par fonctionnalité (formulaires, actions communes…) d'abord, par nom de composant seulement si plus spécifique.

| Contexte | Syntaxe |
| --- | --- |
| Texte brut | `{{ $t('identSignin.createAccount') }}` |
| Valeur de prop/attribut | `:placeholder="$t('formInput.lastname')"` |
| Dans le `<script>` | `title: $t('result.title')` |
| Condition sur la locale | `v-if="$i18n.locale == 'fr'"` |
| Lien racine | `<nuxt-link :to="localePath('/')">` |
| Nombres/prix | `$n(13.37, 'currency')` ou `$n(13.37, { currency: 'EUR' })` |

Pour des clés propres à un seul composant (texte de page unique), bloc `<i18n>` en fin de fichier plutôt que de faire grossir les fichiers de traduction communs — à utiliser avec modération&#8239;:

```html
<i18n>
{
  "fr": { "title": "Le titre", "description": "La description" }
}
</i18n>
```

## Modales

[Teleport](https://vuejs.org/guide/built-ins/teleport.html#teleport) vers `body`, via le composant maison `<modal>` (props `name`, `variant`, `classname`, `title`) plutôt qu'une modale ad hoc par cas d'usage&#8239;:

```vue
<Teleport to="body">
  <modal v-if="isOpened" name="burger" variant="modal-simple" classname="modal-burger" title="Menu">
    <modal-burger />
  </modal>
</Teleport>
```

---

## Voir aussi

- [JavaScript](javascript.md) — Idiomes et bonnes pratiques.
- [TypeScript](typescript.md) — Typage des composants.
- [Accessibilité](accessibility.md) — Patterns ARIA dans les composants.
- [Conventions de nommage](naming-conventions.md) — Langue, casse, séparateurs.
- [Visual Studio Code](vscode.md) — Configuration et extensions Vue/Volar.
