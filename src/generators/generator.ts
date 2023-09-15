import { randomUUID } from 'node:crypto'
import { integerGenerator } from './integer.js'
import { TestPlan } from '../types.js'
import { floatGenerator } from './float.js'
import { bigIntGenerator } from './bigint.js'

export const generateTests = (args: Record<string, string>, numberOfTests: number) => {
  const test: Partial<TestPlan> = {}
  test.testId = randomUUID()
  test.args = args
  test.tasks = []
  for (const [key, value] of Object.entries(args)) {
    const taskId = randomUUID()
    let tests
    switch (value) {
      case 'INT':
        tests = integerGenerator(numberOfTests)
        break
      case 'FLOAT':
        tests = floatGenerator(numberOfTests)
        break
      case 'BIGINT':
        tests = bigIntGenerator(numberOfTests)
        break
    }
    test.tasks.push({
      taskId,
      testValues: {
        argTests: tests!,
        argName: key
      }
    })
  }
  
  return test
}
