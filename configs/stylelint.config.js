/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-html", "stylelint-config-property-sort-order-smacss"],
  plugins: ["stylelint-order"],
  rules: {
    // Sélecteurs (règles générales)
    "selector-max-id": 0, // on refuse les ID
    "selector-max-class": 3, // on limite le nombre de classes
    "selector-max-type": 3, // on limite le nombre de sélecteurs d'éléments
    "no-descending-specificity": null, // on désactive la règle de spécificité descendante

    // Pseudo-classes inconnues
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["deep", "global"] }],

    // Pseudo-éléments inconnus
    "selector-pseudo-element-no-unknown": [true, { ignorePseudoElements: ["v-deep"] }],

    // Règles @ inconnues
    "at-rule-no-unknown": [true, { ignoreAtRules: ["theme", "utility"] }],

    // Valeurs inconnues
    "declaration-property-value-no-unknown": [
      true,
      {
        ignoreProperties: {
          "/^animation-/": "auto",
          "/^container/": "/^scroll/",
          top: "/^anchor/",
          right: "/^anchor/",
          bottom: "/^anchor/",
          left: "/^anchor/",
        },
      },
    ],

    // Prefixes vendeurs
    "property-no-vendor-prefix": [
      true,
      {
        ignoreProperties: [
          "mask",
          "mask-size",
          "mask-position",
          "line-clamp",
          "backdrop-filter",
          "user-select",
          "initial-letter",
          "box-decoration-break",
          "text-fill-color",
          "text-stroke",
          "tap-highlight-color",
          "box-orient",
        ],
      },
    ],

    // Raccourcis
    "declaration-block-no-redundant-longhand-properties": [true, { ignoreShorthands: ["grid-template"] }],

    // Unités
    "declaration-property-unit-disallowed-list": {
      "/^font|^font-size/": ["px"], // pas de pixels
    },

    // Imports
    "import-notation": "string", // pas de "url()" pour les imports

    // Nesting
    "max-nesting-depth": 3, // on limite la profondeur de l'imbrication

    // Media Queries
    "media-feature-range-notation": "context", // on force la notation moderne
    "media-feature-name-unit-allowed-list": { width: "rem" }, // on autorise uniquement les rem

    // Polices
    "font-family-no-duplicate-names": null,
    "font-weight-notation": "numeric", // notation numérique pour les poids de police

    // Couleurs
    "color-hex-length": "long", // notation longue pour les couleurs hexadécimales
    "color-named": "never", // on refuse les couleurs nommées
    "color-function-notation": "modern", // notation moderne pour les fonctions de couleurs
    "alpha-value-notation": "percentage", // notation en pourcentage pour l'alpha
    "hue-degree-notation": "number",
  },
};
