# Cheatsheet : Commandes Git

🔖 Voir aussi

- Les _shorts_ de [DeliciousInsights](https://www.youtube.com/@DeliciousInsights/shorts)
- <https://github.com/dictcp/awesome-git>
- <https://jvns.ca/blog/2023/11/01/confusing-git-terminology/>
- <https://jvns.ca/blog/2024/01/26/inside-git/>

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

# Affiche la liste des fichiers modifiés entre deux commits
git diff a6a3a3d9fc507ddf2aeee189b7b34daeb897652a 56c46aeec883c36389c69fc0f17197e48474af1f --name-only
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

## Stash

Met "de côté" les fichiers en cours de modification pour les réappliquer plus tard.

💡 Il y a _mieux_ avec `git worktree` : "I was wrong about git stash..." <https://youtu.be/ntM7utSjeVU>, "Stop using git stash" <https://www.youtube.com/shorts/otrVadWzM2Y>

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

Réinitialise tout ou certains fichiers.

> [!CAUTION]
> Ne pas confondre avec `revert` : attention on peut perdre des modifications non versionnées.

```sh
git reset
git reset <fichier>
git reset <commit>
git reset HEAD
git reset --hard
git reset --hard origin/<labranche>
git reset --soft HEAD~1 # quand on a foiré son dernier commit 🎉
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

Le fichier `.gitignore` placé à la racine **ou** dans un sous-dossier permet d’ignorer des fichiers à versionner, par exemple logs, fichiers de configuration, dossiers _uploads_.

Exemple :

```text
.env             # ignore tous les fichiers .env, où qu'ils soient
/.htaccess       # ignore le fichier .htaccess à la racine
/node_modules/   # ignore le dossier node_modules à la racine
node_modules/    # ignore tous les dossiers nommés “node_modules”
*.txt            # ignore tous les fichiers txt
```

🎬 [YouTube : Ignorer des fichiers avec Git, par Delicious Insights](https://www.youtube.com/watch?v=gkzBzBomYyI)
