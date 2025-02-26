import { loginSelectors } from '../fixtures/login_selectors';
import { inventorySelectors } from '../fixtures/inventory_selectors';

describe('Login Functionality', () => {
  const username = 'standard_user';
  const password = 'secret_sauce';

  //Use predefined login to successfully get into the site
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get(loginSelectors.usernameInput).type(username);
    cy.get(loginSelectors.passwordInput).type(password);
    cy.get(loginSelectors.loginButton).click();
    cy.url().should('include', '/inventory.html'); //Confirm successful login state before running tests below
  });

  it('should be logged in successfully to the inventory page', () => {
    cy.get(inventorySelectors.productsList).should('be.visible') //Confirm products section displays on the inventory page
  })

  //Click the left menu nav and then the Logout link to go back to the login page
  it('should be logged out successfully to the login page', () => {
    cy.get(inventorySelectors.menuBar).click();
    cy.get(inventorySelectors.logoutLink).should('be.visible').click();
    cy.url().should('not.include', '/inventory.html');
    cy.get(loginSelectors.loginButton).should('be.visible'); //Confirm login button displays on the page
  }) 
})

describe('Locked Out User', () => {
  const lockedUsername = 'locked_out_user';
  const lockedPassword = 'secret_sauce';

  //Use predefined login to generate an error message
  it('should get an error message instead of logging in', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get(loginSelectors.usernameInput).type(lockedUsername);
    cy.get(loginSelectors.passwordInput).type(lockedPassword);
    cy.get(loginSelectors.loginButton).click();
    cy.contains('Epic sadface: Sorry, this user has been locked out.'); //Confirm new text on the page when locked out
  })
})