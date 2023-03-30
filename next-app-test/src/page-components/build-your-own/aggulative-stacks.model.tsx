import { groupKeyValues } from "-/Components/modifier/modifier.types";
import { makeObservable, observable, computed, action} from "mobx"
import { aggulativeStacksT, configT, pieceI } from "./build-your-own.types";

const generateId = () => 'id' + (new Date()).getTime();
const findIndex2D = (stacks: aggulativeStacksT, id: string) => {
    let block = -1;
    const stack = stacks.findIndex(s => {
        block = s.findIndex(b => b.piece.id === id)
        return block >= 0;
    }) 
    return stack >= 0 ? {stack, block} : null;
}
const generatePieceConfig = ({pieceConfig, globalConfig}: {pieceConfig?: configT, globalConfig: configT}) => {
    // if pieceConfig passed, return non-observable version of each unique config item. For each global config item: override with the most updated global value or return current value if no matching id is found
    if(pieceConfig) return pieceConfig.map(c => c.groupKey === groupKeyValues.unique? {...c} : globalConfig?.find(o => o.id === c.id) || c);
    // otherwise, make sure unique configItems are non-observable
    return globalConfig.map(c => c.groupKey === groupKeyValues.unique ? {...c} : c);
}

export class AggulativeStacks {
    config
    stacksData
    constructor({config, stacks: stacksData}: {config: configT, stacks: aggulativeStacksT}) {
        this.config = config;
        this.stacksData = stacksData;
        makeObservable(this, {
            config: observable,
            stacksData: observable,
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
        return this.stacksData.map(s => s.map(b => ({
            piece: this.generatePiece(b.piece.id, b.piece.config)
        })));
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    addStack = (stackIndex: number, piece: pieceI) => {
        if(piece) this.findAndRemoveBlock(piece.id)
        this.stacksData.splice(stackIndex, 0, [{piece: piece || this.generatePiece()}]);
        this.clearEmptyStacks();
    };
    addToStack = (stackIndex: number, blockIndex: number, piece: pieceI) => {
        if(piece) this.findAndRemoveBlock(piece.id);
        this.stacksData[stackIndex].splice(blockIndex, 0, {piece: piece || this.generatePiece()});
        this.clearEmptyStacks();   
    };
    // util actions
    findAndRemoveBlock = (id: string) => {
        const foundIndex = findIndex2D(this.stacksData, id);
        if (foundIndex) this.stacksData[foundIndex.stack].splice(foundIndex.block, 1);
    }
    generatePiece = (id?: string, config?: configT) => {
        // unique config items are not observable/changable
        const values = { 
            globalConfig: this.config,
            ...config && {pieceConfig: config},
        }; 
        return { id: id || generateId(), config: generatePieceConfig(values)}
    }
    clearEmptyStacks = () => {
        this.stacksData = this.stacksData.filter(s => s.length > 0);  
    }
}