import { browser, by, element } from 'protractor';

export class RegistrationPage {
  navigateTo() {
    return browser.get('/registration/5bcaef5e4650fa2f9a72c897');
  }

  
  getParagraphHeader() {
    return element(by.css('app-instructions h1')).getText();
  }


  getSubmitButton() {
    return element(by.css('button'));
  }

  getOKButton() {
    return element(by.css('ngb-modal-window button'));
  }

  getContinueButton() {
    return element(by.css('button h5'));
  }

  

}
