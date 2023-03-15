import { displayValuesT, filterDisplayValues, groupByValues, measurementValues, sortByValues } from '-/Components/modifier/modifier.types'
import { builderKeys } from './build-your-own.util';

// AGGULATIVE-STACKS
export interface blockI {
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
}
// MODIFIER
export interface optionI { // todo: make more specific to workspace type
    id: string, // id to identify option
    value: string, // value to match against library of keys
    label: string,
    image: string,
    // optional
    selected?: boolean,
    productId?: string | number,
    height?: number,
    width?: number,
    insured?: boolean,
    
}
export interface filterI {
    display: filterDisplayValues,
    values: string[] | string[][],
}
export interface modifierI {
    id: string,
    label: string,
    display: displayValuesT,
    options: optionsT,
    //optional
    filter?: filterI,
    groupKey?: groupKeyValues, // TODO: think though is we want a defined list of groupKeys or just any string can be used
    groupBy?: groupByValues, // TODO: rename to optionsGroupByProp
    sortBy?: sortByValues | sortByValues[],
    measurementUnit?: measurementValues,
}
export interface configItemI {
    id: string, selection: string, value: string,
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
export type aggulativeStacksT = blockI[][] | []
export type matrixT = matrixIndexI[][];
export type builderTypesT = builderKeys;
export type builderT = singletonI | freeformMatrixI | aggulativeStacksI;
export type optionsT = optionI[];
export type modifiersT = modifierI[];
export type configT = configItemI[];