export enum OPTIONS {
    DIMENSION = "DIMENSION",
    STITCH = "STITCH",
    PRINT = "PRINT",
    COLORWAY = "COLORWAY",
    TEXTURE = "TEXTURE",
}

export interface rawData {
    options: {
        [OPTIONS.DIMENSION]: {label: string, selected: boolean }[],
        [OPTIONS.STITCH]: {label: string, selected: boolean }[],
        [OPTIONS.PRINT]: {label: string, selected: boolean }[],
        [OPTIONS.COLORWAY]: {label: string, selected: boolean }[],
        [OPTIONS.TEXTURE]: {label: string, selected: boolean }[],
    }
}