var request = require("request");
var parseHar = require("./parseHar.js");
var fs = require('fs');
var files = [];
var configs = [];

configs['ofConfigSite']= require('./config/data-of.js');
configs['pjConfigSite']= require('./config/data-pj.js');

JSON.parse(process.env['siteList']).forEach(site => {
    console.log(site + 'ConfigBuild');
    var config = JSON.parse(process.env[site + 'ConfigBuild']);

    console.log('ApiKey: ', process.env[site + 'DareboostApiKey']);
    console.log('Configuration: ', config);
    console.log('######');
    console.log('');

    (config.monitoring).forEach(ConfigBuild => {
        request({
            url: 'https://www.dareboost.com/api/0.5/monitoring/reports',
            method: "POST",
            json: {
                "token": process.env[site + 'DareboostApiKey'],
                "monitoringId": ConfigBuild.id,
                "dateFrom": "2018-10-21T00:00:00.000+0100",
                "dateTo": "2018-10-28T23:59:59.999+0100",
                // "dateTo": new Date('2018-10-28T00:00:00.000+0100').toISOString(),
                "error": false // only executions without error
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200 && body.status == 200) {
                // For each report
                body.monitoringData.forEach(monitoring => {
                    console.log('request', monitoring.id);
                    // monitoring.id;
                    request({
                        url: 'https://www.dareboost.com/api/0.5/analysis/report',
                        method: "POST",
                        json: {
                            "token": process.env[site + 'DareboostApiKey'],
                            "reportId": monitoring.id,
                            "metricsOnly": true // lighter
                        }
                    }, function (error, response, body) {
                        if (!error && body.status == 200) { // Normaly status should be 200 concidering /monitoring/reports error options
                            // Transfer file
                            request(body.report.harFileUrl, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    var data_budget = configs[site+'ConfigSite'].data_budget;

                                    data_budget.forEach(budget => {
                                        if(budget.page == ConfigBuild.type_page) {
                                            var entries = JSON.parse(body).log.entries; // copy for each budget
                                            var parsed = parseHar(entries, configs[site+'ConfigSite'], budget);

                                            console.log('#### parsed', site, ConfigBuild.type_page, parsed.data_sums_calc);
                                            request({
                                                    url: 'https://abz9qip3q4.execute-api.us-east-2.amazonaws.com/Stage/save',
                                                    method: 'POST',
                                                    json: {
                                                        "type": "perf-"+site+'-'+budget.page+'-'+budget.type,
                                                        "timestamp": monitoring.date,
                                                        "data": JSON.stringify(parsed.data_sums_calc[budget.page])
                                                    }
                                                },
                                                function(error, httpResponse, body){
                                                    if(!error) {
                                                        console.log('Saved');
                                                    } else {
                                                        console.log("Err saving info to AWS:", site, ConfigBuild.id, error);
                                                        process.exit(1);
                                                    }
                                                }
                                            );
                                        }
                                    });
                                } else {
                                    console.log("Err retrieving har file:", site, ConfigBuild.id, error, body);
                                    process.exit(1);
                                }
                            });

                        } else {
                            console.log("Err retrieving report info:", site, ConfigBuild.id, error, body);
                            process.exit(1);
                        }
                    });
                })

            } else {
                console.log("Err retrieving reports list: ", site, ConfigBuild.id, error, body);
                process.exit(1);
            }
        });
    });
})
