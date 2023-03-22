# RGPD

Statut : Working Draft (WD)

Guidelines pour respecter au mieux [Le règlement général sur la protection des données (CNIL)](https://www.cnil.fr/fr/reglement-europeen-protection-donnees) ou RGPD.

## Ressources

* [Le RGPD, ce qu’il faut absolument savoir](https://www.alsacreations.com/actu/lire/1826-Le-RGPD-ce-quil-faut-absolument-savoir.html)
* [CNIL : RGPD : de quoi parle-t-on ?](https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on)
* [Wikipédia : Règlement général sur la protection des données](https://fr.wikipedia.org/wiki/R%C3%A8glement_g%C3%A9n%C3%A9ral_sur_la_protection_des_donn%C3%A9es)
* [2gdpr.com : Check cookies and data transfer for GDPR compliance](https://2gdpr.com/)

## Droits ⚖️

L'internaute doit pouvoir contacter le responsable des données pour...

* Droit à l'**information** : avoir accès à toutes les informations concernant le traitement de ses données.
* Droit d'**accès et de rectification** : avoir accès à ses données et/ou les modifier.
* Droit d'**opposition** : s’opposer au traitement de ses données personnelles.
* Droit à l'**oubli** : demander la suppression de ses données.

## Information et Pages légales

Il faut une page de _Mentions Légales_ et une page _Politique de confidentialité_ (ou _Données personnelles_) précisant :

* Les droits.
* Le moyen de contact pour exercer ces droits.
* La finalité du traitement (par exemple, « les données recueillies par ce formulaire permettent exclusivement de vous .inscrire à notre newsletter »)
* Le lieu où sont hébergées les données.
* Les sous-traitants éventuels qui ont accès à leurs données et leurs lieux d’hébergement.
* Les destinataires des données.
* La durée de traitement/conservation de ces données.
* La durée de validité du consentement.
* Une explication sur le caractère obligatoire de certaines demandes d’information (par exemple pourquoi renseigner son nom et son prénom est obligatoire).

Pour un site e-commerce ou public/institutionnel, penser à informer les internautes par e-mail à chaque mise à jour.

Voir par exemple [CNIL : Page de données personnelles](https://www.cnil.fr/fr/donnees-personnelles) ou [Zalando : Politique de confidentialité](https://www.zalando.fr/zalando-protection-donnees/).

### DPD ou DPO

Le/la délégué(e) à la protection des données (ou DPO en anglais) peut être désigné(e) en ligne sur le site de la CNIL et doit avoir :

* Les compétences requises (expertise juridique et technique, connaissance du secteur d'activité)
* Les moyens suffisants (temps, matériel, outils, accès aux données, être impliqué, être joignable)
* La capacité d'agir (pas de conflit d'intérêt, pouvoir rendre compte, ne pas être sanctionné, etc.)

Désigner un(e) DPD est obligatoire pour les autorités ou les organismes publics, les organismes dont les activités de base les amènent à réaliser un suivi régulier et systématique des personnes à grande échelle, les organismes dont les activités de base les amènent à traiter à grande échelle des données dites « sensibles » ou relatives à des condamnations pénales et infractions.

Voir démarche en ligne [CNIL : Désignation d'un délégué à la protection des données](https://designations.cnil.fr/dpo/)

## Tri des données

Les données collectées doivent servir l'objectif prévu, la finalité légitime au regard de l'activité. Il est inutile de stocker des informations sensibles ; il faut stocker le minimum et le sécuriser, donc **adapter le modèle de la base données** en ne conservant que les tables et champs utiles.
Dans le cadre d'une mise en conformité, il faut faire le tri dans les données qui ont déjà été recueillies auparavant et le cas échéant demander à nouveau le consentement si ce n'était pas déjà effectué par le passé.

## Sécurisation des données

La CNIL précise "les données personnelles doivent faire l’objet de mesures de sécurité particulières, informatiques et physiques".

## Hébergement

* Les données doivent être hébergées/transférées dans des pays de l'Union Européenne ou un pays "adéquat" ayant conclu des accords sur les données personnelles avec l'UE. Voir carte [CNIL : Protection des données dans la monde](https://linc.cnil.fr/fr/la-protection-des-donnees-dans-le-monde)
* Si les données sont hébergées/transférées dans un autre pays : un consentement explicite de l'internaute doit être recueilli.

## Sécurité

* Utiliser le protocole HTTPS.
* Garder un registre ou une cartographie de tous les flux de données qui transitent sur le site (type de données, lieu d'hébergement, responsable des données, transfert vers des sociétés tiers, etc.).
* Limiter l'accès aux données personnelles uniquement aux personnes nécessaires.
* Limiter le transfert des données à d'autres personnes et anonymiser les données lorsque cela est possible.
* Veiller à ce que tous les partenaires du site soient en conformité avec le RGPD.
* Créer des droits différents pour les comptes administrateurs du site : l'accès aux données personnelles doit être limité ; attribuer les droits en fonction des métiers ; verrouiller les sessions sur les postes de travail qui y ont accès en entreprise/institution.

## Registre des activités de traitement

Le registre des activités de traitement permet de recenser les traitements de données et de disposer d'une vue d'ensemble, il doit être tenu à jour et doit être communiqué à la CNIL lorsqu'elle le demande (mission de contrôle). Il peut s'agir d'un tableau pour chaque formulaire d'un site, recensant :

* l'identité du responsable des données (DPD)
* le ou les destinataires des données
* la finalité du traitement
* le caractère des données récoltées (données personnelles, données sensibles, etc.),
* le type de données récoltées (nom, prénom, numéro de sécurité sociale, adresse e-mail, etc.),
* l'emplacement du stockage de ces données
* de quelle façon ces données sont sécurisées
* si ces données sont transférées à des sous-traitants

Voir [CNIL : RGPD : Le Registre des activités de traitement](https://www.cnil.fr/fr/RGDP-le-registre-des-activites-de-traitement) (un modèle y est proposé)

## Cas concrets et types de projets

### Bannières cookies

* À l'entrée sur le site, il faut dresser une liste des cookies utilisés sur le site si les cookies utilisés recueillent des données personnelles, et chacune de leurs fonctionnalités ainsi que recueillir le consentement explicite.
* Prévoir des explications dans le bandeau ou la Politique de confidentialité sur ce que sont les cookies, les conséquences du refus de la part de l’utilisateur, la marche à suivre pour retirer son consentement, la durée de validité du consentement.

Voir exemple [Bose](https://www.bose.fr/fr_fr/legal/cookie_policy.html)

Voir [Tarteaucitron](https://tarteaucitron.io/fr/) gestionnaire conforme RGPD.

### Formulaires et consentement

* Toujours **demander le consentement** avant d'utiliser les données : cela peut se manifester sous la forme d’une case à cocher ou d'un bouton distinct “J'accepte”. Attention : l'internaute doit avoir le choix de cocher cette case ou non, elle ne doit pas être cochée par défaut (_opt-in_ et non pas _opt-out_).
* Afficher une mention sous le formulaire de contact du type « Les informations mentionnées dans ce formulaire ne pourront être utilisées que conformément à la loi informatique et liberté 78-17 du 06/01/78. Vous disposez d'un droit d'accès et de modification et/ou suppression de ces données. » ainsi qu'un **lien vers la page de Politique de confidentialité**.
* Faire le tri régulièrement parmi les contacts afin de ne pas garder de données personnelles plus de temps qu'il n'en a fallu pour traiter la demande.

### Intranet/extranet

* Limiter l'accès aux données personnelles et sensibles des collaborateurs seulement au personnel compétent et nécessaire.
* Sécuriser le stockage et les transferts de ces données.

Voir [CNIL : RGPD en pratique : protéger les données de vos collaborateurs](https://www.cnil.fr/fr/rgpd-en-pratique-proteger-les-donnees)

### Inscription newsletter

* Recueillir explicitement le consentement de l'internaute (_opt-in_ par bouton ou case à cocher).
* Historiser une trace du consentement.
* Ne demander que l'adresse e-mail : nom et prénom ne sont pas nécessaires pour une newsletter.
* Afficher une mention sous le formulaire d'inscription du type : « Les informations mentionnées dans ce formulaire ne pourront être utilisées que conformément à la loi informatique et liberté 78-17 du 06/01/78. Vous disposez d'un droit d'accès et de modification et/ou suppression de ces données. » ainsi qu'un **lien vers la page de Politique de confidentialité**.
* Permettre à l'internaute de se **désinscrire** dans la page Politique de Confidentialité, dans la mention sous le formulaire d'inscription, dans l'e-mail envoyé ; préciser le délai de prise en compte.
* Prendre en compte la suppression des informations dans un délai de 30 jours.
* Faire le tri régulièrement dans la base. Si un(e) internaute n'a pas ouvert un e-mail ou manifesté son intérêt (clic dans la newsletter) depuis 36 mois, supprimer ses informations de la base de données ou renouveler son consentement (toujours en _opt-in_) par notification e-mail.
* Éventuellement, demander confirmation par e-mail lors de l'inscription pour des raisons de sécurité.

### Compte client

* Recueillir explicitement le consentement de l'internaute (_opt-in_ par bouton ou case à cocher).
* À la création du compte, limiter la collecte des données au strict nécessaire selon votre activité : l'adresse postale peut, par exemple, n'être ajoutée au compte client qu'ultérieurement lors d'une commande.)
* Afficher une mention sous le formulaire d'inscription du type : « Les informations mentionnées dans ce formulaire ne pourront être utilisées que conformément à la loi informatique et liberté 78-17 du 06/01/78. Vous disposez d'un droit d'accès et de modification et/ou suppression de ces données. » ainsi qu'un **lien vers la page de Politique de confidentialité**.
* Les mots de passe ne doivent pas être stockés en clair dans la base de données, ne sont pas envoyés par e-mail mais réinitialisés via un lien de réinitialisation ; voir [CNIL : Mots de passe : une nouvelle recommandation pour maîtriser sa sécurité](https://www.cnil.fr/fr/mots-de-passe-une-nouvelle-recommandation-pour-maitriser-sa-securite)
* Faire le tri régulièrement dans la base de données : la personne qui a déjà commandé mais qui ne s'est pas connectée depuis 36 mois, ou qui n'a jamais commandé en 36 mois, doit être supprimée de la base ou ses données personnelles complètement anonymisées (certaines exceptions peuvent s'appliquer selon certains cas, en cas de produits garantis par exemple.)
* Ne pas enregistrer les coordonnées bancaires ou bien s'assurer d'avoir le consentement explicite de la personne et d'être en mesure de stocker les données de manière totalement sécurisée.

Attention à ne pas recueillir les données personnelles d'un mineur de moins de 13 ans et à ne recueillir celles d'un mineur de moins de 16 ans qu'avec l'accord de ses parents : prévoir par exemple une case à cocher « Je certifie avoir plus de 16 ans ou avoir plus de 13 ans et posséder l'accord de mes parents ».

L'internaute inscrit(e) doit pouvoir :

* Consulter ses informations et en demander une archive : prévoir
  * une fonctionnalité d'export de toutes les données collectées sur le client dans un format exploitable.
  * un espace de demande d'accès à ces données : formulaire de contact, lien dans les CGV/Politique de confidentialité, lien depuis le compte client.
* Modifier ses informations via son compte client ou via un formulaire de contact.
* Supprimer son compte et toutes ses données personnelles associées s'il le souhaite. (Aucun traitement des données n’est plus possible à partir de ce moment-là et les données doivent être supprimées de tous les supports.)

Attention, toutefois, le cadre juridique en France impose de conserver les pièces comptables (factures, commandes) pendant une durée de 10 ans.

### Services externes

* [reCAPTCHA de Google : doit être soumis au consentement](https://twitter.com/DavidLibeau/status/1516041376542208012)
* YouTube : utiliser `https://youtube-nocookie.com/embed/` pour les vidéos, y compris [Use cookie-less domain for YouTube embeds in WordPress](https://rickylee.com/2018/03/26/youtube-nocookie-gdpr-wordpress/)
* Le simple usage de Google Fonts peut être considéré illégal, voir <https://gdprhub.eu/index.php?title=LG_München_-_3_O_17493/20>

## En cas de fuite

S'il y a fuite de données personnelles constituant un risque au regard de la vie privée, il faut

* Prévenir les personnes concernées sous un délai de 72h
* Avertir la [CNIL : Notification d'une violation de données personnelles
](https://notifications.cnil.fr/notifications/index)
