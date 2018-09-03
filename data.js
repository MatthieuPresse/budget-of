const TYPE_REQUEST = 1;
const TYPE_WEIGHT  = 2;
const PAGE_HOME    = 3;
const PAGE_DA      = 4;

window.data_budget = [
    {
        titre: 'Home requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_HOME',
        budget: 75,
        unit: 'appels'
    },
    {
        titre: 'Home poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_HOME',
        budget: 1500,
        unit: 'KB'
    },
    {
        titre: 'Détail article requêtes',
        type: 'TYPE_REQUEST',
        page: 'PAGE_DA',
        budget: 150,
        unit: 'appels'
    },
    {
        titre: 'Détail article poids',
        type: 'TYPE_WEIGHT',
        page: 'PAGE_DA',
        budget: 3000,
        unit: 'KB'
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
                name: 'content square',
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
