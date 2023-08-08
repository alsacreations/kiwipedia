# Guidelines : Performances

Statut : Working Draft (WD)

Bonnes pratiques de Performance Web appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/), évoluant dans le temps et adaptées à chaque nouveau projet.

---

## Bonnes pratiques HTTP

Valable pour HTTP/1.x, plus forcément pour HTTP/2 et HTTP/3 qui permettent le multiplexing et diverses optimisations natives.

- Minifier les ressources texte (css, js, html)
  - Vue/Nuxt/React : déjà optimisé de base
  - WordPress : utiliser une extension
- Compresser les ressources texte (css, js, html) par exemple avec gzip/deflate
- Réduire le nombre de requêtes HTTP
- Exploiter les en-têtes de cache (Cache-Control, Expires)
  - [Cache-Control for Civilians - CSS Wizardry](https://csswizardry.com/2019/03/cache-control-for-civilians/)
  - [Expires - Apache](https://httpd.apache.org/docs/current/fr/mod/mod_expires.html)

## Core Web Vitals

Les [Core Web Vitals](https://web.dev/vitals/) regroupent des mesures de performance et d'expérience utilisateur. Google considère que ces indices sont essentiels pour la performance et l'expérience utilisateur et les intègre dans son algorithme de Ranking depuis 2021.

Les métriques mesurées sont :

- **Largest Contentful Paint (LCP)** : mesure la vitesse de chargement de page. L'indice porte sur le temps de chargement et d'affichage de la plus grande image ou du plus grand bloc de contenu visible dans le viewport. Le critère est "Good" lorsque ce temps est inférieur ou égal à 2.5 secondes.
- **First Input Delay (FID)** : mesure l'interactivité. Calcule le temps nécessaire au navigateur pour offrir une première interaction avec le visiteur (clic sur un lien, un bouton, interagir avec un formulaire) L'expérience est considérée réussie si ce délai est inférieur ou égal à 100 millisecondes.
- **Cumulative Layout Shift (CLS)** : mesure la stabilité visuelle (l'ensemble des repositionnements, redimensionnements, décalages intempestifs des contenus pendant la durée de vie d'une page web). La métrique mesure la quantité de contenu qui se déplace, ainsi que la distance de déplacement. Le CLS doit être égal ou inférieur à 0.1.

Voir aussi [Our top Core Web Vitals recommendations for 2023](https://web.dev/top-cwv-2023/)

## Bonnes pratiques générales

On veillera à respecter des critères communs de performance :

- Limiter le nombre de ressources différentes exploitées et donc de requêtes HTTP (images, feuilles de styles, scripts, fonts).
- Minifier les ressources texte (CSS, JavaScript, JSON...)
- Utiliser des formats de fichiers modernes (WEBP, Avif, WOFF2)
- Différer les requêtes moins importantes (lazy loading) (en JavaScript ou avec l'attribut natif `loading`)
- Utiliser les attributs qui confèrent des indications de pré-chargement (`async`, `defer`, `rel=preload` ou `fetchpriority`)
- Établir [un budget de performance pour Lighthouse](https://bitsofco.de/your-first-performance-budget-with-lighthouse/)

Plus de détails sur ces généralités dans les parties détaillées suivantes.

## Modes de positionnement CSS

Les modes de positionnement CSS ne sont pas tous égaux en ce qui concerne les [Layout Shifts](https://www.paris-web.fr/2022/conferences/tu-fais-du-web-et-tu-ne-connais-pas-les-layout-shifts-nan-mais.php).

- **Flexbox :** Conçu pour s'adapter aux contenus. Designé pour être fluide par défaut. Plus sensible aux *Layout Shifts*.
- **Grid Layout :** Conçu pour englober les contenus. Grid Layout est designé pour être rigide par défaut. Globalement moins sensible aux *Layout Shifts*.

De manière générale :

- Utiliser *Grid Layout* en priorité tant que possible, et *Flexbox* si nécessaire.
- Limiter les valeurs automatiques, dépendantes du contenu (`auto`, `flex-grow`, `flex-shrink`, `1fr`, `min-content`, `max-content`, `stretch`)
- `grid-template-columns: 1fr 1fr 1fr;` est conseillé par rapport à `grid-auto-flow: column;`
- `flex: 1;` est conseillé par rapport à `flex-grow: 1;`
- `flex: 1; min-width: 0` est conseillé par rapport à `flex: 1;`
- `grid-template-columns: minmax(0,1fr);` est conseillé par rapport à `grid-template-columns: 1fr;`

Plus d'info : <https://http203-playlist.netlify.app/videos/avoiding-layout-shift-by-putting-the-css-in-charge/>​

## Aides au pré-chargement de ressources

Le parseur HTML du navigateur est souvent bloqué par deux types de ressources :

- les éléments `<link>` qui établissent notamment un lien vers une feuille de styles.
- les éléments `<script>` qui ne disposent pas d'attributs `async` ni `defer`.

Depuis 2008, un second mécanisme parallèle entre en jeu sur l'ensemble des navigateurs : celui du **"Preload Scanner"**. Ce second parseur agit lorsque le parseur HTML est bloqué sur une ressource et pré-charge les ressources suivantes indiquées dans le markup HTML.

Cela signifie que certains éléments placés hors HTML ne participeront pas à cette recherche anticipée&nbsp;: c'est le cas des polices et des images de fond appelées dans les fichiers CSS, mais également des liens ou ressources situées dans des scripts.

Ce mécanisme est automatique, mais il est possible de l'influencer en proposant le pré-chargement de certaines ressources en priorité en agissant sur les ["Priority Hints"](https://web.dev/priority-hints/) tels que `async`, `defer`, `rel=preload` ou `fetchpriority`

### `async` et `defer`

Ces attributs sont liés au chargement des scripts. Dans les deux cas, ces attributs rendent le chargement asynchrone et ne bloquent pas le paseur HTML&nbsp;:

- `async` est exécuté dès que le navigateur en a la possibilité, les différentes ressources en *async* sont potentiellement chargées dans n'importe quel ordre.
- `defer` est exécuté lorsque tout le DOM est parsé, les ressources sont chargées dans l'ordre dans lequel elles sont placées dans le DOM.

`async` est "prioritaire" sur `defer`.

```html
<script async src="script.js">
<script defer src="script.js">
```

### `rel=preload`

Cette déclaration demande au navigateur de découvrir et charger une ressource en priorité avant que le parseur ne l'atteigne. Elle est également particulièrement utile pour tous les assets non indiqués dans le markup HTML.

Exemple de pré-chargement de police&nbsp;:

```html
<!-- Dans le <head> après
     la feuille de styles pour ne pas la bloquer -->
<link rel="preload" as="font" href="kiwi.woff2" 
      type="font/woff2" crossorigin="anonymous">
```

*(Note : ici `crossorigin="anonymous"` n'est utile que si la police n'est pas auto-hébergée)*

Exemple de pré-chargement d'image&nbsp;:

```html
<link rel="preload" as="image" href="hero.webp">
```

*Priorité "Mandatory" (obligatoire) : cette fonctionnalité doit être traitée en priorité par le navigateur.*

### `fetchpriority`

L'attribut `fetchpriority` informe le navigateur du degré de priorité du pré-chargement d'une ressource. Il est possible de l'appliquer sur l'élément `<link>` mais aussi directement sur `<img>`, `<script>` et `<iframe>`.

Les valeurs possibles sont "high" (haute priorité), "low" (basse priorité) et "auto" (valeur par défaut).

Quelques exemples :

```html
<!-- Ce script doit être pré-chargé 
     mais d'autres ressources sont prioritaires -->
<link rel="preload" href="script.js" as="script" fetchpriority="low">

<!-- Cette image de fond critique 
     est hautement prioritaire -->
<link rel="preload" as="image" href="hero.webp" fetchpriority="high">

<!-- Cette image doit être pré-chargée
     mais n'est pas vraiment critique -->
<img src="sausage.svg" alt="je ne suis pas importante" fetchpriority="low">
```

Avec l'exemple d'images d'un carousel :

```html
<ul class="carousel">
  <img src="img/carousel-1.jpg" fetchpriority="high">
  <img src="img/carousel-2.jpg" fetchpriority="low">
  <img src="img/carousel-3.jpg" fetchpriority="low">
  <img src="img/carousel-4.jpg" fetchpriority="low">
</ul>
```

(source de l'exemple : <https://web.dev/priority-hints/>)

*Priorité "Hint" (indice) : cette fonctionnalité est une simple indication pour le navigateur.*

### `preconnect` et `dns-prefetch`

Ces attributs sont liés au chargement des ressources externes (non hébergées localement).

- `rel="preconnect"` informe le navigateur que l'on souhaite établir une connexion le plus rapidement possible à une autre plateforme.
- `rel="dns-prefetch"` ne fait que résoudre le nom de domaine sans toutefois atteindre la ressource indiquée.

```html
<link rel="preconnect" href="https://example.com">
<link rel="dns-prefetch" href="https://example.com">
```

Pour en savoir plus sur l'usage de ces attributs : [Optimisation des pré-chargements avec prefetch, dns-prefetch et prerender](https://www.alsacreations.com/astuce/lire/1567-prefetch-prerender-dns-prefetch-link.html)

*Priorité "Hint" (indice) : cette fonctionnalité est une simple indication pour le navigateur.*

### Lazyloading

L'attribut `loading` permet de ne charger que les images situées au dessus de la ligne de flottaison. Les autres images ne sont alors chargées que lorsque cela devient nécessaire, au fur et à mesure que l'utilisateur scrolle (défile). On améliore ainsi le temps de chargement initial de la page.

- `loading="eager"` : l'image est chargée immédiatement, qu'elle soit située dans ou hors de la fenêtre visible (valeur par défaut).
- `loading="lazy"` : le chargement est retardé jusqu'à ce que l'usager scrolle et s'approche du bas de la fenêtre du navigateur.

```html
<img src="image.webp" loading="lazy" width="" height="" alt="">
<iframe src="video-player.html" loading="lazy" title=""></iframe>
```

Quelques ressources :

- [Définition générale du lazy loading par MDN](https://developer.mozilla.org/fr/docs/Web/Performance/Lazy_loading)
- Attribut `loading="lazy"` pour les images <https://www.alsacreations.com/astuce/lire/1811-chargement-images-differe-loading-lazy.html>

## Images

- Toujours indiquer les dimensions initiales de l'image (`width` et `height`) dans le HTML pour que le navigateur puisse calculer le **ratio** et éviter des Layout Shifts.
- Utiliser des formats d'images modernes et plus légers (Webp, Avif) à condition que le processus d'encodage/décodage soit lui-même rapide.
- `max-width: 100%` pour que l'image s'adapte en largeur à son conteneur (images fluides).
- `height: auto` pour que le navigateur applique le ratio systématiquement.
- `background-color` sur l'image pour indiquer visuellement l'espace qui sera occupé quand elle sera chargée (placeholder).

### Code recommandé

```html
<!-- Dimensions initiales de l'image -->
<img src="image.webp" alt="" width="2000" height="1000">
```

```css
img {
  max-width: 100%; /* largeur fluide */
  height: auto; /* ratio préservé */
  background: gray; /* placeholder en attendant */
}
```

### Outils d'optimisation d'images

- Universel en ligne : <https://squoosh.app/> avec aperçu avant/après, redimensionnement, autres options (PNG, JPEG, WEBP)
- MacOS : <https://github.com/antonreshetov/image-optimizer> très facile par drag&drop et traitement par lot (PNG, JPEG, GIF, SVG) ou <https://imageoptim.com/fr>
- SVG : <https://jakearchibald.github.io/svgomg/>
- AVIF : <https://avif.io> en ligne ou <https://github.com/lovell/avif-cli> en ligne de commande
- <https://sharp.pixelplumbing.com>
- <https://www.smashingmagazine.com/2022/07/powerful-image-optimization-tools/>

### Outils d'optimisation vidéo et audio

- [Handbrake](https://handbrake.fr/)
- [Audacity](https://www.audacityteam.org/)

## Polices (fonts)

Autant que possible, privilégier le chargement de polices légères et respectueuses des performances. Limiter le nombre de ces polices à 2, voire 3 grand maximum.

### Recommandations générales

- Privilégier la police système `system-ui` pour les textes de contenus (raison : performance + UX + Layout Shifts).
- Privilégier le format `.woff2` (et `.woff` en alternative).
- Limiter à 2 ou 3 fichiers de police au maximum (regular, bold, italic), sinon préférer une [Variable Font](https://v-fonts.com/) (voir la partie dédiée ci-dessous)
- Utiliser la directive `<link rel="preload">` pour charger les polices de manière asynchrone.
- Ajouter `font-display: swap;` au sein de la règle `@font-face` pour éviter les effets de FOIT. Si la police est pré-chargée, `font-display: optional;` est alors recommandé.
- Héberger la police sur son propre serveur (voir l'outil "Google Webfont Helper").

### Code recommandé

Voici un exemple de chargement de police conseillé (cas de deux fichiers de police regular et bold)&nbsp;:

```html
<!-- Dans le <head> après
     la feuille de styles pour ne pas la bloquer -->
<link rel="preload" as="font" href="kiwi.woff2" 
      type="font/woff2" crossorigin="anonymous">
```

⚠️ Noter ci-dessous que le nom de la font-family est toujours le même ("kiwi") et qu'il ne faut pas confondre avec le nom du fichier.

```css
@font-­face {
  font-­family: "kiwi";
  src: url("kiwi.woff2") format("woff2"), 
    url("kiwi.woff") format("woff"); /* dans cet ordre */
  font-weight: normal;
  font-style: normal;
  font-display: optional; /* on évite les layout shifts */
}
@font-­face {
  font-­family: "kiwi";
  src: url("kiwi-bold.woff2") format("woff2"), 
    url("kiwi-bold.woff") format("woff");
  font-weight: bold;
  font-style: normal;
  font-display: optional;
}
```

### Google Webfont Helper

[Google Webfont Helper](https://gwfh.mranftl.com/fonts) génère le code CSS nécessaire, optimise finement les fichiers et permet de les héberger sans faire appel à Google en choisissant le bon subset (latin, latin-ext, etc.), les variantes (normal, bold, italic, etc.)

### Cas des Variable Fonts

Les variable fonts sont des familles de polices intégrant diverses variantes (dites "axis") au sein d'un même fichier. Il peut s'agir de graisses, italique, stretch voire de toute autre variante personnalisée par l'auteur de la fonte.

Une variable font est systématiquement recommandée dès lors qu'un projet nécessite plus de 3 variantes parmi celles-ci : regular, italic, light, semi-bold, bold, bold italic, etc. Cette fonctionnalité est aujourd'hui reconnue par plus de 95% des navigateurs.

Comme pour les fontes classiques, le format `.woff2` ainsi que l'hébergement de la fonte sont préconisés (les fontes variables peuvent être trouvées sur [Google Fonts](https://fonts.google.com/?vfonly=true) en activant la case "show only variable fonts" puis téléchargées en `.ttf` via le bouton "Download family". Un convertisseur tel que [Cloud converter](https://cloudconvert.com/ttf-to-woff2) pourra produire la version `.woff2`.

#### Code recommandé

Voici un exemple de chargement de variable font conseillé&nbsp;:

```css
@font-face {
  font-family: 'Work Sans';
  src: url('./fonts/WorkSans-VariableFont_wght.woff2') format('woff2-variations');
  font-display: swap;
  font-weight: 100 900;
}
```

#### Modification des axis

Toutes les variantes d'une fonte variable sont modifiables via la propriété `font-variation-settings`. Certains de ces axis sont normalisés et disposent d'un équivalent en propriété CSS :

| Axe 	    | Propriété CSS  	|
|---	    |---	            |
| "wght" 	| `font-weight`  	|
| "wdth"	| `font-stretch`  	|
| "slnt" 	| `font-style` oblique + angle  	|
| "ital" 	| `font-style: italic`  	|
| "opsz" 	| `font-optical-sizing`  	|

Ainsi, pour modifier la graisse d'une police, les deux syntaxes sont possibles : `font-variation-settings: 'wght' 625;` ou `font-weight: 625;`. Il est même possible de passer par une variable CSS ainsi `font-variation-settings: 'wght' var(--text-axis);`

## Icônes

Voir [Guidelines Icônes](Guidelines-Icones.md).

## Hébergement

- [AWS Cloudfront supporte HTTP/3](https://aws.amazon.com/fr/blogs/aws/new-http-3-support-for-amazon-cloudfront/)

## Outils d'audit de performance

- <https://web.dev/measure/>
- <https://gtmetrix.com/>
- <https://www.webpagetest.org/>
- <https://tools.pingdom.com/>
- Lighthouse dans les devtools, dont l'extension pour Firefox <https://addons.mozilla.org/fr/firefox/addon/google-lighthouse/>

## Autres checklists et ressources

- <https://github.com/thedaviddias/Front-End-Performance-Checklist>
- <https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/>
- <https://browserdiet.com/>
- <https://perf.rocks/>

## Performance côté serveur (back-end) et cache

- WordPress : utiliser une extension de cache, voir [Guidelines WordPress](Guidelines-WordPress.md)
- PHP : [Tutoriel : Comprendre et utiliser un système de cache PHP](http://sdz.tdct.org/sdz/comprendre-et-utiliser-un-systeme-de-cache-php.html) ou [PHP Cache](https://www.php-cache.com/)
- [Varnish](https://varnish-cache.org/)
- [k6](https://k6.io/) pour les tests de charge
