describe('# Login page', () => {
  it('Should allow logging in', () => {
    cy.stubApi()
    cy.visit('/login').wait(2000)
    cy.get('#login-email').type('john@awesome.test')
    cy.get('#login-password').type('asdfasdf')
    cy.get('button').contains('Log in').click() //.wait(2000)

    cy.get('.spinner').should('not.exist')

    cy.visit('/users') //.wait(2000)

    cy.get('tr').should('have.length.gte', 2)
  })
})
