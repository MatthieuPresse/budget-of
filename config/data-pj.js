window.colors= {
    'ads': '#3366cc',
    'html': '#dc3912',
    'metier': '#ff9900',
    'stats': '#109618',
    'budget': '#ff0000',
    'compare': '#00ff00',
}

window.libelles= {
    'PAGE_HOME': 'Une mobile',
    'PAGE_FD': 'Fiche détaillée mobile',
    'PAGE_LISTE': 'Liste résultats mobile',
    'TYPE_REQUEST': 'Nombre d\'appels réseau',
    'TYPE_WEIGHT': 'Poid (Kilo octets)',
    'CAT_NAME': 'catégorie',
}

window.data_budget = [
    {
        titre: 'Home requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_HOME',
        budget: 90,
        unit: 'appels',
        compare: [
            96, // doctlib
        ],
    },
    {
        titre: 'Home poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_HOME',
        budget: 1500,
        unit: 'KB',
        compare: [
            1600, // doctlib
        ],
    },
    {
        titre: 'Liste résultats requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_LISTE',
        budget: 90,
        unit: 'appels',
        compare: [
            96, // doctlib
        ],
    },
    {
        titre: 'Liste résultats poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_LISTE',
        budget: 1500,
        unit: 'KB',
        compare: [
            1600, // doctlib
        ],
    },
    {
        titre: 'Fiche détaillée requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_FD',
        budget: 90,
        unit: 'appels',
        compare: [
            96, // doctlib
        ],
    },
    {
        titre: 'Fiche détaillée poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_FD',
        budget: 3000,
        unit: 'KB',
        compare: [
            3300, // doctlib
        ],
    },
]
window.data_mesures = [
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
                    'scorecardresearch',
                    'adfarm',
                    'googlesyndication',
                    'pubmatic',
                    'coll2onf',
                    'videostep.com',
                    'googletagservices.com/tag/js/gpt.js',
                    'storygize.net',
                    'bttrack.com',
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
];
