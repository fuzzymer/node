import { randomInt } from 'node:crypto'

export const integerGenerator = (numberOfTests: number) => {
  const tests = () => [
    { name: 'positive', value: randomInt(1, 200) },
    { name: 'zero', value: 0 },
    { name: 'negative', value: randomInt(-200, -1) }
  ]
  const integerTasks = []
  while (numberOfTests--) integerTasks.push(tests()[randomInt(0, 3)])
  return integerTasks
}
