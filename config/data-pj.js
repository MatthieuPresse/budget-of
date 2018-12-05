module.exports = {
    site: 'pj',
    colors: {
        'missed': '#dedede',
        'ads': '#3366cc',
        'html': '#dc3912',
        'metier': '#ff9900',
        'stats': '#109618',
        'budget': '#ff0000',
        'compare': '#00ff00',
    },
    libelles: {
        'PAGE_HOME': 'Une mobile',
        'PAGE_FD': 'Fiche détaillée mobile',
        'PAGE_LISTE': 'Liste résultats mobile',
        'TYPE_REQUEST': 'Nombre d\'appels réseau',
        'TYPE_WEIGHT': 'Poid (Kilo octets)',
        'CAT_NAME': 'catégorie',
        'html': 'Site',
        'stats': 'Mesure/analyse',
        'metier': 'Outils métier/market',
        'ads': 'Publicité',
        'missed': 'Non trouvé',
    },
    data_budget: [
        {
            titre: 'Home requêtes',
            type: 'TYPE_REQUEST',
            page: 'PAGE_HOME',
            budget: 95,
            unit: 'appels',
            compare: [
                101, // yellowpages.ca
                25, // doctlib
                107, // lafourchette
                55, // bing
            ],
        },
        {
            titre: 'Home poids',
            type: 'TYPE_WEIGHT',
            page: 'PAGE_HOME',
            budget: 1200,
            unit: 'KB',
            compare: [
                1300, // yellowpages.ca
                1100, // doctlib
                2000, // lafourchette
                523, // bing
            ],
        },
        {
            titre: 'Liste résultats requêtes',
            type: 'TYPE_REQUEST',
            page: 'PAGE_LISTE',
            budget: 115,
            unit: 'appels',
            compare: [
                118, // yellowpages.ca
                66, // doctlib
                119, // lafourchette
                175, // bing
            ],
        },
        {
            titre: 'Liste résultats poids',
            type: 'TYPE_WEIGHT',
            page: 'PAGE_LISTE',
            budget: 1000,
            unit: 'KB',
            compare: [
                1100, // yellowpages.ca
                1500, // doctlib
                1600, // lafourchette
                1500, // bing
            ],
        },
        {
            titre: 'Fiche détaillée requêtes',
            type: 'TYPE_REQUEST',
            page: 'PAGE_FD',
            budget: 90,
            unit: 'appels',
            compare: [
                93, // yellowpages.ca
                33, // doctlib
                118, // lafourchette
                201, // bing
            ],
        },
        {
            titre: 'Fiche détaillée poids',
            type: 'TYPE_WEIGHT',
            page: 'PAGE_FD',
            budget: 1100,
            unit: 'KB',
            compare: [
                1200, // yellowpages.ca
                1200, // doctlib
                1600, // lafourchette
                1700, // bing
            ],
        },
    ],
    data_mesures: [
        {
            catname: 'metier',
            list: [
                {
                    name: 'appsmiles',
                    filter: ['appsmiles'],
                },
                {
                    name: 'accengage',
                    filter: ['accengage'],
                },
                {
                    name: 'kameleoon',
                    filter: [
                        'kameleoon.eu',
                        'mercialfred.com',
                        'lequipe.fr',
                        'winamax',
                        'betclick',
                    ],
                },
                {
                    name: 'gtm',
                    filter: ['googletagmanager.com'],
                },
            ]
        },
        {
            catname: 'stats',
            list: [
                {
                    name: 'xiti',
                    filter: ['xiti', 'aticdn', 'akstat.io', 'smarttag', 'at.pagesjaunes.fr', 'pagesjaunes.fr/stat'],
                },
            ]
        },
        {
            catname: 'ads',
            list: [
                {
                    name: 'pubs',
                    filter: [
                        'ads',
                        'googletag-',
                        'prebid',
                        'iasPET',
                        'doubleclick',
                        'fogl1onf',
                        'staticps.pagesjaunes.fr',
                        'outbrain',
                        'scorecardresearch',
                        'adfarm',
                        'googlesyndication',
                        'pubmatic',
                        'rubicon',
                        'coll2onf',
                        'videostep.com',
                        'googletagservices.com/tag/js/gpt.js',
                        'storygize.net',
                        'bttrack.com',
                        'ligatus',
                        'lqmcdn',
                        'server.exposebox.com',
                        'hello.lqm.io',
                        'quantserve.com',
                        'omtrdc.net',
                        'tags.bluekai.com',
                        'bidswitch.net',
                        'google.com/pagead',
                        'omnitagjs',
                        'adnxs',
                        'adhslx.com',
                        'pixel.advertising.com',
                    ],
                },
            ]
        },
        {
            catname: 'html',
            list: [
                {
                    name: 'gigya',
                    filter: [
                        'gigya',
                    ],
                },
                {
                    name: 'algolia',
                    filter: [
                        'algoliasearch',
                    ],
                },
                {
                    name: 'GTM',
                    filter: [
                        'https://www.googletagmanager.com/',
                    ],
                },
                {
                    name: 'mappy',
                    filter: [
                        'mappy.net',
                    ],
                },
                {
                    name: 'datadome',
                    filter: [
                        'datadome.co',
                    ],
                },
                {
                    name: 'PJ',
                    filter: [
                        'https://www.pagesjaunes.fr/',
                        'static4.pagesjaunes.fr',
                    ],
                },
            ]
        },
    ]
};
