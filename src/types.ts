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
  output: string[]
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
  argTests: Record<string, unknown>[]
}

export interface TaskPlan {
  taskId: string
  testValues: TestValues
}

export interface TestPlan {
  testId: string
  numberOfTests: number
  args: Record<string, string>
  tasks: TaskPlan[]
}

export interface Expect {
  expectFunction: unknown
  valueToExpect: number | string | Record<string, unknown>
}

export type ParsedUrl = {
  url: string
  path: string
  params: Record<string, string>
}
