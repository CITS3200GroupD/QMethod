import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphHeader() {
    return element(by.css('app-root h1')).getText();
  }

  getParagraphBody() {
    return element(by.css('app-root h4')).getText();
  }

  getLoginButton() {
    return element(by.css('button'));
  }












}
