import { makeAutoObservable, makeObservable, observable, computed, action } from "mobx"

import { groupKeyValues, validationValues } from "-/Components/modifier/modifier.types";
import { aggulativeStacksT, aggulativeStackIndexI, configT, pieceI, stackI, validationT } from "./build-your-own.types";
import { isNum } from "-/util/helpers";
import { addPieceToStack, clearEmptyStacks, findAndRemoveBlock, findIndex2D, findPiece, generateId, validDrop } from "-/Components/DnD/workspace/aggulativeStacks/builder.util";

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
    generatePiece = (id?: string, config?: configT) => {
        return { id: id || generateId(), config: config || this.config.map(c => c.groupKey === groupKeyValues.unique ? { ...c } : c) }
    }
    // setting actions
    setConfig = (newConfig: configT) => {
        this.config = newConfig;
    };
    // adding actions
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