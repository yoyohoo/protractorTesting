/*
 * @Author: xz06213
 * @Date:   2016-08-04 17:33:08
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-10 14:19:59
 */

'use strict';
describe('e2e testing`: vrdn contact', function() {

	var newBtn,
		submitBtn,
		cancelBtn,
		contact = {};

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get(browser.baseUrl + '#/vrdncontact');
		browser.manage().timeouts().pageLoadTimeout(10000);
		browser.driver.sleep(1000);
		browser.waitForAngular();
		browser.executeScript("$('.k-window').remove();");
	});

	it('should the url be vrdncontact', function() {
		expect(browser.getLocationAbsUrl()).toBe('/vrdncontact');
	})

	it('should the contact table be 15 records per page', function() {
		element.all(by.binding('firstName')).count().then(function(count) {
			expect(count).toBe(15);
		});
	})

	it('click new button should pop up "New Contact" window', function() {
		newBtn = element(by.className('k-grid-add'));
		newBtn.click();
		var wdTitle = element(by.className('k-window-title')).isDisplayed().getText();
		expect(wdTitle).toBe('New Contact');
	})

	it('click cancel button should hide a pop up window', function() {
		newBtn.click();
		cancelBtn = element(by.css('.k-grid-cancel'));
		browser.actions().mouseMove(cancelBtn).click();
		var EC = protractor.ExpectedConditions;
		browser.wait(EC.presenceOf(cancelBtn), 1000);
		expect(cancelBtn.isPresent()).toBeTruthy();
	})

	it('click save button should submit a contact', function() {
		newBtn.click();
		submitBtn = element(by.css('.k-grid-update'));
		contact.firstName = element(by.css('input[name=firstName]'));
		contact.lastName = element(by.css('input[name=lastName]'));
		contact.company = element(by.css('input[name=company]'));
		contact.title = element(by.css('input[name=title]'));
		contact.email = element(by.css('input[name=email]'));
		contact.phone = element(by.css('input[name=phone]'));
		contact.rates = element(by.css('input[type=checkbox]'));

		contact.firstName.sendKeys('Xianfu');
		contact.lastName.sendKeys('Zhu');
		contact.company.sendKeys('CITI');
		contact.title.sendKeys('Web Front');
		contact.email.sendKeys('Zhu.Xianfu@citi.com');
		contact.phone.sendKeys('13661605745');
		var contactCount1 = element(by.css('.k-pager-info')).getText();
		submitBtn.click().then(function() {
			var contactCount2;
			element(by.css('.k-pager-info')).getText().then(function(text) {
				contactCount2 = text;
			});
			expect(contactCount1 !== contactCount2).toBe(true);

		});
		// browser.pause();
		// browser.sleep(1000);
		// browser.debugger();
	})

	afterEach(function() {
		browser.waitForAngular();
		browser.manage().logs().get('browser').then(function(browserLog) {
			console.log('log: ' + require('util').inspect(browserLog));
		});
	})


});
