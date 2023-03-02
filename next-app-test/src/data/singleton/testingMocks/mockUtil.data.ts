export interface sortNumI {
    toSort: number[],
    sortBy: sortByValues,
}
export interface sortAlphaI {
    toSort: string[],
    sortBy: sortByValues,
}
export enum groupByValues {
    height = "height",
    width = "width",
    depth = "depth",
    stocked = "stocked",
    price = "price",
} 
export enum sortByValues {
    ascending = "ascending",
    descending = "descending",
    having = "having" // has condition first , everything else afterward
}
export enum measurementValues {
    inches = "inches",
    feet = "feet",
    meters = "meters",
}
// ui view keys
export enum displayValues {
    // radio displays
    card = "card",
    titled = "titled",
    imageFirst = "image-first",
    // adder displays
    standard = "adder"
}
export enum filterDisplayValues {
    dropDown = "drop-down",
    pills = "pills",
    tabbed = "tabbed",
}

