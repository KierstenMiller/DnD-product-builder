import { validationValues } from "-/page-components/build-your-own/shared/modifier/modifier.types";
import { aggulativeStacksListT, stackI, validationT } from "-/page-components/build-your-own/build-your-own.types";

interface withinRangeI { blockIndex: number, proximity: number, stack: stackI, values: string[], }
interface validLevelI { blockIndex: number, values: string[] }
interface hasValueI { stack: stackI, values: string[] }
interface hasAllValuesI { stack: stackI, values: string[] }
interface belowMaxHeightI { stack: stackI, values: string[], }
interface belowMaxCount { stacks: aggulativeStacksListT, values: string[] }
interface validDropI { blockIndex: number, validation: validationT, stack: stackI, stacks?: aggulativeStacksListT, creatingNewStackOnDrop?: boolean }

const withinRange = ({ blockIndex, proximity, stack, values }: withinRangeI) => {
    // NOTE: adding +1 to last slice param as .slice() is not inclusive
    if (!stack || stack.length === 0) return false;
    return hasValue({ stack: stack.slice(blockIndex - proximity, blockIndex + proximity + 1), values });
};
const validLevel = ({ blockIndex, values }: validLevelI) => {
    return Boolean(values.find(v => `level-${blockIndex}` === v));
};
const hasValue = ({ stack, values }: hasValueI) => {
    if (!stack) return false;
    return stack.some(b => values.some(v => b.piece.config.some(c => v === c.value)))
};
const hasAllValues = ({ stack, values }: hasAllValuesI) => {
    if (!stack) return false;
    return values.every(v => stack.some(b => b.piece.config.some(c => v === c.value)))
};
const belowMaxHeight = ({ stack, values, }: belowMaxHeightI) => {
    const max = Number(values[0]); // NOTE: should only have one value for this validation type
    if (!max || !stack) return true;
    return stack.length < max;
};
const belowMaxCount = ({ stacks, values, }: belowMaxCount) => {
    const max = Number(values[0]); // NOTE: should only have one value for this validation type
    if (!max || !stacks) return true;
    return stacks.length < max;
};
export const validDrop = ({ blockIndex, validation, stack, stacks, creatingNewStackOnDrop }: validDropI) => {
    return validation.every(v => {
        let result;
        switch (v.type) {
            case validationValues.maxStackHeight:
                result = belowMaxHeight({ values: v.values, stack });
                break;
            case validationValues.maxStacksCount:
                if (!creatingNewStackOnDrop || !stacks) return true;
                result = belowMaxCount({ values: v.values, stacks });
                break;
            case validationValues.proximity:
                result = withinRange({ blockIndex, proximity: v.proximity || stack.length, values: v.values, stack: stack });
                break;
            case validationValues.position:
                result = validLevel({ blockIndex, values: v.values });
                break;
            case validationValues.has:
                result = hasValue({ stack, values: v.values });
                break;
            case validationValues.hasAll:
                result = hasAllValues({ stack, values: v.values });
                break;
            default:
                console.error(`Validation type ${v.type} does not exist`);
                result = false;
        }
        return result;
    });
}