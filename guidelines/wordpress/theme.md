# WordPress : Thème

> Statut : stable · Niveau : avancé

Conventions **spécifiques à Alsacréations** pour le développement de thèmes WordPress. Le fonctionnement standard de WordPress (hiérarchie de templates, Loop et template tags, `WP_Query`, hooks, conditional tags, `get_header()`/`get_footer()`/`get_template_part()`, `register_post_type()`/`register_taxonomy()`, API ACF, `block.json`…) n'est **pas** redocumenté ici&#8239;: il est connu et appliqué par défaut, en suivant la [documentation officielle](https://developer.wordpress.org/themes/). Ce document ne liste que les choix qui distinguent nos projets — à appliquer sans qu'il soit nécessaire de le redemander.

---

## Choix du thème

- Thème **sur mesure**, développé au maximum avec les techniques natives de WordPress (posts, boucles, CPT, taxonomies, blocs).
- Point de départ&#8239;: un thème _starter_ épuré type [Underscores](https://underscores.me/). Supprimer les thèmes livrés par défaut.
- Thème tiers&#8239;: à éviter (code, extensions et évolutions non maîtrisés, guidelines non applicables). S'il est imposé, travailler **uniquement dans un thème enfant**.
- Thème acheté dont les fichiers PHP ne sont pas exploitables&#8239;: créer des [compositions (patterns)](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/) avec l'extension [BlockMeister](https://fr.wordpress.org/plugins/blockmeister/).
- Tout ce qui ne fait pas partie intégrante du thème ou qui est optionnel → extension. Fonctions de base qui ne doivent pas pouvoir être désactivées → **mu-plugin** (voir plus bas).

## Outillage

- Linters et formatters communs&#8239;: voir [Initialisation de projet](../../starters/project-init.md). Côté PHP&#8239;: [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client).
- Compilation CSS/JS avec **Vite** (fourni par WordPlate) depuis le dossier `resources/`, avec HMR en développement. Sass si besoin&#8239;: `pnpm add -D sass`.
- Environnement (Docker, Composer, WordPlate)&#8239;: voir [WordPress — Environnement](environnement.md).

## Conventions PHP

Base&#8239;: [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/). En complément&#8239;:

| Élément | Convention | Exemple |
| --- | --- | --- |
| Fichiers | kebab-case, descriptif, sans abréviation | `get-user-type.php` |
| Fonctions | snake_case **préfixé par le slug du thème** | `kiwistore_get_user_type()` |
| Classes | Pascal_Snake_Case préfixé | `Kiwistore_Product_Utils` |
| Hooks | `add_action()`/`add_filter()` placé **juste après** la fonction qu'il branche | — |

- **Toute** fonction du thème est déclarée dans un `if ( ! function_exists() )`, afin de pouvoir être surchargée par un thème enfant (son `functions.php` est chargé **avant** celui du parent). Même principe avec `class_exists()` pour les classes.

```php
if ( ! function_exists( 'kiwistore_init_custom_features' ) ) {
    function kiwistore_init_custom_features() {
        // …
    }
}
add_action( 'init', 'kiwistore_init_custom_features' );
```

- `functions.php` ne contient pas de logique&#8239;: il ne fait qu'inclure des fichiers dédiés du dossier `includes/` (`theme-setup.php`, `actions.php`, `filters.php`, `menu-filters.php`, `cpt/cpt-<nom>.php`…).

```php
require_once __DIR__ . '/includes/theme-setup.php';
require_once __DIR__ . '/includes/actions.php';
require_once __DIR__ . '/includes/filters.php';
```

- **Ne jamais** s'appuyer en CSS sur les classes générées par WordPress, propres à une installation&#8239;: classes des conteneurs de menus (`.menu-nom-du-menu`) et la plupart des classes de `body_class()`/`post_class()`. Nommage HTML/CSS/JS&#8239;: voir [HTML](../html.md), [CSS](../css.md), [JavaScript](../javascript.md).
- Découper les templates (boucles, en-têtes, cartes…) dans `template-parts/` pour les appeler avec `get_template_part()`.

## Structure du thème

Base&#8239;: la [structure standard](https://developer.wordpress.org/themes/basics/organizing-theme-files/). Dossiers propres à nos projets&#8239;:

