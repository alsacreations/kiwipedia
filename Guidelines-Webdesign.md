# Guidelines : Webdesign

Statut : Working Draft (WD)

Bonnes pratiques de design web appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/), évoluant dans le temps et adaptées à chaque nouveau projet.

## Définitions, outils, projets

Sont indiquées **en gras** les étapes prioritaires dans notre processus qui comprend une réalisation avec Figma, permettant la consultation et les commentaires par tous, puis l'inspection en phase d'intégration.

| Étape                   | Nom                    | Définition                                                                                                                           | Outil préconisé                                         |
| ----------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Prospection / Démarrage | **Arborescence**       | Arborescence visuelle, voire zoning, qui permet d’identifier les différents modèles de pages                                         | [Octopus](https://octopus.do/), [miro](https://miro.com/) |
| Design                  | Moodboard              | Planche de tendances. Type de collage qui peut être composé d'images, de texte et d'objets selon le choix de son créateur            | [Figma](https://figma.com/) ou [Whimsical](https://whimsical.com/)                     |
| Design UX               | **Wireframes**         | Zonings fil-de-fer avec texte / composants intégrés (ex. zone emploi avec 3 icônes et 2 zones de texte), Aucun design associé        | [Figma](https://figma.com/)                             |
| Design UX               | Prototypage, wireframes interactifs | Wireframes avec navigation, actions et animations possibles                                                                          | [Figma](https://figma.com/), [Flow](https://createwithflow.com/) |
| Design UI               | **Maquettes**          | Design définitif et complet, d'après les wireframes, livrable pour intégration.                                                      | [Figma](https://figma.com/)                             |
| Design / Intégration    | **UI Kit**             | Couleurs utilisées, polices, visuel des composants principaux, images et icônes utilisées. Étape préparatrice à l’intégration        | [Figma](https://figma.com/)                             |
| Intégration             | Styleguide             | Liste des composants, avec code HTML / CSS / JS associés. Assure la consistance et la maintenance de l’intégration au cours du temps | [Storybook](https://storybook.js.org/)                  |
| Toutes                  | Design System          | Ensemble des étapes précédentes + Guidelines (documentation et bonnes pratiques)                                                     |                                                         |

## Contenus à prévoir

### Arborescence

Les pages à ne pas oublier de faire apparaître dans l'arborescence sont :

- Pages principales et internes. Exemples :
  - Accueil (home)
  - À propos
  - Contact
  - Page de catégorie produit / service / article
  - Page de présentation produit / service / article
  - Landing pages pour télécharger un document, s’inscrire à un événement,…
  - Page de remerciements suite à un téléchargement ou une inscription
  - Page de résultats de recherche
  - Page de confirmation (ex : envoi d’un e-mail automatique après une inscription à la newsletter ou à un événement, ou suite à un téléchargement)
- Pages annexes
  - Mentions légales
  - Politique de confidentialité (pour satisfaire au [RGPD](https://www.cnil.fr/fr/reglement-europeen-protection-donnees))
  - Politique d'écoconception (pour satisfaire au [RGESN](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/))
  - Conditions générales d’utilisation / de vente (si concerné)
  - Déclaration d'accessibilité (si concerné)
- Page d'erreur 404 (voire d'erreur 500)

### Wireframe

Un Wireframe consiste en des tracés de type “fil-de-fer” avec textes et composants intégrés (par exemple une “zone emploi” avec 3 icônes et 2 emplacements de texte).

Aucun design ni aucune couleur ne sont associés au Wireframe qui doit demeurer neutre pour se concentrer exclusivement sur les aspects fonctionnels et ergonomiques.

Les pages concernées par les wireframes dépendent du projet, mais "un nombre représentatif" sera conçu (à minima la page d'accueil, une page de contenu et la page de contact).

Idéalement, il faut utiliser un "vrai contenu" (textes, images, navigation) et s’il n’y en a pas, nous utilisons un texte de remplacement (ex. Schnapsum, Lorem Ipsum).

Les éléments à ne pas oublier de faire apparaître dans les wireframes/maquettes sont :

- Le•s logo•s
- Navigation principale + secondaire (menu desktop, menu mobile)
- Fil d’ariane
- Modales (pop-in)
- Header et Footer
  - Navigation desktop et mobile
  - Barre de recherche
  - Informations de contact (formulaire, adresse, téléphone)
  - Liens vers
    - Plan du site
    - Mentions légales
    - Politique de confidentialité
    - Politique d'écoconception
    - Conditions générales (si concerné)
    - Déclaration d'accessibilité (si concerné)
  - Mention “alsacréations” (si concerné)
  - Réseaux sociaux
  - Choix de la langue (en toutes lettres, pas de drapeaux)
  - Options d’accessibilité (couleurs, taille de texte)
- Un CTA par page et/ou liens internes
- Mentions et coche sous les formulaires
  - RGPD + lien vers la Politique de confidentialité (obligatoire sous tous les formulaires sans exception)
  - Si les informations saisies dans un formulaire peuvent être utilisées pour autre chose que l’objet principal de ce formulaire, il faut des opt-in par utilisation supplémentaire. Exemples :
    - J'accepte de recevoir des offres commerciales
    - J'accepte d’être informé•e des bons plans des partenaires de _NOM DU CLIENT_
    - J'accepte de recevoir la newsletter mensuelle
    - J'accepte les conditions générales d’utilisation (+ lien)

### Prototypage

Il peut être réalisé au stade des Wireframes ou des Maquettes, et permet de :

- comprendre le parcours de l'internaute et tout le flux des liens pour savoir quel est le contenu ciblé.
- visualiser les différents états (au survol d’un bouton par exemple), et les différentes animations.

### Maquette

La Maquette est l’évolution logique du Wireframe en y ajoutant la couche graphique et design. Les maquettes constituent le livrable définitif pour intégration.

La maquette doit comporter l’ensemble des éléments du wireframe (si l’élément est concerné) ainsi que :

- La page 404
- Le bandeau Cookies (si concerné)
- Les [liens d’évitement](Guidelines-Accessibilite.md#liens-dévitement-skip-link)

### Mobile first

La conception de nos maquettes est réalisée dans un esprit "Mobile First" (meilleures performances générales) c'est à dire que la priorité est donnée aux vues "Mobiles", puis déclinées en vues "Desktop", avec "adaptation au mieux" pour devices intermédiaires.

Les maquettes conçues respectent les Points de Rupture (Breakpoints) recommandés dans nos [Guidelines CSS](Guidelines-CSS.md).

Comme pour la phase de Wireframe, les pages concernées par les maquettes Mobiles ou Desktop dépendent du projet, mais "un nombre représentatif" sera proposé (à minima la page d'accueil, une page de contenu et la page de contact).

### UI Kit

L’UI-Kit est un document servant de passerelle entre le designer et l’intégrateur/trice. Il s’agit d’une “planche anatomique” où sont détaillés les éléments indispensables pour l’intégration : les valeurs de couleurs, les polices, les visuels des composants principaux, images et icônes y sont représentés.

#### Valeurs

Attention : ne pas se fier au rendu des couleurs avec les pipettes des navigateurs.

- Couleurs utilisées (textes, background, décorations), ainsi que couleurs d'interaction
  - _hover_ (survol)
  - _focus_ (pour les éléments pouvant recevoir le focus, liens, boutons, input)
  - _active_ (pour les liens)
  - _visited_ (pour les liens)
- Familles de police (ainsi que variantes gras, semi-gras, italique, …) + lien de téléchargement
- Tailles de polices et hauteurs de lignes utilisées
- Valeurs des espacements utilisés (_padding_, _margin_)
- Valeurs des coins arrondis (_border-radius_)

#### Éléments

- Les éléments HTML “classiques” (titres, paragraphes, listes, liens, [liens externes](Guidelines-Accessibilite.md#ouverture-dans-une-nouvelle-fenêtre), boutons, formulaires, tableaux)
- Composants présents dans la maquette (boîtes/blocs, alertes, pagination, navigation, navigation mobile déployée, …)
- Une barre de séparation horizontale `<hr>` (si présente)

#### Composants de formulaires

- Les états d’avertissement/[erreur](https://medium.com/nextux/forms-need-validation-2ecbccbacea1)/info sur certains éléments (si présents)
- Les champs obligatoires des formulaires
- Les champs désactivés (_disabled_) des formulaires
- Les messages d’erreur de validation des formulaires
- Les [boutons primaires et secondaires](https://uxplanet.org/primary-secondary-action-buttons-c16df9b36150) (un exemple de bouton qui n'est pas un _submit_, par exemple un "annuler")
- Les cases à cocher button/checkbox (avec leurs différents états)

#### Interactions utilisateur/trice

- Les exemples de transitions ou animations (faire des liens vers des démos)
- Les Liens d’évitement masqués au départ et déclenchés avec la touche Tab (cf. nos [Guidelines HTML](Guidelines-HTML.md))

#### Divers

- Une référence (lien) vers l’endroit où sont stockés tous les assets (images/icônes, favicon, polices, etc.). Le format SVG est privilégié pour les icônes, sauf cas exceptionnel
- Liens vers les banques d’images utilisées

## Points de vigilance

### Grille

Une grille de mise en forme est une aide précieuse pour le/la Designer (respect des alignements et des proportions). Le/la designer choisit son format de grille colonnes/tailles, l’applique uniformément à l’ensemble des maquettes et en informe l’intégrateur/trice.

L’intégrateur/trice va raisonner en “composants” plutôt qu’en mise en page globale et s’adapte à la grille proposée par le/la Designer.

### Polices de caractère

Pour des raisons de performance, il est conseillé :

- Titrages : se limiter à deux familles de police au maximum (ex. Merryweather et Roboto).
- Titrages : se limiter à 3-4 variantes de police au maximum (ex. Merryweather bold, Roboto regular, Roboto bold, Roboto italic).
- Labeur : privilégier la [stack system](https://systemfontstack.com/) par défaut.

Si le nombre de variantes pour une police est supérieur à 3 alors une “Variable Font” devient plus intéressante en termes de poids/requêtes car un seul fichier pour toute la famille de police.

### Multilangue

Certains mots peuvent être plus longs dans d'autres langues, il faut les simuler, notamment dans la navigation, les boutons d'action, et dans les titres pour provoquer des retours à la ligne. [Smartcat](https://www.smartcat.com/figma/) permet de la traduction dans Figma.

Le choix de langue se fait à l'aide du mot désignant la langue et non pas d'un drapeau (qui désigne un pays) <https://www.flagsarenotlanguages.com/>.

### Favicon

L'icône à fournir à l’intégrateur/trice est au format SVG et PNG à la taille 1024x1024px, si possible.

L’intégration du favicon est à la charge de l’intégrateur/trice et est décrite dans nos [Guidelines HTML](Guidelines-HTML.md).

### Images et retina

Afin d’optimiser la netteté des images Bitmap sur écrans Retina et Haute Définition (_hdpi_), lors de la livraison de la maquette, chaque image bitmap (photo, arrière-plan) est fournie en SD (x1) et HD (x2).

- La compression et l’optimisation des SVG/fonts est à la charge de l’intégrateur/trice
- La compression et l’optimisation des Bitmap (Jpeg, png, webp, avif) est à la charge du/de la webdesigneur/euse, voir [Guidelines Performance](Guidelines-Performances.md)

Les formats privilégiés à transmettre à l'intégrateur/trice :

- JPG, WebP, AVIF : photos et images bitmap en général.
- PNG, WebP : images bitmap sans compression destructrice, pouvant nécessiter de la transparence.
- SVG : icônes, schémas et images vectorielles.

### Checklist accessibilité

#### Généralités

- Tailles des zones de touch en mobile + espacements suffisants entre les zones.
- Présence d’un menu de liens rapides.
- Indication visuelle de la page active.
- Les liens et zones cliquables sont visuellement identifiés (ex. soulignement d'un lien).
- Les éléments interactifs doivent toujours être perceptibles (ex. navigation clavier ou pointeur).

#### Couleurs

- Respecter le [contraste de couleur](Guidelines-Accessibilite.md#contraste--webdesign) + gammes de couleurs
- Ne pas indiquer une information uniquement par la couleur.

#### Contenus

- Respecter une taille minimum de police pour la lisibilité.
- Privilégier la clarté du/des textes/du langage.
- Pas de texte justifié, et bon espacement des lignes.
- Pas de textes trop longs (utiliser les titres, segmenter, aérer, intégrer des images…)
- Conserver les accents sur les majuscules.
- Expliciter les abréviations.
- Déclarer les citations.
- Mettre en contexte les _Call To Action_.
- Utiliser des boutons et liens explicites (pas de _cliquez ici_).
- Indiquer [l’ouverture d’un lien dans une nouvelle fenêtre](Guidelines-Accessibilite.md#ouverture-dans-une-nouvelle-fenêtre)
- Limiter les informations à télécharger et préférer l’incorporation directement dans la page
- Proposer différents moyens de contact (téléphone, e-mail).

#### Formulaires

- Indiquer clairement quels libellés correspondent à quels champs de formulaires.
- Les libellés et les champs doivent être accolés.
- Boutons radios/checkboxes : le champ de sélection doit être large et pas seulement sur la _box_.
- Indication des champs obligatoires.
- Indication des formats de saisie (numérique, …).
- Validation et affichage des erreurs en temps réel des formulaires (sans actualisation).
- Indiquer le format et la taille des fichiers en téléchargement.

#### Médias

- Icônes et/ou images accompagnées d’un texte/intitulé si nécessaire.

## Autres ressources et bonnes pratiques

- [Visual design rules you can safely follow every time](https://anthonyhobday.com/sideprojects/saferules/)
- [Building Better UI Designs With Layout Grids](https://www.smashingmagazine.com/2017/12/building-better-ui-designs-layout-grids/)
