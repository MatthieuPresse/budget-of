# performance-budget

- récupère les derniers rapports de sondes de monitoring Dareboost
- les analyse (se basant sur un fichier de configuration) pour en extraire le nombre et le poid des requetes
- affiche les données sous forme de graphique avec un budget (configuré aussi)

# build

configuration en variable d environnement
```
export siteList='[xx]'
export xxConfigBuild='{"monitoring":[{"id":XXX,"file":"page.har","type_page":"PAGE_XXX"}]}'
export xxDareboostApiKey=XXX
```


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

### infos

build.js recupere les rapports, extrait l'information et lance la construction du site avec les assets
> lancé par `yarn build`

watch.js rejoue la construction des assets lors d'un modif
> lancé par `yarn watch`

historique.js parse *le* rapport pour historique en base dynamo aws (via une gateway)
> lancé par un cron zappier toutes les heures


src/index.html affiche le rapport parsé, et l'historique des perfs
src/main.js sert à parer le rapport et intérroger la gateway aws qui récupère les infos d'historique de perfs


config/data-`*`.js sont les scripts de configurations à chaque site configuré en variable d environnement `siteList`


src/cmp.html est une page spécifique cmp qui affiche les informations stockées par https://gitlab.ouest-france.fr/sipa-ouest-france/infrastructure/lambda/infrastructure-app-cmp/tree/cmp-v2
src/cmp.js sert à requeter la gateway aws qui intéroge l'historique cmp
