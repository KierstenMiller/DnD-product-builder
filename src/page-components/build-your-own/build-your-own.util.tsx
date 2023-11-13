import { AggulativeStacksDisplay } from '-/page-components/build-your-own/types/aggulative-stacks/components/aggulative-stacks-display'
import { AggulativeStacksWorkspace } from '-/page-components/build-your-own/types/aggulative-stacks/components/aggulative-stacks-workspace'
import { AggulativeStacksBuildModel } from '-/page-components/build-your-own/types/aggulative-stacks/models/aggulative-stacks.model'
import { FreeformMatrixDisplay } from '-/page-components/build-your-own/types/freeform-matrix/components/freeform-matrix-display'
import { FreeformMatrixWorkspace } from '-/page-components/build-your-own/types/freeform-matrix/components/freeform-matrix-workspace'
import { FreeformMatrixBuildModel } from '-/page-components/build-your-own/types/freeform-matrix/models/freeform-grid.model'
import { SingletonDisplay } from '-/page-components/build-your-own/types/singleton/singleton-display'
import { SingletonWorkspace } from '-/page-components/build-your-own/types/singleton/singleton-workspace'
import { type builderRawDataShapeI, type builderT, type configT } from './build-your-own.types'

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
