import { dataSingletonRobot } from '-/build-your-own/data/compiled-responses'
import { BuildYourOwnPage } from '-/build-your-own/page-layout/build-your-own-page'

const BuildYourOwn = () => {
  return <BuildYourOwnPage data={dataSingletonRobot} />
}

export default BuildYourOwn
