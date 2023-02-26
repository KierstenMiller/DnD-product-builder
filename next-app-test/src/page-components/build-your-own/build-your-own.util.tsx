import { builderMock1 } from '-/data/builderMatrix/builder.data';
import { filterDisplayValues, groupByValues, measurementValues, modifierCollectionDisplayValues, sortByValues } from '-/data/testingMocks/mockUtil.data'

// BUILDER

// MATRIX
export interface matrixIndexCoordinatesI {
    row: number,
    column: number,
}
export interface matrixIndexI {
    matrixIndex: matrixIndexCoordinatesI;
    piece?: pieceI;
}
// MATRIX + BUILDER
export interface pieceI {
    id: string,
    config: configT,
    image?: JSX.Element | (() => JSX.Element)
}
// MODIFIER
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
// BIG TYPES
export type builderT = typeof builderMock1 // TODO: builder typing
export type matrixT = matrixIndexI[][];
export type optionsT = optionI[];
export type modifiersT = modifierI[];
export type configT = configItemI[];