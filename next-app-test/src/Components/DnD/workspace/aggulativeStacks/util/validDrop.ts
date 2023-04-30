import { validationValues } from "-/Components/modifier/modifier.types";
import { aggulativeStacksListT, stackI } from "-/page-components/build-your-own/build-your-own.types";

const withinRange = ({blockIndex, proximity, values, stack}: {blockIndex: number, proximity: number, values: string[], stack: stackI}) => {
    // NOTE: adding +1 to last slice param as .slice() is not inclusive
    if (!stack || stack.length === 0) return false;
    return stack.slice(blockIndex - proximity, blockIndex + proximity + 1).some(b => values.some(v => b.piece.config.some(c => v === c.value)));
};
const validLevel = ({blockIndex, values}: {blockIndex: number, values: string []}) => Boolean(values.find(v => `level-${blockIndex}` === v));
const hasValue = () => true; // TODO: implement
const hasAllValues = () => true; // TODO implement
const belowMaxHeight = ({values, stack}: {values: string[], stack: stackI}) =>  {
    const max = Number(values[0]); // TODO: should only be one value. Maybe rethink how I define this?
    if (!max || !stack) return true;
    return stack.length < max;
};
const belowMaxCount = ({values, stacks}: {values: string[], stacks: aggulativeStacksListT}) =>  {
    const max = Number(values[0]); // TODO: should only be one value. Maybe rethink how I define this?
    if (!max || !stacks) return true;
    return stacks.length < max;
};
export const validDrop = ({blockIndex, validation, stack, stacks, creatingNewStackOnDrop}:{blockIndex: number, validation: validationT, stack: stackI, stacks?: aggulativeStacksListT, creatingNewStackOnDrop?: boolean}) => {
    return validation.every(v => {
        let result;
        switch (v.type) {
            case validationValues.maxStackHeight:
                result = belowMaxHeight({values: v.values, stack});
                break;
            case validationValues.maxStacksCount:
                if (!creatingNewStackOnDrop || !stacks) return true;
                result = belowMaxCount({values: v.values, stacks});
                break;
            case validationValues.proximity:
                result = withinRange({
                    blockIndex,
                    proximity: v.proximity || stack.length,
                    values: v.values,
                    stack: stack
                });
                break;
            case validationValues.position:
                result = validLevel({blockIndex, values: v.values});
                break;
            case validationValues.has:
                result = hasValue();
                break; 
            case validationValues.hasAll:
                result = hasAllValues();
                break;
            default:
                console.error(`Validation type ${v.type} does not exist`);
                result = true;
        }
        return result;
    });
}