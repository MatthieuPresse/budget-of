
$(function(){
    config = require('./data.js');
    var site = config.site;
    // function pad(number) {
    //     if ( number < 10 ) {
    //         return '0' + number;
    //     }
    //     return number;
    // }
    // Date.prototype.toInputDateString = function() {
    //   return this.getFullYear() +
    //     '-' + pad( this.getMonth() + 1 ) +
    //     '-' + pad( this.getDate() ) +
    //     'T' + pad( this.getHours() ) +
    //     ':' + pad( this.getMinutes() );
    // };

    // var urlParams = new URL(window.location).searchParams;
    // var _from = urlParams.get("from");
    // var _to = urlParams.get("to");

    // _to = new Date(_to ? _to : Date.now());
    // _from = new Date(_from ? _from : _to.getTime() - 1 * 1000 * 60 * 60 * 24 * 30); // 30 jours par défaut;

    // $('input[name=from]').val(_from.toInputDateString());
    // $('input[name=to]').val(_to.toInputDateString());

    // AJAX
    var colors = {
        'missed': '#dedede',
        'ads': '#3366cc',
        'html': '#dc3912',
        'metier': '#ff9900',
        'stats': '#109618',
        'budget': '#ff0000',
        'compare': '#00ff00',
    };
    var _scanned = {};
    var chartHistoDiv= document.getElementById('historique');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                JSON.parse(this.responseText).forEach(res => {
                    var data = JSON.parse(res.data.S);
                    document.getElementById('date').innerHTML = new Date(res.timestamp.N * 1).toLocaleDateString() + ' à ' + new Date(res.timestamp.N * 1).toLocaleTimeString() ;
                    document.getElementById('scorecard').setAttribute('href', 'https://www.thinkwithgoogle.com/feature/mobile/?country=France&network=3G&domains=' + data.map(el => el.url.replace('www.', '').replace('https://', '').replace('http://', '').replace('/', '')).join(','));
                    // console.log("data", data);

                    var _table = [
                       ["Site", "FCP", "FID", "scorecard", "SpeedIndex", "TTFB"]
                    ];
                    data.sort(function(a, b) {
                        return a.speedindex - b.speedindex;
                      }).forEach(d => {
                        _table.push(
                            [
                                d.url.replace('www.', '').replace('https://', '').replace('http://', '').replace('/', ''),
                                d.fcp||0 *1,
                                d.fid||0 *1,
                                d.scorecard||0 *1,
                                d.speedindex||0 *1,
                                d.ttfb||0 *1,
                            ],
                        );

                    });

                    var DataTable = google.visualization.arrayToDataTable(_table);
                    var options = {
                      seriesType: 'bars',
                      height: '600'
                    };
                    // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.ComboChart(document.getElementById('stats'));
                    chart.draw(DataTable, options);
                })
            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };
    request.open('GET', 'https://zv1hfnc4bg.execute-api.eu-west-3.amazonaws.com/prod/psi_historique?params='+
        encodeURI(JSON.stringify({"limit":1, "client":site})), true);
    request.setRequestHeader('Content-Type', 'application/json');

    google.charts.load('current', {packages:['corechart', 'bar']});
    google.charts.setOnLoadCallback(function(){
        request.send();
    });
});
