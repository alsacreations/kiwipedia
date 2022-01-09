import Vue from 'vue'
import * as VeeValidate from 'vee-validate'
import { required, alpha_num as alphaNum, email, length, numeric } from 'vee-validate/dist/rules'

// Module de validation des formulaires

// Configuration des classes CSS utilisées dans le DOM
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'form-error is-invalid'
    // ... https://logaretm.github.io/vee-validate/guide/state.html#css-classes
  }
})

// Champ requis
VeeValidate.extend('required', {
  ...required,
  message: 'Ce champ est obligatoire'
})

// Champ de longueur minimale
// extend('min', {
//   ...min
// })

// Longueur exacte
VeeValidate.extend('length', {
  ...length,
  message: 'Veuillez respecter la longueur demandée'
})

// Code postal
VeeValidate.extend('zip', {
  ...alphaNum,
  message: "Ce code postal n'est pas valide"
})

// Adresse e-mail
VeeValidate.extend('email', {
  ...email,
  message: 'Cette adresse ne semble pas valide'
})

// Nombre seulement
VeeValidate.extend('numeric', {
  ...numeric,
  message: 'Veuillez indiquer uniquement des chiffres'
})

// Correspondance de mots de passe
// https://logaretm.github.io/vee-validate/advanced/cross-field-validation.html#targeting-other-fields
VeeValidate.extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Les mots de passe ne correspondent pas'
})

// Adéquation complexité mot de passe
VeeValidate.extend('passwordrules', {
  validate(value) {
    // "8 caractères minimum, avec au moins une lettre majuscule, une lettre minuscule et un chiffre (0-9)"
    return value.length >= 8 && /[A-Z]+/.test(value) && /[a-z]+/.test(value) && /[0-9]+/.test(value)
  },
  message:
    'Votre mot de passe doit comprendre 8 caractères minimum, avec au moins une lettre majuscule, une lettre minuscule et un chiffre (0-9).'
})

// import { localize } from 'vee-validate'
// localize('fr')

Vue.use(VeeValidate, {
  // inject: true,
  locale: 'fr'
})

Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
