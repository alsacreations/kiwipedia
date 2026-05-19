# Contribuer à Kiwipedia

> Statut : stable · Niveau : tous

**TL;DR** — Pour ajouter ou amender une fiche : dupliquer `.template.md`, respecter le [guide de style](STYLE.md), placer la fiche dans la bonne section du [README](README.md).

## Sommaire

- [Principes](#principes)
- [Ajouter une nouvelle fiche](#ajouter-une-nouvelle-fiche)
- [Modifier une fiche existante](#modifier-une-fiche-existante)
- [Archiver une fiche](#archiver-une-fiche)
- [Conventions de commit](#conventions-de-commit)

---

## Principes

Kiwipedia est une **base de connaissances vivante**, organisée selon le cycle de vie d’un projet web :

1. 🚀 **Démarrer un projet** — outillage, configuration, workflow.
2. 🧱 **Fondamentaux & conventions** — HTML, CSS, JS, accessibilité, naming.
3. 🧩 **Stacks & frameworks** — Vue, WordPress, PHP, e-mailing.
4. ✅ **Qualité & exigences non-fonctionnelles** — perf, SEO, RGPD, écoconception, sécurité.
5. 🎨 **Design & production visuelle** — webdesign, icônes.
6. 📚 **Aide-mémoire** — cheatsheets.

Toute nouvelle fiche doit trouver sa place dans l’une de ces sections. Si elle n’en trouve pas, c’est qu’elle nécessite une discussion préalable.

## Ajouter une nouvelle fiche

1. **Dupliquer le modèle** :
   ```bash
   cp .template.md guidelines/ma-fiche.md
   ```
2. **Renseigner l’en-tête** : titre, statut, niveau, durée de lecture, date de MAJ. Voir le [guide de style](STYLE.md#métadonnées).
3. **Rédiger le TL;DR** — une à deux phrases qui résument l’essentiel.
4. **Construire le sommaire manuel** au fur et à mesure de la rédaction.
5. **Appliquer les conventions éditoriales** : emojis sémantiques, blockquotes typés, typographie française. Voir [STYLE.md](STYLE.md).
6. **Ajouter le footer « Voir aussi »** avec 2 à 5 liens pertinents.
7. **Indexer la fiche** dans la bonne section du [README.md](README.md).

## Modifier une fiche existante

1. **Vérifier l’en-tête** : la fiche respecte-t-elle le template ? Si non, en profiter pour la migrer.
2. **Mettre à jour la date de MAJ** dans la ligne de métadonnées.
3. **Si le statut change** (ex. `draft` → `stable`), le refléter dans l’en-tête.

## Archiver une fiche

Quand une fiche n’est plus pertinente mais reste utile à titre historique :

1. **Déplacer** le fichier dans `archives/`.
2. **Modifier** son statut en `archivé` dans l’en-tête.
3. **Retirer** son entrée du `README.md`.
4. **Conserver** un lien depuis le [README — section Ressources & veille](README.md#-ressources--veille) si la fiche est encore régulièrement consultée.

## Conventions de commit

Le dépôt suit la convention [Conventional Commits](https://www.conventionalcommits.org/) (cf. [Cheatsheet Git](cheatsheets/git.md)) :

- `docs(<thème>): ajoute la fiche X` — nouvelle fiche.
- `docs(<thème>): met à jour la fiche X` — modification de fond.
- `docs(<thème>): corrige Y dans la fiche X` — correction ponctuelle.
- `docs(readme): met à jour l’index` — modifications du README.
- `chore(archives): archive la fiche X` — déplacement vers `archives/`.

---

## Voir aussi

- [Guide de style éditorial](STYLE.md) — Conventions typographiques et sémantiques.
- [Modèle de fiche](.template.md) — Squelette prêt à dupliquer.
- [Cheatsheet Git](cheatsheets/git.md) — Conventions de commits.
