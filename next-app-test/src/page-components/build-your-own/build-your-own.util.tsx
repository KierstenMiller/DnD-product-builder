import { AggulativeStacksWorkspace } from "-/page-components/build-your-own/types/aggulative-stacks/components/aggulative-stacks-workspace";
import { FreeformMatrixWorkspace } from "-/page-components/build-your-own/types/freeform-matrix/components/freeform-matrix-workspace";
import { SingletonWorkspace } from "-/page-components/build-your-own/types/singleton/singleton-workspace";
import { AggulativeStacksBuildModel } from "./types/aggulative-stacks/models/aggulative-stacks.model";
import { BuilderT } from "./shared/standard.model";
import { builderRawDataT, configT } from "./build-your-own.types";
import { FreeformMatrixBuildModel } from "./types/freeform-matrix/models/freeform-grid.model";
import { SingletonDisplay } from "./types/singleton/singleton-display";

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
            return SingletonWorkspace;
        case builderKeys.freeformMatrix:
            return FreeformMatrixWorkspace
        case builderKeys.aggulativeStacks:
            return AggulativeStacksWorkspace
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
export const getDisplay = (type: builderKeys) => {
    switch (type) {
        case builderKeys.singleton:
            return () => SingletonDisplay;
        case builderKeys.freeformMatrix:
            return () => <div>FREEFORM MATRIX DISPLAY</div>;
        case builderKeys.aggulativeStacks:
            return () => <div>AGGULATIVE STACKS DISPLAY</div>;
        default: throw new Error(`Builder type is not valid: ${type}`);
    }
}