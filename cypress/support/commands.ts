// @ts-check
/// <reference path="../global.d.ts" />

Cypress.Commands.add('getByTestId', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('getByTestIdLike', (selector, ...args) => {
  return cy.get(`[data-testid*=${selector}]`, ...args)
})

Cypress.Commands.add('findByTestId', { prevSubject: true }, (subject, id) => {
  return subject.find(`[data-cy=${id}]`)
})
