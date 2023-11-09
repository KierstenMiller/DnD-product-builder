import { observer } from 'mobx-react-lite'

import { type configT } from '../../build-your-own.types'

export const SingletonDisplay = observer(({ config }: { config: configT }) => {
  return (<div className="flex">
        <h2>Current Selections</h2>
        {config.map(c => <div key={c.id}>Selected {c.id}: {c.selection}</div>)}
    </div>)
})
