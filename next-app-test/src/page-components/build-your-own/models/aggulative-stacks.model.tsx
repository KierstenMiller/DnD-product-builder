import { makeAutoObservable, makeObservable, observable, computed, action } from "mobx"

import { modifierChunkKeyValues } from "-/Components/modifier/modifier.types";
import { aggulativeStacksListT, configT } from "../build-your-own.types";
import { addPieceToStack, addStack, clearEmptyStacks, findAndRemoveBlock, findPiece, generateId } from "-/Components/DnD/workspace/aggulativeStacks/builder.util";

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
export class AggulativeStacksBuildModel {
    config
    stacksData
    constructor({ config, stacks: stacksData }: { config: configT, stacks: aggulativeStacksListT }) {
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
                    this.config.map(c => c.modifierChunkKey === modifierChunkKeyValues.unique ? (b.piece.config.find(pC => pC.id === c.id) || c) : c)
            })
        })));
    }
    // util actions
    generatePiece = (id?: string, config?: configT) => {
        return { id: id || generateId(), config: config || this.config.map(c => c.modifierChunkKey === modifierChunkKeyValues.unique ? { ...c } : c) }
    }
    // setting actions
    setConfig = (newConfig: configT) => {
        this.config = newConfig;
    };
    // adding actions
    addStack = (stackIndex: number, pieceId?: string) => {
        const {piece} = pieceId ? findPiece(pieceId, this.stacksData) : {piece: null};
        this.stacksData = addStack(stackIndex, piece || this.generatePiece(), this.stacksData)
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