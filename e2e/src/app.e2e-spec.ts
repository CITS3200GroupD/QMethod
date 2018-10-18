import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('Login Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display QMd', () => {
    page.navigateTo();
    expect(page.getParagraphHeader()).toEqual('QMd');
  });

  it('should display Admin Login', () => {
    page.navigateTo();
    expect(page.getParagraphBody()).toEqual('Admin Login');
  });

  it('Button should display login', () => {
    page.navigateTo();
    expect(page.getLoginButton().getText()).toEqual('login');
  });



  





});
