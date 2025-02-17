/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-html", "stylelint-config-property-sort-order-smacss"],
  plugins: ["stylelint-order"],
  rules: {
    // Sélecteurs
    "selector-max-id": 0, // on refuse les ID
    "selector-max-class": 3, // on limite le nombre de classes
    "selector-max-type": 3, // on limite le nombre de sélecteurs d'éléments
    "no-descending-specificity": null, // on désactive la règle de spécificité descendante

    // Sélécteurs spécifiques
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["deep", "global"] }],
    "selector-pseudo-element-no-unknown": [true, { ignorePseudoElements: ["v-deep"] }],
    "at-rule-no-unknown": [true, { ignoreAtRules: ["theme", "utility"] }],
    "declaration-property-value-no-unknown": [
      true,
      { ignoreProperties: { animation: "auto", "animation-duration": "auto" } },
    ],

    // Prefixes
    "property-no-vendor-prefix": [
      true, // on refuse les préfixes vendeurs
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
          "box-orient",
        ],
      },
    ],

    // Raccourcis
    "declaration-block-no-redundant-longhand-properties": [true, { ignoreShorthands: ["grid-template"] }],

    // Unités
    "declaration-property-unit-allowed-list": {
      "/^font|^font-size/": ["rem", "vw", "%", "dvw"], // on autorise uniquement les unités relatives pour les tailles de police
    },

    // Imports
    "import-notation": "string", // pas de "url()" pour les imports

    // Nesting
    "max-nesting-depth": 3, // on limite la profondeur de l'imbrication

    // Media Queries
    "media-feature-range-notation": "context", // on force la notation moderne

    // Polices
    "font-family-no-duplicate-names": null,
    "font-weight-notation": "numeric", // on force la notation numérique pour les poids de police

    // Couleurs
    "color-hex-length": "long", // on force la notation longue pour les couleurs hexadécimales
    "color-named": "never", // on refuse les couleurs nommées
    "color-function-notation": "modern", // on force la notation moderne pour les fonctions de couleurs
    "lightness-notation": "percentage", // on force la notation en pourcentage pour la luminosité
    "alpha-value-notation": "percentage", // on force la notation en pourcentage pour l'alpha
    "hue-degree-notation": "number",
  },
};
