import { ModalTrigger } from './modal-trigger'

describe('ModalTrigger', () => {
  const testId = 'test-modal'
  const triggerConfig = { text: 'open modal' }
  const modalConfig = {
    header: { content: 'modal header' },
    body: 'modal body'
  }
  context('minimal props (only required props given)', () => {
    beforeEach(() => {
      cy.mount(<ModalTrigger testId={testId} triggerConfig={triggerConfig} modalConfig={modalConfig} />)
    })
    it('should render a button with the expected text', () => {
      cy.getByTestId(`${testId}-trigger`)
        .contains(triggerConfig.text)
    })
    it('should render a modal when the trigger is clicked', () => {
      cy.getByTestId(`${testId}-trigger`)
        .click()
      cy.getByTestId(testId)
        .find('[data-testid="dialog"]')
        .should('contain', modalConfig.header.content)
        .should('contain', modalConfig.body)
    })
    it('should close the modal when the close button is clicked', () => {
      cy.getByTestId(`${testId}-trigger`)
        .click()
      cy.getByTestId('close')
        .click()
      cy.getByTestId(testId)
        .should('not.exist')
    })
  })
  context('optional props and unique renders', () => {
    it('should have called the openCallback when the trigger is clicked', () => {
      const spy = cy.stub()
      cy.mount(<ModalTrigger testId={testId} triggerConfig={{ ...triggerConfig, openCallback: spy }} modalConfig={modalConfig} />)
      cy.getByTestId(`${testId}-trigger`)
        .click()
      cy.wrap(spy)
        .should('be.calledOnce')
    })
    it('should have called the closeCallback when the close button is clicked', () => {
      const spy = cy.stub()
      cy.mount(<ModalTrigger testId={testId} triggerConfig={triggerConfig} modalConfig={{ ...modalConfig, closeCallback: spy }} />)
      cy.getByTestId(`${testId}-trigger`)
        .click()
      cy.getByTestId('close')
        .click()
      cy.wrap(spy)
        .should('be.calledOnce')
    })
  })
})
