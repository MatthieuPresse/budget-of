var request  = require("requestretry");
var async    = require("async");
var parseHar = require("./parseHar.js");
var fs       = require('fs');
var files    = [];
var configs  = [];

configs['ofConfigSite']= require('./config/data-of.js');
configs['pjConfigSite']= require('./config/data-pj.js');
configs['redConfigSite']= require('./config/data-red.js');
configs['sfrConfigSite']= require('./config/data-sfr.js');

if(process.env['INCOMING_HOOK_BODY'] == 'PSI-DAILY') return;

JSON.parse(process.env['siteList']).forEach(site => {
    console.log(site + 'ConfigBuild');
    var config = JSON.parse(process.env[site + 'ConfigBuild']);

    console.log('ApiKey: ', process.env[site + 'DareboostApiKey']);
    console.log('Configuration: ', config);
    console.log('######');
    console.log('');
    var args = {};
    process.argv.splice(process.execArgv.length + 2).forEach(item => {
        // Usage
        // npm run historique from="2018-10-20 13:00" to="2018-10-30 13:00"
        if (item.indexOf('=') > -1) {
            args[item.split('=')[0]] = item.split('=')[1];
        }
    });

    (config.monitoring ||[]).forEach(ConfigBuild => {
        request({
            url: 'https://www.dareboost.com/api/0.5/monitoring/reports',
            method: "POST",
            json: {
                "token": process.env[site + 'DareboostApiKey'],
                "monitoringId": ConfigBuild.id,
                "dateFrom": args.from ? new Date(args.from).toISOString() : new Date((new Date().getTime()) - 1 * 1000 * 60 * 90).toISOString(),
                "dateTo": args.to ? new Date(args.to).toISOString() : new Date(new Date().getTime() * 1).toISOString(),
                // "dateTo": new Date('2018-10-28T00:00:00.000+0100').toISOString(),
                "error": false, // only executions without error
                "limit": 0,
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200 && body.status == 200) {
                // For each report
                var dataMonitors = body.monitoringData.filter((item, i) => item.score > 0);
                //dataMonitors = dataMonitors.filter((item, i) => i % 12 === 0);

                async.mapLimit(dataMonitors, 1, (monitoring, callbackMap) => {
                // body.monitoringData.forEach(monitoring => {
                    if(monitoring.score < 0) return;
                    console.log('request', site, ConfigBuild.id ,monitoring.id);
                    // monitoring.id;
                    request({
                        url: 'https://www.dareboost.com/api/0.5/analysis/report',
                        method: "POST",
                        json: {
                            "token": process.env[site + 'DareboostApiKey'],
                            "reportId": monitoring.id,
                            "metricsOnly": true, // lighter,
                        },
                        "retryDelay": 1500,
                        "maxAttempts": 2,
                    }, function (error, response, body) {
                        if (!error && body.status == 200) { // Normaly status should be 200 concidering /monitoring/reports error options
                            // Transfer file
                            request({
                                url: body.report.harFileUrl,
                                "retryDelay": 1500,
                                "maxAttempts": 2,
                            }, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    var data_budget = configs[site+'ConfigSite'].data_budget;

                                    data_budget.forEach(budget => {
                                        if(budget.page == ConfigBuild.type_page) {
                                            try {
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
                                                        },
                                                        "retryDelay": 1500,
                                                        "maxAttempts": 2,
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
                                            } catch (error) {
                                                console.log("Err parsing HAR:", error);
                                                callbackMap(error);
                                            }
                                        }
                                    });
                                    callbackMap(null);
                                } else {
                                    console.log("Err retrieving har file:", site, ConfigBuild.id, error, body);
                                    callbackMap(error);
                                    process.exit(1);
                                }
                            });

                        } else {
                            console.log("Err retrieving report info:", site, ConfigBuild.id, error, body);
                            callbackMap(error);
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
