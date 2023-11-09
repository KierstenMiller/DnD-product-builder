import { action, makeObservable, observable } from 'mobx'

import { type configT, type matrixIndexCoordinatesI, type matrixT, type pieceI } from '-/page-components/build-your-own/build-your-own.types'
import { BuildPiece } from '-/page-components/build-your-own/shared/standard.model'

class MatrixIndex {
  matrixIndex
  piece
  constructor({ matrixIndex, piece }: { matrixIndex: matrixIndexCoordinatesI, piece?: pieceI }) {
    this.matrixIndex = matrixIndex
    this.piece = piece ? new BuildPiece(piece) : undefined
    makeObservable(this, {
      piece: observable,
      setPiece: action.bound,
      removePiece: action.bound
    })
  }

  setPiece = (piece: pieceI) => {
    this.piece = new BuildPiece(piece)
  }

  removePiece = () => {
    this.piece = undefined
  }
}
export class FreeformMatrixBuildModel {
  config
  matrix
  constructor({ config, matrix }: { config: configT, matrix: matrixT }) {
    this.config = config
    this.matrix = matrix?.map(r => r.map(c => (new MatrixIndex({
      matrixIndex: c.matrixIndex,
      piece: c.piece
    }))))
    makeObservable(this, {
      matrix: observable.ref, // using ref to give MatrixIndex and Piece control over what is observable
      config: observable,
      setConfig: action.bound,
      setMatrixIndexPiece: action.bound,
      swapPieces: action.bound,
      removeMatrixIndexPiece: action.bound
    })
  }

  setConfig = (newConfig: configT) => { this.config = newConfig }
  setMatrixIndexPiece = ({ matrixIndex, piece, image }: { matrixIndex: matrixIndexCoordinatesI, piece?: pieceI, image?: JSX.Element }) => {
    const index = this.matrix[matrixIndex.row][matrixIndex.column]
    const nonObservableConfigCopy = [...this.config.map(i => ({ ...i }))]
    const newPiece = piece ?? { id: 'addedPiece', config: nonObservableConfigCopy }
    index.setPiece(newPiece)
  }

  swapPieces = (indexA: matrixIndexCoordinatesI, indexB: matrixIndexCoordinatesI) => {
    const pieceA = this.matrix[indexA.row][indexA.column].piece
    const pieceB = this.matrix[indexB.row][indexB.column].piece
    pieceB ? this.setMatrixIndexPiece({ matrixIndex: indexA, piece: pieceB }) : this.removeMatrixIndexPiece(indexA)
    pieceA ? this.setMatrixIndexPiece({ matrixIndex: indexB, piece: pieceA }) : this.removeMatrixIndexPiece(indexB)
  }

  removeMatrixIndexPiece = (matrixIndex: matrixIndexCoordinatesI) => {
    this.matrix[matrixIndex.row][matrixIndex.column].removePiece()
  }

  clearWorkspace = () => {
    this.matrix = []
  }
}
