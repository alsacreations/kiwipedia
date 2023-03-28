
# Checklist

Liste de bonnes pratiques et points à prendre en compte avant/durant/après l'élaboration d'un projet web.

Voir aussi 

- [La check-list Opquast](https://checklists.opquast.com/fr/assurance-qualite-web/)
- [La checklist PiDila](https://design.numerique.gouv.fr/outils/checklist-pidila/)

Les priorités indiquées sont purement indicatives à et moduler selon chaque projet. Tout critère pouvant être déterminant ou sensible à chaque phase, il est difficile de pondérer efficacement une telle liste.

___

## Intégration et design

| Critère | Priorité |
| ------------- | ------------- |
| Chaque page comporte un titre unique et pertinent (favorise le référencement et l’utilisabilité/accessibilité) | *** |
| Il y a un lien vers un flux RSS valide si un CMS est utilisé | * |
| Les balises HTML sont utilisées de manière sémantique y compris pour la structure du document | *** |
| Le média print est pris en compte pour les contenus imprimables | * |
| Le design est basé sur une grille de mise en page éprouvée pour le Web y compris pour le Responsive en mobile | ** |
| Les polices de fontes/tailles différentes sont limitées et lisibles | ** |
| Une nomenclature et une indentation constantes sont adoptées | ** |
| La syntaxe du code source est validée par les outils appropriés (lint) | *** |

## Performance

| Critère | Priorité |
| ------------- | ------------- |
| Les scripts JavaScript sont chargés de manière optimisée et non bloquante (favorise la vitesse d'affichage et le référencement) | * |
| Les fichiers CSS et JavaScript sont concaténés et minifiés (favorise la vitesse de chargement et allège les requêtes) | ** |
| Les fichiers ont une date d'expiration HTTP pour le cache (favorise la vitesse d’affichage et allège les ressources serveur) | * |
| Les images sont correctement compressées (favorise la vitesse de chargement) | * |
| Les contenus statiques sont stockés sur un domaine sans cookies | * |
| Les fichiers sont compressés côté serveur (deflate, gzip) | * |
| Le nombre de web fonts est limité | * |

## Référencement

| Critère | Priorité |
| ------------- | ------------- |
| Chaque page comporte une section `<head>` avec des balises `<meta>` description et keywords et autres indications pertinentes | * |
| Le fichier robots.txt est présent | ** |
| Un sitemap XML est généré | * |
| Des microdonnées/microformats sont utilisés (Schema.org, JSON-LD) | * |

## Accessibilité

| Critère | Priorité |
| ------------- | ------------- |
| Des liens d'évitement sont opérationnels | ** |
| Le contraste contenu / fond est suffisant | ** |
| Les contenus visuels ont des alternatives texte | ** |
| La langue des contenus est précisée (attribut HTML lang) | * |
| Des tailles de polices fluides sont employées, le contenu est lisible avec un zoom texte à 200% | * |
| La hiérarchie des titres est correcte | ** |
| La navigation au clavier est possible | *** |
| Les formulaires sont accessibles | *** |
| Des landmarks ARIA sont définis et ARIA est utilisé avec ses rôles et propriétés pour tous les composants le nécessitant | * |

## Projet

| Critère | Priorité |
| ------------- | ------------- |
| Le nom de domaine est fonctionnel | *** |
| Le projet est versionné (Git) | *** |
| La documentation est à jour | *** |

## Qualité

| Critère | Priorité |
| ------------- | ------------- |
| Les liens internes sont valides | ** |
| Le site fait appel à des technologies open-source et interopérables | ** |
| La disponibilité du site est monitorée (selon l’hébergement choisi) | ** |
| Une icône favicon est présente | ** |
| Les pages sont testées sur les navigateurs bureau et mobiles principaux | ** |
| L'orthographe et la grammaire sont vérifiées | * |
| Une page d'erreur 404 est présente | ** |

## Sécurité

| Critère | Priorité |
| ------------- | ------------- |
| Toutes les entrées utilisateur (formulaires, paramètres GET, etc) sont filtrées et validées côté serveur | *** |
| Les en-têtes HTTP relatives à la sécurité (CSP, CSRF, X-XSS, etc) sont configurées | ** |
| Le protocole HTTPS est utilisé avec un certificat valide | *** |
| Les permissions des fichiers en production sont correctes | ** |
