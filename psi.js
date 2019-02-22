var request  = require("requestretry");
var fs       = require('fs');
var configs  = [];
var results  = [];

configs['ofConfigSite']= require('./config/data-of.js');
configs['pjConfigSite']= require('./config/data-pj.js');


console.log(process.env['INCOMING_HOOK_BODY']);


JSON.parse(process.env['siteList']).forEach(site => {
    console.log(site + 'ConfigBuild');

    console.log('ApiKey: ', process.env['googleApiKey']);
    console.log('######');
    console.log('');

    var psi = configs[site+'ConfigSite'].psi || [];

    var promise = [];
    psi.forEach(function(psi_conf){
        promise.push(new Promise(function(resolve, reject) {
            var url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='+ psi_conf.url +'&category=performance&locale=fr-FR&strategy=mobile&key=' + process.env['googleApiKey'];
            console.log('url', url);
            request({
                url: url,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    try {
                        var entries = JSON.parse(body);
                        console.log('#### parsed', site, psi_conf.url, entries.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile);
                        console.log('#### parsed', site, psi_conf.url, entries.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile);
                        // console.log('#### parsed', site, entries.originLoadingExperience.metrics);
                        console.log('#### parsed', site, psi_conf.url, entries.lighthouseResult.audits.metrics.details.items[0]['speedIndex']);
                        // console.log('#### parsed', entries.lighthouseResult.audits.metrics.details.items[0]['observedSpeedIndex']);
                        console.log('#### parsed', site, psi_conf.url, entries.lighthouseResult.audits['time-to-first-byte'].displayValue);

                        results.push({
                            'url': psi_conf.url,
                            "fcp": entries.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile,
                            "fid": entries.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile,
                            // "speedindex": entries.lighthouseResult.audits.metrics.details.items[0]['speedIndex'],
                            // "ttfb": entries.lighthouseResult.audits['time-to-first-byte'].displayValue,
                            // "scorecard": 11,
                        });
                        resolve();

                    } catch (error) {
                        console.log("Err saving PSI report:", error);
                        reject();
                    }

                } else {
                    console.log(body)
                    console.log("Err getting PSI report: ", site, psi_conf.url, response.statusCode, body.status, error);
                    reject();
                    process.exit(1);
                }
            });
        }));
    });

    Promise.all(promise).then(function(values) {
        request({
                url: 'https://zv1hfnc4bg.execute-api.eu-west-3.amazonaws.com/prod/psi_historique',
                method: 'POST',
                json: {
                    "client": configs[site+'ConfigSite'].site,
                    "timestamp": new Date().getTime(),
                    "data": results
                }
            },
            function(error, httpResponse, body){
                if(!error) {
                    console.log('Saved');
                } else {
                    console.log("Err saving info to AWS:", site, ConfigBuild.id, error);
                    callbackMap(error);
                    process.exit(1);
                }
            }
        );
    });


})
