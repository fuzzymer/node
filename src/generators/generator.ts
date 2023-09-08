import { randomUUID } from "node:crypto";
import { integerGenerator } from "./integer";
import { TestPlan } from "../types";

export const generateTests = (args: Record<string, string>, numberOfTests: number) => {
  const test: Partial<TestPlan> = {};
  test.testId = randomUUID();
  test.args = args;
  test.tasks = [];
  for (const [key, value] of Object.entries(args)) {
    const taskId = randomUUID()
    switch (value) {
      case "INT":
        test.tasks.push({
          taskId,
          testValues: {
            argTests: integerGenerator(numberOfTests),
            argName: key
          },
        });
    }
  }
  return test;
};
