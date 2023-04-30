import { makeObservable, observable, action } from "mobx"
import { AggulativeStacksModel } from "./aggulative-stacks.model";
import { aggulativeStacksT, configItemI, configT, matrixT, pieceI } from "../build-your-own.types";
import { builderKeys } from "../build-your-own.util";
import { FreeformMatrixModel } from "./freeform-grid.model";

export type BuilderDataT = {type: builderKeys.singleton, data: undefined}
| {type: builderKeys.freeformMatrix, data: matrixT}
| {type: builderKeys.aggulativeStacks, data: aggulativeStacksT}
export type BuilderT = {type: builderKeys.singleton, build: undefined}
| {type: builderKeys.freeformMatrix, build: FreeformMatrixModel}
| {type: builderKeys.aggulativeStacks, build: AggulativeStacksModel}
export type BuildT = FreeformMatrixModel | AggulativeStacksModel | null
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
export class SingletonModel {
    config: configT
    builder: BuilderT
    constructor({config, builder}: BuildYourOwnModelI) {
        this.config = config;
        this.builder = builder
        // TODO: make builder a computed?
        makeObservable(this, {
            config: observable,
            builder: observable.ref, // allow children to decide what is observable
            setConfig: action.bound,
            updateConfigSelection: action.bound,
        }) 
    }

    setConfig = (newConfig: configT) => this.config = newConfig;
    updateConfigSelection = ({id, selection: newSelection, value: newValue}: configItemI) => {
        const match = this.config.find(mod => mod.id === id);
        if (match) match.selection = newSelection
        if (match) match.value = newValue
        this.builder.build?.setConfig(this.config);
    }
}