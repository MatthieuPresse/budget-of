$(function(){

    window.data_budget_calc = {};
    window.data_sums_calc = {};
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
                    || ( // on essaye de récuperer des appels initiés, mais y 'a  beaucoup de faux positifs
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
        data_budget.forEach(function(el){
            var entries = window['har_data_'+el.page].log.entries; // copy for each budget
            var baseUrl = entries[0] ? entries[0].request.url : '';

            (data_mesures || []).forEach(function(categorie){
                (categorie.list || []).forEach(function(item){

                    var l = entries.length;
                    var matches = entries.filter((el) => { return _filter(el, item, baseUrl) } );
                    entries = entries.filter((el) => { return !_filter(el, item, baseUrl) } );
                    data_budget_calc[el.page] = data_budget_calc[el.page] || {};
                    data_budget_calc[el.page][item.name] = data_budget_calc[el.page][item.name] || {};
                    data_budget_calc[el.page][item.name].matches = matches;
                    data_budget_calc[el.page][item.name].catname = categorie.catname;
                    data_budget_calc[el.page][item.name][el.type] = el.type == 'TYPE_REQUEST' ?
                            // nombre de requetes
                            l - entries.length
                        :
                            // poid
                            (matches.reduce(function (acc, el) {
                                return acc + (el.response.headers.filter((el) => el.name == 'content-length')[0] ? el.response.headers.filter((el) => el.name == 'content-length')[0].value * 1: el.response.content.size);
                            }, 0) / 1024).toFixed(0);
                    ;
                    data_sums_calc[el.page] = data_sums_calc[el.page] || {};
                    data_sums_calc[el.page][categorie.catname] = data_sums_calc[el.page][categorie.catname] || {};
                    data_sums_calc[el.page][categorie.catname][el.type] = (typeof data_sums_calc[el.page][categorie.catname][el.type] == 'undefined' ? 0 : data_sums_calc[el.page][categorie.catname][el.type]) +
                        data_budget_calc[el.page][item.name][el.type] * 1;
                });
            });
            window.missed[el.page] = entries.map((e) => {return {'url': e.request.url, 'poid': ((e.response.headers.filter((el) => el.name == 'content-length')[0] ? e.response.headers.filter((el) => el.name == 'content-length')[0].value * 1: e.response.content.size) / 1024).toFixed(2)}});
        });


        // console.log('data_budget', data_budget);
        // console.log('data_budget_calc', data_budget_calc);
        // console.log('data_sums_calc', data_sums_calc);
        // console.log('missed', window.missed);

        var colors= {
            'ads': '#3366cc',
            'html': '#dc3912',
            'metier': '#ff9900',
            'stats': '#109618',
            'budget': '#ff0000',
            'compare': '#00ff00',
        }
        var libelles= {
            'PAGE_HOME': 'Une mobile',
            'PAGE_DA': 'Détail article mobile',
            'TYPE_REQUEST': 'Nombre d\'appels réseau',
            'TYPE_WEIGHT': 'Poid (Kilo octets)',
            'CAT_NAME': 'catégorie',
        }

        var stackedWidth = 250;
        var stackedHeight = 450;

        google.charts.load('current', {packages:['corechart', 'bar']});
        var i =0;
        var divToAppendTo = document.getElementById('columnchart_material');
        google.charts.setOnLoadCallback(function(){
            data_budget.map(function(item){
                var data = [];

                data.push([
                    'Type',
                    'L\'Equipe',
                    'Objectif',
                    'CMS/contenu édito',
                    'Mesure/analyse',
                    'Outil métier/market',
                    'Publicité',
                ]);
                data.push([
                    '',
                    item.compare['L Equipe'] * 1,
                    item.budget * 1,
                    0,
                    0,
                    0,
                    0,
                ]);
                data.push([
                    '',
                    item.compare['L Equipe'] * 1,
                    item.budget * 1,
                    data_sums_calc[item.page]['html'][item.type],
                    data_sums_calc[item.page]['stats'][item.type],
                    data_sums_calc[item.page]['metier'][item.type],
                    data_sums_calc[item.page]['ads'][item.type],
                ]);
                data.push([
                    '',
                    item.compare['L Equipe'] * 1,
                    item.budget * 1,
                    0,
                    0,
                    0,
                    0,
                ]);

                var options = {
                    chartArea: {
                        left: 40,
                        top: 50,
                        width: stackedWidth,
                        height: stackedHeight,
                    },
                    fontSize: 14,
                    title: libelles[item.type],
                    width: stackedWidth + 65,
                    height: stackedHeight + 75,
                    bar: { groupWidth: '90%' },
                    isStacked: true,
                    legend: 'none',
                    series: {
                        0:{type: 'line', color:colors['compare']},
                        1:{type: 'line', color:colors['budget']},
                        2:{type: 'bars', color:colors['html']},
                        3:{type: 'bars', color:colors['stats']},
                        4:{type: 'bars', color:colors['metier']},
                        5:{type: 'bars', color:colors['ads']},
                    }
                };

                var dataBar = [];
                dataBar.push([
                    'Partenaire',
                    libelles[item.type],
                    {role: 'style'}
                ]);
                Object.entries(data_budget_calc[item.page]).map(function(el){
                    dataBar.push([
                        el[0],
                        el[1][item.type] *1,
                        colors[el[1].catname]
                    ]);
                });
                var optionsBar = {
                    chartArea: {
                        left: 150,
                        top: 50,
                        height: stackedHeight,
                        width: 900
                    },
                    fontSize: 14,
                    title: libelles[item.type] + ' - détail',
                    height: stackedHeight + 75,
                    width: 1075,
                    legend: 'none',
                    bar: { groupWidth: '45%' },
                };

                var div=null;
                if(i % 2 == 0) {
                    div= document.createElement('div');
                    div.setAttribute('class', 'half boite');
                    document.getElementById('columnchart_material').appendChild(div);
                    divToAppendTo = div;

                    div= document.createElement('h2');
                    div.innerText = libelles[item.page];
                    divToAppendTo.appendChild(div);
                }

                var divToAppendToInner = divToAppendTo;
                div= document.createElement('div');
                div.setAttribute('class', 'half');
                divToAppendToInner.appendChild(div);
                divToAppendToIn = div;

                div= document.createElement('div');
                div.setAttribute('id', 'column_'+i);
                div.setAttribute('class', 'stacked');
                var chartDiv = div;
                divToAppendToIn.appendChild(div);

                div= document.createElement('label');
                div.setAttribute('class', 'stacked');
                div.setAttribute('for', 'radio_'+i);
                div.innerText = 'Voir plus';
                divToAppendToIn.appendChild(div);

                div= document.createElement('input');
                div.setAttribute('class', 'stacked');
                div.setAttribute('id', 'radio_'+i);
                div.setAttribute('type', 'checkbox');
                div.setAttribute('name', 'radio_liste');
                divToAppendToIn.appendChild(div);

                var chart = new google.visualization.ComboChart(chartDiv);
                chart.draw(google.visualization.arrayToDataTable(data), options);

                div= document.createElement('div');
                div.setAttribute('id', 'column_'+i+'_detail');
                div.setAttribute('class', 'liste');
                var chartBarDiv = div;
                divToAppendToIn.appendChild(div);

                var chartBar = new google.visualization.BarChart(chartBarDiv);
                chartBar.draw(google.visualization.arrayToDataTable(dataBar), optionsBar);

                i++;
            });

            window._calcScroll();
            $('input').change(function(){
                window._calcScroll();
            });
        });
    });
});
window._calcScroll = function(){
    var y = 0;
    $('#columnchart_material').css('min-width', 10000+ 'px');

    $('.boite').each(function(x){
        y+= $(this).outerWidth();
    });

    $('#columnchart_material').css('min-width', (y < $(window).width() ? $(window).width() : y ) + 'px');

};
