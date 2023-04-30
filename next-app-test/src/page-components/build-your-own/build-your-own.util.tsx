import { WorkspaceAggulativeStacks } from "-/Components/DnD/workspace/aggulativeStacks/aggulativeStacks";
import { WorkspaceFreeformMatrix } from "-/Components/DnD/workspace/freeformMatrix/freeformMatrix";
import { WorkspaceSingleton } from "-/Components/DnD/workspace/singleton/singleton";
import { AggulativeStacksBuildModel } from "./models/aggulative-stacks.model";
import { BuilderT } from "./models/standard.model";
import { builderRawDataT, configT } from "./build-your-own.types";
import { FreeformMatrixBuildModel } from "./models/freeform-grid.model";

export enum builderKeys {
    singleton= 'singleton',
    freeformMatrix= 'freeform-matrix',
    aggulativeStacks= 'aggulative-stacks',

}
export const overrideConfig = (config: configT, overrideConfig: configT) => {
    return config.map(c => (overrideConfig.find(o => o.id === c.id) || c));
}
export const getWorkspace = (type: builderKeys) => {
    switch (type) {
        case builderKeys.singleton:
            return WorkspaceSingleton;
        case builderKeys.freeformMatrix:
            return WorkspaceFreeformMatrix
        case builderKeys.aggulativeStacks:
            return WorkspaceAggulativeStacks
        default: throw new Error(`Workspace does not exist for provided builder type: ${type}`);
    }
}
export const getBuilder = ({type, config, data}: builderRawDataT): BuilderT => {
    switch (type) {
        case builderKeys.singleton:
            return {type, build: undefined};
        case builderKeys.freeformMatrix:
            return {type, build: new FreeformMatrixBuildModel({config, matrix: data})};
        case builderKeys.aggulativeStacks:
            return {type, build: new AggulativeStacksBuildModel({config, stacks: data})}
        default: throw new Error(`Builder type is not valid: ${type}`);
    }
}