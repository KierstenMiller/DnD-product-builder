import { modifiers as rentalModifiers } from '-/data/aggulativeStacks/rental/modifiers.data'
import { rentalStacksMock } from '-/data/aggulativeStacks/rental/stacks.data'
import { modifiers } from '-/data/aggulativeStacks/testingMocks/modifiers.data'
import { aggulativeStacksMock1 } from '-/data/aggulativeStacks/testingMocks/stacks.data'
import { matrixMock } from '-/data/freeformMatrix/matrix.data'
import { shapeModifiers } from '-/data/freeformMatrix/modifiers.data'
import { robotModifiers } from '-/data/singleton/robots/modifiers.data'
import { mockModifierA, mockModifierB, mockModifierC, mockModifierD, mockModifierE } from '-/data/singleton/testingMocks/modifiers.data'
import { type buildYourOwnRawDataI } from '-/page-components/build-your-own/build-your-own.types'
import { builderKeys } from '-/page-components/build-your-own/build-your-own.util'
import { validationValues } from '-/page-components/build-your-own/shared/modifier/modifier.types'

// NOTE: ALL OPTION IDS MUST BE UNIQUE ACROSS WORKSPACES, OTHERWISE MOBX GETS CONFUSED
// NOTE: Not using subclassing to standardize models as MobX has major subclassing limitations - https://mobx.js.org/subclassing.html

// mock SINGLETON data
export const dataSingletonMock: buildYourOwnRawDataI = {
  modifiers: [mockModifierA, mockModifierB, mockModifierC, mockModifierD, mockModifierE],
  builder: {
    type: builderKeys.singleton,
    data: undefined
  }
}
// robot SINGLETON data
export const dataSingletonRobot: buildYourOwnRawDataI = {
  modifiers: robotModifiers,
  builder: {
    type: builderKeys.singleton,
    data: undefined
  }
}
// mock FREEFORM MATRIX data
export const dataFreeformMatrix: buildYourOwnRawDataI = {
  modifiers: shapeModifiers,
  builder: {
    type: builderKeys.freeformMatrix,
    data: matrixMock
  }
}
// mock AGGULATIVE STACKS data
export const dataAggulativeStacks: buildYourOwnRawDataI = {
  modifiers,
  builder: {
    type: builderKeys.aggulativeStacks,
    data: aggulativeStacksMock1
  }
}
// rental AGGULATIVE STACKS data
export const dataAggulativeStacksRental: buildYourOwnRawDataI = {
  modifiers: rentalModifiers,
  builder: {
    type: builderKeys.aggulativeStacks,
    rules: [
      { type: validationValues.maxStackHeight, values: ['8'] },
      { type: validationValues.maxStacksCount, values: ['4'] }
    ],
    data: rentalStacksMock
  }
}
