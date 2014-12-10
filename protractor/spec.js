describe('sign up page', function() {
  beforeEach(function() {
    return browser.ignoreSynchronization = true;
  });

  it('should have a title', function() {
    browser.get('http://stormy-anchorage-5874.herokuapp.com/signup');
    expect(browser.getTitle()).toEqual('Node Authentication');
  });
  it('should create a new user', function() {
    browser.get('http://stormy-anchorage-5874.herokuapp.com/signup');
    element(by.name('name')).sendKeys('Testy');
    element(by.name('email')).sendKeys('ztest@gmail.com');
    element(by.name('password')).sendKeys('12345');
    element(by.buttonText('Signup')).click();
    expect(browser.getCurrentUrl()).toEqual('http://stormy-anchorage-5874.herokuapp.com/map');
  });
});
describe('logging in', function() {
  beforeEach(function() {
    return browser.ignoreSynchronization = true;
  });

  it('should accept valid email/password', function() {
    browser.get('http://stormy-anchorage-5874.herokuapp.com/login');
    element(by.name('email')).sendKeys('dtest@gmail.com');
    element(by.name('password')).sendKeys('12345');
    element(by.buttonText('Login')).click();
    expect(browser.getCurrentUrl()).toEqual('http://stormy-anchorage-5874.herokuapp.com/map');
  });
  // it('should throw error with invalid email/password', function() {
  //   browser.get('http://stormy-anchorage-5874.herokuapp.com/login');
  //   element(by.name('email')).sendKeys('nope@gmail.com');
  //   element(by.name('password')).sendKeys('nothappening');
  //   element(by.buttonText('Login')).click();
  //   expect(element(by.css(".alert alert-danger")).getText()).toEqual('No user found.');
  // });
});
