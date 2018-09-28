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
        compare: {
            '20 minutes': 234,
            'rt.com': 91,
            'PWA mobile.francetvinfo.fr': 93,
            'LCI': 310,
            'Le Parisien': 218,
            'L Equipe': 96,
            'Le Figaro': 215,
            'BFM TV': 323,
            'huffingtonpost.fr': 102,
        }
    },
    {
        titre: 'Home poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_HOME',
        budget: 1500,
        unit: 'KB',
        compare: {
            '20 minutes': 1400,
            'rt.com': 1300,
            'PWA mobile.francetvinfo.fr': 300,
            'LCI': 2100,
            'Le Parisien': 2300,
            'L Equipe': 1600,
            'Le Figaro': 2300,
            'BFM TV': 3000,
            'huffingtonpost.fr': 1600,
        }
    },
    {
        titre: 'Détail article requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_DA',
        budget: 180,
        unit: 'appels',
        compare: {
            '20 minutes': 266,
            'rt.com': 84,
            'PWA mobile.francetvinfo.fr': 77,
            'LCI': 302,
            'Le Parisien': 555,
            'L Equipe': 255,
            'Le Figaro': 286,
            'BFM TV': 366,
            'huffingtonpost.fr': 195,
        }
    },
    {
        titre: 'Détail article poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_DA',
        budget: 3000,
        unit: 'KB',
        compare: {
            '20 minutes': 4000,
            'rt.com': 3400,
            'PWA mobile.francetvinfo.fr': 161,
            'LCI': 2800,
            'Le Parisien': 4800,
            'L Equipe': 3300,
            'Le Figaro': 2500,
            'BFM TV': 5400,
            'huffingtonpost.fr': 4100,
        }
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
                filter: ['xiti', 'aticdn', 'akstat.io'],
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
                    'bidswitch.net',
                    'google.com/pagead',
                    'exelator.com',
                    'yabidos.com',
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
