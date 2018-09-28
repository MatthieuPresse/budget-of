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

        var stackedWidth = 450;
        var stackedHeight = 600;



        google.charts.load('current', {packages:['corechart', 'bar']});
        var i =0;
        google.charts.setOnLoadCallback(function(){
            data_budget.map(function(item){
                i++;
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
                    libelles[item.type],
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
                        width: stackedWidth - 250,
                        height: stackedHeight - 200,
                    },
                    fontSize: 14,
                    title: libelles[item.page] + ' par ' + libelles['CAT_NAME'],
                    width: stackedWidth,
                    height: stackedHeight,
                    bar: { groupWidth: '90%' },
                    isStacked: true,
                    series: {
                        0:{type: 'line', color:colors['compare']},
                        1:{type: 'line', color:colors['budget']},
                        2:{type: 'bars', color:colors['html'], labelInLegend: 'Contenu'},
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
                console.log(data_budget_calc[item.page])
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
                        height: stackedHeight - 100,
                    },
                    fontSize: 14,
                    title: libelles[item.page]+ ' - liste des partenaires',
                    height: stackedHeight,
                    width: 1200,
                    bar: { groupWidth: '45%' },
                };

                var div= document.createElement('div');
                div.setAttribute('id', 'column_'+i);
                div.setAttribute('style', 'width: '+ stackedWidth+ 'px; height: '+ stackedHeight +'px; float:left;');
                document.getElementById('columnchart_material').appendChild(div);

                var div= document.createElement('div');
                div.setAttribute('id', 'column_'+i+'_detail');
                div.setAttribute('style', 'width: calc(100% - '+ stackedWidth+ 'px); height: '+ stackedHeight +'px; float:left;');
                document.getElementById('columnchart_material').appendChild(div);
                var chartDiv = document.getElementById('column_'+i);
                var chart = new google.visualization.ComboChart(chartDiv);

                google.visualization.events.addListener(chart, 'ready', function () {
                    var rowIndex = -1;  // find first column
                    var xBeg;    // save first x coord
                    var xWidth;  // save width of column
                    // columns
                    Array.prototype.forEach.call(chartDiv.getElementsByTagName('rect'), function(rect, index) {
                        if (rect.getAttribute('fill') !== colors['budget'] && rect.getAttribute('fill') !== colors['compare']) {
                            rowIndex++;
                            xWidth = parseFloat(rect.getAttribute('width')) / 2;
                            if (rowIndex === 0) {
                                xBeg = parseFloat(rect.getAttribute('x'));
                            }
                        }
                    });

                    // reference line
                    Array.prototype.forEach.call(chartDiv.getElementsByTagName('circle'), function(rect, index) {
                        if (rect.getAttribute('fill') === colors['budget'] || rect.getAttribute('fill') === colors['compare']) {
                            // change line coords
                            var refCoords = rect.getAttribute('d').split(',');
                            refCoords[0] = 'M' + xBeg;
                            var refWidth = refCoords[2].split('L');
                            refWidth[1] = parseFloat(refWidth[1]) + xWidth;
                            refCoords[2] = refWidth.join('L');
                            rect.setAttribute('d', refCoords.join(','));
                        }
                    });
                });

                chart.draw(google.visualization.arrayToDataTable(data), options);

                var chartBar = new google.visualization.BarChart(document.getElementById('column_'+i+'_detail'));
                chartBar.draw(google.visualization.arrayToDataTable(dataBar), optionsBar);
            })
        });
    });
});