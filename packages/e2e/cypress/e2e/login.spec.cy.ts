describe('# Login page', () => {
  it('Should allow logging in', () => {
    cy.visit('/login').wait(1000)
    cy.stubApi()
    cy.get('#login-email').type('john@awesome.test')
    cy.get('#login-password').type('asdfasdf')
    cy.get('button').contains('Log in').click()

    cy.visit('/users')

    cy.get('tr').should('have.length.gte', 2)
  })
})
