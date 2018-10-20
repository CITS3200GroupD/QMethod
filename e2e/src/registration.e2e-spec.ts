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
    expect(page.getSubmitButton().getText()).toEqual('Submit');
  });

  
  it('should route to Initial-sort Page', () => {
    page.getSubmitButton().click();
    browser.sleep(1000);
    browser.switchTo().alert().accept(); //Close Alert
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/initial-sort');
  });

// --------Initial-Sort Page -------------
  it('Initial-Sort Page : should Pop-up Instructions', () => {
    expect(page.getOKButton().getText()).toEqual('×');
  });


  it('Initial-Sort Page : should be able to Drag & Drop', () => {
    
    page.getOKButton().click();

    const JS_HTML5_DND = 'function e(e,t,n,i){var r=a.createEvent("DragEvent");r.initMouseEvent(t,!0,!0,o,0,0,0,c,g,!1,!1,!1,!1,0,null),Object.defineProperty(r,"dataTransfer",{get:function(){return d}}),e.dispatchEvent(r),o.setTimeout(i,n)}var t=arguments[0],n=arguments[1],i=arguments[2]||0,r=arguments[3]||0;if(!t.draggable)throw new Error("Source element is not draggable.");var a=t.ownerDocument,o=a.defaultView,l=t.getBoundingClientRect(),u=n?n.getBoundingClientRect():l,c=l.left+(l.width>>1),g=l.top+(l.height>>1),s=u.left+(u.width>>1)+i,f=u.top+(u.height>>1)+r,d=Object.create(Object.prototype,{_items:{value:{}},effectAllowed:{value:"all",writable:!0},dropEffect:{value:"move",writable:!0},files:{get:function(){return this._items.Files}},types:{get:function(){return Object.keys(this._items)}},setData:{value:function(e,t){this._items[e]=t}},getData:{value:function(e){return this._items[e]}},clearData:{value:function(e){delete this._items[e]}},setDragImage:{value:function(e){}}});if(n=a.elementFromPoint(s,f),!n)throw new Error("The target element is not interactable and need to be scrolled into the view.");u=n.getBoundingClientRect(),e(t,"dragstart",101,function(){var i=n.getBoundingClientRect();c=i.left+s-u.left,g=i.top+f-u.top,e(n,"dragenter",1,function(){e(n,"dragover",101,function(){n=a.elementFromPoint(c,g),e(n,"drop",1,function(){e(t,"dragend",1,callback)})})})})';
    var e1 = element(by.className('card main-card text-center drag-handle'));
    var e2 = element(by.className('list-group scroll-box'));
    browser.driver.executeScript(JS_HTML5_DND, e1.getWebElement(), e2.getWebElement());
    
    browser.sleep(1000);
    expect(page.getContinueButton().getText()).toEqual('continue');

  });


  it('Initial-Sort Page : should route to Qsort Page', () => {
    
    page.getContinueButton().click();
    
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/q-sort');

  });

// --------Q-Sort Page -------------

  it('Qsort Page : should Pop-up Instructions', () => {
    
    expect(page.getOKButton().getText()).toEqual('×');

  });


  it('Qsort Page : should be able to Drag & Drop', () => {
    
    page.getOKButton().click();

    const JS_HTML5_DND = 'function e(e,t,n,i){var r=a.createEvent("DragEvent");r.initMouseEvent(t,!0,!0,o,0,0,0,c,g,!1,!1,!1,!1,0,null),Object.defineProperty(r,"dataTransfer",{get:function(){return d}}),e.dispatchEvent(r),o.setTimeout(i,n)}var t=arguments[0],n=arguments[1],i=arguments[2]||0,r=arguments[3]||0;if(!t.draggable)throw new Error("Source element is not draggable.");var a=t.ownerDocument,o=a.defaultView,l=t.getBoundingClientRect(),u=n?n.getBoundingClientRect():l,c=l.left+(l.width>>1),g=l.top+(l.height>>1),s=u.left+(u.width>>1)+i,f=u.top+(u.height>>1)+r,d=Object.create(Object.prototype,{_items:{value:{}},effectAllowed:{value:"all",writable:!0},dropEffect:{value:"move",writable:!0},files:{get:function(){return this._items.Files}},types:{get:function(){return Object.keys(this._items)}},setData:{value:function(e,t){this._items[e]=t}},getData:{value:function(e){return this._items[e]}},clearData:{value:function(e){delete this._items[e]}},setDragImage:{value:function(e){}}});if(n=a.elementFromPoint(s,f),!n)throw new Error("The target element is not interactable and need to be scrolled into the view.");u=n.getBoundingClientRect(),e(t,"dragstart",101,function(){var i=n.getBoundingClientRect();c=i.left+s-u.left,g=i.top+f-u.top,e(n,"dragenter",1,function(){e(n,"dragover",101,function(){n=a.elementFromPoint(c,g),e(n,"drop",1,function(){e(t,"dragend",1,callback)})})})})';
    var e1 = element(by.className('list-group-item no-gap custom-list drag-handle'));
    var e2 = element(by.className('card drag-handle'));
    browser.driver.executeScript(JS_HTML5_DND, e1.getWebElement(), e2.getWebElement());
    
    browser.sleep(1000);
    expect(page.getContinueButton().getText()).toEqual('continue');

  });

  it('QSort Page : should route to Questionnaire Page', () => {
    
    page.getContinueButton().click();
    
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/questionnaire');

  });


  // --------Questionnaire Page -------------
  

  it('Questionnaire Page: should Fill up Questionnaire Form', () => {
    element(by.css('textarea')).sendKeys('Testing');
  });

  it('Questionnaire Page: should display Submit button', () => {
    expect(page.getSubmitButton().getText()).toEqual('Submit');
  });


  it('Questionnaire Page: should route to Submission Page', () => {
    page.getSubmitButton().click();
    expect(browser.getCurrentUrl()).toContain('http://localhost:4200/submission');
  });












});
