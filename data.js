const TYPE_REQUEST = 1;
const TYPE_WEIGHT  = 2;
const PAGE_HOME    = 3;
const PAGE_DA      = 4;

window.data_budget = [
    {
        titre: 'Home requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_HOME',
        budget: 90,
        unit: 'appels',
        compare: [
            {
                name: '20 minutes',
                budget: 234
            },
            {
                name: 'rt.com',
                budget: 91
            },
            {
                name: 'PWA mobile.francetvinfo.fr',
                budget: 93
            },
            {
                name: 'LCI',
                budget: 310
            },
            {
                name: 'Le Parisien',
                budget: 218
            },
            {
                name: 'L Equipe',
                budget: 96
            },
            {
                name: 'Le Figaro',
                budget: 215
            },
            {
                name: 'BFM TV',
                budget: 323
            },
            {
                name: 'huffingtonpost.fr',
                budget: 102
            },
        ]
    },
    {
        titre: 'Home poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_HOME',
        budget: 1500,
        unit: 'KB',
        compare: [
            {
                name: '20 minutes',
                budget: 1400
            },
            {
                name: 'rt.com',
                budget: 1300
            },
            {
                name: 'PWA mobile.francetvinfo.fr',
                budget: 300
            },
            {
                name: 'LCI',
                budget: 2100
            },
            {
                name: 'Le Parisien',
                budget: 2300
            },
            {
                name: 'L Equipe',
                budget: 1600
            },
            {
                name: 'Le Figaro',
                budget: 2300
            },
            {
                name: 'BFM TV',
                budget: 3000
            },
            {
                name: 'huffingtonpost.fr',
                budget: 1600
            },
        ]
    },
    {
        titre: 'Détail article requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_DA',
        budget: 180,
        unit: 'appels',
        compare: [
            {
                name: '20 minutes',
                budget: 266
            },
            {
                name: 'rt.com',
                budget: 84
            },
            {
                name: 'PWA mobile.francetvinfo.fr',
                budget: 77
            },
            {
                name: 'LCI',
                budget: 302
            },
            {
                name: 'Le Parisien',
                budget: 555
            },
            {
                name: 'L Equipe',
                budget: 255
            },
            {
                name: 'Le Figaro',
                budget: 286
            },
            {
                name: 'BFM TV',
                budget: 366
            },
            {
                name: 'huffingtonpost.fr',
                budget: 195
            },
        ]
    },
    {
        titre: 'Détail article poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_DA',
        budget: 3000,
        unit: 'KB',
        compare: [
            {
                name: '20 minutes',
                budget: 4000
            },
            {
                name: 'rt.com',
                budget: 3400
            },
            {
                name: 'PWA mobile.francetvinfo.fr',
                budget: 161
            },
            {
                name: 'LCI',
                budget: 2800
            },
            {
                name: 'Le Parisien',
                budget: 4800
            },
            {
                name: 'L Equipe',
                budget: 3300
            },
            {
                name: 'Le Figaro',
                budget: 2500
            },
            {
                name: 'BFM TV',
                budget: 5400
            },
            {
                name: 'huffingtonpost.fr',
                budget: 4100
            },
        ]
    },
]
window.data_mesures = [
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
                filter: ['xiti'],
            },
            {
                name: 'mpulse',
                filter: ['mpulse'],
            },
            {
                name: 'mediego',
                filter: ['mediego'],
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
                name: 'myfeelback',
                filter: ['kxcdn'],
            },
            {
                name: 'ownpage',
                filter: ['ownpage'],
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
            {
                name: 'Omnitag',
                filter: [
                    'omnitagjs',
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
                name: 'teads',
                filter: ['teads'],
            },
            {
                name: 'GCS',
                filter: ['survey.g.doubleclick'],
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
                name: 'DFP',
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
];
