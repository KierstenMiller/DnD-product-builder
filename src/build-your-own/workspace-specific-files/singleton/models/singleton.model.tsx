import { action, makeObservable, observable } from 'mobx'

import { type configT } from '-/build-your-own/shared/typing/build-your-own.types'

export class SingletonBuildModel {
  config
  constructor ({ config }: { config: configT }) {
    this.config = config
    makeObservable(this, {
      config: observable,
      setConfig: action.bound,
      clearWorkspace: action.bound
    })
  }

  setConfig = (newConfig: configT) => { this.config = newConfig }

  clearWorkspace = () => {
    // do nothing - no clearing needed
  }
}
