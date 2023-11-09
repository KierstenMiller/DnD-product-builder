import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useDragLayer } from 'react-dnd'

import { type aggulativeStackIndexI, type aggulativeStacksBuildT, type globalRulesI, type modifiersT, type validationLibraryT } from '-/page-components/build-your-own/build-your-own.types'
import { DnDItemTypes } from '../../freeform-matrix/utils/shapes.util'
import { findPiece } from '../utils/builder.util'
import { validateWorkspace } from '../utils/validation.util'
import { Stack } from './stack'

interface propsI {
  build: aggulativeStacksBuildT
  modifiers: modifiersT
  globalValidation: globalRulesI
  validationLibrary: validationLibraryT
}

export const AggulativeStacksWorkspace = observer(({ build, globalValidation, validationLibrary }: propsI) => {
  // using useState hook to track workspace piece dragging. BIG WHY: show/hiding <DropZone /> component shifts the DOM/mouse position of drag action, canceling React DnD's drag. FIX: Setting a timeout to let DnD's onDrag state 'solidify' before show/hiding
  // only passing pieceId trhough DnD layer at reccommendation of DnD Documentation
  // if DND layer doesn't have an id to provide, then validation was not set up for that workspace. validate() should always return true if no validation exists for the workspace
  // passing build.config in validate() function so observer() picks up that we need the latest config and rerenders this component
  const [isDraggingWorkspace, setIsDraggingWorkspace] = useState(false)
  const { draggingPieceId, isDraggingDndLayer } = useDragLayer(monitor => ({
    draggingPieceId: monitor.getItem()?.id,
    isDraggingDndLayer: monitor.isDragging() && monitor.getItemType() === DnDItemTypes.ITEM,
    itemType: monitor.getItemType()
  }))
  const isDragging = isDraggingWorkspace || isDraggingDndLayer
  const { piece: draggingPiece } = findPiece(draggingPieceId, build.stacks)
  const validiate = (dropPosition: aggulativeStackIndexI, creatingNewStackOnDrop: boolean) => (validationLibrary?.length === 0 || (!draggingPieceId && !draggingPiece))
    ? true
    : validateWorkspace({
      dropPosition,
      creatingNewStackOnDrop,
      piece: draggingPiece ?? build.generatePiece('simulated-piece', build.config),
      globalValidation,
      validationLibrary,
      stacks: build.stacks
    })
  const onStackDrop = (stackIndex: number) => { build.addStack(stackIndex, draggingPieceId) }
  const onBlockDrop = (stackIndex: number, blockIndex: number) => { build.addToStack(stackIndex, blockIndex, draggingPieceId) }
  const onBlockDrag = (isDraggingState: boolean) => { setIsDraggingWorkspace(isDraggingState) }
  return (<div className="flex a-i-end">
        {build?.stacks?.map((stack, index) => <Stack
            key={index}
            index={index}
            stack={stack}
            isDragging={isDragging}
            validDrop={validiate}
            onStackDrop={onStackDrop}
            onBlockDrop={onBlockDrop}
            onBlockDrag={onBlockDrag}
        />)}
    </div>)
})
