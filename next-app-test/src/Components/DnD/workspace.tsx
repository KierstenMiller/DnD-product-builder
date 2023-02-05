import { observer } from 'mobx-react-lite'
import { useDrop } from 'react-dnd'
import { DropZone } from './dropZone'
import { colors, DnDItemTypes, icons, matrixIndexI, matrixMock, pieceI } from './workspace.util';

// great article on data structure of matrix, include sort algo https://www.geeksforgeeks.org/introduction-to-matrix-or-grid-data-structure-and-algorithms-tutorial/
const addToMatrix = ({matrix, addIndex, piece}: {matrix: typeof matrixMock, addIndex: matrixIndexI, piece: pieceI}) => {
    matrix[addIndex.row][addIndex.column].piece = piece;
}

export const Workspace = observer(({dropImage}: {dropImage: JSX.Element}) => {
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: DnDItemTypes.ITEM,
            //   canDrop: () => game.canMoveKnight(x, y),
            //   drop: () => game.moveKnight(x, y),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [],
    )
    return (<div className="flex">
        {/* TODO: make a index that isn't from the iterator index */}
        {matrixMock.map((r, i) => <div key={i}>
            {r.map(c => <DropZone
                key={`${c.matrixIndex.row}-${c.matrixIndex.column}`}
                piece={c.piece}
                matrixIndex={c.matrixIndex}
                onDrop={(matrixIndex) => addToMatrix({
                    matrix: matrixMock,
                    addIndex: matrixIndex,
                    piece: {id:"newPiece", image: dropImage}
                })}
            />)}
        </div>)}
    </div>)
})
