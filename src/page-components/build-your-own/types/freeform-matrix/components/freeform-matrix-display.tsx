import { observer } from 'mobx-react-lite'

import { configT } from '-/page-components/build-your-own/build-your-own.types';
import { FreeformMatrixBuildModel } from '../models/freeform-grid.model';
import { DnDItemTypes, generateImage } from '../utils/shapes.util';
import { AddModal, AddModalOnClickI } from '-/page-components/build-your-own/shared/addModal';
import { DragZone } from '-/page-components/build-your-own/shared/DnD/dragZone';


export const FreeformMatrixDisplay = observer(({ config, build }: { config: configT, build: FreeformMatrixBuildModel }) => {
    const image = generateImage(config);
    const onModalAdd = ({ matrixIndex }: AddModalOnClickI) => build.setMatrixIndexPiece({ matrixIndex });
    return (<div className="flex">
        <DragZone type={DnDItemTypes.ITEM}>
            {image}
        </DragZone>
        <AddModal image={image} onSubmit={onModalAdd} />
    </div>)
})
