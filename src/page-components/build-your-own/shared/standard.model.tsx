import { makeObservable, observable, action } from "mobx"
import { builderT, configItemI, configT, pieceI } from "../build-your-own.types";

export class buildPiece {
    id
    config
    constructor({ id, config }: pieceI) {
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
export class StandardModel {
    config: configT
    builder: builderT
    constructor({ config, builder }: { config: configT, builder: builderT }) {
        this.config = config;
        this.builder = builder
        makeObservable(this, {
            config: observable,
            builder: observable.ref, // allow children to decide what is observable
            setConfig: action.bound,
            updateConfigSelection: action.bound,
        })
    }

    setConfig = (newConfig: configT) => this.config = newConfig;
    updateConfigSelection = ({ id, selection: newSelection, value: newValue }: configItemI) => {
        const match = this.config.find(mod => mod.id === id);
        if (match) match.selection = newSelection
        if (match) match.value = newValue
        this.builder.build?.setConfig(this.config);
    }
}