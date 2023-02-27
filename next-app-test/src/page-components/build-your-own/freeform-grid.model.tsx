import { generateImage } from "-/Components/DnD/workspace/freeformMatrix/freeformMatrix.util";
import { makeObservable, observable, action} from "mobx"

import { buildPiece } from "./build-your-own-model";
import { configT, matrixIndexCoordinatesI, matrixT, modifiersT, pieceI } from "./build-your-own.types";

class MatrixIndex {
    matrixIndex
    piece
    constructor({matrixIndex, piece}: {matrixIndex: matrixIndexCoordinatesI, piece?: pieceI}) {
        this.matrixIndex = matrixIndex;
        this.piece = piece ? new buildPiece(piece) : undefined;
        makeObservable(this, {
            piece: observable,
            setPiece: action.bound,
            removePiece: action.bound,
        })
    }
    setPiece = (piece: pieceI) => {
        this.piece = new buildPiece(piece);
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