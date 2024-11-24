import { validationValues } from '-/page-components/build-your-own/shared/modifier-components/shared/typing/modifier.types'

export const blockOptions = [
  {
    id: 'simple-entry',
    label: 'Simple Entry',
    image: 'SIMPLE_ENTRY',
    value: 'simple-entry',
    rank: 1,
    validation: [
      { type: validationValues.position, values: ['level-0'] }
    ]
  },
  {
    id: 'fancy-entry',
    label: 'Fancy Entry',
    image: 'FANCY_ENTRY',
    value: 'fancy-entry',
    rank: 1,
    validation: [
      { type: validationValues.position, values: ['level-0'] }
    ]
  },
  {
    id: 'raised-entry',
    label: 'Raised Entry',
    image: 'RAISED_ENTRY',
    value: 'raised-entry',
    rank: 1,
    validation: [
      { type: validationValues.position, values: ['level-0'] }
    ]
  },
  {
    id: 'apartment-single-studio',
    label: 'Single level studio',
    image: 'SINGLE_LEVEL_STUDIO',
    value: 'apartment-single-studio',
    rank: 2,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8'] }
    ]
  },
  {
    id: 'apartment-double-studio',
    label: 'Double level studio',
    image: 'DOUBLE_LEVEL_STUDIO',
    value: 'apartment-double-studio',
    rank: 2,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8'] }
    ]
  },
  {
    id: 'apartment-single-one',
    label: 'Single level one bedroom',
    image: 'SINGLE_LEVEL_ONE_BEDROOM',
    value: 'apartment-single-one',
    rank: 2,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8'] }
    ]
  },
  {
    id: 'apartment-double-one',
    label: 'Double level one bedroom',
    image: 'DOUBLE_LEVEL_ONE_BEDROOM',
    value: 'apartment-double-one',
    rank: 2,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8'] }
    ]
  },
  {
    id: 'amenity-pool',
    label: 'Pool',
    image: 'POOL',
    value: 'amenity-pool',
    rank: 3,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-1'] }
    ]
  },
  {
    id: 'amenity-observatory',
    label: 'Observatory',
    image: 'OBSERVATORY',
    value: 'amenity-observatory',
    rank: 3,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8'] }
    ]
  },
  {
    id: 'amenity-cafe',
    label: 'Cafe',
    image: 'CAFE',
    value: 'amenity-cafe',
    rank: 3,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8'] }
    ]
  },
  {
    id: 'amenity-dinning',
    label: 'Dinning',
    image: 'DINNING',
    value: 'amenity-dinning',
    rank: 3,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8'] }
    ]
  },
  {
    id: 'amenity-kitchen',
    label: 'Kitchen',
    image: 'KITCHEN',
    value: 'amenity-kitchen',
    rank: 3,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.hasAll, values: ['amenity-cafe', 'amenity-dinning'] },
      { type: validationValues.proximity, proximity: 1, values: ['amenity-dinning'] },
      { type: validationValues.position, values: ['level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6', 'level-7', 'level-8'] }
    ]
  },
  {
    id: 'amenity-gym',
    label: 'Gym',
    image: 'GYM',
    value: 'amenity-gym',
    rank: 3,
    validation: [
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-1', 'level-2', 'level-3', 'level-4'] }
    ]
  },
  {
    id: 'amenity-locker',
    label: 'Locker',
    image: 'LOCKER',
    value: 'amenity-locker',
    rank: 3,
    validation: [
      { type: validationValues.proximity, proximity: 1, values: ['amenity-gym'] },
      { type: validationValues.has, values: ['simple-entry', 'fancy-entry', 'raised-entry'] },
      { type: validationValues.position, values: ['level-1', 'level-2', 'level-3', 'level-4', 'level-5'] }
    ]
  }
]

export const fillOptions = [
  {
    id: 'fill-red',
    label: 'Red',
    image: 'RED_COLOR',
    value: 'default-red'
  },
  {
    id: 'fill-light-red',
    label: 'Light Red',
    image: 'LIGHT_RED_COLOR',
    value: 'light-red',
    selected: true
  },
  {
    id: 'fill-blue',
    label: 'Blue',
    image: 'BLUE_COLOR',
    value: 'default-blue'
  },
  {
    id: 'fill-light-blue',
    label: 'Light Blue',
    image: 'LIGHT_BLUE_COLOR',
    value: 'light-blue'
  },
  {
    id: 'fill-green',
    label: 'Green',
    image: 'GREEN_COLOR',
    value: 'default-green'
  },
  {
    id: 'fill-light-green',
    label: 'Light Green',
    image: 'LIGHT_GREEN_COLOR',
    value: 'light-green'
  }
]
export const strokeOptions = [
  {
    id: 'stroke-red',
    label: 'Red',
    image: 'RED_COLOR',
    value: 'default-red',
    selected: true
  },
  {
    id: 'stroke-blue',
    label: 'Blue',
    image: 'BLUE_COLOR',
    value: 'default-blue'
  },
  {
    id: 'stroke-green',
    label: 'Green',
    image: 'GREEN_COLOR',
    value: 'default-green'
  }
]
