# Spécification page Home (Accueil)

## Description globale 📝

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

## Screenshot 📸

...ici une image...

## Description détaillée (mobile et desktop)

## Maquettes 🎨

- Mobile et Desktop (liens)

## Infos techniques générales ⚙️

- Intégrer en mobile first. Breakpoints : `width >= 48rem` (=768px), `width >= 80rem` (=1280px).
- CSS Vanilla (pas de Tailwind si possible, un seul niveau de nesting si possible avec `&`).
- Aucune valeur en dur, utiliser `var()` avec les variables dans `vars.css` générées par UnoCSS.

## Infos techniques spécifiques ⚙️

- Les spécifications des composants internes (header, blocs internes, footer, etc.) font l'objet d'une spécification dédiée.
- Quelles sont les spécificités de la grille ?
- Quel est le title de la page ?
- Quelle est la meta description de la page ?
- Bien ajouter un accès rapide (_skip link_) pour la navigation au clavier
- Définir quels sont les blocs modifiables, et par quel moyen ?

## Estimation ⏳

… Estimation de la complexité / temps

## Comment tester ? 🧪

- Vérifier la conformité de l'intégration avec la maquette
- Vérifier les interactions (dans la limite du scope de l'issue)
- Vérifier le parcours au clavier
- Vérifier la responsivité mobile/desktop
