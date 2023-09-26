export type ParsedUrl = {
  url: string
  queryParams: Record<string, string | null>
  pathParams: (string | null)[]
  testArgs: Record<string, string>[]
}

