describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('abcdeifkdsanflsadfdjsfsdfljdfnfnfnfdjkfs', 10)
    cy.get('#firstName').type('Nicolas')
    cy.get('#lastName').type('Barth')
    cy.get('#email').type('nicolas@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email inválido', () => {
    cy.clock()

    cy.get('#firstName').type('Nicolas')
    cy.get('#lastName').type('Barth')
    cy.get('#email').type('nicolas@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('mantém o campo vazio ao digitar valor não-numérico no telefone', () => {
    cy.get('#phone')
      .type('abcde!@#')
      .should('have.value', '')
  })

  it('valida telefone obrigatório quando checkbox é marcado', () => {
    cy.clock()

    cy.get('#firstName').type('Nicolas')
    cy.get('#lastName').type('Barth')
    cy.get('#email').type('nicolas@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Nicolas').should('have.value', 'Nicolas')
      .clear().should('have.value', '')

    cy.get('#lastName')
      .type('Barth').should('have.value', 'Barth')
      .clear().should('have.value', '')

    cy.get('#email')
      .type('nicolas@gmail.com').should('have.value', 'nicolas@gmail.com')
      .clear().should('have.value', '')

    cy.get('#phone')
      .type('9912117541').should('have.value', '9912117541')
      .clear().should('have.value', '')
  })

  it('exibe erro ao submeter formulário sem preencher campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('envia formulário com sucesso usando comando customizado', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('seleciona um produto (YouTube) por texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por valor', () => {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService)
        .check()
        .should('be.checked')
    })
  })

  it('marca ambos checkboxes e desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check().should('be.checked')
      .last().uncheck().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona arquivo simulando drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona arquivo utilizando fixture com alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('exibe e oculta mensagens de sucesso e erro com .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide').should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide').should('not.be.visible')
  })

  it('preenche campo de texto usando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status').should('be.equal', 200)
    cy.get('@getRequest').its('statusText').should('be.equal', 'OK')
    cy.get('@getRequest').its('body').should('include', 'CAC TAT')
  })

  it('faz aparecer o gato e altera o título', () => {
    cy.get('#cat').invoke('show').should('be.visible')
    cy.get('#title').invoke('text', 'CAT TAT')
  })
})
