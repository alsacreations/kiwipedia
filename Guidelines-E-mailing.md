# Guidelines : E-mailing

Statut : Working Draft (WD)

Bonnes pratiques e-mail appliquées par l'agence web [Alsacreations.fr](https://www.alsacreations.fr/), évoluant dans le temps et adaptées à chaque nouveau projet.

## Ressources et outils

Les clients e-mails sont capricieux, interprètent le code à leur manière, ils redimensionnent s'ils le souhaitent, ils reconnaissent uniquement les styles qui leur conviennent, etc. Les bonnes pratiques habituelles y sont remplacées par des tableaux de mise en forme, de styles inline et une foule de bugs en tout genre.

- [CanIEmail](https://www.caniemail.com/) pour tester la compatibilité des clients mails
- [Maizzle](https://maizzle.com/) : framework d'intégration d'e-mails via Tailwind
- [React email](https://react.email/) : création d'emails en utilisant "React" (du JSX)
- [Fixing bugs with Outlook specific CSS](https://cm.engineering/fixing-bugs-with-outlook-specific-css-f4b8ae5be4f4)
- [Ne faites pas à vos e-mails ce que vous ne feriez pas à votre projet web](https://www.24joursdeweb.fr/2023/ne-faites-pas-a-vos-emails-ce-que-vous-ne-feriez-pas-a-votre-projet-web/)

## Supprimer les détections automatiques d'e-mails, de téléphone, etc

Lorsqu'elles sont lues par un device sur iOS, certaines données sont automatiquement détectées et interprétées. Cela concerne les numéros de téléphones, les adresses, les dates et parfois même quelques mots-clés spécifiques tels que "aujourd'hui".

Cette détection automatique est parfois gênante car elle est associée à des styles graphiques non désirés voire inaccessibles. Un moyen de s'en affranchir est d'appliquer ces balises `meta` :

```html
<meta name="format-detection" content="date=no">
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="address=no">
```

## Utiliser un Framework de construction : Maizzle

Un framework spécialisé dans l'e-mailing, tel que **[Maizzle](https://maizzle.com)**, est une aide précieuse :

- **Moteur de template** (gabarits réutilisables, inclusion de fichiers partiels, transmission de variables, ajout de conditions, de boucles, etc.)
- **Logique "email" respectée**, fichiers de configuration et de variables, prise en compte native du Responsive Webdesign
- **Respect natif des (non)Standards de l'emailing :** styles en ligne dans les balises, tableaux de mise en forme, ajout automatique d'attributs ou balises propriétaires, cellpadding, cellspacing, etc.
- **Nettoyage du code en phase de production :** CSSpurge, minification, obfuscation, suppression d'attributs et classes inutiles, etc.
- **Divers apports :** doctype, langue, notation sur 6 digits au-lieu de 3 pour les couleurs hexa, ajout de rôles ARIA tel que role=presentation, etc.
- Vue en direct dans le navigateur pour déboguage (**BrowserSync**).

La documentation de Maizzle (indispensable pour modifier / mettre à jour les fichiers) est disponible à l'adresse <https://maizzle.com>, et un [Tutoriel a été rédigé sur Alsacréations](https://www.alsacreations.com/article/lire/1817-integration-email-facile-avec-maizzle.html).

### Les outils indispensables pour développer sous Maizzle

- [Visual Studio Code](https://code.visualstudio.com/) : éditeur HTML (optionnel mais recommandé)
- [Node.js](https://nodejs.org/fr/) : Permet d'installer les autres outils, dont la commande `npm`
- [Maizzle](https://maizzle.com/) : Framework de construction d'e-mails HTML
- [Tailwind CSS](https://tailwindcss.com/) : Framework CSS sur lequel est basé Maizzle

### Installation initiale

1. Dans un Terminal (ou dans l'outil Terminal de Visual Studio Code), installation de toutes les dépendances du projet à l'aide de `npm install`
2. Installation de Maizzle via `npm i -g @maizzle/cli`

Les deux commandes principales de Maizzle sont :

```sh
# génération des pages HTML à la volée (dossier de développement)
maizzle serve

# génération finale, optimisée (dossier de production build)
maizzle build production
```

## Tableaux de mise en forme

Certains clients e-mails ajoutent une bordure de 1 pixel autour de chaque cellule de tableau. Maizzle corrige automatiquement le problème en appliquant `border-collapse: collapse;` sur les tableaux.

Gmail ne reconnaît pas systématiquement les largeurs de 100%. Lorsque `width` ne suffit pas, il est parfois nécessaire d'ajouter `min-width`. Ainsi certains tableaux de structure doivent être stylés ainsi : `<table class="w-full min-w-full">`.

Outlook impose une hauteur minimale de 17px aux `<td>`. Pour créer des séparateurs très fins, l'élément `<hr>` est parfait :

```html
<hr class="border-0 h-px bg-gray text-gray" />
<!-- ^ séparateur gris 1 pixel-->
<hr class="border-0 h-10 bg-gray text-gray" />
<!-- ^ séparateur gris 10 pixels-->
```

Pour de simples espacements verticaux, `<div>` fait l'affaire :

```html
<div class="leading-64 sm:leading-32">&nbsp;</div>
<!-- ^ séparateur 32px mobile, 64px desktop (leading = line-height)-->
```

## Grilles responsive

Une grille de colonnes responsive peut être simplement réalisée en passant les cellules en `display: block` en mobile.

Ici, deux cellules de tailles égales sur grand écran, et l'une sous l'autre sur mobile&nbsp;:

```html
<table class="w-600 sm:w-full">
  <tr>
    <td class="w-half sm:block sm:w-full">4 cols</td>
    <td class="w-half sm:block sm:w-full">8 cols</td>
  </tr>
</table>
```

Ici, deux cellules de tailles 4/12 et 8/12 sur grand écran, et l'une sous l'autre sur mobile&nbsp;:

```html
<table class="w-600 sm:w-full">
  <tr>
    <td class="w-4/12 sm:block sm:w-full">4 cols</td>
    <td class="w-8/12 sm:block sm:w-full">8 cols</td>
  </tr>
</table>
```

Ici, deux cellules inversées sur mobiles via `table-header-group` et `table-footer-group` :

```html
<table class="w-full">
  <tr>
    <th class="w-1/2 sm:table-footer-group"></th>
    <th class="w-1/2 sm:table-header-group"></th>
  </tr>
</table>
```

Voir [la démo sur Codepen](https://codepen.io/maizzle/pen/dgpxbB?editors=1000).

## Images

### Généralités

- Microsoft Outlook n'applique pas de `margin` ou `padding` sur les images. Il faut contourner le problème à l'aide d'éléments supplémentaires (balises ou cellules de tableau par exemple).
- Renseigner l'attribut `alt` pour l'accessibilité mais également pour être affiché sur les clients mails qui refusent d'afficher les images par défaut.

### Images fluides

Sur Outlook, lorsqu'une image est affichée à une taille différente de sa taille originelle, pour être fluide par exemple, il n'est pas possible de la dimensionner via CSS. L'attribut HTML `width` est obligatoire sinon l'image s'affichera toujours à la taille originelle.

Ceci ne fonctionne pas :

```html
<img src="https://picsum.photos/600/600" style="width: 300px;" />
```

Ceci fonctionne :

```html
<img src="https://picsum.photos/600/600" width="300" style="width: 300px; max-width: 100%;" />
```

Et la version Maizzle qui fonctionne :

```html
<img src="https://picsum.photos/600/600" width="300" class="w-300; max-w-full;" />
```

### Images de fond

Outlook, depuis la version 7, n'affiche plus les images de fond et nécessite un langage particulier pour les reconnaître [(Vector Markup Language - VML)](https://www.emailonacid.com/blog/article/email-development/emailology_vector_markup_language_and_backgrounds/).

Pour intégrer des images de fond, il est nécessaire de détecter Outlook (`<outlook></outlook> dans Maizzle`) puis de respecter une structure particulière (`<v:rect>`, `<v:fill>`, `<v:textbox>`, &hellip;) uniquement pour ce client mail.

D'autre part, le chemin absolu vers les images doit être précisé spécifiquement.

Plus d'information concernant ce sujet passionnant sur <https://backgrounds.cm/>

## Listes à puces

Les listes à puces ne sont pas vraiment des Composants mais nécessitent des adaptations si particulières qu'elles méritent une documentation rien que pour elles.

- Une liste à puce nécessite un code HTML sémantique pour être [reconnue par des Assistances Techniques](https://www.litmus.com/blog/the-ultimate-guide-to-bulleted-lists-in-html-email/) (pas de tableaux ou de bidouilles donc, mais des vrais `<ul></ul>` et `<li></li>`)
- Gmail a des marges/paddings totalement différents des autres clients emails
- Les versions récentes d'Outlook ne reconnaissent pas la moitié des propriétés de listes (dont `list-style-type: none`)
- Les images pour remplacer les puces d'origine sont décalées verticalement sans solution possible

Au final, la solution la plus pérenne (et simple à adapter) est l'usage d'un pseudo-élément `:before`, reconnu sur [la moitié des clients email](https://www.caniemail.com/search/?s=before), les autres afficheront une version dégradée en puce simple colorée.

Le code HTML et CSS pour styler les listes à puces est aussi élégant que ceci&nbsp;:

```html
<!-- liste -->
<ul type="disc" class="list-disc pl-16">
  <!-- item de liste de puce couleur "pink" -->
  <li class="bullet text-pink" style="mso-list: bullet">
    <!-- contenu d'un item de liste -->
    <div class="ml-4 text-black">Contenu d'un item de liste</div>
    <!-- fin d'un item de liste -->
  </li>
</ul>
```

```css
@list bullet {
  mso-level-number-format: bullet;
  mso-level-text: ●;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .bullet {
    list-style-type: none;
  }
  .bullet:before {
    content: '\25CF';
    float: left;
    margin-left: -1.4em;
  }
  [class='x_bullet'] {
    list-style: initial !important;
  }
  [data-outlook-cycle] .bullet {
    list-style: initial !important;
  }
}
```

## Google Fonts

[Documentation Maizzle](https://maizzle.com/docs/google-fonts/#google-fonts)

- La famille de police est déclarée sous forme de variable globale dans le template. Par exemple `googleFonts: "Prompt:wght@200;400;700&display=swap"`
- Elle est importée dans le Layout `master.html` à l'aide d'un `<link href="https://fonts.googleapis.com/css2?family={{ page.googleFonts }}" rel="stylesheet" media="screen" />`
- Elle devient également une classe utilitaire dans `tailwind.config.js` sous le nom de `font-prompt` par exemple.

Les polices de caractères "exotiques", importées, telles que Prompt sont [mal reconnues des clients email](https://www.caniemail.com/features/css-at-font-face/). Le choix a été fait de proposer une famille de police classique "sans-serif" considérée comme ["safe" sur tous les devices](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals#Web_safe_fonts)&nbsp;: `"-apple-system", "Segoe UI", "Helvetiva", "Arial", "sans-serif"`.

## Boutons

Outlook ne reconnaît pas les coins arrondis (`border-radius`) ni les `margin` et `padding` sur les éléments inline (même en les transformant en `inline-block`)

Voici comment réaliser un lien-bouton "simple" via Maizzle :

```html
<a
  href="TODO:"
  class="inline-block py-16 px-24 text-sm leading-none no-underline text-white font-semibold rounded bg-indigo-500 hover:bg-indigo-600"
>
  <outlook>
    <i class="tracking-24" style="mso-font-width: -100%; mso-text-raise: 26pt;">&nbsp;</i>
  </outlook>
  <span style="mso-text-raise: 13pt;">Read more</span>
  <outlook>
    <i class="tracking-24" style="mso-font-width: -100%;">&nbsp;</i>
  </outlook>
</a>
```

Explications :

- `leading-none` = `line-height: 1;`
- `tracking-24` = `letter-spacing: 24;`
- `<outlook></outlook>` = `<!--[if mso]><![endif]-->`
- L'élément `<i>` sert à contourner les margin/paddings manquants. Sa taille de police est réduite à zéro (`mso-font-width: -100%;`) et la largeur occupée est définie par `tracking-24`
- `mso-text-raise` sert à [rectifier la position verticale](https://cm.engineering/fixing-bugs-with-outlook-specific-css-f4b8ae5be4f4) des éléments sur Outlook.

Pour un bouton plus complexe, nécessitant par exemple une hauteur précise ou un picto, une structure tabulaire sera nécessaire :

```html
<table>
  <tr>
    <th class="bg-indigo-500 hover:bg-indigo-600 rounded" style="mso-padding-alt: 12px 48px;">
      <a href="TODO:" class="block text-white text-sm leading-full py-12 px-48 no-underline">Button</a>
    </th>
  </tr>
</table>
```

Et voici une version sous forme de **Composant** :

```html
<!-- Composant Bouton (index.html) -->
<component
  src="src/components/button.html"
  locals='{
  "buttonURL": "TODO:",
  "buttonBg": "bg-green",
  "buttonColor": "text-black",
  "buttonIcon": "picto-03.png",
  "buttonIconAlt": "OK"
}'
>
  Créer un compte
</component>
```

```html
<!-- components/button.html -->
<table>
  <tr>
    <th class="{{ buttonBg }} rounded-full" style="mso-padding-alt: 8px 12px">
      <a href="{{buttonURL}}" class="leading-full block py-8 px-12 text-12 font-bold {{ buttonColor }} no-underline">
        <if condition="buttonIcon">
          <img src="images/{{buttonIcon}}" width="16" alt="{{buttonIconAlt}" />
          <outlook>
            <i class="tracking-4" style="mso-font-width: -100%">&nbsp;</i>
          </outlook>
        </if>
        <span style="mso-line-height-rule: exactly; mso-text-raise: 4px">
          <content></content>
        </span>
      </a>
    </th>
  </tr>
</table>
```
