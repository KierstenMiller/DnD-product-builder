import { observer } from 'mobx-react-lite'

import { type configT } from '-/page-components/build-your-own/build-your-own.types'

export const SingletonDisplay = observer(({ config }: { config: configT }) => {
  return (<div>
        Singleton Display
  </div>)
})
