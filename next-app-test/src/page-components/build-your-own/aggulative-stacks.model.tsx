import { groupKeyValues } from "-/Components/modifier/modifier.types";
import { makeObservable, observable, computed, action } from "mobx"
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

export class AggulativeStacks {
    config
    stacks
    constructor({ config, stacks: stacksData }: { config: configT, stacks: aggulativeStacksT }) {
        this.config = config;
        this.stacks = [];
        console.log('this.config', this.config);
        makeObservable(this, {
            config: observable,
            // stacksData: observable,
            stacks: observable.ref, // lower parts should decide observability
            setConfig: action.bound,
            addStack: action.bound,
            addToStack: action.bound,
            findAndRemoveBlock: action.bound,
            generatePiece: action.bound,
            clearEmptyStacks: action.bound,
        }) 
        // BIG WHY: NEED CONFIG TO BE OBSERVABLE
        console.log('after', this.config);
        stacksData.forEach(s => s.forEach(b => b.piece.config = this.config.map(c => c.groupKey === groupKeyValues.unique ? {...(b.piece.config.find(pC => pC.id === c.id))} : c)))
        this.stacks = stacksData;
    }
    // get stacks() {
    //     console.log('CREATING STACKS')
    //     return this.stacksData.map(s => s.map(b => {
    //         console.log('b', b);
    //         b.piece = this.generatePiece(b.piece.id, this.config.map(c => c.groupKey === groupKeyValues.unique ? (b.piece.config.find(pC => pC.id === c.id) || c) : c));
    //         console.log('NO CONFIG, THE FUCK?')
    //     }));
    // }
    setConfig = (newConfig: configT) => this.config = newConfig;
    addStack = (stackIndex: number, piece: pieceI) => {
        if (piece) this.findAndRemoveBlock(piece.id)
        this.stacks.splice(stackIndex, 0, [{ piece: piece || this.generatePiece() }]);
        this.clearEmptyStacks();
    };
    addToStack = (stackIndex: number, blockIndex: number, piece: pieceI) => {
        console.log('add to stack piece', piece)
        if (piece) this.findAndRemoveBlock(piece.id);
        this.stacks[stackIndex].splice(blockIndex, 0, { piece: piece || this.generatePiece() });
        this.clearEmptyStacks();
    };
    // util actions
    findAndRemoveBlock = (id: string) => {
        const foundIndex = findIndex2D(this.stacks, id);
        if (foundIndex) this.stacks[foundIndex.stack].splice(foundIndex.block, 1);
    }
    generatePiece = (id?: string, config?: configT) => {
        // unique config items are not observable/changable
        // const values = {
        //     globalConfig: this.config,
        //     ...config && { pieceConfig: config },
        // };
        // const config2 = this.config.filter(c => c.groupKey !== groupKeyValues.unique).concat((config || []).filter(c => c.groupKey === groupKeyValues.unique))
        return { id: id || generateId(), config: config || this.config.map(c => c.groupKey === groupKeyValues.unique ? { ...c } : c) }//overrideConfig(generatePieceConfig(values), this.config)}
    }
    clearEmptyStacks = () => {
        this.stacks = this.stacks.filter(s => s.length > 0);
    }
}