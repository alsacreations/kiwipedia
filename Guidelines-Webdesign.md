# Guidelines : Webdesign

Statut : Working Draft (WD)

Cette présente convention rassemble les bonnes pratiques WordPress en production appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/). Elle a pour but d'évoluer dans le temps et de s'adapter à chaque nouveau projet.

## Définitions, outils, projets

Sont indiquées **en gras** les étapes prioritaires dans notre processus.

| Étape                   | Nom                    | Définition                                                                                                                           | Outil préconisé                                         |
| ----------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Prospection / Démarrage | **Arborescence**       | Arborescence visuelle qui permet d’identifier les différents modèles de pages                                                        | [Octopus](https://octopus.do/)                          |
| Prospection / Démarrage | Maquette d’intention   | Maquette de la Home réalisée pour convaincre un client de nos compétences                                                            | [Figma](https://figma.com/)                             |
| Design                  | Moodboard              | Planche de tendances. Type de collage qui peut être composé d'images, de texte et d'objets selon le choix de son créateur            | [Whimsical](https://whimsical.com/)                     |
| Design                  | Zonings                | Zones fonctionnelles, emplacements du contenu (zone emploi, zone blog)                                                               | [Figma](https://figma.com/) voire Octopus               |
| Design                  | **Wireframes**         | Zonings fil-de-fer avec texte / composants intégrés (ex. zone emploi avec 3 icônes et 2 zones de texte). Aucun design associé.       | [Figma](https://figma.com/)                             |
| Design                  | Wireframes interactifs | Wireframes avec navigation, actions et animations possibles                                                                          | [Figma](https://figma.com/), [Flow](https://createwithflow.com/) |
| Design                  | **Maquettes**          | Couche graphique appliquée aux wireframes. Design définitif livrable pour intégration.                                               | [Figma](https://figma.com/)                             |
| Design / Intégration    | **UI Kit**             | Couleurs utilisées, polices, visuel des composants principaux, images et icônes utilisées. Étape préparatrice à l’intégration        | [Figma](https://figma.com/)                             |
| Intégration             | Styleguide             | Liste des composants, avec code HTML / CSS / JS associés. Assure la consistance et la maintenance de l’intégration au cours du temps | [Storybook](https://storybook.js.org/)                  |
| Toutes                  | Design System          | Ensemble des étapes précédentes + Guidelines (documentation et bonnes pratiques)                                                     |                                                         |

## Workflow

Les étapes menant de la réalisation des maquettes à l’intégration web sont réalisées sous cette forme et à l’aide des outils suivants :

- Réalisation avec Figma.
- Consultation par tous et commentaires à l'aide du partage de Figma (ou option inVision).
- Inspection pour phase d'intégration à l'aide de Figma.

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

Un Wireframe consiste en des tracés de type “fil-de-fer” avec textes et composants intégrés (par exemple une “zone emploi” avec 3 icônes et 2 emplacements de texte).

Aucun design ni aucune couleur ne sont associés au Wireframe qui doit demeurer neutre pour se concentrer exclusivement sur les aspects fonctionnels et ergonomiques du site web.

Les pages concernées par les wireframes dépendent du projet, mais "un nombre représentatif" sera conçu (à minima la page d'accueil, une page de contenu et la page de contact).

Les éléments à ne pas oublier de faire apparaître dans les wireframes/maquettes sont :

- Le•s logo•s
- Navigation principale + secondaire (menu desktop, menu mobile)
- Fil d’ariane
- Modale (pop-in)
- Nous reprenons les textes et contenus (noms, fil d’ariane, navigation), s’il n’y en a pas, nous utilisons un texte de remplacement (ex. Schnapsum, Lorem Ipsum) mais idéalement il faut un vrai contenu
- Header et Footer
  - Navigation desktop et mobile
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

### Maquette

La Maquette est l’évolution logique du Wireframe en y ajoutant la couche graphique et design. Les maquettes constituent le livrable définitif pour intégration.

La maquette doit comporter l’ensemble des éléments du wireframe (si l’élément est concerné) ainsi que :

- La page 404
- Le bandeau Cookies

### Mobile first

La conception de nos maquettes est réalisée dans un esprit "Mobile First" (meilleures performances générales) c'est à dire que la priorité est donnée aux vues "Mobiles", puis déclinées en vues "Desktop", avec "adaptation au mieux" pour devices intermédiaires.

Les maquettes conçues respectent les Points de Rupture (Breakpoints) recommandés dans nos [Guidelines CSS](Guidelines-CSS.md).

Comme pour la phase de Wireframe, les pages concernées par les maquettes Mobiles ou Desktop dépendent du projet, mais "un nombre représentatif" sera proposé (à minima la page d'accueil, une page de contenu et la page de contact).

### UI Kit

L’UI-Kit est un document servant de passerelle entre le designer et l’intégrateur. Il s’agit d’une “planche anatomique” où sont détaillés les éléments indispensables pour l’intégration : les valeurs de couleurs, les polices, les visuels des composants principaux, images et icônes y sont représentés.

#### Valeurs

Attention : ne pas se fier au rendu des couleurs avec les pipettes des navigateurs ou d’InVision.

- Couleurs utilisées (textes, background, décorations), ainsi que couleurs
  - survol / hover
  - focus (pour les éléments pouvant recevoir le focus, liens, boutons, input)
  - active (pour les liens)
  - visited (pour les liens)
- Familles de police (ainsi que variantes gras, semi-gras, italique, …) + lien de téléchargement
- Tailles de polices et hauteurs de lignes utilisées
- Valeurs des espacements utilisés (padding, margin)
- Valeurs des coins arrondis

#### Éléments

- Les éléments HTML “classiques” (titres, paragraphes, listes, boutons, formulaires, tableaux)
- Composants présents dans la maquette (boîtes, alertes, pagination, navigation, …)
- Une barre de séparation horizontale : `<hr>` (si présente)

#### Formulaires

- Les états d’avertissement/[erreur](https://medium.com/nextux/forms-need-validation-2ecbccbacea1)/info sur certains éléments (si présents)
- Les champs obligatoires des formulaires
- Les champs disabled des formulaires
- Les messages d’erreur des formulaires
- Les [boutons primaires et secondaires](https://uxplanet.org/primary-secondary-action-buttons-c16df9b36150) (un exemple de bouton qui n'est pas un submit, par exemple un "annuler")
- Les cases à cocher button/checkbox (avec leurs différents états)

#### Interactions utilisateur

- Les états de survol / focus (liens, formulaires, boutons, etc.)
- Les exemples de transitions ou animations (faire des liens vers des démos)
- Les Liens d’évitement masqués au départ et déclenchés avec la touche Tab (cf. nos [Guidelines HTML](https://www.alsacreations.com/outils/guidelines/Guidelines-HTML.md))

#### Divers

- Une référence (lien) vers l’endroit où sont stockés tous les assets (images, icônes, favicon, bouton burger, polices, etc.). Le format SVG est privilégié pour les icônes, sauf cas exceptionnel
- Liens vers les banques d’images utilisées
- La compression et l’optimisation des SVG/fonts est à la charge de l’intégrateur
- La compression et l’optimisation des Bitmap (Jpeg, png, webp, avif) est à la charge du/de la webdesigneur/euse
- Option : un style de lien externe, par exemple avec une icône “↗” (accessibilité)

## Validation des livrables

- L’ensemble des livrables présentés dans InVision sont validés directement sur cette plateforme.
- Les autres livrables sont validés par mail.

## Points de vigilance

### Grille

Une grille de mise en forme est une aide précieuse pour le Designer (respect des alignements et des proportions). Le designer choisit son format de grille colonnes/tailles, l’applique uniformément à l’ensemble des maquettes et en informe l’Intégrateur.

L’Intégrateur, lui, va raisonner en “composants” plutôt qu’en mise en page globale et s’adapte à la grille proposée par le Designer.

### Polices de caractère

Pour des raisons de performance, il est conseillé :

- Titrages : se limiter à deux Familles de police au maximum (ex. Merryweather et Roboto)
- Titrages : se limiter à 3-4 Variantes de police au maximum (ex. Merryweather bold, Roboto regular, Roboto bold, Roboto italic)
- Labeur : “system font” par défaut de préférence (ex. system-ui)

Si le nombre de variantes pour une police est supérieur à 3 alors une “Variable Font” devient plus intéressante en termes de poids/requêtes car 1 seul fichier pour toute la famille de police.

### Favicon

L'icône à fournir à l’intégrateur est au format SVG et PNG à la taille 1024x1024px, si possible.

L’intégration du favicon est à la charge de l’Intégrateur et est décrite dans nos Guidelines HTML.

### Retina

Afin d’optimiser la netteté des images Bitmap (jpg, png) sur écrans Retina et Haute Définition, lors de la livraison de la maquette, chaque image bitmap (photo, arrière-plan) est fournie en SD (x1) et HD (x2).

Les formats privilégiés à transmettre à l’Intégrateur :

- JPG : photos et images bitmap en général
- PNG : images bitmap nécessitant de la transparence
- SVG : iconographie et formats vectoriels

L’intégrateur aura à sa charge l’optimisation du poids des assets (notamment le choix du format et de la compression des images).

### Accessibilité et taux de contraste

cf. [guidelines Accessibilité Numérique](https://github.com/alsacreations/guidelines/blob/master/Guidelines-Accessibilite.md#checklist-accessibilit%C3%A9-webdesign)
