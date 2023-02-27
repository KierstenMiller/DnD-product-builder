import { makeObservable, observable, action} from "mobx"

import { buildPiece } from "./build-your-own-model";
import { configT, matrixIndexCoordinatesI, matrixT, pieceI } from "./build-your-own.types";

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
            setConfig: action.bound,
            setMatrixIndexPiece: action.bound,
            swapPieces: action.bound,
            removeMatrixIndexPiece: action.bound,
        }) 
    }
    setConfig = (newConfig: configT) => this.config = newConfig;
    setMatrixIndexPiece = ({matrixIndex, piece, image}: {matrixIndex: matrixIndexCoordinatesI, piece?: pieceI, image?: JSX.Element}) => {
        console.log('PASSING:', {matrixIndex, piece, image});
        const index = this.matrix[matrixIndex.row][matrixIndex.column];
        const nonObservableConfigCopy = [...this.config.map(i => ({...i}))];
        const newPiece = piece || {id:'addedPiece', config: nonObservableConfigCopy}
        console.log('newPiece', newPiece);
        index.setPiece(newPiece);
        image && index.piece?.setImage(image);
    }
    swapPieces = (indexA: matrixIndexCoordinatesI, indexB: matrixIndexCoordinatesI) => {
        const pieceA = this.matrix[indexA.row][indexA.column].piece;
        const pieceB = this.matrix[indexB.row][indexB.column].piece
        pieceB ? this.setMatrixIndexPiece({matrixIndex: indexA, piece: pieceB}) : this.removeMatrixIndexPiece(indexA);
        pieceA ? this.setMatrixIndexPiece({matrixIndex: indexB, piece: pieceA}) : this.removeMatrixIndexPiece(indexB);
    }
    removeMatrixIndexPiece = (matrixIndex: matrixIndexCoordinatesI) => {
        this.matrix[matrixIndex.row][matrixIndex.column].removePiece();
    }
}