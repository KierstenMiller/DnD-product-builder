import { filterDisplayValues } from '../../../page-components/build-your-own/shared/modifier/modifier.types'

// filter arrays
const singleFilter = ['filter A', 'filter B', 'filter C', 'filter D']
const doubleFilter = [
  ['filter A-1', 'filter B-1', 'filter C-1', 'filter D-1'],
  ['filter A-2', 'filter B-2', 'filter C-2', 'filter D-2']
]
const tripleFilter = [
  ['filter A-1', 'filter B-1', 'filter C-1', 'filter D-1'],
  ['filter A-2', 'filter B-2', 'filter C-2', 'filter D-2'],
  ['filter A-3', 'filter B-3', 'filter C-3', 'filter D-3']
]
// mock dropDown
export const mockFilterSingleDropDown = {
  display: filterDisplayValues.dropDown,
  values: singleFilter
}
export const mockFilterDoubleDropDown = {
  display: filterDisplayValues.dropDown,
  values: doubleFilter
}
export const mockFilterTripleDropDown = {
  display: filterDisplayValues.dropDown,
  values: tripleFilter
}
// mock pills
export const mockFilterSinglePills = {
  display: filterDisplayValues.pills,
  values: singleFilter
}
export const mockFilterDoublePills = {
  display: filterDisplayValues.pills,
  values: doubleFilter
}
export const mockFilterTriplePills = {
  display: filterDisplayValues.pills,
  values: tripleFilter
}
// mock tabbed
export const mockFilterSingleTabbed = {
  display: filterDisplayValues.pills,
  values: singleFilter
}
export const mockFilterDoubleTabbed = {
  display: filterDisplayValues.pills,
  values: doubleFilter
}
export const mockFilterTripleTabbed = {
  display: filterDisplayValues.pills,
  values: tripleFilter
}
