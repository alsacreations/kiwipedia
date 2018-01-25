# Guidelines : WordPress

## Installation

## Migration

* https://codex.wordpress.org/Changing_The_Site_URL
* Utiliser WP Migrate DB pour remplacer les URLs de la base de données, y compris dans les données sérialisées.

## Développement et versionnement

### .gitignore

Utiliser/adapter https://salferrarello.com/wordpress-gitignore/

## Thèmes

## Plugins

## Maintenance et mises à jour

## Snippets

### Récupérer le permalien des pages ayant un template spécifique
#### Pour une seule page ayant le template ciblé
```
//Pour une seule page
$page_template_link = get_permalink(get_pages(
    array(
        'meta_key' => '_wp_page_template',
        'meta_value' => 'template-page.php' //A modifier par le template souhaité
    )
)[0]->ID);
```
#### Pour plusieurs pages ayant le template ciblé
```
//Pour plusieurs pages ayant le même template
$page_template_link = get_pages(
    array(
        'meta_key' => '_wp_page_template',
        'meta_value' => 'template-page.php' //A modifier par le template souhaité
    )
);

if(!empty($page_template_link)){
    foreach($page_template_link as $single_page){
        $page_link = get_permalink($single_page->ID);
        echo $page_link;
    }
}
```


### Forcer la mise à jour par téléchargement direct

Dans `wp-config.php` ajouter
```
define('FS_METHOD' 'direct');
```
