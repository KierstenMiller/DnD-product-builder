import { observer } from 'mobx-react-lite'
import { modifiersT } from '-/page-components/build-your-own/build-your-own.types'
import { useDrag, useDrop } from 'react-dnd';
import { DnDItemTypes } from '../freeformMatrix/freeformMatrix.util';
import { useRef } from 'react';
import { onDropI, onMoveI } from '../../dropZone';
import { AggulativeStacks } from '-/page-components/build-your-own/aggulative-stacks.model';

interface propsI {
    build: AggulativeStacks,
    modifiers: modifiersT,
}

export const WorkspaceAggulativeStacks = observer(({ build, modifiers }: propsI) => {
    const onDrop = () => console.log('ONDROP');
    const onRemove = () => console.log('ONREMOVE'); //
    console.log('build', build);
    return (<div className="flex a-i-end">
        {build?.stacks?.map((stack, index) => <div key={index}>
            {stack.map(block => <div key={block.piece.id}>
                id: {block.piece.id}
                <AggulativeStacksDropZone onDrop={onDrop} onRemove={onRemove} />
            </div>)}
        </div>)}
    </div>)
})

const AggulativeStacksDropZone = observer(({ onDrop, onMove }: { onDrop: onDropI, onMove: onMoveI }) => {
    const zoneRef = useRef();
    const [dropInfo, drop] = useDrop(
        () => ({
            accept: [DnDItemTypes.ITEM, DnDItemTypes.WORKSPACE_ITEM],
            drop: () => { // TODO: figure out better typing
                console.log('DROPPED!!!!!!!!!');
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [],
    )
    const [dragInfo, drag, preview] = useDrag(
        () => ({
            type: DnDItemTypes.WORKSPACE_ITEM,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [],
    )
    drop(drag(zoneRef));
    return (<div
        ref={zoneRef}
        style={{
            width: '100px',
            height: '100px',
            background: dropInfo.isOver ? 'yellow' : 'white',
            color: dropInfo.canDrop ? 'blue' : 'red',
        }}
    >
        DROP HERE
    </div>)
})