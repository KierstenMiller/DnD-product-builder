import { validationValues } from "-/Components/modifier/modifier.types";
import { aggulativeStackIndexI, aggulativeStacksT, pieceI, stackI, validationLibraryT, validationT } from "-/page-components/build-your-own/build-your-own.types";
import { isNum } from "-/util/helpers";

// TODO: clean up file :()

/////////////////////////////// UTIL
export const generateId = () => 'id' + (new Date()).getTime();
export const findIndex2D = (stacks: aggulativeStacksT, id: string) => {
    let block = -1;
    const stack = stacks.findIndex(s => {
        block = s.findIndex(b => b.piece.id === id)
        return block >= 0;
    })
    return stack >= 0 ? { stack, block } : null;
}
export const findPiece = (id: string, stacksData: aggulativeStacksT) => {
    const index = findIndex2D(stacksData, id);
    const piece = (index && isNum(index.stack) && isNum(index.block)) ? (stacksData[index.stack][index.block])?.piece : null;
    return { index, piece }; 
}
/////////////////////////////// Modify
export const findAndRemoveBlock = (id: string, stacksData: aggulativeStacksT) => {
    const {index, piece} = findPiece(id, stacksData);
    if (index) stacksData[index.stack].splice(index.block, 1); // SLPICE EDITS ORIGINAL ARRAY
    return piece;
}
export const clearEmptyStacks = (stacksData: aggulativeStacksT) => {
    return stacksData.filter(s => s.length > 0);
}
export const addPieceToStack = (stackIndex: number, blockIndex: number, piece: pieceI, stacksData: aggulativeStacksT) => {
    findAndRemoveBlock(piece.id, stacksData);
    stacksData[stackIndex].splice(blockIndex, 0, { piece }); // SLPICE EDITS ORIGINAL ARRAY
    return clearEmptyStacks(stacksData);
};

////////////////////////// validation
const isValidStack = (validationLibrary: validationLibraryT, stack: stackI) => {
    const result = stack.map((b, index) => ({index, pieceValidation:getValidation(validationLibrary, b.piece)}))
    return result.map(r => (validDrop(r.index, r.pieceValidation, stack))).every(r => r);
}
export const getValidation = (validationLibrary: validationLibraryT, piece: pieceI) => {
    const result = validationLibrary.map(modLevel => {
        const options = piece?.config?.filter(c => c.id === modLevel.id);
        return modLevel.validation.filter(v => options?.some(o => o.selection === v.id));
    })[0][0]?.validation;
    return result;
}
export const allStacksRemainValid = (stacks: aggulativeStacksT, draggingPiece: pieceI, dropPosition: aggulativeStackIndexI, validationLibrary: validationLibraryT) => {
    const ghostStacks = stacks.map(s => s.map(b => ({piece: {...b.piece, config: b.piece.config.map(c => ({...c}))}}))).slice(); // MAKE NON-OBSERVABLE COPY
    const ghostPiece = {...draggingPiece, config: draggingPiece.config.map(c => ({...c}))};
    const newGhostStacks = addPieceToStack(dropPosition.stack, dropPosition.block, ghostPiece, ghostStacks)
    const allStacksAreValid = newGhostStacks.map(s => isValidStack(validationLibrary, s)).every(s => s);
    return allStacksAreValid;
}

/////////////////////////////// VALIDATION
const withinRange = ({blockIndex, proximity, values, stack}: {blockIndex: number, proximity: number, values: string[], stack: stackI}) => {
    const inRange = stack
    .slice(blockIndex - proximity, blockIndex + proximity)
    .some(b => values.some(v => v === b.piece.id))
    return inRange;
};
const validLevel = (blockIndex: number, values: string []) => {
    const result = Boolean(values.find(v => `level-${blockIndex}` === v))
    return result;
};
const hasValue = () => true;
const hasAllValues = () => true;
export const validDrop = (blockIndex: number, validation: validationT, stack: stackI) => {
    const isValid = validation.every(v => {
        switch (v.type) {
            case validationValues.proximity:
                return withinRange({
                    blockIndex,
                    proximity: v.proximity || stack.length,
                    values: v.values,
                    stack: stack
                });
            case validationValues.position:
                return validLevel(blockIndex, v.values);
            case validationValues.has:
                return hasValue();
            case validationValues.hasAll:
                return hasAllValues();
            default: console.error(`Validation type ${v.type} does not exist`); return true;
        }
    })
    return isValid
}