import { observer } from 'mobx-react-lite'
import { useDrag, useDrop } from 'react-dnd'
import { DropZone, matrixIndexI } from './dropZone'

// great article on data structure of matrix, include sort algo https://www.geeksforgeeks.org/introduction-to-matrix-or-grid-data-structure-and-algorithms-tutorial/

export enum DnDItemTypes {
    ITEM = "item",
}

const icons = {
    heart: "https://img.icons8.com/office/256/hearts.png",
    reading: "https://img.icons8.com/ios-filled/256/reading.png", 
}

// move to mock api data, make configurable to different grid sizes
// also make it so that values can be pre-populated
const matrixMock = [
    [
        {matrixIndex: {row: 0, column: 0}, piece: {id:'piece-1', imageUrl: icons.heart}},
        {matrixIndex: {row: 0, column: 1}},
        {matrixIndex: {row: 0, column: 2}},
    ],
    [
        {matrixIndex: {row: 1, column: 0}},
        {matrixIndex: {row: 1, column: 1}},
        {matrixIndex: {row: 1, column: 2}},
    ],
    [
        {matrixIndex: {row: 2, column: 0}},
        {matrixIndex: {row: 2, column: 1}},
        {matrixIndex: {row: 2, column: 2}},
    ],
    [
        {matrixIndex: {row: 3, column: 0}},
        {matrixIndex: {row: 3, column: 1}},
        {matrixIndex: {row: 3, column: 2}},
    ],
];

const addToMatrix = ({matrix, addIndex, piece}: {matrix: typeof matrixMock, addIndex: matrixIndexI, piece: any}) => {
    matrix[addIndex.row][addIndex.column].piece = piece;
}

export const Workspace = observer(() => {
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
                    piece: {id:"newPiece", imageUrl: icons.reading}
                })}
            />)}
        </div>)}
    </div>)
})
