import { makeAutoObservable, makeObservable, observable, computed, action } from "mobx"

import { groupKeyValues, validationValues } from "-/Components/modifier/modifier.types";
import { aggulativeStacksT, configT, pieceI, stackI, validationT } from "./build-your-own.types";
import { isNum } from "-/util/helpers";

/////////////////////////////// UTIL
const generateId = () => 'id' + (new Date()).getTime();
const findIndex2D = (stacks: aggulativeStacksT, id: string) => {
    let block = -1;
    const stack = stacks.findIndex(s => {
        block = s.findIndex(b => b.piece.id === id)
        return block >= 0;
    })
    return stack >= 0 ? { stack, block } : null;
}
export const findPiece = (id: string, stacksData: aggulativeStacksT) => {
    const index = findIndex2D(stacksData, id);
    const piece = (index && isNum(index.stack) && isNum(index.block)) ? (stacksData[index.stack][index.block])?.piece : null;
    return { index, piece }; 
}
/////////////////////////////// GHOST
const findAndRemoveBlock = (id: string, stacksData: aggulativeStacksT) => {
    const {index, piece} = findPiece(id, stacksData);
    if (index) stacksData[index.stack].splice(index.block, 1); // SLPICE EDITS ORIGINAL ARRAY
    return piece;
}
const clearEmptyStacks = (stacksData: aggulativeStacksT) => {
    return stacksData.filter(s => s.length > 0);
}
export const addPieceToStack = (stackIndex: number, blockIndex: number, piece: pieceI, stacksData: aggulativeStacksT) => {
    console.log(`adding ${piece.id} to stack ${stackIndex} - block ${blockIndex}`);
    findAndRemoveBlock(piece.id, stacksData);
    console.log('removed', stacksData);
    stacksData[stackIndex].splice(blockIndex, 0, { piece }); // SLPICE EDITS ORIGINAL ARRAY
    console.log('added', stacksData);
    return clearEmptyStacks(stacksData);
};

/////////////////////////////// VALIDATION
const withinRange = ({dropPosition, proximity, values, stack}: {dropPosition: number, proximity: number, values: string[], stack: stackI}) => {
    const inRange = stack
    .slice(dropPosition - proximity, dropPosition + proximity)
    .some(b => values.some(v => v === b.piece.id))
    console.log('INRANGE result:', inRange);
    return inRange;
};
const validLevel = (blockIndex: number, values: string []) => {
    const result = Boolean(values.find(v => `level-${blockIndex}` === v))
    console.log('VALIDLEVEL result:', result);
    return result;
};
const hasValue = () => true;
const hasAllValues = () => true;
export const validDrop = (dropPosition: number, validation: validationT, stack: stackI) => {
    const isValid = validation.every(v => {
        switch (v.type) {
            case validationValues.proximity:
                return withinRange({
                    dropPosition,
                    proximity: v.proximity || stack.length,
                    values: v.values,
                    stack: stack
                });
            case validationValues.position:
                return validLevel(dropPosition, v.values);
            case validationValues.has:
                return hasValue();
            case validationValues.hasAll:
                return hasAllValues();
            default: console.error(`Validation type ${v.type} does not exist`); return true;
        }
    })
    return isValid
}

class Piece {
    id
    config
    constructor({ id, config }: { id: string, config: configT }) {
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
        return this.stacksData.map(s => s.map(b => ({
            ...b,
            piece: new Piece({
                id: b.piece.id,
                config:
                    this.config.map(c => c.groupKey === groupKeyValues.unique ? (b.piece.config.find(pC => pC.id === c.id) || c) : c)
            })
        })));
    }
    // util actions
    findPiece = (id: string) => {
        const i = findIndex2D(this.stacksData, id);
        const piece = (i && isNum(i.stack) && isNum(i.block)) ? (this.stacksData[i.stack][i.block])?.piece : null;
        return piece;
    }
    generatePiece = (id?: string, config?: configT) => {
        return { id: id || generateId(), config: config || this.config.map(c => c.groupKey === groupKeyValues.unique ? { ...c } : c) }
    }
    // setting actions
    setConfig = (newConfig: configT) => {
        this.config = newConfig;
    };
    // adding actions
    isValidDrop = (dropPosition: { stack: number, block: number }, validation: validationT) => {
        return validDrop(dropPosition.block, validation, this.stacks[dropPosition.block])
    }
    addStack = (stackIndex: number, pieceId?: string) => {
        const piece = pieceId ? this.findAndRemoveBlock(pieceId) : null;
        this.stacksData.splice(stackIndex, 0, [{ piece: piece || this.generatePiece() }]);
        this.clearEmptyStacks();
    };
    addToStack = (stackIndex: number, blockIndex: number, pieceId?: string) => {
        const {piece} = pieceId ? findPiece(pieceId, this.stacksData) : {piece: null};
        this.stacksData = addPieceToStack(stackIndex, blockIndex, piece || this.generatePiece(), this.stacksData);
    };
    // removal actions
    findAndRemoveBlock = (id: string) => {
        return findAndRemoveBlock(id, this.stacksData);
    }
    clearEmptyStacks = () => {
        this.stacksData = clearEmptyStacks(this.stacksData);
    }
    clearWorkspace = () => {
        this.stacksData = [];
    }
}