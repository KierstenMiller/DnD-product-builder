import { observer } from 'mobx-react-lite'

import { type configT } from '-/page-components/build-your-own/build-your-own.types'

export const SingletonDisplay = observer(({ config }: { config: configT }) => {
  return (<div>
    <h2>Current Selections</h2>
    <div>
      {config.map(c => <div key={c.id} data-testid={`${c.id}-selection-group`}>
        <span data-testid="selection-id">{c.id}</span>:
        <span data-testid="selection-value">{c.selection}</span>
      </div>)}
    </div>
  </div>)
})
