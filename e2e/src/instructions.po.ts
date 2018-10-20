import { browser, by, element } from 'protractor';

export class InstructionsPage {
  navigateTo() {
    return browser.get('/instructions/5bcaef5e4650fa2f9a72c897');
  }


  getParagraphHeader() {
    return element(by.css('app-instructions h1')).getText();
  }

  getAgreeButton() {
    return element(by.css('button'));
  }



}
