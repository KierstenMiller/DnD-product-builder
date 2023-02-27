
import { makeObservable, observable, action} from "mobx"
import { aggulativeStacksT, configT, pieceI } from "./build-your-own.types";


class ColumnPiece {
    column
    piece
    constructor({column, piece}: {column: string, piece: pieceI}) {
        this.column = column;
        this.piece = piece;
         // makeObservable(this, {}) 
    }
}

export class AggulativeStacks {
    config
    stacks
    constructor({config, stacks}: {config: configT, stacks: aggulativeStacksT}) {
        this.config = config
        this.stacks = stacks?.map(n => n.map(c => (new ColumnPiece({
            column: c.column,
            piece: c.piece,
        }))));
        makeObservable(this, {
            stacks: observable.ref, // using ref to give children control over what is observable
            config: observable,
            setConfig: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
}