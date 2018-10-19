import { browser, by, element } from 'protractor';

export class InstructionsPage {
  navigateTo() {
    return browser.get('/instructions/5bc5d0e4c50bf317461620aa');
  }

  
  getParagraphHeader() {
    return element(by.css('app-instructions h1')).getText();
  }

  getAgreeButton() {
    return element(by.css('button'));
  }

 

}
