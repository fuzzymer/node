import { httpStatusExpectFunction } from './expect/http'
import { generateTests } from './generators/generator'
import { Runner } from './runner.js'
import { FuzzyOptions, Options, ParsedUrl, TestFunction, TestPlan } from './types.js'
import { replaceStringArgWithValue, urlParser } from './utils.js'

export class FuzzyHttp extends Runner {
  constructor(options?: Options) {
    super(
      options ?? {
        exitOnError: true,
        numberOfTests: 3
      }
    )
  }
  get = async (urlTemplate: string, options: FuzzyOptions) => {
    const parsedUrl = urlParser(urlTemplate)
    const fetchFunction = this.#wrapHttpRequest(parsedUrl as ParsedUrl, 'GET', options.headers)
    await this.runTestPlan(
      generateTests(parsedUrl.params!, this.options.numberOfTests) as TestPlan,
      fetchFunction as TestFunction,
      {
        valueToExpect: 200,
        expectFunction: httpStatusExpectFunction
      }
    )
  }

  #wrapHttpRequest = (parsedUrl: ParsedUrl, method: string, headers: Record<string, string>) => {
    let url = `${parsedUrl.url}${parsedUrl.path}?`
    let argCounter = 0
    for (const key of Object.keys(parsedUrl.params)) {
      url += `${key}={arg${argCounter++}}&`
    }
    if (argCounter) url = url.slice(0, -1)

    const httpFetchFunction = async (...args: string[]) => {
      let fetchUrl = url
      args.forEach((arg, index) => {
        fetchUrl = replaceStringArgWithValue(fetchUrl)(`{arg${index}}`, arg)
      })
      console.log(fetchUrl)
      return await fetch(fetchUrl, { method, headers })
    }
    return httpFetchFunction
  }
}
