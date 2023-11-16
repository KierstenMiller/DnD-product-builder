import { BuildYourOwnPage } from '-/page-components/build-your-own/build-your-own-page'
import { dataSingletonRobot } from '-/page-components/build-your-own/builderRawData'

const BuildYourOwn = () => {
  return <BuildYourOwnPage data={dataSingletonRobot}/>
}

export default BuildYourOwn
