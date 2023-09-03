describe('# Login page', () => {
  it('Should allow logging in', () => {
    cy.stubApi()
    cy.visit('/login').wait(8000)
    cy.get('#login-email').type('john@awesome.test')
    cy.get('#login-password').type('asdfasdf')
    cy.get('#login-email').should('have.value', 'john@awesome.test')
    cy.get('#login-password').should('have.value', 'asdfasdf')
    cy.get('button').contains('Sign in').click()
    cy.get('.spinner').should('not.exist')

    cy.visit('/users')

    cy.get('tr').should('have.length.gte', 2)
  })
})
