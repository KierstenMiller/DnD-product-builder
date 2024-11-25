import { type buildYourOwnRawDataI, type validationLibraryT } from '../shared/typing/build-your-own.types'
import { getBuilder } from './compilePageData.util'
import { StandardModel } from './standard.model'

// TODO: refactor and jest test
export const formatBuilderData = (data: buildYourOwnRawDataI) => {
  const config = data.modifiers.map(mod => {
    const selectedOption = mod.options.find(o => o.selected)
    return {
      id: mod.id,
      selection: selectedOption?.id ?? 'NA',
      value: selectedOption?.value ?? selectedOption?.label ?? 'NA',
      modifierChunkKey: mod.modifierChunkKey
    }
  })
  // want the validation data inside of modifier's option's data. Option data should be all in one place. So we need to extract the validation here
  const validationLibrary: validationLibraryT = data.modifiers.map(mod => ({
    id: mod.id,
    validation: mod.options.map(opt => ({ id: opt.id, validation: opt.validation ?? [] })).filter(opt => opt?.validation?.length && opt.validation.length > 0)
  })).filter(valLib => valLib.validation.length > 0)
  // will be undefined if builder doesn't have data
  const builderDataWithmodifierChunkKeys = data.builder?.data?.map(d => d.map(m => {
    if (!m.piece?.config) return m
    m.piece.config = m.piece?.config.map((pC: { id: string }) => {
      const match = config.find(gC => gC.id === pC.id)
      return { ...pC, modifierChunkKey: match?.modifierChunkKey }
    })
    return m
  }))
  const builder = {
    ...data.builder,
    ...builderDataWithmodifierChunkKeys && { data: builderDataWithmodifierChunkKeys }
  }
  return {
    model: new StandardModel({
      config,
      builder: getBuilder({
        config,
        type: builder.type,
        data: builder.data
      })
    }),
    validationLibrary
  }
}
