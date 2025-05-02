// Test the Login page validation and functionality on saucedemo.com

import { loginSelectors } from '@/selectors/login-selectors';
import { inventorySelectors } from '@/selectors/inventory-selectors';

describe('Login Validation', () => {
  
  it('should require a username', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get(loginSelectors.loginButton).click();
    cy.get(loginSelectors.errorMessage).should('have.text','Epic sadface: Username is required');
  })

  it ('should require a password if username is present', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get(loginSelectors.usernameInput).type('standard_user');
    cy.get(loginSelectors.loginButton).click();
    cy.get(loginSelectors.errorMessage).should('have.text','Epic sadface: Password is required');
  })

  it('should get an error message if user is locked out', () => {
    cy.login('locked_out_user', 'secret_sauce');
    cy.get(loginSelectors.errorMessage).should('have.text','Epic sadface: Sorry, this user has been locked out.'); 
  })

  it('should get an error message if user does not exist', () => {
    cy.login('invalid_user', 'secret_sauce');
    cy.get(loginSelectors.errorMessage).should('have.text','Epic sadface: Username and password do not match any user in this service'); 
  })

})

describe('Login Functionality', () => {
  
  //Confirm products section displays on the inventory page 
  it('should redirect to the inventory page with a valid login', () => {
    cy.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html'); 
    cy.get(inventorySelectors.productsList).should('be.visible') 
  })

})