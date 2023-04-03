import Head from 'next/head'
import { useState } from 'react'

import { BuildYourOwnModel } from '-/page-components/build-your-own/build-your-own-model'
import { BuildYourOwnPage } from '-/page-components/build-your-own/build-your-own-page'
import { getBuilder } from '-/page-components/build-your-own/build-your-own.util'
import { BuildYourOwnDevBar, dataAggulativeStacksRental } from '-/page-components/build-your-own/build-your-own-dev-bar'

const BuildYourOwn = () => {
    const [data, setData] = useState(dataAggulativeStacksRental);
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
    // want the validation data inside of modifier's option's data. Option data should be all in one place. So we need to extract the validation here
    const validationLibrary = data.modifiers.map(mod => ({
        id: mod.id,
        validation: mod.options.map(opt => ({
            id: opt.id,
            validation: opt.validation,
        })).filter(opt => Boolean(opt.validation))
    })).filter(mod => mod.validation.length > 0);
    // will be undefined if builder doesn't have data
    const builderDataWithGroupKeys = data.builder?.data?.map(d => d.map(m => {
        if(!m.piece?.config) return m;
        m.piece.config = m.piece?.config.map(pC => {
            const match = config.find(gC => gC.id === pC.id);
            return {...pC, groupKey: match?.groupKey};
        })
        return m;
    }))
    const builder = {
        ...data.builder,
        ...builderDataWithGroupKeys && {data: builderDataWithGroupKeys}
    } 
    const model = new BuildYourOwnModel({
        config: config,
        builder: getBuilder({config, ...builder}),
    });
    // TODO: make generic data typing
    const clearWorkspace = (newData) => {
        // TODO: require every model to have setConfig and clearWorkspace actions
        model?.builder?.build?.clearWorkspace(); // clearing to ensure there are no conflicts between workspace data
        setData(newData);
    }
    return (
        <>
            <Head>
                <title>Custom Quilt Builder</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BuildYourOwnDevBar setData={clearWorkspace} />
            <BuildYourOwnPage model={model} modifiers={data.modifiers} validationLibrary={validationLibrary}/>
        </>
    )
};

export default BuildYourOwn;
