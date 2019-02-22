var request = require("request");
var fs = require('fs');
var browserify = require('browserify')

if(process.env['INCOMING_HOOK_BODY'] == 'PSI-DAILY') return;

JSON.parse(process.env['siteList']).map(function(site){
    console.log(site + 'ConfigBuild');
    var config = JSON.parse(process.env[site + 'ConfigBuild']);

    console.log('ApiKey: ', process.env[site + 'DareboostApiKey']);
    console.log('Configuration: ', config);
    console.log('######');
    console.log('');

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
                if (!error && response.statusCode === 200 && body.status == 200) {
                    request(body.report.harFileUrl).pipe(fs.createWriteStream('./dist/'+site+'/'+el.file));
                } else {
                    console.log("Err: ",el.id, error, body);
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

    var bundleFs = fs.createWriteStream('./dist/'+site+'/bundle.js');
    var b = browserify('./dist/'+site+'/main.js');
    b.bundle().pipe(bundleFs);

})
