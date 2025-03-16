import { loginSelectors } from '../fixtures/login_selectors';
import { inventorySelectors } from '../fixtures/inventory_selectors';
import { shoppingCartSelectors } from '../fixtures/shopping_cart_selectors';

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

    it('Should be able to add product to cart on mobile', () => {
      cy.login('standard_user','secret_sauce');
      cy.get(inventorySelectors.shoppingCartIcon).invoke('text').should('be.empty'); 
      cy.get(inventorySelectors.addBackpackToCart).click();
      cy.get(inventorySelectors.shoppingCartIcon).invoke('text').should('not.be.empty'); 
      cy.get(inventorySelectors.shoppingCartIcon).click();
      cy.get(shoppingCartSelectors.productName).should('have.text','Sauce Labs Backpack');
    })

})