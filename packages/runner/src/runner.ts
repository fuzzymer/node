import { Collector } from './collector.js'
import { ExpectError } from './errors.js'
import { Expect, Options, TestFunction, TestPlan } from './types.js'

export class Runner extends Collector {
  protected options: Options
  constructor(options: Options) {
    super()
    this.options = options
  }

  protected runTestPlan = async (testPlan: TestPlan, func: TestFunction, expect: Expect) => {
    //this.testPlan = testPlan;
    for (let test = 0; test < 10; test++) {
      const argList = testPlan.tasks.map((taskPlan) => taskPlan.testValues.argTests[test])
      const args = argList.map((record) => record.value)
      try {
        const response = (await func(...args)) as Response
        const expectResult = expect.expectFunction(response, expect.valueToExpect)
        if (!expectResult) {
          throw new ExpectError(
            `Expected Response status to be ${expect.valueToExpect}. Received ${
              (response as Response).status
            }. Response body was ${JSON.stringify(await response.json())}`
          )
        }
        else
          this.collect({
            argList
          })
      } catch (error) {
        if (this.options.exitOnError) throw error
        else
          this.collect({
            argList,
            error: error as Error
          })
      }
    }
    // this.prettyPrint();
  }
}
