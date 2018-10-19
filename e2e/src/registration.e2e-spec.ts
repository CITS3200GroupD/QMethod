import { RegistrationPage } from './registration.po';
import { browser, by, element } from 'protractor';

describe('Registration Page', () => {
  let page: RegistrationPage;

  beforeEach(() => {
    page = new RegistrationPage();
  });

  

  it('should Fill up Registration Form', () => {
    page.navigateTo();
    element(by.css('textarea')).sendKeys('Testing');
  });


  it('should display Submit button', () => {
    page.navigateTo();
    expect(page.getSubmitButton().getText()).toEqual('Submit');
  });

  
  it('should route to Initial-sort Page', () => {
    page.navigateTo();
    element(by.css('textarea')).sendKeys('Testing');
    page.getSubmitButton().click();
    browser.sleep(1000);
    browser.switchTo().alert().accept(); //Close Alert
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/initial-sort');
  });


  it('Initial-Sort Page : should Pop-up Instructions', () => {
    expect(page.getOKButton().getText()).toEqual('×');
  });

  /*it('Initial-Sort Page : should route to Q-sort Page', () => {

    var dragElement = element(by.className('card main-card text-center drag-handle'));
    var dropElement = element(by.className('list-group scroll-box'));
    browser.actions().dragAndDrop(dragElement, dropElement).perform();
    browser.actions().dragAndDrop(dragElement, dropElement).perform();
    browser.actions().dragAndDrop(dragElement, dropElement).perform();
    browser.actions().dragAndDrop(dragElement, dropElement).perform();
    browser.actions().dragAndDrop(dragElement, dropElement).perform();
    browser.actions().dragAndDrop(dragElement, dropElement).perform();
    browser.actions().dragAndDrop(dragElement, dropElement).perform();

    page.getContinueButton().click();
    //expect(browser.getCurrentUrl()).toContain('http://localhost:4200/q-sort');
  });
*/


});
