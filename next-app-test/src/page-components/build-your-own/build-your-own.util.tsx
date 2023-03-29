import { WorkspaceAggulativeStacks } from "-/Components/DnD/workspace/aggulativeStacks/aggulativeStacks";
import { WorkspaceFreeformMatrix } from "-/Components/DnD/workspace/freeformMatrix/freeformMatrix";
import { WorkspaceSingleton } from "-/Components/DnD/workspace/singleton/singleton";
import { AggulativeStacks } from "./aggulative-stacks.model";
import { BuilderT } from "./build-your-own-model";
import { builderT, configT } from "./build-your-own.types";
import { Matrix } from "./freeform-grid.model";

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
export const getBuilder = ({type, config, data}: builderT): BuilderT => {
    switch (type) {
        case builderKeys.singleton:
            return {type, build: undefined};
        case builderKeys.freeformMatrix:
            return {type, build: new Matrix({config, matrix: data})};
        case builderKeys.aggulativeStacks:
            return {type, build: new AggulativeStacks({config, stacks: data})}
        default: throw new Error(`Builder type is not valid: ${type}`);
    }
}