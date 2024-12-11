import { type builderKeys } from '-/build-your-own/page-state/builder-key-getters'
import { type StandardModel } from '-/build-your-own/page-state/standard.model'
import { type displayValuesT, type filterDisplayValues } from '-/build-your-own/shared/modifier-components/shared/components/display-components/displays.types'
import { type groupByValues, type measurementValues, type modifierChunkKeyValues, type sortByValues, type validationValues } from '-/build-your-own/shared/modifier-components/shared/typing/modifier.types'
import { type AggulativeStacksBuildModel } from '-/build-your-own/workspace-specific-files/aggulative-stacks/models/aggulative-stacks.model'
import { type FreeformMatrixBuildModel } from '-/build-your-own/workspace-specific-files/freeform-matrix/models/freeform-grid.model'

/// ///////////////////////////////
//      AGGULATIVE STACKS      //
/// //////////////////////////////
export type aggulativeStacksBuildT = AggulativeStacksBuildModel
export interface aggulativeStacksI { type: builderKeys.aggulativeStacks, build: aggulativeStacksBuildT }
export type aggulativeStacksRawDataI = builderRawDataShapeI<{ type: builderKeys.aggulativeStacks }>
export interface blockI {
  piece: pieceI
}
export interface aggulativeStackIndexI {
  stack: number
  block: number
}
export type stackI = blockI[]
export type aggulativeStacksListT = stackI[] | []
/* ---START: validation--- */
export type validationT = Array<{ type: validationValues, values: string[], proximity?: number }>
export type globalRulesI = validationT
export type validationLibraryT = Array<{
  id: string
  validation: Array<{
    id: string
    validation: validationT
  }>
}>
/* ---END: validation--- */

/// /////////////////////////////
//      FREEFORM MATRIX      //
/// ////////////////////////////
export type freeformMatrixBuildT = FreeformMatrixBuildModel
export interface freeformMatrixI { type: builderKeys.freeformMatrix, build: freeformMatrixBuildT }
export type freeformMatrixRawDataI = builderRawDataShapeI<{ type: builderKeys.freeformMatrix }>
export interface matrixIndexCoordinatesI {
  row: number
  column: number
}
export interface matrixIndexI {
  matrixIndex: matrixIndexCoordinatesI
  piece?: pieceI
}
export type matrixT = matrixIndexI[][]

/// ///////////////////////
//      SINGLETON      //
/// //////////////////////
// note: singletons do not need a build
export interface singletonI { type: builderKeys.singleton, build: undefined }
export type singletonRawDataI = builderRawDataShapeI<{ type: builderKeys.singleton }>

/// ///////////////////
//      SHARED      //
/// ///////////////////
export type StandardModelT = StandardModel
export type builderT = singletonI | freeformMatrixI | aggulativeStacksI
interface shapeMapI {
  [builderKeys.aggulativeStacks]: aggulativeStacksListT
  [builderKeys.freeformMatrix]: matrixT
  [builderKeys.singleton]: undefined
}
export interface builderRawDataShapeI<T extends { type: builderKeys }> {
  type: T['type']
  config: configT
  data: T['type'] extends keyof shapeMapI ? shapeMapI[T['type']] : never
}
// export interface builderRawDataT { type: builderKeys, config: configT, data?: any[][] }
export type builderRawDataT = singletonRawDataI | freeformMatrixRawDataI | aggulativeStacksRawDataI
export type builderTypesT = builderKeys
export interface pieceI {
  id: string
  config: configT
}
export interface buildYourOwnRawDataI {
  modifiers: modifiersT
  builder: {
    type: builderKeys
    rules?: globalRulesI
    data?: any[][]
  }
}
/* ---START: Modifier/Config--- */
export interface optionI {
  id: string // id to identify option
  value: string // value to match against library of keys
  label: string // ui label
  image: string // url of image
  // optional
  selected?: boolean
  productId?: string | number
  validation?: validationT
}
export interface filterI {
  display: filterDisplayValues
  values: string[] | string[][]
}
export interface modifierI {
  id: string
  label: string
  display: displayValuesT
  options: optionsT
  // optional
  filter?: filterI
  modifierChunkKey?: modifierChunkKeyValues // groups modifiers by key
  groupBy?: groupByValues // determines how options are grouped
  sortBy?: sortByValues | sortByValues[] // determines how grouped options are sorted
  measurementUnit?: measurementValues
}
export interface configItemI {
  id: string // corresponds to modifier id
  selection: string // corresponds to option id (from modifier with above id)
  value: string // ui value that is matched against
  modifierChunkKey?: modifierChunkKeyValues // groups modifiers by key
};
export type modifiersT = modifierI[]
export type optionsT = optionI[]
export type configT = configItemI[]
/* ---END: Modifier/Config--- */
