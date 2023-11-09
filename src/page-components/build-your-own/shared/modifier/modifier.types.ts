export interface sortNumI {
  toSort: number[]
  sortBy: sortByValues
}
export interface sortAlphaI {
  toSort: string[]
  sortBy: sortByValues
}
export enum modifierChunkKeyValues {
  unique = 'unique',
  global = 'global'
}
export enum validationValues {
  maxStackHeight = 'max-stack-height',
  maxStacksCount = 'max-stacks-count',
  position = 'position',
  proximity = 'proximity',
  has = 'has',
  hasAll = 'has-all',
}
export enum groupByValues {
  height = 'height',
  width = 'width',
  depth = 'depth',
  stocked = 'stocked',
  price = 'price',
  rank = 'rank'
}
export enum sortByValues {
  ascending = 'ascending',
  descending = 'descending',
  having = 'having' // has condition first , everything else afterward
}
export enum measurementValues {
  inches = 'inches',
  feet = 'feet',
  meters = 'meters',
}
// ui view keys
export enum adderDisplayValues {
  imageFirst = 'add-image-first',
  card = 'add-card'
}
export enum radioDisplayValues {
  card = 'radio-card',
  titled = 'radio-titled',
  imageFirst = 'radio-image-first'
}

export enum filterDisplayValues {
  dropDown = 'drop-down',
  pills = 'pills',
  tabbed = 'tabbed',
}

export type displayValuesT = radioDisplayValues | adderDisplayValues
