# Spécification section-type (ex. Ressources)

## Description globale 📝

La section Resources (1 "s" en anglais) est un bloc classique qui switche de 1 à 2 colonnes selon la taille disponible.

## Screenshot 📸

_Ici une image_

## Description détaillée (mobile et desktop)

- Une colonne (l'un sous l'autre) par défaut, 2 colonnes sur desktop
- Comporte :
  - Un titre
  - Un ou plusieurs paragraphes
  - Un bouton CTA avec un icône sur fond coloré)
  - Une couleur de fond
  - Sur desktop : une image de fond calée en bas à droite

## Maquettes 🎨

- Mobile et Desktop (liens)

## Infos techniques générales ⚙️

- Intégrer en mobile first. Breakpoints : `width >= 48rem` (=768px), `width >= 80rem` (=1280px).
- CSS Vanilla (pas de Tailwind si possible, un seul niveau de nesting si possible avec `&`).
- Aucune valeur en dur, utiliser `var()` avec les variables dans `vars.css` générées par UnoCSS.

## Infos techniques spécifiques ⚙️

- Zone de largeur "spacing-medium" :
  - `max-width: var(--spacing-medium)`
  - Correspond à 98rem (1568px) en desktop
- Bloc à coins arrondis : `border-radius: var(--border-radius-2xl);`
- Paddings dynamiques : se servir de ``padding-base` qui passe tout seul de `--spacing-32` à `--spacing-40` (desktop)
- Gouttière `gap` dynamique (de 24px à 40px) qui est gérée par le layout Switcher
- Pas besoin de Media Query : le layout Switcher fait le job
- Se servir du [Layout Switcher](http://bretzel.alsacreations.com/#layouts) fourni dans Bretzel :
  - variable `--container-size` à modifier en `var(--breakpoints-md)` (=768px), correspond au breakpoint pour passer de 1 à 2 colonnes
  - variable `--gutter` à modifier en `var(--gap-base)` :

## Estimation ⏳

1 jour

## Comment tester ? 🧪

- Vérifier la maquette
- Tester mobile/desktop (vérifier si la gouttière s'adapte et si l'image de fond apparaît)
- Tester au clavier
