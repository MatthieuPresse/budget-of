module.exports = {
    site: 'sfr',
    colors: {
        'missed': '#dd4477',
        'ads': '#3366cc',
        'html': '#dc3912',
        'metier': '#ff9900',
        'stats': '#109618',
        'budget': '#ff0000',
        'compare': '#00ff00',
    },
    psi: [
        {
            nom: 'sfr',
            url: 'https://www.sfr.fr/',
            report: "d_5c750836e967901ab7b25030"
        },
        {
            nom: 'orange',
            url: 'https://www.orange.fr/',
            report: "d_5c78f91de967906b8c4a142a"
        },
        {
            nom: 'free',
            url: 'https://www.free.fr/',
            report: "d_5c78f965e967906b8c4a1430"
        },
        {
            nom: 'sosh',
            url: 'https://www.sosh.fr/',
            report: "d_5c78f96ee967906b8c4a1431"
        },
        {
            nom: 'bouygues',
            url: 'https://www.bouyguestelecom.fr/',
            report: "d_5c78f954e967906b8c4a142e"
        },
        {
            nom: 'red-by-sfr',
            url: 'https://www.red-by-sfr.fr/',
            report: "d_5c78ecc0e967906b8c49fd04"
        },
    ],
    libelles: {
        'PAGE_HOME': 'Une mobile',
        'PAGE_DA': 'Page offre mobile',
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
            budget: 50,
            unit: 'appels',
            compare: [
                51, // Meilleur
            ]
        },
        {
            titre: 'Home poids',
            type: 'TYPE_WEIGHT',
            page: 'PAGE_HOME',
            budget: 750,
            unit: 'KB',
            compare: [
                751, // Meilleur
            ]
        },
        {
            titre: 'Page requêtes',
            type: 'TYPE_REQUEST',
            page: 'PAGE_DA',
            budget: 50,
            unit: 'appels',
            compare: [
                51, // Meilleur
            ]
        },
        {
            titre: 'Page poids',
            type: 'TYPE_WEIGHT',
            page: 'PAGE_DA',
            budget: 750,
            unit: 'KB',
            compare: [
                751, // Meilleur
            ]
        },
    ],
    data_mesures: [
        {
            catname: 'metier',
            list: [
                {
                    name: 'Youtube',
                    filter: [
                        'ytimg.com'
                    ],
                },
            ]
        },
        {
            catname: 'stats',
            list: [
                {
                    name: 'Metrics',
                    filter: [
                        'https://smetrics.sfr.fr'
                    ],
                },
            ]
        },
        {
            catname: 'ads',
            list: [
            ]
        },
        {
            catname: 'html',
            list: [
                {
                    name: 'SFR',
                    filter: [
                        'sfr.fr/',
                        'https://static.s-sfr.fr/',
                    ],
                },
            ]
        },
    ]
};
