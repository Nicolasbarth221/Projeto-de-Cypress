describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach( () => {
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
      cy.get('#open-text-area').type(longText, { delay: 0})
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      cy.clock()

      cy.get('#firstName').type('Nicolas')
      cy.get('#lastName').type('Barth')
      cy.get('#email').type('nicolas@gmail,com')
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')

    })

    it('e um valor não-numérico for digitado, seu valor continuará vazio', () => {
      cy.get('#phone')
        .type('abcde!@#')
        .should('have.value', '')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.clock()

      cy.get('#firstName').type('Nicolas')
      cy.get('#lastName').type('Barth')
      cy.get('#email').type('nicolas@gmail,com')
      cy.get('#open-text-area').type('Teste')
      cy.get('#phone-checkbox')
        .check()
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')
    })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Nicolas')
      .should('have.value', 'Nicolas')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Barth')
      .should('have.value', 'Barth')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('nicolas@gmail,com')
      .should('have.value', 'nicolas@gmail,com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('9912117541')
      .should('have.value', '9912117541')
      .clear()
      .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.clock()

      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
      cy.clock()
    
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')
    })

//-----------Seção 3-----------//

    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
        .select('Mentoria')
        .should('have.value', 'mentoria')

    })

  
    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

    })

  //-----------Seção 4-----------//

    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
          .check()
          .should('be.checked')

        })
    })

  //-----------Seção 5-----------//

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  //-----------Seção 6-----------//

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  //-----------Seção 7-----------//


/*
=============================================
📌 Cypress - Entendendo o .should()
=============================================

O que é:
---------
.should() é um comando de asserção no Cypress.
Ele verifica se um elemento ou valor atende a uma condição esperada.
Se a condição não for verdadeira, o teste falha.

Sintaxe:
--------
.should(metodoDeVerificacao, valorOpcional1, valorOpcional2)

  Parâmetros:
  -----------
  1️⃣ metodoDeVerificacao → O tipo de teste/checagem (string)
   Exemplos: 'be.visible', 'contain', 'have.text', 'have.attr'

  2️⃣ valorOpcional1 → O nome do atributo ou valor esperado
   (Necessário em métodos como 'have.attr', 'have.text', etc.)

  ️⃣ valorOpcional2 → Valor exato esperado do atributo (quando aplicável)

  .should('have.attr', 'href', 'privacy.html')
  O elemento deve ter um atributo chamado href com o valor privacy.html
  SHOULD=DEVERIA/DEVE
  */

  
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
    })

  //-----------Seção 7-----------//
  //configurações de resoluções e salvar videos//


  //-----------Seção 12-----------//

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')

  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area').invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html',)
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('Fazer Aparecer o Gato', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
  })


})
