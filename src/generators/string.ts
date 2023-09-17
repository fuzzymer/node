const CHARSET = ['abcdefghijklmnopqrstuvwxyz', '0123456789', `~!@#$%^&*()_+{}|:?><\`,./;'[]-=`]

const genTestFunction = (charSet: string) => [
  { name: 'small string', value: charSet },
  { name: 'large', value: charSet.repeat(10) },
  { name: 'very large', value: charSet.repeat(1000) }
]

export const stringGenerator = () => {
  const stringTasks: Record<string, string>[] = [{ name: 'zero length', value: '' }]
  generateCombinations(CHARSET, [], stringTasks)
  return stringTasks
}

const generateCombinations = (leftCharset: string[], rightCharset: string[], stringTasks: Record<string, string>[]) => {
  if (!leftCharset.length && !rightCharset.length) return
  if (!rightCharset.length) stringTasks.concat(genTestFunction(leftCharset.join('')))
  else {
    generateCombinations(leftCharset.concat(rightCharset[0]), rightCharset.slice(1), stringTasks)
    generateCombinations(leftCharset, rightCharset.slice(1), stringTasks)
  }
}
