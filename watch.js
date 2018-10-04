var request = require("request");
var fs = require('fs');
var fsTimeout = null;

console.log('Watching...');
fs.watch('./src', function(etype, filename){
    if (!fsTimeout) {
        console.log('Something changed in', filename, '!');
        JSON.parse(process.env['siteList']).map(function(site){
            fs.createReadStream('./src/'+filename).pipe(fs.createWriteStream('./dist/'+site+'/'+filename));
        });
        console.log('File copied.');

        fsTimeout = setTimeout(function() { fsTimeout=null }, 2000) // give 2 seconds for multiple events
    }
})