# performance-budget

- récupère les derniers rapports de sondes de monitoring Dareboost
- les analyse (se basant sur un fichier de configuration) pour en extraire le nombre et le poid des requetes
- affiche les données sous forme de graphique avec un budget (configuré aussi)

# build
configuration en variable d environnement
export siteList='[xx]'
export xxConfigBuild='{"monitoring":[{"id":XXX,"file":"page.har","type_page":"PAGE_XXX"}]}'
export xxDareboostApiKey=XXX

script à lancer pour regenerer la page
```
yarn build
```

mode dev
```
yarn watch
```

genere l'historique
```
npm run historique from="2018-10-20 13:00" to="2018-10-30 13:00"
```
