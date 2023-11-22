import { type testModifiersT } from './support/commands'

export { }
/// <reference types="cypress" />
declare global{
  namespace Cypress {
    interface Chainable {
      getByTestId(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
      getByTestIdLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
      findByTestId(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
      // react dnd actions
      drag(targetSelector: string): Chainable<JQuery<HTMLElement>>
      // modifier actions
      changeSelections(modifiers: testModifiersT): Chainable<JQuery<HTMLElement>>
      testChangingSelections(modifiers: testModifiersT, defaultValues?: testModifiersT): Chainable<JQuery<HTMLElement>>
      testCurrentSelections(modifiers: testModifiersT): Chainable<JQuery<HTMLElement>>

    }
  }
}
