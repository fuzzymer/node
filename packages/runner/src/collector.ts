import { Output } from './output'
import { TestMetadata } from './types'

export class Collector extends Output {
  #testMetadata: TestMetadata[] = []

  constructor() {
    super()
  }

  protected collect = (testMetadata: TestMetadata) => {
    this.#testMetadata.push(testMetadata)
  }
}
