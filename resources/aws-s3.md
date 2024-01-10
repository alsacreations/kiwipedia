# Hébergement statique de Nuxt ou Vue sur S3

1. Créer le bucket, et le nommer comme le host CNAME (l’adresse du site), par exemple "www.example.org"
2. Dans les propriétés du bucket > _Website hosting_ > _Enabled_ (donner un _Index Document_ par défaut : index.html en général)
3. Côté zone DNS (ex : sur le manager OVH) faire pointer à l'aide d'un CNAME `www.example.org` sur l'endpoint (trouvable dans les propriétés du bucket S3) par exemple `www.example.org.s3-website-eu-west-1.amazonaws.com`

## Héberger Nuxt en statique sur S3

### Configuration initiale Nuxt sur S3

Sources :

- <https://nuxtjs.org/docs/2.x/deployment/deployment-amazon-web-services>
- <https://www.freecodecamp.org/news/deploy-a-nuxt-app-to-s3-in-5-minutes-515a161eb74f/>
- Installer <https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html>

### AWS console web

S3 : Créer un bucket du nom du site (ex : projet.example.net)

- Activer l'accès web dans les Propriétés (tout en bas)
- Noter l'URL indiquée (ex : projet.example.net.s3-website.eu-central-1.amazonaws.com)

Ajouter dans Autorisations > Stratégie de compartiment

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::projet.example.net/*"
        }
    ]
}

```

IAM : Créer un utilisateur avec accès par clé (_programmatic_).

Dans les autorisations, choisir _Attacher directement les stratégies existantes_ puis _Créer une stratégie_

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::projet.example.net"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:DeleteObject",
        "s3:ListMultipartUploadParts",
        "s3:AbortMultipartUpload"
      ],
      "Resource": ["arn:aws:s3:::projet.example.net/*"]
    }
  ]
}
```

- Ne pas ajouter de balises, donner un nom (ex : _s3-projet-nuxt_) et une description.
- Dans la liste des stratégies pour les autorisations d'accès, rafraîchir (icône flèches en haut à droite) et choisir celle nouvellement créée.
- Noter les clés d'accès + clé secrète (ex : ARFA****** + h8iK*****************)

### AWS CLI

En local lancer `aws configure` et indiquer les identifiants (clé + clé secrète), la région selon l’endroit où le bucket est hébergé (par ex "eu-central-1" pour Francfort, voir <https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region>) et json en "output format".

Lancer l'upload

```sh
npm run generate
aws s3 cp dist s3://projet.example.net --recursive
```

### Cloudfront avec certificat HTTPS

Voir documentation interne.
