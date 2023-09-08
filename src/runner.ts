import { ExpectError } from "./errors";
import { Expect, Options, TestPlan } from "./types";

export class Runner {
  protected options: Options;
  constructor(options: Options) {
    this.options = options;
  }

  protected runTestPlan = async (testPlan: TestPlan, func: Function, expect: Expect) => {
    for (let test = 0; test < testPlan.numberOfTests; test++) {
      const argList = testPlan.tasks.map(
        (taskPlan) => taskPlan.testValues.argTests[test]
      );
      const args = argList.map((record) => record.value);
      try {
        const response = await func(...args);
        expect.expectFunction(response, expect.valueToExpect)
      } catch (error) {
        if(this.options.exitOnError) throw error;
      }
    }
  };
}
