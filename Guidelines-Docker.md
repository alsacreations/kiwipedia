# Guidelines : Docker

_Statut : Working Draft (WD)_

## Commandes utiles

* Compiler un Dockerfile dans le dossier courant pour créer une image `docker build -t <nomimage:tag> .`
* Compiler une image en conteneur et l'exécuter `docker run --name <nomducontainer> <nomimage:tag>` (+ voir autres options)
* Démarrer ou arrêter un container s'il est déjà existant : `docker start <nomducontainer>` (ou `stop`)
* Exécuter une commande dans le container : `docker container exec -it <nomducontainer> <lacommande>` (par exemple `bash` pour ouvrir un shell)
* Lister tous les containers : `docker container ls` ou `docker ps -a`
* Lister toutes les images : `docker image ls`
* Supprimer un container : `docker container rm <nomducontainer>`
* Supprimer une image : `docker image rm <nomdelimage>`
* Utiliser le chemin courant dans une commande docker : `$PWD`
* Créer un network : `docker network create my-custom-net` et l'utiliser au run : `--network=my-custom-net`
* Statistiques : `docker stats`

## Options run

TODO:

* `-d`
* `-p`
* `-u`
* `-v`
* `-e`
* `-it`
* `--link`
* `--restart always`

Astuces :

* ajouter `-v /etc/localtime:/etc/localtime:ro` pour faire correspondre avec le fuseau horaire hôte
* ajouter `-m 256m` pour limiter la mémoire à 256 Mo
* ajouter`--read-only` pour que le filesystem soit en lecture seule
* suffixer un volume par`:ro` pour qu'il soit en lecture seule

## Dockerfile

Le fichier `Dockerfile` est compilé en image à l'aide de `docker build -t test/myapp .`

<https://hadolint.github.io/hadolint/> est un Dockerfile Linter.

* `FROM` Définit l'image source (`FROM php:7.4-cli`).
* `ENV` Définit une variable d'environnement à la compilation et à l'exécution (`ENV MY_VAR=kiwi`).
* `LABEL` Ajoute une métadonnée à l'image.
* `WORKDIR` Définit le dossier de travail pour les commandes suivantes (`WORKDIR /var/www/html`).
* `RUN` Exécute une commande à la compilation (`RUN echo Hello`).
* `CMD` Exécute une commande dans le conteneur (`CMD [ "php", "./your-script.php" ]`).
* `EXPOSE` Informe Docker que le conteneur écoute sur un port (`EXPOSE 80` ou `EXPOSE 80/tcp`).
* `COPY` Copie des fichiers/répertoires depuis une source vers le _filesystem_ de l'image. `--chown` modifie les droits à la volée.
* `ADD` Ajoute des fichiers/répertoires (y compris depuis une URL ou une extraction tar) dans le _filesystem_ de l'image (`ADD test.txt dir/`). `--chown` modifie les droits à la volée.
* `VOLUME` Crée un point de montage (`VOLUME /myvol`).
* `ENTRYPOINT` Configure un conteneur comme un exécutable.
* `USER` Définit l'id utilisateur (UID) et groupe (GID) à utiliser lorsque l'image s'exécute et pour toute instruction suivante (RUN, CMD, ENTRYPOINT).
* `ARG` Définit une variable que l'on peut passer au moment de la compilation avec `--build-arg <varname>=<value>`.

Liste non exhaustive, voir <https://docs.docker.com/engine/reference/builder/>.

---

## Ressources et bonnes pratiques

* <https://betterprogramming.pub/docker-best-practices-and-anti-patterns-e7cbccba4f19>
* <https://github.com/FuriKuri/docker-best-practices>
* <https://snyk.io/blog/10-docker-image-security-best-practices/>
* <http://docs.projectatomic.io/container-best-practices/>
