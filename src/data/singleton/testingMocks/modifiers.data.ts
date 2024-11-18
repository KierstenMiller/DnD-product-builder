import { groupByValues, measurementValues, modifierChunkKeyValues, radioDisplayValues, sortByValues } from '-/page-components/build-your-own/shared/modifier/modifier.types'
import { mockFilterDoubleDropDown, mockFilterSingleTabbed } from './mockFilters.data'
import { mockOptions2D, mockOptions2DPriced, mockOptions3D, mockOptions3DStocked, mockOptions3DStockedPriced } from './options.data'

export const mockModifierA = {
  id: 'mod-A',
  label: 'modifier A',
  modifierChunkKey: modifierChunkKeyValues.global,
  groupBy: groupByValues.height,
  sortBy: sortByValues.ascending,
  measurementUnit: measurementValues.inches,
  display: radioDisplayValues.card,
  filter: mockFilterDoubleDropDown,
  options: mockOptions3D
}

export const mockModifierB = {
  id: 'mod-B',
  label: 'modifier B',
  modifierChunkKey: modifierChunkKeyValues.global,
  groupBy: groupByValues.stocked,
  sortBy: [sortByValues.having, sortByValues.ascending],
  measurementUnit: measurementValues.inches,
  display: radioDisplayValues.imageFirst,
  // no filter
  options: mockOptions3DStocked
}

export const mockModifierC = {
  id: 'mod-C',
  label: 'modifier C',
  modifierChunkKey: modifierChunkKeyValues.global,
  groupBy: groupByValues.price,
  sortBy: [sortByValues.descending],
  measurementUnit: measurementValues.inches,
  display: radioDisplayValues.titled,
  filter: mockFilterSingleTabbed,
  options: mockOptions2DPriced
}

export const mockModifierD = {
  id: 'mod-D',
  label: 'modifier D',
  modifierChunkKey: modifierChunkKeyValues.global,
  groupBy: groupByValues.width,
  sortBy: sortByValues.ascending,
  measurementUnit: measurementValues.inches,
  display: radioDisplayValues.titled,
  filter: mockFilterDoubleDropDown,
  options: mockOptions3DStockedPriced
}

export const mockModifierE = {
  id: 'mod-E',
  label: 'modifier E',
  modifierChunkKey: modifierChunkKeyValues.global,
  groupBy: groupByValues.height,
  sortBy: sortByValues.descending,
  measurementUnit: measurementValues.inches,
  display: radioDisplayValues.card,
  filter: mockFilterDoubleDropDown,
  options: mockOptions2D
}
