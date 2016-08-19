/*
 * @Author: xz06213
 * @Date:   2016-08-08 14:21:48
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-09 16:51:40
 */

'use strict';
describe('e2e testing: vrdn cusip', function() {

	var newBtn,
		submitBtn,
		cancelBtn,
		cusip = {},
		clearLogs = function() {
			browser.manage().logs().get('browser');
		},
		checkConsoleErrors = function() {
			browser.manage().logs().get('browser').then(function(browserLog) {
				if (browserLog.length) {
					browserLog.forEach(function(log) {
						var error = log.level.value > 900;
						if (error) {
							console.error('ERROR: ', log.message);
							expect(error).toBeFalsy();
						}
					});
				}
			})
		};

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get(browser.baseUrl + '#/vrdncusip');
		browser.manage().timeouts().pageLoadTimeout(10000);
		browser.driver.sleep(1000);
		browser.waitForAngular();
		browser.executeScript("$('.k-window').remove();");
		clearLogs();
	});

	it('click new cusip should call out a pop up window', function() {
		newBtn = element(by.className('k-grid-add'));
		newBtn.click();
		var wdTitle = element(by.className('k-window-title')).isDisplayed().getText();
		expect(wdTitle).toBe('ADD CUSIP');
	})

	it('search for a new cusip "79728FJX0" should be exist', function() {
		newBtn = element(by.className('k-grid-add'));
		newBtn.click();

		var searchTxt = element(by.css('input[name=search')),
			searchBtn = element(by.id('searchBtn'));
		searchTxt.clear().sendKeys('79728FJX0');
		searchBtn.click().then(function() {
			browser.sleep(10000);
			checkConsoleErrors();
		});
	})

	afterEach(function() {
		browser.waitForAngular();
		browser.manage().logs().get('browser').then(function(browserLog) {
			console.log('log: ' + require('util').inspect(browserLog));
		});
	})

});
