module.exports = {
  extends: [
    'stylelint-config-recommended'
  ],
  /*
   * add your custom config here
   * https://stylelint.io/user-guide/configuration
   */
  rules: {
    'indentation': 2, // indentation = 2 espaces
    'string-quotes': 'double', // double quotes dans les chaînes
    'selector-max-id': 0, // pas de sélecteur id
    'block-no-empty': true, // pas de block vide
    'comment-no-empty': true, // pas de commentaire vide
    'no-duplicate-selectors': true, // pas de sélecteurs dupliqués
    'color-no-hex': true, // pas de couleur en hexadécimal
    'declaration-colon-space-before': 'never', // jamais d'espace avant le double-point
    'declaration-colon-space-after': 'always', // toujours une espace après le double-point
    'rule-empty-line-before': 'always', // ligne vide entre deux blocs
    'font-family-name-quotes': 'always-where-recommended', // quotes si nécessaires
    'selector-attribute-quotes': 'always', // quotes dans les sélecteurs d'attributs
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'extends', 'tailwind']
      }
    ]
  }
}
