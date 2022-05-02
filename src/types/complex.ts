/**
 * Replace "void" with "undefined"
 * Useful for creating more convenient APIs
 *
 * void -> undefined
 * number | void -> number | undefined
 * number -> number
 * undefined -> undefined
 */
export type ReplaceVoid<T> = T extends void
  ? Exclude<T | undefined, void> extends never
    ? undefined
    : Exclude<T | undefined, void>
  : T
