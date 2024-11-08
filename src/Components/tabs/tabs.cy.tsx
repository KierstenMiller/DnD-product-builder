// TODO: implement test for tabs component

import { TabList } from './tabs'

describe('Modal', () => {
    const testId = 'test-tablist-container'
    const id = 'testing'
    const heading = { text: 'Test Heading', level: 2 }
    const tabs = [
        { id: 'first-tab', isSelected: true, tabButton: <span>Button 1</span>, tabPanel: <div>Panel 1</div> },
        { id: 'second-tab', isSelected: false, tabButton: <span>Button 2</span>, tabPanel: <div>Panel 2</div> },
        { id: 'third-tab', isSelected: false, tabButton: <span>Button 3</span>, tabPanel: <div>Panel 3</div> },
        { id: 'fourth-tab', isSelected: false, tabButton: <span>Button 4</span>, tabPanel: <div>Panel 4</div> },
        { id: 'fifth-tab', isSelected: false, tabButton: <span>Button 5</span>, tabPanel: <div>Panel 5</div> }
    ]
    context('minimal props (only required props given)', () => {
        beforeEach(() => {
            cy.mount(<TabList testId={testId} id={id} heading={heading} tabs={tabs} />)
        })
        it('should render as tabs with the expected attributes', () => {
            cy.getByTestId(testId)
        })
    })
})
