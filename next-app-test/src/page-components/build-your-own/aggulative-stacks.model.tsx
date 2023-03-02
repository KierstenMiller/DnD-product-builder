import { makeObservable, observable, action} from "mobx"
import { aggulativeStacksT, configT, pieceI } from "./build-your-own.types";

export class Block {
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
        this.stacks = stacks?.map(s => s.map(piece => (new Block({...piece}))));
        makeObservable(this, {
            stacks: observable,
            config: observable,
            setConfig: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    addToStack = (stackIndex: number, blockIndex: number) => {
        console.log('ADDRING TO STACK', {stackIndex, blockIndex});
        this.stacks[stackIndex].splice(blockIndex, 0,  { column: `${stackIndex}`, piece: {id:'NEW PIECE', config: [{id: 'mod-height', selection: '1', optionKey:'one-block'}]}})
    };
    addStack = (stackIndex: number) => {
        console.log('ADDING STACK', {stackIndex});
        this.stacks.splice(stackIndex, 0,  [{ column: `${stackIndex}`, piece: {id:'NEW PIECE', config: [{id: 'mod-height', selection: '1', optionKey:'one-block'}]}}])
    };
}