# TypeScript

> Statut : stable · Niveau : intermédiaire

Conventions **spécifiques à Alsacréations** pour TypeScript, en complément des [Guidelines JavaScript](javascript.md). Les bonnes pratiques génériques (typer systématiquement les paramètres et le retour des fonctions, génériques contraints via `keyof` pour l'autocomplétion, nommage des types en `PascalCase`…) ne sont **pas** reprises ici&#8239;: elles sont déjà appliquées par défaut. Ce document ne liste que ce qui distingue nos projets d'un projet TypeScript standard — à appliquer sans qu'il soit nécessaire de le redemander.

---

## Outillage imposé

> ✅ **Par défaut** — [ESLint](https://eslint.org/) + [typescript-eslint](https://typescript-eslint.io/) pour la validation.

## `type` plutôt que `interface`

Convention maison&#8239;: utiliser `type` plutôt que `interface` dès que c'est possible, pour ne pas faire cohabiter deux mots-clés différents pour la même chose — `type` est plus versatile (unions, intersections, utilitaires).

```ts
type Post = {
  title: string
  content: string
  published_on: Date | string
}
```

## JSDoc&#8239;: décrire, jamais typer

JSDoc documente le *rôle* d'une fonction/d'un paramètre, jamais son type — celui-ci est déjà porté par TypeScript. Ne pas dupliquer l'information dans les tags JSDoc (`@param {string} id` est une redondance à éviter, contrairement à un contexte JS pur où JSDoc porte les types&#8239;: voir [Conventions de nommage](naming-conventions.md)).

```ts
/**
 * Récupère un post.
 * @param id L'id du post
 */
const getPost = (id: string): Promise<Post> => { ... }
```

---

## Voir aussi

- [JavaScript](javascript.md) — Règles applicables également à TypeScript.
- [Vue.js et Nuxt](vue.md) — Typage des composants (props, emits).
- [Initialisation de projet](../starters/project-init.md) — Configuration `tsconfig.json`.
