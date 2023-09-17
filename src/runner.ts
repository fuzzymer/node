import { ExpectError } from './errors.js'
import { Expect, Options, TestFunction, TestPlan } from './types.js'

export class Runner {
  protected options: Options
  constructor(options: Options) {
    this.options = options
  }

  protected runTestPlan = async (testPlan: TestPlan, func: TestFunction, expect: Expect) => {
    for (let test = 0; test < this.options.numberOfTests; test++) {
      const argList = testPlan.tasks.map((taskPlan) => taskPlan.testValues.argTests[test])
      const args = argList.map((record) => record.value)
      try {
        console.log(argList)
        console.log(args)
        const response = (await func(...args)) as Response
        const expectResult = expect.expectFunction(response, expect.valueToExpect)
        if (!expectResult) {
          throw new ExpectError(
            `Expected Response status to be ${expect.valueToExpect}. Received ${
              (response as Response).status
            }. Response body was ${JSON.stringify(await response.json())}`
          )
        }
      } catch (error) {
        if (this.options.exitOnError) throw error
      }
    }
  }
}
