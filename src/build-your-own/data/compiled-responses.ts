import { modifiers as rentalModifiers } from '-/build-your-own/data/aggulative-stacks/rental/modifiers.data'
import { rentalStacksMock } from '-/build-your-own/data/aggulative-stacks/rental/stacks.data'
import { modifiers } from '-/build-your-own/data/aggulative-stacks/testing-mocks/modifiers.data'
import { aggulativeStacksMock1 } from '-/build-your-own/data/aggulative-stacks/testing-mocks/stacks.data'
import { matrixMock } from '-/build-your-own/data/freeform-matrix/matrix.data'
import { shapeModifiers } from '-/build-your-own/data/freeform-matrix/modifiers.data'
import { robotModifiers } from '-/build-your-own/data/singleton/robots/modifiers.data'
import { mockModifierA, mockModifierB, mockModifierC, mockModifierD, mockModifierE } from '-/build-your-own/data/singleton/testing-mocks/modifiers.data'
import { builderKeys } from '-/build-your-own/page-state/compile-page-data.util'
import { validationValues } from '-/build-your-own/shared/modifier-components/shared/typing/modifier.types'
import { type buildYourOwnRawDataI } from '-/build-your-own/shared/typing/build-your-own.types'

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
      { type: validationValues.maxStacksCount, values: ['6'] }
    ],
    data: rentalStacksMock
  }
}
