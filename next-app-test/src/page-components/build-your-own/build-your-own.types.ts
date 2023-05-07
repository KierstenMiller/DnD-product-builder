import { displayValuesT, filterDisplayValues, groupByValues, modifierChunkKeyValues, measurementValues, sortByValues, validationValues } from '-/Components/modifier/modifier.types'
import { builderKeys } from './build-your-own.util';
import { AggulativeStacksBuildModel } from './models/aggulative-stacks.model';
import { FreeformMatrixBuildModel } from './models/freeform-grid.model';
import { StandardModel } from './models/standard.model';

//////////////////////////////////
//      AGGULATIVE STACKS      //
/////////////////////////////////
export type aggulativeStacksBuildT = AggulativeStacksBuildModel;
export interface aggulativeStacksI { type: builderKeys.aggulativeStacks, build: aggulativeStacksBuildT }
export interface aggulativeStacksRawDataI {
    type: builderKeys.aggulativeStacks,
    config: configT,
    data: aggulativeStacksListT,
}
export interface blockI {
    piece: pieceI,
}
export interface aggulativeStackIndexI {
    stack: number,
    block: number,
}
export type stackI = blockI[]
export type aggulativeStacksListT = stackI[] | []
/*---START: validation---*/
export type validationT = {type: validationValues, values: string[], proximity?: number}[]
export type globalRulesI = validationT
export type validationLibraryT = {
    id: string,
    validation: {
        id: string,
        validation: validationT
    }[]
}[]
/*---END: validation---*/

////////////////////////////////
//      FREEFORM MATRIX      //
///////////////////////////////
export type freeformMatrixBuildT = FreeformMatrixBuildModel;
export interface freeformMatrixI { type: builderKeys.freeformMatrix, build: freeformMatrixBuildT }
export interface freeformMatrixRawDataI {
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
// note: singletons do not need a build
export interface singletonI { type: builderKeys.singleton, build: undefined }
export interface singletonRawDataI {
    type: builderKeys.singleton,
    config: configT,
    data: undefined,
}

//////////////////////
//      SHARED      //
//////////////////////
export type StandardModelT = StandardModel;
export type builderT =  singletonI | freeformMatrixI | aggulativeStacksI
export type builderRawDataT = singletonRawDataI | freeformMatrixRawDataI | aggulativeStacksRawDataI;
export type builderTypesT = builderKeys;
export interface pieceI {
    id: string,
    config: configT,
}
export interface buildYourOwnRawDataI {
    modifiers: modifiersT,
    builder: {
        type: builderKeys,
        rules?: globalRulesI,
        data?: any[][],
    }
}
/*---START: Modifier/Config---*/
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
    // optional
    filter?: filterI,
    modifierChunkKey?: modifierChunkKeyValues, // groups modifiers by key
    groupBy?: groupByValues, // determines how options are grouped
    sortBy?: sortByValues | sortByValues[], // determines how grouped options are sorted
    measurementUnit?: measurementValues,
}
export interface configItemI {
    id: string, // corresponds to modifier id
    selection: string, // corresponds to option id (from modifier with above id)
    value: string, // ui value that is matched against
    modifierChunkKey?: modifierChunkKeyValues, // groups modifiers by key
};
export type modifiersT = modifierI[];
export type optionsT = optionI[];
export type configT = configItemI[];
/*---END: Modifier/Config---*/