import { displayValuesT, filterDisplayValues, groupByValues, groupKeyValues, measurementValues, sortByValues, validationValues } from '-/Components/modifier/modifier.types'
import { builderKeys } from './build-your-own.util';

//////////////////////////////////
//      AGGULATIVE STACKS      //
/////////////////////////////////
export interface aggulativeStacksI {
    type: builderKeys.aggulativeStacks,
    config: configT,
    data: aggulativeStacksT,
}
export interface blockI {
    piece: pieceI,
}
export interface aggulativeStackIndexI {
    stack: number,
    block: number,
}
export type globalRulesI = validationT
export type aggulativeStacksT = stackI[] | []
export type stackI = blockI[]
export type validationT = {type: validationValues, values: string[], proximity?: number}[]
export type validationLibraryT = {
    id: string,
    validation: {
        id: string,
        validation: validationT
    }[]
}[]

////////////////////////////////
//      FREEFORM MATRIX      //
///////////////////////////////
export interface freeformMatrixI {
    type: builderKeys.freeformMatrix,
    config: configT,
    data: matrixT,
}
export interface matrixIndexCoordinatesI {
    row: number,
    column: number,
}
export interface matrixIndexI {
    matrixIndex: matrixIndexCoordinatesI;
    piece?: pieceI;
}
export type matrixT = matrixIndexI[][];

//////////////////////////
//      SINGLETON      //
/////////////////////////
export interface singletonI {
    type: builderKeys.singleton,
    config: configT,
    data: undefined,
}

//////////////////////
//      SHARED      //
//////////////////////
export interface pieceI {
    id: string,
    config: configT,
}
export interface optionI { // todo: make more specific to workspace type
    id: string, // id to identify option
    value: string, // value to match against library of keys
    label: string, // ui label
    image: string, // url of image
    // optional
    selected?: boolean,
    productId?: string | number,
    validation?: validationT,
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
    id: string, // corresponds to modifier id
    selection: string, // corresponds to option id (from modifier with above id)
    value: string, // ui value that is matched against
    groupKey?: groupKeyValues,
};
export interface buildYourOwnData {
    modifiers: modifiersT,
    builder: {
        type: builderKeys,
        rules?: globalRulesI,
        data?: any[][],
    }
}
export type builderT = singletonI | freeformMatrixI | aggulativeStacksI;
export type builderTypesT = builderKeys;
export type modifiersT = modifierI[];
export type optionsT = optionI[];
export type configT = configItemI[];