import { InstructionsPage } from './instructions.po';
import { browser, by, element } from 'protractor';

describe('Instructions Page', () => {
  let page: InstructionsPage;

  beforeEach(() => {
    page = new InstructionsPage();
  });

 /*
  
  it('should display Instructions', () => {
    page.navigateTo();
    expect(page.getParagraphHeader()).toEqual('Instructions');
  });

  it('should display Agree button', () => {
    page.navigateTo();
    expect(page.getAgreeButton().getText()).toEqual('Agree');
  });

  it('should route to Registration Page', () => {
    page.navigateTo();
    page.getAgreeButton().click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/registration');
  });


*/


  
  


});
