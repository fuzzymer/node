import { randomInt } from 'crypto'

export const nullGenerator = (numberOfTests: number) => {
  const tests = () => [
    { name: 'null', value: null },
    { name: 'undefined', value: undefined }
  ]
  const nullTasks = []
  while (numberOfTests--) nullTasks.push(tests()[randomInt(0, 2)])
  return nullTasks
}
