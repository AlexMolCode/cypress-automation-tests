// Successfully adding a product to the shopping cart and completing the order on saucedemo.com

import { inventorySelectors } from '@/selectors/inventory-selectors';
import { shoppingCartSelectors } from '@/selectors/shopping-cart-selectors';
import { checkoutSelectors } from '@/selectors/checkout-selectors';

describe('Full checkout test', () => {

  beforeEach(() => {
    cy.login('standard_user','secret_sauce');
  }) 

  it('Should complete a full checkout flow from cart to confirmation', () => {
    cy.get(inventorySelectors.addBackpackToCart).click();
    cy.get(inventorySelectors.shoppingCartIcon).click();
    cy.get(shoppingCartSelectors.productName).should('have.text','Sauce Labs Backpack'); // Confirm it's the correct item
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