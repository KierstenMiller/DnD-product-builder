import Head from 'next/head'
import { useState } from 'react'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { BuildYourOwnPage } from '-/page-components/build-your-own/build-your-own-page'
import { getBuilder } from '-/page-components/build-your-own/build-your-own.util'
import { BuildYourOwnDevBar, dataAggulativeStacksRental } from '-/page-components/build-your-own/build-your-own-dev-bar'
import { groupKeyValues } from '-/Components/modifier/modifier.types'

const BuildYourOwn = () => {

    console.log('BuildYourOwn render');
    const [data, setData] = useState(dataAggulativeStacksRental);
    console.log('data', data);
    // K-TODO: do this data massaging in getServerSideProps (if that is the method you choose for getting data)
    const config = data.modifiers.map(mod => {
        const selectedOption = mod.options.find(o => o.selected) || mod.options[0];
        return {
            id: mod.id,
            selection: selectedOption.id,
            value: selectedOption.value || selectedOption.label,
            groupKey: mod.groupKey
        }
    })
    console.log('config', config);
    const builder = {
        ...data.builder,
        data: data.builder.data.map(s => s.map(b => {
            const newConfig = {
                ...b,
                piece: {
                    ...b.piece,
                    config: b.piece.config.map(pC => {
                        const match = config.find(gC => gC.id === pC.id);
                        return {
                            ...pC,
                            groupKey: match?.groupKey
                        }
                    })
                }
            }
            return newConfig;
        }))
    }
    console.log('builder', builder);
    const model = new BuildYourOwnModel({
        config: config,
        builder: getBuilder({
            config,
            type: builder.type,
            data: builder.data,
            rules: builder.rules,
        }),
    });
    return (
        <>
            <Head>
                <title>Custom Quilt Builder</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BuildYourOwnDevBar setData={setData} />
            <BuildYourOwnPage model={model} modifiers={data.modifiers} />
        </>
    )
};

export default BuildYourOwn;
