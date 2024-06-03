/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// **********************************************
import '@frsource/cypress-plugin-visual-regression-diff'

import { api } from './stubApi'

Cypress.Commands.add('interrupt', () => {
  eval("window.top.document.body.querySelector('header button.stop').click()")
})

Cypress.Commands.add('stubApi', () => {
  cy.intercept('POST', 'http://localhost:7180/login', api.login)
  cy.intercept('GET', 'http://localhost:7180/users', api.users)
})

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
//
