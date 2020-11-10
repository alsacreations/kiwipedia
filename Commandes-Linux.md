# Commandes Linux (cheatsheet)

_Statut : Working Draft (WD)_

Utiles pour un serveur de développement ou un serveur web/mail/ftp, notamment sous Ubuntu/Debian.

- Voir aussi https://explainshell.com/ pour expliquer les commandes shell entrées
- Voir aussi http://samrowe.com/wordpress/advancing-in-the-bash-shell/
- Voir aussi https://github.com/donnemartin/awesome-aws pour AWS
- MiniVim https://github.com/sd65/MiniVim
- Commandline challenge https://cmdchallenge.com/

Rechercher rapidement dans les précédentes commandes : `Ctrl+R`

---

## Root

Console root permanente (à utiliser à vos risques et périls)
`sudo -i`

Impersonification!
`sudo -i -u <user>`

S'identifier en tant que root
`su`

Qui est connecté actuellement sur la machine ?
`w`

Connaître la release Linux
`lsb_release -a`

Consulter le log mémoire tampon du noyau
`dmesg`

---

## Chemins courants

- `/var/log/` Logs généraux
- `/var/log/syslog` Logs système
- `/var/log/mail.log` Logs mail/postfix
- `/var/log/apache2/` Logs Apache
- `/var/www/` Hébergement http
- `/var/vmail/` Hébergement mails
- `/var/lib/mysql/` MySQL
- `/var/log/ispconfig/` Logs ISPConfig
- `/var/log/ispconfig/httpd/` Logs Apache individuels

---

## Maintenance et mises à jour avec apt

Voir aussi https://debian-handbook.info/browse/fr-FR/stable/sect.apt-get.html

Met à jour les paquets disponibles
`apt-get update`

Met à jour la distribution avec les paquets trouvés
`apt-get upgrade`

Met à jour le serveur et l'indique à rkhunter pour éviter les warnings
`apt-get update && apt-get upgrade && rkhunter --propupd`

Met à jour (supprime/ajoute/met à jour) avec apt
`apt full-upgrade`

Indications de support des paquets dans le temps
`ubuntu-support-status`

Met à jour toute la distrib d'une version à l'autre (warning!)
`apt-get dist-upgrade`

Informations
`apt-cache show <paquet>`

Installer un paquet
`apt-get install <paquet>`

Simulation d'installation
`apt-get install <paquet> -s`

Désinstaller un paquet
`apt-get remove <paquet>`

Désinstallation complète (avec conf)
`apt-get remove <paquet> --purge`

Recherche dans les paquets disponibles
`apt-cache search <paquet>`

Dépendances
`apt-cache depends <paquet>`

Versions disponibles
`apt-cache madison <paquet>`

Versions et possibilités
`apt-cache policy <paquet>`

Vider le cache
`apt-get clean`

Informations...
`aptitude show <paquet>`

Liste des paquets installés
`dpkg -l`

Liste des fichiers d'un paquet
`dpkg -L`

Connaître le paquet qui a installé un soft/config
`dpkg -S /sbin/ifconfig`

Reconfigurer un paquet déjà installé
`dpkg-reconfigure apache`

Reconfigurer le niveau de question
`dpkg-reconfigure debconf`

`dpkg --get-selections`
`dpkg --set-selections`

---

### Autres commandes utiles

Dernières commandes
`history`

Date du jour
`date`

Calendrier
`cal`

Rafraîchir une commande toutes les X secondes à l'écran (ex : cat)
`watch <commande>`

Uptime du serveur et charge
`uptime`

Dernières connexions
`last`

---

## Utilisateurs

Ajouter un utilisateur
`useradd <login>`

Attribuer un mot de passe
`passwd <login>`

Modification du shell (/bin/bash, /bin/false, /bin/nologin...)
`usermod -s /usr/bin/passwd <login>`

Désactivation du compte utilisateur
`usermod -L -s /bin/nologin <login>`

