import { randomInt } from 'node:crypto'

export const floatGenerator = (numberOfTests: number) => {
  const tests = () => [
    { name: 'positive', value: Math.random() },
    { name: 'negative', value: -1 * Math.random() },
    { name: 'positive decimal', value: randomInt(50) * Math.random() },
    { name: 'negative decimal', value: -1 * randomInt(50) * Math.random() }
  ]
  const floatTasks = []
  while (numberOfTests--) floatTasks.push(tests()[randomInt(0, 4)])
  return floatTasks
}
