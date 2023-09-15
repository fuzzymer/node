import { UnknownDataTypeError } from './errors.js'
import { DataTypes, ParsedUrl } from './types.js'

export const urlParser = (urlTemplate: string) => {
  const parsedUrl: Partial<ParsedUrl> = {}
  const url = new URL(urlTemplate)
  parsedUrl.url = url.origin
  parsedUrl.path = url.pathname
  parsedUrl.params = {}
  for (const [key, value] of url.searchParams) {
    const dataType = stripTemplate(value)
    if (!DataTypes[dataType.toUpperCase()]) throw new UnknownDataTypeError(dataType)
    parsedUrl.params[key] = dataType.toUpperCase()
  }
  return parsedUrl
}

export const replaceStringArgWithValue = (stringValue: string) => (argName: string, value: string) => {
  const index = stringValue.indexOf(argName)
  if (index == -1) return stringValue
  return stringValue.slice(0, index) + value + stringValue.slice(index + 1 + argName.length)
}


export const stripTemplate = (templateVar: string) => templateVar.slice(1, templateVar.length - 1)