import { type modifiersT, type optionsT } from '-/page-components/build-your-own/build-your-own.types'
import { sortByValues, type groupByValues, type sortAlphaI, type sortNumI } from '-/page-components/build-your-own/shared/modifier-components/shared/typing/modifier.types'

/// ///////////////////////
//      GENERAL USE     //
/// ///////////////////////
// returns map, keys are grouping key and values are an array of items
const groupByMap = <T, K extends keyof any> (arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    const computedKey = key(item)
    const matchingValue = groups.get(computedKey)
    if (computedKey && !matchingValue) groups.set(computedKey, [item])
    else if (computedKey && Array.isArray(matchingValue)) matchingValue.push(item)
    else throw new Error('key computation failed')
    return groups
  }, new Map())
const sortAlpha = ({ toSort, sortBy }: sortAlphaI) => toSort.sort((a, b) => sortBy === sortByValues.ascending
  ? a.toLowerCase() < b.toLowerCase() ? -1 : 1
  : a.toLowerCase() < b.toLowerCase() ? 1 : -1
)
const sortNum = ({ toSort, sortBy }: sortNumI) => toSort.sort((a, b) => sortBy === sortByValues.ascending
  ? a - b
  : b - a
)
export const sortList = (toSort: any[], sortBy: sortByValues) => {
  if (toSort.every((i) => typeof i === 'number')) return sortNum({ toSort, sortBy })
  if (toSort.every((i) => typeof i === 'string')) return sortAlpha({ toSort, sortBy })
  console.warn('Could not perform sort')
}
/// ///////////////////////////
//      BUILD YOUR OWN      //
/// //////////////////////////
// using map to ensure stability sort order.
// BIG WHY:
// 1.) Objects are lexigraphically sorted, need control over order and don't want to layer in another array or ranked object
// 2.) Object.entries(someObject) converts numbers to strings, someMap.entries() keeps numbers as numbers (numbers and strings can't be sorted the same, so converting all numbers to strings is problematic)
export const assembleOptionsMap = (options: optionsT, groupBy?: groupByValues, sortBy?: sortByValues) => {
  const groupedMap = groupByMap(options, opt => {
    const [, value] = Object.entries(opt).find(([key]) => key === groupBy) ?? []
    // can group by boolean values, as well as string keys
    const groupLabel = typeof value === 'boolean' ? `${groupBy}-${value.toString()}` : value
    return groupLabel
  })
  return (!sortBy || sortBy === sortByValues.having)
    ? groupedMap
    : new Map((sortList([...groupedMap.keys()], sortBy) ?? []).map(key => [key, groupedMap.get(key)]))
}
export const assembleModifierMap = (modifiers: modifiersT, groupBy?: string, sortBy?: sortByValues) => {
  const groupedMap = groupByMap(modifiers, mod => {
    const [, value] = Object.entries(mod).find(([key]) => key === groupBy) ?? []
    // can group by boolean values, as well as string keys
    const groupLabel = typeof value === 'boolean' ? `${groupBy}: ${value.toString()}` : value
    return groupLabel
  })
  return (!sortBy || sortBy === sortByValues.having)
    ? groupedMap
    : new Map((sortList([...groupedMap.keys()], sortBy) ?? []).map(key => [key, groupedMap.get(key)]))
}
