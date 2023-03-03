import { makeObservable, observable, action} from "mobx"
import { aggulativeStacksT, blockI, configT, pieceI } from "./build-your-own.types";

const generateId = () => 'id' + (new Date()).getTime();
const findIndex2D = (stacks: blockI[][], id: string) => {
    let block = -1;
    const stack = stacks.findIndex(s => {
        block = s.findIndex(b => b.piece.id === id)
        return block >= 0;
    }) 
    return stack >= 0 ? {stack, block} : null;
}

export class Block {
    piece
    constructor({piece}: {piece: pieceI}) {
        this.piece = piece;
         makeObservable(this, {
            piece: observable.ref,
         }) 
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
            addStack: action.bound,
            addToStack: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    addStack = (stackIndex: number, piece: pieceI) => {
        console.log('piece', piece);
        if(piece) this.findAndRemoveBlock(piece.id)
        this.stacks.splice(stackIndex, 0, [{piece: piece || this.generatePiece()}]);
        this.clearEmptyStacks();
    };
    addToStack = (stackIndex: number, blockIndex: number, piece: pieceI) => {
        console.log('piece', piece);
        if(piece) this.findAndRemoveBlock(piece.id)
        this.stacks[stackIndex].splice(blockIndex, 0, {piece: piece || this.generatePiece()});
        this.clearEmptyStacks();   
    };
    // util actions
    findAndRemoveBlock = (id: string) => {
        const foundIndex = findIndex2D(this.stacks, id);
        if (foundIndex) this.stacks[foundIndex.stack].splice(foundIndex.block, 1);
    }
    generatePiece = () => {
        return { id: generateId(), config: [...this.config] }
    }
    clearEmptyStacks = () => {
        this.stacks = this.stacks.filter(s => s.length > 0);  
    }
}