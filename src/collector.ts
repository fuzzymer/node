import { TestMetadata, TestPlan } from './types'

const LOGGER = console.log
export class Collector {
  #testMetadata: TestMetadata[] = []
  testPlan: TestPlan = null

  protected collect = (testMetadata: TestMetadata) => {
    this.#testMetadata.push(testMetadata)
  }

  prettyPrint = () => {
    if (!this.#testMetadata.length) {
      return LOGGER('No tests found!')
    }
    LOGGER(`Test Plan ID: ${this.testPlan.testId}`)
    LOGGER('Tasks:')
    this.#testMetadata.forEach((test) => {
      LOGGER(test.error ? 'success' : 'fail')
      LOGGER('Args: ' + test.argList.map((arg) => arg.value).join(', '))
      if(test.error) LOGGER(test.error)
      LOGGER()
    })
  }
}
