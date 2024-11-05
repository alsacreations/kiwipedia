# Spécification page Home (Accueil)

## Description 📝

La page d'accueil est la page de destination initiale de l'utilisateur. Elle se compose des composants suivants :

- Header
- Breadcrumb
- Navigation
- Contenu
  - Bloc "Design"
  - Bloc "Intégration"
  - Bloc "WordPress"
  - Bloc "Applications web"
- Footer

### Description détaillée mobile

### Description détaillée desktop

## Maquettes 📸

- Mobile : …
- Desktop : …

## Définition du besoin _(Client)_

_Description précise et concise de votre demande : contexte et user story associée (exemple : "En tant que (utilisateur/rôle métier), je souhaite (besoin), afin de (bénéfice attendu)")_

- URL : … _(page où l'évolution doit être apportée)_

## Liste des spécificités _(Client)_

… Listez de manière exhaustive et détaillée, les besoins techniques attendus (exemple : "_on veut des filtres_" : lesquels ? sont-il cumulables ?)

## Infos techniques générales ⚙️

- Intégrer en mobile first. Breakpoints : `width >= 48rem` (=768px), `width >= 80rem` (=1280px).
- CSS Vanilla (pas de Tailwind si possible, un seul niveau de nesting si possible avec `&`).
- Aucune valeur en dur, utiliser `var()` avec les variables dans `vars.css` générées par UnoCSS.

## Infos techniques spécifiques ⚙️

- Les spécifications des composants internes (header, blocs internes, footer, etc.) font l'objet d'une spécification dédiée.
- Quelles sont les spécificités de la grille ?
- Quel est le title de la page ?
- Quelle est la meta description de la page ?
- Bien ajouter un accès rapide (skip link) pour la navigation au clavier

## Estimation ⏳

… Estimation de la complexité / temps

## Comment tester ? 🧪

- Vérifier la conformité de l'intégration avec la maquette
- Vérifier les interactions (dans la limite du scope de l'issue)
- Vérifier le parcours au clavier
- Vérifier la responsivité mobile/desktop
