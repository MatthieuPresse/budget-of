
$(function(){
    function pad(number) {
        if ( number < 10 ) {
            return '0' + number;
        }
        return number;
    }
    Date.prototype.toInputDateString = function() {
      return this.getFullYear() +
        '-' + pad( this.getMonth() + 1 ) +
        '-' + pad( this.getDate() ) +
        'T' + pad( this.getHours() ) +
        ':' + pad( this.getMinutes() );
    };

    var urlParams = new URL(window.location).searchParams;
    var _from = urlParams.get("from");
    var _to = urlParams.get("to");

    _to = new Date(_to ? _to : Date.now());
    _from = new Date(_from ? _from : _to.getTime() - 1 * 1000 * 60 * 60 * 24 * 30); // 30 jours par défaut;

    $('input[name=from]').val(_from.toInputDateString());
    $('input[name=to]').val(_to.toInputDateString());

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
                var dataBar = [['Date']];
                var cols = ["0", "49", "51", "53", "55", "57", "59", "61", "63"];
                cols.forEach(el => {
                    if(el != 0) dataBar[0].push(el);
                });

                var res = JSON.parse(this.responseText);
                console.log(res);

                var total = 0;
                JSON.parse(this.responseText).forEach(res => {
                    var data = JSON.parse(res.data.S);
                    var col2 = [
                        new Date(res.timestamp.N * 1).toLocaleString('fr-FR', {day: "numeric", month: "numeric", year: "2-digit", hour12: false, hour: "2-digit", minute: "2-digit"}),
                    ];

                    data[63] = data[63]*1 + data[0]*1;
                    cols.forEach(el => {
                        var x = data[el] *1 || 0;
                        if(el != 0) col2.push(x);
                        total += x;
                        _scanned[el] = (_scanned[el] ? _scanned[el] : 0) + x;
                    })

                    dataBar.push(col2);
                })
                var data = google.visualization.arrayToDataTable(dataBar);

                var options = {
                    title: "consent",
                    hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
                    vAxis: {minValue: 0},

                    chartArea: {
                        left: 40,
                        top: 50,
                        width: 1100,
                        height: 600,
                    },
                    pointSize: 5,
                    fontSize: 14,
                    width: 1500,
                    height: 775,
                    legend: true,
                    isStacked: true,
                    series: [
                        {color:colors['html']},
                        {color:colors['stats']},
                        {color:colors['metier']},
                        {color:colors['ads']},
                        {color:colors['missed']},
                        {color:colors['html']},
                        {color:colors['stats']},
                    ]
                };

                var chart = new google.visualization.AreaChart(chartHistoDiv);
                chart.draw(data, options);


                console.log('total', _scanned);
                console.log('total', total);
                console.log('accepté au moins le social ' + ((_scanned[63] + _scanned[0] + _scanned[61] + _scanned[59] + _scanned[57]) / total * 100).toFixed(2) + '%');
                console.log('accepté au moins la pub ' + ((_scanned[63] + _scanned[0] + _scanned[59] + _scanned[55] + _scanned[51]) / total * 100).toFixed(2) + '%');
                console.log('accepté au moins les stats ' + ((_scanned[63] + _scanned[0] + _scanned[61] + _scanned[55] + _scanned[53]) / total * 100).toFixed(2) + '%');
                console.log('tout refusé sauf fonctionnel ' + (_scanned[49] / total * 100).toFixed(2) + '%');

                var stats = document.getElementById('stats');
                stats.innerHTML = `<ul>
                    <li><span>total de consentement recueilli sur la période:</span> <span>${total.toLocaleString()}</span></li>
                    <li><span>tout accepté:</span> <span>${((_scanned[63] + _scanned[0]) / total * 100).toFixed(2)}%</span></li>
                    <li><span>accepté au moins le social:</span> <span>${((_scanned[63] + _scanned[0] + _scanned[61] + _scanned[59] + _scanned[57]) / total * 100).toFixed(2)}%</span></li>
                    <li><span>accepté au moins la pub:</span> <span>${((_scanned[63] + _scanned[0] + _scanned[59] + _scanned[55] + _scanned[51]) / total * 100).toFixed(2)}%</span></li>
                    <li><span>accepté au moins les stats:</span> <span>${((_scanned[63] + _scanned[0] + _scanned[61] + _scanned[55] + _scanned[53]) / total * 100).toFixed(2)}%</span></li>
                    <li><span>tout refusé sauf fonctionnel:</span> <span>${(_scanned[49] / total * 100).toFixed(2)}%</span></li>
                </ul>
                `;


            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };
    request.open('GET', 'https://abz9qip3q4.execute-api.us-east-2.amazonaws.com/Stage/get-cmp?params='+
        encodeURI(JSON.stringify({"type":"consent","s1":_from.getTime(), "s2":_to.getTime()})), true);
    request.setRequestHeader('Content-Type', 'application/json');

    google.charts.load('current', {packages:['corechart', 'bar']});
    google.charts.setOnLoadCallback(function(){
        request.send();
    });
});
