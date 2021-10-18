module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['eslint:recommended', '@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: ['html'],
  // add your custom rules here
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    // Force des espaces consistants dans les parenthèses
    'space-in-parens': ['error', 'never'],
    // Force un espace avant et après un mot clé, if, else etc
    'keyword-spacing': ['error'],
    // Force un espace dans les objets
    'object-curly-spacing': ['error', 'always'],
    // Force les propriétés à être espacées Ex: { hello: 'World' } -> espace après le double point
    'key-spacing': ['error', { afterColon: true }],
    // Force les commentaires multi-lignes du type starred-block
    'multiline-comment-style': ['error', 'starred-block'],
    // Préfère les template string que les concaténations
    'prefer-template': 'error',
    curly: 'error', // {} toujours requises
    eqeqeq: 'error', // triple = obligatoire
    'brace-style': 'error', // imbrication des {} (if/else/try/catch/etc...) unique
    'quote-props': 'off', // controle des quotes autour des propriétés des objets
    'comma-dangle': ['error', 'never'], // pas de dernière virgule
    'no-trailing-spaces': 'warn', // pas d'espaces vides
    semi: ['warn', 'never'], // pas de ";" à la fin des lignes
    'object-shorthand': 'warn',
    'space-infix-ops': ['warn'], // espaces entre opérateurs
    // les const, c'est la vie
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false
      }
    ],
    // pas d'espaces avant les () d'une fonction
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],

    // Vue lint rules
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/this-in-template': ['error', 'never'],
    'vue/v-on-style': ['warn', 'longform'],
    'vue/v-bind-style': 'warn',
    'vue/custom-event-name-casing': 'warn',
    'vue/require-name-property': 'error',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/v-slot-style': [
      'error',
      {
        atComponent: 'longform',
        default: 'longform',
        named: 'longform'
      }
    ],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/component-definition-name-casing': 'error',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'never'
        }
      }
    ],
    'vue/html-indent': [
      'warn',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        alignAttributesVertically: false
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'CONDITIONALS',
          'LIST_RENDERING',
          'OTHER_DIRECTIVES',
          'GLOBAL',
          'UNIQUE',
          'DEFINITION',
          'TWO_WAY_BINDING',
          'OTHER_ATTR',
          'CONTENT',
          'RENDER_MODIFIERS',
          'EVENTS'
        ],
        alphabetical: false
      }
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ]
  }
}
