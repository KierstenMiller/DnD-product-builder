import { AggulativeStacksWorkspace } from '-/page-components/build-your-own/types/aggulative-stacks/components/aggulative-stacks-workspace'
import { FreeformMatrixWorkspace } from '-/page-components/build-your-own/types/freeform-matrix/components/freeform-matrix-workspace'
import { SingletonWorkspace } from '-/page-components/build-your-own/types/singleton/singleton-workspace'
import { type builderRawDataT, type builderT, type configT } from './build-your-own.types'
import { AggulativeStacksDisplay } from './types/aggulative-stacks/components/aggulative-stacks-display'
import { AggulativeStacksBuildModel } from './types/aggulative-stacks/models/aggulative-stacks.model'
import { FreeformMatrixDisplay } from './types/freeform-matrix/components/freeform-matrix-display'
import { FreeformMatrixBuildModel } from './types/freeform-matrix/models/freeform-grid.model'
import { SingletonDisplay } from './types/singleton/singleton-display'

type functionalComponentT = (((props: any) => JSX.Element) & { displayName: string })
export enum builderKeys { singleton = 'singleton', freeformMatrix = 'freeform-matrix', aggulativeStacks = 'aggulative-stacks', }

export const overrideConfig = (config: configT, overrideConfig: configT) => {
  return config.map(c => (overrideConfig.find(o => o.id === c.id) ?? c))
}
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
export const getDisplay = (type: builderKeys): functionalComponentT => {
  switch (type) {
    case builderKeys.singleton:
      return SingletonDisplay
    case builderKeys.freeformMatrix:
      return FreeformMatrixDisplay
    case builderKeys.aggulativeStacks:
      return AggulativeStacksDisplay
    // NOTE: disabling this eslint/typescript warning. The type value is registered as 'never' by Typescript here (as we've covered all possible cases above.) We want to throw an error if type is not present in builderKeys.
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    default: throw new Error(`Builder type is not valid: ${type}`)
  }
}
export const getBuilder = ({ type, config, data }: builderRawDataT): builderT => {
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
