import { makeAutoObservable, makeObservable, observable, computed, action } from "mobx"

import { groupKeyValues } from "-/Components/modifier/modifier.types";
import { aggulativeStacksT, configT, pieceI } from "./build-your-own.types";

const generateId = () => 'id' + (new Date()).getTime();
const findIndex2D = (stacks: aggulativeStacksT, id: string) => {
    let block = -1;
    const stack = stacks.findIndex(s => {
        block = s.findIndex(b => b.piece.id === id)
        return block >= 0;
    })
    return stack >= 0 ? { stack, block } : null;
}
const findBlock = (stacks: aggulativeStacksT, id: string) => {
    return stacks.flat().find(b=> b.piece.id === id);
}

class Piece {
    id
    config
    constructor({id, config}: {id: string, config: configT}){
        this.id = id;
        this.config = config;
        makeObservable(this, {
            config: observable,
            setConfig: action.bound,
        })
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
}

export class AggulativeStacks {
    config
    stacksData
    // stacks
    constructor({ config, stacks: stacksData }: { config: configT, stacks: aggulativeStacksT }) {
        this.config = config;
        this.stacksData = stacksData;
        makeAutoObservable(this, {
            stacks: computed,
            setConfig: action.bound,
            addStack: action.bound,
            addToStack: action.bound,
            findAndRemoveBlock: action.bound,
            generatePiece: action.bound,
            clearEmptyStacks: action.bound,
        })
    }
    get stacks() {
        return this.stacksData.map(s => s.map(b => ({...b, piece: new Piece({id: b.piece.id, config: 
            this.config.map(c => c.groupKey === groupKeyValues.unique ? (b.piece.config.find(pC => pC.id === c.id) || c) : c)
        })})));
    }
    // setting actions
    setConfig = (newConfig: configT) => {
        this.config = newConfig;   
    };
    // generating actions
    generatePiece = (id?: string, config?: configT) => {
        return { id: id || generateId(), config: config || this.config.map(c => c.groupKey === groupKeyValues.unique ? { ...c } : c) }
    }
    // adding actions
    addStack = (stackIndex: number, pieceId?: string) => {
        console.log("stuff", {stackIndex, pieceId});
        let piece;
        if (pieceId) piece = findBlock(this.stacksData, pieceId)?.piece;
        if (piece) this.findAndRemoveBlock(piece.id)
        this.stacksData.splice(stackIndex, 0, [{ piece: piece || this.generatePiece() }]);
        this.clearEmptyStacks();
    };
    addToStack = (stackIndex: number, blockIndex: number, pieceId?: string) => {
        let piece;
        if (pieceId) piece = findBlock(this.stacksData, pieceId)?.piece;
        if (piece) this.findAndRemoveBlock(piece.id);
        this.stacksData[stackIndex].splice(blockIndex, 0, { piece: piece || this.generatePiece() });
        this.clearEmptyStacks();
    };
    // removal actions
    findAndRemoveBlock = (id: string) => {
        const foundIndex = findIndex2D(this.stacksData, id);
        if (foundIndex) this.stacksData[foundIndex.stack].splice(foundIndex.block, 1);
    }
    clearEmptyStacks = () => {
        this.stacksData = this.stacksData.filter(s => s.length > 0);
    }
}