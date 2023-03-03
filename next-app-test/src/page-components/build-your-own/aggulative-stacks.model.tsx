import { makeObservable, observable, action} from "mobx"
import { aggulativeStacksT, blockIndexI, configT, pieceI } from "./build-your-own.types";

const generateId = () => 'id' + (new Date()).getTime();

export class Block {
    piece
    constructor({piece}: {piece: pieceI}) {
        this.piece = piece;
         makeObservable(this, {
            piece: observable.ref,
         }) 
    }
    // setPiece = (newPiece: pieceI) => this.piece = newPiece
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
            addToStack: action.bound,
            addStack: action.bound,
            removeBlock: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    addToStack = (stackIndex: number, blockIndex: number, piece: pieceI) => {
        const foundIndex = this.findId(piece.id);
        if (foundIndex){
            this.removeBlockAt(foundIndex.stackIndex, foundIndex.blockIndex);
        } 
        this.stacks[stackIndex].splice(blockIndex, 0, {piece});
        this.stacks = this.stacks.filter(s => s.length > 0);
        
    };
    addStack = (stackIndex: number, piece: pieceI) => {
        const foundIndex = this.findId(piece.id);
        if (foundIndex){
            this.removeBlockAt(foundIndex.stackIndex, foundIndex.blockIndex);
        } 
        this.stacks.splice(stackIndex, 0,  [{piece}]);
    };
    findId = (id: string) => {
        console.log('finding', id);
        let blockIndex = -1;
        const stackIndex = this.stacks.findIndex(s => {
            blockIndex = s.findIndex(b => b.piece.id === id)
            return blockIndex >= 0;
        }) 
        return stackIndex >= 0 ? {stackIndex, blockIndex} : null;
    }
    removeBlockAt = (stackIndex: number, blockIndex: number) => {
        console.log('removingBlockAt', {stackIndex, blockIndex});
        this.stacks[stackIndex].splice(blockIndex, 1);
    }
    removeBlock = (stackIndex:number, id:string) => {
        const thing = this.stacks[stackIndex].findIndex(block => block.piece.id === id);
        this.stacks[stackIndex].splice(thing, 1);
        this.stacks = this.stacks.filter(s => s.length > 0);
    };
}