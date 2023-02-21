import { filterDisplayValues, groupByValues, measurementValues, modifierCollectionDisplayValues, sortByValues } from '-/data/mock/mockUtil.data'

export interface optionI { // todo: make more specific to workspace type
    id: string,
    label: string,
    image: string,
    // optional
    productId?: string | number,
    height?: number,
    width?: number,
    insured?: boolean,
    colorKey?: string,
}
export interface filterI {
    display: filterDisplayValues,
    values: string[] | string[][],
}
export interface modifierI {
    id: string,
    label: string,
    display: modifierCollectionDisplayValues,
    options: optionsT,
    //optional
    filter?: filterI,
    groupBy?: groupByValues,
    sortBy?: sortByValues | sortByValues[],
    measurementUnit?: measurementValues,
}
export interface configItemI {
    id: string, selection: string 
};
export type optionsT = optionI[];
export type modifiersT = modifierI[];
export type configT = configItemI[];