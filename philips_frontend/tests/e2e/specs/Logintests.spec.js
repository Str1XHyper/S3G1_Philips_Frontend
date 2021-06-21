// https://docs.cypress.io/api/introduction/api.html

describe('Login Tests', () => {
  it('Tests succesfull login', () => {
    cy.visit('/')
    cy.get('#input-29').type(Cypress.env('Test_Username'))
    cy.get('#input-33').type(Cypress.env('Test_Password'))
    cy.get('.v-main__wrap').click()
    cy.get('.mr-4').click()
    cy.get('h1').should('have.text', "Dashboard")
  })
  it('Tests login wrong details', () => {
    cy.visit('/')
      cy.get('#input-29').type("wrong username")
      cy.get('#input-33').type("wrong password")
      cy.get('.v-main__wrap').click()
      cy.get('.mr-4').click()
      cy.get('.v-alert__content').should('contain', "Username and password combination incorrect")
  })
})
