import { RadioInputGroup, type propsOptionI } from './radioInputGroup'

describe('RadioInputGroup', () => {
  const heading = 'test-heading'
  const testId = 'test-id'
  const radioTestId = 'radio-input'
  context('minimal props (only required props given)', () => {
    const options = [
      { id: '1', testId: `${radioTestId}-1`, label: 'one', image: 'one.png' },
      { id: '2', testId: `${radioTestId}-2`, label: 'two', image: 'two.png' },
      { id: '3', testId: `${radioTestId}-3`, label: 'three', image: 'three.png' },
      { id: '4', testId: `${radioTestId}-4`, label: 'four', image: 'four.png' },
      { id: '5', testId: `${radioTestId}-5`, label: 'five', image: 'five.png' }
    ]
    beforeEach(() => {
      cy.mount(<RadioInputGroup heading={heading} testId={testId} options={options} onChange={({ event, newSelection }) => { console.log('newSelection', newSelection) }} />)
    })
    it('should render with a FIELDSET', () => {
      cy.getByTestId(testId)
        .closest('fieldset')
        .should('exist')
    })
    it('should render with a LEGEND and the legend should have expected text', () => {
      cy.getByTestId(testId)
        .find('legend')
        .contains(heading)
    })
    it('should render with the expected number of RadioInputs', () => {
      cy.getByTestId(`${testId}-options`)
        .find(`[data-testid^="${radioTestId}"]`)
        .should('have.length', options.length)
    })
    it('should render so that the RadioInputs have the expected props', () => {
      cy.getByTestId(`${testId}-options`)
        .find(`[data-testid^="${radioTestId}"]`)
        .each(($radioInput, index) => {
          expect($radioInput.find('input')).to.have.attr('id', options[index].id)
          expect($radioInput.find('input')).to.have.attr('name', heading)
          expect($radioInput.find('input')).to.have.attr('type', 'radio')
          expect($radioInput.find('input')).to.have.attr('value', options[index].label)
        })
    })
    // TESTING NOTE: if a RadioInput inside a fieldset is passed a selected prop with a true value, then the RadioInput's input will have a 'checked' attribute
    // but, if a RadioInput is NOT inside of a fieldset and is passed a selected prop with a true value, then the RadioInput's input will NOT have a 'checked' attribute
    // this seems like a React implementation discrepancy in how they render selected radio inputs (10/11/2023)
    it('should render with no checked inputs when no default selection is provided', () => {
      cy.getByTestId(testId)
        .find('input')
        .each($input => {
          expect($input).to.not.have.attr('checked')
        })
    })
  })
  context('optional props and unique renders', () => {
    const optionsWithSelected = [
      { id: '1', testId: `${radioTestId}-1`, label: 'one', image: 'one.png' },
      { id: '2', testId: `${radioTestId}-2`, label: 'two', image: 'two.png' },
      { id: '3', testId: `${radioTestId}-3`, label: 'three', image: 'three.png' },
      { id: '4', testId: `${radioTestId}-4`, label: 'four', image: 'four.png', selected: true },
      { id: '5', testId: `${radioTestId}-5`, label: 'five', image: 'five.png' }
    ]
    // TESTING NOTE: if a RadioInput inside a fieldset is passed a selected prop with a true value, then the RadioInput's input will have a 'checked' attribute
    // but, if a RadioInput is NOT inside of a fieldset and is passed a selected prop with a true value, then the RadioInput's input will NOT have a 'checked' attribute
    // this seems like a React implementation discrepancy in how they render selected radio inputs (10/11/2023)
    it('should render the fourth selected option as selected', () => {
      cy.mount(<RadioInputGroup heading={heading} testId={testId} options={optionsWithSelected} onChange={({ event, newSelection }) => { console.log('newSelection', newSelection) }} />)
      cy.getByTestId(testId)
        .find('input')
        .eq(3)
        .should('be.checked')
      cy.getByTestId(testId)
        .find('input')
        .eq(0)
        .should('not.be.checked')
    })
    it('should have called onChange with the expected values when the user clicks a radio input', () => {
      const spy = cy.spy()
      cy.mount(<RadioInputGroup heading={heading} testId={testId} options={optionsWithSelected} onChange={spy} />)
      cy.getByTestId(testId)
        .find('input')
        .eq(1)
        .should('not.be.checked')
        .check()
        .should('be.checked')
      cy.wrap(spy).should('be.calledOnce')
      cy.getByTestId(testId)
        .find('input')
        .eq(4)
        .should('not.be.checked')
        .check()
        .should('be.checked')
      cy.wrap(spy).should('be.calledTwice')
    })
    it('should render with a mirage when given a mirage', () => {
      const mirage = (opt: propsOptionI) => <div data-testid="test-mirage">mirage</div>
      cy.mount(<RadioInputGroup heading={heading} testId={testId} options={optionsWithSelected} onChange={({ event, newSelection }) => { console.log('newSelection', newSelection) }} mirage={mirage} />)
      cy.getByTestId(testId)
        .find('[data-testid="mirage-container"]')
        .should('exist')
        .contains('mirage')
    })
  })
})
