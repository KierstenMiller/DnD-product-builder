import { type buildYourOwnRawDataI, type configT, type modifiersT, type validationLibraryT } from '../shared/typing/build-your-own.types'
import { getBuilder } from './builder-key-getters'
import { StandardModel } from './standard.model'

const constructConfig = (modifiers: modifiersT): configT => {
  return modifiers.map(mod => {
    const selectedOption = mod.options.find(o => o.selected)
    return {
      id: mod.id,
      selection: selectedOption?.id ?? 'NA',
      value: selectedOption?.value ?? selectedOption?.label ?? 'NA',
      modifierChunkKey: mod.modifierChunkKey
    }
  })
}

const constructValidationLibrary = (modifiers: modifiersT): validationLibraryT => {
  return modifiers.map(mod => ({
    id: mod.id,
    validation: mod.options.map(opt => ({ id: opt.id, validation: opt.validation ?? [] })).filter(opt => opt?.validation?.length && opt.validation.length > 0)
  })).filter(valLib => valLib.validation.length > 0)
}

// TODO: Make "builder" its own type in build-your-own.types.ts
const constructBuilderDataWithModifierChunkKeys = (builder: buildYourOwnRawDataI['builder'], config: configT) => {
  return builder?.data?.map(d => d.map(m => {
    if (!m.piece?.config) return m
    m.piece.config = m.piece?.config.map((pC: { id: string }) => {
      const match = config.find(gC => gC.id === pC.id)
      return { ...pC, modifierChunkKey: match?.modifierChunkKey }
    })
    return m
  }))
}

// TODO: refactor and jest test
export const formatBuilderData = (data: buildYourOwnRawDataI) => {
  const config = constructConfig(data.modifiers)
  // want the validation data inside of modifier's option's data. Option data should be all in one place. So we need to extract the validation here
  const validationLibrary = constructValidationLibrary(data.modifiers)
  // will be undefined if builder doesn't have data
  const builderDataWithModifierChunkKeys = constructBuilderDataWithModifierChunkKeys(data.builder, config)
  const builder = {
    ...data.builder,
    ...builderDataWithModifierChunkKeys && { data: builderDataWithModifierChunkKeys }
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