```text
nom-du-theme/
├── acf-json/            # Synchronisation ACF (versionné, accessible en écriture)
├── assets/              # css/, images/, js/ (dont css/blocks/, js/blocks/)
├── includes/            # Fichiers inclus par functions.php
├── languages/           # .pot, .po, .mo
├── template-parts/
│   ├── blocks/<bloc>/   # Rendus PHP des blocs ACF
│   ├── footer/  header/  navigation/  page/  post/
├── utils/
└── functions.php, style.css, templates de la hiérarchie…
```

## mu-plugins

Les fonctionnalités essentielles, qu'un non-administrateur ne doit pas pouvoir désactiver depuis le back-office, sont placées dans des _must-use plugins_. Au minimum&#8239;:

- renommage (normalisation) des fichiers dès l'upload dans la médiathèque&#8239;;
- message générique sur les erreurs de connexion (ne pas révéler si l'identifiant ou le mot de passe est faux)&#8239;:

```php
if ( ! function_exists( 'nomduprojet_generic_login_errors' ) ) {
    function nomduprojet_generic_login_errors() {
        return __( 'Something is wrong !', 'nomduprojet' );
    }
}
add_filter( 'login_errors', 'nomduprojet_generic_login_errors' );
```

Développements spécifiques (API externes, comportements métier)&#8239;: regroupés dans une ou plusieurs extensions ou mu-plugins dédiés, branchés par hooks — jamais dans le thème. Exemples de mu-plugins utiles&#8239;: [ArmandPhilippot/mu-plugins](https://gitlab.com/ArmandPhilippot/mu-plugins).

## Chargement des scripts et styles

- Exclusivement via `wp_enqueue_style()`/`wp_enqueue_script()` sur le hook `wp_enqueue_scripts`, avec l'option [`strategy`](https://make.wordpress.org/core/2023/07/14/registering-scripts-with-async-and-defer-attributes-in-wordpress-6-3/) (`defer`/`async`).
- Chemins avec `get_template_directory_uri()`&#8239;; version du fichier = `filemtime()` pour casser le cache.
- Scripts spécifiques (page d'accueil, CPT, modèle de page, archive)&#8239;: chargés **conditionnellement** avec les conditional tags (`is_front_page()`, `is_singular( 'recette' )`, `is_page_template()`, `is_post_type_archive()`…), jamais globalement.
- Variables PHP → JS (URL AJAX, nonce…)&#8239;: `wp_localize_script()` sur le handle du script concerné.

```php
wp_enqueue_script(
    'nomduprojet-main',
    get_template_directory_uri() . '/assets/js/main.js',
    array(),
    filemtime( get_template_directory() . '/assets/js/main.js' ),
    array( 'strategy' => 'defer', 'in_footer' => true )
);
wp_localize_script( 'nomduprojet-main', 'theme_ajax', array(
    'ajax_url' => admin_url( 'admin-ajax.php' ),
    'nonce'    => wp_create_nonce( 'theme-nonce' ),
) );
```

## Traductions

- **Toutes** les chaînes du thème passent par les fonctions de traduction (`__()`, `_e()`, `_n()`, `_x()`, variantes `esc_html__()`/`esc_attr__()`…) avec un text-domain unique égal au slug du projet.
- En-tête de `style.css`&#8239;: `Text Domain: nom-du-projet` et `Domain Path: /languages`.
- Chargement sur `after_setup_theme` avec `load_theme_textdomain( 'nom-du-projet', get_template_directory() . '/languages' )` (`load_child_theme_textdomain()` et `get_stylesheet_directory()` dans un thème enfant).
- Fichiers générés avec [WP-CLI i18n](https://developer.wordpress.org/cli/commands/i18n/)&#8239;: `wp i18n make-pot . languages/nom-du-projet.pot --domain=nom-du-projet`.
- Référence&#8239;: [Préparer un thème WordPress pour l'internationalisation](https://www.alsacreations.com/article/lire/1837-wordpress-theme-internationalisation.html).

## Formulaires

Un formulaire = un [nonce](https://developer.wordpress.org/apis/security/nonces/). Validation et assainissement avec les [fonctions natives](https://developer.wordpress.org/apis/security/data-validation/). Voir aussi [WordPress — Sécurité](security.md).

## Contenus éditables : quel outil pour quel besoin

| Besoin | Outil retenu |
| --- | --- |
| Entité de données autre qu'une page ou un article | **CPT** (+ taxonomies personnalisées si classement) |
| Champs structurés sur une page, un article, un CPT | **Champs ACF** |
| Réglages globaux du site (logo, coordonnées, réseaux sociaux…) | **ACF Options Page** (par défaut) |
| Petit réglage visuel rapide avec aperçu en direct | Customizer (`get_theme_mod()`), en exception |
| Bloc éditorial dont seuls certains champs sont modifiables | **Bloc ACF** |
| Section préconstruite que l'éditeur adapte ensuite | **Pattern** (composition de blocs) |
| Variante de présentation d'un bloc existant | `register_block_style()` |
| Préconfiguration d'un bloc existant | Block variation |
| Structure à figer dans un template ou un pattern | Locking (`templateLock`, attribut `lock`) |
| Insertion simple avec paramètres, sans édition détaillée (formulaire, carte) | Shortcode |
| Mise en page propre à certaines pages | Modèle de page (`Template Name:`) |
| Menus | Bloc Navigation, ou emplacements `register_nav_menus()` |

### CPT et taxonomies

- Créés **depuis l'interface ACF**, puis exportés en PHP (onglet _Outils_) dans `includes/cpt/cpt-<nom>.php`, ou synchronisés en JSON.
- Avec Gutenberg&#8239;: `'show_in_rest' => true` et `'supports'` incluant `'editor'` (sur les taxonomies aussi, `show_in_rest`).
- CPT hiérarchique&#8239;: renseigner obligatoirement le label `parent_item_colon`, sinon le sélecteur de page parente n'apparaît pas dans Gutenberg.

### ACF

- Dossier **`acf-json/`** à la racine du thème, accessible en écriture et **versionné**&#8239;: synchronise automatiquement groupes de champs, CPT et taxonomies. Pour forcer la génération des JSON&#8239;: onglet _Sync_, ou action groupée «&#8239;Activer&#8239;» sur tous les groupes.
- Lecture des options&#8239;: `get_field( 'nom_du_champ', 'option' )`.
- Filtrer une requête sur des valeurs ACF&#8239;: `meta_query` dans `WP_Query`.

### Blocs ACF

Préférés aux blocs JavaScript pour exposer uniquement des champs précis (texte, image, relation, taxonomie…). Mise en place&#8239;:

1. Groupe de champs défini dans l'interface ACF.
2. Rendu PHP dans `template-parts/blocks/<bloc>/<bloc>.php`.
3. Enregistrement avec [`acf_register_block_type()`](https://www.advancedcustomfields.com/resources/acf_register_block_type/) sur le hook `acf/init`, avec un `example` pour l'aperçu dans l'inserteur.
4. CSS/JS propres au bloc dans `assets/css/blocks/` et `assets/js/blocks/`, chargés via `enqueue_assets` (uniquement quand le bloc est présent).

Dans le template de rendu, toujours reprendre l'ancre, les classes additionnelles et l'alignement saisis dans l'éditeur, et prévoir des valeurs par défaut pour l'aperçu&#8239;:

```php
$id = ! empty( $block['anchor'] ) ? $block['anchor'] : 'testimonial-' . $block['id'];
$class_name = 'testimonial-block';
if ( ! empty( $block['className'] ) ) {
    $class_name .= ' ' . $block['className'];
}
if ( ! empty( $block['align'] ) ) {
    $class_name .= ' align' . $block['align'];
}
$text = get_field( 'testimonial' ) ?: 'Votre témoignage ici…';
```

### theme.json

Sert à la gouvernance de l'éditeur&#8239;: palettes, presets (espacements, typographie) et limitation de ce qui est exposé aux contributeurs (ex. `"custom": false` sur les couleurs). Correspondance presets ↔ variables CSS et design tokens&#8239;: voir [WordPress — Presets](../../resources/wordpress-presets.md) et [CSS](../css.md).

---

## Voir aussi

- [WordPress — Vue d'ensemble](global.md) — Hooks, hiérarchie des templates.
- [WordPress — Environnement](environnement.md) — Docker, Composer, WordPlate.
- [WordPress — Extensions](extensions.md) — Extensions retenues, installation via Composer.
- [WordPress — Sécurité](security.md) — Mesures avant, pendant et après développement.
- [WordPress — Presets](../../resources/wordpress-presets.md) — Variables CSS générées par `theme.json`.
