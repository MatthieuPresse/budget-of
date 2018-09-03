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
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 64,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 64,
                    },

                }
            },
            {
                name: 'liveintercept',
                filter: ['liveintercept.com'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 18 ,
                        TYPE_WEIGHT: 120,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 13 ,
                        TYPE_WEIGHT: 104,
                    },

                }
            },
            {
                name: 'batch',
                filter: ['batch.com'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 18,
                        TYPE_WEIGHT: 420,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 12,
                        TYPE_WEIGHT: 404,
                    },

                }
            },
            {
                name: 'revive',
                filter: ['of-ajs-autopromo.php'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },

                }
            },
        ]
    },
    {
        catname: 'stats',
        list: [
            {
                name: 'Google Analytics',
                filter: ['google-analytics.com'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 3,
                        TYPE_WEIGHT: 16,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 3,
                        TYPE_WEIGHT: 16,
                    },

                }
            },
            {
                name: 'xiti',
                filter: ['xiti'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 9,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 9,
                    },

                }
            },
            {
                name: 'mpulse',
                filter: ['mpulse'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 56,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 56,
                    },

                }
            },
            {
                name: 'mediego',
                filter: ['mediego'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 20,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 21,
                    },

                }
            },
            {
                name: 'content square',
                filter: ['contentsquare'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 26,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 26,
                    },

                }
            },
            {
                name: 'datadome',
                filter: ['datadome'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 24,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 24,
                    },

                }
            },
            {
                name: 'myfeelback',
                filter: ['kxcdn'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 11,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 11,
                    },

                }
            },
            {
                name: 'ownpage',
                filter: ['ownpage'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 2,
                    },

                }
            },
            {
                name: 'onfocus',
                filter: ['onfocus'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 1,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 2,
                        TYPE_WEIGHT: 1,
                    },

                }
            },
            {
                name: 'nuggad',
                filter: ['nuggad'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 1,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 1,
                    },

                }
            },
            {
                name: 'perfectmarket',
                filter: ['perfectmarket'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 19,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 17,
                        TYPE_WEIGHT: 129,
                    },

                }
            },
            {
                name: 'pixel facebook',
                filter: [
                    'facebook.com/tr',
                    'connect.facebook.net/signals/config',
                ],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 19,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 17,
                        TYPE_WEIGHT: 129,
                    },

                }
            },
        ]
    },
    {
        catname: 'ads',
        list: [
            {
                name: 'digiteka',
                filter: ['digiteka'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 30,
                        TYPE_WEIGHT: 1064,
                    },

                }
            },
            {
                name: 'wibbitz',
                filter: [
                    'wibbitz',
                    'wbtz',
                    'alooma',
                ],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 30,
                        TYPE_WEIGHT: 1064,
                    },

                }
            },
            {
                name: 'invibes',
                filter: [
                    'invibes',
                    'r66net',
                ],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 4,
                        TYPE_WEIGHT: 104,
                    },

                }
            },
            {
                name: 'taboola',
                filter: ['taboola'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 5,
                        TYPE_WEIGHT: 192,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 36,
                        TYPE_WEIGHT: 1480,
                    },

                }
            },
            {
                name: 'ligatus',
                filter: [
                    'ligatus',
                    'ligadx'
                ],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 9,
                        TYPE_WEIGHT: 75,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 3,
                        TYPE_WEIGHT: 245,
                    },

                }
            },
            {
                name: 'teads',
                filter: ['teads'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 20,
                        TYPE_WEIGHT: 345,
                    },

                }
            },
            {
                name: 'GCS',
                filter: ['survey.g.doubleclick'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 100,
                    },

                }
            },
            {
                name: 'viewpay',
                filter: [
                    'viewpay',
                    'jokerly',
                ],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 0,
                    },

                }
            },
            {
                name: 'acpm',
                filter: ['audience.acpm.fr'],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 0,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 0,
                        TYPE_WEIGHT: 0,
                    },

                }
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
                ],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 70,
                        TYPE_WEIGHT: 572,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 86,
                        TYPE_WEIGHT: 516,
                    },

                }
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
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 20,
                        TYPE_WEIGHT: 483,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 30,
                        TYPE_WEIGHT: 444,
                    },

                }
            },
            {
                name: 'GTM',
                filter: [
                    'https://www.googletagmanager.com/',
                ],
                mesures: {
                    PAGE_HOME: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 60,
                    },
                    PAGE_DA: {
                        TYPE_REQUEST: 1,
                        TYPE_WEIGHT: 60,
                    },

                }
            },
        ]
    },
];
