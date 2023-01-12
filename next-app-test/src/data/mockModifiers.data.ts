import { mockFilterDoubleDropDown, mockFilterSingleTabbed } from "./mockFilters.data";
import { mockOptions2DPriced, mockOptions3D, mockOptions3DStocked } from "./mockOptions.data";
import { groupByValues, measurementValues, modifierCollectionDisplayValues, sortByValues } from "./mockUtil.data";

export const mockModifierA = {
    label: 'modifier A',
    groupBy: groupByValues.height,
    sortBy:sortByValues.ascending,
    measurementUnit: measurementValues.inches,
    display: modifierCollectionDisplayValues.card,
    filter: mockFilterDoubleDropDown,
    options: mockOptions3D
}

export const mockModifierB = {
    label: 'modifier B',
    groupBy: groupByValues.stocked,
    sortBy: [sortByValues.having, sortByValues.ascending],
    measurementUnit: measurementValues.inches,
    display: modifierCollectionDisplayValues.imageFirst,
    // no filter
    options:mockOptions3DStocked,
}

export const mockModifierC = {
    label: 'modifier C',
    groupBy: groupByValues.price,
    sortBy: [sortByValues.having, sortByValues.descending],
    measurementUnit: measurementValues.inches,
    display: modifierCollectionDisplayValues.titled,
    filter: mockFilterSingleTabbed,
    options: mockOptions2DPriced,
}

export const mockModifierD = {
    label: 'modifier D',
    groupBy: groupByValues.width,
    sortBy: sortByValues.descending,
    measurementUnit: measurementValues.inches,
    display: modifierCollectionDisplayValues.titled,
    filter: mockFilterDoubleDropDown,
    options: mockOptions3D,
}