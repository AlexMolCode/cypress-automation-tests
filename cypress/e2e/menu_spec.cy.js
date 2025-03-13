import { menuSelectors } from '../fixtures/menu_selectors';
import { inventorySelectors } from '../fixtures/inventory_selectors';
import { shoppingCartSelectors } from '../fixtures/shopping_cart_selectors';

//Test left side menu for the site on multiple pages to confirm essential functionality is not broken
//Also test the navigation links within the menu
describe('Menu Functionality', () => {

    beforeEach(() => {
        cy.login('standard_user','secret_sauce');
      }) 

    it('should be able to open and close the menu on the inventory screen', () => {
        cy.openMenu();
        cy.closeMenu();
    })

    it('should be able to open and close the menu on the shopping cart screen', () => {
        cy.get(inventorySelectors.shoppingCartIcon).click();
        cy.openMenu();
        cy.closeMenu();
    })

    it('should be able to open and close the menu on the checkout screen', () => {
        cy.get(inventorySelectors.shoppingCartIcon).click();
        cy.get(shoppingCartSelectors.checkoutButton).click();
        cy.openMenu();
        cy.closeMenu();
    })

    it('should redirect to the inventory screen after clicking the All Items link', () => {
        cy.openMenu();
        cy.get(menuSelectors.allItemsLink).click();
        cy.url().should('include', '/inventory.html'); 
    })

    it('should redirect to the Sauce Labs site after clicking the About link', () => {
        
        //Catch any Javascript errors thrown by an external site and have Cypress ignore them as they are not relevant to this test
        cy.on('uncaught:exception', (err) => {
            return false;
        });

        cy.openMenu();
        cy.get(menuSelectors.aboutLink).click();
        
        //Allow Cypress commands to run in another domain, saucelabs.com, so we can confirm link functionality
        cy.origin('https://saucelabs.com', () => {
            cy.url().should('include', 'saucelabs.com'); //Confirm the About link goes to this external url
        });
    })

})