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
const keepUniqueValues = ({config, overrideConfig}: {config: configT, overrideConfig?: configT}) => {
    console.log('stuff', {config, overrideConfig});
    return config.map(c => c.groupKey === groupKeyValues.unique
        ? {...c}
        : overrideConfig?.find(o => o.id === c.id) || c);
}

export class AggulativeStacks {
    config
    stacksData
    constructor({config, stacks: stacksData}: {config: configT, stacks: aggulativeStacksT}) {
        console.log('CREATING MODEL');
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
        const newConfig = config
        ? keepUniqueValues({ config: config, overrideConfig: this.config })
        : keepUniqueValues({ config: this.config });
        // console.log('newConfig', newConfig);
        return { id: id || generateId(), config: newConfig}
    }
    clearEmptyStacks = () => {
        this.stacksData = this.stacksData.filter(s => s.length > 0);  
    }
}