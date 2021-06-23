# Guidelines : Webdesign

_Statut : Working Draft (WD)_

Cette présente convention rassemble les bonnes pratiques WordPress en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Définitions, outils, projets

Sont indiquées **en gras** les étapes prioritaires dans notre process.

| Étape                   | Nom                    | Définition                                                                                                                           | Outil préconisé                                         |
| ----------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Prospection / Démarrage | **Arborescence**       | Arborescence visuelle qui permet d’identifier les différents modèles de pages                                                        | [Flowmapp](https://www.flowmapp.com/)                   |
| Prospection / Démarrage | Maquette d’intention   | Maquette de la Home réalisée pour convaincre un client de nos compétences                                                            | Sketch                                                  |
| Design                  | Moodboard              | Planche de tendances. Type de collage qui peut être composé d'images, de texte et d'objets selon le choix de son créateur            | [Whimsical](https://whimsical.com/)                     |
| Design                  | Zonings                | Zones fonctionnelles, emplacements du contenu (zone emploi, zone blog)                                                               | Sketch                                                  |
| Design                  | **Wireframes**         | Zonings fil-de-fer avec texte / composants intégrés (ex. zone emploi avec 3 icônes et 2 zones de texte). Aucun design associé.       | Sketch                                                  |
| Design                  | Wireframes interactifs | Wireframes avec navigation, actions et animations possibles                                                                          | Sketch, [Create with Flow](https://createwithflow.com/) |
| Design                  | **Maquettes**          | Wireframe avec couche graphique. Design définitif livrable pour intégration. **Interactives** avec Sketch, Create with Flow.         | Sketch                                                  |
| Design / Intégration    | **UI Kit**             | Couleurs utilisées, polices, visuel des composants principaux, images et icônes utilisées. Étape préparatrice à l’intégration        | Sketch                                                  |
| Intégration             | Styleguide             | Liste des composants, avec code HTML / CSS / JS associés. Assure la consistance et la maintenance de l’intégration au cours du temps | [Storybook](https://storybook.js.org/)                  |
| Toutes                  | Design System          | Ensemble des étapes précédentes + Guidelines (documentation et bonnes pratiques)                                                     |                                                         |

## Workflow

Les étapes menant de la réalisation des maquettes à l’intégration web sont réalisées sous cette forme et à l’aide des outils suivants :

| Étape                | Objectif                       | Description                                                                                                                   | Outil    |
| -------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | -------- |
| Design               | **Réalisation des maquettes**  | Wireframe avec couche graphique. Design définitif livrable pour intégration. Interactives avec Sketch, Create with Flow.      | Sketch   |
| Design / Intégration | **Consultation des maquettes** | mode inspection pour les développeurs, mode commentaires pour l’équipe Alsacréations et le client                             | InVision |
| Design               | **Réalisation de l’UI Kit**    | Couleurs utilisées, polices, visuel des composants principaux, images et icônes utilisées. Étape préparatrice à l’intégration | Sketch   |
| Design / Intégration | **Consultation de l’UI Kit**   | mode commentaires pour l’équipe Alsacréations et le client                                                                    | InVision |

## Contenus à vérifier

Au sein de notre processus interne, les contenus indispensables à produire lors de chaque étape sont consignés ci-dessous.

### Arborescence

Les pages à ne pas oublier de faire apparaître dans l'arborescence sont :

- Pages principales. Exemples :
  - Accueil (home)
  - À propos
  - Contact
  - Page de catégorie produit / service / article
  - Page de présentation produit / service / article
- Pages internes. Exemples :
  - Landing pages pour télécharger un document, s’inscrire à un événement,…
  - Page de remerciements suite à un téléchargement ou une inscription
  - Page de résultats de recherche
- Pages annexes
- mentions légales
- politique de confidentialité
- conditions générales d’utilisation / de vente
- 404
- Les éléments dépendants. Exemple :
  - envoi d’un mail automatique après une inscription à la newsletter ou à un événement, ou suite à un téléchargement

### Wireframe

Un Wireframe consiste en des tracés de type “fil-de-fer” avec textes et composants intégrés (par exemple une “zone emploi” avec 3 icônes et 2 emplacements de texte). Aucun design ni aucune couleur ne sont associés au Wireframe qui doit demeurer neutre pour se concentrer exclusivement sur les aspects fonctionnels et ergonomiques du site web.

Les éléments à ne pas oublier de faire apparaître dans les wireframes/maquettes sont :

- Le•s logo•s
- Navigation principale + secondaire (menu desktop, menu mobile)
- Fil d’ariane
- Modale (pop-in)
- On reprend les textes et contenus du client (noms, fil d’ariane, navigation), s’il n’y en a pas, on utilise un texte de remplacement (ex. Schnapsum)
- Header et Footer
  - Navigation
  - Barre de recherche
  - Informations de contact (formulaire, adresse, téléphone)
  - Plan du site
  - Mentions légales
  - Politique de confidentialité
  - Conditions générales (si concerné)
  - Mention “alsacréations”
  - Réseaux sociaux
  - Choix de la langue (en toutes lettres, pas de drapeaux)
  - Options d’accessibilité (couleurs, taille de texte)
  - Liens d’évitement
- Un CTA par page et/ou liens internes
- Mentions et coche sous les formulaires :
  - RGPD + lien vers la Politique de confidentialité : toujours, obligatoire sous tous les formulaires sans exception.
  - Si les informations saisies dans un formulaire peuvent être utilisées pour autre chose que l’objet principal de ce formulaire, il faut des opt-in par utilisation supplémentaire. Exemples :
    - J'accepte de recevoir des offres commerciales
    - J'accepte d’être informé•e des bons plans des partenaires de NOM DU CLIENT
    - J'accepte de recevoir la newsletter mensuelle
    - J'accepte les conditions générales d’utilisation (+URL)
