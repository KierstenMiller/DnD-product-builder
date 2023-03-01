import { observer } from 'mobx-react-lite'
import { modifiersT, blockI } from '-/page-components/build-your-own/build-your-own.types'
import { useDrag, useDrop } from 'react-dnd';
import { DnDItemTypes } from '../freeformMatrix/freeformMatrix.util';
import { useRef } from 'react';
import { onDropI, onMoveI } from '../../dropZone';
import { AggulativeStacks } from '-/page-components/build-your-own/aggulative-stacks.model';

interface propsI {
    build: AggulativeStacks,
    modifiers: modifiersT,
}

const Block = ({block}:{block: blockI}) => {
    const units = parseInt(block.piece.config.find(c => c.id === 'mod-height')?.selection || '1')
    return <div
        style={{
            width: `${100}px`,
            height: `${100*units}px`,
        }}
    >
        {block.piece.id}-{units}
    </div>

}

export const WorkspaceAggulativeStacks = observer(({ build, modifiers }: propsI) => {
    const onDrop = () => console.log('ONDROP');
    const onRemove = () => console.log('ONREMOVE');
    console.log('build', build);
    return (<div className="flex a-i-end">
        {build?.stacks?.map((stack, index) => <div key={index}>
            {stack.map(block => <div key={block.piece.id}>
                <AggulativeStacksDropZone
                    onDrop={onDrop}
                    onRemove={onRemove}
                >
                    <Block block={block}/>
                </AggulativeStacksDropZone>
            </div>)}
        </div>)}
    </div>)
})


// TODO: generalize and share with freeformMatrix dropZone component
const AggulativeStacksDropZone = observer(({ onDrop, onMove, children }: { onDrop: onDropI, onMove: onMoveI, children: React.ReactNode }) => {
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
            background: dropInfo.isOver ? 'yellow' : 'white',
            color: dropInfo.canDrop ? 'blue' : 'red',
        }}
    >
        ITEM
        {children}
    </div>)
})