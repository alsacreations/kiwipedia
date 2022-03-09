<?php
/*
 * Plugin Name: Kiwiplate setup theme
 * Description: Custom dashboard UI & Security theme
 * Author: Alsacréations
 * Author URI: https://www.alsacreations.fr/
 * Version: 1.0.0
 * Plugin URI: https://github.com/alsacreations/guidelines/blob/master/Guidelines-WordPress.md
 */

// Not a WordPress context? Stop.
!defined('ABSPATH') and exit;

class Kiwiplate_setup_theme
{
    /**
     * __construct
     */
    public function __construct()
    {
        // add_action('login_head', [$this, 'clean_ui_logo']);
        add_action('init', [$this, 'kiwi_remove_generators']);
        add_action('admin_menu', [$this, 'kiwi_change_admin_menu']);
        add_action('init', [$this, 'kiwi_change_default_post_name']);
        add_filter('rest_endpoints', [$this, 'kiwi_remove_rest_endpoints']);
        add_action('admin_bar_menu', [$this, 'kiwi_clean_dashboard_menu'], 999);
        add_action('wp_dashboard_setup', [$this, 'kiwi_clean_dashboard_widgets']);
        add_filter('style_loader_src', [$this, 'kiwi_remove_script_version'], 15, 1);
        add_filter('script_loader_src', [$this, 'kiwi_remove_script_version'], 15, 1);
    }

    // FIXME: A tester
    // public function clean_ui_logo()
    // {
    //     $url = get_theme_file_uri('favicon.svg');
    //     $width = 200;

    //     $styles = [
    //         sprintf('background-image: url(%s);', $url),
    //         sprintf('width: %dpx;', $width),
    //         'background-position: center;',
    //         'background-size: contain;',
    //     ];

    //     echo sprintf(
    //         '<style> .login h1 a { %s } </style>',
    //         implode('', $styles)
    //     );
    // }


    /**
     * kiwi_remove_generators
     *
     * @return void
     */
    public function kiwi_remove_generators()
    {
        add_filter('the_generator', '__return_false');
        // Disable XML RPC for security.
        add_filter('xmlrpc_enabled', '__return_false');
        // Remove WLW manifest
        remove_action('wp_head', 'wlwmanifest_link');
        // Display the links to the extra feeds such as category feeds
        remove_action('wp_head', 'feed_links_extra', 3);
        // Display the links to the general feeds: Post and Comment Feed
        remove_action('wp_head', 'feed_links', 2);
        // Display the link to the Really Simple Discovery service endpoint, EditURI link
        remove_action('wp_head', 'rsd_link');
        // index link
        remove_action('wp_head', 'index_rel_link');
        // prev link
        remove_action('wp_head', 'parent_post_rel_link', 10, 0);
        // start link
        remove_action('wp_head', 'start_post_rel_link', 10, 0);
        // Display relational links for the posts adjacent to the current post.
        remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
        // Display the XHTML generator that is generated on the wp_head hook, WP ver
        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'wp_shortlink_wp_head');
        // Removes REST API link tag from header.
        remove_action('wp_head', 'rest_output_link_wp_head', 10);
    }


    /**
     * kiwi_change_admin_menu
     *
     * @return void
     */
    public function kiwi_change_admin_menu()
    {
        global $menu;
        global $submenu;
        $menu[5][0] = 'Actualités';
        $menu[5][6] = 'dashicons-megaphone'; // https://developer.wordpress.org/resource/dashicons/#search
        $submenu['edit.php'][5][0]  = 'Toutes les actualités';
        $submenu['edit.php'][10][0] = 'Ajouter une actualité';
    }


    /**
     * kiwi_change_default_post_name
     *
     * @return void
     */
    public function kiwi_change_default_post_name()
    {
        global $wp_post_types;

        $labels                     = &$wp_post_types['post']->labels;
        $labels->name               = __('Toutes les actualités', 'lohr');
        $labels->add_new            = __('Ajouter une actualité', 'lohr');
        $labels->new_item           = __('Actualités', 'lohr');
        $labels->view_item          = __('Voir cette actualité', 'lohr');
        $labels->not_found          = __('Aucune actualité trouvé', 'lohr');
        $labels->edit_item          = __('Editer une actualité', 'lohr');
        $labels->add_new_item       = __('Ajouter une actualité', 'lohr');
        $labels->search_items       = __('Chercher une actualité', 'lohr');
        $labels->singular_name      = __('Actualités', 'lohr');
        $labels->name_admin_bar     = __('Actualités', 'lohr');
        $labels->not_found_in_trash = __('Aucune actualité trouvé dans les brouillons', 'lohr');
    }


    /**
     * kiwi_remove_rest_endpoints
     * Disable default users API endpoints for security.
     * https://www.wp-tweaks.com/hackers-can-find-your-wordpress-username/
     * 
     * @param  mixed $endpoints
     * @return void
     */
    public function kiwi_remove_rest_endpoints($endpoints)
    {
        if (!is_user_logged_in()) {
            if (isset($endpoints['/wp/v2/users'])) {
                unset($endpoints['/wp/v2/users']);
            }

            if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
                unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
            }
        }
        return $endpoints;
    }


    /**
     * kiwi_clean_back_office
     *
     * @param  mixed $menu
     * @return void
     */
    public function kiwi_clean_dashboard_menu($menu)
    {
        $menu->remove_node('view'); // View
        $menu->remove_node('menus'); // Menus
        $menu->remove_node('search'); // Search
        $menu->remove_node('wp-logo'); // WordPress Logo
        $menu->remove_node('updates'); // Updates
        $menu->remove_node('dashboard'); // Dashboard
        $menu->remove_node('view-site'); // Visit Site
        $menu->remove_node('new-content'); // New Content
    }


    /**
     * kiwi_clean_dashboard_widgets
     *
     * @return void
     */
    public function kiwi_clean_dashboard_widgets()
    {
        global $wp_meta_boxes;

        unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']); // WordPress Events and News
        unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']); // Quick Draft
    }


    /**
     * kiwi_remove_script_version
     * Removes ?ver= query from styles and scripts.
     * 
     * @param  mixed $src
     * @return void
     */
    public function kiwi_remove_script_version(string $src)
    {
        return $src ? esc_url(remove_query_arg('ver', $src)) : $src;
    }
}
new Kiwiplate_setup_theme();
