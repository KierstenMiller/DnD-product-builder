import { makeObservable, observable, action} from "mobx"
import { configItemI, configT } from "./build-your-own.util";

export interface BuildYourOwnModelI {
    config: configT
}
export class BuildYourOwnModel {
    config
    constructor({config}: BuildYourOwnModelI) {
        this.config = config;
        makeObservable(this, {
            config: observable,
            setConfig: action.bound,
            updateConfigItemSelection: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    updateConfigItemSelection = ({id, selection: newSelection}: configItemI) => {
        const match = this.config.find(mod => mod.id === id);
        if (match) match.selection = newSelection
    };
}