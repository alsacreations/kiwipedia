# Cheatsheet NPM

* [npm](https://www.npmjs.com/) embarqué par Node.
* ou [pnpm](https://pnpm.io/)
* voir <https://www.alsacreations.com/article/lire/1907-Les-gestionnaires-de-paquets-pour-Node--npm-yarn-pnpm.html>

## Installation de dépendances

* `npm install` ou `npm i`
* `npm install --save <package>` installe un package et le sauve dans les dépendances de production
* `npm install --save-dev <package>` installe un package et le sauve dans les dépendances de développement

## Mise à jour

* `npm update` dépendances de production
* `npm update --dev` dépendances de développement

## Maintenance et évolutions

* `npm outdated` liste les dépendances obsolètes
* `npx npm-check -u` interface avancée pour procéder aux mises à jour
* `npx npm-check-updates` [met à jour](https://www.npmjs.com/package/npm-check-updates) package.json vers les dernières versions (_latest_)

## Divers

* `npm ls webpack`
* `npm run` liste les tâches/scripts disponibles

## Debug

* `npm root` et `npm root -g` trouver les dossiers racines
* `npm list -g` lister les packages globaux installés

## Packages globaux utiles

* `npm install -g serve` puis `serve` dans un dossier local pour instancier un mini serveur HTTP

## Sécurité

Sous Windows 11, le système peut refuser d'exécuter `pnpm`, dans ce cas on peut assouplir les restrictions avec un shell administrateur `Set-ExecutionPolicy Unrestricted`.
