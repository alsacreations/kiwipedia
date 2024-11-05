# Spécification composant Cookie (Bannière Cookie)

## Description globale 📝

Une bannière Cookie est une fenêtre qui apparaît lorsque l'utilisateur arrive sur le site. Elle permet de communiquer les modalités d'utilisation des cookies.

## Screenshot 📸

_Ici une image_

## Description détaillée (mobile et desktop)

## Maquettes 🎨

- Mobile et Desktop (liens)

## Infos techniques générales ⚙️

… Complétez par les informations techniques générales (exemple : _mobile first, valeur des breakpoints, CSS Vanilla ou non, etc._).

## Infos techniques spécifiques ⚙️

- Une bannière Cookie est présente sur toutes les pages tant que l'utilisateur n'a pas accepté ou refusé les cookies.
- Ce composant doit pouvoir être fermé par l'utilisateur (bouton "Fermer" ou "X"), accepter les cookies (bouton "Accepter"), les refuser (bouton "Refuser") ou — en option — les gérer (bouton "Gérer").
- Ce composant est une `<section>` (ou une `<div role="region">`) associée à un `aria-labelledby` ou `aria-label` (voir [Dos and don’ts of accessible cookie banners](https://medium.com/@web-accessibility-education/dos-and-donts-of-accessible-cookie-banners-2c1a3102df2f)).
- Ce composant n'est pas "modal" : il ne bloque pas l'utilisateur et celui-ci peut naviguer normalement sur le site.

## Estimation ⏳

… Estimation de la complexité / temps

## Comment tester ? 🧪

- Vérifier la conformité de l'intégration avec la maquette
- Vérifier les interactions (dans la limite du scope de l'issue)
- Vérifier le parcours au clavier
- Vérifier la responsivité mobile/desktop
