import { shapeKeys } from "-/Components/DnD/workspace/freeformMatrix/freeformMatrix.util";

export const matrixMock = [
    [
        {
            matrixIndex: {row: 0, column: 0},
            piece: {
                id:'piece-1',
                config: [
                    { id: 'mod-shape', selection: `${shapeKeys.circle}`},
                    { id: 'mod-fill', selection: 'fill-red'},
                    { id: 'mod-stroke', selection: 'stroke-green'},
                ],
            }
        },
        {matrixIndex: {row: 0, column: 1}},
        {matrixIndex: {row: 0, column: 2}},
    ],
    [
        {
            matrixIndex: {row: 1, column: 0},
            piece: {
                id:'piece-2',
                config: [
                    { id: 'mod-shape', selection: `${shapeKeys.square}`},
                    { id: 'mod-fill', selection: 'fill-red'},
                    { id: 'mod-stroke', selection: 'stroke-green'},
                ],
            }
        },
        {matrixIndex: {row: 1, column: 1}},
        {matrixIndex: {row: 1, column: 2}},
    ],
    [
        {
            matrixIndex: {row: 2, column: 0},
            piece: {
                id:'piece-3',
                config: [
                    { id: 'mod-shape', selection: `${shapeKeys.star}`},
                    { id: 'mod-fill', selection: 'fill-red'},
                    { id: 'mod-stroke', selection: 'stroke-green'},
                ],
            }
        },
        {matrixIndex: {row: 2, column: 1}},
        {matrixIndex: {row: 2, column: 2}},
    ],
    [
        {
            matrixIndex: {row: 3, column: 0},
            piece: {
                id:'piece-4',
                config: [
                    { id: 'mod-shape', selection: `${shapeKeys.triangle}`},
                    { id: 'mod-fill', selection: 'fill-red'},
                    { id: 'mod-stroke', selection: 'stroke-green'},
                ],
            }
        },
        {matrixIndex: {row: 3, column: 1}},
        {matrixIndex: {row: 3, column: 2}},
    ],
];