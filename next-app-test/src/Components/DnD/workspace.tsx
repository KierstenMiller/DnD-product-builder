import { observer } from 'mobx-react-lite'
import { useDrag, useDrop } from 'react-dnd'
import { DropZone, matrixIndexI, pieceI } from './dropZone'

// great article on data structure of matrix, include sort algo https://www.geeksforgeeks.org/introduction-to-matrix-or-grid-data-structure-and-algorithms-tutorial/

export enum DnDItemTypes {
    ITEM = "item",
}

enum colors {
    red = '#ff0000',
    blue ='#0000ff',
    green = '#00ff00',
}

interface iconColoringI {
    fill: colors,
    stroke: colors,
}

const icons = {
    circle: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <circle style={{fill: fill, stroke: stroke}} cx="38.05" cy="38.05" r="28"/>
    </svg>,
    square: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <rect style={{fill: fill, stroke: stroke}} x="10.05" y="10.05" width="56" height="56"/>
    </svg>,
    star: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <polygon style={{fill: fill, stroke: stroke}} points="38.05 10.05 45 31.44 67.5 31.44 49.3 44.66 56.25 66.05 38.05 52.83 19.86 66.05 26.81 44.66 8.61 31.44 31.1 31.44 38.05 10.05"/>
    </svg>,
    triangle: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <polygon style={{fill: fill, stroke: stroke}} points="38.05 10.05 54.22 38.05 70.39 66.05 38.05 66.05 5.72 66.05 21.89 38.05 38.05 10.05"/>
    </svg>
}

// move to mock api data, make configurable to different grid sizes
// also make it so that values can be pre-populated
const matrixMock = [
    [
        {matrixIndex: {row: 0, column: 0}, piece: {id:'piece-1', image: icons.circle({fill: colors.red, stroke: colors.green})}},
        {matrixIndex: {row: 0, column: 1}},
        {matrixIndex: {row: 0, column: 2}},
    ],
    [
        {matrixIndex: {row: 1, column: 0}, piece: {id:'piece-2', image: icons.square({fill: colors.green, stroke: colors.red})}},
        {matrixIndex: {row: 1, column: 1}},
        {matrixIndex: {row: 1, column: 2}},
    ],
    [
        {matrixIndex: {row: 2, column: 0}, piece: {id:'piece-3', image: icons.star({fill: colors.red, stroke: colors.blue})}},
        {matrixIndex: {row: 2, column: 1}},
        {matrixIndex: {row: 2, column: 2}},
    ],
    [
        {matrixIndex: {row: 3, column: 0}, piece: {id:'piece-4', image: icons.triangle({fill: colors.blue, stroke: colors.red})}},
        {matrixIndex: {row: 3, column: 1}},
        {matrixIndex: {row: 3, column: 2}},
    ],
];

const addToMatrix = ({matrix, addIndex, piece}: {matrix: typeof matrixMock, addIndex: matrixIndexI, piece: pieceI}) => {
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
                    piece: {id:"newPiece", image: icons.circle({fill: colors.red, stroke: colors.blue})}
                })}
            />)}
        </div>)}
    </div>)
})
