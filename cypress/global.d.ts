export { }
/// <reference types="cypress" />
declare global{
  namespace Cypress {
    interface Chainable {
      getByTestId(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
      getByTestIdLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
      findByTestId(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
      // modifier actions
      testChangingSelections(modifiers: Array<{ mod: string, group: string, input: string }>, defaultValues?: Array<{ mod: string, group: string, input: string }>): Chainable<JQuery<HTMLElement>>
      testCurrentSelections(modifiers: Array<{ mod: string, group: string, input: string }>): Chainable<JQuery<HTMLElement>>
    }
  }
}
