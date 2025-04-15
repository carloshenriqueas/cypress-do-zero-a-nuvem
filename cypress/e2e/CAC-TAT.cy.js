/// <reference types="cypress"/>
const dataUser = require('../fixtures/data.json')

beforeEach(() => {
    cy.visit('./src/index.html')
});

describe('Central de atendimento CAT-TAT', () => { 
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('Preencha os campos obrigatórios e envie o formulário', () => {
    cy.fillMandatoryFieldsAndSubmit(dataUser.firstName, dataUser.lastName, dataUser.email, dataUser.message)
    cy.contains('button', 'Enviar').should('be.visible','Mensagem enviada com sucesso.')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email inválido', () => {
    cy.fillMandatoryFieldsAndSubmit(dataUser.firstName, dataUser.lastName, dataUser.wrongmail, dataUser.message)
    cy.get('button[type="submit"]').click()
    cy.get('.error > strong').should('be.visible','Valide os campos obrigatórios!')
  });

  it('valida se campo telefone é vazio ao digitar valor não numérico', () => {
    cy.get('#phone').type('abc').should('have.value','')
    
  });

  it('Mensagem de erro telefone como obrigatório', () => {
    cy.fillLessPhone(dataUser.firstName, dataUser.lastName, dataUser.email, dataUser.message)
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    cy.get('.error > strong').should('be.visible','Valide os campos obrigatórios!')
  });

  it('Checa valor e depois limpa campo', () => {
    cy.get('#firstName').type('Carlos').should('have.value','Carlos')
    cy.get('#firstName').clear().should('have.value','')
    cy.get('#lastName').type('Santos').should('have.value','Santos')
    cy.get('#lastName').clear().should('have.value','')
    cy.get('#email').type('carloshenrique39@gmail.com').should('have.value','carloshenrique39@gmail.com')
    cy.get('#email').clear().should('have.value','')
    cy.get('#phone').type('77999913026').should('have.value','77999913026')
    cy.get('#phone').clear().should('have.value','')
  });

  it('Checa mensagem erro campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error > strong').should('be.visible','Valide os campos obrigatórios!')
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')

  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(type=>{
      cy.wrap(type).check().should('be.checked')
    })
  });

  it('marca ambos check boxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/data.json').should(input=>{
      expect(input[0].files[0].name).to.equal('data.json')
    })
  })

  it('Seleciona um arquivo utilizando fixtures', () => {
    cy.get('input[type="file"]').selectFile(dataUser.file).should(input=>{
      expect(input[0].files[0].name).to.equal('commands.js')
    })
  })

  it('Seleciona um arquivo com drag and drop', () => {
    cy.get('input[type="file"]').selectFile(dataUser.file, {action:'drag-drop'}).should(input=>{
      expect(input[0].files[0].name).to.equal('commands.js')
    })
  })

  it('Verifica que a política de privacidade abre em outra aba', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'href','privacy.html')
    .and('have.attr', 'target', '_blank')
  })
  
  it('acessa a página de política de privacidade removendo o target', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible', 'CAC TAT - Política de Privacidade')
  })

  Cypress._.times(5,()=>{ 
    it.only('Preencha os campos obrigatórios e envie o formulário 5 vezes', () => {
    cy.fillMandatoryFieldsAndSubmit(dataUser.firstName, dataUser.lastName, dataUser.email, dataUser.message)
    cy.contains('button', 'Enviar').should('be.visible','Mensagem enviada com sucesso.')

  })})
  });
