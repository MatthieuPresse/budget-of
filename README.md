# performance-budget

- récupère les derniers rapports de sondes de monitoring Dareboost
- les analyse (se basant sur un fichier de configuration) pour en extraire le nombre et le poid des requetes
- affiche les données sous forme de graphique avec un budget (configuré aussi)

# build
configuration en variable d environnement
export configBuild='{"monitoring":[{"id":XXX,"file":"page.har","type_page":"PAGE_XXX"}]}'
export dareboostApiKey=XXX

script à lancer pour regenerer la page
```
npm run build
```
