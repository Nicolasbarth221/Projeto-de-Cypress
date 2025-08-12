Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
    lastName: 'Does',
    email: 'john@gmail.com',
    text:'testeaaaaa'
}) => {
  cy.get('#firstName').type(data.firstName)
  cy.get('#lastName').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#open-text-area').type(data.text)
  cy.contains('button', 'Enviar').click()
})


