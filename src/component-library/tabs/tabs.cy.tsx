import type { headerLevelT } from '-/component-library/atoms/header/header'
import { TabList } from './tabs'

// Helper function to test tab state
const assertTabState = (tabId: string, isSelected: boolean) => {
  const tabPanelSelector = `tab-panel-${tabId}`

  cy.getByTestId(`tab-button-${tabId}`)
    .should('have.attr', 'aria-selected', isSelected ? 'true' : 'false')

  cy.getByTestId(tabPanelSelector)
    .should(isSelected ? 'not.have.class' : 'have.class', 'hidden')
}

describe('Modal', () => {
  const testId = 'test-tablist-container'
  const id = 'testing'
  const heading: { text: string, level: headerLevelT } = { text: 'Test Heading', level: 2 }
  const tabs = [
    { id: 'first-tab', isSelected: true, tabButton: 'Button 1', tabPanel: 'Panel 1' },
    { id: 'second-tab', isSelected: false, tabButton: 'Button 2', tabPanel: 'Panel 2' },
    { id: 'third-tab', isSelected: false, tabButton: 'Button 3', tabPanel: 'Panel 3' },
    { id: 'fourth-tab', isSelected: false, tabButton: 'Button 4', tabPanel: 'Panel 4' },
    { id: 'fifth-tab', isSelected: false, tabButton: 'Button 5', tabPanel: 'Panel 5' }
  ]
  context('minimal props (only required props given)', () => {
    beforeEach(() => {
      cy.mount(
        <div>
          <a href="" id="before-tablist">Before Tablist</a>
          <TabList testId={testId} id={id} heading={heading} tabs={tabs} />
        </div>)
    })
    it('should render tabs heading with the expected attributes', () => {
      cy.getByTestId(`header-${heading.level}-tablist-heading`)
        .should('have.attr', 'id', `tablist-heading-${id}`)
    })
    it('should render tablist containing element with the expected attributes', () => {
      cy.getByTestId('tablist-buttons-container')
        .should('have.attr', 'role', 'tablist')
        .should('have.attr', 'aria-labelledby', `tablist-heading-${id}`)
    })
    it('should render correct number of buttons with the expected attributes and first button should be selected', () => {
      cy.getByTestId('tablist-buttons-container')
        .find('button').should('have.length', tabs.length)
        .each(($button, index) => {
          cy.wrap($button)
            .should('have.attr', 'role', 'tab')
            .should('have.attr', 'id', `tab-button-${tabs[index].id}`)
            .should('have.attr', 'aria-controls', `tab-panel-${tabs[index].id}`)
            .should('have.attr', 'aria-selected', index === 0 ? 'true' : 'false')
            .should('contain', `Button ${index + 1}`)
        })
    })
    it('should render correct number of tabpanels', () => {
      cy.getByTestId(testId)
        .find('[data-testid^="tab-panel-"]')
        .should('have.length', tabs.length)
    })
    it('should render tabpanels with the expected attributes and only the first tabpanel should be selected', () => {
      cy.getByTestId(testId)
        .find('[data-testid^="tab-panel-"]')
        .each(($tabpanel, index) => {
          cy.wrap($tabpanel)
            .should('have.attr', 'role', 'tabpanel')
            .should('have.attr', 'id', `tab-panel-${tabs[index].id}`)
            .should('have.attr', 'aria-labelledby', `tab-button-${tabs[index].id}`)
            .should('have.attr', 'tabindex', 0)
            .should('have.attr', 'class', index !== 0 ? 'hidden' : '')
        })
    })
    it('should, after clicking each tab, render the tab\'s corresponding tabpanel content (and other tab\'s content should be hidden', () => {
      cy.getByTestId('tablist-buttons-container')
        .find('button')
        .each(($button, index) => {
          const currentTabId = tabs[index]?.id
          const nextTabId = tabs[index + 1]?.id
          // Skip last tab (no next tab to test)
          if (nextTabId === undefined) return
          // Test initial state before click (assert current tab is selected, next is not)
          assertTabState(currentTabId, true)
          assertTabState(nextTabId, false)
          // Click on the next tab
          cy.getByTestId(`tab-button-${nextTabId}`).click()
          // Test state after click (assert current tab is not selected, next is selected)
          assertTabState(currentTabId, false)
          assertTabState(nextTabId, true)
        })
    })

    // TODO: Cypress does not support tab/focus events they need to for accessibility testing. Let's try to implement these with another library?
    // it('should, when user tabs into tab component, focus the currently selected tab (in this case the first one) ', () => {
    //   cy.getByTestId(testId)
    // })
    // it('should transfer focus to next tab when user enters right arrow key', () => {
    //   cy.getByTestId(testId)
    // })
    // it('should transfer focus to prev tab when user enters left arrow key', () => {
    //   cy.getByTestId(testId)
    // })
    // it('should go round to first tab if user enters right arrow key on last tab in tablist', () => {
    //   cy.getByTestId(testId)
    // })
    // it('should go round last tab if user enters left arrow key on first tab in tablist', () => {
    //   cy.getByTestId(testId)
    // })
  })
})
