import { TestMetadata, TestPlan } from './types'

export class Output {
  #logger: (..._args: unknown[]) => void

  constructor(logger?: (..._args: unknown[]) => void) {
    this.#logger = logger ?? console.log
  }

  log = (testMetadata: TestMetadata[], testPlan: TestPlan) => {
    if (!testMetadata.length) {
      return this.#logger('No tests found!')
    }
    this.#logger(`Test Plan ID: ${testPlan.testId}`)
    this.#logger('Tasks:')
    testMetadata.forEach((test) => {
      this.#logger(test.error ? 'success' : 'fail')
      this.#logger('Args: ' + test.argList.map((arg) => arg.value).join(', '))
      if (test.error) this.#logger(test.error)
      this.#logger()
    })
  }
}
