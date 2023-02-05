# Commandes Git (cheatsheet)

Statut : Recommendation (REC)

▶️ On respecte les Conventional Commits <https://www.conventionalcommits.org/fr/v1.0.0/>

Voir aussi <https://github.com/dictcp/awesome-git>

## Conventional Commits

- **build**: Changements relatifs au processus de <span lang="en">build</span> ou dépendances comme vite, ou npm.

- **ci**: Changements des fichiers de configurations de la CI comme workflows github.

- **docs**: Changements relatifs à la documentation du projet (wiki, readme, commentaires)

- **feat**: Changements qui ajoutent un nouvelle fonctionnalité.
  - Dans le cas d'un site, c'est une  fonctionnalité pour l'utilisateur final.
  - Dans le cas d'un projet du type "framework css" comme Bretzel, une feature est l'ajout d'une nouvelle classe css par exemple.

- **fix**: Changements qui corrigent un bug visible pour l'utilisateur final.
  - Pour savoir si le commit est vraiment un fix ou non, se poser la question: "Mon commit vaut-il le coup d'être affiché dans un changelog ou non ?"
    - Si oui, c'est un `fix:`.

- **perf**: Changements qui améliorent la performance du projet.

- **refactor**: Changements qui ne sont ni un bug ni une feature.
  - Exemple: j'arrive à reproduire le même fonctionnement qu'avant mais en supprimant 50 lignes de code.
  - Exemple: je renomme une fonction mais le fonctionnement reste le même.

- **style**: Changements qui ne modifient la pas le fonctionnement du code.
  - Exemple: formattage de fichiers avec eslint, prettier, ajout d'espaces, etc.

- **test**: Ajout ou modifications de tests unitaires, d'intégration et e2e.

- **chore**: Quand le reste ne convient pas.
  - Exemple: modification du fichier de configuration eslint, prettier, tâches de maintenance interne, mise à jour des dépendances.

## Init

Initialise un dépôt dans un dossier (vide ou non)

```sh
git init
```

## Clone

Récupère une copie d’un dépôt.

```sh
git clone ssh://<user>@<server>:<port>/<path>
```

## Status

Affiche le statut d’un dossier versionné avec Git

```sh
git status
```

## Branch

Liste les branches disponibles localement

```sh
git branch

# Pour passer sur une autre branche existant localement
git checkout nomdelabranche

# Pour passer sur une autre branche develop n’existant pas encore localement mais seulement sur l’origine distante
git fetch
git checkout -b nomdelabranche origin/nomdelabranche
```

## Diff

Affiche les différences dans le dossier de travail courant par rapport au dernier commit (ou d'autres commits).

```sh
git diff
git diff --shortstat
```

Ignorer les caractères espaces (whitespaces) : `git diff -w`

## Log

Affiche le journal des commits

```sh
git log
```

- Condensé en une ligne : `git log --oneline`
- Décoré : `git log --graph --decorate --oneline`
- Statistiques : `git log --stat`
- Sur un fichier en particulier `git log <fichier>`
- Sur un auteur `git log --author="nomdelauteur" --oneline --shortstat`
- Toutes les actions effectuées `git reflog`

## Add

Ajoute des fichiers à un commit. Avec un “.” en paramètre, ajoute tous les fichiers du dossier courant

```sh
git add .
```

Sinon fichier par fichier

```sh
git add index.html
git add styles.css
```

## Commit

Valide dans un commit les fichiers ajoutés (par add par exemple) et demande une description. (En ligne de commande ouvre un éditeur de texte pour donner la description texte)

```sh
git commit
```

L’option `--amend` permet de modifier le dernier message de commit, ensuite il "suffit" de `git push --force`

```sh
git commit --amend
```

## Push

Envoie les derniers commits sur le dépôt distant s’il est configuré, dans la branche active

```sh
git push
```

## Pull

Récupère les derniers commits du dépôt distant.

```sh
git pull
git pull --rebase
```

## Revert

“Annule” un commit mais n’efface pas l’historique. Crée un nouveau commit résultant de l’annulation des changements introduits par le commit ancien que l’on souhaite annuler.

```sh
git revert HEAD
```

## Reset

Ne pas confondre avec revert, réinitialise tout ou certains fichiers (attention on peut perdre des modifications non versionnées).

```sh
git reset
git reset <fichier>
git reset <commit>
git reset HEAD
git reset --hard
git reset --hard origin/<labranche>
git reset --soft HEAD~1 # quand on a foiré son dernier commit
```

## Rm

Pour supprimer un fichier déjà versionné/tracké, mais qui a par exemple été ajouté à .gitignore

```sh
git rm --cached .env
```

## Clean

Nettoie le dossier de travail.

```sh
# Annonce ce qu’il va faire (sans le faire)
git clean -n

# Retire effectivement les fichiers non versionnés
git clean -f
```

Autre options `-df` : seulement répertoire courant ; `-xf` : même les fichiers ignorés habituellement.

## Checkout

Récupère un état global du dépôt (ou un fichier précis) en précisant soit le nom du commit (vu avec git log) soit le nom de la branche.

```sh
git checkout master
git checkout 11b5cf99
git checkout assets/css/styles.min.css # Un fichier en particulier
```

## Fetch

Télécharge des informations sur les branches/tags depuis un repo.

```sh
# Récupère la branche develop depuis l’origin (distante)
git fetch origin develop
```

## Remote

Manipule les URLs de repos distants.

```sh
# Ajoute une remote
git remote add <nom> <url>
# Change la _remote_ (distante)
git remote set-url origin <url>
```

## Merge

Fusion !

## Blame

Retrouver qui a modifié quoi.

```sh
# Sur un fichier, de la ligne 85 à 90 :
git blame css/styles.less -L 85,90
```

## Config

3 endroits différents stockent la configuration par ordre de priorité descendante

```text
<repo>/.git/config – Config spécifique du dépôt
~/.gitconfig – Config de l’utilisateur (là où est stocké --global)
/etc/gitconfig – Config générale du système
```

Lister la config : `git config --list`

Modifier la config :

```sh
git config --global user.name <name>
git config --global user.email <email>
git config --system core.editor <editor>
```

Edition de toute la configuration : `git config --global --edit`

## Ignorer des fichiers avec .gitignore

Le fichier .gitignore permet d’ignorer des fichiers à versionner. Ils ne seront pas stockés sur le repo. Il faut le placer au choix

- à la racine du projet (concerne tout le projet)
- dans des répertoires spécifiques (ne concerne que le sous-répertoire)

Exemple :

```text
/.htaccess       # ignore le fichier .htaccess à la racine
.htaccess        # ignore tous les fichiers .htaccess
/node_modules/   # ignore le dossier node_modules à la racine
node_modules/    # ignore tous les dossiers nommés “node_modules”
*.txt            # ignore tous les fichiers txt
```
