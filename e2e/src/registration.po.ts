import { browser, by, element } from 'protractor';

export class RegistrationPage {
  navigateTo() {
    return browser.get('/registration/5bc5d0e4c50bf317461620aa');
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
