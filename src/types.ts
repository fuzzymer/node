export interface FuzzyOptions {
  headers: Record<string, string>;
}

export interface CustomTesting {
  valueToTest: string | number | boolean | Record<string, any>;
  expect: {
    statusCode: number;
  };
}

export interface Options {
  exitOnError: boolean;
  numberOfTests: number;
  output: string[];
}

export const DataTypes = {
  INT: true,
  FLOAT: true,
  BIGINT: true,
  STRING: true,
  BOOL: true,
  NULL: true,
};

export interface TestValues {
  argName: string;
  argTests: Record<string, any>[];
}

export interface TaskPlan {
  taskId: string;
  testValues: TestValues;
}

export interface TestPlan {
  testId: string;
  numberOfTests: number;
  args: Record<string, string>;
  tasks: TaskPlan[];
}

export interface Expect {
  expectFunction: Function;
  valueToExpect: number | string | Record<string, any>;
}

export type ParsedUrl = {
  url: string;
  path: string;
  params: Record<string, string>;
};
