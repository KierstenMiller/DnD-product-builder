/* eslint-disable @typescript-eslint/method-signature-style */
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
      drag(): Chainable<JQuery<HTMLElement>>
      drop(targetSelector: string, skipCleanup?: boolean): Chainable<JQuery<HTMLElement>>
      dragDrop(targetSelector: string, skipCleanup?: boolean): Chainable<JQuery<HTMLElement>>
      // modifier actions
      toggleModifier({ modId, isOpen }: { modId: string, isOpen?: boolean }): Chainable<JQuery<HTMLElement>>
      changeSelections(modifiers: testModifiersT): Chainable<JQuery<HTMLElement>>
      testChangingSelections(modifiers: testModifiersT, defaultValues?: testModifiersT): Chainable<JQuery<HTMLElement>>
      testCurrentSelections(modifiers: testModifiersT): Chainable<JQuery<HTMLElement>>
    }
  }
}
