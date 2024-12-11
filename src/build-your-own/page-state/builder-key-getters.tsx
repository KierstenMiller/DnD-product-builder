import { type builderRawDataShapeI, type builderT } from '-/build-your-own/shared/typing/build-your-own.types'
import { AggulativeStacksWorkspace } from '-/build-your-own/workspace-specific-files/aggulative-stacks/components/aggulative-stacks-workspace'
import { AggulativeStacksBuildModel } from '-/build-your-own/workspace-specific-files/aggulative-stacks/models/aggulative-stacks.model'
import { FreeformMatrixDisplay } from '-/build-your-own/workspace-specific-files/freeform-matrix/components/freeform-matrix-display'
import { FreeformMatrixWorkspace } from '-/build-your-own/workspace-specific-files/freeform-matrix/components/freeform-matrix-workspace'
import { FreeformMatrixBuildModel } from '-/build-your-own/workspace-specific-files/freeform-matrix/models/freeform-grid.model'
import { SingletonDisplay } from '-/build-your-own/workspace-specific-files/singleton/singleton-display'
import { SingletonWorkspace } from '-/build-your-own/workspace-specific-files/singleton/singleton-workspace'
import { functionalComponentT } from '-/util-library/typing-util'

export enum builderKeys { singleton = 'singleton', freeformMatrix = 'freeform-matrix', aggulativeStacks = 'aggulative-stacks', }

export const getWorkspace = (type: builderKeys): functionalComponentT => {
  switch (type) {
    case builderKeys.singleton:
      return SingletonWorkspace
    case builderKeys.freeformMatrix:
      return FreeformMatrixWorkspace
    case builderKeys.aggulativeStacks:
      return AggulativeStacksWorkspace
    // NOTE: disabling this eslint/typescript warning. The type value is registered as 'never' by Typescript here (as we've covered all possible cases above.) We want to throw an error if type is not present in builderKeys.
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    default: throw new Error(`Workspace does not exist for provided builder type: ${type}`)
  }
}
export const getDisplay = (type: builderKeys): functionalComponentT | null => {
  switch (type) {
    case builderKeys.singleton:
      return SingletonDisplay
    case builderKeys.freeformMatrix:
      return FreeformMatrixDisplay
    case builderKeys.aggulativeStacks:
      return null
    // NOTE: disabling this eslint/typescript warning. The type value is registered as 'never' by Typescript here (as we've covered all possible cases above.) We want to throw an error if type is not present in builderKeys.
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    default: throw new Error(`Builder type is not valid: ${type}`)
  }
}
export const getBuilder = ({ type, config, data }: builderRawDataShapeI<any>): builderT => {
  switch (type) {
    case builderKeys.singleton:
      return { type, build: undefined }
    case builderKeys.freeformMatrix:
      return { type, build: new FreeformMatrixBuildModel({ config, matrix: data }) }
    case builderKeys.aggulativeStacks:
      return { type, build: new AggulativeStacksBuildModel({ config, stacks: data }) }
    // NOTE: disabling this eslint/typescript warning. The type value is registered as 'never' by Typescript here (as we've covered all possible cases above.) We want to throw an error if type is not present in builderKeys.
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    default: throw new Error(`Builder type is not valid: ${type}`)
  }
}
