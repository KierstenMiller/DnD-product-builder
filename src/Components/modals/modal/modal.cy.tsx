import { Modal } from './modal'

describe('Modal', () => {
  const modalTestId = 'test-modal-container'
  const header = { content: 'modal header' }
  const body = 'modal children'
  context('minimal props (only required props given)', () => {
    beforeEach(() => {
      cy.mount(<Modal testId={modalTestId} header={header} body={body} />)
    })
    it('should render as a dialog with the expected attributes', () => {
      cy.getByTestId('dialog')
        .should('have.attr', 'role', 'dialog')
        .and('have.attr', 'aria-modal', 'true')
        .and('have.attr', 'aria-labelledby', 'dialog-label')
    })
    it('should render with a h2 header', () => {
      cy.getByTestId('dialog')
        .find('h2')
        .contains(header.content)
    })
    it('should render with a close button and close onClick', () => {
      cy.getByTestId(modalTestId)
        .should('exist')
      cy.getByTestId('close')
        .click()
      cy.getByTestId(modalTestId)
        .should('not.exist')
    })
    it('should render with body content', () => {
      cy.getByTestId('body-container')
        .contains(body)
    })
    it('should render with a backdrop', () => {
      cy.getByTestId('backdrop')
        .should('exist')
    })
    it('should render as a direct child of the body element (isGlobal is true by default)', () => {
      cy.getByTestId(modalTestId)
        .parent()
        .should('have.prop', 'tagName', 'BODY')
    })
  })
  context('optional props and unique renders', () => {
    const footer = {
      buttons: [
        { text: 'action one', closeModalOnClick: false },
        { text: 'action two', closeModalOnClick: true }
      ]
    }
    it('should render "in place" of where Modal was mounted if isGlobal is false', () => {
      cy.mount(<div data-testid="in-place"><Modal testId={modalTestId} header={header} body={body} isGlobal={false} /></div>)
      cy.getByTestId(modalTestId)
        .parent()
        .should('not.have.prop', 'tagName', 'BODY')
        .should('have.attr', 'data-testid', 'in-place')
    })
    it('should render with footer buttons and close buttons should close the modal', () => {
      cy.mount(<Modal testId={modalTestId} header={header} body={body} footer={footer} />)
      cy.getByTestId('footer-container')
        .find('button')
        .should('have.length', 2)
        .eq(0)
        .click()
      cy.getByTestId(modalTestId)
        .should('exist')
      cy.getByTestId('footer-container')
        .find('button')
        .eq(1)
        .click()
      cy.getByTestId(modalTestId)
        .should('not.exist')
    })
    it('should have called the closeCallback when the footer close button is clicked', () => {
      const spy = cy.stub()
      cy.mount(<Modal testId={modalTestId} header={header} body={body} footer={footer} closeCallback={spy} />)
      cy.getByTestId('footer-container')
        .find('button')
        .eq(1)
        .click()
      cy.wrap(spy).should('be.calledOnce')
      cy.getByTestId(modalTestId)
        .should('not.exist')
    })
    it('should render with footer buttons text', () => {
      cy.mount(<Modal testId={modalTestId} header={header} body={body} footer={footer} />)
      cy.getByTestId('footer-container')
        .find('button')
        .eq(0)
        .contains('action one')
      cy.getByTestId('footer-container')
        .find('button')
        .eq(1)
        .contains('action two')
    })
    it('should have called a footer button\'s onClick when provided', () => {
      const actionOneSpy = cy.stub()
      const actionTwoSpy = cy.stub()
      const footerWithOnClicks = {
        buttons: [
          { text: 'action one', closeModalOnClick: false, onClick: actionOneSpy },
          { text: 'action two', closeModalOnClick: true, onClick: actionTwoSpy }
        ]
      }
      cy.mount(<Modal testId={modalTestId} header={header} body={body} footer={footerWithOnClicks} />)
      cy.getByTestId('footer-container')
        .find('button')
        .eq(0)
        .click()
      cy.wrap(actionOneSpy).should('be.calledOnce')
      cy.wrap(actionTwoSpy).should('not.be.called')
      cy.getByTestId('footer-container')
        .find('button')
        .eq(1)
        .click()
      cy.wrap(actionOneSpy).should('be.calledOnce')
      cy.wrap(actionTwoSpy).should('be.calledOnce')
    })
  })
})
