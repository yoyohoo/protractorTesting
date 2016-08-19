/*
 * @Author: xz06213
 * @Date:   2016-08-08 17:20:34
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-10 14:24:36
 */

'use strict';
describe('e2e testing: vrdn log on', function() {
	// var ptor, driver;

	// var findByName = function(name) {
	// 	return driver.findElement(protractor.By.name(name));
	// };

	// ptor = protractor.getInstance();
	// driver = ptor.driver;
	// it('Can log in', function() {
	// 	driver.get('https://uat.citivelocity.com/muni/origination/ocangular/app/ocApp.html#/vrdncusip');
	// 	findByName('USER').clear().sendKeys('xz06213');
	// 	findByName('PASSWORD').sendKeys('Zxf511');
	// 	driver.findElement(protractor.By.css('button[type="submit"]')).click();
	// }, 20000);

	// it('Shows the homepage', function() {
	// 	driver.get('https://uat.citivelocity.com/muni/origination/ocangular/app/ocApp.html#/vrdncusip');
	// 	var el = ptor.findElement(protractor.By.css('.k-grid-add'));
	// 	expect(el.getText()).toEqual('ADD CUSIP');
	// }, 30000);

	var logUrl = 'https://uat.citivelocity.com/muni/origination/ocangular/app/ocApp.html';

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.manage().timeouts().pageLoadTimeout(10000);
		browser.driver.sleep(1000);
		browser.get(logUrl);
	});

	it('Can log in', function() {
		element(by.css('input[name=USER]')).clear().sendKeys('xz06213');
		element(by.css('input[name=PASSWORD]')).sendKeys('Zxf511');
		element(by.css('input[type=submit]')).click();
		browser.get(logUrl + '#/vrdncusip');

		expect(1).toBe(0)

		browser.driver.sleep(10000);
		var el = element(by.css('.k-grid-add'));
		expect(el.getText()).toEqual('ADD CUSIP');
		browser.pause();
	}, 3000);

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			console.log('log: ' + require('util').inspect(browserLog));
		});
	});

});
