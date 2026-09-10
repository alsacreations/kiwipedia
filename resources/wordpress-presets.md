# WordPress : Presets (theme.json)

## Qu'est-ce qu'un preset ?

Un preset est une variable CSS générée automatiquement par WordPress à partir des réglages déclarés dans la section `settings` du fichier `theme.json` d'un thème. Il n'existe pas de liste fixe de presets fournie nativement par WordPress : c'est le thème (et les extensions) qui définissent les valeurs disponibles, selon une structure de catégories imposée par WordPress.

👉 La formule de nommage est toujours la même :

```text
--wp--preset--{catégorie}--{slug}
```

## 1. Catégories de presets disponibles

Voici les catégories que l'on peut configurer dans `settings` de `theme.json` :

| Catégorie (`{catégorie}`) | Clé dans `theme.json` | Exemple de variable générée |
| --- | --- | --- |
| `color` | `settings.color.palette` | `--wp--preset--color--primary` |
| `gradient` | `settings.color.gradients` | `--wp--preset--gradient--vivid-cyan-blue` |
| `font-size` | `settings.typography.fontSizes` | `--wp--preset--font-size--large` |
| `font-family` | `settings.typography.fontFamilies` | `--wp--preset--font-family--heading` |
| `spacing` | `settings.spacing.spacingSizes` | `--wp--preset--spacing--16` |
| `shadow` | `settings.shadow.presets` | `--wp--preset--shadow--natural` |

Exemple de déclaration dans `theme.json` :

```json
{
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        { "name": "Base", "slug": "base", "color": "#ffffff" },
        { "name": "Contraste", "slug": "contrast", "color": "#111111" },
        { "name": "Primaire", "slug": "primary", "color": "#1d4ed8" }
      ]
    },
    "typography": {
      "fontSizes": [
        { "name": "Normal", "slug": "16", "size": "1rem" },
        { "name": "Grand", "slug": "24", "size": "1.5rem" }
      ]
    },
    "spacing": {
      "spacingSizes": [
        { "name": "4", "slug": "4", "size": "0.25rem" },
        { "name": "8", "slug": "8", "size": "0.5rem" },
        { "name": "12", "slug": "12", "size": "0.75rem" },
        { "name": "16", "slug": "16", "size": "1rem" },
        { "name": "24", "slug": "24", "size": "1.5rem" },
        { "name": "32", "slug": "32", "size": "2rem" },
        { "name": "48", "slug": "48", "size": "3rem" },
        { "name": "64", "slug": "64", "size": "4rem" }
      ]
    }
  }
}
```

👉 On nomme volontairement les slugs par leur équivalent en pixels (`4`, `8`, `12`, `16`...) plutôt qu'avec une échelle arbitraire (`20`, `30`, `40`...) : en partant du principe que `1rem = 16px` (taille de police par défaut du navigateur), le slug donne directement la valeur en pixels sans avoir à convertir mentalement, tout en restant en `rem` dans le CSS généré :

| Slug | Valeur `rem` | Équivalent `px` (base 16px) |
| --- | --- | --- |
| `4` | `0.25rem` | `4px` |
| `8` | `0.5rem` | `8px` |
| `12` | `0.75rem` | `12px` |
| `16` | `1rem` | `16px` |
| `24` | `1.5rem` | `24px` |
| `32` | `2rem` | `32px` |
| `48` | `3rem` | `48px` |
| `64` | `4rem` | `64px` |

## 2. Utiliser les presets

WordPress génère à la fois les variables CSS et des classes utilitaires prêtes à l'emploi.

- En CSS, directement via `var()` :

  ```css
  .mon-element {
    color: var(--wp--preset--color--primary);
    padding: var(--wp--preset--spacing--16);
  }
  ```

- Dans `theme.json` (styles de blocs), via la syntaxe `var:preset|{catégorie}|{slug}` :

  ```json
  {
    "styles": {
      "color": { "text": "var:preset|color|primary" },
      "spacing": { "padding": { "top": "var:preset|spacing|16" } }
    }
  }
  ```

- Classes utilitaires générées automatiquement par bloc (couleurs et tailles de police) :

  ```html
  <p class="has-primary-color has-base-background-color has-large-font-size">
    Texte
  </p>
  ```

## 3. Presets fluides avec `clamp()` (espacements et tailles de police responsives)

Pour éviter de gérer des media queries sur les tailles de police et les espacements, WordPress peut générer directement des presets fluides sous forme de `clamp(min, valeur-fluide, max)`. Le résultat final est le même `var()` qu'un preset fixe, mais sa valeur s'adapte à la largeur de la fenêtre :

```css
margin: var(--wp--preset--spacing--m);
font-size: var(--wp--preset--font-size--m);
```

### Tailles de police fluides

Depuis WordPress 6.1, `settings.typography.fluid` permet à Core de calculer lui-même le `clamp()` à partir d'une taille min et max par preset :

```json
{
  "settings": {
    "typography": {
      "fluid": true,
      "fontSizes": [
        {
          "name": "Moyen",
          "slug": "m",
          "size": "1rem",
          "fluid": { "min": "0.875rem", "max": "1.125rem" }
        },
        {
          "name": "Grand",
          "slug": "l",
          "size": "1.5rem",
          "fluid": { "min": "1.25rem", "max": "2rem" }
        }
      ]
    }
  }
}
```

