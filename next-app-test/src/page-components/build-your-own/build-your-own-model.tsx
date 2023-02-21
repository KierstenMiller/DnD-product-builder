import { generateImage, matrixIndexI, matrixMock, pieceI } from "-/Components/DnD/workspace.util";
import { makeObservable, observable, action} from "mobx"
import { configItemI, configT, modifiersT } from "./build-your-own.util";

// great article on data structure of matrix, include sort algo https://www.geeksforgeeks.org/introduction-to-matrix-or-grid-data-structure-and-algorithms-tutorial/

type matrixI = typeof matrixMock; // TODO: make type
export interface BuildYourOwnModelI {
    config: configT
    matrix: matrixI
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
    constructor({matrixIndex, piece}: {matrixIndex: matrixIndexI, piece?: pieceI}) {
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

export class BuildYourOwnModel {
    config
    matrix
    constructor({config, matrix}: BuildYourOwnModelI) {
        this.config = config;
        this.matrix = matrix.map(r => r.map(c => (new MatrixIndex({
            matrixIndex: c.matrixIndex,
            piece: c.piece,
        }))));
        makeObservable(this, {
            config: observable,
            matrix: observable.ref, // using ref to give MatrixIndex and Piece control over what is observable
            setConfig: action.bound,
            updateConfigSelection: action.bound,
            setMatrixIndexPiece: action.bound,
            removeMatrixIndexPiece: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    updateConfigSelection = ({id, selection: newSelection}: configItemI) => {
        const match = this.config.find(mod => mod.id === id);
        if (match) match.selection = newSelection
    }
    setMatrixIndexPiece = (index: matrixIndexI, piece?: pieceI) => {
        const matrixIndex = this.matrix[index.row][index.column];
        const nonObservableConfigCopy = [...this.config.map(i => ({...i}))];
        matrixIndex.setPiece(piece || {id:'addedPiece', config: nonObservableConfigCopy});
    }
    setMatrixIndexPieceImage = (index:matrixIndexI, modifiers: modifiersT) => { // TODO: prevent model knowing about modifiers
        const matrixIndex = this.matrix[index.row][index.column];
        const image = generateImage([...this.config.map(i => ({...i}))], modifiers)
        image && matrixIndex.piece?.setImage(image);
    }
    swapPieces = (indexA: matrixIndexI, indexB: matrixIndexI) => {
        const pieceA = this.matrix[indexA.row][indexA.column].piece;
        const pieceB = this.matrix[indexB.row][indexB.column].piece
        pieceB ? this.setMatrixIndexPiece(indexA, pieceB) : this.removeMatrixIndexPiece(indexA);
        pieceA ? this.setMatrixIndexPiece(indexB, pieceA) : this.removeMatrixIndexPiece(indexB);
    }
    removeMatrixIndexPiece = (matrixIndex: matrixIndexI) => {
        this.matrix[matrixIndex.row][matrixIndex.column].removePiece();
    }
}