var request = require("request");
var fs = require('fs');

console.log(process.env);

[{id: 8461, file: 'home.har'}, {id: 9821, file: 'detail-article.har'}].map(function(el){
request({
    url: 'https://www.dareboost.com/api/0.5/monitoring/last-report',
    method: "POST",
    json: {
        "token": process.env.dareboostApiKey,
        "monitoringId": el.id
    }
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(body)
        request(body.report.harFileUrl).pipe(fs.createWriteStream(el.file));
    } else {
        console.log("Err: ", error);
    }
});
});