// These tests are the UI errors found on saucedemo.com using the 'error_user' credentials

import { checkoutSelectors } from '@/selectors/checkout-selectors';
import { inventorySelectors } from '@/selectors/inventory-selectors';
import { shoppingCartSelectors } from '@/selectors/shopping-cart-selectors';

describe('UI Errors', () => {
  
  beforeEach(() => {
    cy.login('error_user','secret_sauce');
  }) 

  // Documented in JIRA ticket CTSBT-4
  it('BUG: "Remove" button does not work on the Inventory page', () => {
    cy.get(inventorySelectors.addBackpackToCart).click();
    
    // Catch expected uncaught exception caused by clicking a broken "Remove" button
    // This allows the test to continue and log the bug instead of failing entirely
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('Failed to remove item from cart');
      return false;
    });
    cy.get(inventorySelectors.removeBackpackFromCart).should('be.visible').click();
  })

  // This bug triggers an alert box when certain sorting options are selected
  // We use a stub to intercept and assert the alert message cleanly within the loop
  // Documented in JIRA ticket CTSBT-5
  it('BUG: Only the first sorting option works on the Inventory page', () => {
    const dropdownOptions = ['Name (Z to A)', 'Price (low to high)', 'Price (high to low)'];
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    
    // Loop through sorting options and verify that the alert appears for each one
    dropdownOptions.forEach((option) => {
      cy.get(inventorySelectors.sortProducts).select(option).then(() => {
        expect(alertStub).to.have.been.calledWith('Sorting is broken! This error has been reported to Backtrace.');
        
        // Reset stub history so the next iteration only checks for a new alert
        alertStub.resetHistory();
      })
    })
  })
  // Documented in JIRA ticket CTSBT-6  
  it('BUG: "Last Name" field on the checkout page does not accept input', () => {
    cy.get(inventorySelectors.addBackpackToCart).click();
    cy.get(inventorySelectors.shoppingCartIcon).click();
    cy.get(shoppingCartSelectors.checkoutButton).click();
    cy.get(checkoutSelectors.firstName).type('First');
    cy.get(checkoutSelectors.zipCode).type('10000'); 
    
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('undefined');
      return false;
    });
    cy.get(checkoutSelectors.lastName).type('Last');  
    })

  // Documented in JIRA ticket CTSBT-7  
  it('BUG: "Finish" button is not clickable on final Checkout page', () => {
    cy.get(inventorySelectors.addBackpackToCart).click();
    cy.get(inventorySelectors.shoppingCartIcon).click();
    cy.get(shoppingCartSelectors.checkoutButton).click();
    cy.get(checkoutSelectors.firstName).type('First');
    cy.get(checkoutSelectors.zipCode).type('10000'); 
    cy.get(checkoutSelectors.continueButton).click();
    
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('C.cesetRart is not a function');
      return false;
    });
    cy.get(checkoutSelectors.finishButton).click()  
    })

  })
