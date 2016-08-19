/*
 * @Author: xz06213
 * @Date:   2016-07-29 17:55:58
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-17 16:42:57
 */

'use strict';
exports.config = {
	framework: 'jasmine',
	seleniumServerJar: 'selenium/selenium-server-standalone-2.53.1.jar',
	// seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: [
		// 'httpSpec',
		// 'logonSpec.js',
		// 'ocSpec/contactSpec.js',
		'ocSpec/cusipSpec.js'
	],
	baseUrl: 'http://10.102.148.84:1234/',
	// baseUrl: 'https://uat.citivelocity.com/muni/origination/ocangular/app/ocApp.html#/',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	},
	onPrepare: function() {
		browser.manage().window().setSize(1000, 750);
		var jasmineReporters = require('jasmine-reporters');
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
			consolidateAll: true,
			filePrefix: 'ocReporter',
			savePath: 'reporter'
		}));
	},
	capabilities: {
		browserName: 'chrome'
	},
	allScriptsTimeout: 30000
}
