export {};
/// <reference types="cypress" />
declare global{
  namespace Cypress {
    interface Chainable {
      getByTestId(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
      getByTestIdLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
    }
  }
}
