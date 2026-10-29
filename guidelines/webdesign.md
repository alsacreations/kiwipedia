# Webdesign

> Statut : stable · Niveau : tous

Processus et exigences **spécifiques à Alsacréations** pour la conception graphique (arborescence → wireframes → maquettes → UI Kit) et la passation à l'intégration. Les principes généraux d'UX/UI (hiérarchie visuelle, alignements, cohérence, parcours e-commerce standards…) ne sont **pas** repris ici&#8239;: ils sont déjà appliqués par défaut. Ce document sert à produire ou vérifier des livrables de design, et à savoir ce que l'intégration peut attendre de la maquette.

---

## Processus et outils

Les étapes **en gras** sont systématiques. Tout le design se fait dans **Figma** (consultation et commentaires par tous, inspection en phase d'intégration).

| Étape | Livrable | Contenu | Outil |
| --- | --- | --- | --- |
| Démarrage | **Arborescence** | Arborescence visuelle, voire zoning, qui identifie les modèles de pages | [Octopus](https://octopus.do/), [Miro](https://miro.com/) |
| Design | Moodboard | Planche de tendances | Figma, [Whimsical](https://whimsical.com/) |
| UX | **Wireframes** | Zonings fil de fer avec textes et composants, sans design | Figma |
| UX | Prototype | Wireframes ou maquettes avec navigation, états et animations | Figma, [Flow](https://createwithflow.com/) |
| UI | **Maquettes** | Design définitif, livrable pour l'intégration | Figma |
| Design → intégration | **UI Kit** | Valeurs, composants, assets (voir [UI Kit](#ui-kit)) | Figma |
| Intégration | Styleguide | Composants avec leur code HTML/CSS/JS | [Storybook](https://storybook.js.org/) |
| Toutes | Design system | Ensemble des livrables + documentation | — |

## Pages à prévoir dans l'arborescence

- Accueil, À propos, Contact, catégories et fiches (produit/service/article), landing pages, page de remerciement (après téléchargement ou inscription), page de confirmation (e-mail automatique), résultats de recherche.
- Pages légales&#8239;: **mentions légales**, **politique de confidentialité** (RGPD), **politique d'écoconception** (RGESN), CGU/CGV si concernées, **déclaration d'accessibilité** si concernée.
- Page **404** (voire 500).
- **E-commerce**, en plus du parcours standard (catégorie avec filtres/tri/pagination, fiche produit, panier, tunnel de commande en 4 étapes avec option «&#8239;invité&#8239;», confirmation, compte, suivi, retours)&#8239;: bouton «&#8239;Ajouter au panier&#8239;» visible sans défilement sur la fiche produit, et **maquettes des e-mails transactionnels** (confirmation de commande, expédition, livraison, relance de panier abandonné).

## Wireframes

- Neutres&#8239;: aucune couleur, aucun design — uniquement le fonctionnel et l'ergonomie.
- Un nombre représentatif de pages, **au minimum&#8239;: accueil, une page de contenu, contact**.
- Vrai contenu de préférence, sinon texte de remplacement ([Schnapsum](https://schnaps.it/) ou Lorem Ipsum).

Éléments obligatoires dans les wireframes **et** les maquettes&#8239;:

- logo(s)&#8239;; navigation principale et secondaire, en version desktop **et** mobile&#8239;; fil d'Ariane&#8239;; modales&#8239;;
- en-tête et pied de page avec&#8239;: recherche, coordonnées (formulaire, adresse, téléphone), réseaux sociaux, liens vers le plan du site et les pages légales, mention «&#8239;Alsacréations&#8239;» si prévue&#8239;;
- **choix de la langue en toutes lettres, jamais de drapeaux** ([pourquoi](https://www.flagsarenotlanguages.com/))&#8239;;
- options d'accessibilité (couleurs, taille de texte) si prévues&#8239;;
- un appel à l'action par page et/ou des liens internes&#8239;;
- sous **chaque** formulaire, sans exception&#8239;: mention RGPD avec lien vers la politique de confidentialité, et **une case opt-in distincte par usage secondaire** des données (newsletter, offres commerciales, offres partenaires, acceptation des CGU…). Voir [RGPD](rgpd.md).

## Maquettes

- En plus des éléments des wireframes&#8239;: page **404**, bandeau cookies (si concerné), **liens d'évitement** (masqués, visibles au focus clavier — voir [Accessibilité](accessibility.md#liens-dévitement)).
- **Mobile first**&#8239;: vues mobiles d'abord, puis desktop, avec adaptation au mieux pour les tailles intermédiaires. Points de rupture&#8239;: ceux de [CSS — Breakpoints nommés imposés](css.md#breakpoints-nommés-imposés).
- Même minimum que pour les wireframes&#8239;: accueil, une page de contenu, contact.
- Grille&#8239;: choisie par le ou la designer, appliquée uniformément à toutes les maquettes et communiquée à l'intégration (qui raisonne ensuite en composants).
- Multilingue&#8239;: simuler les mots plus longs des autres langues dans la navigation, les boutons et les titres pour tester les retours à la ligne (traduction dans Figma possible avec [Smartcat](https://www.smartcat.com/figma/)).

## UI Kit

Passerelle entre design et intégration. Il doit contenir&#8239;:

- **Valeurs** (relevées dans Figma, jamais à la pipette du navigateur)&#8239;: couleurs de texte, fond et décoration, avec les états `hover`, `focus`, `active` et `visited`&#8239;; familles et variantes de polices avec lien de téléchargement&#8239;; tailles de police et hauteurs de ligne&#8239;; espacements&#8239;; rayons de bordure.
- **Éléments HTML**&#8239;: titres, paragraphes, listes, liens, liens externes, boutons, tableaux, `<hr>` si présent.
- **Composants** de la maquette&#8239;: blocs, alertes, pagination, navigation (dont la navigation mobile dépliée)…
- **Formulaires**&#8239;: champs obligatoires, désactivés, états d'avertissement/erreur/info, messages d'erreur de validation, boutons primaire et secondaire (dont un bouton qui n'est pas un _submit_, ex. «&#8239;Annuler&#8239;»), cases à cocher et boutons radio dans tous leurs états.
- **Interactions**&#8239;: transitions et animations (liens vers des démos), liens d'évitement.
- **Assets**&#8239;: lien vers l'emplacement des images, icônes, favicon et polices&#8239;; liens vers les banques d'images utilisées. Icônes en SVG sauf exception.

## Polices

- Titrages&#8239;: **2 familles maximum** et **3 à 4 variantes maximum** au total (ex. Merriweather bold, Roboto regular, bold, italic). Au-delà de 3 variantes d'une même famille, préférer une **police variable** (un seul fichier).
- Texte courant&#8239;: [pile de polices système](https://systemfontstack.com/) par défaut.

## Images et favicon

- Chaque image bitmap (photo, arrière-plan) est livrée en **x1 et x2** (écrans haute densité).
- Formats à transmettre&#8239;: JPG, WebP ou AVIF pour les photos&#8239;; PNG ou WebP pour les images sans perte ou avec transparence&#8239;; SVG pour les icônes, schémas et illustrations vectorielles. Formats finaux à produire&#8239;: voir [HTML — Images](html.md).
- Répartition des optimisations&#8239;: **bitmap compressés par le ou la webdesigner**&#8239;; SVG et polices optimisés par l'intégration.
- Favicon&#8239;: fourni en **SVG et PNG 1024×1024 px** (si possible)&#8239;; son intégration est à la charge de l'intégration.

## Checklist accessibilité

Exigences d'accessibilité à respecter dès la conception (le reste relève de l'intégration, voir [Accessibilité](accessibility.md))&#8239;:

- **Contrastes**&#8239;: 4,5:1 pour le texte courant, 3:1 pour le grand texte et les composants d'interface&#8239;; vérifier les gammes de couleurs complètes. Aucune information portée par la seule couleur.
- **Interactions**&#8239;: zones tactiles assez grandes et assez espacées sur mobile&#8239;; liens et zones cliquables identifiables visuellement (ex. soulignement)&#8239;; focus toujours visible&#8239;; page active signalée&#8239;; liens d'évitement prévus.
- **Textes**&#8239;: taille minimale lisible, interlignage confortable, pas de texte justifié, textes segmentés (titres, paragraphes courts), **accents conservés sur les majuscules**, abréviations explicitées, citations identifiées, liens et boutons explicites (jamais «&#8239;cliquez ici&#8239;»), ouverture en nouvelle fenêtre signalée, appels à l'action mis en contexte.
- **Contenus**&#8239;: privilégier le contenu dans la page plutôt qu'en téléchargement&#8239;; format et poids indiqués pour les fichiers à télécharger&#8239;; plusieurs moyens de contact (téléphone, e-mail).
- **Formulaires**&#8239;: libellés accolés à leur champ, zone cliquable des cases à cocher et boutons radio étendue au libellé, champs obligatoires et formats de saisie indiqués, erreurs affichées en temps réel sans rechargement.
- **Médias**&#8239;: icônes et images accompagnées d'un intitulé si nécessaire.
- **Préférences utilisateur** à prévoir dans le design&#8239;: thème sombre (`prefers-color-scheme`), mouvement réduit (`prefers-reduced-motion`), contraste élevé (`prefers-contrast`, `forced-colors`).

---

## Voir aussi

- [Accessibilité](accessibility.md) — Exigences d'intégration.
- [CSS](css.md) — Points de rupture, design tokens.
- [Écoconception](ecoconception.md) — Choix de design responsables.
- [Icônes](icons.md) — Production et optimisation des pictogrammes.
- [RGPD](rgpd.md) — Consentement et mentions sous les formulaires.
