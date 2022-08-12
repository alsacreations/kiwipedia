
# Checklist

Liste de bonnes pratiques et points à prendre en compte avant/durant/après l'élaboration d'un projet web.

Voir aussi les check-lists Opquast <https://checklists.opquast.com/fr/assurance-qualite-web/>

Les priorités indiquées sont purement indicatives à et moduler selon chaque projet. Tout critère pouvant être déterminant ou sensible à chaque phase, il est difficile de pondérer efficacement une telle liste.

___

## Intégration

|Critère|Priorité|
| ------------- | ------------- |
| Chaque page comporte un titre unique et pertinent (favorise le référencement et l’utilisabilité/accessibilité) | *** |
| Il y a un lien vers un flux RSS valide si un CMS est utilisé | * |
| Les préfixes navigateurs CSS sont gérés automatiquement (autoprefixer) | * |
| Un reset CSS est appliqué | * |
| Internet Explorer est géré en mode de compatibilité standard | * |
| Les balises HTML sont utilisées de manière sémantique | ** |
| Les balises HTML5 de sections et types pour les formulaires sont exploitées | *** |
| Le média print est pris en compte pour les contenus imprimables | * |

## Webdesign

|Critère|Priorité|
| ------------- | ------------- |
| Le design est basé sur une grille de mise en page éprouvée pour le Web y compris pour le Responsive en mobile | ** |
| Les polices de fontes/tailles différentes sont limitées et lisibles | ** |

## Performance

|Critère|Priorité|
| ------------- | ------------- |
| Les scripts JavaScript sont chargés de manière optimisée et non bloquante (favorise la vitesse d'affichage et le référencement) | * |
| Les fichiers CSS et JavaScript sont concaténés et minifiés (favorise la vitesse d'affichage) | ** |
| Les fichiers ont une date d'expiration HTTP pour le cache (favorise la vitesse d’affichage et allège les ressources serveur) | * |
| Les images sont optimisées et compressées (favorise la vitesse d'affichage) | * |
| Une page d'erreur 404 est présente | ** |
| Les polices externes sont optimisées | * |
| Les contenus statiques sont stockés sur un domaine sans cookies | * |
| Les fichiers sont compressés côté serveur (deflate, gzip) | * |
| Les performances front-end du site ont été vérifiées | * |
| Le nombre de web fonts est limité | * |

## Référencement

|Critère|Priorité|
| ------------- | ------------- |
| Chaque page comporte une section `<head>` avec des balises `<meta>` description et keywords et autres indications pertinentes | * |
| Un tag de suivi des statistiques (Google Analytics ou équivalent) est inséré | * |
| Le site est enregistré sur Google Search Console (compte Google requis) | * |
| Le fichier robots.txt est présent | ** |
| Un sitemap XML est généré | * |
| Des microdonnées/microformats sont utilisés (Schema.org, JSON-LD) | * |

## Accessibilité

|Critère|Priorité|
| ------------- | ------------- |
| Des liens d'évitement sont opérationnels | ** |
| Le contraste contenu / fond est suffisant | ** |
| Les contenus visuels ont des alternatives texte | ** |
| La langue des contenus est précisée (attribut lang) | * |
| Des tailles de polices fluides sont employées, le contenu est lisible avec un zoom texte à 200% | * |
| La hiérarchie des titres est correcte | ** |
| La navigation au clavier est possible | *** |
| Les formulaires sont accessibles | *** |
| Le site est utilisable sans CSS et/ou JavaScript et/ou sans images et/ou sans images de fond | * |
| Des landmarks ARIA sont définis et ARIA est utilisé avec ses rôles et propriétés pour tous les composants le nécessitant | * |

## Projet

|Critère|Priorité|
| ------------- | ------------- |
| Le nom de domaine est fonctionnel | *** |
| Le projet est versionné (Git) | *** |
| La documentation est à jour | *** |
| Les permissions des fichiers en production sont correctes | ** |

## Qualité

|Critère|Priorité|
| ------------- | ------------- |
| Les liens internes sont valides | ** |
| Le site fait appel à des technologies open-source et interopérables | ** |
| La disponibilité du site est monitorée (selon l’hébergement choisi) | ** |
| Une icône favicon est présente à la racine du site | ** |
| Les pages sont testées sur les navigateurs bureau et mobiles principaux | ** |
| L'orthographe et la grammaire sont vérifiées | * |

## Développement

|Critère|Priorité|
| ------------- | ------------- |
| Une nomenclature constante et internationale est adoptée | ** |
| L'indentation des fichiers est conventionnée (.editorconfig) | *** |
| La syntaxe du code source est validée par les outils appropriés (eslint) | *** |

## Sécurité

|Critère|Priorité|
| ------------- | ------------- |
| Toutes les entrées utilisateur (formulaires, paramètres GET, etc) sont filtrées et validées côté serveur | *** |
| Les en-têtes HTTP relatives à la sécurité (CSP, CSRF, X-XSS, etc) sont configurées | ** |
| Le protocole HTTPS est utilisé avec un certificat valide | *** |
