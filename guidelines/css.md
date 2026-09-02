# CSS

> Statut : stable · Niveau : avancé

Conventions **spécifiques à Alsacréations** pour le CSS. Les bonnes pratiques génériques (mobile-first, éviter les sélecteurs d'ID/d'élément, nesting superficiel, `will-change`, `font-display: swap`, Grid vs Flexbox…) ne sont **pas** reprises ici&#8239;: elles sont déjà appliquées par défaut. Ce document ne liste que ce qui distingue nos projets d'un projet CSS standard — à appliquer sans qu'il soit nécessaire de le redemander.

---

## Choix par défaut&#8239;: CSS natif, pas de framework

> ✅ **Par défaut** — CSS natif (custom properties, nesting, `@scope`, `@layer`). Pas de Sass, pas de Tailwind/UnoCSS.

- N'introduire un framework utilitaire (Tailwind, UnoCSS) que sur contrainte projet explicite (existant client, prototype jetable, équipe déjà utilitaire-first) — jamais par défaut.
- Un fichier de classes utilitaires minimal maison existe pour les besoins ponctuels (`utilities.css`) — ne pas réinventer un système utilitaire complet à côté.

## Outillage imposé

- **PostCSS** + `postcss-custom-media` pour les media queries personnalisées. Sass (`.scss`) uniquement en maintenance de code legacy, jamais sur un nouveau projet.
- **Stylelint** + **Prettier** : configuration générée via [Primary](https://primary.alsacreations.com/) (configurateur maison) — ne pas écrire de config Stylelint à la main, régénérer via l'outil.
- `stylelint-order` réordonne automatiquement les propriétés (ordre SMACSS)&#8239;: ne pas perdre de temps à ordonner les propriétés dans le code, l'outil s'en charge à l'enregistrement.

## Architecture des fichiers imposée

Structure fixe, générée par [Primary](https://primary.alsacreations.com/) ou [project-init](../starters/project-init.md)&#8239;: la respecter telle quelle plutôt que d'improviser un découpage.

```bash
css/
├── app.css           # Point d'entrée : déclare les @layer et les @import
├── reset.css         # Reset
├── natives.css       # Styles des éléments natifs (KNACSS)
├── layouts.css       # Layouts Bretzel
├── theme.css         # Primitives + Tokens de design du projet
├── utilities.css     # Classes utilitaires minimales
└── styles.css        # Styles de base (body, typo, liens…)
```

Ordre des `@layer` dans `app.css`, immuable (chaque layer écrase le précédent)&#8239;:

```css
@layer config, base, components, utilities;

@import "reset.css" layer(config);
@import "natives.css" layer(config);
@import "layouts.css" layer(config);
@import "theme.css" layer(config);

@import "styles.css" layer(base);

/* Un @import par composant dans layer(components) */

@import "utilities.css" layer(utilities);
```

## Isolation des composants&#8239;: `@scope`, pas BEM

Convention maison&#8239;: `@scope` remplace BEM. Les classes restent courtes et génériques (`.title`, `.media`, `.header`, `.content`) au lieu de classes composées (`.card-header-inner__title`), l'isolation étant garantie par le scope plutôt que par le nom.

- Toujours envelopper le `@scope` dans `@layer components`.
- Limiter la portée avec `to (...)` quand du contenu injecté (riche texte, widget tiers) ne doit pas hériter des styles du scope.
- Centraliser la logique interactive (`:hover`, `:focus-visible`, `:disabled`) une seule fois dans `:scope`/le bloc racine, piloter les variantes uniquement via des custom properties — ne jamais dupliquer la logique par variante.

```css
@layer components {
  @scope (.card) {
    .title {
      font-size: var(--text-l);
      color: var(--primary);
    }
    .media {
      border-radius: var(--radius-16);
    }
  }

  @scope (.btn) {
    :scope {
      --button-background-color: var(--form-background, Field);
      --button-text-color: var(--on-form, ButtonText);
      background-color: var(--button-background-color);
      color: var(--button-text-color);
    }

    &:hover, &:focus-visible {
      background-color: oklch(from var(--button-background-color) calc(l * 0.9) c h);
    }

    /* Variantes : on ne change que les valeurs, pas la logique */
    &.primary {
      --button-background-color: var(--primary);
      --button-text-color: var(--on-primary);
    }
  }
}
```

## Design tokens&#8239;: nommage à 3 niveaux imposé

Primitives → Tokens sémantiques → Composants. Générés depuis l'UI Kit Figma via [Primary](https://primary.alsacreations.com/), stockés dans `theme.css`. Respecter strictement ce préfixage&#8239;:

| Type                     | Préfixe           | Exemple              |
| ------------------------ | ----------------- | -------------------- |
| Couleurs                 | `--color-*`       | `--color-pink-300`   |
| Espacements / gouttières | `--spacing-*`     | `--spacing-m`        |
| Taille de texte          | `--text-*`        | `--text-m`           |
| Famille de police        | `--font-*`        | `--font-poppins`     |
| Graisse                  | `--font-weight-*` | `--font-weight-bold` |
| Interligne               | `--line-height-*` | `--line-height-m`    |
| Arrondi                  | `--radius-*`      | `--radius-24`        |
| Ombre                    | `--shadow-*`      | `--shadow-md`        |
| Z-index                  | `--z-*`           | `--z-modal`          |

Tokens sémantiques (rôles, inspirés Material Design) à utiliser dans les composants, jamais une primitive ou une valeur en dur directement&#8239;: `--primary`/`--on-primary`, `--surface`/`--on-surface`, `--layer-1/2/3`, `--link`/`--link-hover`, `--border-light`/`--border-medium`, `--error`/`--success`/`--warning`/`--info`.

> 💡 **Astuce** — Les tailles de texte et espacements fluides (`clamp(...)`) sont générés par [Elastic](https://elastic.alsacreations.com/)&#8239;: ne pas calculer ces `clamp()` à la main, régénérer via l'outil si une valeur doit changer.

## Layouts&#8239;: Bretzel avant Grid/Flexbox manuel

Ordre de priorité imposé&#8239;:

1. **Bretzel** (attribut `data-layout="…"`) pour tout layout responsive courant.
2. Grid Layout pour un besoin réellement spécifique non couvert par Bretzel.
3. Flexbox pour un besoin réellement spécifique non couvert par Bretzel.

> ✅ **Réflexe** — Avant d'écrire `display: grid` ou `display: flex` à la main, vérifier si un pattern Bretzel (`stack`, `cluster`, `autogrid`, `switcher`, `duo`, `repel`, `reel`, `boxed`, `liquid`, `hmf`) couvre déjà le besoin.

Documentation des layouts, attributs et modificateurs&#8239;: 🔗 [bretzel.alsacreations.com](https://bretzel.alsacreations.com/) — ne pas redocumenter ici, se référer directement à l'outil pour éviter toute divergence.

## Breakpoints nommés imposés

Ne pas introduire d'autres seuils sans raison explicite (design non couvert)&#8239;:

| Nom   | Valeur  | Pixels |
| ----- | ------- | ------ |
| `md`  | `48rem` | 768px  |
| `lg`  | `64rem` | 1024px |
| `xl`  | `80rem` | 1280px |
| `xxl` | `96rem` | 1536px |

## Thème clair/sombre&#8239;: convention `data-theme`

Override forcé du mode système via attribut `data-theme`, en plus de `light-dark()`&#8239;:

```css
:root {
  color-scheme: light dark;

  &[data-theme="light"] {
    color-scheme: light;
  }

  &[data-theme="dark"] {
    color-scheme: dark;
  }
}
```

- Couleurs adaptatives portées par les tokens via `light-dark(...)` — jamais de duplication de règles dans un bloc `@media (prefers-color-scheme: dark)` séparé.
- 🔗 Exemple de switcher accessible&#8239;: <https://codepen.io/alsacreations/pen/ExBPExE>

### SVG en dark mode&#8239;: choisir selon le contrôle qu'on a sur le fichier

| Contexte                            | Méthode                                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| SVG inline dans le HTML             | `fill: currentcolor`, ou `light-dark()` sur `stroke`/`fill`                                          |
| SVG externe, fichier modifiable     | `<style>` injecté dans le SVG avec `@media (prefers-color-scheme)` + sélecteur `[data-theme="dark"]` |
| SVG externe, fichier non modifiable | Masque CSS&#8239;: `background-color: currentColor; mask: var(--icon-url) …`                         |

## Typographie

- Police système `system-ui` par défaut pour le texte de contenu — choix délibéré (performance + pas de layout shift), ne pas charger de webfont pour le corps de texte sans raison explicite du projet.
- Fontes toujours hébergées en propre (jamais de CDN Google Fonts), converties/optimisées en `.woff2` via [Fondue](https://fondue.alsacreations.com/) (ou Google Webfont Helper à défaut).
- Au-delà de 3-4 variantes statiques (regular/italic/light/semi-bold/bold/bold italic…), utiliser une **variable font** plutôt que multiplier les fichiers&#8239;:

```css
@font-face {
  font-family: "Inter Variable";
  src:
    url("inter-variable.woff2") format("woff2") tech("variations"),
    url("inter-variable.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-display: swap;
}
```

---

## Voir aussi

- [HTML](html.md) — Sémantique et structure de document.
- [Accessibilité](accessibility.md) — Contrastes, focus visible, motion.
- [Performances](performances.md) — Critical CSS, optimisations.
