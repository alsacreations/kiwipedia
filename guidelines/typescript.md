# TypeScript

> Statut : stable · Niveau : intermédiaire

**TL;DR** — Bonnes pratiques TypeScript chez Alsacréations : typage strict, génériques, fonctions type-safe. Les règles JavaScript s'appliquent en plus.

Ce document rassemble les bonnes pratiques appliquées par l'agence [Alsacreations.fr](https://www.alsacreations.fr/) concernant **TypeScript**. Il évolue dans le temps et s'adapte à chaque nouveau projet.

## Ressources

- 🔗 [Type Challenges](https://github.com/type-challenges/type-challenges) — Pour s’entraîner.
- 🔗 [Bonnes pratiques TypeScript — Julien Pradet](https://www.julienpradet.fr/tutoriels/typescript-bonnes-pratiques/)
- 🔗 [Types avancés TypeScript — Julien Pradet](https://www.julienpradet.fr/tutoriels/typescript-types-avances/)

---

## Généralités

Les règles des [Guidelines JavaScript](javascript.md) s'appliquent également ici.

### Syntaxe et nommage

- Valider le code avec [eslint](https://eslint.org/) ainsi que [typescript-eslint](https://typescript-eslint.io/).

## Types et interfaces

Utiliser des types plutôt que des interfaces **quand cela est possible** pour réduire au maximum l'utilisation de deux mots clés différents, sachant que `type` est plus versatile.

Commencer chaque type par une majuscule.

```ts
type MaybeDate = Date | String

type Post = {
  title: string,
  content: string,
  published_on: MaybeDate
}

type GetPost = () => Promise<Post>
```

## Fonctions

Typer les paramètres d'une fonction, et au **maximum du possible** typer le retour des fonctions.

Lire [TypeScript Function Types: A Beginner's Guide](https://dmitripavlutin.com/typescript-function-type/)

Utiliser JSDoc pour expliquer le role de la fonction et de ses paramètres. Il ne faudra cependant pas indiquer les types avec JSDoc mais TS uniquement.

```ts
/**
 * Récupère un post
 *
 * @param id L'id du post
 */
const getPost = (id: string): Promise<Post>  => { ... }

const obj = {
  /**
   * Récupère un post
   *
   * @param id L'id du post
   */
  getPost(id: string): Promise<Post> {
    ...
  }
}
```

Écrire les fonctions de manière à ce qu'elles soient le plus "type safe".

```ts
type ExampleFn = <
  T extends Record<string, any>, // T doit étendre un objet
  K extends keyof T // K étendra une des clés de T
>(obj: T, key: K) => T[K]
```

De cette façon, il n'y a aucune marge d'erreur possible et `K` est obligé d'exister dans les clés de `T` (en plus de proposer une autocomplétion).

---

## Voir aussi

- [JavaScript](javascript.md) — Règles applicables également à TypeScript.
- [Vue.js](vue.md) — Typage des composants.
- [Initialisation de projet](../starters/project-init.md) — Configuration `tsconfig.json`.
