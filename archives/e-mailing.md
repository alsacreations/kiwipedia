# E-mailing

> Statut : stable · Niveau : intermédiaire

Conventions **spécifiques à Alsacréations** pour l'intégration d'e-mails HTML. Les contraintes génériques du média (tableaux de mise en forme, styles inline, hacks Outlook `mso-*`, support fragmenté des clients) ne sont **pas** détaillées ici&#8239;: elles sont déjà maîtrisées par défaut. Ce document ne liste que l'outil imposé et les recettes propres à l'agence pour les cas les plus problématiques.

---

## Outillage imposé&#8239;: Maizzle

> ✅ **Par défaut** — [Maizzle](https://maizzle.com/) (framework basé sur Tailwind CSS) pour tout projet e-mailing, plutôt que du HTML/CSS écrit à la main ou React Email. Gère nativement le moteur de template, la purge/minification CSS en production, et les (non-)standards de l'e-mailing (styles inline, tableaux, attributs propriétaires). Documentation&#8239;: [maizzle.com](https://maizzle.com), [tutoriel interne](https://www.alsacreations.com/article/lire/1817-integration-email-facile-avec-maizzle.html).

```sh
maizzle serve              # dev, génération à la volée
maizzle build production   # build final optimisé
```

Tester la compatibilité client avec [CanIEmail](https://www.caniemail.com/) avant livraison.

## Détection automatique iOS

Désactiver systématiquement la détection auto (téléphone, date, adresse) qui applique des styles graphiques non désirés&#8239;:

```html
<meta name="format-detection" content="date=no" />
<meta name="format-detection" content="telephone=no" />
<meta name="format-detection" content="address=no" />
```

## Tableaux et grilles

- Gmail ignore parfois `width: 100%`&#8239;: compléter avec `min-width` (`class="w-full min-w-full"`).
- Outlook impose 17px de hauteur mini aux `<td>`&#8239;: utiliser un `<hr>` pour un séparateur fin plutôt qu'une cellule vide.
- Espacement vertical simple&#8239;: `<div>` avec une classe `leading-*` (line-height) plutôt qu'un `margin`.
- Grille responsive&#8239;: cellules en `display: block` sur mobile (`sm:block sm:w-full`) — voir [démo Codepen](https://codepen.io/maizzle/pen/dgpxbB?editors=1000).

```html
<table class="w-600 sm:w-full">
  <tr>
    <td class="w-half sm:block sm:w-full">4 cols</td>
    <td class="w-half sm:block sm:w-full">8 cols</td>
  </tr>
</table>
```

## Images

- SVG/WebP/AVIF mal supportés à ce jour&#8239;: JPEG/PNG only ([support par format](https://www.caniemail.com/features/image-webp/)).
- Outlook n'applique aucun `margin`/`padding` sur une image&#8239;: encadrer d'un élément supplémentaire (cellule, `<div>`) si besoin d'espacement.
- Image fluide sur Outlook&#8239;: l'attribut HTML `width` est obligatoire en plus du CSS, sinon l'image garde sa taille d'origine&#8239;:

```html
<img src="…" width="300" style="width: 300px; max-width: 100%;" />
```

- Image de fond&#8239;: Outlook exige du VML (pas de `background-image` natif) — détecter le client via `<outlook></outlook>` (Maizzle) et fournir une structure `<v:rect>`/`<v:fill>` dédiée. Détails&#8239;: [backgrounds.cm](https://backgrounds.cm/).

## Listes à puces

Code HTML sémantique obligatoire (`<ul>`/`<li>`, jamais de tableaux/bidouilles) pour rester reconnu par les technologies d'assistance. Solution retenue face aux incohérences inter-clients (Gmail aux marges différentes, Outlook récent ignorant `list-style-type: none`, images de puce décalées verticalement sans solution)&#8239;: pseudo-élément `::before`, reconnu par la moitié des clients ([support](https://www.caniemail.com/search/?s=before)), dégradation propre en puce simple colorée sur les autres.

```css
.bullet {
  list-style-type: none;
}
.bullet:before {
  content: '\25CF';
  float: left;
  margin-left: -1.4em;
}
```

## Polices

Choix assumé&#8239;: pas de police "exotique" importée (Google Fonts) — mal reconnue par la majorité des clients mail ([support `@font-face`](https://www.caniemail.com/features/css-at-font-face/)). Pile de police système "safe" utilisée par défaut&#8239;: `"-apple-system", "Segoe UI", "Helvetica", "Arial", "sans-serif"`. Si une police importée est malgré tout requise sur un projet, voir la [doc Google Fonts de Maizzle](https://maizzle.com/docs/google-fonts/#google-fonts).

## Boutons

Outlook ignore `border-radius` et `margin`/`padding` sur les éléments inline (même transformés en `inline-block`). Pattern Maizzle pour un bouton simple, avec correctifs `<outlook>` (= `<!--[if mso]>…<![endif]-->`)&#8239;:

```html
<a href="…" class="inline-block py-16 px-24 rounded bg-indigo-500 text-white no-underline">
  <outlook><i class="tracking-24" style="mso-font-width: -100%; mso-text-raise: 26pt;">&nbsp;</i></outlook>
  <span style="mso-text-raise: 13pt;">Read more</span>
  <outlook><i class="tracking-24" style="mso-font-width: -100%;">&nbsp;</i></outlook>
</a>
```

Pour un bouton complexe (hauteur précise, picto)&#8239;: structure tabulaire, packagée en composant Maizzle réutilisable plutôt que dupliquée à chaque usage&#8239;:

```html
<!-- index.html -->
<component src="src/components/button.html" locals='{ "buttonURL": "…", "buttonBg": "bg-green" }'>
  Créer un compte
</component>
```

---

## Voir aussi

- [HTML](html.md) — Sémantique de base.
- [Accessibilité](accessibility.md) — Contrastes et lecteurs d'écran dans les mails.
- [Webdesign](webdesign.md) — Maquettage adapté aux contraintes des clients mails.
