// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { loginSelectors } from '../fixtures/login_selectors';
import { menuSelectors } from '../fixtures/menu_selectors';

//Login Commands
Cypress.Commands.add('login',(username, password) => {
    cy.visit('https://www.saucedemo.com/');
    cy.get(loginSelectors.usernameInput).type(username);
    cy.get(loginSelectors.passwordInput).type(password);
    cy.get(loginSelectors.loginButton).click();
  });

// Menu Commands
Cypress.Commands.add('openMenu', () => {
  cy.get(menuSelectors.open).should('be.visible').click();
  cy.get(menuSelectors.menu).should('have.attr', 'aria-hidden', 'false');
  cy.get(menuSelectors.allMenuLinks).should('be.visible');
});

Cypress.Commands.add('closeMenu', () => {
  cy.get(menuSelectors.close).click();
  cy.get(menuSelectors.menu).should('have.attr', 'aria-hidden', 'true');
});