/**
 * uno-bretzel.ts, un preset de UnoCSS
 * Ajoute les règles spécifiques Alsacréations :
 * - reset CSS (avec media prefers-reduced-motion, etc.)
 * - classes utilitaires (.visually-hidden)
 * - classes Layouts (liquid/splash, autogrid, switcher, cluster, repel, reel, etc.)
 */
import { definePreset } from "unocss"

export default definePreset(() => {
  return {
    name: "bretzel-preset",
    preflights: [
      /**
       * Reset CSS Alsacréations
       */
      {
        getCSS: () => {
          return /* css */ `
            /* On adopte les couleurs système afin de s'adapter automatiquement en dark et light mode */
            :root {
              color-scheme: light dark;
            }

            /* On passe tout le monde en modèle border-box et on évite min-width: auto sur les flex- et grid-items */
            :where(*,
            *::before,
            *::after) {
              box-sizing: border-box;
              min-width: 0;
            }

            /* On prévoit une petite marge au-dessus des ancres ciblées */
            :target {
              scroll-margin-block: 1rem;
            }

            /* On évite les débordements de page et les zooms non désirés en landscape */
            :where(html) {
              overflow-wrap: break-word;
              -webkit-text-size-adjust: none;
            }

            /* On donne à body toute la hauteur + styles divers */
            :where(body) {
              min-height: 100dvh;
              margin: 0;
              font-family: system-ui, sans-serif;
              text-rendering: optimizeSpeed;
              line-height: 1.5;
            }

            /* On supprime les styles des listes ayant une class (version accessible) */
            :where(ol, ul):where([class]) {
              padding-left: 0;

              & > li::marker {
                content: "";
                color: transparent;
              }
            }

            /* On évite les débordements d'éléments */
            :where(
              img,
              table,
              td,
              blockquote,
              pre,
              code,
              input,
              textarea,
              select,
              video,
              svg,
              iframe
            ) {
              max-width: 100%;
            }

            /* On réduit de la hauteur de ligne sur certains éléments */
            :where(h1, h2, h3, h4, button, input, label) {
              line-height: 1.1;
            }

            /* On améliore la typographie */
            :where(h1, h2, h3, h4, h5, h6) {
              text-wrap: balance;
            }
            :where(p, li, figcaption) {
              text-wrap: pretty;
            }

            /* On préserve le ratio d'affichage */
            :where(iframe, img, input, select, textarea) {
              height: auto;
            }

            /* On stylise par défaut des liens */
            :where(a:not([class])) {
              text-decoration-skip-ink: auto;
            }

            /* On change ces éléments en block */
            :where(img,
              svg,
              video,
              canvas,
              audio,
              iframe,
              embed,
              object) {
                display: block;
            }

            /* On harmonise des différences entre navigateurs */
            :where(input, button, textarea, select) {
              margin: 0;
              background-color: transparent;
              color: inherit;
              font-family: inherit;
              font-size: inherit;
              line-height: inherit;
              letter-spacing: inherit;
              vertical-align: middle;
            }
            :where(form, fieldset) {
              border: none;
            }
            :where(fieldset) {
              margin: 0;
              padding: 1em;
            }
            :where(legend) {
              max-width: 100%;
              border: 0;
              color: inherit;
              white-space: normal;
            }
            :where(label) {
              display: inline-block;
              cursor: pointer;
            }
            :where(button) {
              cursor: pointer;
            }
            :where(textarea) {
              overflow: auto;
              vertical-align: top;
              resize: vertical;
              white-space: pre-wrap;
            }

            /* On stylise les éléments préformatés */
            :where(pre, code, kbd, samp) {
              font-family: monospace, monospace;
              font-size: 1em;
            }
            :where(pre) {
              tab-size: 2;
              white-space: pre-wrap;
              line-height: normal;
              overflow: auto;
            }

            /* On stylise les SVG */
            :where(svg:not([fill])) {
              fill: currentColor;
            }
            :where(svg) {
              overflow: visible;
            }
            :where(svg *) {
              transform-box: fill-box;
            }
            :where(svg:has(symbol)) {
              display: none;
            }

            /* On corrige des styles ARIA */
            :where([aria-busy="true"]) {
              cursor: progress;
            }
            :where([aria-controls]) {
              cursor: pointer;
            }
            :where([aria-disabled="true"], [disabled]) {
              cursor: not-allowed;
            }
            :where([aria-hidden="false"][hidden]) {
              display: revert;
            }
            :where([aria-hidden="false"][hidden]:not(:focus)) {
              clip: rect(0, 0, 0, 0);
              position: absolute;
            }

            /* On désactive les animations selon les préférences utilisateur */
            @media (prefers-reduced-motion: reduce) {
              *,
              ::before,
              ::after {
                animation-delay: -1ms !important;
                animation-duration: 1ms !important;
                animation-iteration-count: 1 !important;
                background-attachment: initial !important;
                scroll-behavior: auto !important;
                transition-duration: 0s !important;
                transition-delay: 0s !important;
              }
            }
          `
        },
      },
    ],
    rules: [
      /**
       * Classes utilitaires Alsacréations
       */
      [
        /^visually-hidden$/,
        (_, { rawSelector }) => /* css */ `
      .${rawSelector}:not(:focus):not(:active) {
        position: absolute !important;
        clip-path: inset(50%) !important;
        width: 1px !important;
        height: 1px !important;
        margin: -1px !important;
        overflow: hidden !important;
        white-space: nowrap !important;
      }
      `,
      ],
      [
        /^liquid$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          --liquid-min-margin: 2rem;
          --liquid-content: 840px;

          display: grid;
          grid-template-columns:
            [liquid-start] minmax(var(--liquid-min-margin), 1fr)
            [content-start] minmax(0, calc(var(--liquid-content) / 2))
            [half] minmax(0, calc(var(--liquid-content) / 2))
            [content-end] minmax(var(--liquid-min-margin), 1fr)
            [liquid-end];

            & > * {
            grid-column: content;
          }
        }
      `,
      ],
      [
        /^splash$|^splash-start$|^splash-end$|^splash-half-start$|^splash-half-end$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          display: grid;
          grid-template-columns: subgrid;
          grid-column: layout;

          & > * {
            grid-column: content;
          }
        }
      `,
      ],
      [
        /^splash$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          grid-column: liquid;
        }
      `,
      ],
      [
        /^splash-start$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          grid-column: liquid-start / content-end;
        }
      `,
      ],
      [
        /^splash-end$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          grid-column: content-start / liquid-end;
        }
      `,
      ],
      [
        /^splash-half-start$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          grid-column: liquid-start / half;

          & > * {
            grid-column: content-start / half;
          }
        }
      `,
      ],
      [
        /^splash-half-end$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          grid-column: half / liquid-end;

          & > * {
            grid-column: half / content-end;
          }
        }
      `,
      ],
      [
        /^l-flow$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          .l-flow > * + * {
            --flow-space: 1em; /* espace entre chaque enfant */

            margin-block-start: var(--flow-space);
          }
        }
      `,
      ],
      [
        /^l-autogrid$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          --autogrid-gutter: 1rem; /* gouttière */
          --min-col-size: 20rem; /* taille mini de chaque colonne */
          --grid-fill: auto-fit; /* mode de remplissage */

          display: grid;
          grid-template-columns: repeat(var(--grid-fill), minmax(min(var(--min-col-size), 100%), 1fr));
          gap: var(--autogrid-gutter);
        }
      `,
      ],
      [
        /^l-switcher$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          --gutter: 1rem; /* gouttière */
          --vertical-alignment: flex-start; /* alignement vertical interne */
          --container-size: 30rem;  /* largeur du conteneur, déterminant le "breakpoint" pour la disposition verticale ou horizontale de enfants */

          display: flex;
          flex-wrap: wrap;
          gap: var(--gutter);
          align-items: var(--vertical-alignment);

          & > * {
            flex-grow: 1;
            flex-basis: calc( (var(--container-size) - 100%) * 999 );
          }
        }
      `,
      ],
      [
        /^l-cluster$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          --cluster-gutter: 1rem; /* gouttière */
          --horizontal-alignment: flex-start; /* alignement horizontal des enfants */
          --vertical-alignment: center; /* alignement vertical des enfants */

          display: flex;
          flex-wrap: wrap;
          gap: var(--cluster-gutter);
          justify-content: var(--horizontal-alignment);
          align-items: var(--vertical-alignment);
        }
      `,
      ],
      [
        /^l-repel$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          --repel-gutter: 1rem; /* gouttière */
          --vertical-alignment: flex-start; /* alignement vertical des enfants */

          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: var(--vertical-alignment);
          gap: var(--repel-gutter);
        }
      `,
      ],
      [
        /^l-media$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          --media-gutter: 1rem; /* gouttière */
          --sidebar-size: 8rem; /* largeur (fixe) du 1er enfant */
          --min-item-size: 300px; /* largeur (mini) du 2e enfant */

          display: flex;
          flex-wrap: wrap;
          gap: var(--media-gutter);

          & > *:first-child {
            flex-grow: 1;
            flex-shrink: 0;
            flex-basis: var(--sidebar-size);
          }

          & > *:last-child {
            flex-grow: 999;
            flex-basis: 0;
            min-width: var(--min-item-size);
          }
        }
      `,
      ],
      [
        /^l-reel$/,
        (_, { rawSelector }) => /* css */ `
        :where(.${rawSelector}) {
          --gutter: 1rem; /* gouttière */
          --item-size: 35%; /* largeur des enfants (% du conteneur) */

          display: flex;
          height: auto;
          gap: var(--gutter);
          scroll-snap-type: x mandatory; /* scroll-snap sur l'axe x */
          max-width: 100%;
          margin-inline: auto; /* reel est centré horizontalement */
          padding: 0.5rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;

          & > * {
            flex-basis: var(--item-size);
            flex-shrink: 0;
          }

          &[data-scroll=start] > * {
            scroll-snap-align: start; /* je cale à gauche */
          }
          &[data-scroll=center] > * {
            scroll-snap-align: center; /* je cale au centre */
          }
          &[data-scroll=end] > * {
            scroll-snap-align: end; /* je cale à droite */
          }
          &[data-scrollbar=hidden] {
            scrollbar-width: none; /* je masque l'ascenseur */
          }
          &[data-scrollbar=hidden]::-webkit-scrollbar {
            display: none; /* je masque l'ascenseur sur webkit */
          }
        }
      `,
      ],
    ],
  }
})
