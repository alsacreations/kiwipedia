# WordPress : Performance

⚠️ Tout au long du développement, il faut surveiller les performances du site, en particulier le temps de chargement des pages et le nombre de requêtes SQL effectuées (lorsqu'on développe de nouvelles fonctionnalités ou lorsqu'on ajoute des extensions) en activant une extension affichant ces informations (ex : [Query Monitor](https://wordpress.org/plugins/query-monitor/)).

👉 Mettre en place une extension de cache + compression/minification (voir [extensions](extensions.md)), la plus pratique par défaut étant WP Super Cache.

🔖 Identifier les requêtes lentes <https://css-tricks.com/finding-and-fixing-slow-wordpress-database-queries/>

## Astuces

Éviter les requêtes SQL multiples pour charger des données ACF, par exemple récupérer les champs [par groupe](https://www.advancedcustomfields.com/resources/group/) ou par `get_fields`.

```php
// Au lieu de :
$api_path = get_field('api_path', 'option'); // 1 requête
$api_version = get_field('api_version', 'option'); // 1 requête
$api_provider_id = get_field('api_provider_id', 'option'); // 1 requête

// Mieux vaut :
$acf_options = get_fields('option') ?: []; // 1 requête
$api_path = $acf_options['api_path'] ?? null;
$api_version = $acf_options['api_version'] ?? null;
$api_provider_id = $acf_options['api_provider_id'] ?? null;
```
