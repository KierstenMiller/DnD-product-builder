import { observer } from 'mobx-react-lite'
import { modifiersT } from '-/page-components/build-your-own/build-your-own.types'

interface propsI {
    builder: any, // TODO: typing for builder
    modifiers: modifiersT,
}

export const WorkspaceAggulativeStacks = observer(({builder, modifiers}: propsI) => { 
    const onDrop = () => console.log('ONDROP');
    const onRemove = () => console.log('ONREMOVE');
    return (<div className="flex">
        AGGULATICE STACKS   
    </div>)
})
