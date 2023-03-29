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
const keepUniqueValues = ({config, overrideConfig}: {config: configT, overrideConfig?: configT}) => {

    const thing = config.map(c => c.groupKey === groupKeyValues.unique
        ? {...c}
        : overrideConfig ? overrideConfig.find(o => o.id === c.id) : c)
    console.log('override', overrideConfig);
    console.log('thing', thing);
    return thing;
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
        })
    }
    get stacks() {
        return this.stacksData.map(s => s.map(b => ({
            piece: this.generatePiece(b.piece.id, overrideConfig(this.config, b.piece.config))
        })));
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    addStack = (stackIndex: number, piece: pieceI) => {
        if(piece) this.findAndRemoveBlock(piece.id)
        this.stacksData.splice(stackIndex, 0, [{piece: piece || this.generatePiece()}]);
        this.clearEmptyStacks();
    };
    addToStack = (stackIndex: number, blockIndex: number, piece: pieceI) => {
        if(piece) this.findAndRemoveBlock(piece.id)
        console.log('ADDING TO STACK', piece);
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
        // if (config) console.log('keepUniqueValues', keepUniqueValues({ config: config, overrideConfig: this.config }))
        const newConfig = config
        ? keepUniqueValues({ config: config, overrideConfig: this.config })
        : this.config.map(c => c.groupKey === groupKeyValues.unique ? {...c} : c);
        return { id: id || generateId(), config: newConfig}
    }
    clearEmptyStacks = () => {
        this.stacksData = this.stacksData.filter(s => s.length > 0);  
    }
}