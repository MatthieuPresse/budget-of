var request = require("request");
var fs = require('fs');


['of','pj'].map(function(site){
    console.log(site + 'ConfigBuild');
    var config = JSON.parse(process.env[site + 'ConfigBuild']);

    console.log('ApiKey: ', process.env[site + 'DareboostApiKey']);
    console.log('Configuration: ', config);

    fs.writeFile('./dist/'+site+'/config.js', 'window.configBuild = ' + process.env[site + 'ConfigBuild'], 'utf8', function(){
        (config.monitoring).map(function(el){
            request({
                url: 'https://www.dareboost.com/api/0.5/monitoring/last-report',
                method: "POST",
                json: {
                    "token": process.env[site + 'DareboostApiKey'],
                    "monitoringId": el.id
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    request(body.report.harFileUrl).pipe(fs.createWriteStream('./dist/'+site+'/'+el.file));
                } else {
                    console.log("Err: ", error);
                    process.exit(1);
                }
            });
        });
    });
    fs.createReadStream('./config/data-'+site+'.js').pipe(fs.createWriteStream('./dist/'+site+'/data.js'));

    fs.readdir('./src', function(err, items) {
        items.map(function(item){
            fs.createReadStream('./src/'+item).pipe(fs.createWriteStream('./dist/'+site+'/'+item));
        });
    });

})