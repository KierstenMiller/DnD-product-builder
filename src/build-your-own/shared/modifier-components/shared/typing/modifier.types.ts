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
  rank = 'rank',
  colorFamily = 'colorFamily'
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
