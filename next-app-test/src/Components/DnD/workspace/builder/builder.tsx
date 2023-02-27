import { observer } from 'mobx-react-lite'

import { Matrix } from '-/page-components/build-your-own/build-your-own-model'
import { DropZone } from '../../dropZone'
import { matrixIndexCoordinatesI, modifiersT } from '-/page-components/build-your-own/build-your-own.types'

interface propsI {
    builder: any, // TODO: typing for builder
    modifiers: modifiersT,
}

export const WorkspaceBuilder = observer(({builder, modifiers}: propsI) => { 
    const onDrop = () => console.log('ONDROP');
    const onRemove = () => console.log('ONREMOVE');
    return (<div className="flex">
        BUILDER   
    </div>)
})
