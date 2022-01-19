# Guidelines : Vue dans WordPress

Statut : Statut : Candidate Recommendation (CR)

Cette présente convention rassemble les bonnes pratiques "Vue dans WordPress" en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Structure de projet

[WebpackMix](https://laravel.com/docs/8.x/mix), installé par défaut par WordPlate compile les fichiers .vue ET .js par la méthode `mix.js()`.
Les composants Vue seront placés dans le dossier `resources/components/`
Le nommage des composants se fera en respectant les Guidelines Vue.js.

## Installation

### Utilisation dans WordPress

Puisque WebpackMix compile les fichiers Vue par défaut, il suffit d’installer Vue lui-même avec le fichier .js directement.

1. Lancer `npm install vue`
2. Dans webpack.mix.js ajouter `mix.js('resources/scripts/app.js', 'app.js').vue()`
3. Créer l’application VUE dans `resources/app.js` (Voir plus bas)
4. Créer un élément HTML dans le thème qui sera toujours présent avec `id="app"`
5. Créer des composants et les utiliser.
6. Ne pas oublier de `npm run dev`

```js
import Vue from 'vue'
import CustomButton from './../components/CustomButton.vue'

const app = new Vue({
  el: '#app',
  name: 'App',
  components: {
    CustomButton
  }
})
```

## Règles d’utilisation dans WordPress

Quand l'utiliser dans WordPress ?

Nous utilisons Vue lors de la création de composants interactifs et plus complexes. De plus, le composant en question ne doit pas être important pour le SEO, puisque les robots n’auront pas accès au contenu. Sinon envisager Nuxt avec un rendu SSR. Nous ne l’utilisons donc pas pour créer des composants HTML types boutons etc… Pour cela nous avons Twig. Son utilisation doit permettre de faciliter considérablement les développements. Puisque nous ajoutons un script relativement lourd (~80 Ko minifié), il ne faut pas l’inclure dans tous les cas. Enfin nous devons prendre en considération l’impact sur le chargement de la page et de l’importance que l'on apporte à la performance.

Pour un projet sans Timber, voir aussi

- <https://dev.to/dgmann/vue-application-as-a-wordpress-plugin-9nm>
- <https://dev.to/workingwebsites/using-vue-in-wordpress-1b9l>
- <https://smart-tech.mg/creation-dune-application-sur-une-seule-page-avec-wordpress-et-vuejs/>

## Props

Dans notre fichier php, nous faisons appel au fichier Twig qui se chargera de faire le rendu du template. De plus, nous passons le contenu au template.

Note: **S’assurer que le HTML contenu dans les posts et autres soit bien échappé.**

```php
$context = Timber::context();
$context['post'] = esc_html(wp_json_encode( Timber::get_post()))

$context['post_title'] = Timber::get_post()->post_title;

Timber::render('templates/index.twig', $context);
```

Dans notre fichier twig, nous avons accès aux données du back dans `post` et `post_title` , dans le cas d’un string ou d’un number, il est possible de passer directement le contenu.

Si nous voulons passer un array, object ou number et non leur valeur convertie en String, il faut penser à annoter sa prop de `:`

```twig
{% extends 'base.twig' %}

{% block content %}
  <div class="flex justify-center">
    <h1>Vue dans WP</h1>
  </div>

  <component
    maprop="{{ post_title }}"
    :post="{{ post }}"
  >
  </component>
{% endblock %}
```

Enfin, notre composant à accès aux données du back et peut les utiliser avec sa prop dans le template.

## Data - REST

Pour des cas spécifiques nous pouvons récupérer les données depuis le composant Vue sans passer par des props. Pour ceci, nous utiliserons toujours axios qui facilite les requêtes REST.

```js
import axios from 'axios'
```

Nous aurons toujours une data qui se chargera de contenir les informations.

```js
data() {
  return {
    posts: []
  }
},
```

Nous aurons toujours une méthode à part, qui se charge de récupérer les informations. Cette méthode sera toujours *async* pour pouvoir récupérer le résultat dans les hooks mounted / created.

```js
methods: {
  async getPosts() {
    const { data } = await axios.get('/wp-json/wp/v2/posts/')
    return data
  }
}
```

Enfin au created ou mounted, nous faisons appel à la méthode et nous passons les informations à la data. Toujours prévoir le cas où la requête ne fonctionne pas, dans un bloc try/catch ou `.catch(() => {})`

```js
mounted() {
  this.getPosts().then(posts => {
    this.posts = posts
  }).catch(error) {
    ...
  } 
},
```

## L’API WordPress

Requis: Modifier les permaliens en %postname%.

### GET

La requête GET est celle que nous utiliserons le plus souvent. En effet, c’est elle qui permet de récupérer des informations du back.

Pour les Custom Post Type, nous activerons l’option `"show_in_rest" => true`

Nous pourrons donc accéder aux posts en questions via: `https://example.org/wp-json/wp/v2/cpt`, par exemple `https://example.org/wp-json/wp/v2/kiwi`.

### Configuration

Dans le dossier du thème, nous aurons un dossier “REST” où nous pourrons trouver un fichier `index.php` qui regroupe nos options pour l’API.

Nous créons une fonction `register_rest_custom_fields` qui aura pour but de générer des nouvelles clés dans les objets de l’API.

A l’intérieur nous placerons les champs dont nous avons besoin.

Ex: On passe le Custom Post Type, on donne la clé que l’objet Javascript aura et enfin la fonction  qui permet de générer le contenu de la clé. Dans cet exemple, tous les champs ACF seront accessibles dans l’API pour le CPT “Kiwi”.

```php
function register_rest_custom_fields () {
    register_rest_field( array('kiwi'),
        'acf',
        array(
            'get_callback'    => 'get_rest_acf'
        )
    );
}


function get_rest_acf( $object ) {
    if ( $object ) {
        $acf = get_fields($object->ID);
        return $acf;
    }
    return false;
}
```

Cette fonction sera appelée dans le hook `rest_api_init`.

```php
add_action('rest_api_init', 'register_rest_custom_fields');
```

Résultat:

```json
{
  post_title: '',
  acf: {
    contenu
  }
}
```

### Création de routes

Dans le dossier REST nous aurons un dossier routes, avec nos différentes routes custom.
Elles seront toutes include dans le fichier REST/routes/index.php qui lui même sera include dans REST/index.php

```text
Theme
   REST (dir)
     - index.php
     routes (dir)
       - index.php
       - une_route.php
```

La création de route se fera, globalement toujours de la même manière:

- Créer le fichier controller, dans REST/routes/ma_route.php
- Configurer la route
- `include` dans le fichier REST/routes/index.php

Un fichier type sera:

```php
function get_custom_object() {
    $object = array(
        'key' => 'The value'
    );

    return rest_ensure_response( $object );
}

function register_custom_object() {
    register_rest_route( 'kiwis/v1', '/doge', array(
        'callback' => 'get_custom_object',
    ));
}

add_action( 'rest_api_init', 'register_get_custom_object' );
```

Nommage :

- La fonction callback qui génère le résultat sera toujours préfixée par `get`, `update`, `delete` ou `create`.
- La fonction générant la route API, sera toujours préfixée par `register_nom_de_l_objet()`.

En effet, dans la fonction register il est possible de créer toutes les routes CRUD. Il n’est donc pas nécessaire de la préfixer de register_…, get_... ou register_delete_... etc.

## Créer un plugin WordPress

Le but du plugin est qu’il va uniquement enregistrer Vue lorsqu’il sera activé dans l’admin WordPress. Dans ce cas, cela fait charger une application Vue complète. Un deuxième plugin signifierait charger une deuxième application.
Le projet Vue sera, quant à lui, généré au moment où le shortcode sera inséré dans une page WordPress (et accessible seulement sur cette page).

### Installer Vue

Une fois la création du dossier du plugin fait, on se positionne à l’intérieur et on lance l’installation de Vue, d’après la documentation officielle.

### Enregistrer Vue

Dans le plugin, on enregistre les fichiers compilés Vue en utilisant la fonction [register_scripts](https://developer.wordpress.org/reference/functions/wp_register_script/).

```php
<?php
/**
 * Plugin Name:  Alsacreations - Annuaire VueJS API
 * Plugin URI:
 * Description: Annuaire utilisant VueJS et Axios
 * Author: Alsacreations
 * Text Domain: alsa-annuaire
 * Domain Path: /languages
 *
 */

// On enregistre les scripts JS sans les appeler
function alsa_annuaire_register_scripts() {

  $file = plugin_dir_url(__FILE__) . 'annuaire/dist/' . get_hashed_file('app');
  wp_register_script('wpvue_vuejs', $file, ['wpvue_vuejs_vendors', 'wpvue_vuejs_routes'], false);

  $file2 = plugin_dir_url(__FILE__) . 'annuaire/dist/' . get_hashed_file('chunk-vendors');
  wp_register_script('wpvue_vuejs_vendors', $file2, [], false);

  $file3 = plugin_dir_url(__FILE__) . 'annuaire/dist/' . get_hashed_file('annuaire');
  wp_register_script('wpvue_vuejs_routes', $file3, [], false);
}
add_action('wp_enqueue_scripts', 'alsa_annuaire_register_scripts');

// Récupérer le hash des fichiers correspondant à la date de création
function get_hashed_file( $filename ) {
  $regex = '/\/[\w-]+\.[\w-]+.*/i';
  $fileWithHash = glob( dirname(__FILE__) . '/annuaire/dist/js/' . $filename . '.*.js' )[0];
  preg_match($regex, $fileWithHash, $matches);

  // Code ajouté pour ne récupérer que le chemin du fichier à partir du dossier . Donc : "/js/app.xxx.js"
  if ( $matches[0] ) {
    $version = substr( $matches[0], strpos($matches[0], "/js") + 1);
  }
  return $version;
}
```

🚨 Il ne faut surtout pas appeler les scripts ([enqueue_scripts](https://developer.wordpress.org/reference/functions/wp_enqueue_script/)) ici. Sinon ils seront appelés sur tout le site.

On peut utiliser la fonction `glob("*.js")` pour deviner automatiquement les fichiers générés dans le dossier de sortie ou changer la configuration de webpack pour la génération du nom du fichier sortant (output) <https://webpack.js.org/configuration/output/>

À noter qu’une fonction `get_hashed_file` (dans notre plugin) est utilisée pour appeler les fichiers. Cette fonction permet de cibler les fichiers Vue, à l’aide d’une regex, car les noms des fichiers sont renommés à chaque compilation. Le nommage se fait systématiquement sous la forme suivante : `nomFichier.hash.js`

TODO: déterminer une méthode pour charger les fichiers .css pour accéder aux styles WordPress (et au hot-reload).

### Création du shortcode

```php
// On créer le shortcode WP dans lequel on appelle les scripts JS
function alsa_create_shortcode() {
  // On appelle les scripts JS
  wp_enqueue_script('wpvue_vuejs');
  // On appelle la feuille de style
  wp_enqueue_style( 'alsa-annuaire-style', plugin_dir_url(__FILE__). 'annuaire/src/assets/css/style.css' );

  $html = '<div id="app"></div>';
  return $html;
}
add_shortcode( 'annuaire-shortcode', 'alsa_create_shortcode' );
```

On peut maintenant créer notre shortcode. Ainsi qu'indiqué précédemment il va (enfin !) nous permettre d’appeler les fichiers Vue (en utilisant enqueue_scripts) et surtout d’initialiser le projet Vue (à l’aide d’un id, ici `#app`).

### Ajout du projet dans une page WordPress

Une fois les étapes précédentes créées, on peut activer le plugin, et insérer le shortcode sur une page WordPress.
