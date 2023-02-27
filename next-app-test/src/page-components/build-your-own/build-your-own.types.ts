import { builderMock1 } from '-/data/aggulativeStacks/builder.data';
import { filterDisplayValues, groupByValues, measurementValues, modifierCollectionDisplayValues, sortByValues } from '-/data/singleton/testingMocks/mockUtil.data'
import { AggulativeStacks } from './aggulative-stacks.model';
import { builderKeys } from './build-your-own.util';

// AGGULATIVE-STACKS
export interface stackPieceI {
    column: string,
    piece: pieceI,
}

// FREEFORM-MATRIX
export interface matrixIndexCoordinatesI {
    row: number,
    column: number,
}
export interface matrixIndexI {
    matrixIndex: matrixIndexCoordinatesI;
    piece?: pieceI;
}
// BOTH
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
export interface singletonI {
    type: builderKeys.singleton,
    config: configT,
    data: undefined,
}
export interface freeformMatrixI {
    type: builderKeys.freeformMatrix,
    config: configT,
    data: matrixT,
}
export interface aggulativeStacksI {
    type: builderKeys.aggulativeStacks,
    config: configT,
    data: aggulativeStacksT,
}

// TYPES
export type aggulativeStacksT = stackPieceI[][] | []
export type matrixT = matrixIndexI[][];
export type builderTypesT = builderKeys;
export type builderT = singletonI | freeformMatrixI | aggulativeStacksI;
export type optionsT = optionI[];
export type modifiersT = modifierI[];
export type configT = configItemI[];