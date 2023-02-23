import { generateImage } from "-/Components/DnD/workspace.util";
import { matrixMock } from "-/data/freeform-grid_shapes/matrix.data";
import { makeObservable, observable, action} from "mobx"
import { configItemI, configT, matrixIndexCoordinatesI, matrixT, modifiersT, pieceI } from "./build-your-own.util";

// great article on data structure of matrix, include sort algo https://www.geeksforgeeks.org/introduction-to-matrix-or-grid-data-structure-and-algorithms-tutorial/

type matrixI = typeof matrixMock; // TODO: make type
export interface BuildYourOwnModelI {
    config: configT
    matrix?: matrixI
}

class Piece {
    id
    config
    image
    constructor({id, config, image}: pieceI) {
        this.id = id
        this.config = config
        this.image = image
        makeObservable(this, {
            config: observable,
            image: observable.ref, // deep observable doesn't work well with JSX.Element
            setConfig: action.bound,
        })
    }
    setConfig(config: configT) {
        this.config = config;
    }
    setImage(image: JSX.Element) {
        this.image = image;
    }
}

class MatrixIndex {
    matrixIndex
    piece
    constructor({matrixIndex, piece}: {matrixIndex: matrixIndexCoordinatesI, piece?: pieceI}) {
        this.matrixIndex = matrixIndex;
        this.piece = piece ? new Piece(piece) : undefined;
        makeObservable(this, {
            piece: observable,
            setPiece: action.bound,
            removePiece: action.bound,
        })
    }
    setPiece = (piece: pieceI) => {
        this.piece = new Piece(piece);
    }
    removePiece = () => {
        this.piece = undefined;
    }
}

export class Matrix {
    config
    matrix
    constructor({config, matrix}: {config: configT, matrix: matrixT}) {
        this.config = config
        this.matrix = matrix?.map(r => r.map(c => (new MatrixIndex({
            matrixIndex: c.matrixIndex,
            piece: c.piece,
        }))));
        makeObservable(this, {
            matrix: observable.ref, // using ref to give MatrixIndex and Piece control over what is observable
            config: observable,
            setMatrixIndexPiece: action.bound,
            setMatrixIndexPieceImage: action.bound,
            swapPieces: action.bound,
            removeMatrixIndexPiece: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    setMatrixIndexPiece = (index: matrixIndexCoordinatesI, piece?: pieceI) => {
        const matrixIndex = this.matrix[index.row][index.column];
        const nonObservableConfigCopy = [...this.config.map(i => ({...i}))];
        matrixIndex.setPiece(piece || {id:'addedPiece', config: nonObservableConfigCopy});
    }
    setMatrixIndexPieceImage = (index:matrixIndexCoordinatesI, modifiers: modifiersT) => { // TODO: prevent model knowing about modifiers
        const matrixIndex = this.matrix[index.row][index.column];
        const image = generateImage([...this.config.map(i => ({...i}))], modifiers)
        image && matrixIndex.piece?.setImage(image);
    }
    swapPieces = (indexA: matrixIndexCoordinatesI, indexB: matrixIndexCoordinatesI) => {
        const pieceA = this.matrix[indexA.row][indexA.column].piece;
        const pieceB = this.matrix[indexB.row][indexB.column].piece
        pieceB ? this.setMatrixIndexPiece(indexA, pieceB) : this.removeMatrixIndexPiece(indexA);
        pieceA ? this.setMatrixIndexPiece(indexB, pieceA) : this.removeMatrixIndexPiece(indexB);
    }
    removeMatrixIndexPiece = (matrixIndex: matrixIndexCoordinatesI) => {
        this.matrix[matrixIndex.row][matrixIndex.column].removePiece();
    }
}

export class BuildYourOwnModel {
    config
    matrix
    constructor({config, matrix}: BuildYourOwnModelI) {
        this.config = config;
        // passing observable version of config
        this.matrix = matrix ? new Matrix({config: this.config, matrix}) : null;
        makeObservable(this, {
            config: observable,
            matrix: observable.ref, // using ref to give MatrixIndex and Piece control over what is observable
            setConfig: action.bound,
            updateConfigSelection: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    updateConfigSelection = ({id, selection: newSelection}: configItemI) => {
        const match = this.config.find(mod => mod.id === id);
        if (match) match.selection = newSelection
        this.matrix?.setConfig(this.config);
    }
}