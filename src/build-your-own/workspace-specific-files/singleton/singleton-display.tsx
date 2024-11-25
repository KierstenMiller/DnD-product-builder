import { observer } from 'mobx-react-lite'

import { type configT } from '-/build-your-own/shared/typing/build-your-own.types'

export const SingletonDisplay = observer(({ config }: { config: configT }) => {
  return (<div>
    Singleton Display
  </div>)
})
