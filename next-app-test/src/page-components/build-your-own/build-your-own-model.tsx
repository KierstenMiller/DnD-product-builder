import { getImage, matrixIndexI, matrixMock, pieceI } from "-/Components/DnD/workspace.util";
import { makeObservable, observable, action, computed} from "mobx"
import { configItemI, configT } from "./build-your-own.util";

// great article on data structure of matrix, include sort algo https://www.geeksforgeeks.org/introduction-to-matrix-or-grid-data-structure-and-algorithms-tutorial/

type matrixI = typeof matrixMock; // TODO: make type

export interface BuildYourOwnModelI {
    config: configT
    matrix: matrixI
}
class Piece {
    id
    config
    constructor({id, config}: pieceI) {
        this.id = id
        this.config = config
        makeObservable(this, {
            config: observable,
            image: computed,
            setConfig: action.bound,
        })
    }
    get image() {
        return getImage(this.config);
    }
    setConfig(config: configT) {
        this.config = config;
    }
}
export class BuildYourOwnModel {
    config
    matrix
    constructor({config, matrix}: BuildYourOwnModelI) {
        this.config = config;
        this.matrix = matrix.map(r => r.map(c => ({
            matrixIndex: c.matrixIndex,
             ...c.piece && { piece: new Piece(c.piece)}
        })));
        makeObservable(this, {
            config: observable,
            matrix: observable,
            configuredImage: computed,
            setConfig: action.bound,
            updateConfigItemSelection: action.bound,
            updateMatrixIndexPiece: action.bound,
        }) 
    }
    get configuredImage() {
        return getImage(this.config);
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    updateConfigItemSelection = ({id, selection: newSelection}: configItemI) => {
        const match = this.config.find(mod => mod.id === id);
        if (match) match.selection = newSelection
    };
    updateMatrixIndexPiece = (addIndex: matrixIndexI) => {
        const index = this.matrix[addIndex.row][addIndex.column];
        if(index.piece) index.piece.setConfig(this.config)
        else index['piece'] = new Piece({id:'addedPiece', config: [...this.config.map(c => (
            {...c} // removing observability
        ))]})
    }
}