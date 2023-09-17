import { randomInt } from 'crypto'

export const bigIntGenerator = (numberOfTests: number) => {
  const tests = () => [
    { name: 'positive', value: 2 ** randomInt(80, 90) },
    { name: 'negative', value: -1 * 2 ** randomInt(80, 90) },
    { name: 'positive decimal', value: 2 ** randomInt(80, 90) + Math.random() },
    { name: 'negative decimal', value: -1 * (2 ** randomInt(80, 90) + Math.random()) }
  ]
  const bigIntegerTasks = []
  while (numberOfTests--) bigIntegerTasks.push(tests()[randomInt(0, 4)])
  return bigIntegerTasks
}
