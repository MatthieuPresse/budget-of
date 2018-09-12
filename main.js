$(function(){

    window.data_budget_calc = {};
    window.missed = [];

    (function(){
        return Promise.all([
            (() => {return fetch('./home.har').then((res) => res.json())})(),
            (() => {return fetch('./detail-article.har').then((res) => res.json())})(),
        ])
    })()
    .then(([PAGE_HOME, PAGE_DA]) => {
        window['har_data_PAGE_HOME'] = PAGE_HOME;
        window['har_data_PAGE_DA'] = PAGE_DA;

        function _filter(el, item, baseUrl) {
            return item.filter.some((subfilter) => {
                return el.request.url.includes(subfilter)
                    || ( // on essaye de récuperer des appels initiés, mais il y a  beaucoup de faux positifs
                        el._initiator.stack &&
                        el._initiator.stack.callFrames.some((subsub) => {
                            return subsub.url != baseUrl
                                && !subsub.url.includes('prebid')
                                && !subsub.url.includes('googletag-')
                                && !subsub.url.includes('mpulse')
                                && !subsub.url.includes('sipaof.mgr.consensu.org')
                                && !subsub.url.includes('www.google-analytics.com/analytics.js')
                                && subsub.url.includes(subfilter)
                        })
                    )
                });
        }
        var html= '';
        data_budget.forEach(function(el){
            var entries = window['har_data_'+el.page].log.entries; // copy for each budget
            var baseUrl = entries[0] ? entries[0].request.url : '';

            var sum = 0;
            (data_mesures || []).forEach(function(categorie){
                (categorie.list || []).forEach(function(item){

                    var l = entries.length;
                    var matches = entries.filter((el) => { return _filter(el, item, baseUrl) } );
                    entries = entries.filter((el) => { return !_filter(el, item, baseUrl) } );
                    data_budget_calc[el.page] = data_budget_calc[el.page] || {};
                    data_budget_calc[el.page][item.name] = data_budget_calc[el.page][item.name] || {};
                    data_budget_calc[el.page][item.name].matches = matches;
                    data_budget_calc[el.page][item.name][el.type] = el.type == 'TYPE_REQUEST' ?
                            l - entries.length
                        :
                            (matches.reduce(function (acc, el) {
                                return acc + (el.response.headers.filter((el) => el.name == 'content-length')[0] ? el.response.headers.filter((el) => el.name == 'content-length')[0].value * 1: el.response.content.size);
                            }, 0) / 1024).toFixed(0);
                    ;

                    sum += data_budget_calc[el.page][item.name][el.type];
                });
            });
            window.missed[el.page] = entries.map((e) => {return {'url': e.request.url, 'poid': ((e.response.headers.filter((el) => el.name == 'content-length')[0] ? e.response.headers.filter((el) => el.name == 'content-length')[0].value * 1: e.response.content.size) / 1024).toFixed(2)}});
        });
        console.log(data_budget);

        var i = 0;
        data_budget.forEach(function(el){

            var sum = 0;
            var groupChartData = [];
            (data_mesures || []).forEach(function(categorie){
                (categorie.list || []).forEach(function(item){
                    var taille = data_budget_calc[el.page][item.name][el.type] * 1;
                    sum += taille;
                    if(taille) {
                        groupChartData.push({"Reqs": taille, "partenaire": item.name})

                    }
                });
            });
            groupChartData.push({"Reqs": sum, "partenaire": "Total"});
            groupChartData.push({"Reqs": el.budget, "partenaire": "Budget"});


            var mainDiv = document.createElement('div');
            mainDiv.setAttribute('id',  'chart'+i);
            mainDiv.setAttribute('class',  'chart');
            document.querySelector('#charts').appendChild(mainDiv);
            var columnsInfo = { "Reqs": el.titre };

            var barChartConfig = {
                'mainDiv': "#chart"+i,
                'colorRange': ["#2a98cd", "#df7247"],
                'data': groupChartData,
                'columnsInfo': columnsInfo,
                'xAxis': "Reqs",
                'yAxis': "partenaire",
                'label': {
                    'xAxis': el.unit,
                    'yAxis': ""
                },
                'requireLegend': true
            };
            var groupChart = new horizontalGroupBarChart(barChartConfig);

            i++;
        });
    });


});