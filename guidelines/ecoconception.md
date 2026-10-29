# Écoconception

> Statut : stable · Niveau : avancé

Position d'Alsacréations face au [Référentiel général d'écoconception de services numériques (RGESN, version 2024)](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/), et règles qui en découlent sur nos projets. Les bonnes pratiques génériques de sobriété et de performance web (minification, compression, lazy-loading, images responsives…) ne sont **pas** reprises ici&#8239;: voir [Performances](performances.md). Deux usages&#8239;:

1. **Réaliser un projet**&#8239;: appliquer les [règles par défaut](#règles-appliquées-par-défaut) sans qu'il soit nécessaire de les redemander.
2. **Répondre à un client ou à un appel d'offres** (déclaration d'écoconception, mémoire technique)&#8239;: s'appuyer sur la [position par critère](#position-par-critère-rgesn), sans promettre davantage.

---

## Règles appliquées par défaut

### Design / UX

- Aucun lancement automatique de média (pas d'`autoplay` sur sons, vidéos, animations)&#8239;; bouton de pause pour les animations et respect de `prefers-reduced-motion`.
- Pas de défilement infini.
- Parcours les plus directs possible vers chaque contenu et fonctionnalité.
- Composants natifs du navigateur en priorité (voir aussi [Accessibilité](accessibility.md)).
- Polices&#8239;: une seule fonte téléchargée (en général pour les titres), [pile de polices système](https://systemfontstack.com/) pour le reste.
- Pas de _dark patterns_&#8239;: aucune case pré-cochée, désinscription et suppression de compte aussi simples que l'inscription, choix formulés sans ambiguïté.
- Signaler visuellement une fonctionnalité à fort impact environnemental, et proposer l'alternative la plus sobre quand elle existe.
- Notifications seulement si le besoin est établi, toujours désactivables et réglables par l'utilisateur.

### Développement

- Saisie utilisateur déclenchant des requêtes (autocomplétion, recherche)&#8239;: _debounce_ et mise en cache des résultats.
- Formulaires&#8239;: format attendu affiché, validation native HTML d'abord, bibliothèque côté client si nécessaire (ex. [VeeValidate](https://vee-validate.logaretm.com/) en Vue) pour éviter les allers-retours serveur.
- Upload&#8239;: format et poids maximal affichés à côté du champ, vérifiés **avant envoi** via File API (`file.size`, `file.type`).
- **Aucun CDN tiers** pour les bibliothèques JS, CSS, polices ou API statiques&#8239;: toutes les ressources sont servies depuis le domaine du projet.
- Cache navigateur&#8239;: en-têtes `Cache-Control` à expiration longue (manuellement, ou par extension sur WordPress)&#8239;; fichiers de build avec _content hash_ pour des mises à jour incrémentielles.
- Ne charger que le code utile à chaque page (chargement conditionnel sur WordPress, lazy-loading des routes et composants sur Vue/Nuxt)&#8239;; aucune bibliothèque chargée dans son intégralité par défaut.
- Capteurs du terminal (géolocalisation…)&#8239;: seulement si le besoin est établi, avec demande d'accord.
- Traitement en cours (clic sans changement de page, validation de formulaire)&#8239;: indicateur visuel **et** blocage des actions répétées.
- Images, vidéos, audio&#8239;: formats et compression selon [HTML — Images](html.md) et [Performances](performances.md)&#8239;; vidéos et sons hébergés soit par un service qui adapte format et débit (YouTube, Vimeo, Soundcloud…), soit en auto-hébergement recompressé.
- HTTPS systématique, avec un TLS standard (pas de sur-chiffrement).
- Technologies open source, standards du web et [formats interopérables](interoperabilite.md) par défaut.

### Exploitation et maintenance

- Seuls les composants réellement utilisés sont mis en production.
- Avec un contrat de maintenance&#8239;: suppression **tous les deux mois** des modules inactifs (ex. extensions WordPress désactivées).
- Environnements de recette **désactivés 3 mois après la mise en production**, réactivés seulement si nécessaire. Développement en local (Docker, serveur de développement).
- Correctifs de sécurité déployés indépendamment des évolutions fonctionnelles.

---

## Position par critère RGESN

Légende&#8239;:

- ✅ **Appliqué par défaut** (32 critères)&#8239;: pris en compte sur tous les projets, et nous savons conseiller.
- 📄 **À la carte** (40 critères, dont l'hébergement et l'algorithmie)&#8239;: impacte le temps de réalisation, donc à retenir et préciser en amont dans la **_Méthodologie_** (document qui décrit, pour le projet, les démarches de réduction des impacts dans les phases UX/UI, Contenus, Front-end, Back-end), complétée par le cahier des charges et les échanges de questions/réponses.
- ⚖️ **Externe** (6 critères)&#8239;: peu ou pas de maîtrise de notre part.

| Critère(s) | Statut | Notre position |
| --- | --- | --- |
| 1.1 à 1.5 — utilité, cibles, référent, revues, objectifs | 📄 | Définis dans la _Méthodologie_. Suivi de consommation possible côté hébergement (ex. AWS)&#8239;; côté équipe, voir notre présentation «&#8239;Green IT&#8239;». |
| 1.6 — collecte de données | 📄 | Collecte limitée au strict nécessaire, en cohérence avec le [RGPD](rgpd.md). |
| 1.7 — chiffrement | ✅ | HTTPS partout, TLS standard. |
| 1.8, 1.9 — open source, standards | ✅ | Open source et standards par défaut&#8239;; méthodes partagées publiquement (Kiwipedia, articles, conférences). |
| 1.10 — API matérielles | ✅ | API web standardisées W3C/WHATWG uniquement. |
| 2.1, 2.2, 2.4, 2.5 — terminaux, anciens appareils, OS, navigateurs | 📄 | Support navigateurs/OS/terminaux fixé dans la _Méthodologie_. |
| 2.3 — bas débit, hors connexion | 📄 | Budget de poids et de temps de chargement, hors connexion si pertinent. |
| 2.6 — revues de conception et de code | 📄 | Solutions les plus sobres conseillées en amont&#8239;; revues de code sur le développement sur mesure. |
| 2.7 — maintenance et décommissionnement | ✅ | Voir [Exploitation et maintenance](#exploitation-et-maintenance)&#8239;; tree-shaking sur les frameworks. |
| 2.8 — engagement des fournisseurs | ⚖️ | Fournisseurs identifiés et impliqués si le périmètre le prévoit&#8239;; services tiers et hébergement hors périmètre par défaut. |
| 2.9, 2.10 — composants et services tiers | 📄 | Composants&#8239;: impact négligeable. Services tiers (reCAPTCHA, cartes, vidéos…) choisis au cas par cas. |
| 3.1 — architecture sobre | ⚖️ | Attention portée aux choix techniques, sans garantie possible sur toutes les dépendances. |
| 3.2 — ressources adaptatives | 📄 | Hébergement mutualisé, virtualisé ou élastique/_serverless_ dimensionné au besoin. |
| 3.3 — évolution des protocoles | ✅ | HTTP, REST, JSON, WebSocket par défaut. |
| 3.4 — correctifs sur la durée de vie | 📄 | Selon la prestation de maintenance&#8239;; correctifs proposés pendant toute la vie du projet. |
| 3.5 — correctifs indépendants des évolutions | ✅ | Oui, sauf recompilation imposée (ex. version majeure de Node). |
| 3.6 — mises à jour incrémentielles | ✅ | _Content hashing_ des builds&#8239;; mises à jour WordPress incrémentielles. |
| 3.7 — environnements hors production | ✅ | Recette coupée 3 mois après la mise en production, développement en local. |
| 4.1 — pas de lecture automatique | ✅ | Voir [Design / UX](#design--ux). |
| 4.2 — pas de défilement infini | ✅ | — |
| 4.3 — parcours optimisés | ✅ | — |
| 4.4 — activation des services tiers par l'utilisateur | ⚖️ | Dépend du service et du consentement ([RGPD](rgpd.md)). |
| 4.5 — composants natifs | ✅ | — |
| 4.6, 4.7 — médias porteurs d'information, format le plus sobre | ⚖️ | Alternative texte systématique (accessibilité)&#8239;; le choix du format relève des objectifs de communication, à arbitrer en amont. |
| 4.8 — nombre de polices | 📄 | Une fonte + pile système, arrêté en phase design. |
| 4.9 à 4.14 — requêtes à la saisie, formats de saisie, poids des fichiers, signalement des impacts, notifications, _dark patterns_ | ✅ | Voir [Règles appliquées par défaut](#règles-appliquées-par-défaut). |
| 4.15 — contrôle des usages par l'utilisateur | 📄 | Avec un compte utilisateur&#8239;: suppression des données inutiles et du compte. |
| 5.1, 5.2 — format et compression des images | ✅ | Formats imposés ([HTML](html.md)), tailles générées par le CMS, `srcset`/`<picture>`. |
| 5.3, 5.4 — définition et compression des vidéos | ✅ | Plateforme adaptative ou auto-hébergement recompressé. |
| 5.5 — mode écoute seule | 📄 | Si le contenu s'y prête et si le lecteur le permet (impossible nativement sur YouTube). |
| 5.6 — compression audio | ✅ | Plateforme adaptative ou auto-hébergement recompressé. |
| 5.7 — format des documents | ✅ | Formats légers et interopérables&#8239;; conseil aux contributeurs. |
| 5.8 — archivage et suppression des contenus | 📄 | CMS, tâche CRON ou rappels, développés sur mesure. |
| 6.1 — poids et requêtes maximum par écran | 📄 | Budget de performance au cahier des charges ou dans la _Méthodologie_. |
| 6.2 à 6.7 — cache, compression, dimensions d'images, ressources inutilisées, capteurs, domaine unique | ✅ | Voir [Développement](#développement). |
| 7.1 — cache serveur | 📄 | Selon le projet&#8239;; cache de pages par [extension](wordpress/extensions.md) sur WordPress. |
| 7.2 — durées de conservation | 📄 | Date d'expiration en base, date du fichier ou préfixe de nommage (`2023-xxx.pdf`)&#8239;; suppression par script ou procédure manuelle. |
| 7.3 — traitement en arrière-plan signalé | ✅ | Indicateur visuel et blocage des actions répétées. |
| 7.4 — mécanisme de consensus | ⚖️ | Non concerné en général (blockchain). |
| 8.1 à 8.10 — hébergement | 📄 | Pris en compte au choix de l'hébergeur&#8239;: offres éco-responsables, voire zones neutres en carbone. |
| 9.1 à 9.7 — algorithmie / IA | 📄 | Si le projet intègre de l'IA&#8239;: modèles pré-entraînés dimensionnés au plus juste, compression (quantification, distillation), inférence et usage de tokens économes. |

---

## Voir aussi

- [Performances](performances.md) — Optimisations qui réduisent l'empreinte.
- [Accessibilité](accessibility.md) — Sobriété et accessibilité convergent.
- [Webdesign](webdesign.md) — Choix de design responsables.
- [Interopérabilité](interoperabilite.md) — Standards ouverts et durabilité.
- [Les 115 bonnes pratiques d'écoconception web](https://github.com/cnumr/best-practices) · [Impact CO2 du numérique (ADEME)](https://impactco2.fr/numerique)
