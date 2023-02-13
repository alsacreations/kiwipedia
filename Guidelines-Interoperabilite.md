# Interopérabilité RGI

Guidelines pour respecter au mieux le [RGI](https://www.numerique.gouv.fr/publications/interoperabilite/)

Nous privilégions quoiqu'il arrive par défaut les standards et formats ouverts conçus et promus par

* La [DISIC](https://www.modernisation.gouv.fr/) (Direction Interministérielle des Systèmes d’Information et de Communication)
* L'[ECMA](http://www.ecma-international.org/) (European association for standardizing information and communication systems)
* L'[IEEE](https://www.ieee.org/) (Institute of Electrical and Electronics Engineers)
* L'[IETF](https://www.ietf.org/) (The Internet Engineering Task Force)
* L'[ISO](https://www.iso.org/) (Organisation Internationale de Normalisation)
* Le [W3C](https://www.w3.org/) (World Wide Web Consortium)

## Inventaire

### Les langages, technologies et frameworks open-source

* Les standards du W3C : HTML, CSS, DOM - [licence](https://www.w3.org/Consortium/Legal/copyright-documents)
* Le standard [ECMAScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) (JavaScript) - [licence BSD](https://tc39.es/ecma262/#sec-copyright-and-software-license)
* Langages back-end : PHP - [licence Open Source](https://www.php.net/license/index.php)
* [MySQL](https://www.mysql.com/fr/) ou [MariaDB](https://mariadb.com/) - [licence GPL v2](https://mariadb.com/kb/fr/licences-de-mariadb/)
* CMS : [WordPress](https://wordpress.org/) - [licence GPLv2](https://wordpress.org/about/license/)
* Tous nos hébergements et serveurs sont sous système Linux 🐧

### Les formats standardisés et ouverts

* [JSON](https://www.json.org/) - [licence](https://www.json.org/license.html)
* [XML](https://www.w3.org/XML/) - standard W3C
* [PNG](https://www.w3.org/TR/png/) - standard W3C
* [WebP](https://developers.google.com/speed/webp?hl=fr) - format ouvert
* [JPEG](https://jpeg.org/jpeg/) - standard ISO fortement inter-opérable
* [AVIF](https://github.com/AOMediaCodec/libavif) - [licence BSD](https://fr.wikipedia.org/wiki/Licence_BSD)

Pour la compression et l'archivage : `tar.gz` (tar + gzip), voire zip, bzip2

Pour les documents bureautiques : [OpenDocument](https://fr.wikipedia.org/wiki/OpenDocument) utilisé et reconnu par les suites telles que LibreOffice, Google Workspace, Microsoft Office ; [PDF](https://www.adobe.com/acrobat/about-adobe-pdf.html) (format ouvert et norme ISO) ; [iCal](https://www.ietf.org/rfc/rfc2445.txt) (standard de l'IETF).

### Les protocoles et architectures standards

* HTTP et [CORS](https://fetch.spec.whatwg.org/#cors-protocol)
* [REST](https://fr.wikipedia.org/wiki/Representational_state_transfer) et ses six contraintes architecturales
* graphQL
* Et les protocoles les plus courants du modèle OSI : IP, TCP, UDP, TLS, FTP, SSH, DNS, SMTP, IMAP, WebRTC

## Bonnes pratiques

* Privilégier REST avec JSON pour les échanges de données via API.
* Privilégier IPv6 par défaut.
* Toujours encoder en [UTF-8](https://fr.wikipedia.org/wiki/UTF-8).
* Pour les médias audio/vidéo, situation plus délicate car souvent soumis à des licences restrictives, nous privilégions le standard "de facto" et proposons des alternatives techniques le cas échéant.
