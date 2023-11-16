import { BuildYourOwnPage } from '-/page-components/build-your-own/build-your-own-page'
import { dataSingletonMock } from '-/page-components/build-your-own/builderRawData'

const BuildYourOwn = () => {
  return <BuildYourOwnPage data={dataSingletonMock}/>
}

export default BuildYourOwn
