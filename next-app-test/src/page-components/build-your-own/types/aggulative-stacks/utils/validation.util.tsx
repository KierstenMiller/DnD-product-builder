import { aggulativeStackIndexI, aggulativeStacksListT, globalRulesI, pieceI, stackI, validationLibraryT, validationT } from "-/page-components/build-your-own/build-your-own.types";
import { addPieceToStack, addStack } from "./builder.util";
import { validDrop } from "./valid-drop.util";

interface allStacksRemainValidI {
    stacks: aggulativeStacksListT,
    draggingPiece: pieceI,
    dropPosition: aggulativeStackIndexI,
    validationLibrary: validationLibraryT,
    creatingNewStackOnDrop: boolean
}
interface validateWorkspaceI {
    dropPosition: aggulativeStackIndexI,
    creatingNewStackOnDrop: boolean,
    piece: pieceI,
    globalValidation: globalRulesI,
    validationLibrary: validationLibraryT,
    stacks: aggulativeStacksListT
}
const isValidStack = (validationLibrary: validationLibraryT, stack: stackI) => {
    const stackValidation = stack.map((b, index) => ({index, pieceValidation: getValidation(validationLibrary, b.piece)}))
    return stackValidation.map(r => (validDrop({blockIndex: r.index, validation: r.pieceValidation, stack,}))).every(r => r);
}
const getValidation = (validationLibrary: validationLibraryT, piece: pieceI) => {
    if(validationLibrary.length <= 0) return [];
    return validationLibrary.map(modLevel => {
        const options = piece?.config?.filter(c => c.id === modLevel.id);
        return modLevel.validation.filter(v => options?.some(o => o.selection === v.id));
    })[0][0]?.validation;
} 
const allStacksRemainValid = ({stacks, draggingPiece, dropPosition, validationLibrary, creatingNewStackOnDrop}: allStacksRemainValidI) => {
    const simulatedStacks = stacks.map(s => s.map(b => ({piece: {...b.piece, config: b.piece.config.map(c => ({...c}))}}))).slice(); // MAKE NON-OBSERVABLE COPY
    const simulatedPiece = {...draggingPiece, config: draggingPiece.config.map(c => ({...c}))};
    const newSimulatedStacks = creatingNewStackOnDrop
    ? addStack(dropPosition.stack, simulatedPiece, simulatedStacks)
    : addPieceToStack(dropPosition.stack, dropPosition.block, simulatedPiece, simulatedStacks)
    return newSimulatedStacks.map(s => isValidStack(validationLibrary, s)).every(s => s);
}
export const validateWorkspace = ({dropPosition, creatingNewStackOnDrop, piece, globalValidation, validationLibrary, stacks}: validateWorkspaceI) => {
    // validForPiece is true if the current draggingPiece is added to a position ([stack][block]) that is valid for it's validation criteria
    // validForStack is true if all other pieces in the stack are still valid after *hypothetically* adding the current draggingPiece to the stack
    if (stacks?.length === 0) return false;
    const validGlobal = validDrop({blockIndex: dropPosition.block, validation: globalValidation, stack: stacks[dropPosition.stack], stacks, creatingNewStackOnDrop});
    if (!validGlobal) return false;
    const validForPiece = validDrop({blockIndex: dropPosition.block, validation: getValidation(validationLibrary, piece), stack: stacks[dropPosition.stack]})
    if (!validForPiece) return false;
    const validForStack = allStacksRemainValid({stacks, draggingPiece: piece, dropPosition, validationLibrary, creatingNewStackOnDrop})
    return validForPiece && validForStack;
}