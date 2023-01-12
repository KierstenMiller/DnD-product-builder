import { filterDisplayValues, groupByValues, measurementValues, modifierCollectionDisplayValues, sortByValues } from '-/data/mockUtil.data'

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
    label: string,
        groupBy: groupByValues,
        sortBy: sortByValues | sortByValues[],
        measurementUnit: measurementValues,
        display: modifierCollectionDisplayValues,
        options: optionsT,
        //optional
        filter?: filterI,
}
export interface configItemI {
     id: string, selection: string 
};
export type optionsT = optionI[];
export type modifiersT = modifierI[];
export type configT = configItemI[];