import { httpStatusExpectFunction } from './expect/http'
import { replaceStringArgWithValue, urlParser } from './utils.js'
import { ParsedUrl } from './types'
import { FuzzyOptions, Options, Runner, TestFunction, generateTests, TestPlan } from '@fuzzymer/runner'

export class FuzzyHttp extends Runner {
  constructor(options?: Options) {
    super(
      options ?? {
        exitOnError: true
      }
    )
  }
  get = async (urlTemplate: string, options?: FuzzyOptions) => {
    const parsedUrl = urlParser(urlTemplate)
    const fetchFunction = this.#wrapHttpRequest(parsedUrl as ParsedUrl, 'GET', options?.headers)
    await this.runTestPlan(generateTests(parsedUrl.testArgs!, 10) as TestPlan, fetchFunction as TestFunction, {
      valueToExpect: 200,
      expectFunction: httpStatusExpectFunction
    })
  }

  #wrapHttpRequest = (parsedUrl: ParsedUrl, method: string, headers?: Record<string, string>) => {
    let url = `${parsedUrl.url}`
    let argCounter = 0
    for (const key of parsedUrl.pathParams) {
      url += (key ?? `{arg${argCounter++}}`) + '/'
    }
    for (const key of Object.keys(parsedUrl.queryParams)) {
      url += `${key}={` + (parsedUrl.queryParams[key] ?? `arg${argCounter++}`) + '}&'
    }
    if (argCounter) url = url.slice(0, -1)

    const httpFetchFunction = async (...args: string[]) => {
      let fetchUrl = url
      args.forEach((arg, index) => {
        fetchUrl = replaceStringArgWithValue(fetchUrl)(`{arg${index}}`, arg)
      })
      return await fetch(fetchUrl, { method, headers: headers ?? { accept: 'application/json' } })
    }
    return httpFetchFunction
  }
}

const fux = new FuzzyHttp({ exitOnError: false })
;(async () => await fux.get('https://eglobaldev.azurewebsites.net/api/othermedical/Profile/Get/featured/{STRING}'))()
