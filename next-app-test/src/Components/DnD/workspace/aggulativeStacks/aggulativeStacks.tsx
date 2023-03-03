import { observer } from 'mobx-react-lite'
import { modifiersT, blockI, blockIndexI, pieceI } from '-/page-components/build-your-own/build-your-own.types'
import { useDrag, useDragLayer, useDrop } from 'react-dnd';
import { DnDItemTypes } from '../freeformMatrix/freeformMatrix.util';
import { useRef, useState } from 'react';
import { onDropI, onMoveI } from '../../dropZone';
import { AggulativeStacks } from '-/page-components/build-your-own/aggulative-stacks.model';

interface propsI {
    build: AggulativeStacks,
    modifiers: modifiersT,
}

const Block = ({ block }: { block: blockI }) => {
    const units = parseInt(block.piece.config.find(c => c.id === 'mod-height')?.selection || '1')
    return <div
        style={{
            width: `${100}px`,
            height: `${100 * units}px`,
        }}
    >
        B-id:{block.piece.id} <br />
        B-value:{units}
    </div>

}

export const WorkspaceAggulativeStacks = observer(({ build, modifiers }: propsI) => {
    const { isDraggingOutside, draggingPiece } = useDragLayer( // for dragging from modifier
        monitor => ({
             isDraggingOutside: monitor.isDragging() && monitor.getItemType() === DnDItemTypes.ITEM,
             draggingPiece: monitor.getItem()?.piece
        })
    )
    const [isDraggingInside, setIsDraggingInside] = useState(false); // for dragging from workspace (show/hiding <DropZone /> component shifts the DOM/mouse position of drag action, canceling React DnD's drag)
    const isDragging = isDraggingInside || isDraggingOutside
    return (<div className="flex a-i-end">
        {build?.stacks?.map((stack, stackIndex) => <div key={stackIndex} className="flex a-i-end">
            {/* SELF DROP ZONE */}
            {isDragging && stackIndex === 0 && <DropZone onDrop={() => build.addStack(stackIndex, draggingPiece)} />}
            {/* NON-DRAGGABLE STACK */}
            <div>
                <div>STACK: {stackIndex}</div>
                {stack.map((block, blockIndex) => <div key={block.piece.id}>
                    {/* SELF DROP ZONE */}
                    {blockIndex === 0 && <>
                        <div>SELF</div>
                        {isDragging && <DropZone onDrop={() => build.addToStack(stackIndex, blockIndex, draggingPiece)} />}
                    </>}
                    {/* DRAGGABLE BLOCK*/}
                    <DragZone
                        piece={block.piece}
                        isDraggingState={isDraggingInside}
                        setIsDraggingState={setIsDraggingInside}
                        onEnd={() => {
                            //build.removeBlock(stackIndex, block.piece.id)
                        }}
                    >
                        index: {stackIndex}-{blockIndex}<br />
                        <Block block={block} />
                    </DragZone>
                    {/* NEXT DROP ZONE */}
                    <div>NEXT</div>
                    {isDragging && <DropZone onDrop={() => build.addToStack(stackIndex, blockIndex + 1, draggingPiece)} />}
                </div>)}
            </div>
            {/* NEXT DROP ZONE */}
            {isDragging && <DropZone onDrop={() => build.addStack(stackIndex + 1, draggingPiece)} />}
        </div>)}
    </div>)
})


// TODO: generalize and share with freeformMatrix dropZone component
const DragZone = observer(({piece, isDraggingState, setIsDraggingState, onEnd, children }: {
    piece: pieceI,
    isDraggingState: boolean,
    setIsDraggingState: (arg: boolean) => void,
    onEnd: () => void,
    children: React.ReactNode
}) => {
    const [dragInfo, drag, preview] = useDrag(
        () => ({
            type: DnDItemTypes.WORKSPACE_ITEM,
            item: {piece},
            collect: (monitor) => {
                piece && piece.id === monitor?.getItem()?.piece?.id && setTimeout(() => setIsDraggingState(true), 250);
                return {
                    isDragging: !!monitor.isDragging(),
                }
            },
            end: (item, monitor) => {
                setTimeout(() => setIsDraggingState(false), 250)
                onEnd();
            }
        }),
        [],
    )
    return (<div
        ref={drag}
        style={{
            background: 'white',
            border: '1px solid red'
        }}
    >
        {children}
    </div>)
})

const DropZone = observer(({ onDrop }: { onDrop: () => void }) => {
    const [dropInfo, drop] = useDrop(
        () => ({
            accept: [DnDItemTypes.ITEM, DnDItemTypes.WORKSPACE_ITEM],
            drop: () => {
                onDrop();
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [],
    );
    return (<div
        ref={drop}
        style={{
            background: dropInfo.isOver ? 'yellow' : 'white',
            color: dropInfo.canDrop ? 'blue' : 'red',
        }}
    >
        + Add item
    </div>)
})