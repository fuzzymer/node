import { generateTests } from "./generators/generator";
import { Runner } from "./runner";
import { FuzzyOptions, Options, ParsedUrl, TestPlan } from "./types";
import { replaceStringArgWithValue, urlParser } from "./utils";

const httpExpectFunction = (response: Response, statusCode: number) =>
  response.status === statusCode;

class FuzzyHttp extends Runner {
  constructor(options: Options) {
    super(
      options ?? {
        exitOnError: true,
        output: ["json"],
        numberOfTests: 3,
      }
    );
  }
  get = async (urlTemplate: string, options: FuzzyOptions) => {
    const parsedUrl = urlParser(urlTemplate);
    const fetchFunction = this.#wrapHttpRequest(
      parsedUrl as ParsedUrl,
      "GET",
      options.headers
    );
    await this.runTestPlan(
      generateTests(parsedUrl.params!, this.options.numberOfTests) as TestPlan,
      fetchFunction,
      { valueToExpect: 200, expectFunction: httpExpectFunction }
    );
  };

  #wrapHttpRequest = (
    parsedUrl: ParsedUrl,
    method: string,
    headers: Record<string, string>
  ) => {
    let url = `${parsedUrl.url}${parsedUrl.path}?`;
    let argCounter = 0;
    for (const key of Object.keys(parsedUrl.params)) {
      url += `${key}={arg${argCounter}}&`;
    }
    const httpFetchFunction = async (...args: string[]) => {
      args.forEach((arg, index) => {
        url = replaceStringArgWithValue(url)(`{arg${index}}`, arg);
      });
      return await fetch(url, { method, headers });
    };
    return httpFetchFunction;
  };
}
