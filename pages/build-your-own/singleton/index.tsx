import { dataSingletonMock } from '-/build-your-own/data/compiledResponses'
import { BuildYourOwnPage } from '-/build-your-own/page-layout/build-your-own-page'

const BuildYourOwn = () => {
  return <BuildYourOwnPage data={dataSingletonMock} />
}

export default BuildYourOwn
