module.exports = {
  extends: [
    'stylelint-config-recommended'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'extends', 'tailwind']
      }
    ],
    'block-no-empty': null,
    'unit-allowed-list': ['em', 'rem', '%', 's']
  }
}
