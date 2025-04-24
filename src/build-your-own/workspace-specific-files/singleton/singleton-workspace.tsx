import { observer } from 'mobx-react-lite'
import { generateCabinet } from './cabinet/cabinet-util'
import { type SingletonBuildModel } from './models/singleton.model'

interface propsI {
  build: SingletonBuildModel
}

export const SingletonWorkspace = observer(({ build }: propsI) => {
  const shape = generateCabinet(build.config)
  return (<div className="flex">
    {shape}
  </div>)
})
