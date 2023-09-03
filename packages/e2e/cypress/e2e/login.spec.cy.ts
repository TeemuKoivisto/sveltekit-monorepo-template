describe('# Login page', () => {
  it('Should allow logging in', () => {
    cy.stubApi()
    cy.visit('/login')
    cy.location('pathname', { timeout: 60000 }).should('include', '/login');
    cy.get('#login-email').type('john@awesome.test')
    cy.get('#login-password').type('asdfasdf')
    cy.get('#login-email').should('have.value', 'john@awesome.test')
    cy.get('#login-password').should('have.value', 'asdfasdf')
    cy.get('button').contains('Sign in').click() //.wait(2000)
    cy.get('.spinner').should('not.exist')

    cy.visit('/users') //.wait(2000)

    cy.get('tr').should('have.length.gte', 2)
  })
})
