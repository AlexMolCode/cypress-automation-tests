// Test the site UI of saucedemo.com on a mobile screen

import { loginSelectors } from '@/selectors/login-selectors';
import { inventorySelectors } from '@/selectors/inventory-selectors';
import { shoppingCartSelectors } from '@/selectors/shopping-cart-selectors';
import { checkoutSelectors } from '@/selectors/checkout-selectors';

describe('Mobile Testing - Using Galaxy S main series screensize', () => {

    beforeEach(() => {
      // Set viewport screen to mimic S series screensize since S22 to test all scenarios
      cy.viewport(360, 780); 
    }) 
  
    it('Should display login form correctly on mobile', () => {
      cy.visit("https://www.saucedemo.com/");
      cy.get(loginSelectors.usernameInput).should("be.visible");
      cy.get(loginSelectors.passwordInput).should("be.visible");
      cy.get(loginSelectors.loginButton).should("be.visible");
    })

    it('Should display the full product list on mobile after logging in', () => {
      cy.login('standard_user','secret_sauce');
      
      // Confirm all 6 products appear on the page from top to bottom
      cy.get(inventorySelectors.productsList)
        .children("div")
        .should("have.length", 6) 
        .last()
        .scrollIntoView()
        .should("be.visible");
    })

    it('Should be able to open and close the navigation menu on mobile', () => {
      cy.login('standard_user','secret_sauce');
      cy.openMenu();
      cy.closeMenu();
    })

    it('Should be able to checkout a product and complete an order on mobile', () => {
      cy.login('standard_user','secret_sauce');
      cy.get(inventorySelectors.shoppingCartIcon).invoke('text').should('be.empty'); 
      cy.get(inventorySelectors.addBackpackToCart).click();
      cy.get(inventorySelectors.shoppingCartIcon).invoke('text').should('not.be.empty'); 
      cy.get(inventorySelectors.shoppingCartIcon).click();
      cy.get(shoppingCartSelectors.productName).should('have.text','Sauce Labs Backpack');
      cy.get(shoppingCartSelectors.checkoutButton).click();
      cy.get(checkoutSelectors.firstName).type('First');
      cy.get(checkoutSelectors.lastName).type('Last');
      cy.get(checkoutSelectors.zipCode).type('10000'); 
      cy.get(checkoutSelectors.continueButton).click();
      cy.get(checkoutSelectors.finishButton).click();
      cy.get(checkoutSelectors.checkoutComplete).should('have.text','Checkout: Complete!');  
      cy.get(checkoutSelectors.thankYouText).should('have.text','Thank you for your order!');
      cy.get(checkoutSelectors.homeButton).should('be.visible').click();
      cy.url().should('include', '/inventory.html');   
    })

})