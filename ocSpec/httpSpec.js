/*
 * @Author: xz06213
 * @Date:   2016-08-08 15:11:12
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-08 15:48:36
 */

'use strict';

describe('http testting:', function() {

	beforeEach(function() {

	});

	function httpGet(siteUrl) {
		var http = require('http');
		var defer = protractor.promise.defer();
		http.get(siteUrl, function(response) {
			var bodyString = '';
			response.setEncoding('utf8');
			response.on("data", function(chunk) {
				bodyString += chunk;
			});
			response.on('end', function() {
				defer.fulfill({
					statusCode: response.statusCode,
					bodyString: bodyString
				});
			});
		}).on('error', function(e) {
			defer.reject("Got http.get error: " + e.message);
		});
		return defer.promise;
	}

	it('should return 200 and contain proper body', function() {
		httpGet(browser.baseUrl).then(function(result) {
			expect(result.statusCode).toBe(200);
			// console.log(result);
			expect(result.bodyString).toContain('Node');
		});
		browser.pause();
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			console.log('log: ' + require('util').inspect(browserLog));
		});
	})

})
