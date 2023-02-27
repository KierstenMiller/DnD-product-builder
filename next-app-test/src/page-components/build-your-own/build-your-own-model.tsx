import { generateImage } from "-/Components/DnD/workspace/freeformMatrix/freeformMatrix.util";
import { makeObservable, observable, action, computed } from "mobx"
import { type } from "os";
import { AggulativeStacks } from "./aggulative-stacks.model";
import { aggulativeStacksT, configItemI, configT, matrixT, pieceI } from "./build-your-own.types";
import { builderKeys, getBuilder } from "./build-your-own.util";
import { Matrix } from "./freeform-grid.model";

export type BuilderDataT = {type: builderKeys.singleton, data: undefined}
| {type: builderKeys.freeformMatrix, data: matrixT}
| {type: builderKeys.aggulativeStacks, data: aggulativeStacksT}
export type BuilderT = {type: builderKeys.singleton, build: undefined}
| {type: builderKeys.freeformMatrix, build: Matrix}
| {type: builderKeys.aggulativeStacks, build: AggulativeStacks}
export type BuildT = Matrix | AggulativeStacks | null
export interface BuildYourOwnModelPropsI {
    config: configT
    builder: BuilderDataT
}
export interface BuildYourOwnModelI {
    config: configT
    builder: BuilderT
}
export class buildPiece {
    id
    config
    constructor({id, config}: pieceI) {
        this.id = id
        this.config = config
        makeObservable(this, {
            config: observable,
            setConfig: action.bound,
        })
    }
    setConfig(config: configT) {
        this.config = config;
    }
}
export class BuildYourOwnModel {
    builderData: BuilderDataT
    config: configT
    constructor({config, builder: builderData}: BuildYourOwnModelPropsI) {
        this.builderData = builderData
        this.config = config;
        // TODO: make builder a computed?
        makeObservable(this, {
            config: observable,
            builder: computed,
            setConfig: action.bound,
            updateConfigSelection: action.bound,
        }) 
    }
    get builder() {
        return getBuilder({config: this.config, ...this.builderData})
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    updateConfigSelection = ({id, selection: newSelection, value: newValue}: configItemI) => {
        const match = this.config.find(mod => mod.id === id);
        if (match) match.selection = newSelection
        if (match) match.value = newValue
        this.builder.build?.setConfig(this.config);
    }
}