# WordPress :  Accessibilité

* [WordPress.org : Accessibilité](https://fr.wordpress.org/about/accessibility/)
* [Articles d'Access42 autour de WordPress](https://access42.net/wordpress)
* [Vidéos de WordPress Accessibility Day](https://www.youtube.com/channel/UCes9XCUZd51CAigbBEGlfNg)

## Recommandations générales

* Utiliser des thèmes et plugins respectant les normes d'accessibilité.
* Mettre à jour régulièrement WordPress, les thèmes et plugins pour bénéficier des dernières améliorations en matière d'accessibilité.

## Techniques de développement (Code)

### Classes utilitaires natives

WordPress fournit nativement la classe CSS [screen-reader-text](https://make.wordpress.org/accessibility/handbook/markup/the-css-class-screen-reader-text/) (à définir dans le CSS du thème selon les standards WP) pour masquer du texte visuellement mais le garder accessible aux lecteurs d'écran.

### Liens d'évitement (Skip links)

Intégrer un lien "Aller au contenu" tout en haut du `header.php` pour permettre la navigation rapide au clavier avant le menu.

```html
<a class="screen-reader-text skip-link" href="#content">Aller au contenu principal</a>
```

### Navigation

* Utiliser la balise sémantique `<nav>` autour des appels `wp_nav_menu()`.
* Ajouter un `aria-label` distinctif si plusieurs navigations existent (ex: `aria-label="Menu principal"`).
* S'assurer via JavaScript que les sous-menus sont ouvrables au clavier (touche Entrée ou Espace).

### Images dynamiques

Utiliser systématiquement les fonctions natives comme `the_post_thumbnail()` ou `wp_get_attachment_image()`. Elles génèrent automatiquement l'attribut `alt` à partir des métadonnées saisies en administration.

## Gestion des Contenus (Admin et Éditeur)

### Texte alternatif

Dans la médiathèque ou les réglages du bloc Image Gutenberg :

* Images informatives : Décrire l'image (ex: "Graphique montrant la hausse des ventes").
* Images décoratives : Laisser le champ "Texte alternatif" vide. WordPress générera un `alt=""`, indiquant aux lecteurs d'écran d'ignorer l'image.

### Hiérarchie des titres

Dans l'éditeur de blocs :

* Utiliser les niveaux de titres (H2, H3, H4) pour structurer le document logiquement, et non pour choisir une "taille de police".
* Ne jamais sauter de niveau (ex: passer de H2 à H4).

### Liens explicites

Éviter les liens génériques comme "Cliquez ici" ou "En savoir plus". Le lien doit être compréhensible hors contexte (ex: "Consulter notre catalogue").

## Ressources complémentaires

* [Guide d'accessibilité WordPress](https://make.wordpress.org/accessibility/handbook/)
* [Thèmes WordPress accessibles](https://wordpress.org/themes/tags/accessibility-ready/)
* [Checklist d'accessibilité pour les développeurs WordPress](https://developer.wordpress.org/themes/classic-themes/functionality/accessibility/)
* [Forum d'entraide Accessibilité WordPress](https://wordpress.org/support/forum/accessibility/)
