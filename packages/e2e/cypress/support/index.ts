import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      stubApi: () => Cypress.Chainable<void>
    }
    interface ApplicationWindow {}
  }
}
