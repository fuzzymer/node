export class ExpectError extends Error {
  name = 'ExpectError'
  constructor(message: string) {
    super(message)
  }
}

export class UnknownDataTypeError extends Error {
  name = 'UnknownDataTypeError'
  supportedTypes = 'INT | FLOAT | BIGINT | STRING | BOOL | NULL'
  constructor(dataType: string) {
    super(`${dataType} could not be understood or is not supported.`)
  }
}
