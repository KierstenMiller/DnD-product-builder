export class DndSimulatorDataTransfer {
  data: Record<string, any>
  dropEffect: string = 'move'
  effectAllowed: string = 'all'
  files: any[] = []
  items: any[] = []
  types: string[] = []

  constructor () {
    this.data = {}
  }

  clearData (format?: string): void {
    if (format) {
      delete this.data[format]

      const index = this.types.indexOf(format)
      if (index !== -1) {
        this.types.splice(index, 1)
        this.items.splice(index, 1)
        delete this.data[index]
      }
    } else {
      this.data = {}
    }
  }

  setData (format: string, data: any): void {
    this.data[format] = data
    this.items.push(data)
    this.types.push(format)
  }

  getData (format: string): any {
    if (format in this.data) {
      return this.data[format]
    }

    return ''
  }

  setDragImage (img: any, xOffset: number, yOffset: number): void {
    // Since simulation doesn't replicate the visual
    // effects, there is no point in implementing this
  }
}
