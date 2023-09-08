import { ParsedUrl } from "./types";

export const urlParser = (urlTemplate: string) => {
  const parsedUrl: Partial<ParsedUrl> = {};
  const url = new URL(urlTemplate);
  parsedUrl.url = url.origin;
  parsedUrl.path = url.pathname;
  parsedUrl.params = {};
  for (const [key, value] of url.searchParams) {
    parsedUrl.params[key] = value
  }
  return parsedUrl;
};

export const replaceStringArgWithValue =
  (stringValue: string) => (argName: string, value: string) => {
    const index = stringValue.indexOf(argName);
    if (index == -1) return stringValue;
    return (
      stringValue.slice(0, index + 1) +
      value +
      stringValue.slice(index + 1 + argName.length)
    );
  };
