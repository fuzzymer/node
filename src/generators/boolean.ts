import { randomInt } from 'crypto'

export const boolGenerator = (numberOfTests: number) => {
  const tests = () => [
    { name: 'true', value: true },
    { name: 'false', value: false }
  ]
  const boolTasks = []
  while (numberOfTests--) boolTasks.push(tests()[randomInt(0, 2)])
  return boolTasks
}
