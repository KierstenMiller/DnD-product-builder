import { blockIndexI, stackI } from '-/page-components/build-your-own/build-your-own.types';
import { observer } from 'mobx-react-lite'

import { DropZone } from './aggulativeStacks';
import { Block } from './block';

interface propsI {
    index: number,
    stack: stackI,
    isDragging: boolean,
    validDrop: (dropPosition: blockIndexI) => boolean,
    onStackDrop: (stackIndex: number) => void,
    onBlockDrop: (stackIndex: number, blockIndex: number) => void,
    onBlockDrag: (isDraggingState: boolean) => void,
}
export const Stack = observer(({ index, stack, isDragging, validDrop, onStackDrop, onBlockDrop, onBlockDrag }: propsI) => {
    // const isValidLeft = validDrop({stack: index, block: 0});
    // const isValidRight = validDrop({stack: index, block: 1});
    const canDropLeft = index === 0 && isDragging; // && validDrop();
    const canDropRight = isDragging; // && validDrop();
    // TODO: figure out why I need to wrap conditional jsx with <></> to not see children error
    return (<div className="flex a-i-end">
        {index}
        <>{canDropLeft && <DropZone onDrop={() => onStackDrop(index)} />}</>
        <div>
            {stack.map((block, blockIndex) => <Block
                key={blockIndex}
                block={block}
                index={blockIndex}
                validDrop={(blockIndex: number) => validDrop({stack: index, block: blockIndex})}
                onDrop={(blockIndex) => onBlockDrop(index, blockIndex)}
                onDrag={onBlockDrag}
                isDragging={isDragging}
            />)}
        </div>
        <>{canDropRight && <DropZone onDrop={() => onStackDrop(index + 1)} />}</>
    </div>);
});