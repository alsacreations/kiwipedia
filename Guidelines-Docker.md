# Guidelines : Docker

Statut : Recommendation (REC)

Voir aussi <https://www.alsacreations.com/tuto/lire/1836-Docker--decouverte-et-environnement-LAMP-pour-WordPress.html>

## Commandes utiles

* Compiler un Dockerfile dans le dossier courant pour créer une image `docker build -t <nomimage:tag> .`
* Compiler une image en conteneur et l'exécuter `docker run --name <nomducontainer> <nomimage:tag>` (+ voir autres options)
* Démarrer ou arrêter un conteneur s'il est déjà existant : `docker start <nomducontainer>` (ou `stop`)
* Exécuter une commande dans le conteneur : `docker container exec -it <nomducontainer> <lacommande>` (par exemple `bash` pour ouvrir un shell)
* Lister tous les conteneurs : `docker container ls` ou `docker ps -a`
* Lister toutes les images : `docker image ls`
* Supprimer un conteneur : `docker container rm <nomducontainer>`
* Supprimer une image : `docker image rm <nomdelimage>`
* Utiliser le chemin courant dans une commande docker : `$PWD`
* Créer un network : `docker network create my-custom-net` et l'utiliser au run : `--network=my-custom-net`
* Copier un fichier dans un conteneur actif `docker cp .\fichier.sql.gz 133713371337:/root` où 133713371337 est l'ID du conteneur obtenu par `docker container list` et `/root` le chemin de destination.
* Nettoyer les images/volumes inutilisés `docker image prune` / `docker volume prune`
* Redémarrer tous les conteneurs arrêtés `docker restart $(docker ps -a -q)`

### Inspection

* Statistiques : `docker stats`
* Logs : `docker logs <nomducontainer>` (ajouter `-f` pour suivre en continu)
* Ports ouverts : `docker port <nomducontainer>`
* Processus : `docker top <nomducontainer>`
* Différences appliquées : `docker diff <nomducontainer>`

## Options Docker run

* `-d` : permet de détacher l'exécution du conteneur du terminal courant
* `-p` : permet de lier un port (local:container `-p 8080:80`)
* `-u` : permet de spécifier l'utilisateur+groupe d'exécution
* `-v` : permet de déclarer un volume (local:container `-v /var/path/to/mydata/mysql:/var/lib/mysql`)
* `-e` : permet de passer/spécifier une variable d'environnement
* `-i` : permet d'avoir un terminal interactif (_stdin_), par exemple pour entrer un mot de passe au prompt (souvent combiné avec `t`)
* `-t` : alloue un _pseudo-tty_
* `--link` : permet de "lier" un hostname d'un conteneur à un autre (par exemple un serveur mysql dans un 1er conteneur `mysqlserver` devient `--link mysqlserver:db` dans le 2e, on utilise alors `db`)
* `--restart always` : indique au service Docker de redémarrer le conteneur au boot et de le maintenir actif si Docker est lui-même relancé

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
* <https://quickref.me/docker>
* <https://enix.io/fr/blog/cherie-j-ai-retreci-docker-part1/>
