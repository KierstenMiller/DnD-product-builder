export enum adderDisplayValues {
  imageFirst = 'add-image-first',
  card = 'add-card'
}
export enum radioDisplayValues {
  card = 'radio-card',
  titled = 'radio-titled',
  imageFirst = 'radio-image-first'
}

export enum filterDisplayValues {
  dropDown = 'drop-down',
  pills = 'pills',
  tabbed = 'tabbed',
}

export type displayValuesT = radioDisplayValues | adderDisplayValues
