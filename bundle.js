(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports = {
    colors: {
        'missed': '#dd4477',
        'ads': '#3366cc',
        'html': '#dc3912',
        'metier': '#ff9900',
        'stats': '#109618',
        'budget': '#ff0000',
        'compare': '#00ff00',
    },
    libelles: {
        'PAGE_HOME': 'Une mobile',
        'PAGE_DA': 'Détail article mobile',
        'TYPE_REQUEST': 'Nombre d\'appels réseau',
        'TYPE_WEIGHT': 'Poid (Kilo octets)',
        'CAT_NAME': 'catégorie',
    },
    data_budget: [
        {
            titre: 'Home requêtes',
            type: 'TYPE_REQUEST',
            page: 'PAGE_HOME',
            budget: 90,
            unit: 'appels',
            compare: [
                96, // L Equipe
                234, // 20 minutes
                91, // rt.com
                93, // PWA mobile.francetvinfo.fr
                310, // LCI
                218, // Le Parisien
                215, // Le Figaro
                323, // BFM TV
                102, // huffingtonpost.fr
            ]
        },
        {
            titre: 'Home poids',
            type: 'TYPE_WEIGHT',
            page: 'PAGE_HOME',
            budget: 1500,
            unit: 'KB',
            compare: [
                1600, // L Equipe
                1400, // 20 minutes
                1300, // rt.com
                300, // PWA mobile.francetvinfo.fr
                2100, // LCI
                2300, // Le Parisien
                2300, // Le Figaro
                3000, // BFM TV
                1600, // huffingtonpost.fr
            ]
        },
        {
            titre: 'Détail article requêtes',
            type: 'TYPE_REQUEST',
            page: 'PAGE_DA',
            budget: 180,
            unit: 'appels',
            compare: [
                255, // L Equipe
                266, // 20 minutes
                84, // rt.com
                77, // PWA mobile.francetvinfo.fr
                302, // LCI
                555, // Le Parisien
                286, // Le Figaro
                366, // BFM TV
                195, // huffingtonpost.fr
            ]
        },
        {
            titre: 'Détail article poids',
            type: 'TYPE_WEIGHT',
            page: 'PAGE_DA',
            budget: 3000,
            unit: 'KB',
            compare: [
                3300, // L Equipe
                4000, // 20 minutes
                3400, // rt.com
                161, // PWA mobile.francetvinfo.fr
                2800, // LCI
                4800, // Le Parisien
                2500, // Le Figaro
                5400, // BFM TV
                4100, // huffingtonpost.fr
            ]
        },
    ],
    data_mesures: [
        {
            catname: 'metier',
            list: [
                {
                    name: 'abtasty',
                    filter: ['abtasty.com'],
                },
                {
                    name: 'liveintercept',
                    filter: ['liveintercept.com'],
                },
                {
                    name: 'batch',
                    filter: ['batch.com'],
                },
                {
                    name: 'mediego',
                    filter: ['mediego'],
                },
                {
                    name: 'myfeelback',
                    filter: ['kxcdn'],
                },
                {
                    name: 'ownpage',
                    filter: ['ownpage'],
                },
                {
                    name: 'revive',
                    filter: ['of-ajs-autopromo.php', 'aquaplatform'],
                },
            ]
        },
        {
            catname: 'stats',
            list: [
                {
                    name: 'Google Analytics',
                    filter: ['google-analytics.com'],
                },
                {
                    name: 'xiti',
                    filter: ['xiti', 'aticdn', 'akstat.io'],
                },
                {
                    name: 'mpulse',
                    filter: ['mpulse'],
                },
                {
                    name: 'contentsquare',
                    filter: ['contentsquare'],
                },
                {
                    name: 'datadome',
                    filter: ['datadome'],
                },
                {
                    name: 'onfocus',
                    filter: ['onfocus'],
                },
                {
                    name: 'nuggad',
                    filter: ['nuggad'],
                },
                {
                    name: 'perfectmarket',
                    filter: ['perfectmarket'],
                },
                {
                    name: 'pixelfacebook',
                    filter: [
                        'facebook.com/tr',
                        'connect.facebook.net/signals/config',
                    ],
                },
            ]
        },
        {
            catname: 'ads',
            list: [
                {
                    name: 'digiteka',
                    filter: ['digiteka'],
                },
                {
                    name: 'wibbitz',
                    filter: [
                        'wibbitz',
                        'wbtz',
                        'alooma',
                        'vidazoo',
                    ],
                },
                {
                    name: 'invibes',
                    filter: [
                        'invibes',
                        'r66net',
                    ],
                },
                {
                    name: 'taboola',
                    filter: ['taboola'],
                },
                {
                    name: 'ligatus',
                    filter: [
                        'ligatus',
                        'ligadx'
                    ],
                },
                {
                    name: 'viewpay',
                    filter: [
                        'viewpay',
                        'jokerly',
                    ],
                },
                {
                    name: 'acpm',
                    filter: ['audience.acpm.fr'],
                },
                {
                    name: 'GCS',
                    filter: ['survey.g.doubleclick'],
                },
                {
                    name: 'Prebid - Adyoulike',
                    filter: [
                        'hb-api.omnitagjs.com',
                    ],
                },
                {
                    name: 'Prebid - Appnexus',
                    filter: [
                        'ib.adnxs.com',
                    ],
                },
                {
                    name: 'Prebid - Criteo',
                    filter: [
                        'criteo.com',
                        'criteo.net',
                    ],
                },
                {
                    name: 'Prebid - Rubicon',
                    filter: [
                        'fastlane.rubiconproject.com',
                    ],
                },
                {
                    name: 'Prebid - Smart',
                    filter: [
                        'www14.smartadserver.com//prebid/v1',
                    ],
                },
                {
                    name: 'Pub - onfocus',
                    filter: [
                        'coll2onf',
                        'fogl1onf',
                    ],
                },
                {
                    name: 'Pub - IAS',
                    filter: [
                        'adsafeprotected',
                    ],
                },
                {
                    name: 'Pub - GPT',
                    filter: [
                        'googletagservices.com/tag/js/gpt.js',
                    ],
                },
                {
                    name: 'Pub - teads',
                    filter: ['teads'],
                },
                {
                    name: 'Pub - DFP',
                    filter: [
                        'securepubads',
                        'doubleclick',
                        'googlesyndication',
                        'ads',
                        'googletag-',
                        'prebid',
                        'scorecardresearch',
                        'adfarm',
                        'pubmatic',
                        'videostep.com',
                        'storygize.net',
                        'bttrack.com',
                        'server.exposebox.com',
                        'hello.lqm.io',
                        'quantserve.com',
                        'omtrdc.net',
                        'tags.bluekai.com',
                        'bidswitch.net',
                        'google.com/pagead',
                        'exelator.com',
                        'yabidos.com',
                        'omnitagjs',
                    ],
                },
            ]
        },
        {
            catname: 'html',
            list: [
                {
                    name: 'OF',
                    filter: [
                        'https://www.ouest-france.fr/',
                        'https://media.ouest-france.fr',
                        'https://sipaof.mgr.consensu.org',
                    ],
                },
                {
                    name: 'GTM',
                    filter: [
                        'https://www.googletagmanager.com/',
                    ],
                },
            ]
        },
    ]
};

},{}],2:[function(require,module,exports){
$(function(){
    config = require('../config/data-of.js');
    data_budget_calc = {};
    data_sums_calc = {};
    missed = {};
    var colors = config.colors;
    var libelles = config.libelles;
    var data_budget = config.data_budget
    var colors = config.colors

    var i = 0;
    var type_pages = [];
    var liste_type = window.configBuild.monitoring.map(function(monitoring){
        type_pages[monitoring.type_page] = i;
        i++;
    });

    (function(){
        return Promise.all(
            window.configBuild.monitoring.map(function(monitoring){
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
                data.push([
                    'Type',
                    'Comparaison',
                    'Objectif',
                    'Site',
                    'Mesure/analyse',
                    'Outil métier/market',
                    'Publicité',
                    'Non trouvé',
                ]);
                data.push([
                    '',
                    item.compare[0] * 1,
                    item.budget * 1,
                    0,
                    0,
                    0,
                    0,
                    0,
                ]);
                data.push([
                    '',
                    item.compare[0] * 1,
                    item.budget * 1,
                    data_sums_calc[item.page]['html'][item.type],
                    data_sums_calc[item.page]['stats'][item.type],
                    data_sums_calc[item.page]['metier'][item.type],
                    data_sums_calc[item.page]['ads'][item.type],
                    data_sums_calc[item.page]['missed'][item.type],
                ]);
                data.push([
                    '',
                    item.compare[0] * 1,
                    item.budget * 1,
                    0,
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
                    dataBar.push([
                        el[0] == 'missed' ? 'Non trouvé': el[0],
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
                    tooltip: {isHtml: true, trigger: 'selection'},
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
});

$(document).ready(function() {
    $('#columnchart_material').mousewheel(function(e, delta) {
        $('body').get(0).scrollLeft -= (delta * 85);
        e.preventDefault();
    });
});

},{"../config/data-of.js":1}]},{},[2]);
