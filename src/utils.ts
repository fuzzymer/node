import { UnknownDataTypeError } from './errors.js'
import { DataTypes, ParsedUrl } from './types.js'

export const urlParser = (urlTemplate: string) => {
  const parsedUrl: Partial<ParsedUrl> = {}
  const url = new URL(urlTemplate)
  parsedUrl.url = url.origin
  parsedUrl.pathParams = []
  parsedUrl.queryParams = {}
  parsedUrl.testArgs = []
  let pathCounter = 0
  for (const subPath of url.pathname.split('/')) {
    const decodedSubPath = decodeURIComponent(subPath)
    
    if (/{[A-Z]*}/gm.test(decodedSubPath)) {
      const dataType = stripTemplate(decodedSubPath)
      if (!DataTypes[dataType.toUpperCase()]) throw new UnknownDataTypeError(dataType)
      parsedUrl.pathParams.push(null)
      parsedUrl.testArgs.push({ [pathCounter++]: dataType.toUpperCase() })
    } else {
      parsedUrl.pathParams.push(decodedSubPath)
    }
  }
  console.log(parsedUrl)
  for (const [key, value] of url.searchParams) {
    if (/{[A-Z]*}/gm.test(value)) {
      const dataType = stripTemplate(value)
      if (!DataTypes[dataType.toUpperCase()]) throw new UnknownDataTypeError(dataType)
      parsedUrl.queryParams[key] = null
      parsedUrl.testArgs.push({ [key]: dataType.toUpperCase() })
    } else {
      parsedUrl.queryParams[key] = value
    }
  }

  return parsedUrl
}

export const replaceStringArgWithValue = (stringValue: string) => (argName: string, value: string) => {
  const index = stringValue.indexOf(argName)
  if (index == -1) return stringValue
  return stringValue.slice(0, index) + value + stringValue.slice(index + 1 + argName.length)
}

export const stripTemplate = (templateVar: string) => templateVar.slice(1, templateVar.length - 1)
