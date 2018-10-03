var request = require("request");
var fs = require('fs');
var config = JSON.parse(process.env.configBuild);

console.log('ApiKey: ', process.env.dareboostApiKey);
console.log('Configuration: ', config);

fs.writeFile('./config.js', 'window.configBuild = ' + process.env.configBuild, 'utf8', function(){
    (config.monitoring).map(function(el){
        request({
            url: 'https://www.dareboost.com/api/0.5/monitoring/last-report',
            method: "POST",
            json: {
                "token": process.env.dareboostApiKey,
                "monitoringId": el.id
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                request(body.report.harFileUrl).pipe(fs.createWriteStream(el.file));
            } else {
                console.log("Err: ", error);
                process.exit(1);
            }
        });
    });
});