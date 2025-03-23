import { checkoutSelectors } from '@/selectors/checkout-selectors';
import { inventorySelectors } from '@/selectors/inventory-selectors';
import { shoppingCartSelectors } from '@/selectors/shopping-cart-selectors';

describe('UI Errors', () => {
  
  beforeEach(() => {
    cy.login('error_user','secret_sauce');
  }) 

  it('KNOWN BUG: Remove button does not work on the inventory page', () => {
    cy.get(inventorySelectors.addBackpackToCart).click();
    
    // This is to catch the error that will occur in the cy.get following this so the test passes
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('Failed to remove item from cart');
      return false;
    });
    cy.get(inventorySelectors.removeBackpackFromCart).should('be.visible').click();
  })

  // The bug in this case calls an alert box, so I use a stub method to catch it and assert it neatly in the loop
  it('KNOWN BUG: Only the first sorting option works on the inventory page', () => {
    const dropdownOptions = ['Name (Z to A)', 'Price (low to high)', 'Price (high to low)'];
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    
    // Select each sorting option and see if the error alert box comes up for each one
    dropdownOptions.forEach((option) => {
      cy.get(inventorySelectors.sortProducts).select(option).then(() => {
        expect(alertStub).to.have.been.calledWith('Sorting is broken! This error has been reported to Backtrace.');
        alertStub.resetHistory(); // Without this, the assert above will pass if the alert shows just once
      })
    })
  })
    
  it('KNOWN BUG: Last Name field on the checkout page is not accepting input', () => {
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

  it('KNOWN BUG: Finish button is not clickable on final checkout page', () => {
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
