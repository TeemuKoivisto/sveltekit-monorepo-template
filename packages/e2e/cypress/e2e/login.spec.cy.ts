describe('# Login page', () => {
  it('Should allow logging in', () => {
    cy.visit('/login').wait(1000)
    cy.get('#login-email').type('test@asdf.fi')
    cy.get('#login-password').type('asdfasdf')
    cy.get('button').contains('Log in').click()
    cy.wait(1)

    // cy.visit('/users')

    cy.get('tr').should('have.length', 3)
  })
})
