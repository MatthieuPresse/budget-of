$(function(){

    window.data_budget_calc = {};
    window.missed = [];

    (function(){
        return Promise.all([
            (() => {return fetch('./home.har').then((res) => res.json())})(), 
            (() => {return fetch('./detail-article.har').then((res) => res.json())})(), 
        ])
    })()
    .then(([PAGE_HOME, PAGE_DA]) => {
        window['har_data_PAGE_HOME'] = PAGE_HOME;
        window['har_data_PAGE_DA'] = PAGE_DA;

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
        var html= '';
        data_budget.forEach(function(el){
            var entries = window['har_data_'+el.page].log.entries; // copy for each budget
            var baseUrl = entries[0] ? entries[0].request.url : '';

            var sum = 0;
            (data_mesures || []).forEach(function(categorie){
                (categorie.list || []).forEach(function(item){

                    var l = entries.length;
                    var matches = entries.filter((el) => { return _filter(el, item, baseUrl) } );
                    entries = entries.filter((el) => { return !_filter(el, item, baseUrl) } );
                    data_budget_calc[el.page] = data_budget_calc[el.page] || {};
                    data_budget_calc[el.page][item.name] = data_budget_calc[el.page][item.name] || {};
                    data_budget_calc[el.page][item.name].matches = matches;
                    data_budget_calc[el.page][item.name][el.type] = el.type == 'TYPE_REQUEST' ?
                            l - entries.length
                        :
                            (matches.reduce(function (acc, el) {
                                return acc + (el.response.headers.filter((el) => el.name == 'content-length')[0] ? el.response.headers.filter((el) => el.name == 'content-length')[0].value * 1: el.response.content.size);
                            }, 0) / 1024).toFixed(0);
                    ;

                    sum += data_budget_calc[el.page][item.name][el.type];
                });
            });
            window.missed[el.page] = entries.map((e) => {return {'url': e.request.url, 'poid': ((e.response.headers.filter((el) => el.name == 'content-length')[0] ? e.response.headers.filter((el) => el.name == 'content-length')[0].value * 1: e.response.content.size) / 1024).toFixed(2)}});
        });
        console.log(data_budget);
        data_budget.forEach(function(el){
            
            var sum = 0;
            var html_mesures = '';
            (data_mesures || []).forEach(function(categorie){
                var odd = false;
                (categorie.list || []).forEach(function(item){
                    sum += data_budget_calc[el.page][item.name][el.type] * 1;
                    html_mesures += `
                        <li class="b-cat b-cat-` + categorie.catname + (odd ? ' odd' : '' )+`" data-onhover='`+ JSON.stringify(data_budget_calc[el.page][item.name].matches.map(e => {return {'url': e.request.url, 'poid': ((e.response.headers.filter((el) => el.name == 'content-length')[0] ? e.response.headers.filter((el) => el.name == 'content-length')[0].value * 1: e.response.content.size) / 1024).toFixed(2) }})) +`'>
                            <label for="ads">` + item.name +`</label>
                            <span class="input">` + data_budget_calc[el.page][item.name][el.type] * 1 +`</span>
                        </li>`;
                    odd = !odd;
                });
            });

            html = html + `<div class="b">
                    <div class="b-header">
                        <h2 class="b-title">` + el.titre + `</h2>
                        <em class="actual-size" style="left: ` + (el.budget/sum*100).toFixed(2) + `%;">Réel: <span>` + sum.toFixed(0) + `</span> ` + el.unit + `<br />Objectif: économiser ` + (sum.toFixed(0) - el.budget) + ` ` + el.unit + `</em>
                    </div><!--end b-header-->
                    <div class="b-budget">
                        <div class="b-cat-container">
                            <ul class="b-cat-list">` + html_mesures + `
                            </ul><!--end b-bar-->
                            <em class="b-size" style="left: ` + (el.budget/sum*100).toFixed(2) + `%;">Budget: <span>` + el.budget + `</span> ` + el.unit + `</em>
                        </div><!--end cat-container-->
                    </div><!--end b-budget-->
                </div><!--end b-->
                `
        });
        document.querySelector('#budgets').innerHTML= html;
        console.log('matches:', data_budget_calc)

        document.querySelector('#news').innerHTML= `<p>Test réalisé le `+ new Date(PAGE_HOME.log.pages[0].startedDateTime).toLocaleString('fr-FR', {weekday: "long", year: "numeric", month: "long", day: "numeric", hour12: false, hour: "2-digit", minute: "2-digit"}) +` par la Sonde <em>`+PAGE_HOME.log.browser.name+` `+PAGE_HOME.log.browser.version+`</em> - de `+PAGE_HOME.log.creator.name+` </p>`;

        document.querySelector('#missed').innerHTML= `<p>Des éléments n'ont pas étés matchés; <a href="https://groupe-sipa.slack.com/messages/C9CC18TFS">aidez-nous</a> à les classer si vous en connaissez!</p>
        <button data-onhover='`+ JSON.stringify(window.missed['PAGE_HOME']) +`'>Voir ceux de la home</button>
        <button data-onhover='`+ JSON.stringify(window.missed['PAGE_DA']) +`'>Voir ceux du détail article</button>`;

        $('.b').each(function(){
            var scope = $(this);
            var actualSize = parseInt(scope.find('.actual-size span').text());

            scope.find('.b-cat .input').each(function(){
                var $this = $(this),
                        val = parseInt($this.text());

                var categoryWidth = (val/actualSize)*100;

                $this.parent().width(categoryWidth+'%');
            });

            var inputs = scope.find('.b-cat .input'),
                    numInputs = inputs.length,
                    totalActualSize = 0;


            var budgetSize = parseInt(scope.find('.b-size span').text());
            var actualSize = parseInt(scope.find('.actual-size span').text());
            var totalSize = actualSize/budgetSize;

            //If actual val is over budget
            if(totalSize>1) {
                scope.find('.b-header, .actual-size').addClass('has-error');
            scope.find('.b-cat-container').width('100%');
            } else {
                scope.find('.b-header, .actual-size').removeClass('has-error');
                scope.find('.b-cat-container').width(totalSize*100+'%');
            }

        });
    
    });

    var $tooltip = $('.tooltip');
    var tooltip = $tooltip.get(0);

    $(document).on('click', ':not([data-onhover])', function(){
        $tooltip.css('height', 0);
    });

    $(document).on('click', '[data-onhover]', function(e){
        e.stopPropagation();
        var data = JSON.parse($(this).attr('data-onhover') || []);
        if(data.length < 1) return;
        var off = $(this).offset();

        $tooltip.css('height', 'auto');
        $tooltip.css('top', (off.top + 90));

        $tooltip.css('left', (off.left + 10));

        data.sort((a, b) => parseFloat(b.poid) - parseFloat(a.poid));

        var html = '';
        html += `<ul>`;
        data.forEach(function(el){
            html += `<li><span>`+el.poid+` KB</span><a href="`+el.url+`">`+el.url+`</a></li>`

        });
        html += `</ul>`;
        tooltip.innerHTML = html;
        
        if($tooltip.width() + (off.left + 10) > window.innerWidth){
            $tooltip.css('left', window.innerWidth - $tooltip.width());
        }
        if($tooltip.height() + (off.top + 90) > $(document).height()){
            $tooltip.css('top', $(document).height() - $tooltip.height());
        }
    });

});