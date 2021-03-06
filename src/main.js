$(function(){
    config = require('./data.js');
    var site ="of";
    data_budget_calc = {};
    data_sums_calc = {};
    missed = {};
    var colors = config.colors;
    var libelles = config.libelles;
    var data_budget = config.data_budget;
    var colors = config.colors;
    var site = config.site;
    var data_mesures = config.data_mesures;

    var i = 0;
    var type_pages = [];
    var liste_type = (window.configBuild.monitoring || window.configBuild.reporting || []).map(function(monitoring){
        type_pages[monitoring.type_page] = i;
        i++;
    });

    function pad(number) {
        if ( number < 10 ) {
            return '0' + number;
        }
        return number;
    }
    Date.prototype.toInputDateString = function() {
      return this.getFullYear() +
        '-' + pad( this.getMonth() + 1 ) +
        '-' + pad( this.getDate() ) +
        'T' + pad( this.getHours() ) +
        ':' + pad( this.getMinutes() );
    };

    var urlParams = new URL(window.location).searchParams;
    var _cat = urlParams.getAll("cat");
    var _from = urlParams.get("from");
    var _to = urlParams.get("to");

    _to = new Date(_to ? _to : Date.now());
    _from = new Date(_from ? _from : _to.getTime() - 1 * 1000 * 60 * 60 * 24 * 30); // 30 jours par défaut;

    if(!_cat.length) {
        _cat = [
            'html',
            'stats',
            'metier',
            'ads',
            'missed',
        ];
    }

    (function(){
        return Promise.all(
            (window.configBuild.monitoring || window.configBuild.reporting || []).map(function(monitoring){
                return fetch(monitoring.file).then(function(res){ return res.json()});
            })
        )
    })()
    .then((hars) => {
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
            var entries = hars[type_pages[el.page]].log.entries; // copy for each budget

            // nettoyage
            entries = entries.filter((el) => {
                return el.response.comment != "net::ERR_ABORTED";
            });
            entries = entries.map(match => {match.poid = ((match.response.headers.filter((el) => el.name == 'content-length')[0] ? match.response.headers.filter((el) => el.name == 'content-length')[0].value * 1: match.response.content.size) / 1024).toFixed(2); return match;})
            var baseUrl = entries[0] ? entries[0].request.url : '';

            (data_mesures || []).forEach(function(categorie){
                (categorie.list || []).forEach(function(item){

                    var l = entries.length;
                    // ceux qui matchent
                    var matches = entries.filter((el) => { return _filter(el, item, baseUrl) } );
                    // ceux qui restent
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
                            matches.reduce((acc, el) => acc + el.poid *1, 0);
                    ;
                    data_sums_calc[el.page] = data_sums_calc[el.page] || {};
                    data_sums_calc[el.page][categorie.catname] = data_sums_calc[el.page][categorie.catname] || {};
                    data_sums_calc[el.page][categorie.catname][el.type] = (typeof data_sums_calc[el.page][categorie.catname][el.type] == 'undefined' ? 0 : data_sums_calc[el.page][categorie.catname][el.type]) +
                        data_budget_calc[el.page][item.name][el.type] * 1;
                });
            });

            window.missed[el.page] = window.missed[el.page] || entries.map((e) => {return {'url': e.request.url, 'poid': e.poid}});
            data_sums_calc[el.page]['missed'] = data_sums_calc[el.page]['missed'] || {}
            data_sums_calc[el.page]['missed'][el.type] = el.type == 'TYPE_REQUEST' ?
                    window.missed[el.page].length
                :
                    window.missed[el.page].reduce((acc, el) =>acc + el.poid * 1, 0)
                ;

            data_budget_calc[el.page]['missed'] =  data_budget_calc[el.page]['missed'] || {};
            data_budget_calc[el.page]['missed'].matches = entries;
            data_budget_calc[el.page]['missed'].catname = 'missed';
            data_budget_calc[el.page]['missed'][el.type] = data_sums_calc[el.page]['missed'][el.type];
        });


        console.log('hars', hars);
        console.log('data_budget', data_budget);
        console.log('data_budget_calc', data_budget_calc);
        console.log('data_sums_calc', data_sums_calc);

        var stackedWidth = 250;
        var stackedHeight = 450;

        google.charts.load('current', {packages:['corechart', 'bar']});
        var i =0;
        var divToAppendTo = document.getElementById('columnchart_material');
        google.charts.setOnLoadCallback(function(){
            data_budget.map(function(item){
                var data = [];
                data.push(['Type', 'Comparaison', 'Objectif', 'Site', 'Mesure/analyse', 'Outil métier/market', 'Publicité', 'Non trouvé',]);
                data.push(['', item.compare[0] * 1, item.budget * 1, 0, 0, 0, 0, 0,]);
                data.push(['', item.compare[0] * 1, item.budget * 1, 
                    data_sums_calc[item.page]['html'] ? data_sums_calc[item.page]['html'][item.type] : 0, 
                    data_sums_calc[item.page]['stats'] ? data_sums_calc[item.page]['stats'][item.type] : 0, 
                    data_sums_calc[item.page]['metier'] ? data_sums_calc[item.page]['metier'][item.type] : 0, 
                    data_sums_calc[item.page]['ads'] ? data_sums_calc[item.page]['ads'][item.type] : 0, 
                    data_sums_calc[item.page]['missed'] ? data_sums_calc[item.page]['missed'][item.type] : 0,
                ]);
                data.push(['', item.compare[0] * 1, item.budget * 1, 0, 0, 0, 0, 0,]);

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
                        6:{type: 'bars', color:colors['missed']},
                    }
                };

                var dataBar = [];
                dataBar.push([
                    'Partenaire',
                    libelles[item.type],
                    {role: 'style'},
                    {role: 'tooltip', 'p': {'html': true}},
                ]);
                Object.entries(data_budget_calc[item.page]).map(function(el){
                    console.log((el[0] == 'missed' ? 'Non trouvé': el[0]));
                    dataBar.push([
                        '' + (el[0] == 'missed' ? 'Non trouvé': el[0]),
                        item.type != 'TYPE_REQUEST' && 0 < el[1][item.type]*1 && el[1][item.type]*1 < 5 ? 5 : el[1][item.type] *1,
                        colors[el[1].catname],
                        `<div class="tooltip">
                            <button>Fermer</button>
                            <p style="margin: 0 0 .5em 0;">Partenaire: <strong>`+el[0]+`</strong></p>
                            <p style="margin: 0 0 1.5em 0;">`+libelles[item.type]+`: `+el[1][item.type] *1+`</p>
                            <p style="margin: 0 0 .5em 0;">Liste des appels:
                                <ul><li>`+
                                    el[1].matches.sort((a,b) => {return a.poid*1 > b.poid*1 ? -1 : 1}).map(function(match){
                                        return `
                                            <span>`+match.poid+` KB</span><a href="`+match.request.url+`">`+match.request.url+`</a>
                                        `;
                                    }).join('</li><li>')
                                +`</li></ul>
                            </p>
                        </div>`,
                    ]);
                });
                console.log(google.visualization.arrayToDataTable(dataBar));
                var optionsBar = {
                    chartArea: {
                        left: 150,
                        top: 50,
                        height: stackedHeight + 175,
                        width: 900
                    },
                    fontSize: 14,
                    title: libelles[item.type] + ' - détail',
                    height: stackedHeight + 275,
                    width: 1075,
                    legend: 'none',
                    tooltip: {isHtml: true, trigger: 'selection'},
                    bar: { groupWidth: '25%' },
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
                div.setAttribute('for', 'radio_'+i);
                div.innerText = 'Voir plus';
                div2= document.createElement('button');
                div2.setAttribute('class', 'stacked');
                div2.appendChild(div);
                divToAppendToIn.appendChild(div2);

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
                google.visualization.events.addListener(chartBar, 'ready', function (e) {
                    // console.log(chartBar.container);
                    chartBar.container.addEventListener('click', function(e){
                        if(e.target.tagName == 'BUTTON') {
                            chartBar.setSelection([{}]);

                        }
                    })
                });
                chartBar.draw(google.visualization.arrayToDataTable(dataBar), optionsBar);


                var chartHistoDiv= document.createElement('div');
                chartHistoDiv.setAttribute('class', 'half boite');
                document.getElementById('historique').appendChild(chartHistoDiv);

                var request = new XMLHttpRequest();
                var _possibleCats = [
                    'html',
                    'stats',
                    'metier',
                    'ads',
                    'missed',
                ];
                request.onreadystatechange = function(event) {
                    // XMLHttpRequest.DONE === 4
                    if (this.readyState === XMLHttpRequest.DONE) {
                        if (this.status === 200) {
                            var dataBar = [['Date']];

                            _possibleCats.forEach(el => {
                                if(_cat.indexOf(el) > -1) {
                                    dataBar[0].push(libelles[el]);
                                }
                            });

                            var resultats = JSON.parse(this.responseText);
                            if(resultats.length == 0) return;
                            
                            resultats.forEach(res => {
                                var data = JSON.parse(res.data.S);
                                var col2 = [
                                    new Date(res.timestamp.N * 1).toLocaleString('fr-FR', {day: "numeric", month: "numeric", year: "2-digit", hour12: false, hour: "2-digit", minute: "2-digit"}),
                                ];

                                _possibleCats.forEach(el => {
                                    if(_cat.indexOf(el) > -1) {
                                        col2.push(data[el][item.type]);
                                    }
                                });

                                dataBar.push(col2);
                            })
                            var data = google.visualization.arrayToDataTable(dataBar);

                            var options = {
                                title: libelles[item.page]+' '+libelles[item.type],
                                hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
                                vAxis: {minValue: 0},

                                chartArea: {
                                    left: 40,
                                    top: 50,
                                    width: 1100,
                                    height: 600,
                                },
                                pointSize: 5,
                                fontSize: 14,
                                width: 1500,
                                height: 775,
                                legend: true,
                                isStacked: true,
                                series: [
                                    {color:colors['html']},
                                    {color:colors['stats']},
                                    {color:colors['metier']},
                                    {color:colors['ads']},
                                    {color:colors['missed']},
                                ]
                            };

                            var chart = new google.visualization.AreaChart(chartHistoDiv);
                            chart.draw(data, options);
                        } else {
                            console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                        }
                    }
                };

                request.open('GET', 'https://abz9qip3q4.execute-api.us-east-2.amazonaws.com/Stage/getItems?params='+
                    encodeURI(JSON.stringify({"type":"perf-"+site+"-"+item.page+"-"+item.type,"s1":_from.getTime(), "s2":_to.getTime()})), true);
                request.setRequestHeader('Content-Type', 'application/json');
                request.send();


                i++;
            });

            var _calcScroll = function(){
                var y = 0;
                $('#columnchart_material').css('min-width', 10000+ 'px');

                $('.boite').each(function(x){
                    y+= $(this).outerWidth();
                });

                $('#columnchart_material').css('min-width', (y < $(window).width() ? $(window).width() : y ) + 'px');

            };

            _calcScroll();
            $('input').change(function(){
                _calcScroll();
            });
        });

        document.querySelector('#news').innerHTML= `<p>Test réalisé le `+ new Date(hars[0].log.pages[0].startedDateTime).toLocaleString('fr-FR', {weekday: "long", year: "numeric", month: "long", day: "numeric", hour12: false, hour: "2-digit", minute: "2-digit"}) +` par la Sonde <em>`+hars[0].log.browser.name+` `+hars[0].log.browser.version+`</em> - de `+hars[0].log.creator.name+` </p>`;
    });

    $(document).ready(function() {
        $('#columnchart_material').mousewheel(function(e, delta) {
            $('body').get(0).scrollLeft -= (delta * 85);
            e.preventDefault();
        });
        $('input[name=from').val(_from.toInputDateString());
        $('input[name=to').val(_to.toInputDateString());
        $('select[name=cat] option').each(function(el){
            var $e = $(this);
            $($e.prop('selected', _cat.indexOf($e.val()) > -1));
        })
    });

});
