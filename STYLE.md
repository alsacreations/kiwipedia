# Guide de style éditorial

> Statut : stable · Niveau : tous

**TL;DR** — Toute fiche Kiwipedia adopte le même en-tête, la même palette d’emojis sémantiques, la même typographie française et les mêmes blockquotes typés.

## Sommaire

- [En-tête de fiche](#en-tête-de-fiche)
- [Métadonnées](#métadonnées)
- [Emojis sémantiques](#emojis-sémantiques)
- [Blockquotes typés](#blockquotes-typés)
- [Typographie française](#typographie-française)
- [Liens et références](#liens-et-références)
- [Code](#code)
- [Séparateurs](#séparateurs)
- [Footer « Voir aussi »](#footer-voir-aussi)

---

## En-tête de fiche

Toute fiche commence par un H1 unique, suivi d’une ligne de métadonnées en blockquote, d’un TL;DR et d’un sommaire manuel.

```markdown
# [Sujet]

> Statut : stable · Niveau : avancé

**TL;DR** — Une à deux phrases qui résument l’essentiel.

## Sommaire

- [Section 1](#section-1)
- [Section 2](#section-2)
```

Un fichier `.template.md` à la racine du dépôt fournit ce squelette prêt à dupliquer.

## Métadonnées

| Champ | Valeurs autorisées |
| --- | --- |
| **Statut** | `stable` · `draft` · `expérimental` · `archivé` |
| **Niveau** | `débutant` · `intermédiaire` · `avancé` · `tous` |
| **Lecture** | Estimation à 200&#8239;mots/min, arrondie aux 5 minutes |
| **MAJ** | Date au format `AAAA-MM-JJ` |

## Emojis sémantiques

Palette restreinte&#8239;: chaque emoji a un rôle précis. Pas d’usage décoratif.

| Emoji | Rôle |
| --- | --- |
| ✅ | Bonne pratique, recommandation |
| ❌ | À éviter, anti-pattern |
| ⚠️ | Attention, piège fréquent |
| 💡 | Astuce, conseil |
| 🔗 | Référence externe |
| 📦 | Dépendance, outil |
| 🚧 | En cours, work-in-progress |

Les sections du README peuvent utiliser des emojis de **navigation** (🚀 🧱 🧩 ✅ 🎨 📚 🔗) en supplément, mais jamais à l’intérieur des fiches.

## Blockquotes typés

Quatre formes seulement, toujours préfixées par leur emoji et leur libellé en gras.

```markdown
> ✅ **Bonne pratique** — Préférer les attributs `aria-*` natifs aux solutions JavaScript.
> ❌ **À éviter** — Imbriquer des `<button>` dans des `<a>`.
> ⚠️ **Attention** — `display: contents` casse l’arbre d’accessibilité sur certains navigateurs.
> 💡 **Astuce** — `:focus-visible` cible uniquement le focus clavier.
```

## Typographie française

- **Espaces insécables** avant `:`, `;`, `!`, `?` et après `«` / avant `»`. Utiliser l’entité `&#8239;` (espace fine insécable) dans le markdown pour résister aux outils qui mangent les caractères spéciaux.
- **Guillemets** : `« texte »` dans la prose, `` `code` `` pour le code.
- **Apostrophes typographiques** `’` dans la prose, droites `'` dans les blocs de code.
- **Tirets** : `—` (cadratin) pour les incises, `–` (demi-cadratin) pour les plages de valeurs, `-` (trait d’union) uniquement pour les mots composés.

## Liens et références

- **Liens internes** : chemins **relatifs** depuis le fichier source (`../guidelines/css.md`, pas d’URL absolue).
- **Libellés descriptifs** : jamais « cliquez ici » ou « lien ». Le libellé doit être compréhensible hors contexte.
- **Liens externes** : préfixés de l’emoji 🔗 lorsqu’ils renvoient vers une ressource majeure.

## Code

- Toujours déclarer le langage du bloc : ` ```ts `, ` ```css `, ` ```html `, ` ```bash `…
- Préférer des extraits courts et autonomes : si un exemple dépasse 30 lignes, envisager un lien vers un fichier d’exemple.
- Les variables d’environnement, chemins et noms de fichiers en prose sont entourés de backticks : `.env`, `src/main.ts`.

## Séparateurs

Les séparateurs `---` sont réservés à **deux usages exclusifs** :

1. Entre l’en-tête (TL;DR + sommaire) et le corps du document.
2. Entre le corps du document et le footer "Voir aussi".

Jamais à l’intérieur du corps : les titres `##` et `###` suffisent à structurer.

## Footer "Voir aussi"

Toute fiche se termine par une section `## Voir aussi` listant **2 à 5** liens pertinents vers d’autres fiches Kiwipedia.

```markdown
---

## Voir aussi

- [Modèle de fiche](.template.md) — Squelette prêt à dupliquer.
- [README](README.md) — Index général.
