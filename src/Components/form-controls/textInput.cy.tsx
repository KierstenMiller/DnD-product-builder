import React from 'react'
import { TextInput } from './textInput';

const testAttr =  'data-testid'; // TODO: make cy command that defines this

describe('<TextInput />', () => {
  it('should render with an id, label, call onChange and be blank if no default value is given',
    ()=>{
      cy.mount(<TextInput id="input-id" testId="test-id" label="test label" onChange={({event, newValue}) => console.log('newValue', newValue)}/>)
      cy.getByTestId('test-id').should('exist')
    }
  )
  it('should render with a default value in input if no default value is given',
    ()=>{
      cy.mount(<TextInput id="input-id" testId="test-id" label="test label" onChange={({event, newValue}) => console.log('newValue', newValue)}/>)
    }
  )
  it('should render with accessibility text and aria attributes when given helpText or ariaDescribedBy values',
    ()=>{
      cy.mount(<TextInput id="input-id" testId="test-id" label="test label" onChange={({event, newValue}) => console.log('newValue', newValue)}/>)
    }
  )
})