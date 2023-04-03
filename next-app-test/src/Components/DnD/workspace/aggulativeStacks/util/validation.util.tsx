import { validationValues } from "-/Components/modifier/modifier.types";
import { aggulativeStackIndexI, aggulativeStacksT, pieceI, stackI, validationLibraryT, validationT } from "-/page-components/build-your-own/build-your-own.types";
import { addPieceToStack, addStack } from "../builder.util";

const withinRange = ({blockIndex, proximity, values, stack}: {blockIndex: number, proximity: number, values: string[], stack: stackI}) => {
    return stack.slice(blockIndex - proximity, blockIndex + proximity).some(b => values.some(v => v === b.piece.id));
};
const validLevel = (blockIndex: number, values: string []) => {
    return Boolean(values.find(v => `level-${blockIndex}` === v))
};
const hasValue = () => true;
const hasAllValues = () => true;
export const validDrop = (blockIndex: number, validation: validationT, stack: stackI) => {
    return validation.every(v => {
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
    });
}
export const isValidStack = (validationLibrary: validationLibraryT, stack: stackI) => {
    const result = stack.map((b, index) => ({index, pieceValidation: getValidation(validationLibrary, b.piece)}))
    return result.map(r => (validDrop(r.index, r.pieceValidation, stack))).every(r => r);
}
export const getValidation = (validationLibrary: validationLibraryT, piece: pieceI) => {
    console.log('validationLibrary', validationLibrary);
    if(validationLibrary.length <= 0) return [];
    return validationLibrary.map(modLevel => {
        const options = piece?.config?.filter(c => c.id === modLevel.id);
        return modLevel.validation.filter(v => options?.some(o => o.selection === v.id));
    })[0][0]?.validation;
}
export const allStacksRemainValid = (stacks: aggulativeStacksT, draggingPiece: pieceI, dropPosition: aggulativeStackIndexI, validationLibrary: validationLibraryT, creatingNewStackOnDrop: boolean) => {
    const simulatedStacks = stacks.map(s => s.map(b => ({piece: {...b.piece, config: b.piece.config.map(c => ({...c}))}}))).slice(); // MAKE NON-OBSERVABLE COPY
    const simulatedPiece = {...draggingPiece, config: draggingPiece.config.map(c => ({...c}))};
    const newSimulatedStacks = creatingNewStackOnDrop
    ? addStack(dropPosition.stack, simulatedPiece, simulatedStacks)
    : addPieceToStack(dropPosition.stack, dropPosition.block, simulatedPiece, simulatedStacks)
    return newSimulatedStacks.map(s => isValidStack(validationLibrary, s)).every(s => s);
}