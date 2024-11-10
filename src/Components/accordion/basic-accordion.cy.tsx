import { BasicAccordion } from './basic-accordion'

describe('BasicAccordion', () => {
    const testId = 'accordion-test'
    const id = 'accordion-id'
    const triggerText = 'Accordion Trigger'
    const contentText = 'Accordion Content'
    const triggerSelector = `${testId}-trigger`;
    const contentSelector = `${testId}-content`;

    // Helper functions
    function checkAccordionState(isExpanded: boolean,) {
        cy.getByTestId(triggerSelector)
            .should('have.attr', 'aria-expanded', `${isExpanded}`)

        if (isExpanded) {
            cy.getByTestId(contentSelector)
                .should('be.visible')
                .should('not.have.attr', 'hidden');
        } else {
            cy.getByTestId(contentSelector)
                .should('not.be.visible')
                .should('have.attr', 'hidden');
        }
    }


    context('minimal props (only required props given)', () => {
        beforeEach(() => {
            cy.mount(<BasicAccordion testId={testId} id={id} triggerText={triggerText}>
                {contentText}
            </BasicAccordion>)
        })
        it('should render a button with the expected attibutes and content should be hidden with expected attributes', () => {
            cy.getByTestId(triggerSelector)
                .contains(triggerText)
                .should('have.attr', 'aria-expanded', 'false')
                .should('have.attr', 'aria-controls', `${id}-content`)
                .should('have.attr', 'aria-disabled', 'false')
                .should('have.attr', 'id', id)
            cy.getByTestId(contentSelector)
                .contains(contentText)
                .should('not.be.visible')
                .should('have.attr', 'id', `${id}-content`)
                .should('have.attr', 'role', 'region')
                .should('have.attr', 'aria-labelledby', id)
                .should('have.attr', 'hidden')
        })
        it('should render then hide the content when the trigger is clicked twice and button/content container should have the expected attributes', () => {
            checkAccordionState(false)
            cy.getByTestId(triggerSelector)
                .click()
            checkAccordionState(true)
            cy.getByTestId(triggerSelector)
                .click()
            checkAccordionState(false)
        })
    })
    context('optional props and unique renders', () => {
        it('should render on page load with content visible if passed drawerOpen = true and open-close behavior should still work', () => {
            cy.mount(<BasicAccordion testId={testId} id={id} triggerText={triggerText} drawerOpen={true}>
                Accordion Content
            </BasicAccordion>)
            checkAccordionState(true)
            cy.getByTestId(triggerSelector)
                .click()
            checkAccordionState(false)
            cy.getByTestId(triggerSelector)
                .click()
            checkAccordionState(true)
        })
        it('should render on page load as disabled when passed disableCollapse = true and open-close behavior should be available', () => {
            cy.mount(<BasicAccordion testId={testId} id={id} triggerText={triggerText} disableCollapse={true}>
                Accordion Content
            </BasicAccordion>)
            checkAccordionState(true)
            cy.getByTestId(triggerSelector)
                .should('have.attr', 'aria-disabled', 'true')
                .click()
            checkAccordionState(true)
        })
        it('should render trigger button wrapped by header element when headerLevel is provided', () => {
            cy.mount(<BasicAccordion testId={testId} id={id} triggerText={triggerText} headerLevel={2}>
                Accordion Content
            </BasicAccordion>)
            cy.getByTestId(testId)
                .find('h2')
                .contains(triggerText)
        })
        it('should render without container element when wrapped = false', () => {
            cy.mount(<BasicAccordion testId={testId} id={id} triggerText={triggerText} wrapped={false}>
                Accordion Content
            </BasicAccordion>)
            cy.getByTestId(testId)
                .should('not.exist')
            cy.getByTestId(triggerSelector)
                .contains(triggerText)
            cy.getByTestId(contentSelector)
                .contains(contentText)
        })
    })
})