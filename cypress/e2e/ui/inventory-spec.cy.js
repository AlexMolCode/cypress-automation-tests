import { inventorySelectors } from '../../fixtures/inventory_selectors';
import { shoppingCartSelectors } from '../../fixtures/shopping_cart_selectors';

describe('Inventory Functionality', () => {
  
  beforeEach(() => {
    cy.login('standard_user','secret_sauce');
  }) 
  
  //Confirm being able to add product to cart as well as the number text on the cart icon updating based on items in cart
  it('should be able to add a product to the shopping cart using the Add to cart button', () => {
    cy.get(inventorySelectors.shoppingCartIcon).invoke('text').should('be.empty'); 
    cy.get(inventorySelectors.addBackpackToCart).click();
    cy.get(inventorySelectors.shoppingCartIcon).invoke('text').should('not.be.empty'); 
    cy.get(inventorySelectors.shoppingCartIcon).click();
    cy.url().should('include', '/cart.html'); 
    cy.get(shoppingCartSelectors.productName).should('have.text','Sauce Labs Backpack');
  })

  //Confirm a product can be removed from the shopping cart as well as the number text on the cart icon to clearing out
  it('should be able to remove a product from the shopping cart using the Remove button', () => {
    cy.get(inventorySelectors.addBackpackToCart).click();
    cy.get(inventorySelectors.removeBackpackFromCart).should('be.visible').click();
    cy.get(inventorySelectors.shoppingCartIcon).invoke('text').should('be.empty');
    cy.get(inventorySelectors.shoppingCartIcon).click(); 
    cy.url().should('include', '/cart.html'); 
    cy.get(shoppingCartSelectors.productName).should('not.exist');
  })

  //Test all four sorting options on the drop down of this page
  //Each case uses arrays sorted in Javascript to compare with the site sorting to assert it is correct
  it('should sort items by price (Low to High)', () => {
    cy.get(inventorySelectors.sortProducts).select('Price (low to high)');
    
    //Get all the page elements that have product price
    cy.get(inventorySelectors.productPrice).then(($prices) => { 
      
      //Convert this list of DOM elements into a Javascript array called pricesArray
      const pricesArray = $prices.get(); 

      //Extract the price from each element, then remove the '$' and convert the price from string to float
      //Put the float values into a new array called prices so we can keep the original pricesArray if needed for debugging
      const prices = pricesArray.map(el => parseFloat(el.innerText.replace('$', '')));

      //Keep the prices array to be the original UI sort for comparison then copy it
      //The copied array will be called sortedPrices and sort the new array using Javascript sort
      const sortedPrices = [...prices].sort((a, b) => a - b); //Sort by ascending price
      
      //If the sortedPrices array doesn't change order compared to the original prices array, then site sorting is correct
      expect(prices).to.deep.equal(sortedPrices); 
    });
  });

  it('should sort items by price (High to Low)', () => {
    cy.get(inventorySelectors.sortProducts).select('Price (high to low)');

    cy.get(inventorySelectors.productPrice).then(($prices) => {
      const pricesArray = $prices.get();
      const prices = pricesArray.map(el => parseFloat(el.innerText.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => b - a); //Sort by descending price
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('should sort items by name (A to Z)', () => {
    cy.get(inventorySelectors.sortProducts).select('Name (A to Z)');

    cy.get(inventorySelectors.productName).then(($names) => {
      const namesArray = $names.get();

      //Since we are working with names instead of prices, we just need to remove any whitespace before moving to new array
      const names = namesArray.map(el => el.innerText.trim());
      const sortedNames = [...names].sort(); //Alphabetical sorting
      expect(names).to.deep.equal(sortedNames);
    });
  });

  it('should sort items by name (Z to A)', () => {
    cy.get(inventorySelectors.sortProducts).select('Name (Z to A)');
    
    cy.get(inventorySelectors.productName).then(($names) => {
      const namesArray = $names.get();
      const names = namesArray.map(el => el.innerText.trim());
      const sortedNames = [...names].sort().reverse(); //Reverse alphabetical sorting
      expect(names).to.deep.equal(sortedNames);
    });
  });

})