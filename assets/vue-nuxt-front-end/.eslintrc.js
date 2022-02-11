/**
 * Règles communes pour Vue et JS
 */
const commonRules = {
  // Force des espaces consistants dans les parenthèses
  'space-in-parens': ['error', 'never'],
  // pas de dernière virgule
  'comma-dangle': ['error', 'never'],
  // Force un espace avant et après un mot clé, if, else etc
  'keyword-spacing': ['error'],
  // Force un espace dans les objets
  'object-curly-spacing': ['error', 'always'],
  // imbrication des {} (if/else/try/catch/etc...) unique
  'brace-style': 'error',
  // triple = obligatoire
  eqeqeq: 'error',
  // espaces entre opérateurs
  'space-infix-ops': ['warn'],
  // Force les propriétés à être espacées Ex: { hello: 'World' } -> espace après le double point
  'key-spacing': ['error', { afterColon: true }]
}

/**
 * Pour Vue, on prefix par `vue/`
 *
 * @example `vue/space-in-parens`
 */
const commonVueRules = Object.fromEntries(
  Object.entries(commonRules)
    .map(([key, value]) => [`vue/${key}`, value])
)

/**
 * JS natif
 */
const jsRules = {
  indent: ['error', 2],
  // Force les commentaires multi-lignes du type starred-block
  'multiline-comment-style': ['error', 'starred-block'],
  // Préfère les template string que les concaténations
  'prefer-template': 'error',
  curly: 'error', // {} toujours requises
  'quote-props': 'off', // controle des quotes autour des propriétés des objets
  'no-trailing-spaces': 'warn', // pas d'espaces vides
  semi: ['warn', 'never'], // pas de ";" à la fin des lignes
  'object-shorthand': 'warn',
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
  ]
}

/**
 * Vue uniquement
 */
const vueRules = {
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
  ],
  'vue/mustache-interpolation-spacing': ['error', 'always'],
  'vue/no-multi-spaces': ['error']
}

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    /* Dépend du type de projet ne pas remplacer si déjà présent */
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    'eslint:recommended',
    /* Vue / Nuxt uniquement*/
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  rules: {
    ...commonRules,
    ...jsRules,
    ...commonVueRules,
    ...vueRules
  }
}
