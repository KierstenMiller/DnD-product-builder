import { mockFilterDoubleDropDown, mockFilterSingleTabbed } from "./mockFilters.data";
import { mockOptions2D, mockOptions2DPriced, mockOptions3D, mockOptions3DStocked, mockOptions3DStockedPriced } from "./mockOptions.data";
import { groupByValues, measurementValues, modifierCollectionDisplayValues, sortByValues } from "./mockUtil.data";

export const mockModifierA = {
    id: 'mod-A',
    label: 'modifier A',
    groupBy: groupByValues.height,
    sortBy:sortByValues.ascending,
    measurementUnit: measurementValues.inches,
    display: modifierCollectionDisplayValues.card,
    filter: mockFilterDoubleDropDown, // TODO: implement ability to filter modifier's options
    options: mockOptions3D
}

export const mockModifierB = {
    id: 'mod-B',
    label: 'modifier B',
    groupBy: groupByValues.stocked,
    sortBy: [sortByValues.having, sortByValues.ascending],
    measurementUnit: measurementValues.inches,
    display: modifierCollectionDisplayValues.imageFirst,
    // no filter
    options:mockOptions3DStocked,
}

export const mockModifierC = {
    id: 'mod-C',
    label: 'modifier C',
    groupBy: groupByValues.price,
    sortBy: [sortByValues.descending],
    measurementUnit: measurementValues.inches,
    display: modifierCollectionDisplayValues.titled,
    filter: mockFilterSingleTabbed,
    options: mockOptions2DPriced,
}

export const mockModifierD = {
    id: 'mod-D',
    label: 'modifier D',
    groupBy: groupByValues.width,
    sortBy: sortByValues.ascending,
    measurementUnit: measurementValues.inches,
    display: modifierCollectionDisplayValues.titled,
    filter: mockFilterDoubleDropDown,
    options: mockOptions3DStockedPriced,
}

export const mockModifierE = {
    id: 'mod-E',
    label: 'modifier E',
    groupBy: groupByValues.height,
    sortBy:sortByValues.descending,
    measurementUnit: measurementValues.inches,
    display: modifierCollectionDisplayValues.card,
    filter: mockFilterDoubleDropDown,
    options: mockOptions2D
}