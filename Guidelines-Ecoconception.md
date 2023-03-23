# Ecoconception

* Actions mises en place par Alsacréations pour répondre au [Référentiel général d'écoconception de services numériques (RGESN)](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/)
* Voir aussi [Les 115 bonnes pratiques](https://github.com/cnumr/best-practices)
* Empreinte carbone des appareils <https://impactco2.fr/numerique> (ADEME)

---

## Synthèse et légende

À l'exclusion de la thématique hébergement que l'on considère hors du périmètre de responsabilité directe :

* ✅ 36 critères réalisés : nous tenons compte de ces bonnes pratiques et savons conseiller.
* 📄 25 critères "à la carte" : ils ont un impact sur le temps de réalisation, doivent être retenus et précisés en amont (notamment en phase Stratégie/Spécifications/Architecture). La _Méthodologie_ est le document définissant les démarches prévues pour répondre aux critères de réduction des impacts environnementaux dans les phases suivantes (UX/UI, Contenus, Frontend, Backend) ; complété par le cahier des charges s'il y a lieu, et les sessions de questions/réponses.
* ⚖️ 4 critères "externes" : sur lequels nous n'avons que peu ou pas de contrôle.

---

## Stratégie

### 1.1 + 1.2 + 1.3 + 1.8 + 1.11 (Objectifs de développement durable, cibles, besoins métiers, référent écoconception, revue régulière)

📄 Définis durant l'élaboration de la _Méthodologie_.

### 1.4 + 1.5 + 1.6 Le service numérique a-t-il défini la liste des profils de matériel que les utilisateurs vont pouvoir employer pour y accéder ? Le service numérique est-il utilisable sur des terminaux âgés de 5 ans ou plus ? Le service numérique s’adapte-t-il à différents types de terminaux d’affichage ?

📄 Critères techniques notamment de **support des navigateurs et smartphones** précisés en amont dans la _Méthodologie_.

### 1.7 Le service numérique a-t-il été conçu avec des technologies standard interopérables plutôt que des technologies spécifiques et fermées ?

✅ Nous optons par défaut pour toutes les technologies en open-source, les standards du web et les [formats interopérables](Guidelines-Interoperabilite.md).

### 1.9 Le service numérique a-t-il identifié des indicateurs pour mesurer ses impacts environnementaux ?

📄 À définir en amont dans la _Méthodologie_.

Côté hébergement il peut s'agir d'un outil relevant la consommation électrique, son origine de production, et donc l'émission de CO2 (disponible sur AWS par exemple).

Côté réalisation (postes de travail, équipe) : à estimer.

### 1.10 Le service numérique s’est-il fixé des objectifs en matière de réduction ou de limitation de ses propres impacts environnementaux ?

Côté équipe : définis dans notre présentation "Green IT" associée.

📄 Côté vie du projet : définir les objectifs fixés et les indicateurs ([voir détails du critère](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/critere/1.10/)).

### 1.12 Le service numérique publie-t-il une déclaration ou une politique d’écoconception ?

✅ Notre checklist projet inclut une tâche pour prévoir une page relative à l'écoconception, y compris dans la navigation (pied de page), ainsi qu'un document adaptable de déclaration d'écoconception.

## Spécifications

### 2.1 – Le service numérique a-t-il été conçu avec une revue de conception et une revue de code en ayant pour un des objectifs de réduire les impacts environnementaux de chaque fonctionnalité ?

📄 À définir en amont dans la _Méthodologie_ : nous réfléchissons/conseillons lors de la définition aux solutions ayant le moins d'impact environnemental et si elles sont retenues les mettons en oeuvre ; en cas de développement sur-mesure et d'ajout de code au projet, des revues de code poursuivent cet objectif.

### 2.2 – Le service numérique a-t-il prévu une stratégie de décommissionnement pour ses fonctionnalités, ses composants ou ses environnements non utilisés ?

✅ Nous ne mettons en production que les composants réellement utilisés et (si une prestation de suivi/maintenance est retenue) notre procédure prévoit de façon bimensuelle de supprimer d'éventuels modules qui ne seraient pas activés (par exemple les extensions du CMS WordPress).

Avec les frameworks front-end (Vue, Nuxt, React), le code inutile est automatiquement retiré du projet par le [tree-shaking](https://webpack.js.org/guides/tree-shaking/). En back-end les environnements de recette sont désactivés 3 mois après la mise en production et les réactivons si nécessaire.

### 2.3 – Le service numérique impose-t-il à ses fournisseurs de garantir une démarche de réduction de leurs impacts environnementaux ?

⚖️ Le périmètre défini en amont du projet va identifier les fournisseurs éventuels et les impliquer dans la démarche, sinon nous couvrons par défaut la réalisation dans son ensemble, hormis services externes (API s'il y en a) et hébergement (voir les points dédiés).

### 2.4 + 2.5 – Le service numérique a-t-il pris en compte les impacts environnementaux des composants d’interface prêts à l’emploi / des services tiers utilisés lors de leur sélection ?

📄 À définir en amont dans la _Méthodologie_ : les composants ont un impact négligeable, les services tiers sont par contre à sélectionner (ex : reCaptcha, maps, CDN pour les contenus statiques, vidéos hébergées par YouTube permettant différents niveaux de qualité/bande-passante).

## Architecture

### 3.1 – Le service numérique repose-t-il sur une architecture, des ressources ou des composants conçus pour réduire leurs propres impacts environnementaux ?

⚖️ Les projets web sont conçus à l'aide de multiples bibliothèques et composants, dont certains prennent en compte l'éco-conception, nous pouvons faire attention lors de choix techniques s'il existe des alternatives mais ne pouvons le garantir pour l'ensemble de l'architecture et toutes ses dépendances.

### 3.2 – Le service numérique fonctionne-t-il sur une architecture pouvant adapter la quantité de ressources utilisées en fonction de la consommation du service ?

📄 Défini par l'architecture prévue au cahier des charges et dans la _Méthodologie_, nous privilégions notamment les hébergements mutualisés dont la puissance est ajustée au plus près du besoin, virtualisés qui se partagent des ressources, voire élastiques/serverless dont les ressources allouées s'adaptent à la demande.

### 3.3 – Le service numérique a-t-il pris en compte l’évolution technique des protocoles ?

✅ Au démarrage du projet, le choix des protocoles est établi en privilégiant les solutions les plus performantes, interopérables et économes en ressources. Par défaut, les protocoles actuels du web sont admis comme les plus appropriés : HTTP, API REST, JSON, WebSocket.

### 3.4 – Le service numérique utilise-t-il un protocole d’échange adapté aux contenus transférés ?

✅ Dans tous les cas, nous privilégions les protocoles et formats les plus légers (ex : API REST avec JSON) avec compression, et mise en cache HTTP le cas échéant.

### 3.5 – Le service numérique garantit-il la mise à disposition de mises à jour correctives pendant toute la durée de vie prévue des équipements et des logiciels liés au service ?

📄 Défini par les critères de maintenance dans la _Méthodologie_ et selon la prestation prévue, par défaut nous proposons l'application des correctifs pendant la durée de vie du projet.

### 3.6 – Le service numérique propose-t-il d’installer des mises à jour correctives indépendamment des mises à jour évolutives ?

✅ Pour les projets utilisant un CMS (ex: WordPress), les mises à jour correctives, notamment d'extensions, se font, lorsqu'elles sont disponibles, indépendamment des mises à jours évolutives. Pour les projets sans CMS (ex: avec framework Nuxt, Vue, ou sans framework), les patchs correctifs sont déployés sans dépendre de mises à jour évolutives ; sauf dans les cas exceptionnels où la recompilation du projet est nécessaire avec une nouvelle version du framework ou langage (ex : version majeure de Node).

## UX/UI

### 4.1 – Le service numérique est-il utilisable via une connexion bas débit ?

📄 Défini par les critères de performance web dans la _Méthodologie_ (ex: poids maximal des pages, budget-temps de chargement).

### 4.2 – Le service numérique comporte-t-il uniquement des éléments animations, vidéos et sons dont la lecture automatique est désactivée ?

✅ En phase design/ux, nous conseillons et évitons le déclenchement automatique d'éléments médias (sons, vidéos, animations). En intégration, la lecture automatique à l'aide d'`autoplay` n'est pas employée (et est souvent bloquée par les navigateurs).

### 4.3 – Le service numérique affiche-t-il uniquement des contenus sans défilement de page infini ?

✅ En phase design/ux, nous évitons les pages en défilement infini (_infinite scroll_).

### 4.4 – Le service numérique optimise-t-il le parcours de navigation pour chaque fonctionnalité principale ?

✅ En phase design/ux, nous optimisons les parcours de navigation pour donner accès aux contenus et fonctionnalités de la manière la plus directe possible.

### 4.5 – Le service numérique permet-il à l’utilisateur de décider de l’activation d’un service tiers ?

⚖️ Dépend des services tiers utilisés, de leur rôle/criticité, et du consentement demandé (voir RGPD).

### 4.6 – Le service numérique utilise-t-il majoritairement des composants fonctionnels natifs du système d’exploitation, du navigateur ou du langage utilisé ?

✅ Pour des raisons de support des standards (W3C, entre autres) ainsi que d'accessibilité, les composants et applications web que nous développons se reposent au maximum sur les fonctions natives déjà proposées par le navigateur.

### 4.7 et 4.8 – Le service numérique utilise-t-il uniquement du contenu vidéo, audio et animé porteur d’informations ? Le service numérique utilise-t-il du texte ou de l’image au lieu de contenu vidéo, audio ou animé lorsque cela est possible ?

⚖️ Pour des raisons d'accessibilité numérique, les contenus médias sont assortis d'une alternative (transcription) texte. Cependant, les vidéos, animations et audios visent d'autres objectifs (communication, attractivité, ux) ; il appartient alors de faire un choix en amont.

### 4.9 – Le service numérique permet-il de mettre en pause les animations, défilement ou clignotement ?

✅ En phase design/ux, nous préconisons toujours la capacité de mettre en pause, par l'ajout d'un bouton à cet effet. En intégration, il y a toujours la possibilité d'utiliser un bouton d'action (stop, pause). Nous pouvons également utiliser la détection via [prefers-reduced-motion](https://developer.mozilla.org/fr/docs/Web/CSS/@media/prefers-reduced-motion)

### 4.10 – Le service numérique utilise-t-il majoritairement des polices de caractères du système d’exploitation ?

📄 Défini en phase design par la [font-stack system](https://css-tricks.com/snippets/css/system-font-stack/) utilisable, consulter le [support](https://systemfontstack.com/) par défaut des systèmes d'exploitation. On s'attache à limiter le nombre de fontes différentes, par exemple à en privilégier une pour les titres et se reposer sur la stack système pour les autres.

### 4.11 – Le service numérique limite-t-il les requêtes serveur lors de la saisie utilisateur ?

✅ En phase développement, nous utilisons des méthodes de [debounce](https://davidwalsh.name/javascript-debounce-function), voire de mise en cache des résultats pour réduire les requêtes.

### 4.12 – Le service numérique informe-t-il l’utilisateur du format de saisie attendu avant sa validation ?

✅ En phase design et intégration, nous pensons à indiquer le format attendu pour les champs de formulaire.

### 4.13 – Le service numérique vérifie-t-il les saisies et les formats de données obligatoires à la soumission d’un formulaire sans requête serveur lorsque c’est possible ?

✅ En intégration, nous nous reposons sur la [validation native des formulaires permise par HTML5](https://developer.mozilla.org/fr/docs/Learn/Forms/Form_validation), et si besoin incluons une bibliothèque de validation côté client/navigateur (telle que [VeeValidate](https://vee-validate.logaretm.com/)) afin d'éviter un envoi/retour inutile jusqu'au serveur.

### 4.14 – Le service numérique informe-t-il l’utilisateur, avant le transfert, des poids et formats de fichier attendus ?

✅ En phase design et intégration, nous pensons à indiquer pour chaque champ d'envoi (upload) de fichier le format attendu et le poids maximal autorisé.

### 4.15 – Le service numérique vérifie-t-il des limites de poids et de formats sur les fichiers pouvant être transmis par l’utilisateur ?

✅ En intégration, nous nous reposons sur [File API](https://www.w3.org/TR/FileAPI/) pour connaître le poids (`.size` en octets) et le format (`.type` [mimeType](https://mimesniff.spec.whatwg.org/#parsable-mime-type)) des fichiers avant envoi.

### 4.16 – Le service numérique indique-t-il à l’utilisateur que l’utilisation d’une fonctionnalité a des impacts environnementaux importants ?

✅ En phase design, nous prévoyons d'indiquer visuellement les fonctionnalités ayant un impact environnemental important ; et permettre de choisir la solution la plus économe s'il y a des alternatives lors d'actions de l'utilisateur, dans les formulaires ou le compte utilisateur.

### 4.17 + 4.18 – Le service numérique propose-t-il des notifications uniquement lorsque c’est nécessaire ? Le service numérique permet-il à l’utilisateur de contrôler les notifications qu’il reçoit ?

✅ Les notifications ne sont développées qu'en cas de réel besoin défini par la _Méthodologie_ après échanges et étude ; nous prévoyons toujours de pouvoir désactiver ces notifications et de pouvoir en régler la quantité dans le compte utilisateur.

### 4.19 – Le service numérique fournit-il à l’utilisateur un moyen de contrôle sur ses contenus et ses services afin de réduire les impacts environnementaux ?

📄 Défini par la _Méthodologie_ et les fonctionnalités à développer : s'il y a un compte utilisateur celui-ci doit pouvoir effacer les données devenues inutiles (et effacer son propre compte par ailleurs pour respecter le RGPD).

## Contenus

### 5.1 – Le service numérique utilise-t-il un format de fichier adapté au contenu et au contexte de visualisation de chaque image ?

✅ Entre phase design et intégration, nous exportons vers les formats les plus adaptés, définis par nos [Guidelines performance](Guidelines-Performances.md) (listant également les outils de compression conseillés).

### 5.2 – Le service numérique propose-t-il des images dont le niveau de compression est adapté au contenu et au contexte de visualisation ?

✅ Oui, l'export ou la compression grâce aux outils mentionnés dans nos Guidelines performance, de type [Image Optimizer](https://github.com/antonreshetov/image-optimizer) ou [Squoosh](https://squoosh.app/) ou aux modules Node intégrés. Lors de la contribution de contenu par le CMS (ex : WordPress qui génère plusieurs tailles de fichiers images) la compression peut être améliorée par [des extensions spécifiques](https://themeisle.com/blog/wordpress-image-optimizer-plugins-compared/). Usage via les [Images adaptatives](https://developer.mozilla.org/fr/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) (srcset/picture) qui permettent de délivrer le format le plus adapté au média.

### 5.3 + 5.4 – Le service numérique utilise-t-il un format de fichier adapté au contenu et au contexte de visualisation pour chaque vidéo ? Le service numérique propose-t-il des vidéos dont le niveau de compression est adapté au contenu et au contexte de visualisation ?

✅ Les vidéos sont servies soit à l'aide d'un service externe d'hébergement disposant de son propre lecteur et compressant+délivrant les fichiers dans les meilleurs formats/résolutions/débits (ex: YouTube, Dailymotion, Vimeo) soit auto-hébergées et (re)compressées à l'aide d'un outil approprié défini par nos [Guidelines performance](Guidelines-Performances.md).

### 5.5 + 5.6 – Le service numérique utilise-t-il un format de fichier adapté au contenu et au contexte d’écoute de chaque contenu audio ? Le service numérique propose-t-il des contenus audio dont le niveau de compression est adapté au contenu et au contexte d’écoute ?

✅ Les contenus audio sont servis soit à l'aide d'un service externe d'hébergement disposant de son propre lecteur et compressant+délivrant les fichiers dans les meilleurs formats/débits (ex: Soundcloud) soit auto-hébergées et (re)compressées à l'aide d'un outil approprié défini par nos [Guidelines performance](Guidelines-Performances.md).

### 5.7 + 5.8 – Le service numérique utilise-t-il un format de fichier adapté au contenu et au contexte d’utilisation pour chaque document ? Le service numérique propose-t-il des documents dont le niveau de compression est adapté au contenu et au contexte d’utilisation ?

✅ Tous les documents mis en place initialement sont choisis ou convertis dans des formats appropriés avec une attention sur leur poids et leur usage en mobilité, en privilégiant l'[interopérabilité](Guidelines-Interoperabilite.md). Pour tous les documents apportés par contribution ultérieure, nous conseillons sur les bonnes pratiques et formats.

### 5.9 – Le service numérique a-t-il une stratégie d’archivage et de suppression, automatiques ou manuelles, des contenus obsolètes ou périmés ?

📄 La stratégie dépend du CMS employé et/ou d'un script serveur régulièrement déclenché (CRON) et/ou de notifications de rappel. Elle est définie en amont pour être dévelopée sur-mesure.

## Frontend

### 6.1 + 6.2 – Le service numérique s’astreint-il à un poids maximum par écran ? Le service numérique s’astreint-il à une limite de requêtes par écran ?

📄 Budget performance web défini dans le cahier des charges et/ou la _Méthodologie_ (minimiser le poids global des pages par minification, compression, lazy-loading, minimiser les requêtes HTTP).

### 6.3 – Le service numérique utilise-t-il des mécanismes de mises en cache pour la totalité des contenus transférés dont il a le contrôle ?

✅ La configuration du cache front-end (navigateur) est définie par en-têtes HTTP telles que [Cache-Control](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Cache-Control) avec des durées d'expiration longues, que ce soit manuellement pour les applications sur-mesure, ou à l'aide d'extensions pour les CMS (WordPress). Pour le cache back-end, voir 7.1

### 6.4 – Le service numérique a-t-il mis en place des techniques de compression sur la totalité des ressources transférées dont il a le contrôle ?

✅ Avec les CMS back-end (WordPress) la compression (minification+zip) des ressources est activée pour alléger les requêtes HTTP. Avec les frameworks front-end (Vue, Nuxt, React) le compilateur compresse automatiquement les modules.

### 6.5 – Le service numérique affiche-t-il majoritairement des éléments graphiques et des médias dont les dimensions d’origine correspondent aux dimensions du contexte d’affichage ?

✅ Avec les CMS back-end (WordPress) les images et médias ajoutées au contenu sont générées dans des variantes adaptées au contexte d'affichage. Avec les frameworks front-end (Vue, Nuxt, React) nous intégrons des versions optimisées.

### 6.6 – Le service numérique propose-t-il un mécanisme de chargement progressif pour les éléments graphiques et les médias le nécessitant ?

📄 Défini par la _Méthodologie_ s'il y a utilisation de lecteurs média à chargement progressif (_streaming_). Le chargement progressif est appliqué sur les images aux formats proposant cette fonctionnalité (JPEG par exemple) lorsque le poids du fichier le nécessite (>1 Mo).

### 6.7 + 6.8 – Le service numérique se limite-t-il au chargement des composants utilisés au sein des bibliothèques lorsque cela est possible ? Le service numérique évite-t-il de déclencher le chargement de ressources et de contenus inutilisés pour chaque fonctionnalité ?

✅ Avec les CMS back-end (WordPress) les composants générés et chargés sont ceux nécessaires à la page. Avec les frameworks front-end (Vue, Nuxt, React) le lazy-loading des pages et composants évite de charger des portions de code inutiles. Nous n'utilisons pas de bibliothèque chargeant par défaut tout son contenu, par exemple en CSS Tailwind est purgé du code non utile.

### 6.9 – Le service numérique utilise-t-il un stockage côté client de certaines ressources afin d’éviter des échanges réseaux inutiles ?

📄 Défini par la _Méthodologie_ en phase d'optimisation, les données pouvant être traitées localement sont stockées dans [WebStorage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API) ou [IndexedDB](https://developer.mozilla.org/fr/docs/Web/API/IndexedDB_API) notamment pour les applications web. Les autres ressources sont mises en cache HTTP par des instructions [Cache-Control](https://developer.mozilla.org/fr/docs/Web/HTTP/Caching) et/ou la configuration de dates d'expiration.

### 6.10 – Le service numérique restreint-il l’usage des capteurs des terminaux utilisateur au besoin du service plutôt qu’en permanence ?

✅ Les capteurs ne sont utilisés qu'en cas de besoin spécifique (souvent avec demande d'accord préalable, par exemple pour la géolocalisation).

### 6.11 – Le service numérique héberge-t-il les ressources statiques transférées dont il est l’émetteur sur un même domaine ?

✅ Par défaut, les domaines externes sont limités au maximum ; nous ne prévoyons pas de faire appel à des [CDN](https://fr.wikipedia.org/wiki/R%C3%A9seau_de_diffusion_de_contenu) hébergeant des bibliothèques JavaScript, des API, des fonts, des feuilles de styles CSS : ces ressources sont intégrées au domaine du projet.

## Backend

### 7.1 – Le service numérique a-t-il recours à un système de cache serveur pour les données les plus utilisées ?

📄 Selon la typologie de projet, ce cache (API, base de données, autres requêtes spécifiques) est défini par la _Méthodologie_ : pour les CMS back-end (WordPress) les [extensions appropriées](Guidelines-WordPress.md#extensions) stockent sur le serveur un cache des pages, notamment pour les utilisateurs anonymes auxquels on délivre un contenu qui n'a pas besoin d'être recalculé.

### 7.2 – Le service numérique est-il configuré pour transmettre depuis le serveur des contenus compressés au client qui les accepte ?

✅ Le serveur web utilise le protocole HTTP et les en-têtes de type _Accept-Encoding/Content-Encoding_ pour négocier la compression des contenus (voir aussi 6.4).

### 7.3 – Le service numérique définit-il des durées de conservation sur les données et documents qui le nécessitent ?

📄 Selon la typologie de projet, les dates d'expiration des ressources sont établies, ou les dates de création du contenu auxquelles on ajoute la durée de conservation. Il peut s'agir d'un champ date en base de données, la date de création des fichiers sur le serveur, ou le préfixe de nommage utilisé pour ces fichiers (ex `2023-xxx.pdf`).

### 7.4 – Le service numérique archive-t-il ou supprime-t-il les données et documents après expiration de leur durée de conservation ?

📄 Selon la typologie de projet et les ressources datées à disposition (voir 7.3) un script automatique de suppression peut être mis en place, ou une procédure d'effacement manuel, par requête dans la base de données ou sur le serveur d'hébergement (accès SSH, FTP).

### 7.5 – Le service numérique informe-t-il l’utilisateur d’un traitement en cours en arrière-plan ?

✅ Les interfaces développées indiquent par un statut visuel et/ou un bloquage d'une éventuelle action supplémentaire qu'il faut attendre la fin d'un traitement, notamment lors des actions au clic qui ne provoquent pas de changement de page mais un changement d'état, et lors des validations de formulaires.

## Hébergement

### 8.1 à 8.12 – Le service numérique utilise-t-il un hébergement

* signataire du Code de Conduite européen sur les Datacentres ?
* ayant une démarche de réduction de son impact écologique ?
* qui fournit une politique de gestion durable des équipements ?
* qui fournit des indicateurs d’impacts environnementaux liés à son activité ?
* dont le PUE (Power Usage Effectiveness) est communiqué ?
* dont son WUE (Water Usage Effectiveness) est communiqué ?
* dont la consommation d’électricité est majoritairement d’origine renouvelable ?
* dont la localisation géographique est en cohérence avec celle de ses utilisateurs et de ses activités ?
* distinguant les données « chaudes » et « froides » ?
* dupliquant les données uniquement lorsque cela est nécessaire ?
* utilisant une redondance uniquement lorsque cela est nécessaire ?
* récupérant la chaleur fatale produite par les serveurs ?

📄 Tous ces points sont pris en compte en amont du projet pour le choix de l'hébergement : nous privilégions les offres avec démarche éco-responsable, voire dans des zones neutres en carbone.

---

En résumé

* Phase définition/spécification
  1. Mettre en place la démarche et la communiquer aux fournisseurs/interlocuteurs s'il y en a.
  2. Choisir les composants, technologies, hébergement minimisant l'impact environnemental et privilégiant les standards/l'interopérabilité/la rétro-compatibilité.
* Phase réalisation
  1. Design : Tenir compte des usages possibles (low tech, dark mode, responsive, font stack, médias en pause par défaut).
  2. Développement : Mettre en place les optimisations/revues de code pour réduire l'impact sur les ressources (puissance, réseau, techniques de performance web) et désactiver les composants/environnements non utilisés.
  3. Mettre en place les optimisations de cache, compression, expiration du stockage.
* Phase finalisation
  1. Publier la déclaration d'éco-conception.
  2. Optimiser et affiner, post-déploiement notamment côté hébergement.
