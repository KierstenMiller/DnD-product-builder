import { makeObservable, observable, action} from "mobx"
import { aggulativeStacksT, blockIndexI, configT, pieceI } from "./build-your-own.types";

const generateId = () => 'id' + (new Date()).getTime();

export class Block {
    piece
    constructor({piece}: {piece: pieceI}) {
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
        var uniq = 
        console.log('id generated', uniq);
        this.stacks[stackIndex].splice(blockIndex, 0,  { column: `${stackIndex}`, piece: {id: generateId(), config: [{id: 'mod-height', selection: '1', optionKey:'one-block'}]}})
    };
    addStack = (stackIndex: number) => {
        this.stacks.splice(stackIndex, 0,  [{ column: `${stackIndex}`, piece: {id: generateId(), config: [{id: 'mod-height', selection: '1', optionKey:'one-block'}]}}])
    };
    removeBlock = (stackIndex:number, id:string) => {
        const thing = this.stacks[stackIndex].findIndex(block => block.piece.id === id);
        this.stacks[stackIndex].splice(thing, 1);
        this.stacks = this.stacks.filter(s => s.length > 0);
    };
}