---
name: alsacreations-guidelines
description: Guidelines techniques et conventions internes d'Alsacréations (Kiwipedia) — HTML, CSS, JavaScript, TypeScript, Vue.js, WordPress, PHP/MySQL, accessibilité, performance, SEO, RGPD, écoconception, sécurité HTTP, webdesign, workflow Git, cheatsheets. Utiliser ce skill dès qu'une question porte sur une convention de code, une bonne pratique, ou un standard qu'Alsacréations applique sur ses projets — avant d'écrire du code client, de faire une revue, ou de répondre à une question technique "comment on fait chez nous".
---

# Guidelines Alsacréations (Kiwipedia)

La source de vérité est le dépôt GitHub
[alsacreations/kiwipedia](https://github.com/alsacreations/kiwipedia),
branche `main`. Les fiches ne sont pas embarquées dans ce skill : les
récupérer à chaque usage depuis
`https://raw.githubusercontent.com/alsacreations/kiwipedia/main/<chemin>`.

## Méthode

1. Repérer la ou les fiches utiles dans la table ci-dessous. Si une question
   couvre plusieurs sujets (ex. « accessibilité + HTML »), récupérer chaque
   fiche.
2. Récupérer le texte brut, de préférence avec le shell, dans un fichier
   temporaire :
   `curl -fsSL https://raw.githubusercontent.com/alsacreations/kiwipedia/main/<chemin> -o <tmp>/<fichier>.md`.
   Sans shell, utiliser l'outil de lecture web en demandant le texte
   intégral des sections utiles, pas un résumé.
3. Fiche courte : la lire en entier. Fiche longue (plus de 15 Ko environ) :
   lister les titres (`grep -n '^#'`), puis ne lire que les sections
   pertinentes.
4. Les fiches commençant par un en-tête `> Statut` suivi d'un **TL;DR**
   pédagogique sont encore au format initial, destiné aux humains : en
   extraire uniquement ce qui est propre à Alsacréations.
5. Ne jamais présenter une convention « de mémoire » : la vérifier dans la
   fiche récupérée.
6. **Si le dépôt est inaccessible** (erreur réseau, 404, domaine bloqué) :
   le dire clairement à l'utilisateur, préciser quelle fiche n'a pas pu être
   lue, et ne pas combler avec des connaissances génériques présentées comme
   des conventions maison.
7. Si le sujet n'apparaît pas dans la table, ou si une fiche renvoie 404,
   récupérer `README.md` à la racine du dépôt : c'est l'index à jour.
8. Ignorer les images, le dossier `archives/` (ne pas appliquer sauf demande
   explicite) et `STYLE.md` (guide de rédaction des fiches).
9. Outils maison (Bretzel, Primary, Reset, KNACSS, Fondue, Elastic…) : le
   skill `alsacreations-tools` les recense.

## Table des fiches

### Démarrer un projet

| Chemin | Contenu |
|---|---|
| `starters/project-init.md` | Routine commune d'initialisation (statique, Nuxt, WordPress), Primary, outils qualité |
| `starters/vite.md` | Starter Vite pour les sites statiques |
| `starters/aws-s3.md` | Hébergement statique Nuxt/Vue sur S3 |

### Fondamentaux et conventions

| Chemin | Contenu |
|---|---|
| `guidelines/naming-conventions.md` | Langue, casse, verbes, `TODO`/`FIXME`, domaines factices |
| `guidelines/html.md` | Landmarks `role`+`id`, `no-js`/`js`, nommage des composants, formats d'images |
| `guidelines/css.md` | Architecture, `@scope`, design tokens, Bretzel, dark mode, typographie |
| `guidelines/javascript.md` | Amélioration progressive, `data-*`/classes, jQuery, plugin boilerplate |
| `guidelines/typescript.md` | `type` plutôt qu'`interface`, JSDoc sans typage redondant |
| `guidelines/icons.md` | SVGOMG, nettoyage manuel |
| `guidelines/git.md` | Conventional Commits en français, types, scope, conflits, `rerere` |
| `guidelines/vscode.md` | Configuration VS Code spécifique à l'agence |

### Stacks et frameworks

| Chemin | Contenu |
|---|---|
| `guidelines/vue.md` | Vue.js/Nuxt : dépendances imposées, props/data/events, i18n, modales `Teleport` |
| `guidelines/php-mysql.md` | Outillage imposé, style de fichier, types MySQL, index/pagination |
| `guidelines/wordpress/global.md` | WordPress : vue d'ensemble, hooks, hiérarchie des templates |
| `guidelines/wordpress/environnement.md` | Docker + Composer, structure de projet |
| `guidelines/wordpress/theme.md` | Thème : starter, CPT, taxonomies, menus, ACF, blocs (fiche longue) |
| `guidelines/wordpress/extensions.md` | Extensions via wpackagist, liste recommandée |
| `guidelines/wordpress/security.md` | Sécurité WordPress avant/pendant/après développement |
| `guidelines/wordpress/performance.md` | Cache, requêtes SQL |
| `guidelines/wordpress/accessibility.md` | Ressources accessibilité WordPress |
| `guidelines/wordpress/recette-mep.md` | Recette, mise en ligne, maintenance |
| `resources/wordpress-presets.md` | Presets CSS générés par `theme.json` |

### Qualité et exigences non fonctionnelles

| Chemin | Contenu |
|---|---|
| `guidelines/accessibility.md` | Checklist 3 niveaux, patterns ARIA, RGAA/WCAG (fiche longue) |
| `guidelines/performances.md` | Checklist 3 niveaux, cache, images, lazy-loading, Core Web Vitals |
| `guidelines/ecoconception.md` | Démarche RGESN 2024, checklist (fiche longue) |
| `guidelines/seo.md` | Sémantique, métadonnées, robots.txt, sitemap, données structurées |
| `guidelines/rgpd.md` | Consentement, cookies, services tiers, fuites |
| `guidelines/http-security.md` | En-têtes HTTP, CSP, HSTS, CORS, SSL, outils de test |
| `guidelines/interoperabilite.md` | RGI : standards ouverts, REST/JSON, UTF-8 |

### Design

| Chemin | Contenu |
|---|---|
| `guidelines/webdesign.md` | Arborescence, moodboard, wireframes, maquettes Figma, design system, livrables |

### Aide-mémoire

| Chemin | Contenu |
|---|---|
| `cheatsheets/htaccess.md` | Règles `.htaccess` (redirections, blocages, réécriture) |
