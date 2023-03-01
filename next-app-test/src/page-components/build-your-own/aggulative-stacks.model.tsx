import { makeObservable, observable, action} from "mobx"
import { aggulativeStacksT, configT, pieceI } from "./build-your-own.types";

class StackPiece {
    id
    column
    piece
    constructor({id, column, piece}: {id: string, column: string, piece: pieceI}) {
        this.id = id;
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
        this.stacks = stacks?.map(s => s.map(piece => (new StackPiece({...piece}))));
        makeObservable(this, {
            stacks: observable,
            config: observable,
            setConfig: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
}