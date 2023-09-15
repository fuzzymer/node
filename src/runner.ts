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
        const response = await func(...args)
        expect.expectFunction(response, expect.valueToExpect)
      } catch (error) {
        if (this.options.exitOnError) throw error
      }
    }
  }
}
