const apiFactory = axios => ({
  // Récupération de la liste de tous les pays
  async getAllCountries() {
    return await axios.$get(
      '/location/country/all'
    )
  }
})

/*
** Exécuté par ~/.nuxt/index.js avec le contexte reçu en param
** Cette méthode peut être asynchrone
*/
export default ({ $axios }, inject) => {
  // Injecte la clé `api` dans l'application, usage avec
  // -> app.$api
  // -> this.$api dans les composants Vue
  // -> this.$api dans les actions/mutations du store
  const api = apiFactory($axios)
  inject('api', api)
}
