# Guidelines TypeScript

Statut : WIP

Cette présente convention rassemble les bonnes pratiques TypeScript en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Généralités

Les règles des guidelines JavaScript s'appliquent également ici.

### Syntaxe et nommage

- Valider le code avec [eslint](https://eslint.org/) ainsi que [typescript-eslint](https://typescript-eslint.io/).

## Types et interfaces

Il conviendra de d'utiliser des types plutôt que d'interfaces **quand cela est possible**, cela permet de réduire au maximum l'utilisation de deux mots clés différents sachant que `type` est plus versatile.

Il est également requis de commencer chaque type par une majuscule.

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

Il faudra obligatoirement typer les paramètres d'une fonction, et au **maximum du possible** typer le retour des fonctions.

Il conviendra également d'utiliser JSDoc pour expliquer le role de la fonction et de ses paramètres. Il ne faudra cependant pas indiquer les types avec JSDoc mais TS uniquement.

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

Il faut également écrire les fonctions de manière à ce qu'elles soient le plus "type safe".

EX:

```ts
type ExampleFn = <
  T extends Record<string, any>, // T doit étendre un objet
  K extends keyof T // K étendra une des clés de T
>(obj: T, key: K) => T[K]
```

De cette façon il n'y a aucune marge d'erreur possible et `K` est obligé d'exister dans les clés de `T` (en plus de proposer une autocomplétion).
