import { ExpectError } from "../errors"

export const httpStatusExpectFunction = (response: Response, statusCode: number) => {
  console.log(response.status)
  if(response.status !== statusCode) throw new ExpectError(`Expected Response status to be ${statusCode}. Received ${response.status}`)
}
