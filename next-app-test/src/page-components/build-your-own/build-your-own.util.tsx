import { filterDisplayValues, groupByValues, measurementValues, modifierCollectionDisplayValues, sortByValues } from '-/data/mock/mockUtil.data'

export interface optionI {
    id: string,
    label: string,
    productId: number,
    image: string,
    height: number,
    width: number,
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