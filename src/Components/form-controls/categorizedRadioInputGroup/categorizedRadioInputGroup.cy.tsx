import { CategorizedRadioInputGroup } from './categorizedRadioInputGroup'

describe('CategorizedRadioInputGroup', () => {
  const heading = 'test heading'
  const testId = 'test-id'
  const categoryPrefix = 'category'
  const radioInputIdPrefix = 'radio-input'
  const catGroupSelector = `[data-testid^="${categoryPrefix}"][data-testid$="-group"]`
  const catGroupLabelSelector = `[data-testid^="${categoryPrefix}"][data-testid$="-label"]`
  const catInputContainerSelector = `[data-testid^="${categoryPrefix}"][data-testid$="-inputs-container"]`
  context('minimal props (only required props given)', () => {
    const categorizedOptions = [
      {
        id: `${categoryPrefix}-1`,
        category: 'one',
        options: [
          { id: `${radioInputIdPrefix}_1-1`, label: 'one-one', image: 'one-one.png' },
          { id: `${radioInputIdPrefix}_1-2`, label: 'one-two', image: 'one-two.png' },
          { id: `${radioInputIdPrefix}_1-3`, label: 'one-three', image: 'one-three.png' }
        ]
      },
      { id: `${categoryPrefix}-2`, category: 'two', options: [{ id: `${radioInputIdPrefix}_2-1`, label: 'two-one', image: 'two-one.png' }] },
      { id: `${categoryPrefix}-3`, category: 'three', options: [{ id: `${radioInputIdPrefix}__3-1`, label: 'three-one', image: 'three-one.png' }] },
      { id: `${categoryPrefix}-4`, category: 'four', options: [{ id: `${radioInputIdPrefix}__4-1`, label: 'four-one', image: 'four-one.png' }] },
      {
        id: `${categoryPrefix}-5`,
        category: 'five',
        options: [
          { id: `${radioInputIdPrefix}__5-1`, label: 'five-one', image: 'five-one.png' },
          { id: `${radioInputIdPrefix}__5-2`, label: 'five-two', image: 'five-two.png' },
          { id: `${radioInputIdPrefix}__5-3`, label: 'five-three', image: 'five-three.png' }
        ]
      }
    ]
    beforeEach(() => {
      cy.mount(<CategorizedRadioInputGroup testId={testId} heading={heading} categorizedOptions={categorizedOptions} onChange={({ event, newSelection }) => { console.log('newSelection', newSelection) }} />)
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
    it('should render with the expected number of category groups', () => {
      cy.getByTestId(testId)
        .find(catGroupSelector)
        .should('have.length', categorizedOptions.length)
    })
    it('should should render each category group with a label element (note - it should not be a legend or label HTML element)', () => {
      cy.getByTestId(testId)
        .find(catGroupSelector)
        .each(($catGroup, index) => {
          expect($catGroup.find(catGroupLabelSelector)).to.contain(categorizedOptions[index].category)
        })
    })
    it('should render with the expected number of RadioInputs', () => {
      cy.getByTestId(testId)
        .find(`[data-testid^="${heading}"]`)
        .should('have.length', categorizedOptions.flatMap(cat => cat.options).length)
    })
    it('should render so that the input elements have the expected props', () => {
      cy.getByTestId(testId)
        .find(catInputContainerSelector)
        .each(($catGroup, catIndex) => {
          $catGroup.find('input')
            .each((index, $radioInput) => {
              expect($radioInput).to.have.attr('id', categorizedOptions[catIndex].options[index].id)
              expect($radioInput).to.have.attr('name', heading)
              expect($radioInput).to.have.attr('aria-labelledby', `${heading}_${categorizedOptions[catIndex].options[index].id} ${categorizedOptions[catIndex].id}`)
              expect($radioInput).to.have.attr('value', categorizedOptions[catIndex].options[index].label)
              expect($radioInput).to.have.attr('type', 'radio')
            })
        })
    })
    it('should render so that the label elements have the expected props', () => {
      cy.getByTestId(testId)
        .find(catInputContainerSelector)
        .each(($catGroup, catIndex) => {
          $catGroup.find('label')
            .each((index, $label) => {
              expect($label).to.have.attr('id', `${heading}_${categorizedOptions[catIndex].options[index].id}`)
            })
        })
    })
    it('should render so that legend, category labels, RadioInput labels and inputs have correct corresponding values (A11y)', () => {
      // all RadioInput inputs should have their name attribute value equal to the legend value
      cy.getByTestId(testId)
        .find('legend')
        .contains(heading)
      cy.getByTestId(testId)
        .find(catInputContainerSelector)
        .each(($catGroup, catIndex) => {
          $catGroup.find('input')
            .each((index, $radioInput) => {
              expect($radioInput).to.have.attr('name', heading)
            })
        })
      /*
        ALL CHECKS:
        1.) all category groups should have a label element with an id attribute (labelElemId)
        2.) all RadioInput input's should have a name attribute value that equals the legend value
        3.) all RadioInput input's should have a aria-labelledby attribute (inputAriaLabelledBy)
        4.) all inputAriaLabelledBy values should contain the labelElemId value
        5.) all RadioInput input's should have a label element with an id attribute (instead of a for attribute)
      */
      cy.getByTestId(testId)
        .find(catGroupSelector)
        .each(($catGroup, catIndex) => {
          // 1.) all category groups should have a label element with an id attribute (labelElemId)
          const labelElemId = $catGroup.find(catGroupLabelSelector).attr('id')
          $catGroup.find('input')
            .each((index, $radioInput) => {
              // 2.) all RadioInput input's should have a name attribute value that equals the legend value
              expect($radioInput).to.have.attr('name', heading)
              // 3.) all RadioInput input's should have a aria-labelledby attribute (inputAriaLabelledBy)
              expect($radioInput).to.have.attr('aria-labelledBy')
              // 4.) all inputAriaLabelledBy values should contain the labelElemId value
                .and.contain(labelElemId)
            })
          $catGroup.find('label')
            .each((index, $label) => {
              // 5.) all RadioInput input's should have a label element with an id attribute (instead of a for attribute)
              expect($label).to.have.attr('id', `${heading}_${categorizedOptions[catIndex].options[index].id}`)
              expect($label).to.not.have.attr('for')
            })
        })
    })
    it('should render with no checked inputs when no default selection is provided', () => {
      cy.getByTestId(testId)
        .find('input')
        .each($input => {
          expect($input).to.not.have.attr('checked')
        })
    })
  })
  context('optional props and unique renders', () => {
    const categorizedOptionsWithSelected = [
      { id: `${categoryPrefix}-1`, category: 'one', options: [{ id: `${radioInputIdPrefix}_1-1`, label: 'one-one', image: 'one-one.png' }] },
      { id: `${categoryPrefix}-2`, category: 'two', options: [{ id: `${radioInputIdPrefix}_2-1`, label: 'two-one', image: 'two-one.png' }] },
      { id: `${categoryPrefix}-3`, category: 'three', options: [{ id: `${radioInputIdPrefix}__3-1`, label: 'three-one', image: 'three-one.png' }] },
      { id: `${categoryPrefix}-4`, category: 'four', options: [{ id: `${radioInputIdPrefix}__4-1`, label: 'four-one', image: 'four-one.png' }] },
      {
        id: `${categoryPrefix}-5`,
        category: 'five',
        options: [
          { id: `${radioInputIdPrefix}__5-1`, label: 'five-one', image: 'five-one.png' },
          { id: `${radioInputIdPrefix}__5-2`, label: 'five-two', image: 'five-two.png', selected: true },
          { id: `${radioInputIdPrefix}__5-3`, label: 'five-three', image: 'five-three.png' }
        ]
      }
    ]
    it('should render with the last category\'s second option selected', () => {
      cy.mount(<CategorizedRadioInputGroup testId={testId} heading={heading} categorizedOptions={categorizedOptionsWithSelected} onChange={({ event, newSelection }) => { console.log('newSelection', newSelection) }} />)
      cy.getByTestId(testId)
        .find(catInputContainerSelector)
        .each(($catGroup, catIndex) => {
          $catGroup.find('input')
            .each((index, $radioInput) => {
              expect($radioInput).to.have.attr('value', categorizedOptionsWithSelected[catIndex].options[index].label)
              if (categorizedOptionsWithSelected[catIndex].options[index].selected) expect($radioInput).to.have.attr('checked')
              else expect($radioInput).to.not.have.attr('checked')
            })
        })
    })
    it('should visually hide the input when given a truthy hideInput prop', () => {
      cy.mount(<CategorizedRadioInputGroup testId={testId} heading={heading} categorizedOptions={categorizedOptionsWithSelected} onChange={({ event, newSelection }) => { console.log('newSelection', newSelection) }} hideInput={true} />)
      cy.getByTestId(testId)
        .find('input')
        .each($input => {
          expect($input).to.have.class('visually-hidden')
        })
    })
    it('should render with a mirage when given a mirage', () => {
      const mirageId = 'test-mirage'
      const mirage = (opt: any) => <div data-testid={mirageId}>mirage</div>
      cy.mount(<CategorizedRadioInputGroup testId={testId} heading={heading} categorizedOptions={categorizedOptionsWithSelected} onChange={({ event, newSelection }) => { console.log('newSelection', newSelection) }} mirage={mirage} />)
      cy.getByTestId(mirageId)
        .each(($mirage, index) => {
          expect($mirage).to.contain('mirage')
        })
    })
    it('should have called onChange with the expected values when the user clicks a radio input', () => {
      const spy = cy.spy()
      cy.mount(<CategorizedRadioInputGroup testId={testId} heading={heading} categorizedOptions={categorizedOptionsWithSelected} onChange={spy} />)
      cy.getByTestId(testId)
        .find('input')
        .eq(1)
        .should('not.be.checked')
        .check()
      cy.wrap(spy).should('be.calledOnce')
    })
  })
})
