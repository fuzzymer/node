export interface FuzzyOptions {
  headers: Record<string, string>
}

export interface CustomTesting {
  valueToTest: string | number | boolean | Record<string, unknown>
  expect: {
    statusCode: number
  }
}

export interface Options {
  exitOnError: boolean
  numberOfTests: number
}

export const DataTypes: Record<string, boolean> = {
  INT: true,
  FLOAT: true,
  BIGINT: true,
  STRING: true,
  BOOL: true,
  NULL: true
}

export interface TestValues {
  argName: string
  argTests: Record<string, unknown | null>[]
}

export interface TaskPlan {
  taskId: string
  testValues: TestValues
}

export interface TestPlan {
  testId: string
  numberOfTests: number
  args: Record<string, string>[]
  tasks: TaskPlan[]
}

export interface Expect {
  expectFunction: (...args: unknown[]) => Promise<boolean> | boolean
  valueToExpect: number | string | Record<string, unknown>
}

export type ParsedUrl = {
  url: string
  queryParams: Record<string, string | null>
  pathParams: (string | null)[]
  testArgs: Record<string, string>[]
}

export type TestFunction = (...args: unknown[]) => Promise<unknown>
