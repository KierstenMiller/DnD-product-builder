import { groupKeyValues } from "-/Components/modifier/modifier.types";
import { makeObservable, observable, computed, action} from "mobx"
import { aggulativeStacksT, blockI, configT, pieceI } from "./build-your-own.types";
import { overrideConfig } from "./build-your-own.util";

const generateId = () => 'id' + (new Date()).getTime();
const findIndex2D = (stacks: blockI[][], id: string) => {
    let block = -1;
    const stack = stacks.findIndex(s => {
        block = s.findIndex(b => b.piece.id === id)
        return block >= 0;
    }) 
    return stack >= 0 ? {stack, block} : null;
}
const generatePieceConfig = (pieceConfig: configT, globalConfig: configT) => {
    const oConfig = overrideConfig(globalConfig, pieceConfig);
    globalConfig.forEach(gC => {
        const found = pieceConfig.find(pC => pC.id === gC.id)
        console.log('found', {found, gC});
    })
    console.log('result', { pieceConfig, globalConfig, oConfig });
    //this.config.map(c => c.groupKey === groupKeyValues.unique ? {...c} : c)
}

export class AggulativeStacks {
    config
    stacksData
    constructor({config, stacks: stacksData}: {config: configT, stacks: aggulativeStacksT}) {
        this.config = config;
        console.log('stacksData', stacksData);
        this.stacksData = stacksData;
        makeObservable(this, {
            config: observable,
            stacksData: observable,
            stacks: computed,
            setConfig: action.bound,
            addStack: action.bound,
            addToStack: action.bound,
        })
    }
    get stacks() {
        return this.stacksData.map(s => s.map(b => ({ piece: this.generatePiece(b.piece.id, overrideConfig(this.config, b.piece.config))})));
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    addStack = (stackIndex: number, piece: pieceI) => {
        if(piece) this.findAndRemoveBlock(piece.id)
        this.stacks.splice(stackIndex, 0, [{piece: piece || this.generatePiece()}]);
        this.clearEmptyStacks();
    };
    addToStack = (stackIndex: number, blockIndex: number, piece: pieceI) => {
        if(piece) this.findAndRemoveBlock(piece.id)
        this.stacks[stackIndex].splice(blockIndex, 0, {piece: piece || this.generatePiece()});
        this.clearEmptyStacks();   
    };
    // util actions
    findAndRemoveBlock = (id: string) => {
        const foundIndex = findIndex2D(this.stacks, id);
        if (foundIndex) this.stacks[foundIndex.stack].splice(foundIndex.block, 1);
    }
    generatePiece = (id?: string, config?: configT) => {
        // unique config items are not observable/changable
        const newConfig = this.config.map(c => c.groupKey === groupKeyValues.unique ? {...c} : c);
        return { id: id || generateId(), config: config || newConfig}
    }
    clearEmptyStacks = () => {
        this.stacksData = this.stacks.filter(s => s.length > 0);  
    }
}