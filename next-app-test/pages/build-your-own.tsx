import Head from 'next/head'
import { observer } from 'mobx-react-lite'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { BuildYourOwnPage } from '-/page-components/build-your-own/build-your-own-page'
import { OPTIONS } from '-/page-components/build-your-own/build-your-own.util'

const data = {
    options: {
        [OPTIONS.DIMENSION]: [
            {label:"20 x 20", selected: true},
            {label:"30 x 30", selected: false},
            {label:"40 x 40", selected: false},
            {label:"50 x 50", selected: false},
        ],
        [OPTIONS.STITCH]: [
            {label:"Stitch A", selected: true},
            {label:"Stitch B", selected: false},
            {label:"Stitch C", selected: false},
            {label:"Stitch D", selected: false},
        ],
        [OPTIONS.PRINT]: [
            {label:"checkered", selected: true},
            {label:"polka dots", selected: false},
            {label:"lined", selected: false},
            {label:"solid", selected: false},
        ],
        [OPTIONS.COLORWAY]: [
            {label:"Red", selected: true},
            {label:"Yellow", selected: false},
            {label:"Blue", selected: false},
            {label:"Black", selected: false},
        ],
        [OPTIONS.TEXTURE]: [
            {label:"plain", selected: true},
            {label:"rough", selected: false},
            {label:"sparkles", selected: false},
            {label:"embroidered", selected: false},
        ],
    } 
}

const findInitValue = (options: {label: string, selected: boolean }[]) => options.find(opt => opt.selected)?.label || options[0].label;

const BuildYourOwn = observer(() => {
    // K-TODO: do this data massaging in getServerSideProps (if that is the method you choose for getting data)
    const model = new BuildYourOwnModel({
        dimensions:  findInitValue(data.options[OPTIONS.DIMENSION]),
        stitch:  findInitValue(data.options[OPTIONS.STITCH]),
        print:  findInitValue(data.options[OPTIONS.PRINT]),
        colorway:  findInitValue(data.options[OPTIONS.COLORWAY]),
        texture:  findInitValue(data.options[OPTIONS.TEXTURE]),
});
    return (
        <>
            <Head>
                <title>Custom Quilt Builder</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BuildYourOwnPage model={model} data={data} />
        </>
    )
})

export default BuildYourOwn;