WordPress génère alors automatiquement `--wp--preset--font-size--m: clamp(0.875rem, ..., 1.125rem)` (le calcul intermédiaire se base par défaut sur une largeur de viewport comprise entre 320px et 1600px, ajustable via `settings.typography.fluid.minViewportWidth` / `maxViewportWidth`). Passer `"fluid": false` sur un preset précis permet de l'exclure du calcul fluide.

### Espacements fluides

Contrairement à `font-size`, WordPress ne calcule pas de `clamp()` automatique pour `spacingSizes` : on écrit directement l'expression `clamp()` comme valeur du `size` :

```json
{
  "settings": {
    "spacing": {
      "spacingSizes": [
        { "name": "Petit", "slug": "s", "size": "clamp(0.75rem, 0.7rem + 0.25vw, 1rem)" },
        { "name": "Moyen", "slug": "m", "size": "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" },
        { "name": "Grand", "slug": "l", "size": "clamp(1.5rem, 1.3rem + 1vw, 2.5rem)" }
      ]
    }
  }
}
```

⚠️ Une fois passé en fluide, un slug numérique basé sur le pixel (`16`, `24`...) n'a plus de sens puisque la valeur n'est plus fixe : on retombe alors sur des slugs sémantiques (`s`, `m`, `l`, `xl`...), au même titre que la convention utilisée pour les couleurs (section suivante).

🔖 [Fluid Typography in WordPress 6.1](https://make.wordpress.org/core/2022/09/07/fluid-typography-in-wordpress-6-1/)

## 4. Convention de nommage des couleurs (slugs sémantiques)

WordPress Core n'impose pas de noms de slugs à la racine (il fournit historiquement des couleurs comme `black`, `white`, `cyan-bluish-gray`...). Mais pour garantir la portabilité d'un thème à l'autre, la quasi-totalité des thèmes modernes (thèmes officiels _Twenty Twenty-X_, Frost, Twentig...) suivent une convention commune, proposée par Rich Tabor et adoptée par l'équipe Gutenberg :

| Slug | Rôle | Variable générée |
| --- | --- | --- |
| `base` | Fond d'écran principal (généralement blanc ou noir). | `--wp--preset--color--base` |
| `contrast` | Couleur du texte principal (doit contraster avec `base`). | `--wp--preset--color--contrast` |
| `primary` | Couleur de marque principale (titres, boutons principaux). | `--wp--preset--color--primary` |
| `secondary` | Couleur de soutien (sous-titres, boutons secondaires). | `--wp--preset--color--secondary` |
| `tertiary` | Troisième nuance pour les éléments discrets (bordures, séparateurs). | `--wp--preset--color--tertiary` |
| `accent` | Couleur vive pour les appels à l'action (CTA) ou les états survolés. | `--wp--preset--color--accent` |

⚠️ Éviter le slug `background` : bien qu'utilisé par certains thèmes, il entre en confusion avec la propriété CSS native `background`. On lui préfère `base` pour le fond général du site.

### Presets complémentaires

Au-delà du socle ci-dessus, on complète souvent la palette avec des variantes et des couleurs d'état, utiles pour les fonds alternés, le texte secondaire ou les retours utilisateur (formulaires, notifications) :

| Slug | Rôle | Variable générée |
| --- | --- | --- |
| `base-2` | Arrière-plan secondaire (sections alternées, cartes, encarts). | `--wp--preset--color--base-2` |
| `contrast-muted` | Texte secondaire, moins appuyé que `contrast` (légendes, texte d'aide). | `--wp--preset--color--contrast-muted` |
| `contrast-2` | Seconde nuance de contraste (variante de texte, ex. sur fond sombre). | `--wp--preset--color--contrast-2` |
| `accent-2` | Seconde couleur d'accent (CTA secondaire, éviter la monotonie visuelle). | `--wp--preset--color--accent-2` |
| `success` | Validation, succès (confirmation, état positif). | `--wp--preset--color--success` |
| `warning` | Avertissement (état à surveiller, action à confirmer). | `--wp--preset--color--warning` |
| `error` | Erreur, suppression (validation échouée, action destructive). | `--wp--preset--color--error` |
| `info` | Information neutre (aide contextuelle, message informatif). | `--wp--preset--color--info` |

👉 Pourquoi respecter cette convention :

- **Portabilité des blocs** : un bloc coloré en `primary` reste cohérent si l'utilisateur change de thème (le nouveau thème fournit sa propre valeur pour `--wp--preset--color--primary`). Un slug maison comme `bleu-turquoise` casserait le rendu au changement de thème.
- **Éditeur de site (FSE)** : dans _Apparence > Éditeur > Styles > Couleurs_, l'interface mappe directement ses sélecteurs sur ces slugs.

## 5. Lister les presets actifs sur un site

Pour voir quelles variables sont actuellement actives sur un site (Core, thème et extensions confondus), sans code :

1. Ouvrir le site dans le navigateur.
2. Clic droit → _Inspecter_ (ou <kbd>F12</kbd>).
3. Dans l'onglet _Éléments_, sélectionner la balise `<html>` ou `<body>`.
4. Dans le panneau _Styles_, repérer le bloc de déclaration `:root`.
5. Toutes les variables `--wp--preset--*` injectées dynamiquement par WordPress y apparaissent.

## 6. Références

- 🔖 [Documentation officielle du theme.json (référence complète des propriétés)](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/)
- 🔖 [Global Settings & Styles (Block Editor Handbook)](https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/)
- 🔖 [Using presets (var:preset syntax)](https://developer.wordpress.org/themes/global-settings-and-styles/styles/using-presets/)
- 🔖 [Standardizing theme.json colors — Rich Tabor](https://richtabor.com/standardizing-theme-json-colors)
