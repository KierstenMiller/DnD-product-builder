
import { generateImage } from "-/Components/DnD/workspace/freeformMatrix/freeformMatrix.util";
import { builderMock1 } from "-/data/builderMatrix/builder.data";
import { makeObservable, observable, action} from "mobx"
import { builderT, configItemI, configT, matrixIndexCoordinatesI, matrixT, modifiersT, pieceI } from "./build-your-own.util";


class ColumnPiece {
    column
    piece
    constructor({column, piece}: {column: number, piece: pieceI}) {
        this.column = column;
        this.piece = piece;
    }
}

export class Builder {
    config
    builder
    constructor({config, builder}: {config: configT, builder: builderT}) {
        this.config = config
        this.builder = builder?.map(n => n.map(c => (new ColumnPiece({
            column: c.column,
            piece: c.piece,
        }))));
        makeObservable(this, {
            matrix: observable.ref, // using ref to give MatrixIndex and Piece control over what is observable
            config: observabl,
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