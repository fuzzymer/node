const CHARSET = ['abcdefghijklmnopqrstuvwxyz', '0123456789', `~!@#$%^&*()_+{}|:?><\`,./;'[]-=`]

const genTestFunction = (charSet: string) => [
  { name: 'small string', value: charSet },
  { name: 'large', value: charSet.repeat(10) },
  { name: 'very large', value: charSet }
]

export const stringGenerator = () => {
  let stringTasks: Record<string, string>[] = [{ name: 'zero length', value: '' }]
  stringTasks = stringTasks.concat(genTestFunction(CHARSET[0]))
  stringTasks = stringTasks.concat(genTestFunction(CHARSET[1]))
  stringTasks = stringTasks.concat(genTestFunction(CHARSET[2]))
  return stringTasks
}


