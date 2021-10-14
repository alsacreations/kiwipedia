module.exports = {
  extends: [
    'stylelint-config-recommended'
  ],
  /*
   * add your custom config here
   * https://stylelint.io/user-guide/configuration
   */
  rules: {
    indentation: 2, // indentation = 2 espaces
    'string-quotes': 'double', // double quotes dans les chaînes
    'selector-max-id': 0, // pas de sélecteur id
    'block-no-empty': true, // pas de block vide
    'comment-no-empty': true, // pas de commentaire vide
    'property-no-unknown': true, // pas de propriété inconnue
    'no-duplicate-selectors': true, // pas de sélecteurs dupliqués
    'max-nesting-depth': 3, // niveau d'imbrication max
    'color-no-hex': true, // pas de couleur en hexadécimal
    'color-named': 'never', // pas de couleur nommée
    'number-leading-zero': 'always', // toujous un zéro en début de décimale
    'declaration-block-trailing-semicolon': 'always', // toujous un point-virgule
    'no-irregular-whitespace': true, // pas de caractère espace irrégulier
    'declaration-block-single-line-max-declarations': 1, // nombre de déclaration max par ligne
    'declaration-colon-space-before': 'never', // jamais d'espace avant le double-point
    'declaration-colon-space-after': 'always', // toujours une espace après le double-point
    'selector-combinator-space-before': 'always', // toujours une espace avant un combinateur
    'selector-combinator-space-after': 'always', // toujours une espace après un combinateur
    'block-opening-brace-space-before': 'always', // toujours une espace avant le bloc de déclarations
    'at-rule-semicolon-space-before': 'never', // pas d'espace avant un point virgule
    'declaration-block-semicolon-space-before': 'never', // pas d'espace avant un point virgule
    'function-parentheses-space-inside': 'never', // pas d'espace dans les parenthèses
    'rule-empty-line-before': 'always', // ligne vide entre deux blocs
    'max-empty-lines': 1, // une ligne maxi entre deux blocks
    'no-eol-whitespace': true, // pas de whitespace en fin de ligne
    'font-family-name-quotes': 'always-where-recommended', // quotes si nécessaires
    'selector-attribute-quotes': 'always', // quotes dans les sélecteurs d'attributs
    'no-invalid-position-at-import-rule': null, // @import autorisé dans @layer
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'layer', 'extends', 'tailwind', 'apply', 'screen']
      }
    ]
  }
}