Supprimer un utilisateur
`userdel <login>`

Verrouiller le compte (permet à l'utilisateur de retrouver son mot de passe ensuite)
`passwd -l <login>`

Déverrouiller le compte
`passwd -u <login>`

Lister les groupes d'un user
`groups <login>`

Ajouter un groupe
`groupadd <groupe>`

Supprimer un groupe
`groupdel <groupe>`

Ajouter un utilisateur à un groupe
`gpasswd -a <utilisateur> <groupe>`

Supprimer un utilisateur d'un groupe
`gpasswd -d <utilisateur> <groupe>`

Redéfinir les groupes d'un user
`usermod -G <group1,group2> <login>`

Attribuer un groupe à un chemin (fichier, répertoire)
`chgrp <group> <path>`

### Samba (partage de fichiers)

Ajouter un user samba (il faut avoir déjà créé un user linux)
`smbpasswd -a <login>`

Supprimer
`smbpasswd -x <login>`

Utilisateurs autorisés : dans `/etc/samba/smb.conf`
`valid users <login1> <login2> @group1`

---

## Clés

Connaître la clé publique à partir d’une clé privée générée (dsa, rsa, etc) pour l’ajouter à authorized_keys
`ssh-keygen -y`

Générer une clé RSA 4096
`ssh-keygen -b 4096 -t rsa`

Générer une clé sécurisée (https://blog.g3rt.nl/upgrade-your-ssh-keys.html)
(ne fonctionne pas avec Putty sous Windows)
`ssh-keygen -o -a 100 -t ed25519`

Lister les types de clés
`for keyfile in ~/.ssh/my*; do ssh-keygen -l -f "${keyfile}"; done | uniq`

---

## Monitoring

### CPU et processus

Top des processus (< > modif colonne tri) (shift+O = tri des colonnes)
`top`

Processus
`ps auxwwwwf`

Processus par mémoire requise
`ps -eo pmem,pid | sort -r`

Rechercher un processus par PID
`ps -eaf | grep <PID>`

Top 10 CPU
`ps -eo pcpu,pid,user,args | sort -k 1 -r | head -10`

Arborescence des processus
`pstree -aA`

Fichiers ouverts par le processus PID
`ls -l /proc/<PID>/fd`

Fichier d'exécution du processus PID
`ls -l /proc/<PID>/exe`

Commande d'exécution du processus PID
`ls -l /proc/<PID>/cmdline`

Benchmark rapide cpu
`echo '2^2^20' | time bc > /dev/null`

Tuer tous les processus d'un utilisateur
`pgrep -u <user> | xargs kill -9`

### Statistiques

Statistiques globales (à installer avec apt-get)
`dstat`

Stats CPU
`mpstat`

Stats I/O toutes les 5 secondes
`iostat -x 5`

Processus générant de l'I/O (débits instantanés)
`iotop -o`

Processus générant de l'I/O avec totaux lus/écrits
`iotop -oa`

Temps d'exécution d'une commande
`time <command>`

Statistiques de la journée
`sar`

Infos sur un processus d'après son PID
`cd /proc/<PID> && ll`

Essayer aussi opensnoop (à partir d’Ubuntu 16.x) pour voir tous les fichiers ouverts par un programme

### RAM

Etat RAM global
`free -m -t`

Etat RAM virtuelle
`vmstat`

Etat RAM détaillé
`watch cat /proc/meminfo`

RAM (non cachée) utilisée par chaque process Apache2 (colonne RSS en Ko)
`ps -ylC apache2 --sort:rss`

PHP Poids moyen d'un child (ou autre processus, remplacer php5-fpm dans ce cas)

```
ps --no-headers -o "rss,cmd" -C php5-fpm | awk '{ sum+=$1 } END { printf ("%d%s\n", sum/NR/1024,"M") }'
```

---

## Screen

Exécuter des processus sans les fermer à la fin de la connexion SSH

Initialisation
`screen`

Liste des screens
`screen -ls`

Récupérer <id_optionnel>
`screen -r`

Se détacher du screen courant : combinaison de touches Ctrl + A + D

---

## Fichiers

Lister les fichiers
`ls`

Changer de répertoire
`cd <path>`

Revenir au précédent dossier
`cd -`

Lister les fichiers par dernière date de modification
`ll -rt`

Lister les fichiers par taille
`ll -rSh`

Lister par extension
`ll -X`

Récursif dans les dossiers
`ll -R`

Espace occupé par le répertoire
`du -skh`

Espace occupé, groupé par répertoires
`du -h --max-depth=1`

Espace occupé, classé par taille
`du -h --max-depth=1 | sort -h`

Espace occupé en suivant les liens symboliques
`du -skhL`

Espace occupé par dossier, classé par taille (humaine)
`du -skh * | sort -h`

Supprimer un fichier
`rm <file>`

Supprimer un répertoire (vide)
`rmdir <dir>`

Suppression récursive
`rm -rf`

Déplacer/renommer un fichier ou un répertoire
`mv <file1> <file2>`

Copier un fichier ou un répertoire
`cp <file1> <file2>`

---

## Disque dur

Liste les devices de bloc (disques durs) et leurs points de montage
`lsblk`

Liste tous les UUID
`blkid`

Liste tous les disques par ID matériel
`ls -al /dev/disk/by-id`

Espace disque libre
`df -h`

Liste de toutes les partitions
`fdisk -l` ou `parted -l`

Statistiques I/O disques durs
`cat /proc/diskstats`

Démonter un volume
`umount /dev/sda1`

Démonter un volume (forcer)
`umount -fl /dev/sda1`

Monter un volume (déjà listé dans fstab)
`mount /dev/sda1`

Monter un volume à la demande
`mount -t ext4 /dev/sda1 /mnt/path`

Infos de montages
`cat /proc/mounts`

Qui utilise la ressource ?
`fuser -v /media/path/`

Partitionner (p = afficher, d = supprimer, n = new)
`fdisk /dev/XXXX`

Espace disque occupé dans les sous-dossiers classés par taille
`du -hs * | sort -h`

Triple benchmark rapide disque
`for i in 1 2 3; do hdparm -tT /dev/hda; done`

### Partitions, structure

Lister la configuration des partitions et montages
`cat /etc/fstab`

Créer une partition ext4 sur /dev/sda
`mkfs.ext4 /dev/sda -v`

Copier la structure des partitions de sda vers sdb
`sfdisk -d /dev/sda | sfdisk /dev/sdb`

Taille des partitions
`sfdisk -s`

Vérifier type/boot partitions
`sfdisk -V /dev/sdb`

Liste des partitions sur le disque
`sfdisk -l /dev/sda`

Recopier partitions sda vers sdb (après remplacement disque par exemple)
`sfdisk -d /dev/sda | sfdisk /dev/sdb`

Checkdisk ext4
`fsck.ext4`

### Raid

Vue globale Raid [U_] : U = Up, \_ = Down
`cat /proc/mdstat`

Administration RAID : scan des array présents
`mdadm --detail --scan`

Administration RAID : vue des détails pour un array spécifique
`mdadm --detail /dev/md0`

Si tout va bien, "State : clean", "Active Devices : 2", "Working Devices : 2"
Qui utilise quoi ? `cat /proc/mounts` (voir aussi `lsblk`)

Marquer comme défectueux avant de remove
`mdadm --set-faulty /dev/md0 /dev/sdb`

Remove
`mdadm --remove /dev/md0 /dev/sdb`

Forcer un remove de disque déjà en fail (F) mais devenu indisponible en device
`mdadm -r /dev/md0 failed`

Remettre à zéro les superblocs Raid (erreur négligeable si aucun reste de raid précédent)
`mdadm --zero-superblock /dev/sdb1`

Ajouter une partition sdb1 au raid md0
`mdadm --manage /dev/md0 --add /dev/sdb1`

Voir aussi

- http://www.ducea.com/2009/03/08/mdadm-cheat-sheet/
- https://buzut.net/diagnostiquer-et-recuperer-une-defaillance-raid/

### Smart

Vérifier santé Smart disque (surveiller valeurs de Reallocated_Sector_Ct et Current_Pending_Sector) - permet aussi d'identifier le disque physique sur la machine avec ses Device Model et Serial Number marqués sur le matériel.
`smartctl -a /dev/sdb` et `smartctl -H /dev/sdb`

Lancer un test Smart sur un disque
`smartctl -t short /dev/sdb` puis `dmesg` et `smartctl -a /dev/sdb` pour voir les résultats

Lancer un test Smart approfondi
`smartctl -t long /dev/sdb -C` (ou sans -C) puis attendre et vérifier `smartctl -a /dev/sdb`

Voir aussi https://www.cyberciti.biz/tips/linux-find-out-if-harddisk-failing.html

### Quota

Liste users (espace utilisé, limites...)
`repquota -avs`

---

## Cron

Editer la cron list
`crontab -e`

Lister les cron jobs
`crontab -l`

Editer pour un utilisateur spécifique
`crontab -u <login> -e`

Lister pour tous les utilisateurs
`for user in $(cut -f1 -d: /etc/passwd); do crontab -u $user -l; done`

### Syntaxe

Tous les jours à 3h05
`5 3 * * * /usr/bin/apt-get update`

Backup SQL quotidien

```
15 2 * * * root mysqldump -u root -p<password> --all-databases | gzip > /mnt/disk2/database_`data ' %m-%d-%Y'`.sql.gz
```

---

## Réseau

Connexions actives (serveurs et établies)
`netstat -tap`

Connexions actives (seulement serveurs)
`netstat -tulp`

Connexions et processus
`netstat -tanpu`

IP connectée à Apache en masse ?
`netstat -tanp | grep ESTABLISHED | grep apache | awk {'print $5'} | sort -n`

Liste des processus
`netstat -ntpl`

Liste les connexions en écoute ouvertes
`lsof -n | grep LISTEN`

Liste les connexions UDP ouvertes
`lsof -n | grep UDP`

Descripteurs ouverts par un processus
`lsof -p <PID>`

Liste les adresses IP / interfaces
`ip addr show`

Ports référencés
`cat /etc/services`

Traceroute
`tracert`

Nslookup
`nslookup <ip>`

Host
`host <www.....com>`

Ping
`ping <ip>`

Ethernet top
`iftop`

Connaître la vitesse de connexion du lien Ethernet (adapter le nom de l'interface avec celui trouvé dans ifconfig)
`ethtool eth0 | grep -i speed`

Capture de paquets réseau selon protocole/port
`tcpdump -i eth0 'tcp port 80'`

Trafic IP (si installé)
`iptraf`

Sniffer toutes les requêtes réseau contenant "favicon"
`ngrep -d any favicon`

### IPtables

Bannir l'IP en TCP
`iptables -I INPUT -p tcp -s <adresse_ip> -j DROP`

Supprimer la règle
`iptables -D INPUT -s <adresse_ip> -j DROP`

Lister les règles actives
`iptables -L -v --line-numbers`

Lister la configuration
`iptables -S`

Effacer la règle n°4 en input (1ere ligne = 1)
`iptables -D INPUT 4`

Effacer la règle n°1 de fail2ban
`iptables -D fail2ban-courierauth 1`

Bloquer adresses IP x.x.x.\*
`iptables -A INPUT -s x.x.x.0/24 -j DROP`

Bloquer des requêtes HTTP sur un domaine
`iptables -I INPUT -p tcp --dport 80 -m string --string "Host: www.example.org" --algo bm -j DROP`

Examiner le statut des bans fail2ban
`fail2ban-client status <ssh|pure-ftpd|dovecot|...>`

Stopper un jail
`fail2ban-client stop <ssh>`

Tester une regex
`fail2ban-regex /var/log/apache2/other_vhosts_access.log /etc/fail2ban/filter.d/apache-wp-login.conf`

### Envoyer/recevoir avec netcat

Sur la machine qui écoute (pour trouver son ip hostname -I)
`nc -l 1337 >bigfile`

Sur la machine qui envoie
`cat bigfile | nc 192.168.0.37 1337`

---

## SCP

Copier fichier vers machine distante (répertoire home)
`scp -P 22222 <fichier> login@www.example.org:`

Copier fichier vers machine distante avec clé ssh

```
scp -i ~/.ssh/www.example.org <fichier> ubuntu@www.example.org:
scp -P 22222 -i ~/.ssh/key-rsa.txt <fichier> login@www.example.org:
```

Copier fichier vers machine distante (répertoire/fichier destination)
`scp -P 22222 <fichier> login@www.example.org:path/<fichier>`

Copier répertoire vers machine distante
`scp -P 22222 -r directory login@www.example.org:`

Copier répertoire depuis machine distante
`scp -P 22222 -r login@www.example.org:directory .`

RSync de serveur à serveur
`rsync -av -e "ssh -p 22222" /tmp/ root@192.168.0.37:/tmp`

---

## Fichiers

### Trouver un fichier

A partir du répertoire courant
`find . -name <fichier>`

Taille >50 Mo
`find . -size +50M`

Trouver les fichiers php contenant mysql_pconnect
`find . -name "*.php" | xargs grep "mysql_connect"`

Supprimer les fichiers vides
`find -size 0 -print -exec rm {} \;`

Supprimer les fichiers contenant une chaîne
`grep -l "blablablabla" * | xargs rm`

Supprimer les fichiers pollution macOS
`find -name "._.DS_Store" -print -delete`

Trouver tous les error.log et les classer par taille
`find . -name "error.log" -exec ls -sh {} \; | sort -h`

Supprimer tous les dossiers node_modules à partir du répertoire courant
`find . -name "node_modules" -type d -prune -exec rm -rf '{}' +`

Que les fichiers (pas les dossiers)
`find -type f`

Arborescence à 2 niveaux
`tree -L 2`

### Remplacer dans des fichiers

Dans fichiers html remplacer DATA par DATA2
`find . -name "*.html" | xargs sed -i 's/DATA/DATA2/g'`

Pareil
`sed -i "s/DATA/DATA2/g" **/*.html`

Supprimer toutes les balises img
`find . -name "*.html" | xargs sed -i 's/<img.*>//g'`

Supprimer toutes les balises img contenant co.cc
`find . -name "*.html" | xargs sed -i 's/<img heigth.*co\.cc.*>//g'`

### Texte

Trouver un fichier php contenant "virtual" à partir de .

```
grep "virtual" `find . -name "*.php"`
```

5 Lignes avant dans un fichier
`grep "panic" /var/log/syslog -B5`

Rechercher/remplacer dans fichiers multiples
`sed -i "s/ChaineRecherchee/Remplacement/g" le_fichier`

Extraire les lignes d'un fichier texte de 1337 à 2000
`sed -n 1337,2000p <fichier>`

### Info sur les fichiers

Sur l'ensemble du filesystem
`locate <fichier>`

Rechercher les fichiers exécutables, les sources et les pages de manuel d'une commande
`whereis <fichier>`

Description d'une commande
`apropos <commande>`

Page de manuel
`man <commande>`

Afficher le contenu d'un fichier
`cat <file>`

Compter le nombre de lignes

```
wc -l <file>
```

Afficher le contenu inversé
`rev <file>`

Editer un fichier avec vi
`vi <file>`

Editer un fichier avec nano
`nano <file>`

Lire un fichier (G = fin du fichier)
`less <file>`

Début d'un fichier
`head <file>`

Fin d'un fichier (-n 50 : 50 dernières lignes)
`tail <file>`

Monitorer un fichier (lignes ajoutées) / Ctrl+C pour quitter
`tail -f <file>`

### Compression

Lister les contenus d'un fichier zip
`unzip -l <fichier.zip>`

Compression du dossier www dans www.zip
`gzip -rc www >www.zip`

Déompression de www.zip
`gunzip www.zip`

Détarer une archive
`tar -xvf backup_complet.tar`

Détarer la suite...
`tar -xvf backup_incr1.tar --listed-incremental=backup.incremental-list.txt`

Extraire un tar.gz
`tar -xvzf <file.tar.gz>`

Créer un tar.gz
`tar -cvzf test.tar.gz <path>`

Créer un tar.gz et déréférencer les symlinks
`tar -cvzfh test.tar.gz <path>`

---

## VI/VIM

Quitter un mode : _Echap_

Mode insertion
`i`

Mode ajout (append)
`a`

Supprimer
`x`

Couper/effacer une ligne
`dd`

Couper/effacer 10 lignes
`10dd`

Copier
`y`

Coller
`p`

Enregistrer
`:w`

Quitter
`:q`

Quitter sans enregistrer
`:q!`

Aller à la dernière ligne
`G`

Insérer un fichier à la position du curseur
`:r <file>`

Voir les options
`:set`

Numérotation
`:set nu`

Pas d'autoindent
`:set noautoindent`

Taille des tabulations
`:set ts=4`

Rechercher dans tous le fichier le mot1 pour le remplacer par le mot2
`:g/mot1/s//mot2/g`

Sauver en UTF-8
`:set fenc=utf-8`

VIM en mode diff entre deux fichiers
`vimdiff <file1> <file2>`

Modifier la configuration vi par défaut, éditer `~/.exrc`

```
set nu
set noautoindent
```

Support UTF-8 pour VI : éditer le fichier `/etc/vim/vimrc` et ajouter

```
if has("multi_byte")
				set encoding=utf-8
				setglobal fileencoding=utf-8
				set bomb
				set termencoding=iso-8859-15
				set fileencodings=ucs-bom,iso-8859-15,iso-8859-3,utf-8
else
				echoerr "Sorry, this version of (g)vim was not compiled with +multi_byte"
endif
```

---

## Wget : télécharger/cloner un fichier/un site par HTTP ou FTP

Commande de base récupérant la page d'index

```
wget http://www.perdu.com/
```

Wget : aspirer une page en particulier et toutes ses dépendances

```
wget -E -H -k -K -p http://www.perdu.com/
```

Wget récursif, sans accepter les fichiers en gzip (sinon ça ne marche pas)

```
wget --header="accept-encoding: none" --recursive http://www.azerty0.ironie.org/
```

Wget miroir d'un site, récursif, adaptant les liens et extensions, téléchargeant les ressources internes, ignorant robots.txt

```
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent -e robots=off http://www.azerty0.ironie.org/
```

## Scripts utiles et shell

Date
`echo $(date +%Y-%m-%d)`

Envoyer un mail
`echo "Arf" | mail -s "Sujet" destinataire@example.org`

Split un fichier PDF en plusieurs autres
`pdfseparate -f 1 -l 10 doc.pdf tmp/doc-%d.pdf`

Convertir un fichier en utf8

```
iconv -f latin1 -t utf8 update.sql >update-utf8.sql
```

Compter le nombre de lignes de plein de fichiers dans une arbo web

```
find . -name "*.php" -o -name "*.less" -o -name "*.css" -o -name "*.js" -o -name "*.html" | xargs wc -l
```

Supprimer fichiers vides

```
for file in * .*; do [ -f "$file" ] && [ 0 -eq "$(wc -c "$file" | cut -d" " -f1)" ] && rm -f "$file"; done
```

Trouver les 404 et leur total dans un log Apache

```
grep " 404" access.log | awk '{print $7}' | sort | uniq -c
```

Trouver les adresses IP uniques et le nombre de requêtes dans un log Apache (ajouter `| wc -l` pour le total)

```
cat access.log | awk '{ print $1 }' | sort | uniq -c | sort -n
```

Lister récursivement tous les fichiers contenant une chaîne sans l'afficher

```
grep -lR "quelquechose" *
```

Trouver les robots en excluant ceux connus (-E expression régulière, -i case insensitive, -v inverse)
(on exclut aussi les requêtes sur robots.txt et la font roboto)

```
grep "bot" other_vhosts_access.log | grep -Eiv "Googlebot|Yahoo|Slurp|WorldSearch|Exabot|facebot|ia_archiver|alexa|msnbot|bingbot|Sogou|Baidu|Yandex|DuckDuckBot|archive\.org_bot|Semrush|orangebot|AhrefsBot|MJ12bot|Twitterbot|robot\.dlweb|dotbot|rogerbot|SEOkicks|AdsBot|spbot|XoviBot|Cliqzbot|SearchmetricsBot|flamingosearch|SeznamBot|smtbot|MojeekBot|robots\.txt|roboto|Slackbot"
```

Nombre de requêtes par domaines

```
awk '{print $1}' /var/log/apache2/other_vhosts_access.log | sort | uniq -c
```

Supprimer des fichiers contenant une certaine chaîne de texte

```
find . -type f -exec grep -q "blablablabla" {} \; -exec echo rm {} \;
```

Supprimer fichiers de plus de 90 jours dans le répertoire courant

```
find . -mtime +90 -exec rm {} \;
```

Supprimer fichiers de plus de 90 jours dans le répertoire courant, en excluant x.html

```
find . ! -name "*.html" -mtime +90 -exec rm {} \;
```

Effacer fichiers contenant XYZ

```
#!/bin/sh
for i in ./directory/*
do
	if grep -E "XYZ" $i > /dev/null; then
		rm $i
	else
		echo "Not found"
	fi
done
```

Script pour bannir rapidement une adresse IP en ligne de commande

```
#!/bin/bash
if [[ -z "$1" ]]; then
        echo "Veuillez indiquer une adresse IP"
else
        echo "Ban de l'IP $1"
        iptables -A INPUT -p tcp --source "$1" -j DROP
fi
```

---

## Droits/permissions

Changer propriétaire d'un fichier
`chown <user>.<group> <file>`

Changer droits d'un fichier
`chmod 0<rwx> <file>`

Voir https://chmodcommand.com/ Chmod Calculator

Changer droits sur les sous répertoires
`find <path> -type d -print0 | xargs -0 chmod <permissions>`

Changer droits sur certains fichiers
`find . -name "*.php" -print0 | xargs -0 chmod -x`

### Masques

```
    rwx
0 : 000
1 : 001
2 : 010
3 : 011
4 : 100
5 : 101
6 : 110
7 : 111
```

```
      U   G   O
764 = rwx rw- r--
```

---

## Services

### NTP

Mise à l'heure grâce à NTP (Network Time Protocol)
`ntpdate fr.pool.ntp.org`

### MySQL

Démarrer le service
`sudo service mysql start`

Arrêter le service
`sudo service mysql stop`

MySQL UTF-8 (Import) (ou latin1 à la place d'utf8)
`mysql --default_character_set utf8 <...`

Mysql dump vers fichier SQL
`mysqldump --opt -u<user> -p<password> <database> <tables> >export.sql`

MySQL top (slow query à partir de 1 seconde)
`mtop --idle --slow=1`

### Apache

Démarrer Apache
`sudo service apache2 start`

Arrêter Apache
`sudo service apache2 stop`

Redémarrage graceful
`apache2ctl graceful`

Vérifier la syntaxe
`apache2ctl configtest`

Lister les modules chargés
`apache2ctl -t -D DUMP_MODULES`
`apache2ctl -M`

Directives de configuration et MPM
`apache2 -V`

Ordre de chargement des virtualhosts
`apache2ctl -S`

Vérifie la syntaxe de la config apache
`apachectl configtest`

Apache Bench (n : nombre de requêtes, c : en parallèle)
`ab -n 10 -c 5 http://www.mammouthland.net/`

Apache top (spécifier un fichier de log)
`apachetop -f /var/log/apache2/<file.log>`

Exemple :
`apachetop -f /var/log/apache2/other_vhosts_access.log -T 60 -d 2`

Trouver les tentatives wp-login groupées par domaine
`grep "wp-login" /var/log/apache2/other_vhosts_access.log | awk '{print $1}' | sort | uniq -c`

### PHP

Trouver le fichier ini utilisé par PHP
`php --ini`

### Dovecot

Configuration de dovecot
`dovecot -a`

Recharger dovecot
`dovecot reload`

Qui est connecté ?
`dovecot who`

### Gitlab

Liste des services
`gitlab-ctl service-list`

Redémarrer
`gitlab-ctl restart`

Monitorer tous les logs
`sudo gitlab-ctl tail`

### Pure-ftpd

Connectés FTP
`pure-ftpwho`

Administration de Pure-ftpd
`pure-pw`

Ajouter un utilisateur
`pure-pw useradd ftpwww -u <user> -d /var/www/`

Réactualiser la db
`pure-pw mkdb`

Divers

```
pure-pw passwd ftpwww
pure-pw userdel ftpwww
pure-pw show ftpwww
pure-pw list
```

### Rkhunter

Afficher les résultats de la recherche
`rkhunter --check`

Mise à jour db du net
`rkhunter --update`

Mise à jour propriétés fichiers après changements volontaires
`rkhunter --propupd`

### Clam antivirus

Mise à jour db antivirus
`freshclam`

Scanner /
`clamscan -r /`

### Postfix

Vérifier la syntaxe de la configuration
`postfix check`

Afficher la configuration spécifique
`postconf -n`

Liste avec Queue ID (ou postqueue -p)
`mailq`

Afficher le contenu d'un mail
`postcat -q <Queue ID>`

Purger un item
`postsuper -d <Queue ID>`

Purger toute la file d’attente
`postsuper -d ALL`

Flush (Forcer l'envoi des messages en Queue)
`postqueue -f`

Replacer tous les messages en queue (plus puissant que postqueue -f)
`postsuper -r ALL`

### Spamassassin

Apprendre ce mail comme spam => Learned tokens from 1 message(s)
`sa-learn --spam <fichier mail>`

Apprendre ce mail comme non-spam
`sa-learn --ham <fichier mail>`

Oublier ce mail
`sa-learn --forget <fichier mail>`

Effacer l'apprentissage
`sa-learn --clear`

Faire un backup d'apprentissage (STDOUT)
`sa-learn --backup`

Restaurer un backup d'apprentissage
`sa-learn --restore <fichier_backup>`

---

### Alternatives

`update-alternatives --config editor`

---

## Services version init.d

Démarrer un service
`/etc/init.d/<script> start`

Stopper un service
`/etc/init.d/<script> stop`

Recharger un service (après modif. conf par exemple)
`/etc/init.d/<script> reload`

Ajouter au démarrage, option defaults, priorité 99
`update-rc.d <script> defaults 99`

Supprimer
`update-rc.d <script> remove`

---

## AWS S3

Récupérer un fichier
`s3cmd get s3://bucket-name/<file> <local_file>`

Espace occupé
`s3cmd du s3://bucket-name/`

Lister les fichiers
`s3cmd ls s3://bucket-name/`

Supprimer un fichier
`s3cmd del s3://bucket-name/<file>`

---

## Sécurité Linux

1. Vérifier que les utilisateurs inutiles sont retirés ou n’ont pas de mot de passe (passwd -d <user>)
2. Vérifier les groupes
3. Utiliser des clés SSH et le groupe sudo/sudoers
4. Chmod approprié sur les dossiers home et .ssh (dont authorized_keys, etc)
5. Firewall
6. Fermer les services et ports inutiles
7. Suivre les mises à jour de sécurité
