// @ts-check
///<reference path="../global.d.ts" />

Cypress.Commands.add("getByTestId", (selector, ...args) => {
  return cy.get(`[data-testId=${selector}]`, ...args);
});

Cypress.Commands.add("getByTestIdLike", (selector, ...args) => {
  return cy.get(`[data-testId*=${selector}]`, ...args);
});