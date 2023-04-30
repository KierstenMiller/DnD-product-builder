import { validationValues } from "-/Components/modifier/modifier.types";
import { aggulativeStackIndexI, aggulativeStacksListT, globalRulesI, pieceI, stackI, validationLibraryT, validationT } from "-/page-components/build-your-own/build-your-own.types";
import { addPieceToStack, addStack } from "../builder.util";

interface validateWorkspace {
    dropPosition: aggulativeStackIndexI,
    creatingNewStackOnDrop: boolean,
    piece: pieceI,
    globalValidation: globalRulesI,
    validationLibrary: validationLibraryT,
    stacks: aggulativeStacksListT
}

const withinRange = ({blockIndex, proximity, values, stack}: {blockIndex: number, proximity: number, values: string[], stack: stackI}) => {
    // NOTE: adding +1 to last slice param as .slice() is not inclusive
    if (!stack || stack.length === 0) return false;
    return stack.slice(blockIndex - proximity, blockIndex + proximity + 1).some(b => values.some(v => b.piece.config.some(c => v === c.value)));
};
const validLevel = (blockIndex: number, values: string []) => Boolean(values.find(v => `level-${blockIndex}` === v));
const hasValue = () => true; // TODO: implement
const hasAllValues = () => true; // TODO implement
const belowMaxHeight = ({values, stack}: {values: string[], stack: stackI}) =>  {
    const max = Number(values[0]); // TODO: should only be one value. Maybe rethink how I define this?
    if (!max || !stack) return true;
    return stack.length < max;
};
const belowMaxCount = ({values, stacks}: {values: string[], stacks:aggulativeStacksListT}) =>  {
    const max = Number(values[0]); // TODO: should only be one value. Maybe rethink how I define this?
    if (!max || !stacks) return true;
    return stacks.length < max;
};
const validDrop = (blockIndex: number, validation: validationT, stack: stackI, stacks?: aggulativeStacksListT, creatingNewStackOnDrop?: boolean) => {
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
                result = validLevel(blockIndex, v.values);
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
const isValidStack = (validationLibrary: validationLibraryT, stack: stackI) => {
    const stackValidation = stack.map((b, index) => ({index, pieceValidation: getValidation(validationLibrary, b.piece)}))
    return stackValidation.map(r => (validDrop(r.index, r.pieceValidation, stack))).every(r => r);
}
const getValidation = (validationLibrary: validationLibraryT, piece: pieceI) => {
    if(validationLibrary.length <= 0) return [];
    return validationLibrary.map(modLevel => {
        const options = piece?.config?.filter(c => c.id === modLevel.id);
        return modLevel.validation.filter(v => options?.some(o => o.selection === v.id));
    })[0][0]?.validation;
} 
// TODO: change to object being passed for all args
const allStacksRemainValid = (stacks: aggulativeStacksListT, draggingPiece: pieceI, dropPosition: aggulativeStackIndexI, validationLibrary: validationLibraryT, creatingNewStackOnDrop: boolean) => {
    const simulatedStacks = stacks.map(s => s.map(b => ({piece: {...b.piece, config: b.piece.config.map(c => ({...c}))}}))).slice(); // MAKE NON-OBSERVABLE COPY
    const simulatedPiece = {...draggingPiece, config: draggingPiece.config.map(c => ({...c}))};
    const newSimulatedStacks = creatingNewStackOnDrop
    ? addStack(dropPosition.stack, simulatedPiece, simulatedStacks)
    : addPieceToStack(dropPosition.stack, dropPosition.block, simulatedPiece, simulatedStacks)
    return newSimulatedStacks.map(s => isValidStack(validationLibrary, s)).every(s => s);
}
export const validateWorkspace = ({dropPosition, creatingNewStackOnDrop, piece, globalValidation, validationLibrary, stacks}: validateWorkspace) => {
    // validForPiece is true if the current draggingPiece is added to a position ([stack][block]) that is valid for it's validation criteria
    // validForStack is true if all other pieces in the stack are still valid after *hypothetically* adding the current draggingPiece to the stack
    if (stacks?.length === 0) return false;
    const validGlobal = validDrop(dropPosition.block, globalValidation, stacks[dropPosition.stack], stacks, creatingNewStackOnDrop);
    if (!validGlobal) return false;
    const validForPiece = validDrop(dropPosition.block, getValidation(validationLibrary, piece), stacks[dropPosition.stack])
    if (!validForPiece) return false;
    const validForStack = allStacksRemainValid(stacks, piece, dropPosition, validationLibrary, creatingNewStackOnDrop)  
    return validForPiece && validForStack;
}