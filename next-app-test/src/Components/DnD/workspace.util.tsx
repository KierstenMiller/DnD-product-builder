export interface matrixIndexI {
    row: number,
    column: number,
}

export interface pieceI {id: string, image: JSX.Element;}

export interface iconColoringI {
    fill: colors,
    stroke: colors,
}

export enum shapeIds {
    circle= 'circle',
    square= 'square',
    star= 'star',
    triangle= 'triangle',
}

 export const icons = {
    [shapeIds.circle]: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <circle style={{fill: fill, stroke: stroke}} cx="38.05" cy="38.05" r="28"/>
    </svg>,
    [shapeIds.square]: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <rect style={{fill: fill, stroke: stroke}} x="10.05" y="10.05" width="56" height="56"/>
    </svg>,
    [shapeIds.star]: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <polygon style={{fill: fill, stroke: stroke}} points="38.05 10.05 45 31.44 67.5 31.44 49.3 44.66 56.25 66.05 38.05 52.83 19.86 66.05 26.81 44.66 8.61 31.44 31.1 31.44 38.05 10.05"/>
    </svg>,
    [shapeIds.triangle]: ({fill, stroke}: iconColoringI) => <svg height={40} width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.11 76.11">
        <polygon style={{fill: fill, stroke: stroke}} points="38.05 10.05 54.22 38.05 70.39 66.05 38.05 66.05 5.72 66.05 21.89 38.05 38.05 10.05"/>
    </svg>
}

export enum DnDItemTypes {
    ITEM = "item",
}

export enum colors {
    red = '#ff0000',
    blue ='#0000ff',
    green = '#00ff00',
}

// move to mock api data, make configurable to different grid sizes
// also make it so that values can be pre-populated
export const matrixMock = [
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