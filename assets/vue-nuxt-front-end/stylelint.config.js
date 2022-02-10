module.exports = {
  /*
   * config stylelint Alsacréations
   * https://stylelint.io/user-guide/configuration
   */
  rules: {
    indentation: 2, // indentation = 2 espaces
    'at-rule-semicolon-space-before': 'never', // pas d'espace avant un point virgule
    'block-no-empty': true, // pas de block vide
    'block-opening-brace-space-before': 'always', // toujours une espace avant le bloc de déclarations
    'color-hex-case': 'upper', // hexadécimal en uppercase
    'color-hex-length': 'long', // syntaxe hexa longue
    'color-named': 'never', // pas de couleur nommée
    'color-no-hex': true, // pas de couleur en hexadécimal
    'comment-no-empty': true, // pas de commentaire vide
    'comment-whitespace-inside': 'always',
    'declaration-block-semicolon-space-before': 'never', // pas d'espace avant un point virgule
    'declaration-block-single-line-max-declarations': 1, // nombre de déclaration max par ligne
    'declaration-block-trailing-semicolon': 'always', // toujous un point-virgule
    'declaration-colon-space-after': 'always', // toujours une espace après le double-point
    'declaration-colon-space-before': 'never', // jamais d'espace avant le double-point
    'font-family-name-quotes': 'always-where-recommended', // quotes si nécessaires
    'font-weight-notation': 'numeric',
    'function-parentheses-space-inside': 'never', // pas d'espace dans les parenthèses
    'function-url-quotes': 'always',
    'max-empty-lines': 1, // une ligne maxi entre deux blocks
    'max-nesting-depth': 3, // niveau d'imbrication max
    'media-feature-colon-space-after': 'always', // espace dans media query
    'media-feature-colon-space-before': 'never', // espace dans media query
    'media-feature-parentheses-space-inside': 'never', // espace dans media query
    'media-feature-range-operator-space-after': 'never', // espace dans media query
    'media-feature-range-operator-space-before': 'never', // espace dans media query
    'no-duplicate-selectors': true, // pas de sélecteurs dupliqués
    'no-eol-whitespace': true, // pas de whitespace en fin de ligne
    'no-invalid-position-at-import-rule': null, // @import autorisé dans @layer
    'no-irregular-whitespace': true, // pas de caractère espace irrégulier
    'number-leading-zero': 'always', // toujous un zéro en début de décimale
    'property-no-unknown': true, // pas de propriété inconnue
    'rule-empty-line-before': 'always', // ligne vide entre deux blocs
    'selector-attribute-brackets-space-inside': 'never', // espace dans selecteur attribut
    'selector-attribute-operator-space-after': 'always', // espace dans selecteur attribut
    'selector-attribute-operator-space-before': 'never', // espace dans selecteur attribut
    'selector-attribute-quotes': 'always', // quotes dans les sélecteurs d'attributs
    'selector-combinator-space-after': 'always', // toujours une espace après un combinateur
    'selector-combinator-space-before': 'always', // toujours une espace avant un combinateur
    'selector-max-id': 0, // pas de sélecteur id
    'selector-no-id': true, // pas d'id
    'selector-no-qualifying-type': true, // pas de selecteur complexe
    'selector-pseudo-class-parentheses-space-inside': 'never', // espace dans pseudo élément
    'selector-pseudo-element-colon-notation': 'double', // espace dans pseudo élément
    'string-quotes': 'double', // double quotes dans les chaînes
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'layer', 'extends', 'tailwind', 'apply', 'screen']
      }
    ]
  }
}
