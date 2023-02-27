import { WorkspaceFreeformMatrix } from "-/Components/DnD/workspace/freeformMatrix/freeformMatrix";
import { AggulativeStacks } from "./aggulative-stacks.model";
import { BuilderT } from "./build-your-own-model";
import { builderT, configT, modifiersT } from "./build-your-own.types";
import { Matrix } from "./freeform-grid.model";

export enum builderKeys {
    singleton= 'singleton',
    freeformMatrix= 'freeform-matrix',
    aggulativeStacks= 'aggulative-stacks',

}

interface getWorkspaceI {
    builder: BuilderT,
    modifiers: modifiersT,
}

export const getWorkspace = ({builder, modifiers}: getWorkspaceI) => {
    switch (builder.type) {
        case builderKeys.singleton:
            return <div>THIS IS A SINGLETON</div>;
        case builderKeys.freeformMatrix:
            return <WorkspaceFreeformMatrix matrix={builder.build} modifiers={modifiers} />
        case builderKeys.aggulativeStacks:
            return <div>THIS IS A AGGULATIVE STACK</div>
        default: throw new Error('Builder type is not valid');
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
        default: throw new Error('Builder type is not valid');
    }
}