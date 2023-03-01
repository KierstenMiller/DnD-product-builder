import { groupByValues, sortAlphaI, sortByValues, sortNumI } from '-/Components/modifier/modifier.types';
import { optionsT } from '-/page-components/build-your-own/build-your-own.types';

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

const groupByMap = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    const keyThing = key(item);
    const valueThing = groups.get(keyThing);
    if(keyThing && !valueThing) groups.set(keyThing, [item]);
    else if(keyThing && Array.isArray(valueThing)) valueThing.push(item);
    return groups;
}, new Map());
const sortAlpha = ({toSort, sortBy}: sortAlphaI) => toSort.sort((a, b) =>  sortBy === sortByValues.ascending
    ? a.toLowerCase() < b.toLowerCase() ? -1 : 1
    : a.toLowerCase() < b.toLowerCase() ? 1 : -1
)
const sortNum = ({toSort, sortBy}: sortNumI) => toSort.sort((a, b) => sortBy === sortByValues.ascending
    ? a - b
    : b - a
);
const sortList = (toSort: any[], sortBy: sortByValues) => {
    // TODO: add sort by 'having'
    if (toSort.every((i) =>  typeof i === "number")) return sortNum({toSort, sortBy});
    if (toSort.every((i) =>  typeof i === "string")) return sortAlpha({toSort, sortBy});
    console.warn('Could not perform sort');
}
// using map to ensure stability of key order. BIG WHY:Object.entries(someObject) converts numbers to strings, someMap.entries() keeps numbers as numbers (numbers and strings can't be sorted the same, so converting all numbers to strings is problematic)
export const assembleOptionsMap = (options: optionsT, groupBy?: groupByValues , sortBy?: sortByValues) => {
    const groupedMap = groupByMap(options, opt => { 
        const [, value] = Object.entries(opt).find(([key,]) => key === groupBy) || [];
        const groupLabel = typeof value === "boolean" ? `${groupBy}: ${value.toString()}`: value
        return groupLabel;
    }); 
    return (!sortBy || sortBy === sortByValues.having)
    ? groupedMap
    : new Map((sortList([...groupedMap.keys()], sortBy) || []).map( key => [key, groupedMap.get(key)]))
}