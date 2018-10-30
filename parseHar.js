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

module.exports = function(entries, config, budget) {
    var data_budget_calc = {};
    var data_sums_calc = {};
    var missed = {};


    // nettoyage
    entries = entries.filter((el) => {
        return el.response.comment != "net::ERR_ABORTED";
    });
    entries = entries.map(match => {match.poid = ((match.response.headers.filter((el) => el.name == 'content-length')[0] ? match.response.headers.filter((el) => el.name == 'content-length')[0].value * 1: match.response.content.size) / 1024).toFixed(2); return match;})
    var baseUrl = entries[0] ? entries[0].request.url : '';

    (config.data_mesures || []).forEach(function(categorie){
        (categorie.list || []).forEach(function(item){

            var l = entries.length;
            // ceux qui matchent
            var matches = entries.filter((el) => { return _filter(el, item, baseUrl) } );
            // ceux qui restent
            entries = entries.filter((el) => { return !_filter(el, item, baseUrl) } );
            data_budget_calc[budget.page] = data_budget_calc[budget.page] || {};
            data_budget_calc[budget.page][item.name] = data_budget_calc[budget.page][item.name] || {};
            data_budget_calc[budget.page][item.name].matches = matches;
            data_budget_calc[budget.page][item.name].catname = categorie.catname;
            data_budget_calc[budget.page][item.name][budget.type] = budget.type == 'TYPE_REQUEST' ?
                    // nombre de requetes
                    l - entries.length
                :
                    // poid
                    matches.reduce((acc, el) => acc + el.poid *1, 0);
            ;
            data_sums_calc[budget.page] = data_sums_calc[budget.page] || {};
            data_sums_calc[budget.page][categorie.catname] = data_sums_calc[budget.page][categorie.catname] || {};
            data_sums_calc[budget.page][categorie.catname][budget.type] = (typeof data_sums_calc[budget.page][categorie.catname][budget.type] == 'undefined' ? 0 : data_sums_calc[budget.page][categorie.catname][budget.type]) +
                data_budget_calc[budget.page][item.name][budget.type] * 1;
            data_sums_calc[budget.page][categorie.catname][budget.type] = Number.parseFloat(data_sums_calc[budget.page][categorie.catname][budget.type]).toFixed(2) * 1;
        });
    });

    missed[budget.page] = missed[budget.page] || entries.map((e) => {return {'url': e.request.url, 'poid': e.poid}});
    data_sums_calc[budget.page]['missed'] = data_sums_calc[budget.page]['missed'] || {}
    data_sums_calc[budget.page]['missed'][budget.type] = budget.type == 'TYPE_REQUEST' ?
            missed[budget.page].length
        :
            missed[budget.page].reduce((acc, el) =>acc + el.poid * 1, 0)
        ;

    data_budget_calc[budget.page]['missed'] =  data_budget_calc[budget.page]['missed'] || {};
    data_budget_calc[budget.page]['missed'].matches = entries;
    data_budget_calc[budget.page]['missed'].catname = 'missed';
    data_budget_calc[budget.page]['missed'][budget.type] = data_sums_calc[budget.page]['missed'][budget.type];

    return {
        data_budget_calc: data_budget_calc,
        data_sums_calc: data_sums_calc,
        missed: missed,
    };
};