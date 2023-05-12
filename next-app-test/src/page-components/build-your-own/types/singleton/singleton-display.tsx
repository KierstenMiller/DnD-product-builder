import { observer } from 'mobx-react-lite'
import { modifiersT } from '-/page-components/build-your-own/build-your-own.types'

interface propsI {
    builder: any, // TODO: typing for builder
    modifiers: modifiersT,
}

export const SingletonDisplay = observer(({ builder, modifiers }: propsI) => {
    return (<div className="flex">
        SINGLETON DISPLAY
    </div>)
})
