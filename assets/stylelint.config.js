module.exports = {
  /*
   * config stylelint Alsacréations
   * https://stylelint.io/user-guide/configuration
   */
  rules: {
    'at-rule-empty-line-before': null, // ligne avant une règle at
    'at-rule-name-space-after': 'always', // espace après @media
    'at-rule-no-vendor-prefix': true, // pas de vendor dans une règle at
    'at-rule-semicolon-space-before': 'never', // pas d'espace avant un point virgule
    'block-closing-brace-empty-line-before': null,
    'block-closing-brace-newline-after': null,
    'block-no-empty': true, // pas de block vide
    'block-opening-brace-space-before': 'always', // espace avant le bloc de déclarations
    'color-hex-case': 'upper', // hexadécimal en uppercase
    'color-hex-length': 'long', // syntaxe hexa longue
    'color-named': 'never', // pas de couleur nommée
    'color-no-hex': true, // pas de couleur en hexadécimal
    'comment-no-empty': true, // pas de commentaire vide
    'comment-whitespace-inside': 'always',
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never', // pas d'espace avant un point virgule
    'declaration-block-single-line-max-declarations': 1, // nombre de déclaration max par ligne
    'declaration-block-trailing-semicolon': 'always', // toujous un point-virgule
    'declaration-colon-space-after': 'always', // espace après le double-point
    'declaration-colon-space-before': 'never', // jamais d'espace avant le double-point
    'declaration-empty-line-before': null,
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-where-recommended', // quotes si nécessaires
    'font-weight-notation': 'numeric',
    'function-parentheses-space-inside': 'never', // pas d'espace dans les parenthèses
    'function-url-no-scheme-relative': true,
    'function-url-quotes': 'always',
    'indentation': 2, // indentation = 2 espaces
    'length-zero-no-unit': true,
    'max-empty-lines': 1, // une ligne maxi entre deux blocks
    'max-line-length': null,
    'max-nesting-depth': 3, // niveau d'imbrication max
    'media-feature-colon-space-after': 'always', // espace dans media query
    'media-feature-colon-space-before': 'never', // espace dans media query
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-parentheses-space-inside': 'never', // espace dans media query
    'media-feature-range-operator-space-after': 'never', // espace dans media query
    'media-feature-range-operator-space-before': 'never', // espace dans media query
    'no-descending-specificity': null,
    'no-duplicate-selectors': true, // pas de sélecteurs dupliqués
    'no-eol-whitespace': true, // pas de whitespace en fin de ligne
    'no-invalid-position-at-import-rule': null, // @import autorisé dans @layer
    'no-irregular-whitespace': true, // pas de caractère espace irrégulier
    'number-leading-zero': 'always', // toujous un zéro en début de décimale
    'property-no-unknown': true, // pas de propriété inconnue
    'property-no-vendor-prefix': true,
    'selector-attribute-brackets-space-inside': 'never', // espace dans selecteur attribut
    'selector-attribute-operator-space-after': 'never', // espace dans selecteur attribut
    'selector-attribute-operator-space-before': 'never', // espace dans selecteur attribut
    'selector-attribute-quotes': 'always', // quotes dans les sélecteurs d'attributs
    'selector-combinator-space-after': 'always', // espace après un combinateur
    'selector-combinator-space-before': 'always', // espace avant un combinateur
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-newline-before': 'never-multi-line',
    'selector-list-comma-space-after': 'always-single-line',
    'selector-list-comma-space-before': 'never-single-line',
    'selector-max-attribute': 2,
    'selector-max-class': 3,
    'selector-max-combinators': 3,
    'selector-max-compound-selectors': 3,
    'selector-max-empty-lines': 1,
    'selector-max-id': 0, // pas de sélecteur id
    'selector-max-specificity': null,
    'selector-max-type': 2,
    'selector-max-universal': 1,
    'selector-no-qualifying-type': true, // pas de selecteur complexe
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-parentheses-space-inside': 'never', // espace dans pseudo élément
    'selector-pseudo-element-colon-notation': 'double', // espace dans pseudo élément
    'string-quotes': 'double', // double quotes dans les chaînes
    'value-keyword-case': 'lower',
    'value-list-comma-newline-after': 'never-multi-line',
    'value-list-comma-newline-before': 'never-multi-line',
    'value-list-comma-space-after': 'always',
    'value-no-vendor-prefix': true,
    "rule-empty-line-before": [
      "always",
      {
        "except": [
          "after-single-line-comment",
          "first-nested"
        ],
        "ignore": [
          "after-comment"
        ]
      }], // ligne vide entre deux blocs
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'layer', 'extends', 'tailwind', 'apply', 'screen']
      }
    ] // on ignore les règles Tailwind
  }
}
