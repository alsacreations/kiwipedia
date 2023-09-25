# Sécurité

Statut : Recommendation (REC)

Outils de test :

* <https://observatory.mozilla.org/>
* <https://securityheaders.com/>
* <https://www.serpworx.com/check-security-headers/>
* CSP : <https://csp-evaluator.withgoogle.com/>
* SSL : <https://www.ssllabs.com/ssltest/analyze.html>
* SSL : <https://badssl.com/>

Ressources :

* <https://www.ssi.gouv.fr/entreprise/guide/recommandations-pour-la-securisation-des-sites-web/>
* <https://www.alsacreations.com/article/lire/1723-tour-horizon-https-et-en-tetes-de-securite.html>
* <https://blog.appcanary.com/2017/http-security-headers.html>
* <https://content-security-policy.com/>

**Définition** : La notion d'origine (ou _same-origin_) indique qu'il a correspondance du protocole (http, https), du port (80) et du nom de domaine complet (avec ses sous domaines).

▶️ Les règles ci-dessous peuvent être renvoyées par n'importe quel serveur HTTP

* encapsulées sous Apache par `<IfModule mod_headers.c></IfModule>` pour ne les appliquer que lorsque le module mod_headers est bien activé
* renvoyées par le langage back (ex : PHP avec la fonction [header](https://www.php.net/manual/fr/function.header.php))
* par un CMS (ex : WordPress avec l'extension [GD Security Headers](https://wordpress.org/plugins/gd-security-headers/), mentionnée par l'ANSSI)

## Niveau 1 (base) 🥇

### Strict-Transport-Security

Indique qu'à l'avenir les navigateurs ne pourront plus se connecter au site en HTTP (si le nom de domaine est détourné vers un autre faux site).

* S'assurer qu'il n'y aura plus aucune migration de HTTP vers HTTPS.
* Définir la durée (assez longue) avec `max-age` en secondes.
* Si `preload` est ajouté, inclut le domaine dans la [liste HSTS officielle](https://hstspreload.org/).
* Si `includeSubDomains` est ajouté, tous les sous domaines sont concernés (attention!)

```apache
Header set Strict-Transport-Security "max-age=15768000; preload"
```

### X-Content-Type-Options

Empêche le navigateur d'interpréter des fichiers de ressources (ex : scripts) s'ils ne sont pas livrés avec le bon type MIME.

* S'assurer que les fichiers sont bien délivrés par le serveur avec le bon type MIME (text/javascript, text/css...), avant d'ajouter cet en-tête HTTP.

```apache
Header set X-Content-Type-Options: nosniff
```

### X-Frame-Options

Empêche le site d'être embarqué dans une iframe, pour le clickjacking notamment. Est mieux remplacé/contrôlé par frame-ancestors en Content Security Policy, mais cela ne coûte rien de l'ajouter pour les anciens navigateurs.

* S'assurer qu'il n'y a pas d'usage actuel ou prévu d'une iframe pour embarquer le site sur un autre.
* On utilise `DENY` pour tout bloquer, ou `SAMEORIGIN` pour autoriser le site à s'iframe lui-même.

```apache
Header set X-Frame-Options DENY
```

### X-Permitted-Cross-Domain-Policies

Empêche des applications Adobe telles que PDF, Flash (old!) d'utiliser du cross-domain.

```apache
Header set X-Permitted-Cross-Domain-Policies "none"
```

### X-XSS-Protection

Empêche le chargement de la page si le navigateur détecte une attaque XSS (cross-site scripting). N'est pas nécessaire si Content-Security-Policy désactive les scripts avec 'unsafe-inline', mais sert encore aux anciens navigateurs ne supportant pas CSP.

```apache
Header set X-XSS-Protection "1; mode=block"
```

### Referrer Policy

Définit comment est divulgué le referer du site courant à une page de destination, interne ou externe (= URL communiquée à la page distante dans l'en-tête HTTP Referer).

* La valeur `strict-origin-when-cross-origin` combine plusieurs règles :
  * Le referer entier (domaine + _path_) est divulgué si la requête est _same origin_ (voir définition).
  * Si on change d'origine (ex : lien vers autre site), le _path_ est supprimé (on ne dévoile que le domaine).
  * Le referer n'est pas dévoilé si on passe de HTTPS à HTTP.

Pour tout bloquer : `no-referrer`. Autres valeurs possibles : `no-referrer-when-downgrade`, `same-origin`, `origin`, `strict-origin`, `origin-when-cross-origin`, `unsafe-url`.

```apache
Header set Referrer-Policy "strict-origin-when-cross-origin"
```

Voir aussi <https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Referrer-Policy>

### Permissions Policy

Remplace _Feature-Policy_, débloque/bloque les API avancées telles que la géolocalisation, le plein écran, le microphone, d'après une [liste de clés](https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md) et de valeurs parmi :

* `*` : autorisation quelle que soit l'origine
* `self` : autorisation depuis la même origine
* `src` : définit une source précise
* `()` : interdit la fonctionnalité

```apache
Header set Permissions-Policy "fullscreen=(*), geolocation=(self), autoplay=(self), display-capture=(self), accelerometer=(), battery=(), camera=(), web-share=()"
```

Voir aussi <https://www.w3.org/TR/permissions-policy-1/> et <https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md>

---

## Niveau 2 (étendu) 🥈

### Cookies

Modifie la façon dont les cookies sont créés par le serveur via les en-têtes HTTP en ajoutant ces indications :

* L'option `HttpOnly` s'assure de ne pas rendre accessibles les cookies en JavaScript.
* L'option `Secure` assure de n'envoyer les cookies au navigateur que s'il est connecté en HTTPS.

Par exemple `Set-Cookie: nomducookie=valeur; Expires=Wed, 30 Oct 2030 13:37:00 GMT; Secure; HttpOnly`

* S'assurer qu'ils sont juste utilisés par le lanagage back-end (envoyés par le navigateur via les en-têtes HTTP de la requête) et non pas par des scripts front (par exemple avec `document.cookie`).
* S'assurer qu'en environnement de développement (http) les cookies ne sont pas bloqués par `secure`.

* Pour le cookie PHPSESSID en PHP : `ini_set('session.cookie_httponly', true);` et `ini_set('session.cookie_secure', true);`
* Avec la fonction [setcookie](https://www.php.net/manual/fr/function.setcookie.php) native de PHP, voir la documentation pour ajouter le paramètre.
* Avec d'autres frameworks, comme CodeIgniter : voir les paramètres de `set_cookie`.

#### Set-Cookie et SameSite

Définit quand envoyer (ou non) un cookie. Avec `SameSite=Strict` le cookie ne sera envoyé que si la requête provient du même site web. Avec `SameSite=Lax` les cookies sont transférables depuis le domaine actuel vers des domaines de niveaux inférieurs et seront envoyés lors de requêtes GET initialisées par des sites tiers. C'est la valeur par défaut des navigateurs les plus récents.

```apache
Header always edit Set-Cookie (.*) "$1; SameSite=Lax"
```

Voir aussi <https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Set-Cookie/SameSite> et <https://web.dev/samesite-cookies-explained/>

---

## Niveau 3 🥉

### Subresource Integrity

Permet au navigateur de vérifier que le fichier externe chargé par `<script>` ou `<link>` (feuille de styles) n'a pas été modifié depuis son hébergement initial. Un hash dérivé du contenu du fichier est calculé une seule fois, doit être ajouté dans l'attribut `integrity`, puis le navigateur vérifie l'adéquation de cette valeur avec celle calculée à la volée pour le contenu du fichier téléchargé.

```html
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
```

* Attention à regénérer un hash et à le modifier dans l'attribut si le fichier est régulièrement compilé/minifié automatiquement.
* Pour le calcul manuel on pourra s'aider de <https://www.srihash.org/> ou <https://zinoui.com/tools/sri-generator>

Voir aussi <https://developer.mozilla.org/fr/docs/Web/Security/Subresource_Integrity>

### CSP (Content-Security-Policy)

Définit précisément quels contenus (images, styles, scripts, etc), peuvent être chargés ou exécutés sur la page en fonction de leur origine/destination. Il est recommandé de partir d'un ensemble restrictif et d'ouvrir aux exceptions.

Voir aussi <https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Security-Policy>.

Exemple **à adapter absolument**

```apache
Header set Content-Security-Policy "default-src 'self' *.example.org *.gstatic.com *.googleapis.com; script-src 'self' 'unsafe-inline'; style-src 'self' fonts.googleapis.com *.example.org 'unsafe-inline'; font-src 'self' *.googleapis.com *.gstatic.com data:; img-src * data:; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
```

Exemple plus restrictif

```apache
Header set Content-Security-Policy "default-src 'self' *.example.org; script-src 'self'; style-src 'self'; font-src 'self'; img-src * data:; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
```

* `default-src` est la règle s'appliquant par défaut si rien n'est spécifié pour `style-src`, `script-src`, `font-src`, `media-src`...
* `'self'` est l'origine elle-même, `*` est le joker acceptant tout.
* `frame-ancestors 'none'` indique qu'aucun parent ne peut intégrer la page en utilisant `<frame>`, `<iframe>`, etc. Remplace `X-Frame-Options: deny`.
* `base-uri 'none'` restreint les URL qui peuvent être utilisées comme valeur d'un élément `<base>`.
* `form-action 'self'` ne permet la validation de formulaires (attribut `<form action="...">`) que sur l'origine elle-même.
* Pour les images, `data:` autorise aussi les contenus _inline_ (ex : `src='data:image/jpeg;base64, ...`).

#### Script nonce

Définit (dans CSP) que certains scripts _inline_ sont autorisés lorsqu'ils sont équipés de l'attribut `nonce="XXX"` où _XXX_ est une valeur base64 générée par le serveur à usage unique.

```apache
Content-Security-Policy: script-src 'nonce-1337c4f42c'
```

```html
<script nonce="1337c4f42c">
console.log('hop')
</script>
```

---

### Access-Control-Allow-Origin (CORS)

Fait partie de Cross-origin Resource Sharing et indique quelle origine peut accéder aux ressources, notamment pour les API front :

* Soit toutes avec `*`.
* Soit une seule origine précise (il n'est pas possible d'en indiquer plusieurs, ce qui peut être parfois problématique).

Voir aussi <https://developer.mozilla.org/fr/docs/Web/HTTP/CORS> et <https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Access-Control-Allow-Origin>.

Tout autoriser :

```apache
Header set Access-Control-Allow-Origin "*"
```

ou une origine précise :

```apache
Header set Access-Control-Allow-Origin "https://ledomaine.com"
```

ou générer en fonction du domaine interrogé (attention, si mise en cache du fichier appelé depuis plusieurs origines l'en-tête n'est pas re-généré d'un domaine à l'autre) :

```apache
SetEnvIf Origin "http(s)?://(.*.domaine.test)$" AccessControlAllowOrigin=$0
SetEnvIf Origin "http(s)?://(.*.domaine.com)$" AccessControlAllowOrigin=$0
Header set Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
```
