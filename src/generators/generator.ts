import { randomUUID } from 'node:crypto'
import { integerGenerator } from './integer.js'
import { TestPlan } from '../types.js'
import { floatGenerator } from './float.js'
import { bigIntGenerator } from './bigint.js'
import { stringGenerator } from './string.js'
import { boolGenerator } from './boolean.js'
import { nullGenerator } from './null.js'

export const generateTests = (args: Record<string, string>[], numberOfTests: number) => {
  const test: Partial<TestPlan> = {}
  test.testId = randomUUID()
  test.args = args
  test.tasks = []
  for (const record of args) {
    const [key, value] = Object.entries(record)[0]
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
      case 'STRING':
        tests = stringGenerator()
        break
      case 'BOOL':
        tests = boolGenerator(numberOfTests)
        break
      case 'NULL':
        tests = nullGenerator(numberOfTests)
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
