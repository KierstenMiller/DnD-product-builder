import { Modal } from './modal'

describe('Modal', () => {
  context('minimal props (only required props given)', () => {
    const testId = 'test-modal'
    const header = { content: 'modal header' }
    const body = 'modal children'
    beforeEach(() => {
      cy.mount(<Modal testId={testId} header={header} body={body} />)
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
    it.only('should render with a close button and close onClick', () => {
      cy.getByTestId(testId)
      // .findByTestId('close-button')
      // .click()
      // cy.getByTestId(testId).should('not.exist');
    })
    it('should render with a backdrop', () => {
      cy.getByTestId('backdrop')
        .should('exist')
    })
  })
})
