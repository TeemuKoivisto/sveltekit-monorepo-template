import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      stubApi: () => Cypress.Chainable<void>

      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
    interface ApplicationWindow {}
  }
}
