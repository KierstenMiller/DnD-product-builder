import React from 'react'
import { TextInput, onChangeI } from './textInput';

describe('<TextInput />', () => {
  const testId = "test-id";
  const id = "input-id";
  const label = "test label";
  context('minimal props (only required props given)', () => {
    beforeEach(() => {
      cy.mount(<TextInput id={id} testId={testId} label={label} onChange={({ event, newValue }) => console.log('newValue', newValue)} />);
    })
    it('should render with a LABEL and the label should have expected attributes (for, and text)', () => {
      cy.getByTestId(testId)
        .find('label')
        .contains(label)
        .and('have.attr', 'for', id);
    })
    it('should render with an INPUT and the input should have expected attributes and values (id, name, type, value, onChange and text)', () => {
      cy.getByTestId(testId)
        .find('input')
        .should('have.value', '') // default value is blank
        .and('have.attr', 'value', '') // default value is blank
        .and('have.attr', 'id', id)
        .and('have.attr', 'name', id)
        .and('have.attr', 'type', 'text')
    })
    it('should render so that the label and input have corresponding values (label.for === input.id)', () => {
      cy.getByTestId(testId)
        .find('label')
        .should('have.attr', 'for', id);
      cy.getByTestId(testId)
        .find('input')
        .should('have.attr', 'id', id);
    })
    it('onChange should be called when input value is changed', () => {
      const typedValue = 'test value';
      cy.getByTestId(testId)
        .find('input')
        .should('have.value', '')
        .type(typedValue)
        .should('have.value', typedValue)
        .and('have.attr', 'value', typedValue);
    })
  })
  context('optional props', () => {
    const defaultValue = 'default value';
    const standardProps = { id, testId, label, onChange: ({ event, newValue }: onChangeI) => console.log('newValue', newValue) };
    it('should render with the provided defaultValue in input when defaultValue is provided', () => {
      cy.mount(<TextInput defaultValue={defaultValue} {...standardProps} />);
      cy.getByTestId(testId)
        .find('input')
        .should('have.value', defaultValue)
        .and('have.attr', 'value', defaultValue);
    })
    it('should render with accessibility text and aria attributes when given helpText or ariaDescribedBy values', () => {
      const ariaDescribedById = 'aria-id';
      const helpText = 'help text';
      cy.mount(<TextInput helpText={helpText} ariaDescribedById={ariaDescribedById} {...standardProps} />);
      cy.getByTestId(testId)
        .find('input')
        .should('have.attr', 'aria-describedby', ariaDescribedById)
      cy.getByTestId(testId)
        .find(`#${ariaDescribedById}`)
        .contains(helpText);
    })
    it('spy onChange should be called when input value is changed', () => {
      const spy = cy.spy();
      const typedValue = '123';
      cy.mount(<TextInput id={id} testId={testId} label={label} onChange={spy} />);
      cy.getByTestId(testId)
        .find('input')
        .should('have.value', '')
        .type(typedValue)
        .should('have.value', typedValue)
        .and('have.attr', 'value', typedValue);
      cy.wrap(spy).should('be.calledThrice');
    })
  });
})