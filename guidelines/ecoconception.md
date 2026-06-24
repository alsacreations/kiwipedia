# Écoconception

> Statut : stable · Niveau : avancé

**TL;DR** — Démarche d'écoconception chez Alsacréations alignée sur le RGESN (version 2024) : spécification, réalisation, finalisation. Synthèse, checklist, ressources.

Actions mises en place par Alsacréations pour répondre au [Référentiel général d'écoconception de services numériques (RGESN)](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/).

## Ressources

* 🔗 [Les 115 bonnes pratiques](https://github.com/cnumr/best-practices)
* 🔗 [Empreinte carbone des appareils — ADEME](https://impactco2.fr/numerique)

---

## Synthèse et légende

À l'exclusion de la thématique hébergement que l'on considère hors du périmètre de responsabilité directe :

* ✅ 32 critères réalisés : nous tenons compte de ces bonnes pratiques et savons conseiller.
* 📄 40 critères "à la carte" : ils ont un impact sur le temps de réalisation, doivent être retenus et précisés en amont (notamment en phase Stratégie/Spécifications/Architecture). La _Méthodologie_ est le document définissant les démarches prévues pour répondre aux critères de réduction des impacts environnementaux dans les phases suivantes (UX/UI, Contenus, Frontend, Backend) ; complété par le cahier des charges s'il y a lieu, et les sessions de questions/réponses.
* ⚖️ 6 critères "externes" : sur lesquels nous n'avons que peu ou pas de contrôle.

---

## Stratégie

### 1.1 + 1.2 + 1.3 + 1.4 + 1.5 (Utilité, cibles utilisatrices, référent écoconception, revues régulières, objectifs de réduction)

📄 Définis durant l'élaboration de la _Méthodologie_.

Côté hébergement il peut s'agir d'un outil relevant la consommation électrique, son origine de production, et donc l'émission de CO2 (disponible sur AWS par exemple). Côté réalisation (postes de travail, équipe) : à estimer. Côté équipe : définis dans notre présentation "Green IT" associée.

### 1.6 Le service numérique collecte-t-il la donnée de façon responsable et raisonnée ?

📄 Défini en amont dans la _Méthodologie_ : nous conseillons de limiter la collecte de données au strict nécessaire, en cohérence avec les obligations RGPD. Les formulaires et traitements sont conçus pour ne recueillir que les données indispensables au fonctionnement du service.

### 1.7 Le service numérique a-t-il recours à un niveau de chiffrement adapté à ses besoins ?

✅ Nous utilisons le protocole HTTPS par défaut pour tous les projets. Le niveau de chiffrement est adapté aux besoins (TLS standard pour les sites web, sans sur-chiffrement inutile consommateur de ressources).

### 1.8 + 1.9 Le service numérique a-t-il mis en place des efforts d'open source ? Le service numérique a-t-il été conçu avec des technologies standard interopérables plutôt que des technologies spécifiques et fermées ?

✅ Nous optons par défaut pour toutes les technologies en _open source_, les standards du web et les [formats interopérables](interoperabilite.md). Nos méthodes, outils et retours d'expérience sont partagés publiquement (guidelines, articles, conférences).

### 1.10 Le service numérique repose-t-il sur des API documentées et ouvertes pour interagir avec le matériel ?

✅ Nous nous appuyons sur les API web standardisées (Geolocation, File API, Web Storage, etc.) documentées par le W3C et le WHATWG, plutôt que sur des solutions propriétaires.

## Spécifications

### 2.1 + 2.2 + 2.4 + 2.5 Le service numérique a-t-il défini la liste des profils de matériels ? Est-il utilisable sur d'anciens modèles de terminaux ? Sur d'anciennes versions de système d'exploitation et de navigateurs web ? S'adapte-t-il à différents types de terminaux d'affichage ?

📄 Critères techniques notamment de **support des navigateurs, smartphones et systèmes d'exploitation** précisés en amont dans la _Méthodologie_.

### 2.3 Le service numérique est-il utilisable via une connexion bas débit ou hors connexion ?

📄 Défini par les critères de performance web dans la _Méthodologie_ (ex : poids maximal des pages, budget-temps de chargement, fonctionnement hors connexion si pertinent).

### 2.6 Le service numérique a-t-il été conçu avec une revue de conception et une revue de code comprenant parmi ses objectifs la réduction des impacts environnementaux de chaque fonctionnalité ?

📄 À définir en amont dans la _Méthodologie_ : nous réfléchissons/conseillons lors de la définition aux solutions ayant le moins d'impact environnemental et si elles sont retenues, les mettons en œuvre ; en cas de développement sur-mesure et d'ajout de code au projet, des revues de code poursuivent cet objectif.

### 2.7 Le service numérique a-t-il prévu une stratégie de maintenance et de décommissionnement ?

✅ Nous ne mettons en production que les composants réellement utilisés et (si une prestation de suivi/maintenance est retenue) notre procédure prévoit de façon bimensuelle de supprimer d'éventuels modules qui ne seraient pas activés (par exemple les extensions du CMS WordPress).

Avec les frameworks front-end (Vue, Nuxt, React), le code inutile est automatiquement retiré du projet par le [tree-shaking](https://webpack.js.org/guides/tree-shaking/). En back-end les environnements de recette sont désactivés 3 mois après la mise en production et ne sont réactivés que si nécessaire.

### 2.8 Le service numérique impose-t-il à ses fournisseurs de garantir une démarche de réduction de leurs impacts environnementaux ?

⚖️ Le périmètre défini en amont du projet va identifier les fournisseurs éventuels et les impliquer dans la démarche, sinon nous couvrons par défaut la réalisation dans son ensemble, hormis services externes (API s'il y en a) et hébergement (voir les points dédiés).

### 2.9 + 2.10 Le service numérique a-t-il pris en compte les impacts environnementaux des composants d'interface prêts à l'emploi / des services tiers utilisés lors de leur sélection ?

📄 À définir en amont dans la _Méthodologie_ : les composants ont un impact négligeable, les services tiers sont par contre à sélectionner (ex : reCaptcha, maps, CDN pour les contenus statiques, vidéos hébergées par YouTube permettant différents niveaux de qualité/bande-passante).

## Architecture

### 3.1 Le service numérique repose-t-il sur une architecture, des ressources ou des composants conçus pour réduire leurs propres impacts environnementaux ?

⚖️ Les projets web sont conçus à l'aide de multiples bibliothèques et composants, dont certains prennent en compte l'éco-conception, nous pouvons faire attention lors de choix techniques s'il existe des alternatives mais ne pouvons le garantir pour l'ensemble de l'architecture et toutes ses dépendances.

### 3.2 Le service numérique fonctionne-t-il sur une architecture pouvant adapter la quantité de ressources utilisées à la consommation du service ?

📄 Défini par l'architecture prévue au cahier des charges et dans la _Méthodologie_, nous privilégions notamment les hébergements mutualisés dont la puissance est ajustée au plus près du besoin, virtualisés qui se partagent des ressources, voire élastiques/_serverless_ dont les ressources allouées s'adaptent à la demande.

### 3.3 Le service numérique est-il en mesure de supporter l'évolution technique des protocoles ?

✅ Au démarrage du projet, le choix des protocoles est établi en privilégiant les solutions les plus performantes, interopérables et économes en ressources. Par défaut, les protocoles actuels du web sont admis comme les plus appropriés : HTTP, API REST, JSON, WebSocket.

### 3.4 Le service numérique garantit-il la mise à disposition de mises à jour correctives pendant toute la durée de vie prévue des équipements et des logiciels liés au service ?

📄 Défini par les critères de maintenance dans la _Méthodologie_ et selon la prestation prévue, par défaut nous proposons l'application des correctifs pendant la durée de vie du projet.

### 3.5 Le service numérique propose-t-il d'installer des mises à jour correctives indépendamment des mises à jour évolutives de façon transparente ?

✅ Pour les projets utilisant un CMS (ex : WordPress), les mises à jour correctives, notamment d'extensions, se font, lorsqu'elles sont disponibles, indépendamment des mises à jour évolutives. Pour les projets sans CMS (ex : avec framework Nuxt, Vue, ou sans framework), les patchs correctifs sont déployés sans dépendre de mises à jour évolutives ; sauf dans les cas exceptionnels où la recompilation du projet est nécessaire avec une nouvelle version du framework ou langage (ex : version majeure de Node).

### 3.6 Le service numérique propose-t-il les mises à jour incrémentielles, afin de ne pas remplacer tout le code à chaque mise à jour ?

✅ Avec les frameworks modernes (Vue, Nuxt, React), les outils de build (Vite, webpack) génèrent des bundles avec _content hashing_ : seuls les fichiers modifiés sont remplacés lors d'une mise à jour. Pour les CMS (WordPress), les mises à jour d'extensions et du cœur sont incrémentielles par défaut.

### 3.7 Le service numérique optimise-t-il la sollicitation des environnements de développement, de préproduction ou de test en fonction de ses besoins ?

✅ Les environnements de recette sont désactivés 3 mois après la mise en production et ne sont réactivés que si nécessaire. Les environnements de développement sont locaux (Docker, serveur de développement intégré) et ne sollicitent pas de ressources serveur distantes en dehors des phases actives de développement.

## UX/UI

### 4.1 Le service numérique comporte-t-il uniquement des animations, vidéos et sons dont la lecture automatique est désactivée ?

✅ En phase design/ux, nous conseillons et évitons le déclenchement automatique d'éléments médias (sons, vidéos, animations). En intégration, la lecture automatique à l'aide d'`autoplay` n'est pas employée (et est souvent bloquée par les navigateurs). Nous préconisons la possibilité de mettre en pause les animations par un bouton dédié et utilisons la détection via [prefers-reduced-motion](https://developer.mozilla.org/fr/docs/Web/CSS/@media/prefers-reduced-motion).

### 4.2 Le service numérique affiche-t-il uniquement des contenus sans défilement infini ?

✅ En phase design/ux, nous évitons les pages en défilement infini (_infinite scroll_).

### 4.3 Le service numérique optimise-t-il le parcours de navigation pour chaque fonctionnalité principale ?

✅ En phase design/ux, nous optimisons les parcours de navigation pour donner accès aux contenus et fonctionnalités de la manière la plus directe possible.

### 4.4 Le service numérique permet-il à l'utilisateur de décider de l'activation d'un service tiers ?

⚖️ Dépend des services tiers utilisés, de leur rôle/criticité, et du consentement demandé (voir RGPD).

### 4.5 Le service numérique utilise-t-il majoritairement des composants fonctionnels natifs du système d'exploitation, du navigateur ou du langage utilisé ?

✅ Pour des raisons de support des standards (W3C, entre autres) ainsi que d'accessibilité, les composants et applications web que nous développons se reposent au maximum sur les fonctions natives déjà proposées par le navigateur.

### 4.6 + 4.7 Le service numérique utilise-t-il uniquement du contenu vidéo, audio et animé porteur d'informations ? Le service numérique opte-t-il pour les choix les plus sobres entre le texte, l'image, l'audio ou la vidéo, selon les besoins utilisateurs ?

⚖️ Pour des raisons d'accessibilité numérique, les contenus médias sont assortis d'une alternative (transcription) texte. Cependant, les vidéos, animations et audios visent d'autres objectifs (communication, attractivité, ux) ; il appartient alors de faire un choix en amont en privilégiant les formats les plus sobres.

### 4.8 Le service numérique limite-t-il le nombre des polices de caractères téléchargées ?

📄 Défini en phase design par la [font-stack system](https://css-tricks.com/snippets/css/system-font-stack/) utilisable, consulter le [support](https://systemfontstack.com/) par défaut des systèmes d'exploitation. On s'attache à limiter le nombre de fontes téléchargées, par exemple à en privilégier une pour les titres et se reposer sur la stack système pour les autres.

### 4.9 Le service numérique limite-t-il les requêtes serveur lors de la saisie utilisateur ?

✅ En phase développement, nous utilisons des méthodes de [debounce](https://davidwalsh.name/javascript-debounce-function), voire de mise en cache des résultats pour réduire les requêtes.

### 4.10 Le service numérique informe-t-il l'utilisateur du format de saisie attendu, en évitant les requêtes serveur inutiles pour la soumission d'un formulaire ?

✅ En phase design et intégration, nous pensons à indiquer le format attendu pour les champs de formulaire. Nous nous reposons sur la [validation native des formulaires permise par HTML5](https://developer.mozilla.org/fr/docs/Learn/Forms/Form_validation), et si besoin incluons une bibliothèque de validation côté client/navigateur (telle que [VeeValidate](https://vee-validate.logaretm.com/)) afin d'éviter un envoi/retour inutile jusqu'au serveur.

### 4.11 Le service numérique informe-t-il l'utilisateur, avant le transfert, des poids et formats de fichier attendus ?

✅ En phase design et intégration, nous pensons à indiquer pour chaque champ d'envoi (upload) de fichier le format attendu et le poids maximal autorisé. Nous nous reposons sur [File API](https://www.w3.org/TR/FileAPI/) pour connaître le poids (`.size` en octets) et le format (`.type` [mimeType](https://mimesniff.spec.whatwg.org/#parsable-mime-type)) des fichiers avant envoi.

### 4.12 Le service numérique indique-t-il à l'utilisateur que l'utilisation d'une fonctionnalité a des impacts environnementaux importants ?

✅ En phase design, nous prévoyons d'indiquer visuellement les fonctionnalités ayant un impact environnemental important ; et permettre de choisir la solution la plus économe s'il y a des alternatives lors d'actions de l'utilisateur, dans les formulaires ou le compte utilisateur.

### 4.13 Le service numérique limite-t-il le recours aux notifications, tout en laissant la possibilité à l'utilisateur de les désactiver ?

✅ Les notifications ne sont développées qu'en cas de réel besoin défini par la _Méthodologie_ après échanges et étude ; nous prévoyons toujours de pouvoir désactiver ces notifications et de pouvoir en régler la quantité dans le compte utilisateur.

### 4.14 Le service numérique évite-t-il le recours à des procédés manipulatoires dans son interface utilisateur ?

✅ En phase design/ux, nous évitons les _dark patterns_ (interfaces trompeuses) : pas de pré-cochage de cases, pas de parcours volontairement complexes pour décourager une action (désinscription, suppression de compte), pas de formulations ambiguës dans les choix proposés à l'utilisateur. Cette démarche est cohérente avec nos engagements en accessibilité numérique.

### 4.15 Le service numérique fournit-il à l'utilisateur un moyen de contrôle sur ses usages afin de suivre et de réduire les impacts environnementaux associés ?

📄 Défini par la _Méthodologie_ et les fonctionnalités à développer : s'il y a un compte utilisateur celui-ci doit pouvoir effacer les données devenues inutiles (et effacer son propre compte par ailleurs pour respecter le RGPD).

## Contenus

### 5.1 + 5.2 Le service numérique utilise-t-il un format de fichier adapté au contenu et au contexte de visualisation de chaque image ? Le service numérique propose-t-il des images dont le niveau de compression est adapté au contenu et au contexte de visualisation ?

✅ Entre phase design et intégration, nous exportons vers les formats les plus adaptés, définis par nos [Guidelines performance](performances.md) (listant également les outils de compression conseillés). L'export ou la compression grâce aux outils mentionnés dans nos Guidelines performance, de type [Squoosh](https://squoosh.app/) ou aux modules Node intégrés. Lors de la contribution de contenu par le CMS (ex : WordPress qui génère plusieurs tailles de fichiers images) la compression peut être améliorée par [des extensions spécifiques](https://themeisle.com/blog/wordpress-image-optimizer-plugins-compared/). Usage via les [Images adaptatives](https://developer.mozilla.org/fr/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) (srcset/picture) qui permettent de délivrer le format le plus adapté au média.

### 5.3 + 5.4 Le service numérique utilise-t-il, pour chaque vidéo, une définition adaptée au contenu et au contexte de visualisation ? Le service numérique propose-t-il des vidéos dont le mode de compression est efficace et adapté au contenu et au contexte de visualisation ?

✅ Les vidéos sont servies soit à l'aide d'un service externe d'hébergement disposant de son propre lecteur et compressant+délivrant les fichiers dans les meilleurs formats/résolutions/débits (ex : YouTube, Dailymotion, Vimeo) soit auto-hébergées et (re)compressées à l'aide d'un outil approprié défini par nos [Guidelines performance](performances.md).

### 5.5 Le service numérique propose-t-il un mode « écoute seule » pour ses vidéos ?

📄 À définir en amont dans la _Méthodologie_ selon les usages : lorsque le contenu vidéo s'y prête (ex : podcasts, interviews, tutoriels), un mode audio seul peut être proposé pour réduire la bande passante. Cette fonctionnalité dépend du lecteur vidéo utilisé et du service d'hébergement (ex : YouTube ne permet pas nativement ce mode).

### 5.6 Le service numérique propose-t-il des contenus audios dont le mode de compression est adapté au contenu et au contexte d'écoute ?

✅ Les contenus audio sont servis soit à l'aide d'un service externe d'hébergement disposant de son propre lecteur et compressant+délivrant les fichiers dans les meilleurs formats/débits (ex : Soundcloud) soit auto-hébergés et (re)compressés à l'aide d'un outil approprié défini par nos [Guidelines performance](performances.md).

### 5.7 Le service numérique utilise-t-il un format de fichier adapté au contenu et au contexte d'utilisation pour chaque document ?

✅ Tous les documents mis en place initialement sont choisis ou convertis dans des formats appropriés avec une attention sur leur poids et leur usage en mobilité, en privilégiant l'[interopérabilité](interoperabilite.md). Pour tous les documents apportés par contribution ultérieure, nous conseillons sur les bonnes pratiques et formats.

### 5.8 Le service numérique a-t-il une stratégie d'archivage et de suppression, automatique ou manuelle, des contenus obsolètes ou périmés ?

📄 La stratégie dépend du CMS employé et/ou d'un script serveur régulièrement déclenché (CRON) et/ou de notifications de rappel. Elle est définie en amont pour être développée sur-mesure.

## Frontend

### 6.1 Le service numérique s'astreint-il à un poids maximum et une limite de requête par écran ?

📄 Budget performance web défini dans le cahier des charges et/ou la _Méthodologie_ (minimiser le poids global des pages par minification, compression, lazy-loading, minimiser les requêtes HTTP).

### 6.2 Le service numérique utilise-t-il des mécanismes de mise en cache pour la totalité des contenus transférés dont il a le contrôle ?

✅ La configuration du cache front-end (navigateur) est définie par en-têtes HTTP telles que [Cache-Control](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Cache-Control) avec des durées d'expiration longues, que ce soit manuellement pour les applications sur-mesure, ou à l'aide d'extensions pour les CMS (WordPress). Pour le cache back-end, voir 7.1.

### 6.3 Le service numérique a-t-il mis en place des techniques de compression pour les ressources transférées dont il a le contrôle ?

✅ Avec les CMS back-end (WordPress) la compression (minification+zip) des ressources est activée pour alléger les requêtes HTTP. Avec les frameworks front-end (Vue, Nuxt, React) le compilateur compresse automatiquement les modules.

### 6.4 Le service numérique affiche-t-il majoritairement des images dont les dimensions d'origine correspondent aux dimensions du contexte d'affichage ?

✅ Avec les CMS back-end (WordPress) les images et médias ajoutés au contenu sont générés dans des variantes adaptées au contexte d'affichage. Avec les frameworks front-end (Vue, Nuxt, React) nous intégrons des versions optimisées.

### 6.5 Le service numérique évite-t-il de déclencher le chargement de ressources et de contenus inutilisés pour chaque fonctionnalité ?

✅ Avec les CMS back-end (WordPress) les composants générés et chargés sont ceux nécessaires à la page. Avec les frameworks front-end (Vue, Nuxt, React) le lazy-loading des pages et composants évite de charger des portions de code inutiles. Nous n'utilisons pas de bibliothèque chargeant par défaut tout son contenu, par exemple en CSS Tailwind est purgé du code non utile.

### 6.6 Le service numérique restreint-il l'usage des capteurs des terminaux utilisateurs au besoin du service ?

✅ Les capteurs ne sont utilisés qu'en cas de besoin spécifique (souvent avec demande d'accord préalable, par exemple pour la géolocalisation).

### 6.7 Le service numérique héberge-t-il toutes les ressources statiques transférées dont il est l'émetteur sur un même domaine ?

✅ Par défaut, les domaines externes sont limités au maximum ; nous ne prévoyons pas de faire appel à des [CDN](https://fr.wikipedia.org/wiki/R%C3%A9seau_de_diffusion_de_contenu) hébergeant des bibliothèques JavaScript, des API, des fonts, des feuilles de styles CSS : ces ressources sont intégrées au domaine du projet.

## Backend

### 7.1 Le service numérique a-t-il recours à un système de cache serveur pour les données les plus utilisées ?

📄 Selon la typologie de projet, ce cache (API, base de données, autres requêtes spécifiques) est défini par la _Méthodologie_ : pour les CMS back-end (WordPress) les [extensions appropriées](wordpress/extensions.md) stockent sur le serveur un cache des pages, notamment pour les utilisateurs anonymes auxquels on délivre un contenu qui n'a pas besoin d'être recalculé.

### 7.2 Le service numérique met-il en place des durées de conservation sur les données et documents en vue de leur suppression ou archivage passé ce délai ?

📄 Selon la typologie de projet, les dates d'expiration des ressources sont établies, ou les dates de création du contenu auxquelles on ajoute la durée de conservation. Il peut s'agir d'un champ date en base de données, la date de création des fichiers sur le serveur, ou le préfixe de nommage utilisé pour ces fichiers (ex `2023-xxx.pdf`). Un script automatique de suppression peut être mis en place, ou une procédure d'effacement manuel, par requête dans la base de données ou sur le serveur d'hébergement (accès SSH, FTP).

### 7.3 Le service numérique informe-t-il l'utilisateur d'un traitement en cours en arrière-plan ?

✅ Les interfaces développées indiquent par un statut visuel et/ou un blocage d'une éventuelle action supplémentaire qu'il faut attendre la fin d'un traitement, notamment lors des actions au clic qui ne provoquent pas de changement de page mais un changement d'état, et lors des validations de formulaires.

### 7.4 Le service numérique s'appuie-t-il sur un mécanisme de consensus qui minimise sa consommation de ressources ?

⚖️ Ce critère concerne principalement les architectures distribuées et les technologies de type blockchain. Nos projets web n'y ont généralement pas recours ; si le besoin se présente, nous privilégions les mécanismes les moins énergivores.

## Hébergement

### 8.1 à 8.10 Le service numérique utilise-t-il un hébergement…

* ayant une démarche de réduction de son empreinte environnementale ?
* fournissant une politique de gestion durable des équipements ?
* dont le PUE (Power Usage Effectiveness) est minimisé ?
* dont le WUE (Water Usage Effectiveness) est minimisé ?
* dont l'origine de consommation d'électricité est documentée et majoritairement d'origine renouvelable ?
* dont la localisation géographique est cohérente avec ses activités et minimise son empreinte environnementale ?
* qui traite efficacement la chaleur produite par les serveurs ?
* hébergeant de façon distincte les données « chaudes » et « froides » ?
* dupliquant les données uniquement lorsque cela est nécessaire ?
* tenant compte des contraintes externes pour minimiser l'impact environnemental des calculs et transferts de données asynchrones ?

📄 Tous ces points sont pris en compte en amont du projet pour le choix de l'hébergement : nous privilégions les offres avec démarche éco-responsable, voire dans des zones neutres en carbone.

## Algorithmie

### 9.1 à 9.7 Le service numérique…

* a-t-il interrogé la nécessité d'une phase d'entraînement pour éviter un usage non justifié et déraisonné ?
* utilise-t-il une phase d'apprentissage avec un niveau de complexité minimisé et proportionné à l'usage effectif du service ?
* a-t-il mis en place des mécanismes visant à limiter la quantité d'entraînement nécessaire à son fonctionnement ?
* limite-t-il la quantité de données utilisées pour la phase d'apprentissage au strict nécessaire ?
* optimise-t-il l'occurrence de mise à jour et de réentraînement des modèles en fonction de ses besoins et des cibles utilisatrices ?
* utilise-t-il des techniques de compression pour les modèles utilisés lors de la phase d'entraînement ?
* utilise-t-il une stratégie d'inférence optimisée en termes de consommation de ressources et des cibles utilisatrices ?

📄 Cette section s'applique aux projets intégrant des composants d'intelligence artificielle ou d'apprentissage automatique. Lorsque c'est le cas, ces critères sont définis en amont dans la _Méthodologie_ : nous privilégions les modèles pré-entraînés et dimensionnés au plus juste, les techniques de compression (quantification, distillation) et les stratégies d'inférence économes en ressources. Nous savons également utiliser les techniques de réduction d'usage de tokens.

---

## En résumé

* Phase définition/spécification
  1. Mettre en place la démarche et la communiquer aux fournisseurs/interlocuteurs s'il y en a.
  2. Choisir les composants, technologies, hébergement minimisant l'impact environnemental et privilégiant les standards/l'interopérabilité/la rétro-compatibilité.
  3. Évaluer la pertinence du recours à l'IA et dimensionner les modèles au juste nécessaire.
* Phase réalisation
  1. Design : Tenir compte des usages possibles (low tech, dark mode, responsive, font stack, médias en pause par défaut), éviter les _dark patterns_.
  2. Développement : Mettre en place les optimisations/revues de code pour réduire l'impact sur les ressources (puissance, réseau, techniques de performance web) et désactiver les composants/environnements non utilisés.
  3. Mettre en place les optimisations de cache, compression, expiration du stockage.
* Phase finalisation
  1. Optimiser et affiner, post-déploiement notamment côté hébergement.

---

## Voir aussi

* [Performances](performances.md) — Optimisations qui réduisent l'empreinte.
* [Accessibilité](accessibility.md) — Sobriété et accessibilité convergent.
* [Webdesign](webdesign.md) — Choix de design responsables.
* [Interopérabilité](interoperabilite.md) — Standards ouverts et durabilité.
