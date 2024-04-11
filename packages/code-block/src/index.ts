export {
  codeBlockCompleteMatcher,
  codeBlockPartialMatcher as matchPartialCodeBlock,
} from "./matchers";
export { defaultOptions as defaultCodeBlockOptions } from "./options";
export type { CodeBlockOptions } from "./options";

export {
  parseCompleteMarkdownCodeBlock,
  parsePartialMarkdownCodeBlock,
} from "./parse";
export type { ParseFunction } from "./parse";

export {
  ShikiCode,
  ShikiCodeBlock,
  buildShikiCodeBlockComponent,
} from "./shikiComponent";
export type {
  CodeToHtmlProps,
  ShikiCodeBlockComponent,
  ShikiProps,
} from "./shikiComponent";

export { loadHighlighter } from "./loadHighlighter";
export type { LLMUIHighlighter } from "./loadHighlighter";
export { codeBlockLookBack } from "./lookBack";
