import { groupKeyValues } from "-/Components/modifier/modifier.types";
import { makeAutoObservable, makeObservable, observable, computed, action } from "mobx"
import { aggulativeStacksT, configT, pieceI } from "./build-your-own.types";
import { overrideConfig } from "./build-your-own.util";

const generateId = () => 'id' + (new Date()).getTime();
const findIndex2D = (stacks: aggulativeStacksT, id: string) => {
    let block = -1;
    const stack = stacks.findIndex(s => {
        block = s.findIndex(b => b.piece.id === id)
        return block >= 0;
    })
    return stack >= 0 ? { stack, block } : null;
}
// const generatePieceConfig = ({ pieceConfig, globalConfig }: { pieceConfig?: configT, globalConfig: configT }) => {
//     // if pieceConfig passed, return non-observable version of each unique config item. For each global config item: override with the most updated global value or return current value if no matching id is found
//     if (pieceConfig) return pieceConfig.map(c => c.groupKey === groupKeyValues.unique ? { ...c } : globalConfig?.find(o => o.id === c.id) || c);
//     // otherwise, make sure unique configItems are non-observable
//     return globalConfig.map(c => c.groupKey === groupKeyValues.unique ? { ...c } : c);
// }

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
    setConfig = (newConfig: configT) => {
        console.log('setting config with', newConfig);
        this.config = newConfig;
    };
}

export class AggulativeStacks {
    config
    stacksData
    // stacks
    constructor({ config, stacks: stacksData }: { config: configT, stacks: aggulativeStacksT }) {
        this.config = config;
        this.stacksData = stacksData;
        makeAutoObservable(this, {
            stacks: computed, // lower parts should decide observability
            setConfig: action.bound,
            addStack: action.bound,
            addToStack: action.bound,
            findAndRemoveBlock: action.bound,
            generatePiece: action.bound,
            clearEmptyStacks: action.bound,
        })
        
        // .map(s => s.map(b => ({...b, piece: new Piece({id: b.piece.id, config: 
        //     this.config.map(c => c.groupKey === groupKeyValues.unique ? (b.piece.config.find(pC => pC.id === c.id) || c) : c)
        // })})));
    }
    get stacks() {
        console.log('CREATING STACKS', this.stacksData)
        const newConfig = this.config;
        const newStacks = this.stacksData.map(s => s.map(b => ({...b, piece: new Piece({id: b.piece.id, config: 
            this.config.map(c => c.groupKey === groupKeyValues.unique ? (b.piece.config.find(pC => pC.id === c.id) || c) : c)
        })})));
        return newStacks;
    }
    setConfig = (newConfig: configT) => {
        this.config = newConfig;   
    };
    addStack = (stackIndex: number, piece: pieceI) => {
        if (piece) this.findAndRemoveBlock(piece.id)
        this.stacksData.splice(stackIndex, 0, [{ piece: piece || this.generatePiece() }]);
        this.clearEmptyStacks();
    };
    addToStack = (stackIndex: number, blockIndex: number, piece: pieceI) => {
        if (piece) this.findAndRemoveBlock(piece.id);
        this.stacksData[stackIndex].splice(blockIndex, 0, { piece: piece || this.generatePiece() });
        this.clearEmptyStacks();
    };
    // util actions
    findAndRemoveBlock = (id: string) => {
        const foundIndex = findIndex2D(this.stacksData, id);
        if (foundIndex) this.stacksData[foundIndex.stack].splice(foundIndex.block, 1);
    }
    generatePiece = (id?: string, config?: configT) => {
        return { id: id || generateId(), config: config || this.config.map(c => c.groupKey === groupKeyValues.unique ? { ...c } : c) }
    }
    clearEmptyStacks = () => {
        this.stacksData = this.stacksData.filter(s => s.length > 0);
    }
}