import React from 'react'
import { Header, headerLevelT } from './header'

const headerText = "Header Text";
const testAttr =  'data-testid'; // TODO: make cy command that defines this

const testEl = (level: headerLevelT) => {
    cy.mount(<Header headerLevel={level}>{headerText}</Header>)
    cy.get(`h${level}`)
    .contains(headerText)
    .and('have.attr', testAttr)
    .and('equal', `header-${level}`)
}

describe('<Header />', () => {
  it('should render a h1 element when headerLevel equals 1', () => testEl(1))
  it('should render a h2 element when headerLevel equals 2', () => testEl(2))
  it('should render a h3 element when headerLevel equals 3', () => testEl(3))
  it('should render a h4 element when headerLevel equals 4', () => testEl(4))
  it('should render a h5 element when headerLevel equals 5', () => testEl(5))
  it('should render a h6 element when headerLevel equals 6', () => testEl(6))
})